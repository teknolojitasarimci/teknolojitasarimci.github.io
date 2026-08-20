# teknolojitasarimci.com — SABLON REHBERİ

Bu rehber, site şablonunun **asla bozulmaması** ve hangi yapay zekâya verilirse
verilsin **birebir aynı standartta** yeni gönderi üretilebilmesi için hazırlandı.

---

## 1. Dosya Haritası

| Dosya | Görev |
|---|---|
| `+Sablon/sablonum.html` | **MASTER ŞABLON** — tüm yazı sayfalarının referansı |
| `+yeni-gonderi.html` | Yeni gönderi iskeleti (kopyala, doldur, kaydet) |
| `sayfalar/preview.html` | Ana Sayfa (slider + gönderi kartları) |
| `sayfalar/PostX-KisaBaslik/postX-preview.html` | Yazı sayfaları (kendi klasöründe) | |
| `sayfalar/about-preview.html` | Hakkımda sayfası |
| `sayfalar/uygulamalarim-preview.html` | Uygulamalarım sayfası |
| `admin.html` | Yorum denetim paneli (şifreli) |
| `uygulamalar/medya-donusturucu.html` | Medya Dönüştürücü (site çerçeveli, validate dışı) |
| `uygulamalar/posteryap.html` | PosterYap (site çerçeveli, validate dışı) |
| `etkinlikler/` | 7/8. sınıf, öğrenci çalışmaları, zeka oyunları kopyaları |
| `css/style.css` | Ortak stil (her sayfa bu dosyayı kullanır) |
| `js/config.js` | Supabase URL + anon key |
| `js/comments.js` | Yorum sistemi (onay mekanizmalı) |
| `js/views.js` | Gerçek görüntülenme sayacı |
| `js/reactions.js` | Gerçek tepki sayaçları (0'dan başlar, oy geri alınabilir) |
| `js/protection.js` | Kopyalama koruması |
| `supabase-schema.sql` | Veritabanı kurulumu (Supabase SQL Editor) |
| `+Scripts/validate.py` | Şablon doğrulayıcı |

---

## 2. Altın Kurallar (ASLA İHLAL ETME)

1. **Emoji YASAKTIR.** Yalnızca vektörel **SVG** ikonlar kullanılır.
2. **Kapak görselleri her zaman 16:9** oranındadır ve görselin **içinde yazı/yazı**
   bulunmaz.
3. **Renk dili:** Turkuaz `#00A4EF` → `#0078D7` geçişli degradeler.
4. **Fontlar:** Başlıklar `Plus Jakarta Sans`, gövde `Inter`
   (`display=optional` ile yüklenir, asla `swap` yapma — sayfa titremesine neden olur).
5. **Yorum formunda E-POSTA alanı kesinlikle yoktur.** Yalnızca ad + yorum.
6. **Yorumlar ve sayaç elle yazılmaz.** `js/comments.js` ve `js/views.js` halleder.
   Yorumlar önce "bekliyor" durumunda gelir, yalnızca panelden onaylananlar görünür.
7. **Başlık üstte görünür.** Gövdenin sonunda (kaynakların üstünde/altında) "Hazırlayan: ..." vb. tekrar YAZILMAZ.
8. Sayfa bileşen sırası sabittir (aşağıdaki anatomiye bak).
9. **"Hazırlayan: Mürsel EREN"** bilgisi yalnızca üstteki meta bölümünde görünür.
10. Yeni gönderi sonunda **mutlaka** `python3 +Scripts/validate.py dosya.html` çalıştırılır;
    tüm kontroller "OK" vermeden yayınlanmaz.

---

## 3. Yazı Sayfası Anatomisi (sablonum.html ile birebir)

```
<!DOCTYPE html> + <html lang="tr">
├── <head>
│   ├── <title> + <meta name="description">
│   ├── Google Fonts (Plus Jakarta Sans + Inter, display=optional)
│   ├── css/style.css
│   └── <style> Premium blok (sablonum.html'den birebir kopyalanır)
├── <body>
│   ├── <div id="toast-notification">
│   ├── <header> arama + nav (ilgili bölümde class="nav-pill active"; Etkinlikler ve Uygulamalarım AÇILIR MENÜDÜR — Uygulamalarım menüsü: Medya Dönüştürücü / Notomatik (Çok Yakında, disabled) / Poster Yap → posteryap.html)
│   ├── <main class="container article-layout">
│   │   ├── <article class="post-detail">
│   │   │   1. back-btn "Ana Sayfaya Dön"
│   │   │   2. post-detail-header
│   │   │      ├── post-badge-bar (2× badge-primary + badge-read-time)
│   │   │      ├── h1.post-detail-title
│   │   │      └── post-detail-meta (tarih / Hazırlayan / Görüntülenme)
│   │   │   2.5 quick-action-bar (Kopyala / WhatsApp / Yazdır)
│   │   │   3. post-cover-wrapper (16:9 kapak)
│   │   │   4. post-body-content (içerik)
│   │   │   5. hashtag-box
│   │   │   5.5 related-posts-section (3 kart)
│   │   │   6. reactions-box (4 SVG buton, sayaçlar 0'dan başlar)
│   │   │   7. comments-section (ad + yorum, onsubmit="addComment(event)")
│   │   │      └── <div class="comments-list" id="comments-list"></div> (BOŞ!)
│   │   │   8. bottom-back-wrapper
│   │   └── <aside class="sidebar-column"> 46 kategori
│   ├── <footer> Copyright © Mürsel EREN
│   └── <script> copyPageUrl + toggleReaction (kısa blok)
│       + js/config.js, comments.js, views.js, reactions.js, protection.js
│       (etkinlikler/ için ../js/...)
```

### Görüntülenme sayacı (elle sayı yazma)
```html
<span>Görüntülenme: <strong><span id="view-counter" data-path="/dosya-adi.html">0</span></strong></span>
```

---

## 4. Yeni Gönderi Ekleme (AI'lara verilecek adım adım talimat)

> **Yapı:** Her gönderi kendi klasöründe durur: `sayfalar/PostX-KisaBaslik/postX-preview.html`.
> Gönderiye ait tüm medya (kapak, görsel, video, ses) klasörün içindeki `Veri/` alt klasöründe olur.
> Diğer sayfalardan gönderiye bağlantı: `sayfalar/PostX-KisaBaslik/postX-preview.html`
> Diğer gönderilerin kapakları kendi klasörlerinde durur; `Veri/` üzerinden referans verilir.

1. `+yeni-gonderi.html` dosyasını kopyala ve `sayfalar/Post12-KisaBaslik/post12-preview.html` gibi adlandır.
2. Baştaki yorum kutusundaki talimatları oku (tüm `[BASLIK]` alanlarını doldur).
3. İçeriği mevcut yazıların üslubuyla yaz (ör. `sayfalar/Post11-BilimInsanlari/post11-preview.html` örnek alınır).
   - Tablolar: `table.modern-table`
   - Vurgular: `meta-box-enhanced`
   - Bağlantı kutuları: `doc-item-btn` (içerik linkleri)
4. Kapak görselini gönderi klasörünün içindeki `Veri/` klasörüne 16:9 PNG olarak ekle (üzerinde yazı YOK).
   - Dosya içindeki tüm göreli yollar derinliğe göre ayarlanır (post klasörü 2 seviye derinde:
     `../..` ile site köküne çıkılır).
5. Doğrula: `python3 +Scripts/validate.py sayfalar/Post12-KisaBaslik/post12-preview.html`
6. Tamam ise: `sayfalar/preview.html` ana sayfasına kart + slider ekle ve
   `+Sablon/sablonum.html`'deki `related-posts` bölümlerini uygun kartlarla güncelle.
7. `etkinlikler/` alt klasörüne kopya eklenirse tüm bağlantıları `../..` ile önekle
   (`css/style.css` → `../../css/style.css`, `images/` → `../../images/`,
   `postX-preview.html` → `../../sayfalar/PostX-KisaBaslik/postX-preview.html`).

---

## 5. Supabase Kurulumu (bir kez)

1. supabase.com → ücretsiz proje aç.
2. SQL Editor → `supabase-schema.sql` içeriğini çalıştır.
3. SQL'deki `SIFRENI_BURAYA_YAZ` satırını kendi panel şifrenle değiştirip tekrar çalıştır.
4. Project Settings → API: `URL` ve `anon key` → `js/config.js` dosyasına yaz.
5. Panelin hazır: `admin.html` (siteyle birlikte yayınlanır, şifreyle açılır).

---

## 6. Doğrulayıcı Kullanımı

```bash
# Tek dosya:
python3 +Scripts/validate.py post12-preview.html

# Tüm site:
python3 +Scripts/validate.py --all
```

Kontroller: doctype, font entegrasyonu, premium stil bloğu, 16:9 kapak,
sayaç alanı, yorum bölümü (e-postasız), tepki butonları, sidebar (46),
footer, JS dosyaları, emoji yasağı, çift bölüm kontrolü.
