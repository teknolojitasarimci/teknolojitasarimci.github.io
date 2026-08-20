/* ============================================================
 * teknolojitasarimci.com — İndirme Sayacı
 * ------------------------------------------------------------
 * - Sayfadaki tüm a.download-btn bağlantılarının yanına
 *   "N indirme" sayacı ekler.
 * - Tıklanınca sayı Supabase üzerinden +1 artırılır
 *   (register_download fonksiyonu, hedef başına oturumda 1 kez).
 * - Supabase yapılandırılmamışsa sayaç gizlenir; yönetici
 *   Supabase anahtarlarını girdiğinde gerçek küresel sayaç devreye girer.
 * ============================================================ */
(function () {
    "use strict";

    const SUPABASE_URL = window.SUPABASE_URL || "";
    const SUPABASE_ANON_KEY = window.SUPABASE_ANON_KEY || "";
    const CONFIGURED = !!(SUPABASE_URL && SUPABASE_ANON_KEY);

    function api(path, options) {
        return fetch(SUPABASE_URL + path, Object.assign({
            headers: {
                "apikey": SUPABASE_ANON_KEY,
                "Authorization": "Bearer " + SUPABASE_ANON_KEY,
                "Content-Type": "application/json"
            }
        }, options));
    }

    function formatCount(n) {
        try {
            return Number(n).toLocaleString("tr-TR");
        } catch (e) {
            return String(n);
        }
    }

    function lsget(key) {
        try { return localStorage.getItem("tt_dl_" + key); } catch (e) { return null; }
    }

    function lsset(key, val) {
        try { localStorage.setItem("tt_dl_" + key, val); } catch (e) {}
    }

    function targetKey(link) {
        const page = window.location.pathname.split("/").pop() || "index.html";
        const href = link.getAttribute("href") || "";
        const file = href.split("/").pop().split("#")[0] || href;
        return page + ":" + file;
    }

    async function run() {
        const links = Array.prototype.slice.call(
            document.querySelectorAll("a.download-btn")
        );
        if (!links.length) return;

        links.forEach(function (link) {
            if (link.querySelector(".download-count")) return;
            const span = document.createElement("span");
            span.className = "download-count";
            span.style.cssText =
                "display:inline-block;margin-left:6px;font-size:13px;" +
                "font-weight:600;color:#64748b;vertical-align:middle;" +
                "text-decoration:none;";
            span.textContent = "(0 indirme)";
            link.appendChild(span);

            link.addEventListener("click", function () {
                increment(link, span);
            });
        });

        /* Yerel (localStorage) sayacı her zaman göster: Supabase
           kurulusa dahi ilk veri kaynağı; kurulmamışsa tek sayfaçlık
           gerçek sayaç sağlar. */
        links.forEach(function (link) {
            const k = targetKey(link);
            const local = lsget(k) || 0;
            const span = link.querySelector(".download-count");
            if (span) {
                span.textContent = "(" + formatCount(local) + " indirme)";
            }
        });

        if (CONFIGURED) {
            const keys = links.map(targetKey);
            try {
                const res = await api("/rest/v1/rpc/get_downloads", {
                    method: "POST",
                    body: JSON.stringify({ p_targets: keys })
                });
                if (res.ok) {
                    const rows = await res.json();
                    const byTarget = {};
                    rows.forEach(function (r) { byTarget[r.target] = r.count; });
                    links.forEach(function (link) {
                        const k = targetKey(link);
                        const span = link.querySelector(".download-count");
                        if (byTarget[k] !== undefined && span) {
                            span.textContent = "(" + formatCount(byTarget[k]) + " indirme)";
                        }
                    });
                }
            } catch (e) { /* yerel sayaç korunur */ }
        }
    }

    async function increment(link, span) {
        const k = targetKey(link);
        if (CONFIGURED) {
            const skey = "tt_dl_" + k;
            if (sessionStorage.getItem(skey)) return;
            try {
                const res = await api("/rest/v1/rpc/register_download", {
                    method: "POST",
                    body: JSON.stringify({ p_target: k })
                });
                if (res.ok) {
                    sessionStorage.setItem(skey, "1");
                    span.textContent = "(" + formatCount(await res.json()) + " indirme)";
                }
            } catch (e) { /* yerel sayaç devam eder */ }
        } else {
            const local = parseInt(lsget(k) || "0", 10) + 1;
            lsset(k, local);
            span.textContent = "(" + formatCount(local) + " indirme)";
        }
    }

    document.addEventListener("DOMContentLoaded", run);
})();
