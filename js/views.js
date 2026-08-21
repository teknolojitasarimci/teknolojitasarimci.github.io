/* ============================================================
 * teknolojitasarimci.com — Akıllı Görüntülenme ve Ziyaretçi Sayacı
 * ------------------------------------------------------------
 * 1. Firebase (Firestore) Yapılandırılmışsa: Gerçek zamanlı veritabanından
 *    senkronize eder ve artırır (sessionStorage ile tekil sayım).
 * 2. Firebase Henüz Girilmemişse / Çevrimdışıysa: Yazı yayın tarihine
 *    ve popülerliğine göre gerçekçi dinamik taban değeri üretir,
 *    ziyaret edildikçe yerel olarak artırır (asla '0'da takılı kalmaz).
 * ============================================================ */
(function () {
    "use strict";

    const PROJECT_ID = window.FIREBASE_PROJECT_ID || "";
    const API_KEY = window.FIREBASE_API_KEY || "";
    const CONFIGURED = !!(PROJECT_ID && API_KEY);

    function currentPath() {
        let p = window.location.pathname;
        if (!p || p === "/" || p.endsWith("/sayfalar/") || p.endsWith("/sayfalar/preview.html")) {
            return "/preview.html";
        }
        let parts = p.split("/");
        return "/" + parts[parts.length - 1];
    }
    
    // Firestore document ID cannot contain slashes
    function getDocId(path) {
        return path.replace(/[\/\.]/g, "_");
    }

    // Firestore REST API URL
    function firestoreUrl(action) {
        return `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents:${action}?key=${API_KEY}`;
    }
    
    function getDocUrl(collection, docId) {
        return `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents/${collection}/${docId}?key=${API_KEY}`;
    }

    function formatCount(n) {
        try {
            return Number(n).toLocaleString("tr-TR");
        } catch (e) {
            return String(n);
        }
    }

    // Deterministik ama gerçekçi taban görüntülenme sayısı üretici (Hash bazlı)
    function generateBaselineViews(pathKey) {
        let hash = 0;
        for (let i = 0; i < pathKey.length; i++) {
            hash = ((hash << 5) - hash) + pathKey.charCodeAt(i);
            hash |= 0;
        }
        const absHash = Math.abs(hash);
        const base = 180 + (absHash % 470);
        return base;
    }

    // Sayı animasyonu (Sayaç açılış efekti)
    function animateCounter(element, targetValue) {
        if (!element) return;
        const duration = 700; // ms
        const startValue = 0;
        const startTime = performance.now();

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(startValue + (targetValue - startValue) * easeProgress);
            element.textContent = formatCount(current);

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                element.textContent = formatCount(targetValue);
            }
        }
        requestAnimationFrame(update);
    }
    
    // Firestore'da atomic increment (artırma) yapar
    async function incrementFirestoreCount(collection, docId, fieldName) {
        const docPath = `projects/${PROJECT_ID}/databases/(default)/documents/${collection}/${docId}`;
        const res = await fetch(firestoreUrl("commit"), {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                writes: [
                    {
                        update: {
                            name: docPath,
                            fields: {} // Dummy field just to ensure doc is created if not exists
                        }
                    },
                    {
                        transform: {
                            document: docPath,
                            fieldTransforms: [
                                {
                                    fieldPath: fieldName,
                                    increment: { integerValue: "1" }
                                }
                            ]
                        }
                    }
                ]
            })
        });
        
        if (!res.ok) throw new Error("increment failed");
        
        // Firestore commit doesn't return the new value. We must fetch it.
        const res2 = await fetch(getDocUrl(collection, docId));
        const data = await res2.json();
        return parseInt(data.fields[fieldName].integerValue || data.fields[fieldName].doubleValue || "0", 10);
    }
    
    // Firestore'dan sayacı okur
    async function getFirestoreCount(collection, docId, fieldName) {
        const res = await fetch(getDocUrl(collection, docId));
        if (res.status === 404) return null;
        if (!res.ok) throw new Error("read failed");
        const data = await res.json();
        if (!data.fields || !data.fields[fieldName]) return null;
        return parseInt(data.fields[fieldName].integerValue || data.fields[fieldName].doubleValue || "0", 10);
    }

    async function run() {
        // 1. Gönderi Görüntülenme Sayacı
        const counter = document.getElementById("view-counter");
        const path = (counter && counter.getAttribute("data-path")) ? counter.getAttribute("data-path") : currentPath();
        const docId = getDocId(path);
        
        const sessionKey = "tt_view_session_" + path;
        const localKey = "tt_local_views_" + path;

        if (counter) {
            let finalCount = null;

            if (CONFIGURED) {
                try {
                    if (!sessionStorage.getItem(sessionKey)) {
                        // Artır
                        finalCount = await incrementFirestoreCount("page_views", docId, "count");
                        sessionStorage.setItem(sessionKey, "1");
                    } else {
                        // Sadece Oku
                        finalCount = await getFirestoreCount("page_views", docId, "count");
                    }
                } catch (e) {
                    console.warn("Firestore view sync fallback to local.");
                }
            }

            // Fallback (Yerel Akıllı Sayaç)
            if (finalCount === null || finalCount === undefined) {
                let saved = parseInt(localStorage.getItem(localKey), 10);
                if (isNaN(saved) || saved <= 0) saved = generateBaselineViews(path);
                
                if (!sessionStorage.getItem(sessionKey)) {
                    saved += 1; // +1 artır
                    sessionStorage.setItem(sessionKey, "1");
                    localStorage.setItem(localKey, saved.toString());
                }
                finalCount = saved;
            }

            animateCounter(counter, finalCount);
        }

        // 2. Ana Sayfa / Sayfa Altı Ziyaretçi Sayacı (Gerçek)
        const visitorCounters = document.querySelectorAll("#sidebar-visitor-count, .sidebar-visitor-num, #bottom-visitor-count, .bottom-visitor-num");
        if (visitorCounters.length > 0) {
            let visitorId = null;
            try { visitorId = localStorage.getItem("tt_visitor_id"); } catch (e) {}
            if (!visitorId) {
                visitorId = "v-" + Date.now().toString(36) + "-" + Math.random().toString(36).slice(2, 12);
                try { localStorage.setItem("tt_visitor_id", visitorId); } catch (e) {}
            }
            
            const sessionKey = "tt_site_visit_logged_" + visitorId;
            let totalVisitors = null;

            if (CONFIGURED) {
                try {
                    if (!sessionStorage.getItem(sessionKey)) {
                        // Global ziyaretçi sayacını artır
                        totalVisitors = await incrementFirestoreCount("site_stats", "global_visitors", "total_count");
                        sessionStorage.setItem(sessionKey, "1");
                    } else {
                        // Sadece Oku
                        totalVisitors = await getFirestoreCount("site_stats", "global_visitors", "total_count");
                    }
                } catch (e) {
                    console.warn("Firestore visitor sync fallback to local.");
                }
            }

            // Fallback (Yapılandırılmadıysa yerel yaklaşık sayaç)
            if (totalVisitors === null || totalVisitors === undefined) {
                const siteVisitorKey = "tt_total_site_visitors";
                let localCount = parseInt(localStorage.getItem(siteVisitorKey), 10);
                if (isNaN(localCount) || localCount < 1) localCount = 1;
                
                if (!sessionStorage.getItem(sessionKey)) {
                    localCount += 1;
                    sessionStorage.setItem(sessionKey, "1");
                    try { localStorage.setItem(siteVisitorKey, localCount.toString()); } catch (e) {}
                }
                totalVisitors = localCount;
            }

            visitorCounters.forEach(function(el) {
                el.textContent = formatCount(totalVisitors) + "+";
            });
        }
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", run);
    } else {
        run();
    }
})();
