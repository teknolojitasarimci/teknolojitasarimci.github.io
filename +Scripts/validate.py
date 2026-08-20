#!/usr/bin/env python3
"""teknolojitasarimci.com — Kapsamlı Standart ve Şablon Doğrulayıcı
Kullanım:
    python3 +Scripts/validate.py DOSYA.html
    python3 +Scripts/validate.py --all
Çıktı: her kontrol OK/FAIL; FAIL varsa çıkış kodu 1.
"""
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
JS_FILES = ["js/config.js", "js/comments.js", "js/views.js", "js/protection.js"]

EMOJI_RE = re.compile(
    "[\U0001F000-\U0001FAFF\U00002600-\U000027BF\U0001F1E6-\U0001F1FF\uFE0F]"
)


def check_page(path: Path) -> list:
    issues = []
    html = path.read_text(encoding="utf-8")

    def ok(cond, label):
        if cond:
            print(f"  OK   {label}")
        else:
            print(f"  FAIL {label}")
            issues.append(f"{path.name}: {label}")

    name = path.name
    rel = path.relative_to(ROOT)
    prefix = "../" if str(rel).startswith("etkinlikler") or str(rel).startswith("sayfalar") else ""

    print(f"\n=== {rel} ===")

    # 1. Temel Yapı
    ok(html.lstrip().startswith("<!DOCTYPE html>"), "doctype")
    ok("</html>" in html, "html kapanışı")
    ok('lang="tr"' in html, "dil tr")

    # 2. Fontlar ve CDN Yasağı
    ok("fonts.googleapis.com" not in html and "fonts.gstatic.com" not in html,
       "harici font CDN'si yok")
    ok("cdnjs.cloudflare.com" not in html and "jsdelivr.net" not in html and "unpkg.com" not in html,
       "harici kütüphane CDN'si yok")

    # 3. Ortak Stil
    ok("css/style.css" in html, "ortak stil bağlantısı (css/style.css)")

    # 4. Gönderi Detay Bileşenleri (Yazı sayfaları için)
    if "post-body-content" in html:
        for label, pattern in [
            ("badge bar", r'class="post-badge-bar"'),
            ("başlık", r'class="post-detail-title"'),
            ("meta (Hazırlayan: Mürsel EREN)", r'Hazırlayan:\s*<strong>Mürsel EREN</strong>'),
            ("paylaşım çubuğu", r'class="quick-action-bar"'),
            ("16:9 kapak", r'class="post-cover-wrapper"'),
            ("hashtag kutusu", r'class="hashtag-box"'),
            ("ilgili içerikler bölümü", r'class="related-posts-section"'),
            ("tepki butonları (4)", r'class="reaction-btn"'),
            ("yorum bölümü", r'class="comments-section"'),
            ("sayaç", r'id="view-counter"'),
            ("gönder butonu", r'onsubmit="addComment\(event\)"'),
            ("alt dön butonu", r'class="bottom-back-wrapper"'),
        ]:
            if label == "16:9 kapak" and "about-preview" in name:
                continue
            ok(bool(re.search(pattern, html)), label)

        # 4.1 İlgili İçerikler Kuralı (ZORUNLU - Tam 3 Kart)
        grid_m = re.search(r'<div class="related-posts-grid">([\s\S]*?)</div>\s*</section>', html)
        if grid_m:
            grid_content = grid_m.group(1)
            cards = re.findall(r'<a\s+[^>]*class="related-post-card"[^>]*>[\s\S]*?</a>', grid_content)
            ok(len(cards) == 3, f"ilgili içerik kart sayısı tam 3 adet (mevcut: {len(cards)})")

            # Her kartın görsel, kategori ve başlık denetimi
            for idx, card in enumerate(cards, 1):
                img_m = re.search(r'<img\s+[^>]*src=["\']([^"\']+)["\']', card)
                has_img = bool(img_m)
                ok(has_img, f"kart #{idx} kapak görseli içeriyor")
                if img_m:
                    img_src = img_m.group(1)
                    img_path = (path.parent / img_src).resolve()
                    ok(img_path.exists(), f"kart #{idx} görseli diskte mevcut ({img_src})")

                has_cat = bool(re.search(r'class="related-post-cat"', card))
                ok(has_cat, f"kart #{idx} kategori etiketi içeriyor")

                has_title = bool(re.search(r'class="related-post-card-title"', card))
                ok(has_title, f"kart #{idx} başlık içeriyor")

                # Kart bağlantısı diskte var mı
                href_m = re.search(r'href=["\']([^"\']+)["\']', card)
                if href_m:
                    href = href_m.group(1)
                    if not href.startswith("http") and not href.startswith("#"):
                        link_path = (path.parent / href).resolve()
                        ok(link_path.exists(), f"kart #{idx} link hedefi mevcut ({href})")

        # Çift bölüm koruması
        for label, pattern in [
            ("comments-section tek", r'class="comments-section"'),
            ("reactions-box tek", r'class="reactions-box"'),
            ("view-counter tek", r'id="view-counter"'),
            ("comments-list tek", r'id="comments-list"'),
        ]:
            ok(len(re.findall(pattern, html)) == 1, label)

        # E-posta alanı yasağı
        ok('type="email"' not in html, "e-posta alanı yok")

        # Örnek yorum kalmamış
        ok('<div class="comment-card">' not in html, "statik örnek yorum yok")

        # Gövde sonunda yazar tekrarı yok
        ok(html.count("Hazırlayan:") == 1 or "about-preview" in name,
           "Hazırlayan yalnızca üstte (tekrar yok)")

        # Sidebar kontrolü (Sadeleştirilmiş arama ve hızlı erişim kartları)
        has_sidebar = 'class="sidebar-column"' in html
        ok(not has_sidebar or 'sidebar-quick-title' in html or 'sidebar-search-box' in html,
           "sidebar düzeni")

    # 5. Emoji Yasağı (Labirent kedisi hariç)
    if "labirent-oyunu" not in str(path):
        emoji_hits = [(i + 1, m.group()) for i, line in enumerate(html.splitlines())
                      for m in [EMOJI_RE.search(line)] if m]
        ok(not emoji_hits, f"emoji yok {emoji_hits[:3] if emoji_hits else ''}")

    # 5.1 Tepki sayaçları 0'dan başlar
    if 'class="reaction-btn"' in html:
        ok(len(re.findall(r'class="reaction-count">0</span>', html)) >= 4,
           "tepki sayaçları 0'dan başlıyor")
        ok("js/reactions.js" in html, "js/reactions.js bağlı")

    # 6. İç Oyun Linklerinde target=_blank olmamalı
    for tag in re.findall(r'<a\s+[^>]*>', html, re.IGNORECASE):
        if "oyunlar/" in tag.lower() and "target=" in tag.lower():
            ok(False, f"iç oyun linkinde target=_blank kullanılmamış: {tag}")

    # 7. PDF Bağlantıları target=_blank rel=noopener olmalı
    for tag in re.findall(r'<a\s+[^>]*>', html, re.IGNORECASE):
        if ".pdf" in tag.lower() and not tag.lower().startswith('<a href="http'):
            has_blank = 'target="_blank"' in tag or "target='_blank'" in tag
            ok(has_blank, f"PDF linki target=_blank içeriyor: {tag[:60]}...")

    # 8. JS Dosyaları Diskte Mevcut
    if "post-body-content" in html:
        for js in JS_FILES:
            ok((ROOT / js).exists(), f"{js} diskte var")

    return issues


def check_card_integrity() -> list:
    """Kart Bütünlük Denetimi: sayfalar/ altındaki her PostN-* klasörü,
    sayfalar/preview.html ve kök index.html içinde kart sahibi olmalıdır."""
    issues = []
    preview = ROOT / "sayfalar" / "preview.html"
    index = ROOT / "index.html"
    preview_html = preview.read_text(encoding="utf-8")
    index_html = index.read_text(encoding="utf-8")

    print("\n=== Kart Bütünlük Denetimi (preview.html + index.html) ===")
    posts = sorted(
        (p for p in (ROOT / "sayfalar").iterdir()
         if p.is_dir() and p.name.startswith("post-")),
        key=lambda p: int(re.search(r"post-(\d+)", p.name).group(1)),
    )
    if not posts:
        return issues
    print(f"  Bulunan gönderi klasörleri: {len(posts)}")

    for p in posts:
        key = p.name
        if key not in preview_html:
            print(f"  FAIL {key}: sayfalar/preview.html içinde kartı YOK")
            issues.append(f"Kart eksik: {key} (preview.html)")
        if key not in index_html:
            print(f"  FAIL {key}: index.html içinde kartı YOK")
            issues.append(f"Kart eksik: {key} (index.html)")

    if not issues:
        print("  OK   Tüm gönderiler her iki ana sayfada da kart sahibi")
    return issues


def main():
    args = sys.argv[1:]
    if not args:
        print("Kullanım: python3 +Scripts/validate.py DOSYA.html | --all")
        sys.exit(2)

    files = []
    if args[0] == "--all":
        files = [p for p in ROOT.glob("*.html")
                 if p.name not in ("index.html", "yeni-gonderi.html", "admin.html")]
        files += list(ROOT.glob("sayfalar/*.html"))
        files += [p for p in ROOT.glob("sayfalar/Post*/*.html") if not p.name.endswith("postX-preview.html")]
        files += list(ROOT.glob("etkinlikler/*.html"))
        files += list(ROOT.glob("etkinlikler/*/*.html"))
    else:
        files = [ROOT / a for a in args]

    all_issues = []
    for f in files:
        if not f.exists():
            print(f"YOK: {f}")
            continue
        all_issues += check_page(f)

    if args[0] == "--all":
        all_issues += check_card_integrity()

    print("\n" + "=" * 50)
    if all_issues:
        print(f"SONUÇ: {len(all_issues)} SORUN BULUNDU — Lütfen düzeltin!")
        sys.exit(1)
    print("SONUÇ: TÜM KONTROLLER BAŞARILI (OK) — Standartlara uygun.")


if __name__ == "__main__":
    main()
