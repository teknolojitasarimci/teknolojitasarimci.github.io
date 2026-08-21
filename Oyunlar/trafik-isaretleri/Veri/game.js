const SIGNS = [
  { code: "T-1a", u: "Veri/T-1a.svg", name: "Sağa tehlikeli viraj" },
  { code: "T-1b", u: "Veri/T-1b.svg", name: "Sola tehlikeli viraj" },
  { code: "T-2a", u: "Veri/T-2a.svg", name: "Sağa tehlikeli devamlı virajlar" },
  { code: "T-2b", u: "Veri/T-2b.svg", name: "Sola tehlikeli devamlı virajlar" },
  { code: "T-3a", u: "Veri/T-3a.svg", name: "Tehlikeli eğim (iniş)" },
  { code: "T-3b", u: "Veri/T-3b.svg", name: "Tehlikeli eğim (çıkış)" },
  { code: "T-4a", u: "Veri/T-4a.svg", name: "Her iki taraftan daralan kaplama" },
  { code: "T-4b", u: "Veri/T-4b.svg", name: "Sağdan daralan kaplama" },
  { code: "T-4c", u: "Veri/T-4c.svg", name: "Soldan daralan kaplama" },
  { code: "T-5", u: "Veri/T-5.svg", name: "Açılan köprü" },
  { code: "T-6", u: "Veri/T-6.svg", name: "Deniz veya nehir kıyısında biten yol" },
  { code: "T-7", u: "Veri/T-7.svg", name: "Kasisli yol" },
  { code: "T-8", u: "Veri/T-8.svg", name: "Kaygan yol" },
  { code: "T-9", u: "Veri/T-9.svg", name: "Gevşek malzemeli zemin" },
  { code: "T-10", u: "Veri/T-10.svg", name: "Gevşek şev" },
  { code: "T-11", u: "Veri/T-11.svg", name: "Yaya geçidi" },
  { code: "T-12", u: "Veri/T-12.svg", name: "Okul geçidi" },
  { code: "T-13", u: "Veri/T-13.svg", name: "Bisiklet geçebilir" },
  { code: "T-14a", u: "Veri/T-14a.svg", name: "Ehli hayvanlar geçebilir" },
  { code: "T-14b", u: "Veri/T-14b.svg", name: "Vahşi hayvanlar geçebilir" },
  { code: "T-16", u: "Veri/T-16.svg", name: "Işıklı işaret cihazı" },
  { code: "T-17", u: "Veri/T-17.svg", name: "Havalimanı (alçak uçuş)" },
  { code: "T-18", u: "Veri/T-18.svg", name: "Yandan rüzgar" },
  { code: "T-19", u: "Veri/T-19.svg", name: "İki yönlü trafik" },
  { code: "T-20", u: "Veri/T-20.svg", name: "Dikkat" },
  { code: "T-21", u: "Veri/T-21.svg", name: "Kontrolsüz kavşak" },
  { code: "T-22a", u: "Veri/T-22a.svg", name: "Ana yol-Tali yol kavşağı" },
  { code: "T-22b", u: "Veri/T-22b.svg", name: "Ana yol-Tali yol kavşağı" },
  { code: "T-22c", u: "Veri/T-22c.svg", name: "Ana yol-Tali yol kavşağı" },
  { code: "T-22d", u: "Veri/T-22d.svg", name: "Ana yol-Tali yol kavşağı" },
  { code: "T-22e", u: "Veri/T-22e.svg", name: "Ana yol-Tali yol kavşağı" },
  { code: "T-23a", u: "Veri/T-23a.svg", name: "Sağdan ana yola giriş" },
  { code: "T-23b", u: "Veri/T-23b.svg", name: "Soldan ana yola giriş" },
  { code: "T-24", u: "Veri/T-24.svg", name: "Dönel kavşak" },
  { code: "T-25", u: "Veri/T-25.svg", name: "Kontrollü demiryolu geçidi" },
  { code: "T-26", u: "Veri/T-26.svg", name: "Kontrolsüz demiryolu geçidi" },
  { code: "T-27a", u: "Veri/T-27a.svg", name: "Kontrolsüz demiryolu geçidi (tek hat)" },
  { code: "T-27b", u: "Veri/T-27b.svg", name: "Kontrolsüz demiryolu geçidi (çift hat)" },
  { code: "T-28a-b", u: "Veri/T-28a-b.svg", name: "Demiryolu hemzemin geçit yaklaşımı (sağ, sol)" },
  { code: "T-29a-b", u: "Veri/T-29a-b.svg", name: "Demiryolu hemzemin geçit yaklaşımı (sağ, sol)" },
  { code: "T-30a-b", u: "Veri/T-30a-b.svg", name: "Demiryolu hemzemin geçit yaklaşımı (sağ, sol)" },
  { code: "T-31a-b", u: "Veri/T-31a-b.svg", name: "Köprü başı levhası (sağ, sol)" },
  { code: "T-32", u: "Veri/T-32.svg", name: "Engel işareti" },
  { code: "T-33a", u: "Veri/T-33a.svg", name: "Tehlikeli viraj yön levhası" },
  { code: "T-33b", u: "Veri/T-33b.svg", name: "Tehlikeli viraj yön levhası" },
  { code: "T-33d-e", u: "Veri/T-33d-e.svg", name: "Onarım yaklaşım levhası (sağ, sol)" },
  { code: "T-33f", u: "Veri/T-33f.svg", name: "Onarım yaklaşım levhası" },
  { code: "T-34a-b", u: "Veri/T-34a-b.svg", name: "Refüj başı ek levhası (sağ, sol)" },
  { code: "T-35", u: "Veri/T-35.svg", name: "Dönüş adası ek levhası" },
  { code: "T-36", u: "Veri/T-36.svg", name: "Düşük banket" },
  { code: "T-37", u: "Veri/T-37.svg", name: "Gizli buzlanma" },
  { code: "T-38", u: "Veri/T-38.svg", name: "Olası Trafik sıkışıklığı" },
  { code: "T-39", u: "Veri/T-39.svg", name: "Tramvay hattı ile oluşan kavşak" },
  { code: "TT-1", u: "Veri/TT-1.svg", name: "Yol ver" },
  { code: "TT-2", u: "Veri/TT-2.svg", name: "Dur" },
  { code: "TT-2a", u: "Veri/TT-2a.svg", name: "Çocuklar için dur" },
  { code: "TT-3", u: "Veri/TT-3.svg", name: "Karşıdan gelene yol ver" },
  { code: "TT-4", u: "Veri/TT-4.svg", name: "Girişi olmayan yol" },
  { code: "TT-5", u: "Veri/TT-5.svg", name: "Taşıt trafiğine kapalı yol" },
  { code: "TT-6", u: "Veri/TT-6.svg", name: "Araba giremez" },
  { code: "TT-7", u: "Veri/TT-7.svg", name: "Motosiklet giremez" },
  { code: "TT-8", u: "Veri/TT-8.svg", name: "Bisiklet giremez" },
  { code: "TT-9", u: "Veri/TT-9.svg", name: "Motorlu bisiklet giremez" },
  { code: "TT-10a", u: "Veri/TT-10a.svg", name: "Kamyon giremez" },
  { code: "TT-10b", u: "Veri/TT-10b.svg", name: "Otobüs giremez" },
  { code: "TT-11", u: "Veri/TT-11.svg", name: "Treyler giremez" },
  { code: "TT-12", u: "Veri/TT-12.svg", name: "Yaya giremez" },
  { code: "TT-13", u: "Veri/TT-13.svg", name: "At arabası giremez" },
  { code: "TT-14", u: "Veri/TT-14.svg", name: "El arabası giremez" },
  { code: "TT-15", u: "Veri/TT-15.svg", name: "Traktör giremez" },
  { code: "TT-16a", u: "Veri/TT-16a.svg", name: "Belirli miktarlardan fazla patlayıcı ve parlayıcı madde taşıyan taşıt giremez" },
  { code: "TT-16b", u: "Veri/TT-16b.svg", name: "Tehlikeli madde taşıyan taşıt giremez" },
  { code: "TT-17", u: "Veri/TT-17.svg", name: "Belirli miktarlardan fazla su kirletici madde taşıyan taşıt giremez" },
  { code: "TT-18", u: "Veri/TT-18.svg", name: "Motorlu taşıt giremez" },
  { code: "TT-19", u: "Veri/TT-19.svg", name: "Taşıt giremez" },
  { code: "TT-20", u: "Veri/TT-20.svg", name: "Genişliği ... metreden fazla olan taşıt giremez" },
  { code: "TT-21", u: "Veri/TT-21.svg", name: "Yüksekliği ... metreden fazla olan taşıt giremez" },
  { code: "TT-22", u: "Veri/TT-22.svg", name: "Uzunluğu ... metreden fazla olan taşıt giremez" },
  { code: "TT-23", u: "Veri/TT-23.svg", name: "Dingil başına ... tondan fazla yük düşen taşıt giremez" },
  { code: "TT-24", u: "Veri/TT-24.svg", name: "Yüklü ağırlığı ... tondan fazla olan taşıt giremez" },
  { code: "TT-25", u: "Veri/TT-25.svg", name: "Öndeki taşıt ... metreden daha yakın takip edilemez" },
  { code: "TT-26a", u: "Veri/TT-26a.svg", name: "Sağa dönülemez" },
  { code: "TT-26b", u: "Veri/TT-26b.svg", name: "Sola dönülemez" },
  { code: "TT-26c", u: "Veri/TT-26c.svg", name: "U dönüşü yapılamaz" },
  { code: "TT-27", u: "Veri/TT-27.svg", name: "Öndeki taşıtı geçmek yasaktır" },
  { code: "TT-28", u: "Veri/TT-28.svg", name: "Kamyonlar için öndeki taşıtı geçmek yasaktır" },
  { code: "TT-29a", u: "Veri/TT-29a.svg", name: "Azami hız sınırlaması" },
  { code: "TT-29b", u: "Veri/TT-29b.svg", name: "Okul Bölgesi Azami Hız Sınırı" },
  { code: "TT-30", u: "Veri/TT-30.svg", name: "Sesli ikaz cihazlarının kullanımı yasaktır" },
  { code: "TT-31", u: "Veri/TT-31.svg", name: "Gümrük" },
  { code: "TT-32", u: "Veri/TT-32.svg", name: "Bütün yasaklama ve kısıtlamaların sonu" },
  { code: "TT-33a", u: "Veri/TT-33a.svg", name: "Hız sınırlaması sonu" },
  { code: "TT-33b", u: "Veri/TT-33b.svg", name: "Azami hız bölgesi sonu" },
  { code: "TT-34a", u: "Veri/TT-34a.svg", name: "Geçme yasağı sonu" },
  { code: "TT-34b", u: "Veri/TT-34b.svg", name: "Kamyonlar için geçme yasağı sonu" },
  { code: "TT-35a", u: "Veri/TT-35a.svg", name: "Sağa mecburi yön" },
  { code: "TT-35b", u: "Veri/TT-35b.svg", name: "Sola mecburi yön" },
  { code: "TT-35c", u: "Veri/TT-35c.svg", name: "İleri mecburi yön" },
  { code: "TT-35d", u: "Veri/TT-35d.svg", name: "İleri ve sağa mecburi yön" },
  { code: "TT-35e", u: "Veri/TT-35e.svg", name: "İleri ve sola mecburi yön" },
  { code: "TT-35f", u: "Veri/TT-35f.svg", name: "Sağa ve sola mecburi yön" },
  { code: "TT-35g", u: "Veri/TT-35g.svg", name: "İleriden sağa mecburi yön" },
  { code: "TT-35h", u: "Veri/TT-35h.svg", name: "ileriden sola mecburi yön" },
  { code: "TT-36a", u: "Veri/TT-36a.svg", name: "Sağdan gidiniz" },
  { code: "TT-36b", u: "Veri/TT-36b.svg", name: "Soldan gidiniz" },
  { code: "TT-36c", u: "Veri/TT-36c.svg", name: "Her iki yandan gidiniz" },
  { code: "TT-37", u: "Veri/TT-37.svg", name: "Ada etrafında dönünüz" },
  { code: "TT-38a", u: "Veri/TT-38a.svg", name: "Mecburi bisiklet yolu" },
  { code: "TT-38b", u: "Veri/TT-38b.svg", name: "Mecburi bisiklet yolu sonu" },
  { code: "TT-39a", u: "Veri/TT-39a.svg", name: "Mecburi yaya yolu" },
  { code: "TT-39b", u: "Veri/TT-39b.svg", name: "Mecburi yaya yolu sonu" },
  { code: "TT-40a", u: "Veri/TT-40a.svg", name: "Mecburi atlı yolu" },
  { code: "TT-40b", u: "Veri/TT-40b.svg", name: "Mecburi atlı yolu sonu" },
  { code: "TT-41a", u: "Veri/TT-41a.svg", name: "Mecburi asgari hız" },
  { code: "TT-41b", u: "Veri/TT-41b.svg", name: "Mecburi asgari hız sonu" },
  { code: "TT-42a", u: "Veri/TT-42a.svg", name: "Zincir takmak mecburidir" },
  { code: "TT-42b", u: "Veri/TT-42b.svg", name: "Zincir takmak mecburiyeti sonu" },
  { code: "TT-43", u: "Veri/TT-43.svg", name: "Ağır taşıtlar ve tehlikeli madde taşıyan taşıtlar için mecburi yön" },
  { code: "TT-43a", u: "Veri/TT-43a.svg", name: "Tehlikeli madde taşıyan taşıtların izleyecekleri mecburi yön" },
  { code: "TT-43b", u: "Veri/TT-43b.svg", name: "Tehlikeli madde taşıyan taşıtların izleyecekleri mecburi yön" },
  { code: "TT-43c", u: "Veri/TT-43c.svg", name: "Tehlikeli madde taşıyan taşıtların izleyecekleri mecburi yön" },
  { code: "TT-44a", u: "Veri/TT-44a.svg", name: "Yayalar ve bisikletliler tarafından kullanılabilen yol" },
  { code: "TT-44b", u: "Veri/TT-44b.svg", name: "Yayalar ve bisikletliler tarafından kullanılabilen yolun sonu" },
  { code: "TT-45a", u: "Veri/TT-45a.svg", name: "Yayalar ve bisikletliler için ayrı ayrı kullanılabilen yol" },
  { code: "TT-45b", u: "Veri/TT-45b.svg", name: "Yayalar ve bisikletliler için ayrı ayrı kullanılabilen yolun sonu" },
  { code: "B-2a", u: "Veri/B-2a.svg", name: "Girişi olmayan yol kavşağı" },
  { code: "B-2b", u: "Veri/B-2b.svg", name: "Girişi olmayan yol kavşağı" },
  { code: "B-2c", u: "Veri/B-2c.svg", name: "Girişi olmayan yol kavşağı" },
  { code: "B-2d", u: "Veri/B-2d.svg", name: "Girişi olmayan yol kavşağı" },
  { code: "B-3", u: "Veri/B-3.svg", name: "İleriki kavşakta sola dönüş yasağını gösteren işaret levhası" },
  { code: "B-4", u: "Veri/B-4.svg", name: "Kavşak öncesi şerit seçimi levhası" },
  { code: "B-5b", u: "Veri/B-5b.svg", name: "Kavşak içi yön levhası (Turistik Mahal)" },
  { code: "B-5c", u: "Veri/B-5c.svg", name: "Kavşak içi yön levhası (Metro)" },
  { code: "B-5d", u: "Veri/B-5d.svg", name: "Kavşak içi yön levhası (Köy ve Mahalle)" },
  { code: "B-6", u: "Veri/B-6.svg", name: "Kavşak içi yön levhası (Havalimanı)" },
  { code: "B-7", u: "Veri/B-7.svg", name: "Kavşak içi yön levhası (Kamp Yeri)" },
  { code: "B-8a", u: "Veri/B-8a.svg", name: "Türkiye devlet sınır levhası" },
  { code: "B-8b", u: "Veri/B-8b.svg", name: "İl sınırı levhası" },
  { code: "B-8c", u: "Veri/B-8c.svg", name: "Türkiye hız sınırları levhası" },
  { code: "B-9", u: "Veri/B-9.svg", name: "Meskun Mahal Levhası" },
  { code: "B-10", u: "Veri/B-10.svg", name: "Meskun Mahal Sonu Levhası" },
  { code: "B-13a", u: "Veri/B-13a.svg", name: "Meskun mahal ve kavşak çıkışı mesafe levhası" },
  { code: "B-13b", u: "Veri/B-13b.svg", name: "Mesafe levhası" },
  { code: "B-14a", u: "Veri/B-14a.svg", name: "Yaya geçidi" },
  { code: "B-14b", u: "Veri/B-14b.svg", name: "Okul geçidi" },
  { code: "B-14c", u: "Veri/B-14c.svg", name: "Yaya bölgesi" },
  { code: "B-14d", u: "Veri/B-14d.svg", name: "Yaya bölgesi" },
  { code: "B-14e", u: "Veri/B-14e.svg", name: "Yaya bölgesi" },
  { code: "B-14f", u: "Veri/B-14f.svg", name: "Yaya bölgesi" },
  { code: "B-15", u: "Veri/B-15.svg", name: "Hastane" },
  { code: "B-16a", u: "Veri/B-16a.svg", name: "Tek yön" },
  { code: "B-16b", u: "Veri/B-16b.svg", name: "İleri tek yön" },
  { code: "B-17", u: "Veri/B-17.svg", name: "İleri çıkmaz yol" },
  { code: "B-18", u: "Veri/B-18.svg", name: "Otoyol başlangıcı" },
  { code: "B-19", u: "Veri/B-19.svg", name: "Otoyol sonu" },
  { code: "B-20", u: "Veri/B-20.svg", name: "Motorlu taşıt yolu başlangıcı" },
  { code: "B-21", u: "Veri/B-21.svg", name: "Motorlu taşıt yolu sonu" },
  { code: "B-22", u: "Veri/B-22.svg", name: "Durak" },
  { code: "B-23", u: "Veri/B-23.svg", name: "İlk yardım" },
  { code: "B-24", u: "Veri/B-24.svg", name: "Tamirhane" },
  { code: "B-25", u: "Veri/B-25.svg", name: "Telefon" },
  { code: "B-26", u: "Veri/B-26.svg", name: "Akaryakıt istasyonu" },
  { code: "B-27", u: "Veri/B-27.svg", name: "Otel veya motel" },
  { code: "B-28", u: "Veri/B-28.svg", name: "Lokanta" },
  { code: "B-29", u: "Veri/B-29.svg", name: "Çayhane veya kafeterya" },
  { code: "B-30", u: "Veri/B-30.svg", name: "Çeşme" },
  { code: "B-31", u: "Veri/B-31.svg", name: "Piknik yeri" },
  { code: "B-32", u: "Veri/B-32.svg", name: "Yürüyüş başlangıçı" },
  { code: "B-33", u: "Veri/B-33.svg", name: "Kamp yeri" },
  { code: "B-34", u: "Veri/B-34.svg", name: "Karavanlı kamp yeri" },
  { code: "B-35", u: "Veri/B-35.svg", name: "Çadırlı ve karavanlı kamp yeri" },
  { code: "B-36", u: "Veri/B-36.svg", name: "Gençlik kampı" },
  { code: "B-37", u: "Veri/B-37.svg", name: "Önceliği olan yol" },
  { code: "B-38", u: "Veri/B-38.svg", name: "Anayol" },
  { code: "B-39", u: "Veri/B-39.svg", name: "Anayol sonu" },
  { code: "B-40", u: "Veri/B-40.svg", name: "Jandarma" },
  { code: "B-41", u: "Veri/B-41.svg", name: "Polis" },
  { code: "B-42", u: "Veri/B-42.svg", name: "Yangın tehlikesi" },
  { code: "B-43", u: "Veri/B-43.svg", name: "Radyo" },
  { code: "B-44", u: "Veri/B-44.svg", name: "Turizm danışma" },
  { code: "B-45a", u: "Veri/B-45a.svg", name: "Alt geçit" },
  { code: "B-45b", u: "Veri/B-45b.svg", name: "Üst geçit" },
  { code: "B-45c", u: "Veri/B-45c.svg", name: "Rampalı yaya üst geçidi" },
  { code: "B-45d", u: "Veri/B-45d.svg", name: "Rampalı yaya alt geçidi" },
  { code: "B-46", u: "Veri/B-46.svg", name: "Yüzme yeri" },
  { code: "B-47", u: "Veri/B-47.svg", name: "Yüzülmez" },
  { code: "B-48", u: "Veri/B-48.svg", name: "Bölünmüş yol öncesi yol levhası" },
  { code: "B-49a", u: "Veri/B-49a.svg", name: "Tünel" },
  { code: "B-49b", u: "Veri/B-49b.svg", name: "Su altı tüneli" },
  { code: "B-52a", u: "Veri/B-52a.svg", name: "İki yönlü yol" },
  { code: "B-53a", u: "Veri/B-53a.svg", name: "U dönüşü levhası" },
  { code: "B-53b", u: "Veri/B-53b.svg", name: "U dönüşü levhası" },
  { code: "B-53c", u: "Veri/B-53c.svg", name: "U dönüşü levhası" },
  { code: "B-54", u: "Veri/B-54.svg", name: "Karayolları Bilgi Levhası" },
  { code: "B-55a", u: "Veri/B-55a.svg", name: "Kaçış rampası (sağ)" },
  { code: "B-55b", u: "Veri/B-55b.svg", name: "Kaçış rampası (sol)" },
  { code: "B-55c", u: "Veri/B-55c.svg", name: "Kaçış rampası 500 m" },
  { code: "B-55d", u: "Veri/B-55d.svg", name: "Kaçış rampası (sağ)" },
  { code: "B-55e", u: "Veri/B-55e.svg", name: "Kaçış rampası (sol)" },
  { code: "B-56", u: "Veri/B-56.svg", name: "Yaya öncelikli yol" },
  { code: "B-57", u: "Veri/B-57.svg", name: "Yaya öncelikli yolun sonu" },
  { code: "B-58a", u: "Veri/B-58a.svg", name: "İstasyon" },
  { code: "B-58b", u: "Veri/B-58b.svg", name: "Otogar" },
  { code: "B-59", u: "Veri/B-59.svg", name: "Tramvay durağı" },
  { code: "B-60", u: "Veri/B-60.svg", name: "Sanayi bölgesi (OSB)" },
  { code: "B-61a", u: "Veri/B-61a.svg", name: "Elektronik Denetleme Sistemi (EDS)" },
  { code: "B-61b", u: "Veri/B-61b.svg", name: "Elektronik Denetleme Sistemi (EDS)" },
  { code: "B-61c", u: "Veri/B-61c.svg", name: "Elektronik Denetleme Sistemi (EDS)" },
  { code: "B-61d", u: "Veri/B-61d.svg", name: "Elektronik Denetleme Sistemi (EDS)" },
  { code: "B-61e", u: "Veri/B-61e.svg", name: "Elektronik Denetleme Sistemi (EDS)" },
  { code: "B-61f", u: "Veri/B-61f.svg", name: "Elektronik Denetleme Sistemi (EDS)" },
  { code: "B-61g", u: "Veri/B-61g.svg", name: "Elektronik Denetleme Sistemi (EDS)" },
  { code: "B-63a", u: "Veri/B-63a.svg", name: "Karayolu Denetim İstasyonu 300m" },
  { code: "B-63b", u: "Veri/B-63b.svg", name: "Karayolu Denetim İstasyonu (sol)" },
  { code: "B-63c", u: "Veri/B-63c.svg", name: "Karayolu Denetim İstasyonu" },
  { code: "B-63d", u: "Veri/B-63d.svg", name: "Karayolu Denetim İstasyonu" },
  { code: "P-1", u: "Veri/P-1.svg", name: "Park etmek yasaktır" },
  { code: "P-2", u: "Veri/P-2.svg", name: "Duraklamak ve park etmek yasaktır" },
  { code: "P-3a", u: "Veri/P-3a.svg", name: "Park yeri" },
  { code: "P-3b", u: "Veri/P-3b.svg", name: "Park yeri" },
  { code: "P-3c", u: "Veri/P-3c.svg", name: "Park yeri" },
  { code: "P-3d", u: "Veri/P-3d.svg", name: "Park yeri" },
  { code: "P-3e", u: "Veri/P-3e.svg", name: "Park yeri" },
  { code: "P-3f", u: "Veri/P-3f.svg", name: "Kapalı Park Yeri" },
  { code: "P-3g", u: "Veri/P-3g.svg", name: "Park yeri (Metro)" },
  { code: "P-3h", u: "Veri/P-3h.svg", name: "Park yeri (tramvay)" },
  { code: "T-15", u: "Veri/T-15.svg", name: "Yolda çalışma" },
  { code: "T-16p", u: "Veri/T-16p.svg", name: "Işıklı işaret cihazı" },
  { code: "TT-3p", u: "Veri/TT-3p.svg", name: "Karşıdan gelene yol ver" },
  { code: "TT-29p", u: "Veri/TT-29p.svg", name: "Azami hız sınırlaması" },
];


const MAX_ROUNDS = 20;
const TOTAL_TIME = 200;
let currentMode = 'klasik';
let gamePool = [];
let currentQuestion = null;
let round = 1;
let score = 0;
let gameState = 'ready';
let roundResults = [];
let timeLeft = 0;
let timerInterval = null;

function playSound(type) {
    try {
        if (typeof GameSounds !== 'undefined' && GameSounds[type]) GameSounds[type]();
    } catch (e) {}
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function pickWrongOptions(correct, count) {
    const wrongs = [];
    const baseNum = c => c.split('-').slice(1).join('-').replace(/[a-z]$/i, '');
    const family = SIGNS.filter(s => {
        return s.code !== correct.code &&
            s.name !== correct.name &&
            s.code.split('-')[0] === correct.code.split('-')[0] &&
            baseNum(s.code) === baseNum(correct.code);
    });
    const sameCat = SIGNS.filter(s => s.code !== correct.code && s.name !== correct.name && s.code.split('-')[0] === correct.code.split('-')[0]);
    const rest = SIGNS.filter(s => s.code !== correct.code && s.name !== correct.name);
    const pools = [shuffle(family), shuffle(sameCat), shuffle(rest)];
    for (const pool of pools) {
        for (const s of pool) {
            if (wrongs.length >= count) break;
            if (!wrongs.some(w => w.name === s.name)) wrongs.push(s);
        }
        if (wrongs.length >= count) break;
    }
    return wrongs;
}

function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(el => el.classList.remove('active'));
    document.getElementById(screenId).classList.add('active');
}

function selectMode(mode) {
    if (currentMode === mode && document.getElementById('game-screen').classList.contains('active')) {
        return;
    }
    currentMode = mode;
    document.querySelectorAll('.btn-mode').forEach(el => el.classList.remove('active'));
    const map = { klasik: 'modeKlasik', ters: 'modeTers' };
    document.getElementById(map[mode]).classList.add('active');
    playSound('select');
    startGame();
}

function startGame() {
    round = 1;
    score = 0;
    gameState = 'ready';
    roundResults = new Array(MAX_ROUNDS).fill(null);
    gamePool = shuffle([...SIGNS]);
    stopTimer();
    startTimer();
    showScreen('game-screen');
    playSound('click');

    document.getElementById('normal-game-view').style.display = currentMode === 'ters' ? 'none' : 'block';
    document.getElementById('reverse-game-view').style.display = currentMode === 'ters' ? 'block' : 'none';

    document.getElementById('score-display').textContent = 'Puan: 0';
    nextQuestion();
}

function stopTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
}

function startTimer() {
    stopTimer();
    timeLeft = TOTAL_TIME;
    const tv = document.getElementById('time-value');
    if (tv) tv.textContent = timeLeft;
    timerInterval = setInterval(function () {
        timeLeft--;
        if (tv) tv.textContent = Math.max(0, timeLeft);
        if (timeLeft <= 0) {
            stopTimer();
            endGame();
        }
    }, 1000);
}

function updateProgress() {
    const container = document.getElementById('progress-dots');
    if (!container) return;
    let html = '';
    for (let i = 1; i <= MAX_ROUNDS; i++) {
        const res = roundResults[i - 1];
        if (res === 'correct') html += `<div class="prog-dot correct">${i}</div>`;
        else if (res === 'wrong') html += `<div class="prog-dot wrong">${i}</div>`;
        else if (i === round) html += `<div class="prog-dot current">${i}</div>`;
        else html += `<div class="prog-dot">${i}</div>`;
    }
    container.innerHTML = html;
}

function nextQuestion() {
    if (round > MAX_ROUNDS) { endGame(); return; }

    updateProgress();

    currentQuestion = gamePool[(round - 1) % gamePool.length];

    const fb = document.getElementById('answer-feedback');
    if (fb) fb.style.display = 'none';

    const nextBtn = document.getElementById('nextBtn');
    nextBtn.disabled = true;
    nextBtn.innerHTML = 'SONRAKİ <svg class="next-arrow" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="13 6 19 12 13 18"/></svg>';

    let wrongs = pickWrongOptions(currentQuestion, 3);

    let options = shuffle([currentQuestion, ...wrongs]);
    const letters = ['A', 'B', 'C', 'D'];

    if (currentMode === 'ters') {
        document.getElementById('reverse-question-text').textContent = '"' + currentQuestion.name + '" tabelası hangisidir?';
        document.getElementById('reverse-options-container').innerHTML = options.map((opt, i) =>
            `<button class="reverse-option-btn" data-code="${opt.code}" onclick="handleAnswer('${opt.code}', this)">
                <span class="opt-letter">${letters[i]}</span>
                <img src="${opt.u}" alt="${opt.name}" loading="lazy">
            </button>`).join('');
    } else {
        const img = document.getElementById('sign-image');
        img.src = currentQuestion.u;
        img.alt = currentQuestion.name;
        document.getElementById('options-container').innerHTML = options.map((opt, i) =>
            `<button class="option-btn" data-code="${opt.code}" onclick="handleAnswer('${opt.code}', this)">
                <span class="opt-letter">${letters[i]}</span>
                <span>${opt.name}</span>
            </button>`).join('');
    }
}

function handleAnswer(code, btn) {
    document.querySelectorAll('.option-btn, .reverse-option-btn').forEach(b => b.disabled = true);

    const isCorrect = (code === currentQuestion.code);
    const fb = document.getElementById('answer-feedback');

    if (isCorrect) {
        btn.classList.add('correct');
        playSound('point');
        roundResults[round - 1] = 'correct';
        score += 10;
        document.getElementById('score-display').textContent = 'Puan: ' + score;
        updateProgress();
        if (fb) {
            fb.textContent = 'Evet, cevabınız doğrudur. Tebrikler!';
            fb.style.background = '#dcfce7';
            fb.style.color = '#15803d';
            fb.style.display = 'block';
        }
    } else {
        btn.classList.add('wrong');
        playSound('wrong');
        document.querySelectorAll('.option-btn, .reverse-option-btn').forEach(b => {
            if (b.dataset.code === currentQuestion.code) b.classList.add('correct');
        });
        roundResults[round - 1] = 'wrong';
        updateProgress();
        if (fb) {
            fb.innerHTML = 'Maalesef cevabınız doğru değil. Doğru cevap: <strong>"' + currentQuestion.name + '"</strong>';
            fb.style.background = '#fee2e2';
            fb.style.color = '#b91c1c';
            fb.style.display = 'block';
        }
    }

    gameState = 'answered';
    const nextBtn = document.getElementById('nextBtn');
    nextBtn.disabled = false;
    nextBtn.innerHTML = (round >= MAX_ROUNDS ? 'SONUÇ' : 'SONRAKİ') + ' <svg class="next-arrow" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="13 6 19 12 13 18"/></svg>';
}

document.getElementById('nextBtn').addEventListener('click', function () {
    if (gameState === 'answered') {
        round++;
        gameState = 'ready';
        nextQuestion();
    }
});

function endGame() {
    stopTimer();
    const answered = roundResults.filter(r => r !== null).length;
    const timedOut = roundResults.filter(r => r === null).length;
    showScreen('result-screen');
    const correct = roundResults.filter(r => r === 'correct').length;
    const wrong = roundResults.filter(r => r === 'wrong').length;
    document.getElementById('score-circle').textContent = score;
    let detail = MAX_ROUNDS + ' sorudan ' + correct + ' tanesini doğru yanıtladınız.';
    if (timedOut > 0) detail += ' Süre dolduğu için ' + timedOut + ' soruya cevap veremediniz.';
    document.getElementById('result-detail').textContent = detail;
    playSound('win');
}

function replayGame() { playSound('click'); startGame(); }
function goHome() { playSound('click'); startGame(); }

function initModeButtons() {
    document.getElementById('modeKlasik').addEventListener('click', () => selectMode('klasik'));
    document.getElementById('modeTers').addEventListener('click', () => selectMode('ters'));
    document.getElementById('rulesBtn').addEventListener('click', () => document.getElementById('rulesModal').classList.add('open'));
    document.getElementById('rulesClose').addEventListener('click', () => document.getElementById('rulesModal').classList.remove('open'));
    document.getElementById('rulesModal').addEventListener('click', (e) => { if (e.target === e.currentTarget) e.currentTarget.classList.remove('open'); });
}

initModeButtons();
startGame();
