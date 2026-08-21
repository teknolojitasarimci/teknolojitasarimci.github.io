/* ============================================================
 * teknolojitasarimci.com — Gerçek Tepki Sayaçları
 * ------------------------------------------------------------
 * - Tepki sayıları 0'dan başlar, Firebase (Firestore) üzerinden gerçek
 *   ziyaretçi oylarıyla artar.
 * - Her ziyaretçi, sayfa başına her tepki tipi için yalnızca
 *   BİR kez oy kullanabilir (tekrar tıklama oyu geri alır).
 * - Oturum bazında hatırlanır (sessionStorage).
 * ============================================================ */
(function () {
    "use strict";

    const PROJECT_ID = window.FIREBASE_PROJECT_ID || "";
    const API_KEY = window.FIREBASE_API_KEY || "";
    const CONFIGURED = !!(PROJECT_ID && API_KEY);

    const TYPE_BY_INDEX = ["faydali", "harika", "tesekkurler", "gelistirilmeli"];

    function currentPath() {
        let p = window.location.pathname;
        if (p.endsWith("/")) p += "index.html";
        return p;
    }
    
    function getDocId(path) {
        return path.replace(/[\/\.]/g, "_");
    }
    
    function getDocUrl(docId) {
        return `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents/reactions/${docId}?key=${API_KEY}`;
    }
    
    function firestoreUrl(action) {
        return `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents:${action}?key=${API_KEY}`;
    }

    function showToast(message) {
        let toast = document.getElementById("toast-notification");
        if (!toast) {
            toast = document.createElement("div");
            toast.id = "toast-notification";
            document.body.appendChild(toast);
        }
        toast.textContent = message;
        toast.classList.add("show");
        clearTimeout(showToast._t);
        showToast._t = setTimeout(function () {
            toast.classList.remove("show");
        }, 2600);
    }

    function voteKey(type) {
        return "tt_react_" + currentPath() + "_" + type;
    }

    async function loadCounts() {
        const buttons = document.querySelectorAll(".reaction-btn");
        if (!buttons.length || !CONFIGURED) return;

        const docId = getDocId(currentPath());

        try {
            const res = await fetch(getDocUrl(docId));
            const data = await res.json();
            
            const counts = {};
            if (data.fields) {
                TYPE_BY_INDEX.forEach(function(type) {
                    if (data.fields[type]) {
                        counts[type] = parseInt(data.fields[type].integerValue || data.fields[type].doubleValue || "0", 10);
                    }
                });
            }

            buttons.forEach(function (btn, i) {
                const type = TYPE_BY_INDEX[i];
                const countSpan = btn.querySelector(".reaction-count");
                if (countSpan && type && counts[type] !== undefined) {
                    countSpan.textContent = counts[type];
                }
                if (sessionStorage.getItem(voteKey(type)) === "1") {
                    btn.classList.add("active");
                }
            });
        } catch (e) {
            /* yüklenemezse 0 görünmeye devam eder */
        }
    }

    async function toggleReaction(btn) {
        const countSpan = btn.querySelector(".reaction-count");
        const idx = Array.prototype.indexOf.call(
            document.querySelectorAll(".reaction-btn"), btn);
        const type = TYPE_BY_INDEX[idx];
        if (!type || !countSpan) return;

        if (!CONFIGURED) {
            showToast("Tepki sistemi şu an kapalı.");
            return;
        }

        const alreadyVoted = sessionStorage.getItem(voteKey(type)) === "1";
        const delta = alreadyVoted ? -1 : 1;
        const oldCount = parseInt(countSpan.textContent, 10) || 0;
        const newCount = Math.max(0, oldCount + delta);

        // İyimser güncelleme (UI anında değişir)
        countSpan.textContent = newCount;
        btn.classList.toggle("active", delta === 1);

        const docId = getDocId(currentPath());
        const docPath = `projects/${PROJECT_ID}/databases/(default)/documents/reactions/${docId}`;

        try {
            const res = await fetch(firestoreUrl("commit"), {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    writes: [
                        {
                            update: { name: docPath, fields: {} }
                        },
                        {
                            transform: {
                                document: docPath,
                                fieldTransforms: [
                                    {
                                        fieldPath: type,
                                        increment: { integerValue: delta.toString() }
                                    }
                                ]
                            }
                        }
                    ]
                })
            });
            if (!res.ok) throw new Error("commit failed");
            
            // Okuma yapıp kesin değeri arayüze yansıt
            const res2 = await fetch(getDocUrl(docId));
            const data = await res2.json();
            if (data.fields && data.fields[type]) {
                countSpan.textContent = parseInt(data.fields[type].integerValue || data.fields[type].doubleValue || "0", 10);
            }
            
            if (delta === 1) {
                sessionStorage.setItem(voteKey(type), "1");
            } else {
                sessionStorage.removeItem(voteKey(type));
            }
        } catch (e) {
            // Hata durumunda geri al
            countSpan.textContent = oldCount;
            btn.classList.toggle("active", alreadyVoted);
            showToast("Tepkiniz kaydedilemedi. Lütfen tekrar deneyin.");
        }
    }

    window.reactionsApi = { toggleReaction: toggleReaction };
    document.addEventListener("DOMContentLoaded", loadCounts);
})();
