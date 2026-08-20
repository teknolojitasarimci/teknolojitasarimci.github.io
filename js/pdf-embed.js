/* ============================================================
 * pdf-embed.js — Yerel PDF bağlantılarının altına yerleşik önizleme
 * ------------------------------------------------------------
 * - Harici (http/https) PDF bağlantıları gömülmez; yalnızca yerel dosyalar.
 * - Tarayıcıların yerleşik PDF görüntüleyicisi kullanılır (CDN yok).
 * - `data-pdf-embed` niteliğiyle idempotenttir (çift ekleme yapmaz).
 * ============================================================ */
(function () {
    "use strict";

    var STYLE_ID = "pdf-embed-style";
    if (!document.getElementById(STYLE_ID)) {
        var st = document.createElement("style");
        st.id = STYLE_ID;
        st.textContent = [
            ".pdf-preview-wrap{max-width:860px;margin:14px auto 24px auto;border:1px solid #e2e8f0;border-radius:14px;overflow:hidden;background:#ffffff;box-shadow:0 2px 10px rgba(0,0,0,0.04);}",
            ".pdf-preview-bar{display:flex;align-items:center;gap:8px;padding:9px 14px;background:#f8fafc;border-bottom:1px solid #e2e8f0;font-size:12px;font-weight:700;color:#475569;letter-spacing:0.3px;}",
            ".pdf-preview-frame{display:block;width:100%;height:600px;border:0;background:#f8fafc;}",
            "body.dark .pdf-preview-wrap{background:#1e293b;border-color:#334155;box-shadow:none;}",
            "body.dark .pdf-preview-bar{background:#0f172a;border-color:#334155;color:#cbd5e1;}",
            "body.dark .pdf-preview-frame{background:#1e293b;}"
        ].join("\n");
        document.head.appendChild(st);
    }

    function isLocalPdf(href) {
        if (!href) return false;
        if (/^(https?:|ftp:|\/\/)/i.test(href)) return false;
        return /\.pdf(\?.*)?$/i.test(href);
    }

    function init() {
        var links = document.querySelectorAll("a[href]");
        for (var i = 0; i < links.length; i++) {
            var a = links[i];
            if (a.dataset.pdfEmbed) continue;
            if (a.dataset.noPdfEmbed === "true") continue;
            var href = a.getAttribute("href");
            if (!isLocalPdf(href)) continue;
            a.dataset.pdfEmbed = "1";

            var wrap = document.createElement("div");
            wrap.className = "pdf-preview-wrap";

            var bar = document.createElement("div");
            bar.className = "pdf-preview-bar";
            var icon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            icon.setAttribute("width", "14");
            icon.setAttribute("height", "14");
            icon.setAttribute("viewBox", "0 0 24 24");
            icon.setAttribute("fill", "none");
            icon.setAttribute("stroke", "#0284c7");
            icon.setAttribute("stroke-width", "2.2");
            icon.setAttribute("stroke-linecap", "round");
            icon.setAttribute("stroke-linejoin", "round");
            var p1 = document.createElementNS("http://www.w3.org/2000/svg", "path");
            p1.setAttribute("d", "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z");
            var p2 = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
            p2.setAttribute("points", "14 2 14 8 20 8");
            var p3 = document.createElementNS("http://www.w3.org/2000/svg", "line");
            p3.setAttribute("x1", "8");
            p3.setAttribute("y1", "13");
            p3.setAttribute("x2", "16");
            p3.setAttribute("y2", "13");
            var p4 = document.createElementNS("http://www.w3.org/2000/svg", "line");
            p4.setAttribute("x1", "8");
            p4.setAttribute("y1", "17");
            p4.setAttribute("x2", "13");
            p4.setAttribute("y2", "17");
            icon.appendChild(p1);
            icon.appendChild(p2);
            icon.appendChild(p3);
            icon.appendChild(p4);
            bar.appendChild(icon);

            var label = document.createElement("span");
            label.textContent = "PDF Önizleme";
            bar.appendChild(label);

            var frame = document.createElement("iframe");
            frame.className = "pdf-preview-frame";
            frame.src = href;
            frame.setAttribute("title", "PDF Önizleme");
            frame.setAttribute("loading", "lazy");
            frame.setAttribute("aria-label", "PDF önizleme");

            wrap.appendChild(bar);
            wrap.appendChild(frame);
            a.parentNode.insertBefore(wrap, a.nextSibling);
        }
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }
})();
