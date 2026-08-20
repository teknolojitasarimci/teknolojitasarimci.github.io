#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
kart-guncelle.py — Ana sayfa kartlarını otomatik günceller.

`sayfalar/` klasöründeki tüm `PostN-*` gönderilerini tarar ve `index.html`
ile `sayfalar/preview.html` içindeki kart listesini (#main-blog-grid) şu
kurallara göre yeniden düzenler:

  1. Eksik kartlar otomatik oluşturulur (postN-preview.html meta bilgilerinden).
  2. Kartlar Post numarasına göre büyükten küçüğe sıralanır (en yeni en üstte).
  3. Kullanılmayan/yetim kartlar (klasörü olmayan) uyarı ile raporlanır.

Kullanım:
    python3 +Scripts/kart-guncelle.py          # her iki ana sayfayı günceller
    python3 +Scripts/kart-guncelle.py --check  # yalnızca durumu raporlar

Bu script, CDN kullanmaz; tamamen yerel dosyalarla çalışır.
"""

import os
import re
import sys
import html as html_mod

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SAYFALAR = os.path.join(ROOT, "sayfalar")
HOME_INDEX = os.path.join(ROOT, "index.html")
PREVIEW = os.path.join(ROOT, "sayfalar", "preview.html")


def post_dirs():
    """sayfalar/ altındaki post-NNNNN-* klasörlerini (ad, numara) olarak döndürür."""
    out = []
    for name in os.listdir(SAYFALAR):
        m = re.match(r"^post-(\d+)-", name)
        if m and os.path.isdir(os.path.join(SAYFALAR, name)):
            out.append((name, int(m.group(1))))
    out.sort(key=lambda x: x[1])
    return out


def find_preview(dirname):
    """Klasördeki post-NNNNN-preview.html dosyasının yolunu döndürür."""
    d = os.path.join(SAYFALAR, dirname)
    for f in os.listdir(d):
        if re.match(r"^post-\d+-preview\.html$", f):
            return os.path.join(d, f)
    return None


def read_meta(preview_path):
    """Gönderi şablonundan başlık, açıklama, kapak ve kategorileri çıkarır."""
    meta = {"title": "", "desc": "", "cover": "", "cats": [], "date": ""}
    try:
        text = open(preview_path, encoding="utf-8").read()
    except OSError:
        return meta

    hm = re.search(r'<h1[^>]*>(.*?)</h1>', text, re.S)
    if hm:
        meta["title"] = re.sub(r'<[^>]+>', '', hm.group(1)).strip()
    else:
        tm = re.search(r"<title>(.*?)</title>", text, re.S)
        if tm:
            meta["title"] = re.sub(r'\s*-\s*teknolojitasarimci.*$', '', tm.group(1), flags=re.I).strip()

    dm = re.search(r'<meta name="description" content="(.*?)"\s*/?>', text, re.S)
    if dm:
        meta["desc"] = dm.group(1).strip()

    # Kapak görseli: Önce HTML içindeki post-cover-wrapper / article-cover / ana görsel referansı
    cover_m = re.search(r'class=["\'](?:article-cover|post-cover-wrapper)["\']>\s*<img[^>]+src=["\'](Veri/[^"\']+)["\']', text)
    if not cover_m:
        cover_m = re.search(r'<img[^>]+src=["\'](Veri/[^"\']*(?:kapak|cover|gorsel)[^"\']*)["\']', text, re.I)
    if not cover_m:
        cover_m = re.search(r'<article[^>]*>.*?<img[^>]+src=["\'](Veri/[^"\']+)["\']', text, re.S)
    if cover_m:
        c_src = cover_m.group(1).split("?")[0]
        meta["cover"] = os.path.join("sayfalar", os.path.basename(os.path.dirname(preview_path)), c_src).replace(os.sep, "/")
    else:
        veri = os.path.join(SAYFALAR, os.path.basename(os.path.dirname(preview_path)), "Veri")
        if os.path.isdir(veri):
            for f in sorted(os.listdir(veri)):
                if "kapak" in f.lower() or "cover" in f.lower() or "gorsel" in f.lower():
                    if f.endswith(".jpg"):
                        meta["cover"] = os.path.join("sayfalar", os.path.basename(os.path.dirname(preview_path)), "Veri", f).replace(os.sep, "/")
                        break
            if not meta["cover"]:
                for f in sorted(os.listdir(veri)):
                    if f.endswith(".jpg"):
                        meta["cover"] = os.path.join("sayfalar", os.path.basename(os.path.dirname(preview_path)), "Veri", f).replace(os.sep, "/")
                        break

    # Kategori: ilk span.category, sonra badge-pill badge-primary rozetleri, sonra H1
    cm = re.search(r'<span class="category">(.*?)</span>', text, re.S)
    if cm:
        cat = cm.group(1).strip()
        meta["cats"] = [c.strip() for c in re.split(r"[/|]", cat) if c.strip()]
    else:
        bm = re.findall(r'<span class="badge-pill badge-primary">(.*?)</span>', text, re.S)
        meta["cats"] = [b.strip() for b in bm if b.strip()]
    if not meta["cats"]:
        hm = re.search(r"<h1[^>]*>(.*?)</h1>", text, re.S)
        if hm:
            meta["cats"] = [hm.group(1).strip().split(":")[0].strip()]

    dm2 = re.search(r"(\d{2}\.\d{2}\.\d{4})", text)
    if dm2:
        meta["date"] = dm2.group(1)

    return meta


def build_card(dirname, num, prefix="sayfalar/"):
    """Yeni bir post-card bloğu üretir. prefix: index.html için 'sayfalar/', preview.html için ''."""
    preview = find_preview(dirname)
    href_name = os.path.basename(preview) if preview else f"post-{num:05d}-preview.html"
    href = f"{dirname}/{href_name}"
    meta = read_meta(preview) if preview else {}

    title = meta.get("title", "") or dirname
    desc = meta.get("desc", "") or ""
    cover = meta.get("cover", "") or ""
    if prefix == "" and cover.startswith("sayfalar/"):
        cover = cover[len("sayfalar/"):]
    if cover and "?" not in cover:
        cover = f"{cover}?v=3"
    cats = meta.get("cats", []) or ["Genel Kültür"]
    cats_str = ",".join(cats)
    first_cat = cats[0]
    date = meta.get("date", "") or ""

    img = f"<div class=\"post-image\" style=\"background-image: url('{cover}'); cursor: pointer;\"></div>" if cover else ""

    return (
        f"\n                <article class=\"post-card\" data-categories=\"{html_mod.escape(cats_str)}\">\n"
        f"                    <a href=\"{prefix}{href}\">\n"
        f"                        {img}\n"
        f"                    </a>\n"
        f"                    <div class=\"post-content\">\n"
        f"                        <span class=\"category\">{html_mod.escape(first_cat)}</span>\n"
        f"                        <h2 class=\"post-title\"><a href=\"{prefix}{href}\">{html_mod.escape(title)}</a></h2>\n"
        f"                        <p class=\"post-excerpt\">{html_mod.escape(desc)}</p>\n"
        f"                        <div class=\"post-meta\">\n"
        f"                            <span>{date}</span>\n"
        f"                            <a href=\"{prefix}{href}\" class=\"read-more\">Devamını Oku ►</a>\n"
        f"                        </div>\n"
        f"                    </div>\n"
        f"                </article>"
    )


def card_number(card_html):
    """Karttaki href'ten post numarasını çıkarır; bulamazsa None."""
    m = re.search(r"sayfalar/post-(\d+)-", card_html)
    if not m:
        m = re.search(r"post-(\d+)-", card_html)
    return int(m.group(1)) if m else None


def extract_cards(grid_html):
    """#main-blog-grid içeriğinden kart bloklarını ayıklar (yorum korunmaz)."""
    article_pat = re.compile(r'<article class="post-card".*?</article>', re.S)
    return [m.group(0).strip() for m in article_pat.finditer(grid_html)]


def sync_grid(grid_html, known, prefix="sayfalar/"):
    """Kart bloğunu günceller: tüm kartları en güncel meta bilgileriyle baştan üretir ve numaraya göre sıralar."""
    existing = extract_cards(grid_html)
    existing_nums = set()
    for c in existing:
        n = card_number(c)
        if n is not None:
            existing_nums.add(n)

    cards_map = {}
    added = []
    for dirname, num in known:
        cards_map[num] = build_card(dirname, num, prefix)
        if num not in existing_nums:
            added.append(num)

    # Sırala (büyükten küçüğe)
    ordered = [cards_map[n] for n in sorted(cards_map, reverse=True)]

    # Her kartın önüne doğru yorum satırını ekle
    comments = {n: f"<!-- Post {n:05d}: {dirname}" for dirname, n in known}
    cleaned = []
    for c in ordered:
        n = card_number(c)
        label = comments.get(n, f"<!-- Post {n:05d}:")
        cleaned.append(f"{label} -->\n                {c}")
    joined = "\n\n                ".join(cleaned)
    return "\n" + joined, added


def process_home(path, known):
    text = open(path, encoding="utf-8").read()
    prefix = "" if path == PREVIEW else "sayfalar/"
    m = re.search(r'(<section class="posts-grid" id="main-blog-grid".*?>)(.*?)(\s*</section>)', text, re.S)
    if not m:
        return text, [], ["Bölüm bulunamadı: " + path]
    open_tag, grid, close_tag = m.group(1), m.group(2), m.group(3)
    new_grid, added = sync_grid(grid, known, prefix)
    return text[: m.start(2)] + new_grid + text[m.end(2):], added, []


def main():
    check_only = "--check" in sys.argv
    known = post_dirs()
    known_set = {n for _, n in known}

    results = []
    for path in [HOME_INDEX, PREVIEW]:
        original = open(path, encoding="utf-8").read()
        new_text, added, errs = process_home(path, known)
        changed = new_text != original
        if errs:
            results.append((path, added, errs, False))
            continue
        # Yetim kart raporu (klasörü olmayan)
        orphan = []
        grid = re.search(r'(<section class="posts-grid" id="main-blog-grid".*?>)(.*?)(\s*</section>)', new_text, re.S)
        if grid:
            for c in extract_cards(grid.group(2)):
                n = card_number(c)
                if n is not None and n not in known_set:
                    orphan.append(n)
        results.append((path, added, orphan, changed))

    any_change = False
    for path, added, issues, changed in results:
        rel = os.path.relpath(path, ROOT)
        if added:
            any_change = True
            print(f"[+] {rel}: {len(added)} yeni kart eklendi -> {added}")
        if changed:
            any_change = True
            print(f"[~] {rel}: sıralama/güncelleme yapıldı")
        if issues:
            print(f"[!] {rel}: {issues}")

    if check_only:
        print("--check: değişiklik gerekli" if any_change else "--check: kartlar güncel")
        sys.exit(1 if any_change else 0)

    for path, added, issues, changed in results:
        if changed:
            new_text, _, _ = process_home(path, known)
            open(path, "w", encoding="utf-8").write(new_text)
            print(f"[*] {os.path.relpath(path, ROOT)} güncellendi.")

    print("kart-guncelle.py: tamam.")


if __name__ == "__main__":
    main()