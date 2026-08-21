#!/usr/bin/env python3
"""
build_search_index.py — TeknolojiTasarimci.com Derin Canlı Arama Dizini Oluşturucu
Tüm gönderileri (98 post - başlık, içerik, tablolar, etiketler), 
zekâ oyunlarını (34 oyun), etkinlikleri ve uygulamaları derinlemesine tarar.
"""
import os, glob, re, json

def clean_html_text(html_str):
    # Remove script and style tags
    text = re.sub(r"<(script|style)[^>]*>[\s\S]*?</\1>", "", html_str, flags=re.IGNORECASE)
    # Remove html tags
    text = re.sub(r"<[^>]+>", " ", text)
    # Normalize spaces
    text = re.sub(r"\s+", " ", text).strip()
    return text

def build_index():
    base = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
    search_items = []

    # 1. Gönderiler (sayfalar/post-*)
    posts_dirs = sorted(glob.glob(os.path.join(base, "sayfalar", "post-*")))
    for pdir in posts_dirs:
        pname = os.path.basename(pdir)
        html_file = os.path.join(pdir, f"{pname[:10]}-preview.html")
        if not os.path.isfile(html_file):
            html_files = glob.glob(pdir + "/*.html")
            if html_files:
                html_file = html_files[0]
            else:
                continue
        
        content = open(html_file, "r", encoding="utf-8", errors="ignore").read()
        
        title_m = re.search(r"<h1[^>]*>(.*?)</h1>", content, re.DOTALL)
        title = re.sub(r"<[^>]+>", "", title_m.group(1)).strip() if title_m else pname
        
        desc_m = re.search(r"<meta\s+name=[\"']description[\"']\s+content=[\"'](.*?)[\"']", content, re.IGNORECASE)
        desc = desc_m.group(1).strip() if desc_m else ""
        
        cat_m = re.search(r"<span class=[\"']category-badge[\"'][^>]*>(.*?)</span>", content)
        cat = re.sub(r"<[^>]+>", "", cat_m.group(1)).strip() if cat_m else "Gönderi"
        
        cover_m = re.search(r"src=[\"'](Veri/post-\d+-Kapak\.jpg)[\"']", content)
        cover = f"sayfalar/{pname}/{cover_m.group(1)}" if cover_m else "images/logo.svg"
        
        tags = re.findall(r"<span class=[\"']hashtag[\"'][^>]*>#?(.*?)</span>", content)
        
        # Extract full body text (first 600 chars of clean content for deep snippet search)
        body_text = clean_html_text(content)[:1200]
        
        search_items.append({
            "type": "gonderi",
            "type_label": "Gönderi",
            "title": title,
            "description": desc,
            "category": cat,
            "tags": tags,
            "content": body_text,
            "url": f"sayfalar/{pname}/{os.path.basename(html_file)}",
            "cover": cover
        })

    # 2. Zekâ Oyunları (Oyunlar/index.html)
    oyunlar_html = open(os.path.join(base, "Oyunlar", "index.html"), "r", encoding="utf-8").read()
    game_matches = re.findall(r"""\["([^"]+)",\s*"([^"]+)",\s*"([^"]+)",\s*"([^"]+)"\]""", oyunlar_html)
    for slug, gtitle, gdesc, gcover in game_matches:
        if gcover.startswith("../"):
            cover_path = gcover[3:]
        else:
            cover_path = f"Oyunlar/{gcover}"
        
        # Read individual game html to get full tags and rules
        game_html_path = os.path.join(base, "Oyunlar", slug, "index.html")
        game_body = ""
        if os.path.exists(game_html_path):
            game_body = clean_html_text(open(game_html_path, "r", encoding="utf-8", errors="ignore").read())[:1000]

        search_items.append({
            "type": "oyun",
            "type_label": "Zekâ Oyunu",
            "title": gtitle,
            "description": gdesc,
            "category": "Zekâ Oyunları",
            "tags": ["Oyun", "Zeka", "Bulmaca", gtitle, slug],
            "content": game_body,
            "url": f"Oyunlar/{slug}/index.html",
            "cover": cover_path
        })

    # 3. Etkinlikler (etkinlikler/)
    etkinlikler = [
        ("7-sinif-etkinlikleri", "7. Sınıf Teknoloji ve Tasarım Etkinlikleri", "7. Sınıf düzeyine uygun tüm teknoloji ve tasarım dersi etkinlikleri, çalışma yaprakları ve kılavuzlar.", "etkinlikler/7-sinif-etkinlikleri/Veri/7-sinif-etkinlikleri-kapak.jpg"),
        ("8-sinif-etkinlikleri", "8. Sınıf Teknoloji ve Tasarım Etkinlikleri", "8. Sınıf düzeyine uygun tüm teknoloji ve tasarım dersi etkinlikleri, inovasyon ve tasarım projeleri.", "etkinlikler/8-sinif-etkinlikleri/Veri/8-sinif-etkinlikleri-kapak.jpg"),
        ("ogrenci-calismalari", "Öğrenci Çalışmaları ve Proje Sergisi", "Teknoloji ve Tasarım dersinde öğrenciler tarafından geliştirilen yaratıcı ürünler ve sergiler.", "etkinlikler/ogrenci-calismalari/Veri/ogrenci-calismalari-kapak.jpg"),
        ("zeka-oyunlari", "Zekâ Oyunları Arşivi ve Rehberi", "Öğrencilerin mantık, strateji ve problem çözme becerilerini geliştiren tüm zekâ oyunları (Solo Test, Satranç, Mangala, Dama, Surakarta, Kutuban, Sudoku vb.).", "etkinlikler/zeka-oyunlari/Veri/zeka-oyunlari-kapak.jpg")
    ]
    for eslug, etitle, edesc, ecover in etkinlikler:
        etk_html_path = os.path.join(base, "etkinlikler", eslug, f"{eslug}.html")
        etk_body = ""
        if os.path.exists(etk_html_path):
            etk_body = clean_html_text(open(etk_html_path, "r", encoding="utf-8", errors="ignore").read())[:1500]

        search_items.append({
            "type": "etkinlik",
            "type_label": "Etkinlik",
            "title": etitle,
            "description": edesc,
            "category": "Etkinlikler",
            "tags": ["Etkinlik", "Ders", "Müfredat", etitle, "Solo Test", "Satranç", "Mangala", "Sudoku"],
            "content": etk_body,
            "url": f"etkinlikler/{eslug}/{eslug}.html",
            "cover": ecover
        })

    # 4. Uygulamalar (uygulamalar/)
    apps = [
        ("posteryap", "Poster Yap", "Hızlı ve modern tasarım posterleri oluşturabileceğiniz dijital web uygulaması.", "uygulamalar/Veri/posteryap-kapak.jpg"),
        ("medya-donusturucu", "Medya Dönüştürücü", "Görsel ve ses dosyalarınızı farklı formatlara dönüştüren ücretsiz web aracı.", "uygulamalar/Veri/medya-donusturucu-kapak.jpg"),
        ("fotograf-boyutlandirici", "e-Okul Fotoğraf Boyutlandırıcı", "e-Okul standartlarına uygun öğrenci vesikalık fotoğraflarını saniyeler içinde kırpıp boyutlandırınız.", "uygulamalar/Veri/fotograf-boyutlandirici-kapak.jpg"),
        ("notomatik", "Notomatik", "Öğretmenler için ders içi değerlendirme ve not çizelgesi oluşturma asistanı.", "uygulamalar/Veri/notomatik-kapak.jpg")
    ]
    for aslug, atitle, adesc, acover in apps:
        search_items.append({
            "type": "uygulama",
            "type_label": "Uygulama",
            "title": atitle,
            "description": adesc,
            "category": "Uygulamalar",
            "tags": ["Uygulama", "Araç", "Yazılım", atitle],
            "content": adesc,
            "url": f"uygulamalar/{aslug}.html",
            "cover": acover
        })

    js_content = f"// search-index.js — TeknolojiTasarimci.com Canlı Arama Dizini (Tam Metin & Kategori)\nwindow.SITE_SEARCH_INDEX = {json.dumps(search_items, ensure_ascii=False, indent=2)};\n"
    target_path = os.path.join(base, "js", "search-index.js")
    open(target_path, "w", encoding="utf-8").write(js_content)
    print(f"Toplam {len(search_items)} içerik derin tarandı ve {target_path} güncellendi.")

if __name__ == "__main__":
    build_index()
