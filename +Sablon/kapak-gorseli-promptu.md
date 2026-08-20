# Kapak Görseli Üretim Rehberi (Tüm Gönderiler İçin)

Bu rehber, web sitesindeki **tüm gönderi kapak görsellerinin** (başlık görsellerinin) yapay zeka ile üretilmesi için hazırlanmıştır. Her kapak üretilirken aşağıdaki kuralların **tamamı** uygulanır.

---

## 1. Temel Bilgiler

| Özellik | Değer |
|---|---|
| **Format** | JPG (`.jpg`) — PNG/JPEG kullanılmaz |
| **Boyut** | 1280×720 piksel (16:9 yatay) |
| **Dosya adı** | `post-NNNNN-Kapak.jpg` (ör. `post-00067-Kapak.jpg`) |
| **Dosya konumu** | `Veri/` klasörü |
| **Stil** | En yüksek kalite, net, canlı, **fotorealistik** (fotoğraf gerçekçiliğinde), profesyonel kompozisyon |

> Soluk, bulanık, çizgi film veya amatör görünüm kabul edilmez. Oyun görselleri bu rehberin kapsamı dışındadır.

---

## 2. Kesin Yasaklar (Hiçbir Görselde Bulunamaz)

1. **Yazı / Metin Yok:** Harf, kelime, rakam, tabela yazısı, defter yazısı, logo, afiş veya kitap kapağı yazısı — hiçbir tipografi yer alamaz. *(Prompt'ta "no text, no letters, no numbers, no words, no logos, no signage" eksiksiz istenir.)*
2. **Kırmızı + Sarı + Yeşil Üçlüsü Yasak:** Bu üç renk aynı sahneye yan yana / aynı anda giremez (trafik lambası algısı). Aynı görselde en fazla ikisi bulunabilir.
3. **Ampul Yasak:** Fikir ampulü, parlayan ampul, lamba sembolü — emoji, çizim, nesne fark etmeksizin kullanılamaz.
4. **Zar Yasak:** Zar nesnesi veya zar benzeri noktalı küp simgesi kullanılamaz.
5. **Göz İkonu Yasak:** Dekoratif göz sembolü/ikonu kullanılamaz (gerçek karakter gözleri hariç).
6. **Siyasi Semboller Yasak:** Bayrak, parti amblemi, ideolojik işaret ve siyasi çağrışımlı her türlü sembol kullanılamaz.
7. **Pergel / Gönye / Masonik Semboller Yasak:** Pergel, pergel-gönye ikilisi veya masonik çağrışım yapan hiçbir nesne/sembol kullanılamaz.
8. **Emoji Yasak:** Hiçbir emoji karakteri görselde yer alamaz.
9. **Yanakta Pembe Allık Yasak:** Karakter yanaklarında pembe allık, dairesel kızarıklık veya anime/makyaj görünümü kesinlikle olmaz. Ten doğal ve pürüzsüzdür.
10. **Abartılı Yüz İfadesi Yasak:** Korku filmi, çizgi film veya karikatür ifadeler kullanılmaz; ifadeler doğal ve canlıdır.

---

## 3. Karakter Standardı (Zorunlu)

- **Türk insanı görünümü:** Açık veya buğday ten rengi, kahverengi/siyah saç, koyu kahve gözler.
- **Karakterler:** 12-14 yaş Türk ortaokul öğrencileri (kız ve erkek) veya 30'lu yaşlarda Türk öğretmenler. Yerel profile uymayan karakterler kullanılmaz.
- **Yüz Hatları Belirgin Olmalı:** Gözler, kaşlar, burun, ağız ve yüz ifadeleri son derece net, keskin ve detaylı çizilir. Yüzler asla silik, eksik, boş veya bulanık bırakılamaz.
- **Giyim:** Türkiye'deki okul ortamına uygun günlük okul kıyafetleri.

---

## 4. Türkiye Kültürü Yansıması (Zorunlu)

- Sahne, ortam, nesneler ve detaylar **Türkiye kültürünü** yansıtmalıdır:
  - Türk okul sınıfları, ders araç gereçleri, Türk öğrenci/öğretmen ortamları.
  - Anadolu manzaraları, Türk evleri, kültürel nesneler (konuya uygunsa çay bardağı, kilim, çini motifleri vb.).
  - Batılı veya yabancı kültür çağrışımı yapan sahnelerden kaçınılır.

---

## 5. Renk ve Kalite Standardı

- Görseller canlı, doygun ve doğal renklere sahip olmalıdır.
- Kurumsal vurgu tonları (gök mavisi `#0ea5e9` / `#38bdf8`, ferah açık mavi, beyaz, nötr koyu slate) serbestçe kullanılabilir; tema ile uyumlu olmalıdır.
- Işık: Doğal gün ışığı veya ferah stüdyo aydınlatması.
- Keskinlik: Yüzler ve nesneler net; odak dışı/bulanık alan minimum düzeyde.

---

## 6. Her Gönderi İçin Kullanılacak Prompt Şablonu

Her kapak görseli üretilirken konuya özel sahne tanımı aşağıdaki şablonun başına eklenir:

````text
[GÖNDERİ KONUSUNA ÖZEL SAHNE TANIMI - 1-2 cümle]

Turkish middle school students (12-14 years old, boys and girls) or a Turkish teacher
(30s), fair/olive skin, dark brown or black hair, clearly defined facial features:
expressive eyes, well-defined eyebrows, nose and mouth, natural and lively expressions.
Scene reflects Turkish culture and Turkish school environment. Photorealistic, ultra
detailed, crisp and sharp, vibrant natural colors, professional photography, natural
daylight, 1280x720, 16:9 horizontal.

No text, no letters, no numbers, no words, no logos, no signage, no writing of any kind.
No light bulb, no dice, no eye symbols, no political symbols, no flags, no compass or
drafting tools, no emojis, no pink blush on cheeks.
Do not use red, yellow and green together in the same scene (maximum two of them).
No cartoons, no flat vector style: realistic photography only.
JPEG output.
````

### Örnek (yalnızca fikir vermesi için)

````text
A Turkish middle school art and design classroom: students building a small cardboard
bridge model together with a Turkish teacher, materials on the desks, bright natural
daylight.

Turkish middle school students (12-14 years old, boys and girls) or a Turkish teacher
(30s), fair/olive skin, dark brown or black hair, clearly defined facial features:
expressive eyes, well-defined eyebrows, nose and mouth, natural and lively expressions.
Scene reflects Turkish culture and Turkish school environment. Photorealistic, ultra
detailed, crisp and sharp, vibrant natural colors, professional photography, natural
daylight, 1280x720, 16:9 horizontal.

No text, no letters, no numbers, no words, no logos, no signage, no writing of any kind.
No light bulb, no dice, no eye symbols, no political symbols, no flags, no compass or
drafting tools, no emojis, no pink blush on cheeks.
Do not use red, yellow and green together in the same scene (maximum two of them).
No cartoons, no flat vector style: realistic photography only.
JPEG output.
````

---

## 7. Üretim Sonrası Adımlar

1. Üretilen görsel `Veri/post-NNNNN-Kapak.jpg` adıyla kaydedilir (başka sonek/ek ad kullanılmaz).
2. Görsel, `python3 +Scripts/gorsel-iyilestir.py <gorsel.jpg>` komutuyla iyileştirilir (2x boyut, renk +%18, kontrast +%8, keskinlik +%15, JPEG kalite 92).
3. Kapak görseli yalnızca `.jpg` olarak saklanır; orijinal veya bağlantısız kopya bırakılmaz.