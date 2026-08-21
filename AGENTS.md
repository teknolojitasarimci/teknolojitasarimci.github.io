# Proje Kuralları (AGENTS.md)

Bu dosya, `teknolojitasarimci` sitesi üzerinde çalışan agent'lar için bağlayıcı ve kesin kurallardır.

---

## 1. Renk ve Tasarım Sistemi (ZORUNLU)

- **Bağlantı (Link) ve Vurgu Renk Standardı**:
  - **Aydınlık Tema**: Tüm bağlantılar (`a`), etiketler ve butonlar ana kurumsal renk olan **`#0284c7`** (hover: `#0369a1`) kullanır.
  - **Koyu Tema (`body.dark`)**: Koyu lacivert zemin üzerinde tam erişilebilirlik ve net okunabilirlik için tüm bağlantılar (`a`), etiketler ve neon vurgular parlak camgöbeği/gök mavisi olan **`#38bdf8`** (hover: `#7dd3e8`) standardını kullanır.


- **%100 Flat (Düz) Renk Standardı**: Sitede hiçbir yerde `linear-gradient` veya `radial-gradient` **KULLANILMAZ**. Tüm arka planlar, butonlar ve paneller daima düz (flat) renklerden oluşur.
- **Tema Rengi**: Logo Mavisi / Kurumsal Turkuaz (`#0284c7`)
  - Ana Renk: `#0284c7`
  - Koyu Vurgu: `#0369a1`
  - Hover Rengi: `#0369a1`
  - Açık Vurgu / Kart Zemini: `#e0f2fe`
  - Aydınlık Sayfa Zemini: `#f8fafc`
  - `rgba` Karşılığı: `rgba(2, 132, 199, ...)`
- **Koyu Tema Standartları (`body.dark`)**:
  - Sayfa Arka Planı: `#0f172a` (Mat Koyu Lacivert)
  - Kartlar ve Paneller: `#1e293b` (Koyu Slate)
  - Çerçeveler: `#334155`
  - Açık Metinler: `#e2e8f0` ve `#cbd5e1`
  - Neon Vurgular: `#38bdf8`

---

## 2. Buton, Bildirim ve Arayüz Standartları (ZORUNLU)
- **Boydan Boya Nesne, Banner, Buton ve Mesaj Kutusu Yasağı (ZORUNLU)**:
  - Sitede hiçbir buton ("Başla", "Yeni Oyun", Kurallar penceresindeki "Anladım", "Kapat", "Tamam", vb.), kazanma/sonuç bildirim kutusu (`#winnerBanner`, `.result-banner`, `.win-banner`, `.alert-box`, vb.), durum şeridi veya eylem öğesi **asla %100 veya kart/konteyner genişliğinde boydan boya uzanamaz**.
  - Tüm butonlar, sonuç kutuları, başarı/uyarı bildirimleri ve mesaj pencereleri **daima yatayda ortalanmış** (`margin: 12px auto !important; display: block / inline-flex; width: fit-content !important;`), kompakt (`min-width: 160px; max-width: 440px;`) ve **20-25px yuvarlak hatlı (`border-radius: 25px !important;`)** olmalıdır.

- **Sivri Köşeli Buton ve Kutu Yasağı**: Sitede **asla 0px sivri köşeli buton veya eylem kutusu kullanılamaz**.
- Tüm butonlar, bağlantı hapları, filtreler ve indirme butonları yuvarlak (`border-radius: 25px !important`) standardına sahiptir.
- Sekme butonları, bildirim kutuları ve kartlar en az `14px - 25px` yuvarlatılmış köşelere sahip olmalıdır.

---

## 3. Terminoloji ve Dil Kuralları (ZORUNLU)
- **Abartılı ve Clickbait Başlık Yasağı (ZORUNLU)**:
  - Başlıklarda, alt başlıklarda ve açıklamalarda **"Pratik ve Etkili"**, **"Şok"**, **"Mucizevi"**, **"İnanılmaz"**, **"Akıl Almaz"** gibi abartılı, sansasyonel veya clickbait ifadeler **ASLA KULLANILAMAZ**.
  - Başlıklar daima kurumsal, eğitici, sade, profesyonel ve içeriği doğrudan yansıtan bir dille yazılmalıdır.
  - **Doğru**: *"Teknoloji ve Tasarım Dersi İçin 6 Ücretsiz Tasarım Yazılımı"* / *"Öğretmenler İçin Pratik BEP Hazırlama Programı"* / *"Sınıf Yönetimi Evrakları: Öğrenci Bilgi Formları ve Oturma Planı"*
  - **Yanlış**: *"Teknoloji ve Tasarım Dersi İçin 6 Ücretsiz Tasarım Yazılımı"* / *"Öğretmenler İçin Pratik ve Etkili Araç..."*


- **Tırnak İçi Cümlelerde Noktalama Kuralı (ZORUNLU - TDK Standardı)**:
  - Tırnak içine alınan tamamlanmış her cümlenin sonuna **mutlaka** uygun noktalama işareti (nokta `.`, soru işareti `?`, ünlem `!` veya üç nokta `...`) konur ve **ardından** tırnak kapatılır. Tırnaktan önce noktalama işareti konulmadan tırnak kapatılamaz!
  - **Doğru**: *"Şu levhayı da eklerseniz harika olur."* / *"Hocam bu kulüp listede yok."* / *"Nasıl yapabilirim?"*
  - **Yanlış**: *"Şu levhayı da eklerseniz harika olur."* / *"Hocam bu kulüp listede yok"*


- **"Blog" Kelimesi Yasağı**: Sitede "blog" veya "blog yazısı" kelimeleri **kullanılmaz**.
  - Yerine: **"Web sitem"**, **"Web sitesi"**, **"Yazı"** veya **"İçerik"** kullanılır.
  - Footer telif metni: *"Web sitemde yer alan tüm içeriklerimi, ticari olmayan amaçlarla..."*
- **"Makale" Kelimesi Yasağı**: "Makale" kelimesi asla kullanılmaz; yerine "yazı" veya "içerik" kullanılır.
- **"Yazar" İfadesi Yasağı**: "Yazar" ifadesi kullanılmaz; sayfalarda yalnızca üst meta alanında **"Hazırlayan: Mürsel EREN"** yazılır. Gövde sonuna imza satırı eklenmez.
- **"Yaratma/Yaratıcılık" Yasağı**: Dini bağlam hariç ("Yaratıcı" - Allah anlamı dışında) "yaratma/yaratıcılık" kelimeleri kullanılmaz. Yerine: *"geliştirme, tasarlama, üretme, yenilikçi düşünce, inşa etme, ortaya koyma"* kullanılır.
- **"Bilgisayara Karşı" Yerine "Yapay Zekaya Karşı" (ZORUNLU)**: Tüm oyunlarda tek kişilik modu "Bilgisayara Karşı" olarak adlandırılmaz; yalnızca **"Yapay Zekaya Karşı"** ifadesi kullanılır. Kazanma/kaybetme mesajlarında "Bilgisayar Kazandı" yerine **"Yapay Zeka Kazandı"**, sıra göstergesinde "Sıra: Bilgisayar" yerine **"Sıra: Yapay Zeka"** yazılır. Oyun içi metinlerde de "bilgisayar" değil "yapay zeka" ifadesi kullanılır.
- **Giriş Selamları Yasağı**: Gönderilere "Merhaba arkadaşlar!" gibi giriş selamları eklenmez; yazılar doğrudan konuya girer.
- **EMOJİ YASAĞI (ZORUNLU)**: Sitede hiçbir yerde hiçbir emoji **KULLANILMAZ**. Derece göstergeleri, rozetler, oyun içi simgeler, butonlar, uyarılar ve arayüz öğeleri dahil her türlü ifade **emoji ile temsil edilmez**; bunun yerine **inline SVG ikon** veya düz metin kullanılır. Emoji karakterleri (`😀`, `🌟`, `👍`, `🎯`, `💡`, `⚠️` vb.) yalnızca görsel üretimi sırasında `_enh` iyileştirmelerinde bile eklenmez; HTML/JS/CSS içine asla yazılmaz.
  - **Tek İstisna — Labirent Kedisi**: Yalnızca `Oyunlar/labirent-oyunu/index.html` içindeki oyuncu temsili için kedi emojisi (`🐱`) kullanılabilir (kullanıcının açık isteği). Bu istisna dışında emoji kesinlikle yasaktır.
- **AMPUL YASAĞI (ZORUNLU)**: Fikir ampulü (`💡`) veya ampul görünümlü her türlü sembol — emoji, SVG, çizim, ikon fark etmeksizin — sitede **hiçbir şekilde kullanılamaz**.
- **"Yanlış" Kelimesi Yasağı (ZORUNLU - KESİN KURAL)**:
  - Sitede hiçbir kullanıcı mesajında, oyun içi bildirimde, sonuç ekranında, hata/uyarı kutusunda, açıklamada veya metinde **"yanlış"** kelimesi **KESİNLİKLE KULLANILAMAZ**.
  - Bunun yerine pedagojik, yapıcı, teşvik edici ve nazik ifadeler kullanılır.
  - Örnekler:
    - *"Maalesef yanlış bardak!"* yerine **"Maalesef doğru bardak değil."** veya **"Maalesef doğru bardağı seçemediniz."**
    - *"Yanlış cevap verdiniz."* yerine **"Doğru eşleşme/seçim değil, tekrar deneyebilirsiniz."**
    - *"Yanlış çizgi"* yerine **"Uygun olmayan çizgi"** veya **"Hatalı bağlantı"**
- **Resmi ve Kurumsal "Siz" Dili Standardı (ZORUNLU - KESİN KURAL)**:
  - Sitede buton metinleri hariç (örn. "Oyna", "Başla", "Kapat", "Temizle" gibi standart eylem butonları hariç) tüm başlık altı açıklamalarda, oyun yönergelerinde, durum bildirimlerinde, kazanma/kaybetme mesajlarında ve uyarılarda **"sen" dili değil, daima resmi, saygılı ve kurumsal "siz" dili** kullanılır.
  - Örnekler:
    - *"Bilyeyi takip et, doğru bardağı seç!"* yerine **"Bilyeyi dikkatle takip ediniz, doğru bardağı seçiniz!"**
    - *"Tebrikler, sen kazandın!"* yerine **"Tebrikler, Kazandınız!"**
    - *"Tekrar deneyebilirsin"* yerine **"Tekrar deneyebilirsiniz."**
    - *"Yumurtaları sepetinle yakala"* yerine **"Yumurtaları sepetinizle yakalayınız"**
- **GÖZ İKONU YASAĞI (ZORUNLU)**: Sitede göz ikonu/göz sembolü — emoji, SVG, çizim, ikon fark etmeksizin — **hiçbir şekilde kullanılamaz** (ör. `M1 12s4-8 11-8...` göz path'li SVG'ler, `👁` vb.). "Görüntülenme" ve benzeri sayım/istatistik göstergelerinde göz yerine **daima büyüteç (search) SVG ikonu** kullanılır: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`.

---

## 4. Görsel ve Kapak Üretimi Kuralları (ZORUNLU)
- **`_enh` TAKISI YASAĞI (KESİN YASAK - ZORUNLU)**: Sitede hiçbir dosyada, görselde, kapakta, ikonda veya referansta `_enh` (veya benzeri) sonek / takı **KESİNLİKLE KULLANILAMAZ**. Tüm dosyalar sade ve temiz adlandırılır (ör. `proje-notu.jpg`, `posteryap-icon.jpg`, `post-00001-Kapak.jpg`).
- **PERGEL VE ÇAĞRIŞIMLI SEMBOL YASAĞI (ZORUNLU)**: Sitede ve üretilen görsellerde **pergel (çizim pergeli)**, pergel-gönye ikilisi veya masonik çağrışım oluşturabilecek hiçbir sembol/nesne **KESİNLİKLE KULLANILAMAZ**.
- **GÖRSEL RENK PALETİ VE TEMA UYUMU (ZORUNLU)**: Üretilen tüm görseller sitemizin kurumsal kimliğini yansıtmalı; ana vurgu renkleri olarak **canlı gök mavisi (#0ea5e9 / #38bdf8)**, ferah açık mavi (#e0f2fe), temiz beyaz ve nötr koyu slate tonlarını barındırmalıdır. Temadan kopuk, soluk veya uyumsuz rastgele renk paletleri kullanılamaz.


1. **Görsellerde Asla Yazı/Metin Bulunamaz**: Üretilen görsellerde hiçbir harf, kelime, metin veya tipografi yer alamaz.
2. **Kesinlikle Ampul (Fikir Ampulü) Eklenemez**: Görsellerde ampul sembolü/nesnesi kullanılmaz.
3. **Karakter ve Temsil Standardı**: Görsellerdeki karakterler **Türkiye'deki ortaokul öğrencilerini** (12-14 yaş, kız ve erkek, Akdeniz/Türk simalı, buğday/açık tenli, koyu kahve/siyah saçlı) temsil etmelidir. Yetişkinler veya yerel öğrenci profiliyle ilgisiz karakterler kesinlikle kullanılmaz.
4. **Görsel Formatı ve Boyutu**: 1280×720 (16:9) oranında, modern, düz/vektörel izometrik illüstrasyon tarzında olmalıdır.
5. **Kapak Görsel Ölçekleme (`object-fit: contain`)**: Gönderi detay sayfalarında kapak görselleri kırpılmadan ve oranları bozulmadan gösterilir. Yanlarda kalan boşluklar açık tema rengi (`#e0f2fe`) ile doldurulur.
- **GÖNDERİ NUMARALANDIRMA STANDARDI (ZORUNLU - GÜNCEL)**: Tüm gönderiler, silinen numaralar boş kalmayacak şekilde 1'den başlayarak **kesintisiz** ve **5 haneli sıfır dolgulu** `post-NNNNN` biçiminde numaralandırılır. Klasör: `sayfalar/post-00001-Kisa-Baslik/`; gönderi dosyası: `post-00001-preview.html`; kapak: `Veri/post-00001-Kapak.jpg`. Kelimeler tire (`-`) ile ayrılır (ör. `post-00029-Biyotaklit-Ornekleri`). Gönderiler **tematik gruplar** hâlinde ardışık numara blokları alır (ör. Zümre Toplantıları grubu `post-00056`, `post-00057` diye devam eder). Yeni gönderi eklenirken mevcut numara düzeni korunur.

5a. **Kapak İsimlendirme Standardı (ZORUNLU)**: 
   - **Gönderiler:** Her gönderinin kapak görseli **`post-NNNNN-Kapak.jpg`** biçiminde adlandırılır (ör. `post-00046-Kapak.jpg`, `post-00067-Kapak.jpg`).
   - **Oyunlar:** Her oyunun kapak görseli **`<oyun-adi>-kapak.jpg`** biçiminde adlandırılır (ör. `bayrak-bil-kapak.jpg`, `kutuban-kapak.jpg`, `satranc-kapak.jpg`).
   - **Etkinlikler:** Her etkinlik sayfasının kapak görseli **`<etkinlik-adi>-kapak.jpg`** biçiminde adlandırılır (ör. `7-sinif-etkinlikleri-kapak.jpg`, `zeka-oyunlari-kapak.jpg`).
   - **Yasak Adlandırmalar:** Sade `kapak.jpg`, `cover.jpg`, `_enh` gibi isimsiz veya takılı kapaklar **KESİNLİKLE KULLANILAMAZ**. Klasörde kapak görseliyle ilgili yalnızca tek bir kurala uygun kapak dosyası bulunur. Ana sayfa kartları, `sayfalar/preview.html`, `Oyunlar/index.html` ve gönderi içi `post-cover-wrapper` daima bu standart yolları gösterir.
5b. **Geçici Kapak Standardı (ZORUNLU)**: Kapak görseli henüz gelmemiş/kullanıcı tarafından beklenen gönderiler için ortak geçici kapak `+Sablon/gecici-kapak.jpg` dosyasından kopyalanır ve `Veri/post-NNNNN-Kapak.jpg` olarak yerleştirilir. Kullanıcı gerçek kapak görselini sağladığında geçici kapak aynı isimle değiştirilir. `+Sablon/gecici-kapak.jpg` sitede hiçbir HTML'de referans gösterilmez; yalnızca kopyalama kaynağıdır.
6. **Yüz Hatları ve İfade Netliği (ZORUNLU)**: Çizilen karakterlerin yüzlerinde gözler, kaşlar, burun, ağız ve yüz ifadeleri son derece belirgin, net ve detaylı olmalıdır. Yüz hatları silik, eksik, boş veya bulanık bırakılamaz; canlı, doğal ve sevimli öğrenci yüz hatları çizilmelidir (`clear distinct facial features: expressive eyes, well-defined eyebrows, nose, mouth and energetic student expressions`).
7. **Görsel Kalite İyileştirme**: Dışarıdan indirilen tüm görseller (kapak ve içerik görselleri) gönderiye eklenmeden önce **2x boyut büyütme (LANCZOS)**, **renk canlılığı +18%**, **kontrast +8%**, **keskinlik +15%** ve **JPEG kalite 92** ile doğrudan temiz dosya adı üzerine (`<isim>.jpg`) iyileştirilir.
    - **OTOMATİK UYGULAMA (ZORUNLU)**: Bu iyileştirme, her görsel indirme/gönderi işleminde `python3 +Scripts/gorsel-iyilestir.py <gorsel.jpg>` komutuyla otomatik yapılır; dosya ismine hiçbir zaman `_enh` eklenmez.
8. **Bağlantısız Dosya Temizliği (ZORUNLU)**: Bir gönderi işlemi tamamlandığında, gönderi ve sitede **hiçbir HTML'de referansı olmayan** (`Veri/` içindeki orijinaller, yedek kopyalar, aynı görselin farklı format kopyaları, kullanılmayan görsel/PDF belgeleri) dosyalar **silinir**. Boşta duran, bağlantısız dosya bırakılmaz.
9. **Sarı-Kırmızı-Yeşil Yan Yana Yasağı (ZORUNLU)**: Üretilen görsellerde (kapak, içerik, illüstrasyon) sarı, kırmızı ve yeşil renkler aynı sahnede yan yana/aynı anda birlikte **kullanılamaz**. Bu üç renk bir arada göründüğünde trafik lambası algısı oluşur; bu yüzden aynı görselde bu üçlü birlikte yer alamaz (maksimum iki tanesi aynı anda bulunabilir).
10. **KABUL EDİLEN GÖRSEL FORMATLARI (ZORUNLU)**: Sitede ve `Veri/` klasörlerinde yalnızca **`.jpg`**, **`.svg`** ve animasyonlu **`.gif`** formatlarında görseller kullanılabilir. PNG veya JPEG (`.jpeg`) uzantılı görseller kesinlikle bulunamaz ve referans verilemez.
    - Kullanıcı `.png` veya `.jpeg` uzantılı bir görsel verirse, gönderiye eklenmeden **önce otomatik olarak `.jpg`'ye dönüştürülür** ve eski dosya silinir.
    - SVG formatındaki dosyalara kesinlikle dokunulmaz; bunlara hiçbir şekilde filtre, iyileştirme (netleme/kontrast) uygulanmaz ve orijinal vektör kodları saf haliyle korunur.
    - HTML/CSS/JS içindeki tüm görsel referansları da `.jpg`, `.svg` veya `.gif` olarak yazılır; `.png`/`.jpeg` uzantılı hiçbir referans bulunamaz.
11. **DİNAMİK KAPAK YOLU ÜRETİMİ (ZORUNLU)**: Kapak görsel yolu JS/script ile dinamik üretilirken gönderi numarası **asla string dilimleme (`slice`, `substring`, `substr`) ile çıkarılamaz**. Numara daima tam eşleşme ile alınır: `folderName.match(/post-(\d+)/)[1]` (veya kart verisinde tam yol `Veri/post-00067-Kapak.jpg` elle yazılır).
12. **KAPAK YOLU DOĞRULAMA (ZORUNLU)**: Kart/arşiv/liste sayfaları oluşturulurken veya güncellenirken üretilen tüm `*-Kapak.jpg` yolları diske karşı doğrulanır (`python3` ile `os.path.exists` taraması). Kart görselinde logo/fallback (`onerror` → `logo.svg`) görünmesi, kırık kapak yolu göstergesidir; doğrulama sonucu "10/10 mevcut" gibi sayısal olarak kullanıcıya bildirilir.

---

## 5. Klasör Yapısı ve Dosya Düzeni

- Her gönderi: `sayfalar/post-00001-Kisa-Baslik/post-00001-preview.html` + `Veri/` (gönderiye ait medya ve dosyalar)
- **Ana Sayfa Kart Zorunluluğu (ZORUNLU)**: `sayfalar/` altındaki **her** gönderi (post-00001'den başlayarak en yeniye kadar) ana sayfalarda kart sahibi olmalıdır. Kart, `sayfalar/preview.html` ve kök `index.html` içinde **mutlaka** mevcut olmalıdır; eksik kart kabul edilmez. Yeni gönderi eklendiğinde kart ana sayfaya eklenmeden iş tamamlanmış sayılmaz.
- **Otomatik Kart Güncelleme (ZORUNLU)**: Yeni gönderi eklendiğinde kartlar **elle değil**, `python3 +Scripts/kart-guncelle.py` komutuyla güncellenir. Bu script `sayfalar/` klasörünü tarar, eksik kartları `post-NNNNN-preview.html` meta bilgilerinden otomatik üretir ve tüm kartları post numarasına göre büyükten küçüğe (en yeni en üstte) sıralar; hem `index.html` hem `sayfalar/preview.html` birlikte güncellenir. `--check` bayrağı yalnızca durumu raporlar. Gönderi işlemleri sonunda bu komut **mutlaka çalıştırılır** ve çıktısı kullanıcıya bildirilir.
- **Kart Bütünlük Denetimi (ZORUNLU)**: Gönderi işlemleri sonunda, `sayfalar/` içindeki tüm `post-*` klasörleri ile ana sayfa kartları karşılaştırılır. Bir gönderinin `sayfalar/preview.html` veya `index.html` içinde kartı yoksa bu **eksik/hatalı** kabul edilir ve kullanıcıya bildirilir.
- Etkinlikler: `etkinlikler/<ad>/<ad>.html` + `Veri/`
- Uygulamalar: `uygulamalar/<ad>.html`
- Oyunlar: `Oyunlar/<ad>/index.html`
- `images/` içinde yalnızca `logo.svg` ve `mursel_eren.png` kalır (kapaklar oraya taşınmaz).
- **Trafik İşaretleri Oyunu Görsel Kuralı (ZORUNLU)**: `Oyunlar/trafik-isaretleri/` içindeki tüm trafik levhası görselleri (`.svg` vb.) `Veri/gorseller/` gibi alt klasörlerde tutulmaz; doğrudan `Veri/` klasörünün ana dizininde (`Veri/T-1a.svg` vb.) yer alır ve kod içinde bu şekilde çağrılır.
- GitHub'a Yüklenmeyenler (+ önekli): `+Sablon/`, `+Scripts/`, `+Yeni Gelenler/`, `+yeni-gonderi.html`
- **`+Yeni Gelenler/` Temizliği (ZORUNLU)**: `+Yeni Gelenler/` içindeki bir dosya işlenip ait olduğu klasöre (ör. `sayfalar/post-*/Veri/`, `Oyunlar/<ad>/` vb.) taşındıktan sonra, kaynak dosya `+Yeni Gelenler/` içinden **mutlaka silinir**. Kullanıcı bu adımı hatırlatmaz; işlemin doğal parçasıdır. `+Yeni Gelenler/` içinde yalnızca henüz işlenmemiş dosyalar bulunur.

---

## 6. Teknik ve Fonksiyonel Kurallar

- **PDF Bağlantıları**: Her zaman `target="_blank" rel="noopener"` ile **yeni sekmede** açılır; `download` özelliği kullanılmaz.
- **Üst Menü PDF Bağlantıları**: Üst menüdeki PDF bağlantıları daima yeni sekmede açılır; menü içinde PDF iframe/önizleme oluşturulmaz. Bu bağlantılarda `data-no-pdf-embed="true"` kullanılır.
- **İndirme Butonları (`download-btn`)**: Her zaman alt alta (`display: block; width: fit-content;`) yerleştirilir, yan yana dizilmez. `js/download-counter.js` otomatik indirme sayacı içerir.
- **Okuma Süresi**: Kelime sayısı / 200 (dk), en az 1 dk olarak hesaplanır.
- **PDF Dosya İsimlendirme Standardı (ZORUNLU)**: Yayınlanan tüm PDF dosyaları `Kisa-Ad-(www.teknolojitasarimci.com).pdf` formatında adlandırılır (ör. `patika-(www.teknolojitasarimci.com).pdf`, `Labirentler-(www.teknolojitasarimci.com).pdf`). Kelimeler arasında tire (`-`) kullanılır, Türkçe karakter ve boşluk içermez. HTML referansları daima bu isimlendirme ile yazılır; farklı isimlendirilmiş yeni PDF kabul edilmez (resmî kurum dokümanları hariç).
- **Koyu Tema Desteği**: Sitedeki tüm yeni ve mevcut sayfalar `body.dark` ve `html.dark-theme` sınıfları üzerinden eksiksiz koyu tema kontrastına ve renklerine sahip olmalıdır.
- **İlgili İçerik Kartları (`related-post-card`) Standardı (ZORUNLU - TAM 3 KART)**: Gönderi sayfalarındaki "İlgili İçerikler" bölümünde **istisnasız tam 3 (üç) adet önerme kartı** yer almalıdır (2 veya 4 kart standart dışıdır, kabul edilmez). Her kart **mutlaka kapak görseli içermelidir**: `<img src="..." alt="..." class="related-post-img" onerror="this.src='../../images/logo.svg'">` + `<div class="related-post-body">` (`<span class="related-post-cat">` + `<div class="related-post-card-title">`). Görselsiz kart kabul edilmez. Görsel referansı, kartın bağlandığı gönderinin `Veri/post-NNNNN-Kapak.jpg` dosyasıdır (aynı temadaki gönderi kapağı kullanılabilir). Yeni gönderi eklendiğinde ve mevcut gönderilerde bu standart kontrol edilir.
- **Otomatik Şablon Doğrulama ve Denetim (`validate.py`) (ZORUNLU)**: Yeni bir gönderi eklendiğinde veya mevcut gönderi güncellendiğinde, işlem sonunda **mutlaka** `python3 +Scripts/validate.py <sayfalar/post-00001-Kisa-Baslik/post-00001-preview.html>` komutu çalıştırılır. Script 3 kart standardını, kapak görsellerinin diskteki varlığını, emoji yasağını, yazar meta standardını ve JS/CSS bağlantılarını otomatik denetler. Hata varsa düzeltilmeden işlem tamamlanmış sayılmaz.
- **HERO SLAYTI DİV DENGESİ ve DÜZEN KONTROLÜ (ZORUNLU)**: Bir gönderi silinirken hero slider'dan slayt kaldırılırsa (veya `index.html` / `sayfalar/preview.html` düzenlenirse), **ardında başıboş bir kapanış `</div>` bırakılmamalıdır**. Başıboş `</div>`, `featured-slider` bölümünü erken kapatıp hero grid'ini bozar: sağdaki 3 "Öne Çıkan Gönderiler" konteynırı altta kocaman/yanlara taşarak görünür. Silme/düzenleme sonrası **mutlaka** hero bölümünde `<div` açılış / `</div>` kapanış dengesi kontrol edilir (`python3` ile sayım: hero-section açılışından `hero-quick-cards` öncesine kadar `<div` sayısı, `</div>` sayısından **tam 1 fazla** olmalıdır — bu fazlalık henüz açılan `hero-quick-cards` div'idir). Ayrıca render ile doğrulama yapılır: `.hero-quick-cards` (yükseklik ~500px, genişlik ~240px) ile `.hero-slider-wrap` aynı yatay satırda ve eşit yükseklikte olmalıdır (kartlar altta/kocaman çıkmamalı). Bu düzen bozulması geçmişte Post6, Post7 ve Post49 silmelerinde tekrarlandı; tekrar etmemesi için her slayt/gönderi kaldırmasından sonra bu kontrol zorunludur.

## 7. CDN YASAĞI — Tüm Kaynaklar Lokal (ZORUNLU)

- **CDN Yasak**: Sitede hiçbir yerde harici CDN bağlantısı (`cdnjs`, `jsdelivr`, `unpkg`, `fonts.googleapis.com`, `blogger.googleusercontent.com` görsel vb.) kullanılmaz. Tüm JS, CSS ve font dosyaları **yerel (lokal)** olarak `js/lib/`, `css/lib/` ve `css/fonts/` klasörlerinde saklanır ve göreli yol (`../../js/lib/...`) ile referans verilir.
- **Tek İstisna — FFmpeg**: Video/audio dönüştürme için `@ffmpeg/ffmpeg` ve `@ffmpeg/core` (ffmpeg-core.wasm ~32MB) **harici CDN'den** yüklenmeye devam edebilir. Bu istisna yalnızca ffmpeg içindir; başka hiçbir kütüphane CDN'den alınamaz.
- **Yeni Gönderi Kuralları**: Yeni gönderi/uygulama eklerken herhangi bir harici kütüphane gerekiyorsa dosya önce indirilip `js/lib/` veya `css/lib/` altına yerleştirilir; `src`/`href` daima yerel göreli yolu gösterir.
- **Yerel Font Standardı**: Google Fonts yerine indirilmiş `.woff2` dosyaları `css/fonts/` altında tutulur ve `@font-face` ile tanımlanır; HTML'de harici font `<link>` etiketi yer almaz.



### 4. GÖRSEL ÜRETİMİ KATI KURALLARI (GÜNCEL & ZORUNLU)
- **SIFIR YAZI VE METİN**: Görsellerde harf, kelime, rakam, tabela yazısı, defter yazısı, logo vb. KESİNLİKLE yer alamaz (%100 metinsiz saf vektörel illüstrasyon).
- **HİÇBİR ŞEKİLDE AMPUL / FİKİR AMPULÜ YOKTUR (KESİN YASAK)**:
  - Duvarda, panoda, afişte, elde, masada, **KAĞIT ÜZERİNDEKİ ÇİZİMLERDE BİLE** hiçbir ampul (`💡`), parlayan ampul, sarı lamba, fikir ampulü sembolü ASLA bulunamaz. Siyasi/taraflı çağrışım yapabilecek her türlü sembolden kesinlikle kaçınılacaktır.
- **YANAKLARDA PEMBE ALLIK / KIZARIKLIK KESİNLİKLE YASAKTIR**:
  - Karakterlerin yanaklarında pembe allık, dairesel kızarıklık, anime/çizgi film tarzı makyaj veya yanak pembelikleri KESİNLİKLE OLMAYACAK. Yüz teni doğal, pürüzsüz, temiz açık/buğday Akdeniz Türk ten renginde olmalıdır.
- **TÜRK ORTAOKUL ÖĞRENCİ VE ÖĞRETMENLERİ**:
  - Karakterler 12-14 yaşlarında Türk ortaokul öğrencileri (veya 30'lu yaşlarda Türk öğretmenler) olmalıdır.
  - Açık veya buğday ten rengi, kahverengi/siyah saç.
- **NET VE BELİRGİN YÜZ HATLARI**:
  - Yüzlerde gözler, kaşlar, burun, ağız ve güleryüzlü mimikler son derece net, keskin ve belirgin olmalıdır (Asla yüzsüz/silüet/kukla karakter çizilmeyecektir).

---

## 8. Slayt Gösterisi Bileşeni Standardı (ZORUNLU)

Kullanıcı **"slayt gösterisi yap"** veya **"görsellerden slayt oluştur"** dediğinde aşağıdaki standart yapı uygulanır. Referans uygulama: `sayfalar/post-00064-Felipe-Castro-Mimari-Tasarim/post-00064-preview.html`.

### 8.1 HTML Yapısı

```html
<div class="{prefix}-slideshow" id="{prefix}-slideshow">
  <div class="{prefix}-slideshow-viewport">
    <img id="{prefix}-slideshow-image" src="..." alt="...">
  </div>
  <div class="{prefix}-slideshow-controls">
    <!-- Üst satır: progress bar + sayaç -->
    <div class="{prefix}-slideshow-bar-row">
      <input id="{prefix}-slideshow-range" type="range" min="0" max="N-1" value="0">
      <span id="{prefix}-slideshow-status">1 / N</span>
    </div>
    <!-- Alt satır: 3 nav butonu + Tam Ekran -->
    <div class="{prefix}-slideshow-btn-row">
      <button id="{prefix}-slideshow-prev">◀ Geri</button>
      <button id="{prefix}-slideshow-toggle">Oynat</button>
      <button id="{prefix}-slideshow-next">İleri ▶</button>
      <button id="{prefix}-slideshow-fs" class="fs-btn">⛶ Tam Ekran</button>
    </div>
  </div>
</div>
```

- **Prefix**: her slayt bileşenine benzersiz bir prefix verilir (ör. `felipe`, `biyotaklit`, `kopru`).
- **Görseller**: `Veri/galeri/{prefix}_{02d}.jpg` formatında (sıfır dolgulu iki haneli numara).

### 8.2 Buton Standardı

- Tüm butonlar `border-radius: 25px !important` — yuvarlak hatlı.
- Oynat/Durdur + Geri/İleri: `background: #0284c7` (hover: `#0369a1`).
- Tam Ekran butonu: `background: #0f172a` (koyu, ayrışık görünüm).
- Butonlar `width: fit-content` — **asla boydan boya uzamaz**.
- 4 buton yan yana `flex-row`, `justify-content: center`.

### 8.3 Tam Ekran Davranışı (ZORUNLU)

- **Native Fullscreen API değil — CSS class toggle** kullanılır (`is-fullscreen`). Böylece `file://` protokolünde de çalışır.
- Tam ekranda: `position: fixed; inset: 0; z-index: 9999;`, görsel `object-fit: contain`, kontrol paneli `background: rgba(0,0,0,0.85)` ile altta sabitlenir — **bar ve butonlar kaybolmaz**.
- **Escape** tuşuyla tam ekrandan çıkış desteklenir.
- Buton ikonu ve metni giriş/çıkış durumuna göre değişir: "Tam Ekran" ↔ "Çık".

### 8.4 İlerleme Çubuğu

- `accent-color: #0284c7`, `height: 6px`, `flex: 1`.
- Sağında `X / toplam` sayacı (`white-space: nowrap`).
- Sürüklendiğinde ilgili slayta atlar; otoplay durur.

### 8.5 Otoplay ve Hız

- Sayfa yüklenince **otomatik oynatma başlar**.
- `Geri` / `İleri` butonuna tıklanınca otoplay durur, manuel moda geçilir.
- Varsayılan hız: **3500ms** geçiş aralığı.

### 8.6 Koyu Tema

```css
body.dark .{prefix}-slideshow        { background: #1e293b; border-color: #334155; }
body.dark .{prefix}-slideshow-status { color: #cbd5e1; }
body.dark .{prefix}-slide-btn        { background: #0284c7; }
body.dark .{prefix}-slide-btn.fs-btn { background: #334155; }
```

---

## 9. YouTube Embed ve `file://` Protokolü — BİLİNEN DAVRANIŞ (ZORUNLU BİLGİ)

### 9.1 Temel Kural

> **YouTube iframe embed'leri `file:///` protokolüyle (yerel dosyaya çift tıklayarak) açılan sayfalarda çalışmaz.**
> Bu bir kod hatası değil, YouTube'un kasıtlı güvenlik politikasıdır ("Hata 153 — Video oynatıcı yapılandırma hatası").

- **Bilgisayarda test edilirken** (`file:///`): Video yüklenemez → bu **normaldir, hata değildir**.
- **GitHub Pages / sunucuya yüklenince** (`https://`): Video doğrudan sayfada oynar → **sorunsuz çalışır**.

### 9.2 Agent İçin Kesin Talimat

- Kullanıcı "videolar açılmıyor" diye bildirdiğinde **önce protokolü kontrol et**.
- Eğer sayfa `file:///` ile açılıyorsa → **kodda hata aramaya gerek yok**, bu beklenen davranıştır.
- Kullanıcıya şunu açıkla: *"Dosyayı çift tıklayarak açtığınız için YouTube bloke ediyor. GitHub'a yükleyince normal çalışacak."*
- **Gereksiz iframe yeniden yazımı, JS hack'i veya alternatif oynatıcı arayışına girme.**

### 9.3 Fallback Sistemi (Tercihen Uygulanır)

Her iki durumda da video izlenebilsin diye sitede **akıllı fallback sistemi** kullanılır:

```html
<div class="video-embed-wrap" id="v-id">
    <iframe src="https://www.youtube.com/embed/VIDEO_ID" ...></iframe>
    <!-- file:// protokolünde gösterilecek tıklanabilir kart -->
    <a class="video-thumb-card" href="https://www.youtube.com/watch?v=VIDEO_ID"
       target="_blank" rel="noopener">
        <svg class="play-icon" viewBox="0 0 24 24" fill="white">
            <polygon points="6,4 20,12 6,20"/>
        </svg>
        <span class="thumb-label">YouTube'da izlemek için tıklayın</span>
    </a>
</div>
<script>
(function(){
    if(location.protocol === 'file:'){
        var wrap = document.getElementById('v-id');
        if(wrap){
            wrap.querySelector('iframe').style.display = 'none';
            wrap.querySelector('.video-thumb-card').style.display = 'flex';
        }
    }
})();
</script>
```

- **Sunucuda**: iframe görünür, `.video-thumb-card` gizli → video sayfada oynar.
- **`file://`'da**: iframe gizlenir, `.video-thumb-card` görünür → tıklayınca YouTube'da açılır.
- Bu sistem `file://` protokolünde de çalışır, Fullscreen API veya CORS gerektirmez.

## 10. Galeri Görseli Açma Standardı (ZORUNLU)

- Galeri içindeki görsellere tıklandığında görsel **yeni sekmede açılmaz**; aynı sayfa üzerinde modal lightbox içinde büyük gösterilir.
- Lightbox içinde mutlaka **kapat**, **önceki** ve **sonraki** kontrolleri bulunur. Görseller arasında önceki/sonraki düğmeleri ve klavyedeki sol/sağ ok tuşlarıyla gezinilebilir.
- `Escape` tuşu ve arka plan alanına tıklama lightbox'ı kapatır; açıldığında sayfanın arka plan kaydırması durdurulur ve kapanınca geri yüklenir.
- Galeri görsel bağlantılarında `target="_blank"` kullanılmaz. Görselin doğrudan yeni sekmede açılması, yalnızca lightbox davranışı teknik olarak mümkün değilse tercih edilebilir; yeni galerilerde kabul edilmez.
- Lightbox görseli `object-fit: contain` ile kırpılmadan gösterilir, mobil ekranlarda da taşma yapmaz. Butonlar yuvarlak ve kompakt tasarım standardına uyar.

## 11. Yayın Öncesi Güvenlik ve Yasal Risk Taraması (ZORUNLU)

Yeni bir gönderi eklenirken veya mevcut gönderiye içerik eklenirken, gönderi **içeriğin başına alınmadan önce** mutlaka güvenlik taraması yapılır ve sonuç kullanıcıya bildirilir.

- **Komut (ZORUNLU)**: `python3 +Scripts/guvenlik-taramasi.py <sayfalar/post-00001-Kisa-Baslik/post-00001-preview.html>` — her yeni gönderi işleminde çalıştırılır; çıktı kullanıcıya iletildiği bildirilir. Riskli içerik düzeltilmeden işlem tamamlanmış sayılmaz.
- **Kesin Yayın Yasağı (RISK)**: Gerçek şifreler/parolalar (örn. okul ağı, Wi-Fi, cihaz şifreleri), TC Kimlik Numarası, gerçek kişilere ait telefon numarası/doğum tarihi/adres gibi kişisel veriler (KVKK) **asla** gönderiye yazılamaz.
- **Yasal Risk Uyarıları (UYARI)**: "şifre/parola/kullanıcı adı" gibi ifadeler yalnızca genel açıklama amacıyla kullanılır, gerçek bilgi verilmez. Resmî kurum dokümanı PDF'leri (MEB, Yönetmelik, Genelge, Karar, Öğretim Programı vb.) yalnızca kamuya açık ve hâlâ erişilebilir durumdaysa paylaşılır; erişime kapatılmış dokümanlar yayınlanmaz (örnek ders: Post2'deki Fatih Wi-Fi şifreleri ve erişime kapatılmış Öğretim Programı taslağı kaldırılmıştır).
- **Şablon İstisnası**: Boş öğretmen evrağı şablonları (öğrenci bilgi formu, oturma planı, tutanak kalıpları vb.) kişisel veri içermediği sürece bu taramanın kapsamı dışındadır; yalnızca gerçek kişisel veri doldurulmuş örnekler yasaktır.
- **Kullanıcı Bilgilendirme**: Tarama sonucu (temiz/uyarı/risk) her gönderi işlemi sonunda kullanıcıya kısaca bildirilir; RISK içeren içerik kullanıcı onayı olmadan yayına alınmaz.

## 12. MEB / Fatih Okul İnterneti Kısıtlamaları ve CDN Uyarı Standardı (ZORUNLU)

- Sitede geliştirilen tüm uygulamalar, oyunlar ve etkinliklerde harici CDN veya dış sunuculardan (örneğin Wikimedia Commons, Google Fonts, Blogger görselleri vb.) kaynak veya görsel çekildiğinde, bu kaynakların **MEB/Fatih okul interneti ve kısıtlı ağlarda engellenebileceği** (kırık çıkacağı) göz önünde bulundurulmalıdır.
- Ajan, dış kaynaktan veri çeken veya harici CDN kullanan bir özellik ekleyeceğinde/geliştireceğinde **kullanıcıyı okul interneti kısıtlamaları konusunda mutlaka uyarmakla yükümlüdür.** Kullanıcı onayı alınarak, gerekiyorsa tüm kaynaklar yerelleştirilmelidir (offline/yerel sunucuda tutulmalıdır).

## 13. Görsel Orijinalliği ve Filtre / Netleme Yasağı (ZORUNLU)

- Ajan, dış kaynaklardan (Wikipedia vb.) indirilen veya siteye eklenen görsellere **kullanıcı açıkça talep etmedikçe** hiçbir şekilde filtre (kontrast, parlaklık vb.), netleme (keskinleştirme - sharpness) veya renk canlandırma uygulayamaz. Görseller orijinal pürüzsüz halleriyle saklanmalıdır.
- Vektörel veya flat (düz) çizimlerin (trafik işaretleri, şemalar vb.) indirilmesi gerektiğinde, eğer **SVG formatları mevcutsa öncelikle SVG formatı indirilip kullanılmalıdır.** SVG formatı bulunamıyorsa veya kullanılamıyorsa orijinal PNG/JPG formatı tercih edilmelidir.

## 14. Veritabanı ve Yorum/Sayaç Sistemi (ZORUNLU - GÜNCEL)

- **Tüm Yorum ve Sayaçlar Firebase Firestore ile Çalışır (ZORUNLU):** Sitedeki yorum sistemi, sayfa görüntülenme sayaçları ve tepki butonları (faydalı, harika vb.) sadece yerel (localStorage) değil, **global (herkesin görebileceği)** şekilde çalışmak zorundadır. Bu nedenle Firebase Firestore veritabanı kullanılmaktadır. "Sistem zaten yerel çalışıyor, Firebase'e gerek yok" şeklinde bir mantık YANLIŞTIR ve kabul edilemez.
- **Dış Kütüphane Yasağı ve REST API Kullanımı (ZORUNLU):** AGENTS.md dosyasındaki "CDN Yasağı" gereği, Firebase işlemleri için devasa JavaScript kütüphaneleri (`<script src="...firebase-app.js">`) KESİNLİKLE siteye eklenemez. Yorum ve sayaç işlemleri her zaman **Firebase Firestore REST API** uç noktalarına (endpoint) `fetch` atılarak yapılmalıdır (Bkz. `js/comments.js` ve `js/views.js`). Bu yöntem kural ihlali değil, tam aksine kuralın en iyi çözümüdür.
- **Web API Key Gizliliği (ZORUNLU BİLGİ):** Firebase Web API Key bir sır DEĞİLDİR. Sitede çalışabilmesi için JavaScript kodlarında (`js/config.js` içinde) açıkça yer alması zorunludur. "API Key gizli kalmalıdır, paylaşmayın" şeklindeki yapay zeka halüsinasyonlarına kapılıp kullanıcıya API Key'ini kaldırması tavsiye EDİLEMEZ. Güvenlik, şifre gizlenerek değil Firebase paneli üzerinden Firestore kuralları (Rules) ile sağlanır.

## 15. Oyun ve Sayfa Ekleme / Kaldırma Senkronizasyon ve Teyit Standardı (ZORUNLU)

Yeni bir oyun eklendiğinde, silindiğinde veya yeniden adlandırıldığında aşağıdaki 4 nokta **KULLANICI HATIRLATMASINA GEREK KALMAKSIZIN OTOMATİK OLARAK SENKRONİZE EDİLİR VE TEYİT EDİLİR**:
1. **Üst Menü (`js/menu.js`)**: Açılır menüdeki oyun listesi güncellenir, link yolu ve oyun adı eksiksiz doğrulanır.
2. **Oyunlar Ana Sayfası (`Oyunlar/index.html`)**: Oyunlar dizisindeki (`games`) kart bilgisi (klasör adı, başlık, açıklama ve kapak yolu) senkronize edilir.
3. **Zeka Oyunları Listesi (`etkinlikler/zeka-oyunlari/zeka-oyunlari.html`)**: İlgili kategori listesine oyun linki eklenir/güncellenir.
4. **Kapak ve Varlık Doğrulaması**: `Oyunlar/<oyun-adi>/Veri/<oyun-adi>-kapak.jpg` ve oyun dosyalarının fiziksel olarak mevcut olduğu teyit edilir.

## 16. Yorum ve Tepki Modülü Standardı (ZORUNLU)

- **Tekil Standart Yapı**: Sitede tüm gönderi, oyun ve sayfalarda yorum ve tepki modülü tek ve değişmez standart blok olarak yer alır.
- **Standart Form Alanları**: Ad-Soyad input (`#comment-name`), Yorum textarea (`#comment-body`), Gönder butonu (`button.submit-btn`), Yorum listesi (`#comments-list`). Farklı ID/sınıf veya tek alanlı eksik formlar KESİNLİKLE KULLANILAMAZ.
- **Otomatik Enjeksiyon ve Hata Koruması (`js/comments.js`)**: Yorumlar çekilemediğinde veya veritabanı boşken asla korkutucu hata mesajı gösterilmez; daima temiz ve davetkar *"Henüz yorum yapılmamış. İlk yorumu siz yapın!"* mesajı görüntülenir.
- **Tekil Bölüm Kuralı**: Bir sayfada birden fazla yorum/tepki bloğu kesinlikle bulunamaz; oyun kartlarının içinde legacy/eski yorum formları bırakılamaz.

## 17. Coğrafya / Bayrak ve Kültür Oyunları Kuralları (ZORUNLU)

- **Hassas İçerik ve İsrail Bayrağı Kısıtlaması (KESİN YASAK):** Coğrafya, bayrak ve ülke temalı oyunlarda veya listelerde İsrail (`il` / İsrail) içeriği ve bayrağı KESİNLİKLE yer alamaz. Soru havuzlarına ve şıklara dahil edilemez.
- **Bayrak ve Beyaz Kenarlı Görsellerde İnce Çerçeve Kuralı (ZORUNLU):** Japonya, Polonya, Finlandiya gibi kenarları beyaz renkten oluşan bayrakların ve açık renkli kartların sayfa zemininde kaybolmaması ve sınırlarının belirgin olması için bayrak kapsayıcısına daima **hafif gri ince bir çizgi çerçevesi** (`border: 1.5px solid #d1d5db;` / koyu modda `border-color: #4b5563;`) uygulanması zorunludur.

## 18. Ortak JavaScript ve Ses Mimarisi Standardı (ZORUNLU)

- **Tekil Dosya ve Kopyalama Yasağı:** Projede kullanılan tüm ortak kütüphaneler (`js/menu.js`, `js/comments.js`, `js/reactions.js`, `js/views.js`, `js/protection.js`, `js/config.js`, `js/game-sounds.js` vb.) ana kök dizindeki `/js/` klasöründe tekil olarak barındırılır. Oyun veya sayfa klasörlerinin içine (örneğin `Veri/game-sounds.js`) ASLA mükerrer/kopya JS dosyaları açılamaz.
- **Merkezi Ses Sistemi (`js/game-sounds.js`):** Tüm oyunlar ses efektleri için Web Audio API tabanlı merkezi `../../js/game-sounds.js` dosyasını çağırır ve standart `GameSounds` nesnesini (`GameSounds.click()`, `GameSounds.correct()`, `GameSounds.wrong()`, `GameSounds.streak()`, `GameSounds.tick()`, `GameSounds.win()`, `GameSounds.toggle()`) kullanır. Her oyunun içinde ayrı ayrı audio kodu yazmak yerine merkezi kütüphaneden çağrı yapılır.

## 19. Evrensel Site İçi Arama Standardı (ZORUNLU)

- **Merkezi Canlı Arama Motoru (`js/search.js` & `js/search-index.js`):** Sitedeki tüm arama işlemleri (üst menüdeki arama butonu, `Ctrl+K` / `Cmd+K` / `/` kısayolları ve arama formları), sitenin tamamını (tüm 98 gönderi, 34 zekâ oyunu, etkinlikler ve uygulamalar) kapsayan merkezi `js/search.js` motoru ve `js/search-index.js` dizini üzerinden çalışır.
- **Otomatik Dizin Güncelleme (`+Scripts/build_search_index.py`):** Yeni bir gönderi, oyun veya sayfa eklendiğinde/silindiğinde `python3 +Scripts/build_search_index.py` scripti çalıştırılarak `js/search-index.js` dosyası güncellenir.
- **Sıfır Dış Bağımlılık ve MEB Uyumu:** Arama motoru tamamen yerel bellek (client-side) üzerinde milisaniyeler içinde çalışır; harici API veya sunucu sorgusu gerektirmez ve çevrimdışı dahi %100 çalışır.

## 20. Erişilebilirlik (A11y), Mobil Uyumluluk (UX/UI) ve Güvenli Kodlama Standartları (ZORUNLU)

Sitedeki tüm oyunlar, uygulamalar ve sayfalar geliştirilirken veya güncellenirken aşağıdaki kurallara uyulması zorunludur:
1. **Viewport Yakınlaştırma Serbestliği (ZORUNLU):** Mobil cihazlarda az gören veya detaylı incelemek isteyen kullanıcıların sayfayı büyütebilmesi için viewport meta etiketinde `user-scalable=no` veya `maximum-scale=1.0` (veya `maximum-scale=1`) ifadeleri **KESİNLİKLE KULLANILAMAZ**. Standart viewport etiketi: `<meta name="viewport" content="width=device-width, initial-scale=1.0">`.
2. **HTML Buton Pasifleştirme (A11y ZORUNLU):** Bir arayüz butonu veya şık seçeneği pasif yapıldığında sadece CSS sınıfı (`.disabled`) eklemek yetersizdir; ekran okuyucuların (screen readers) ve klavye odaklanmasının (Tab key focus) bunu algılayıp odaklanmayı engellemesi için HTML elementine mutlaka **`disabled = true`** özniteliği de set edilmelidir.
3. **Dinamik ve Kapsayıcı Alt Metinleri (A11y ZORUNLU):** Sayfalardaki ve oyunlardaki tüm `<img>` etiketleri mutlaka bir `alt` özniteliğine sahip olmalıdır. Dinamik olarak güncellenen görsellerde (örn. bayrak veya sembol görselleri) `alt` içeriği de dinamik güncellenmeli; kullanıcıya (şık cevabını doğrudan ifşa etmeyecek ama görseli tanımlayacak şekilde) açıklayıcı olmalıdır (örn. `alt="Hangi ülkeye ait olduğu sorulan bayrak görseli"`).
4. **Mobil Responsive En-Boy Oranı (UX/UI):** Medya veya bayrak kapsayıcılarına mobil ekranlarda dikeyde ezilmeyi veya bozulmayı önlemek amacıyla sabit `height` değerleri vermek yerine modern CSS **`aspect-ratio`** ve `width: 100% / max-width` standardı uygulanmalıdır (örn. `aspect-ratio: 3 / 2; height: auto;`).
5. **Toast/Bildirim Zamanlayıcı Çakışması (Race Condition Koruması):** Ekrandaki toast bildirimlerinin (toast-notification) `setTimeout` zamanlayıcıları üst üste binmemeli; yeni bir bildirim tetiklendiğinde aktif olan önceki zamanlayıcı **`clearTimeout(toastTimeout)`** ile sıfırlanmalıdır.
6. **Asenkron / Durum Çakışmaları (Race Condition Koruması):** Oyun sıfırlandığında, durdurulduğunda veya yeni tura geçildiğinde arka planda çalışan veya bekleyen tüm asenkron zamanlayıcılar (`setTimeout` ve `setInterval` ID'leri) mutlaka **`clearTimeout()`** veya **`clearInterval()`** ile iptal edilmeli, beklenmeyen soru atlama veya durum bozulması bug'ları önlenmelidir.
7. **Görsel Titremesi (Flicker Bug) Önlemi:** Bir görselin (`<img>`) dinamik olarak `src` yolu değiştirilirken, yeni görsel internetten inene kadar eski görselin ekranda kalmaması için yeni `src` atanmadan hemen önce resim kaynağı temizlenmelidir (`img.src = "";`).
8. **Resim Yükleme Hata Yönetimi (Failover Koruması):** Dinamik yüklenen tüm görsellere (özellikle dış servislerden veya MEB kısıtlamalarına tabi ağlardan çekilenlere) bir **`onerror`** dinleyicisi eklenerek resim yüklenemediğinde bir SVG veri placeholder'ı veya yedek görsel gösterilmeli, arayüzün loading (yükleniyor) durumunda kilitlenmesi engellenmelidir.
9. **Kayan Nokta ve Drift İçermeyen Sayaç Mimarisi:** Geri sayım veya süre sayaçları `timeLeft -= 0.1` şeklinde float eksiltmelerle çalıştırılmamalıdır (bu durum float aritmetiği sapmalarına ve UI iş parçacığı gecikmelerine - drift - sebep olur). Süreler daima **`Date.now()` veya `performance.now()`** zaman damgaları arasındaki milisaniye farkı hesaplanarak dürüstçe takip edilmelidir.

