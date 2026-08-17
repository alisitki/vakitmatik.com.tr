# Vakitmatik Yaşayan Yol Haritası

Sürüm: `0.3-draft`

Tarih: `2026-08-17`

Durum: `Paket P0 tamamlandı — P1 başlamadı`

Kuzey yıldızı: `Sipariş`

Bu yol haritası yeni veri ve kullanıcı kararlarıyla güncellenebilir. Her değişiklik `decision-log.md` dosyasına işlenir. Bir fazın onayı sonraki fazı otomatik olarak başlatmaz.

## 17 Ağustos 2026 güncel geçiş durumu

`KANITLANDI`

- Paket P0 için kaynak, canlı ve karar baseline denetimi uygulandı; proje sahibi sonucu 17 Ağustos 2026'da onayladı.
- Canlı deployment değişmedi ve `gitDirty: 1` riski devam ediyor.
- Karışık çalışma ağacı; canlı eşdeğer, yalnız yerel ürün detail, dashboard/Ads aracı ve dokümantasyon commitlerine ayrıldı.
- 10 ürün detail route'u yerelde tutuluyor; canlıda 404, sitemap ve iç bağlantı dışında.
- Telefon/WhatsApp conversion hedefleri doğru Ads hesabındaki etkin primary action'larla eşleşiyor. Temel tag'in farklı öneki split-routing riski olarak açık tutuldu.
- Güncel GSC snapshot'ı, yerel ve production credential kayıtları boş olduğu için alınamadı.
- Production, Google Ads, Search Console ve `.org` yönlendirme ayarlarında değişiklik yapılmadı.

Ayrıntılı kanıt ve geri alma kaydı: [`p0-baseline-2026-08-17.md`](p0-baseline-2026-08-17.md).

Sıradaki öneri, ayrı kapsam ve yön onayıyla `Paket P1 — 10 ürün detay sayfası incelemesi`dir. P0 sonuç onayı P1'i otomatik başlatmamıştır.

> Aşağıdaki Temmuz başlangıç snapshot'ı ve eski faz tablosu tarihsel plan kaydıdır; güncel canlı durum yerine kullanılamaz.

## Mevcut doğrulanmış başlangıç durumu

### Canlı Google Ads — 9–22 Temmuz 2026

| Ölçüm | Sonuç |
| --- | ---: |
| Gösterim | 3.250 |
| Tıklama | 430 |
| Harcama | 6.339,65 TL |
| Google Ads dönüşümü | 0 |
| Mobil tıklama | 404 |
| Masaüstü tıklama | 25 |
| Tablet tıklama | 1 |

`KANITLANDI`

- Etkin reklamların final URL'leri hâlâ ana sayfadır.
- Cami saati, camii saatleri, fiyat ve pano kelimelerinde landing deneyimi ağırlıklı olarak `BELOW_AVERAGE` görünmektedir.
- Reklamı yayınlayan müşteri hesabında dönüşüm aksiyonu görünmemektedir.
- Site kodu telefon ve e-posta tıklamasını izlemeye hazırlanmıştır; WhatsApp tıklaması izlenmemektedir.
- E-posta gerçek satış kanalı olarak önemsizdir.
- Kullanıcı reklamların işletmeye hareket kazandırdığını gözlemlemiştir; gerçek sipariş sayısı henüz reklama bağlanamamaktadır.

## Faz ve onay kapıları

### Faz 0 — Proje sistemi ve güvenlik

Amaç: Bütün ajanların aynı doğrulanmış gerçekler, onay sınırları ve yol haritasıyla çalışmasını sağlamak.

| Paket | Durum | Teslim | Onay kapısı |
| --- | --- | --- | --- |
| 0.1 Kontrollü iş akışı | İncelemede | Genel süreç, onay ve muhalefet sistemi | Kullanıcı belge onayı |
| 0.2 Vakitmatik proje anayasası | İncelemede | Marka, ürün, Ads ve SEO pusulası | Kullanıcı içerik onayı |
| 0.3 Yaşayan yol haritası ve karar kaydı | İncelemede | Fazlar, açık sorular, değişiklik düzeni | Kullanıcı yol haritası onayı |
| 0.4 Güvenlik/baseline yenileme | Bekliyor | Production, commit, Ads ve ölçüm snapshot'ı | Ayrı çalışma onayı |

Faz 0 çıkış kriteri:

- Belgeler kullanıcı tarafından onaylanmış olmalı.
- Açık sorular uygulanmış karar gibi görünmemeli.
- Bütün ajanlar için okuma sırası kök talimatta bulunmalı.
- Site, production ve Ads hesabında değişiklik yapılmamış olmalı.

### Faz 1 — Siparişe giden ölçüm sistemi

Amaç: Google'ın yalnız tıklamayı değil, en azından gerçek iletişimi ve mümkün olduğunda siparişi öğrenmesini sağlamak.

Önerilen paketler:

| Paket | Kapsam | Paket öncesi gerekli karar |
| --- | --- | --- |
| 1.1 Ölçüm tasarımı | WhatsApp, telefon, kaynak, landing ve tıklama kimliği veri modeli | Sipariş kaydının en hafif yöntemi |
| 1.2 Google Ads dönüşüm düzeltmesi | Dönüşüm aksiyonlarını reklam veren hesapta kurma | Tasarım ve adlandırma onayı |
| 1.3 Site olayları | WhatsApp ve telefon tıklamasını test edilebilir biçimde gönderme | Görünür kullanıcı etkisi onayı |
| 1.4 Sipariş geri bildirimi pilotu | WhatsApp'ta kapanan siparişi reklama bağlama denemesi | Manuel/yarı otomatik süreç onayı |
| 1.5 Gerçek cihaz testi | Mobil/masaüstü olay ve Ads teşhisi | Test sonucu onayı |

Faz 1 çıkış kriteri:

- WhatsApp ve telefon tıklamaları doğru hesapta görünmeli.
- E-posta birincil başarı metriği olmamalı.
- Landing ve kampanya kaynağı olayda bulunmalı.
- Sipariş ölçümü mümkün değilse eksik açıkça kayıtlı olmalı; sahte kesinlik üretilmemeli.

### Faz 2 — Landing sayfalarının tamamlanması

Her sayfa ayrı iş paketidir.

| Paket | Sayfa | Mevcut durum | Sonraki kapı |
| --- | --- | --- | --- |
| 2.1 Cami Saati | `/cami-saati/` | Yön ve büyük bölümü onaylandı; final anayasa denetimi bekliyor | Final içerik/görsel onayı |
| 2.2 Cami Saati Fiyatları | `/cami-saati-fiyatlari/` | Taslak ve bazı revizyonlar var; fiyat dili yeniden denetlenecek | Ayrı sayfa onayı |
| 2.3 Ayet Hadis Panosu | `/ayet-hadis-panosu/` | Görsel ve metin revizyonları sürüyor | Ayrı sayfa onayı |

Her sayfa için kabul kriterleri:

- İlk ekranda ürün ve arama niyeti açık.
- Görsel ürünün seviyesini taşıyor.
- Metin müşteriye konuşuyor; SEO veya arayüzü tarif etmiyor.
- Ürün gerçeği doğrulanmış.
- Mobilde gereksiz boşluk, taşma, kırık CTA veya üst üste binme yok.
- Görünür içerik Google Ads ve organik aramaya yeterli bağlam sağlıyor.
- Ana sayfaya geçiş mümkün; landing kendi başına faydasız köprü değil.
- Build, lint, yapılandırılmış veri ve performans kontrolleri geçiyor.

### Faz 3 — Production yayını

Amaç: Onaylı üç landing ve ölçüm sistemini kontrollü olarak canlıya almak.

Paketler:

1. Final preview ve değişiklik listesi
2. Production onayı
3. Canlı yayın
4. Mobil/masaüstü ve etiket doğrulaması
5. Canlı sonuç onayı veya geri alma

Production onayı Google Ads değişikliğini kapsamaz.

### Faz 4 — Google Ads landing geçişi

Amaç: Her reklam grubunu kendi doğru landing sayfasına tek tek taşımak ve etkisini ölçmek.

| Sıra | Reklam grubu | Hedef URL | Onay şekli |
| --- | --- | --- | --- |
| 4.1 | Cami Saati | `/cami-saati/` | RSA metni + final URL ayrı onay |
| 4.2 | Model ve Fiyat | `/cami-saati-fiyatlari/` | RSA metni + final URL ayrı onay |
| 4.3 | Ayet Hadis Panosu | `/ayet-hadis-panosu/` | RSA metni + final URL ayrı onay |
| 4.4 | Marka | `/` | Mevcut yapı ve gerekçe denetimi |
| 4.5 | Varlıklar | Site bağlantısı, logo, görseller | Varlık grubu bazında onay |

Kurallar:

- Mevcut reklamlar silinmez.
- Yeni reklam önce ayrı oluşturulur.
- Bütçe ve teklif stratejisi landing testiyle aynı anda değiştirilmez.
- Otomatik Google önerileri uygulanmaz.
- Her grup en az 14 gün veya 200 gösterim ölçülmeden kesin hüküm verilmez; sipariş sinyali önceliklidir.

### Faz 5 — Organik SEO temeli

Amaç: Aynı ürün gerçeklerini metin kalabalığına çevirmeden kalıcı organik görünürlük oluşturmak.

Önerilen paketler:

| Paket | Kapsam |
| --- | --- |
| 5.1 URL sahipliği | Ana sayfa ve landing'lerin birbirleriyle yarışmasını önleme |
| 5.2 Eski SEO metni temizliği | “Bu SEO sayfası”, “ana siteye geçin” gibi müşteriye konuşmayan içeriği kaldırma |
| 5.3 Teknik SEO | Canonical, sitemap, metadata, schema ve iç bağlantı denetimi |
| 5.4 Gerçek destek içerikleri | Yeni nesil cihazlarda güncelleme, geri kalma ve çalışmama soruları |
| 5.5 Search Console döngüsü | Sorgu, sayfa, CTR, konum ve cannibalization takibi |
| 5.6 Marka/güven katmanı | `1996'dan beri` ve mühendislik üreticisi konumunun ölçülü kullanımı |

SEO içerik ilkesi:

- Google için uzun metin yazılmaz.
- Her gerçek arama niyeti yeterli ve özgün cevap alır.
- Satış sayfası teknik destek kılavuzuna dönüştürülmez.
- Eski RS232 cihaz içeriği, yeni ürünü geriye çekecek biçimde satış sayfasına taşınmaz.

### Faz 6 — Model portföyü ve ürün önceliği

`SAHİBİ ONAYLADI: Ayrı ele alınacak.`

Bu fazda üç ayrı eksen birlikte değerlendirilir:

1. Google arama talebi
2. Firmanın satmak istediği ve ticari olarak değerli modeller
3. Müşterinin görsel ve kullanım tercihi

Bu analiz yapılmadan model sıralaması kalıcılaştırılmaz.

### Faz 7 — Almanya ve Avrupa

Amaç: Türkiye ana pazarını bozmadan, Almanya öncelikli Avrupa talebini gerçek lojistikle karşılamak.

Ön koşullar:

- FedEx, DHL veya alternatif doğrudan gönderim maliyeti ve süreci doğrulanmalı.
- Teslim süresi, gümrük, garanti ve destek yöntemi netleşmeli.
- Doğrulanmamış gönderim sözü siteye veya reklama yazılmamalı.

Lojistik doğrulandıktan sonra Almanya arama ve reklam paketi ayrıca onaya sunulur.

### Faz 8 — Sürekli öğrenme ve sistemin genelleştirilmesi

Amaç: Vakitmatik'te çalışan yöntemi veriyle geliştirmek; daha sonra yalnız iş akışını başka projelere uyarlamak.

Rutin:

- Ads arama terimleri ve harcama
- WhatsApp/telefon iletişimleri
- Gerçek siparişler
- Search Console sorgu ve sayfaları
- Landing performansı ve mobil sorunlar
- Kullanıcıdan gelen yeni ürün/marka kararları

Vakitmatik'te en az bir tamamlanmış ölçüm döngüsü görülmeden genel proje şablonu çıkarılmaz.

## Güncel önerilen sıra

1. `Paket P1 — kapsam ve yön onayı`
2. `Paket P1 — 10 ürün detay sayfası incelemesi`
3. Yalnız onaylanan ürünler için organik bağlama ve production hazırlığı
4. Ayrı onaylarla `.org` taşıması ve daha sonra Google Ads landing geçişi

Ölçümde telefon conversionının çalıştığına dair üretim kanıtı vardır; WhatsApp'ın 0 olma nedeni hâlâ açık sorudur. Gerçek cihaz firing testi, GSC credential düzeltmesi veya dashboard URL listesinin güncellenmesi P1 kapsamına kendiliğinden girmez ve ayrı paket olarak sunulmalıdır.
