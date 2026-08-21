/* ============================================================
 * teknolojitasarimci.com — Evrensel Standart Yorum & Tepki Modülü
 * ------------------------------------------------------------
 * - Otomatik Stil Enjeksiyonu (860px Sabit Standart Genişlik)
 * - Firebase Firestore REST API Entegrasyonu & Hata Koruması
 * - Tüm sayfalarda milimetrik eşit tasarım ve koyu tema uyumu
 * ============================================================ */
(function () {
    "use strict";

    const PROJECT_ID = window.FIREBASE_PROJECT_ID || "teknolojitasarimci-559ea";
    const API_KEY = window.FIREBASE_API_KEY || "AIzaSyBgLAzifTnMcJxCBpaPowZhxiPtnu0BXtI";
    const CONFIGURED = !!(PROJECT_ID && API_KEY);

    // ── 1. STANDART CSS STİLLERİNİ ENJEKTE ET ──
    function injectCommentsStyles() {
        if (document.getElementById("tt-comments-style")) return;
        const style = document.createElement("style");
        style.id = "tt-comments-style";
        style.textContent = `
/* Evrensel Standart Yorum & Tepki Bileşeni */
.tt-comments-widget {
    max-width: 860px !important;
    width: 100% !important;
    margin: 40px auto 25px auto !important;
    padding: 0 15px !important;
    box-sizing: border-box !important;
    font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
}
.tt-comments-widget * {
    box-sizing: border-box;
}
.tt-comments-widget .reactions-box {
    text-align: center;
    margin-bottom: 25px;
    padding: 22px;
    background: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 18px;
    box-shadow: 0 4px 16px rgba(0,0,0,0.03);
}
body.dark .tt-comments-widget .reactions-box {
    background: #1e293b;
    border-color: #334155;
}
.tt-comments-widget .reactions-title {
    font-size: 15px;
    font-weight: 700;
    color: #475569;
    margin-bottom: 15px;
}
body.dark .tt-comments-widget .reactions-title {
    color: #94a3b8;
}
.tt-comments-widget .reactions-list {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 12px;
}
.tt-comments-widget .reaction-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 10px 20px;
    background: #f8fafc;
    border: 1.5px solid #cbd5e1;
    border-radius: 25px !important;
    font-size: 13.5px;
    font-weight: 700;
    color: #334155;
    cursor: pointer;
    transition: all 0.2s ease;
    width: fit-content;
    user-select: none;
}
body.dark .tt-comments-widget .reaction-btn {
    background: #0f172a;
    border-color: #334155;
    color: #cbd5e1;
}
.tt-comments-widget .reaction-btn:hover {
    transform: translateY(-2px);
    border-color: #0284c7;
}
.tt-comments-widget .reaction-btn.active {
    background: rgba(2, 132, 199, 0.12);
    border-color: #0284c7;
    color: #0284c7;
}
body.dark .tt-comments-widget .reaction-btn.active {
    background: rgba(2, 132, 199, 0.25);
    border-color: #38bdf8;
    color: #38bdf8;
}
.tt-comments-widget .reaction-count {
    background: rgba(0,0,0,0.06);
    padding: 2px 7px;
    border-radius: 12px;
    font-size: 12px;
}
body.dark .tt-comments-widget .reaction-count {
    background: rgba(255,255,255,0.1);
}
.tt-comments-widget .comments-section {
    background: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 20px;
    padding: 28px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.03);
}
body.dark .tt-comments-widget .comments-section {
    background: #1e293b;
    border-color: #334155;
}
.tt-comments-widget .comments-header-title {
    font-size: 20px;
    font-weight: 800;
    color: #0f172a;
    margin-bottom: 22px;
    display: flex;
    align-items: center;
    gap: 10px;
}
body.dark .tt-comments-widget .comments-header-title {
    color: #f8fafc;
}
.tt-comments-widget .comment-form {
    display: flex;
    flex-direction: column;
    gap: 16px;
    margin-bottom: 30px;
}
.tt-comments-widget .form-group {
    display: flex;
    flex-direction: column;
    gap: 6px;
}
.tt-comments-widget .form-group label {
    font-size: 13.5px;
    font-weight: 700;
    color: #475569;
}
body.dark .tt-comments-widget .form-group label {
    color: #cbd5e1;
}
.tt-comments-widget .form-control {
    width: 100%;
    padding: 12px 16px;
    border: 1.5px solid #cbd5e1;
    border-radius: 12px;
    font-size: 14px;
    font-family: inherit;
    background: #ffffff;
    color: #0f172a;
    transition: border-color 0.2s, box-shadow 0.2s;
}
body.dark .tt-comments-widget .form-control {
    background: #0f172a;
    border-color: #334155;
    color: #f8fafc;
}
.tt-comments-widget .form-control:focus {
    outline: none;
    border-color: #0284c7;
    box-shadow: 0 0 0 3px rgba(2, 132, 199, 0.15);
}
.tt-comments-widget textarea.form-control {
    min-height: 100px;
    resize: vertical;
}
.tt-comments-widget .submit-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 12px 32px;
    background: #0284c7;
    color: #ffffff;
    font-size: 14.5px;
    font-weight: 700;
    border: none;
    border-radius: 25px !important;
    cursor: pointer;
    transition: all 0.2s ease;
    width: fit-content;
    margin: 10px auto 0 auto;
}
.tt-comments-widget .submit-btn:hover {
    background: #0369a1;
    transform: translateY(-2px);
    box-shadow: 0 4px 14px rgba(2, 132, 199, 0.3);
}
.tt-comments-widget .comments-list {
    display: flex;
    flex-direction: column;
    gap: 16px;
}
.tt-comments-widget .comment-card {
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 14px;
    padding: 16px 18px;
    display: flex;
    gap: 14px;
}
body.dark .tt-comments-widget .comment-card {
    background: #0f172a;
    border-color: #334155;
}
.tt-comments-widget .comment-avatar {
    width: 42px;
    height: 42px;
    border-radius: 50%;
    background: #0284c7;
    color: #fff;
    font-weight: 800;
    font-size: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    overflow: hidden;
    position: relative;
}
.tt-comments-widget .comment-avatar-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}
.tt-comments-widget .comment-content {
    flex: 1;
}
.tt-comments-widget .comment-author-name {
    font-size: 14.5px;
    font-weight: 700;
    color: #0f172a;
    margin-bottom: 2px;
}
body.dark .tt-comments-widget .comment-author-name {
    color: #f8fafc;
}
.tt-comments-widget .comment-date {
    font-size: 12px;
    color: #94a3b8;
    margin-bottom: 6px;
}
.tt-comments-widget .comment-text {
    font-size: 14px;
    line-height: 1.5;
    color: #334155;
}
body.dark .tt-comments-widget .comment-text {
    color: #cbd5e1;
}
.tt-comments-widget .comments-info {
    text-align: center;
    padding: 24px;
    color: #64748b;
    font-size: 14px;
    background: #f8fafc;
    border-radius: 12px;
    border: 1px dashed #cbd5e1;
}
body.dark .tt-comments-widget .comments-info {
    background: #0f172a;
    border-color: #334155;
    color: #94a3b8;
}
`;
        document.head.appendChild(style);
    }

    function currentPath() {
        let p = window.location.pathname;
        if (p.endsWith("/")) p += "index.html";
        return p;
    }

    function firestoreUrl(collection, action = "") {
        let url = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents`;
        if (action === "runQuery") url += `:runQuery?key=${API_KEY}`;
        else if (collection) url += `/${collection}?key=${API_KEY}`;
        return url;
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

    // ── 2. BİLEŞENİ SAYFAYA ENJEKTE ET VE SAR (GARANTİLİ 860PX KAPSAYICI) ──
    function buildWidgetHTML() {
        return `
            <!-- Tepki & Beğeni İkonları -->
            <div class="reactions-box">
                <div class="reactions-title">Bu içeriği nasıl buldunuz? Tepkinizi belirtin:</div>
                <div class="reactions-list">
                    <button class="reaction-btn" onclick="toggleReaction(this)">
                        <svg class="svg-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0284c7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/></svg>
                        Faydalı <span class="reaction-count">0</span>
                    </button>
                    <button class="reaction-btn" onclick="toggleReaction(this)">
                        <svg class="svg-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                        Harika <span class="reaction-count">0</span>
                    </button>
                    <button class="reaction-btn" onclick="toggleReaction(this)">
                        <svg class="svg-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                        Teşekkürler <span class="reaction-count">0</span>
                    </button>
                    <button class="reaction-btn" onclick="toggleReaction(this)">
                        <svg class="svg-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h3a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2h-3"/></svg>
                        Geliştirilmeli <span class="reaction-count">0</span>
                    </button>
                </div>
            </div>

            <!-- Yorum Bölümü -->
            <section class="comments-section">
                <h3 class="comments-header-title">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                    Yorumlar ve Değerlendirmeler
                </h3>
                <form class="comment-form" id="comment-form" onsubmit="addComment(event)">
                    <div class="form-group">
                        <label for="comment-name">Adınız Soyadınız *</label>
                        <input type="text" id="comment-name" class="form-control" placeholder="Örn: Ahmet Yılmaz" required>
                    </div>
                    <div class="form-group">
                        <label for="comment-body">Yorumunuz *</label>
                        <textarea id="comment-body" class="form-control" placeholder="Görüş, öneri veya teşekkür mesajınızı yazabilirsiniz..." required></textarea>
                    </div>
                    <button type="submit" class="submit-btn">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
                        Yorumu Gönder
                    </button>
                </form>
                <div class="comments-list" id="comments-list"></div>
            </section>
        `;
    }

    function ensureCommentsUI() {
        injectCommentsStyles();

        let widget = document.querySelector(".tt-comments-widget");
        if (widget) return; // Zaten mevcut

        // Sayfada statik olarak yazılmış .comments-section veya #comments-container var mı?
        const existingSection = document.querySelector(".comments-section");
        const existingReactions = document.querySelector(".reactions-box");
        const existingContainer = document.getElementById("comments-container") || document.getElementById("yorumlar");

        if (existingContainer) {
            existingContainer.className = "tt-comments-widget";
            existingContainer.innerHTML = buildWidgetHTML();
            return;
        }

        // Eğer sayfada mevcut reactions ve comments varsa bunları tek bir tt-comments-widget içine sar
        if (existingSection || existingReactions) {
            const parent = (existingReactions || existingSection).parentNode;
            const wrap = document.createElement("div");
            wrap.className = "tt-comments-widget";

            if (existingReactions && existingReactions.parentNode) {
                wrap.appendChild(existingReactions);
            }
            if (existingSection && existingSection.parentNode) {
                wrap.appendChild(existingSection);
            }
            if (parent) {
                parent.appendChild(wrap);
            }
            return;
        }

        // Otomatik enjeksiyon: Footer öncesi veya body sonu
        const footer = document.querySelector("footer.footer") ||
                       document.getElementById("site-footer") ||
                       document.querySelector("footer");

        widget = document.createElement("div");
        widget.className = "tt-comments-widget";
        widget.innerHTML = buildWidgetHTML();

        if (footer && footer.parentNode) {
            footer.parentNode.insertBefore(widget, footer);
        } else {
            document.body.appendChild(widget);
        }
    }

    // ── 3. YORUMLARI ÇEK VE LİSTELE (FIREBASE) ──
    async function loadComments() {
        ensureCommentsUI();
        const list = document.getElementById("comments-list");
        if (!list) return;

        if (!CONFIGURED) {
            list.innerHTML = '<div class="comments-info">Henüz yorum yapılmamış. İlk yorumu siz yapın!</div>';
            return;
        }

        try {
            const res = await fetch(firestoreUrl(null, "runQuery"), {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    structuredQuery: {
                        from: [{ collectionId: "comments" }],
                        where: {
                            fieldFilter: {
                                field: { fieldPath: "page_url" },
                                op: "EQUAL",
                                value: { stringValue: currentPath() }
                            }
                        }
                    }
                })
            });

            if (!res.ok) {
                list.innerHTML = '<div class="comments-info">Henüz yorum yapılmamış. İlk yorumu siz yapın!</div>';
                return;
            }

            const data = await res.json();
            list.innerHTML = "";
            const approvedList = [];

            if (Array.isArray(data)) {
                data.forEach(function (row) {
                    if (!row.document) return;
                    const fields = row.document.fields;
                    if (!fields) return;
                    const status = fields.status ? fields.status.stringValue : "pending";
                    
                    if (status === "approved") {
                        approvedList.push({
                            name: fields.name ? fields.name.stringValue : "Anonim",
                            body: fields.body ? fields.body.stringValue : "",
                            created_at: fields.created_at ? fields.created_at.timestampValue : new Date().toISOString()
                        });
                    }
                });
            }

            approvedList.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));

            if (approvedList.length === 0) {
                list.innerHTML = '<div class="comments-info">Henüz yorum yapılmamış. İlk yorumu siz yapın!</div>';
            } else {
                approvedList.forEach(c => list.appendChild(commentCard(c)));
            }
        } catch (e) {
            list.innerHTML = '<div class="comments-info">Henüz yorum yapılmamış. İlk yorumu siz yapın!</div>';
        }
    }

    // ── 4. YENİ YORUM GÖNDERME ──
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

        const submitBtn = form ? form.querySelector(".submit-btn") : null;
        if (submitBtn) { submitBtn.disabled = true; submitBtn.classList.add("loading"); }

        try {
            await fetch(firestoreUrl("comments"), {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    fields: {
                        page_url: { stringValue: currentPath() },
                        page_title: { stringValue: document.title },
                        name: { stringValue: name },
                        body: { stringValue: body },
                        status: { stringValue: "pending" },
                        created_at: { timestampValue: new Date().toISOString() }
                    }
                })
            });

            if (nameInput) nameInput.value = "";
            if (bodyInput) bodyInput.value = "";
            showToast("Yorumunuz alındı! Onaylandıktan sonra yayınlanacaktır.");
        } catch (e) {
            if (nameInput) nameInput.value = "";
            if (bodyInput) bodyInput.value = "";
            showToast("Yorumunuz alındı! Onaylandıktan sonra yayınlanacaktır.");
        } finally {
            if (submitBtn) { submitBtn.disabled = false; submitBtn.classList.remove("loading"); }
        }
    }

    // Tepki toggle fonksiyonunu bağla
    window.toggleReaction = function (btn) {
        if (window.reactionsApi && typeof window.reactionsApi.toggleReaction === "function") {
            window.reactionsApi.toggleReaction(btn);
        }
    };

    window.commentsApi = { loadComments: loadComments, addComment: addComment, ensureCommentsUI: ensureCommentsUI };
    document.addEventListener("DOMContentLoaded", loadComments);
    window.addComment = addComment;
})();
