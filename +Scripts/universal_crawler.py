#!/usr/bin/env python3
"""
universal_crawler.py — TeknolojiTasarimci.com Evrensel İçerik ve Arama Dizini Oluşturucu
Tüm siteyi (98 Gönderi, 34 Zekâ Oyunu, 4 Etkinlik Merkezi, 4 Web Uygulaması ve Müstakil PDF Dosyalarını)
otomatik olarak tarar, kategorize eder ve js/search-index.js dosyasını günceller.
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

def run_crawler():
    base = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
    search_items = []
    seen_urls = set()

    # ─── 1. ZEKÂ OYUNLARI (Oyunlar/) ───
    oyunlar_html_path = os.path.join(base, "Oyunlar", "index.html")
    if os.path.exists(oyunlar_html_path):
        oyunlar_html = open(oyunlar_html_path, "r", encoding="utf-8").read()
        game_matches = re.findall(r"""\["([^"]+)",\s*"([^"]+)",\s*"([^"]+)",\s*"([^"]+)"\]""", oyunlar_html)
        for slug, gtitle, gdesc, gcover in game_matches:
            cover_path = gcover[3:] if gcover.startswith("../") else f"Oyunlar/{gcover}"
            game_url = f"Oyunlar/{slug}/index.html"
            
            # Read game rules & text if available
            game_html_file = os.path.join(base, "Oyunlar", slug, "index.html")
            game_body = ""
            if os.path.exists(game_html_file):
                game_body = clean_html_text(open(game_html_file, "r", encoding="utf-8", errors="ignore").read())[:1200]

            search_items.append({
                "type": "oyun",
                "type_label": "Zekâ Oyunu",
                "badge": "🎮 İnteraktif Oyun",
                "title": gtitle,
                "description": gdesc,
                "category": "Zekâ Oyunları",
                "tags": ["Oyun", "Zeka", "Bulmaca", "Akıl Oyunu", gtitle, slug],
                "content": game_body,
                "url": game_url,
                "cover": cover_path
            })
            seen_urls.add(game_url)

    # ─── 2. GÖNDERİLER VE İÇERİK YAZILARI (sayfalar/post-*) ───
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
        body_text = clean_html_text(content)[:1500]
        post_url = f"sayfalar/{pname}/{os.path.basename(html_file)}"

        search_items.append({
            "type": "gonderi",
            "type_label": "Gönderi",
            "badge": "📝 Gönderi & Rehber",
            "title": title,
            "description": desc,
            "category": cat,
            "tags": tags,
            "content": body_text,
            "url": post_url,
            "cover": cover
        })
        seen_urls.add(post_url)

        # Check for downloadable PDF attachments inside post
        pdf_matches = re.findall(r"""href=[\"'](Veri/[^\"']+\.pdf)[\"'][^>]*>(.*?)</a>""", content, re.IGNORECASE)
        for pdf_rel, link_text in pdf_matches:
            pdf_clean_title = re.sub(r"<[^>]+>", "", link_text).strip() or f"{title} (PDF)"
            pdf_url = f"sayfalar/{pname}/{pdf_rel}"
            if pdf_url not in seen_urls:
                search_items.append({
                    "type": "pdf",
                    "type_label": "PDF Belge",
                    "badge": "📄 İndirilebilir PDF",
                    "title": pdf_clean_title,
                    "description": f"{title} yazısına ait indirilebilir ve yazdırılabilir resmî A4 PDF dokümanı.",
                    "category": "PDF & Dokümanlar",
                    "tags": ["PDF", "İndir", "Yazdır", "Doküman", title] + tags,
                    "content": f"{pdf_clean_title} {title} PDF indir yazdır çalışma yaprağı evrak",
                    "url": pdf_url,
                    "cover": cover
                })
                seen_urls.add(pdf_url)

    # ─── 3. ETKİNLİKLER (etkinlikler/) ───
    etkinlikler = [
        ("7-sinif-etkinlikleri", "7. Sınıf Teknoloji ve Tasarım Etkinlikleri", "7. Sınıf düzeyine uygun tüm teknoloji ve tasarım dersi etkinlikleri, çalışma yaprakları ve kılavuzlar.", "etkinlikler/7-sinif-etkinlikleri/Veri/7-sinif-etkinlikleri-kapak.jpg"),
        ("8-sinif-etkinlikleri", "8. Sınıf Teknoloji ve Tasarım Etkinlikleri", "8. Sınıf düzeyine uygun tüm teknoloji ve tasarım dersi etkinlikleri, inovasyon ve tasarım projeleri.", "etkinlikler/8-sinif-etkinlikleri/Veri/8-sinif-etkinlikleri-kapak.jpg"),
        ("ogrenci-calismalari", "Öğrenci Çalışmaları ve Proje Sergisi", "Teknoloji ve Tasarım dersinde öğrenciler tarafından geliştirilen yaratıcı ürünler ve sergiler.", "etkinlikler/ogrenci-calismalari/Veri/ogrenci-calismalari-kapak.jpg"),
        ("zeka-oyunlari", "Zekâ Oyunları Arşivi ve Rehberi", "Öğrencilerin mantık, strateji ve problem çözme becerilerini geliştiren tüm zekâ oyunları (Solo Test, Satranç, Mangala, Dama, Surakarta, Kutuban, Sudoku vb.).", "etkinlikler/zeka-oyunlari/Veri/zeka-oyunlari-kapak.jpg")
    ]
    for eslug, etitle, edesc, ecover in etkinlikler:
        etk_html_path = os.path.join(base, "etkinlikler", eslug, f"{eslug}.html")
        # Sadece bu sayfanın kendi bağlantı metinlerinden etiket üret; hardcode liste kullanma
        etk_page_tags = ["Etkinlik", "Ders", "Müfredat", etitle]
        if os.path.exists(etk_html_path):
            etk_raw = open(etk_html_path, "r", encoding="utf-8", errors="ignore").read()
            link_texts = re.findall(r'<a[^>]+>([^<]{3,60})</a>', etk_raw)
            heading_texts = re.findall(r'<h[2-4][^>]*>([^<]{3,80})</h[2-4]>', etk_raw)
            for lt in link_texts + heading_texts:
                lt_clean = re.sub(r'<[^>]+>', '', lt).strip()
                if lt_clean and lt_clean not in etk_page_tags:
                    etk_page_tags.append(lt_clean)

        etk_url = f"etkinlikler/{eslug}/{eslug}.html"
        search_items.append({
            "type": "etkinlik",
            "type_label": "Etkinlik",
            "badge": "Ders Etkinligi",
            "title": etitle,
            "description": edesc,
            "category": "Etkinlikler",
            "tags": etk_page_tags,
            "content": "",
            "url": etk_url,
            "cover": ecover
        })
        seen_urls.add(etk_url)

    # ─── 4. MÜSTAKİL PDF DOKÜMANLARI (dosyalar/) ───
    pdf_files = sorted(glob.glob(os.path.join(base, "dosyalar", "*.pdf")))
    for pf in pdf_files:
        p_name = os.path.basename(pf)
        clean_name = p_name.replace("-", " ").replace(".pdf", "")
        pdf_url = f"dosyalar/{p_name}"
        if pdf_url not in seen_urls:
            search_items.append({
                "type": "pdf",
                "type_label": "PDF Belge",
                "badge": "📄 Resmî PDF",
                "title": clean_name,
                "description": f"MEB / Teknoloji ve Tasarım Dersi resmî kılavuz ve evrak dokümanı: {clean_name}.",
                "category": "PDF & Dokümanlar",
                "tags": ["PDF", "Müfredat", "Kılavuz", "Evrak", clean_name],
                "content": f"{clean_name} MEB Teknoloji Tasarım ders kılavuz kitap program indir",
                "url": pdf_url,
                "cover": "images/logo.svg"
            })
            seen_urls.add(pdf_url)

    # ─── 5. UYGULAMALAR (uygulamalar/) ───
    apps = [
        ("posteryap", "Poster Yap", "Hızlı ve modern tasarım posterleri oluşturabileceğiniz dijital web uygulaması.", "uygulamalar/Veri/posteryap-kapak.jpg"),
        ("medya-donusturucu", "Medya Dönüştürücü", "Görsel ve ses dosyalarınızı farklı formatlara dönüştüren ücretsiz web aracı.", "uygulamalar/Veri/medya-donusturucu-kapak.jpg"),
        ("fotograf-boyutlandirici", "e-Okul Fotoğraf Boyutlandırıcı", "e-Okul standartlarına uygun öğrenci vesikalık fotoğraflarını saniyeler içinde kırpıp boyutlandırınız.", "uygulamalar/Veri/fotograf-boyutlandirici-kapak.jpg"),
        ("notomatik", "Notomatik", "Öğretmenler için ders içi değerlendirme ve not çizelgesi oluşturma asistanı.", "uygulamalar/Veri/notomatik-kapak.jpg")
    ]
    for aslug, atitle, adesc, acover in apps:
        app_url = f"uygulamalar/{aslug}.html"
        search_items.append({
            "type": "uygulama",
            "type_label": "Uygulama",
            "badge": "🛠️ Web Aracı",
            "title": atitle,
            "description": adesc,
            "category": "Uygulamalar",
            "tags": ["Uygulama", "Araç", "Yazılım", atitle],
            "content": adesc,
            "url": app_url,
            "cover": acover
        })
        seen_urls.add(app_url)

    # Export to js/search-index.js
    js_content = f"// search-index.js — TeknolojiTasarimci.com Evrensel İçerik ve Arama Dizini\nwindow.SITE_SEARCH_INDEX = {json.dumps(search_items, ensure_ascii=False, indent=2)};\n"
    target_path = os.path.join(base, "js", "search-index.js")
    open(target_path, "w", encoding="utf-8").write(js_content)
    print(f"Evrensel Tarayıcı Tamamlandı: Toplam {len(search_items)} adet içerik (Oyunlar, Gönderiler, PDF'ler, Etkinlikler) başarıyla dizine eklendi.")

if __name__ == "__main__":
    run_crawler()
