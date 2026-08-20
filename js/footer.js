(function () {
    "use strict";

    var footer = document.querySelector("footer.footer");
    if (!footer) return;

    var title = footer.querySelector(".footer-copyright-title");
    if (title) title.textContent = "Copyright © Mürsel EREN " + new Date().getFullYear();

    var text = footer.querySelector(".footer-copyright-text");
    if (!text || text.querySelector(".site-visitor-count")) return;

    var counter = document.createElement("span");
    counter.className = "site-visitor-count";
    counter.textContent = "Toplam ziyaretçi: hesaplanıyor...";
    text.appendChild(document.createElement("br"));
    text.appendChild(counter);

    var url = window.SUPABASE_URL || "";
    var key = window.SUPABASE_ANON_KEY || "";
    var visitorId;
    try { visitorId = localStorage.getItem("tt_visitor_id"); } catch (e) {}
    if (!visitorId) {
        visitorId = "v-" + Date.now().toString(36) + "-" + Math.random().toString(36).slice(2, 12);
        try { localStorage.setItem("tt_visitor_id", visitorId); } catch (e) {}
    }
    var sessionKey = "tt_site_visit_logged_" + visitorId;
    var localKey = "tt_total_site_visitors";
    function show(value) { counter.textContent = "Toplam ziyaretçi: " + Number(value).toLocaleString("tr-TR"); }
    function localCount() {
        var value = parseInt(localStorage.getItem(localKey), 10);
        if (isNaN(value) || value < 1) value = 1;
        if (!sessionStorage.getItem(sessionKey)) {
            value += 1;
            sessionStorage.setItem(sessionKey, "1");
            localStorage.setItem(localKey, String(value));
        }
        return value;
    }
    async function update() {
        if (!url || !key) { show(localCount()); return; }
        try {
            var total;
            if (!sessionStorage.getItem(sessionKey)) {
                var registered = await fetch(url + "/rest/v1/rpc/register_site_visit", { method: "POST", headers: { apikey: key, Authorization: "Bearer " + key, "Content-Type": "application/json" }, body: JSON.stringify({ p_visitor_id: visitorId }) });
                if (registered.ok) { total = await registered.json(); sessionStorage.setItem(sessionKey, "1"); }
            }
            if (total === undefined) {
                var result = await fetch(url + "/rest/v1/rpc/get_site_visitors", { method: "POST", headers: { apikey: key, Authorization: "Bearer " + key, "Content-Type": "application/json" }, body: JSON.stringify({}) });
                if (result.ok) total = await result.json();
            }
            if (total === undefined) throw new Error("Sayaç yanıtı alınamadı");
            show(total);
        } catch (e) { show(localCount()); }
    }
    update();
})();
