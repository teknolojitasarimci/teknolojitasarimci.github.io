/* ============================================================
 * teknolojitasarimci.com — Yorum Sistemi (Supabase)
 * ------------------------------------------------------------
 * - Yeni yorumlar "pending" (bekliyor) durumunda kaydedilir.
 * - Yalnızca panelden (admin.html) onaylanan yorumlar
 *   sitede görünür.
 * - Avatar: DiceBear ile isme özel sembolik yüz; çevrimdışıysa
 *   harf rozetine düşer.
 * ============================================================ */
(function () {
    "use strict";

    const SUPABASE_URL = window.SUPABASE_URL || "";
    const SUPABASE_ANON_KEY = window.SUPABASE_ANON_KEY || "";

    const CONFIGURED = !!(SUPABASE_URL && SUPABASE_ANON_KEY);

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
        }, 3200);
    }

    function safeName(name) {
        const el = document.createElement("div");
        el.textContent = name || "";
        return el.innerHTML;
    }

    function safeText(text) {
        return (text || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
    }

    function initialsAvatar(name) {
        const words = (name || "?").trim().split(/\s+/);
        const first = words[0] ? words[0][0] : "?";
        const last = words.length > 1 ? words[words.length - 1][0] : "";
        return (first + last).toUpperCase();
    }

    function avatarHTML(name) {
        const seed = encodeURIComponent(name.trim().toLowerCase());
        const fallback = initialsAvatar(name);
        return '<div class="comment-avatar">' + fallback +
            '<img class="comment-avatar-img" src="https://api.dicebear.com/9.x/adventurer/svg?seed=' + seed +
            '" alt="" loading="lazy" onerror="this.parentNode.classList.add(\'avatar-fallback\'); this.remove();"></div>';
    }

    function commentCard(comment) {
        const card = document.createElement("div");
        card.className = "comment-card";
        card.innerHTML =
            avatarHTML(comment.name) +
            '<div class="comment-content">' +
            '<div class="comment-author-name">' + safeName(comment.name) + "</div>" +
            '<div class="comment-date">' + formatDate(comment.created_at) + "</div>" +
            '<div class="comment-text">' + safeText(comment.body) + "</div>" +
            "</div>";
        return card;
    }

    function formatDate(iso) {
        try {
            const d = new Date(iso);
            return d.toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" }) +
                " - " + d.toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" });
        } catch (e) {
            return "";
        }
    }

    async function loadComments() {
        const list = document.getElementById("comments-list");
        if (!list) return;
        if (!CONFIGURED) {
            list.innerHTML = '<div class="comments-info">Yorum sistemi şu an kurulum aşamasında. Kısa süre içinde aktif olacak.</div>';
            return;
        }
        const qs = new URLSearchParams({
            select: "*",
            status: "eq.approved",
            page_url: "eq." + currentPath(),
            order: "created_at.asc"
        });
        try {
            const res = await api("/rest/v1/comments?" + qs.toString());
            if (!res.ok) throw new Error("load failed");
            const comments = await res.json();
            list.innerHTML = "";
            if (!comments.length) {
                list.innerHTML = '<div class="comments-info">Henüz yorum yapılmamış. İlk yorumu siz yapın!</div>';
                return;
            }
            comments.forEach(function (c) { list.appendChild(commentCard(c)); });
        } catch (e) {
            list.innerHTML = '<div class="comments-info">Yorumlar yüklenemedi. Lütfen daha sonra tekrar deneyin.</div>';
        }
    }

    async function addComment(event) {
        if (event) event.preventDefault();
        const form = event ? event.target : document.getElementById("comment-form");
        const nameInput = document.getElementById("comment-name");
        const bodyInput = document.getElementById("comment-body");
        const name = nameInput ? nameInput.value.trim() : "";
        const body = bodyInput ? bodyInput.value.trim() : "";

        if (name.length < 2 || body.length < 2) {
            showToast("Lütfen adınızı ve yorumunuzu yazın.");
            return;
        }
        if (!CONFIGURED) {
            showToast("Yorum sistemi şu an kapalı. Lütfen daha sonra deneyin.");
            return;
        }

        const submitBtn = form ? form.querySelector(".submit-btn") : null;
        if (submitBtn) { submitBtn.disabled = true; submitBtn.classList.add("loading"); }

        try {
            const res = await api("/rest/v1/comments", {
                method: "POST",
                headers: { Prefer: "return=minimal" },
                body: JSON.stringify({
                    page_url: currentPath(),
                    page_title: document.title,
                    name: name,
                    body: body,
                    status: "pending"
                })
            });
            if (!res.ok) throw new Error("insert failed");
            if (nameInput) nameInput.value = "";
            if (bodyInput) bodyInput.value = "";
            showToast("Yorumunuz alındı! Onaylandıktan sonra yayınlanacaktır.");
        } catch (e) {
            showToast("Yorumunuz gönderilemedi. Lütfen daha sonra tekrar deneyin.");
        } finally {
            if (submitBtn) { submitBtn.disabled = false; submitBtn.classList.remove("loading"); }
        }
    }

    // Panel şifresine ihtiyaç duymayan yönlendirme (gerekirse)
    window.commentsApi = { loadComments: loadComments, addComment: addComment };

    document.addEventListener("DOMContentLoaded", loadComments);
    window.addComment = addComment;
})();
