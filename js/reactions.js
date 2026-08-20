/* ============================================================
 * teknolojitasarimci.com — Gerçek Tepki Sayaçları
 * ------------------------------------------------------------
 * - Tepki sayıları 0'dan başlar, Supabase üzerinden gerçek
 *   ziyaretçi oylarıyla artar.
 * - Her ziyaretçi, sayfa başına her tepki tipi için yalnızca
 *   BİR kez oy kullanabilir (tekrar tıklama oyu geri alır).
 * - Oturum bazında hatırlanır (sessionStorage).
 * ============================================================ */
(function () {
    "use strict";

    const SUPABASE_URL = window.SUPABASE_URL || "";
    const SUPABASE_ANON_KEY = window.SUPABASE_ANON_KEY || "";
    const CONFIGURED = !!(SUPABASE_URL && SUPABASE_ANON_KEY);

    const TYPE_BY_INDEX = ["faydali", "harika", "tesekkurler", "gelistirilmeli"];

    function currentPath() {
        let p = window.location.pathname;
        if (p.endsWith("/")) p += "index.html";
        return p;
    }

    function api(path, options) {
        return fetch(SUPABASE_URL + path, Object.assign({
            headers: {
                "apikey": SUPABASE_ANON_KEY,
                "Authorization": "Bearer " + SUPABASE_ANON_KEY,
                "Content-Type": "application/json"
            }
        }, options));
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

        try {
            const res = await api("/rest/v1/reactions?select=type,count&page_url=eq." +
                encodeURIComponent(currentPath()));
            if (!res.ok) throw new Error("load failed");
            const rows = await res.json();
            const counts = {};
            rows.forEach(function (r) { counts[r.type] = r.count; });

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

        try {
            const res = await api("/rest/v1/rpc/change_reaction", {
                method: "POST",
                body: JSON.stringify({
                    p_path: currentPath(),
                    p_type: type,
                    p_delta: delta
                })
            });
            if (!res.ok) throw new Error("rpc failed");
            const serverCount = await res.json();
            if (serverCount !== undefined) {
                countSpan.textContent = serverCount;
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
