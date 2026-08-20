# 📝 Teknoloji Tasarımcı - Web Sitem İçerik ve Şablon Kuralları

Bu rehber, **teknolojitasarimci.com** Web sitemde yeni bir haber, içerik veya ders dokümanı yayınlanırken **istisnasız uygulanması gereken standartları ve Master Şablon (`sablonum.html`) mimarisini** tanımlar.

---

## 1. 🎨 Kurumsal Görsel Oluşturma ve Tasarım Dili Standardı

Tüm haber ve etkinliklerin kapak görselleri Web sitesinin kimliğiyle %100 uyumlu **ortak bir tasarım dilinde** üretilir:

▷ **🚫 KESİNLİKLE AMPUL İKONU / GÖRSELİ YASAKTIR:** Üretilen yapay zeka görsellerinde, ikonlarda veya illüstrasyonlarda **HİÇBİR ŞEKİLDE AMPUL (Light Bulb) FİGÜRÜ KULLANILAMAZ!** Fikir, buluş veya yaratıcılık temsili için sadece dişli çarklar, mikroçipler, nöron ağları, atom simgeleri, kalem, çizim tahtası, pusula veya teknolojik ışık hüzmeleri kullanılır.
▷ **🚫 HİÇBİR YERDE EMOJİ KULLANILAMAZ (Sadece Vektörel SVG İkonlar):** Sayfa tasarımında, butonlarda, etiketlerde veya başlıklarda metin emojisi (👍, ❤️, 💬 vb.) kullanılmaz. Sadece temiz vektörel SVG ikonlar kullanılır.
▷ **📐 %100 Zorunlu 16:9 Oran:** Üretilen ve kullanılan tüm görseller istisnasız **16:9 sinematik en-boy oranındadır**.
▷ **🚫 GÖRSELLERDE HİÇBİR ŞEKİLDE YAZI / METİN KULLANILAMAZ (Text-Free Standardı):** Üretilen yapay zeka görsellerinin içinde, duvar afişlerinde, kitaplarda, tabelalarda veya cihazlarda **HİÇBİR DİLDE YAZI VEYA KELİME YER ALAMAZ!** Yapay zekanın garip karakterler veya İngilizce yazılar üretmesini önlemek için tüm görseller **%100 tamamen yazısız (pure illustration / no text)** olarak oluşturulur.
▷ **🩵 Tema Rengi Uyumu (Turkuaz İlgi Odağı):** Görsellerde sitenin ana renk paleti olan **turkuaz (`#00A4EF`)**, mavi ve sıcak kontrast tonlar baskın olarak kullanılır.
▷ **🇹🇷 Yerel ve Doğal İnsan Tasvirleri (Türk Öğrenci/Öğretmen Demografisi):** Görsellerde yer alan insan figürleri, öğrenciler ve öğretmenler **Türk toplumunun ve Akdeniz tipinin doğal fiziksel özelliklerini** yansıtmalıdır:
  ▷ Kumral / koyu kahverengi / siyah saçlar,
  ▷ Kahverengi / ela / doğal göz tonları ve sıcak ten renkleri,
  ▷ Yabancı / uzak doğulu / uyumsuz etnik varsayılan modeller yerine **Türkiye'deki ortaokul öğrencisi ve öğretmeni profili**.
▷ **✨ İllüstrasyon Stili:** Modern, temiz, minimalist 3D vektör veya dijital illüstrasyon stili benimsenir.

---

## 2. 🔹 Madde İçi Simgesi (Bullet Point Symbol) Standardı

▷ Tüm liste maddelerinde, alt başlıklarda ve madde içi işaretlerde varsayılan yuvarlak veya tire işaretleri yerine **tema rengindeki `►` veya `▷` sembolü** kullanılır.

---

## 3. 🏷️ Konuya Özel Akıllı Etiket (Hashtag) Standardı
Her haber ve içerik için etiketler (hashtags) rastgele veya genel geçer değil, **birebir içeriğe odaklı ve SEO uyumlu** olarak türetilir:
▷ **Çekirdek Konu Etiketleri (Tam Odaklı):** İçeriknın doğrudan bahsettiği 1-3 temel kavram (Örn: `#FatihWiFiŞifresi`, `#2025MaarifModeli`, `#MimariTasarım`).
▷ **Kullanıcı Arama Terimleri (SEO Odaklı):** Öğretmenlerin ve öğrencilerin Google'da arattığı kelime öbekleri (Örn: `#FatihİnternetŞifresi2025`, `#7SınıfTeknolojiTasarım`).
▷ **Kurumsal & Branş Etiketleri:** Genel çatı kategoriler (Örn: `#MEB`, `#EğitimTeknolojileri`, `#TeknolojiVeTasarım`).
▷ **Site / Marka Etiketi:** `#TeknolojiTasarımcı`.
▷ **🚫 KESİNLİKLE YASAK ETİKET:** `#MürselEren` etiketi **HİÇBİR ZAMAN HASHTAG OLARAK KULLANILMAZ!**
▷ **Yazım Formatı (CamelCase):** Tüm etiketler okunabilirliği artırmak için her kelimesi büyük harfle başlayan **CamelCase** formatında yazılır (Örn: `#SistematikFarklılaştırma`).
▷ **Ortalanmış Görünüm:** Etiketler sayfa sonunda tam ortalanmış (centered) turkuaz rozetler (`tag-badge`) olarak sunulur.

---

## 4. 🇹🇷 TDK Dil, İmla, Noktalama ve Düzeltme İşareti (Şapkalı Harf) Kontrolü
Her yeni metin sisteme aktarılmadan önce Türk Dil Kurumu (TDK) imla kılavuzuna göre denetlenir:
▷ **Şapkalı Harfler (Düzeltme İşareti `^`):** Anlam karışıklığını önlemek için gerekli kelimelerde mutlaka kullanılır (`hâline`, `imkân`, `rüzgâr`, `resmî`, `hâlâ`, `zihniyet`, `kâğıt`).
▷ **Akıcı ve Editoryal Dil:** İmla hataları ve devrik anlatımlar editoryal bir dokunuşla düzeltilir.

---

## 5. 📌 Frontmatter (Yazı Üst Bilgisi) Standartları

```yaml
---
layout: post
title: "Yazının Tam ve Çarpıcı Başlığı"
date: YYYY-MM-DD HH:MM:SS +0300
categories: [İnovasyon, 7. Sınıf Etkinlikleri, Dosyalar]
author: "Mürsel EREN"
image: "images/ozgun_kapak_16_9.png"
excerpt: "Yazının 1-2 cümlelik kısa, etkileyici özeti (Ana Sayfadaki kartta görünecektir)."
---
```

---

## 6. 📐 Master Şablon (`sablonum.html`) Sayfa Mimarisi ve Sıralaması

Tüm gönderi detay sayfaları (`postX-preview.html` ve Jekyll `_layouts/post.html`) **`sablonum.html` şablonundaki yapı ve sıra** ile hazırlanmalıdır:

1. ⬅️ **Üst Navigasyon:** Sol üstte hizalı sol oklu **`Ana Sayfaya Dön`** bağlantısı.
2. 🏷️ **Kategori & Başlık & Meta:**
   - Kategori rozeti + Sağ köşeye hizalı `⏱️ X Dk Okuma` rozeti (Kırmızı/yeşil onaylı müfredat rozeti YOKTUR).
   - Yazı Başlığı (H1)
   - Yayın tarihi, yazar ismi ve görüntülenme sayısı (Vektörel SVG ikonlu).
3. 🔗 **Hızlı Paylaşım Araç Çubuğu (`quick-action-bar`):** Linki Kopyala (Toast bildirimli), WhatsApp, Yazdır butonları.
4. 🖼️ **16:9 Sinematik Kapak Görseli:** Köşeleri yuvarlatılmış kapak görseli.
5. 📖 **Yazı Gövdesi & Ders Materyalleri Tablosu:**
   - Duyuru/Güncelleme Kutusu (`meta-box-enhanced` içinde düzgün i-bilgi SVG ikonu ile).
   - Ders Materyal Tablosu (`modern-table` sınıfıyla, satır vurgulu, SVG ikonlu indirme butonları `.doc-item-btn` ile).
6. 🏷️ **Standart Ortalanmış Etiketler (`hashtag-box`):** Ortalanmış `tag-badge` rozetleri.
7. 🔗 **İlgili İçerikler ve Benzer Etkinlikler (`related-posts-section`):** Etiketlerin hemen altında yer alan 3 sütunlu mini kart gridi.
8. 🎭 **Tepki Barı (`reactions-box`):** 4 adet dengeli SVG ikonlu buton (**Faydalı**, **Harika**, **Teşekkürler**, **Geliştirilmeli**).
9. 💬 **Yorumlar ve Değerlendirmeler (`comments-section`):**
   - E-posta alanı KESİNLİKLE YOKTUR! Sadece **Adınız Soyadınız** ve **Yorumunuz** alanları vardır.
   - **Yorumu Gönder** butonu oval (pill) yapıda ve formun sağ köşesine hizalıdır.
10. 🔘 **Alt Navigasyon:** Sayfa en altında ortalanmış turkuaz oval **`Ana Sayfaya Dön`** butonu.
11. 📜 **Standart Footer Telif Metni:** `Copyright © Mürsel EREN` açık lisans bildirimi.

---

## 7. ⚡ Yayınlama Öncesi Kontrol Listesi

- [ ] `sablonum.html` mimarisine %100 uyuldu mu?
- [ ] Metin emojileri yerine **sadece SVG vektör ikonlar** kullanıldı mı?
- [ ] Kapak görselinde **AMPUL İKONU VE YAZI OLMADIĞI** teyit edildi mi?
- [ ] Üst rozet çubuğunda Okuma Süresi sağ köşeye alındı mı?
- [ ] **İlgili İçerikler (3 Mini Kart)** etiketlerin hemen altında mı?
- [ ] Yorum formunda **E-posta alanının olmadığı** ve Gönder butonunun oval & sağa dayalı olduğu doğrulandı mı?
- [ ] Tepki butonlarının 4'lü dengeli (Faydalı, Harika, Teşekkürler, Geliştirilmeli) olduğu teyit edildi mi?
- [ ] TDK imla, noktalama ve şapkalı harf (`â`, `î`, `û`) kontrolleri yapıldı mı?
