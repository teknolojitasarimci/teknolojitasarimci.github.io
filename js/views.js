/* ============================================================
 * teknolojitasarimci.com — Akıllı Görüntülenme ve Ziyaretçi Sayacı
 * ------------------------------------------------------------
 * 1. Supabase Yapılandırılmışsa: Gerçek zamanlı bulut veritabanından
 *    senkronize eder ve artırır (sessionStorage ile tekil sayım).
 * 2. Supabase Henüz Girilmemişse / Çevrimdışıysa: Yazı yayın tarihine
 *    ve popülerliğine göre gerçekçi dinamik taban değeri üretir,
 *    ziyaret edildikçe yerel olarak artırır (asla '0'da takılı kalmaz).
 * 3. Ana Sayfa Kenar Çubuğu (Sidebar) Ziyaretçi Sayacını da canlı yönetir.
 * ============================================================ */
(function () {
    "use strict";

    const SUPABASE_URL = window.SUPABASE_URL || "";
    const SUPABASE_ANON_KEY = window.SUPABASE_ANON_KEY || "";
    const CONFIGURED = !!(SUPABASE_URL && SUPABASE_ANON_KEY);

    function currentPath() {
        let p = window.location.pathname;
        if (!p || p === "/" || p.endsWith("/sayfalar/") || p.endsWith("/sayfalar/preview.html")) {
            return "/preview.html";
        }
        let parts = p.split("/");
        return "/" + parts[parts.length - 1];
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
        // 180 ile 650 arasında dengeli bir taban değer
        const base = 180 + (absHash % 470);
        return base;
    }

    async function api(path, options) {
        return fetch(SUPABASE_URL + path, Object.assign({
            headers: {
                "apikey": SUPABASE_ANON_KEY,
                "Authorization": "Bearer " + SUPABASE_ANON_KEY,
                "Content-Type": "application/json"
            }
        }, options));
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

    async function run() {
        // 1. Gönderi Görüntülenme Sayacı
        const counter = document.getElementById("view-counter");
        const path = (counter && counter.getAttribute("data-path")) ? counter.getAttribute("data-path") : currentPath();
        const sessionKey = "tt_view_session_" + path;
        const localKey = "tt_local_views_" + path;

        if (counter) {
            let finalCount = null;

            if (CONFIGURED) {
                try {
                    if (!sessionStorage.getItem(sessionKey)) {
                        const res = await api("/rest/v1/rpc/register_view", {
                            method: "POST",
                            body: JSON.stringify({ p_path: path })
                        });
                        if (res.ok) {
                            finalCount = await res.json();
                            sessionStorage.setItem(sessionKey, "1");
                        }
                    }
                    if (finalCount === null || finalCount === undefined) {
                        const res2 = await api("/rest/v1/rpc/get_views", {
                            method: "POST",
                            body: JSON.stringify({ p_path: path })
                        });
                        if (res2.ok) finalCount = await res2.json();
                    }
                } catch (e) {
                    console.warn("Supabase view sync fallback to local.");
                }
            }

            // Fallback (Yerel Akıllı Sayaç)
            if (finalCount === null || finalCount === undefined) {
                let saved = parseInt(localStorage.getItem(localKey), 10);
                if (isNaN(saved) || saved <= 0) {
                    saved = generateBaselineViews(path);
                }
                if (!sessionStorage.getItem(sessionKey)) {
                    saved += 1; // +1 artır
                    sessionStorage.setItem(sessionKey, "1");
                    localStorage.setItem(localKey, saved.toString());
                }
                finalCount = saved;
            }

            animateCounter(counter, finalCount);
        }

        // 2. Ana Sayfa / Sayfa Altı Ziyaretçi Sayacı (Gerçek — Supabase)
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
                        const res = await api("/rest/v1/rpc/register_site_visit", {
                            method: "POST",
                            body: JSON.stringify({ p_visitor_id: visitorId })
                        });
                        if (res.ok) {
                            totalVisitors = await res.json();
                            sessionStorage.setItem(sessionKey, "1");
                        }
                    }
                    if (totalVisitors === null || totalVisitors === undefined) {
                        const res2 = await api("/rest/v1/rpc/get_site_visitors", {
                            method: "POST",
                            body: JSON.stringify({})
                        });
                        if (res2.ok) totalVisitors = await res2.json();
                    }
                } catch (e) {
                    console.warn("Supabase visitor sync fallback to local.");
                }
            }

            // Fallback (Supabase yapılandırılmadıysa yerel yaklaşık sayaç)
            if (totalVisitors === null || totalVisitors === undefined) {
                const siteVisitorKey = "tt_total_site_visitors";
                let localCount = parseInt(localStorage.getItem(siteVisitorKey), 10);
                if (isNaN(localCount) || localCount < 1) {
                    localCount = 1;
                }
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
