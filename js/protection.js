/* ============================================================
 * teknolojitasarimci.com — İçerik Kopyalama Koruması
 * ------------------------------------------------------------
 * - Sağ tıklama menüsü engellenir.
 * - Ctrl+C / kes / sürükle-bırak kopyalama engellenir.
 * - Metin seçimi CSS ile kapatılır (form alanları hariç).
 * - Engellenen her işlemde kullanıcıya bilgilendirme tostu.
 * ============================================================ */
(function () {
    "use strict";

    const BLOCK_MSG = "Bu sitenin içerikleri telif haklarıyla korunmaktadır. Kopyalama işlemi engellendi.";

    function toast() {
        let t = document.getElementById("toast-notification");
        if (!t) {
            t = document.createElement("div");
            t.id = "toast-notification";
            document.body.appendChild(t);
        }
        t.textContent = BLOCK_MSG;
        t.classList.add("show");
        clearTimeout(toast._t);
        toast._t = setTimeout(function () { t.classList.remove("show"); }, 2600);
    }

    document.addEventListener("contextmenu", function (e) {
        e.preventDefault();
        toast();
    }, false);

    document.addEventListener("copy", function (e) {
        e.preventDefault();
        toast();
    }, false);

    document.addEventListener("cut", function (e) {
        e.preventDefault();
        toast();
    }, false);

    document.addEventListener("dragstart", function (e) {
        if (e.target && e.target.tagName === "IMG") {
            e.preventDefault();
            toast();
        }
    }, false);
})();
