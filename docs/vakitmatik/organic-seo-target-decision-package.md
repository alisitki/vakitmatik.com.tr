# Vakitmatik Organik SEO — Yeni Hedef Karar Paketi

Hazırlanma tarihi: `2026-07-29`  
Paket: `OSEO-2`  
Çalışma dalı: `codex/google-ads-landing-quality`  
Kaynak commit: `108cb91`  
Durum: `İncelemede — Karar Kapısı 1 ürün gerçekleri onaylandı; detay sayfası yönü açık`

## Paket sözleşmesi

**Amaç:** `vakitmatik.org` üzerindeki eski ürün, destek ve dosya URL'lerinin `vakitmatik.com.tr` üzerindeki doğru karşılıklarını belirlemek.

**Kapsam:**

- Eski sitemap'teki 51 URL'nin yeniden sınıflandırılması
- Google'da görünen fakat eski sitemap haritasında bulunmayan URL'lerin eklenmesi
- Mevcut `.com.tr` sayfalarının gerçekten hangi eski URL'lere hedef olabileceğinin doğrulanması
- Yeni ürün detayı, eski cihaz desteği ve güvenli dosya arşivi gerektiren boşlukların ayrılması
- Yalnız işletme sahibinin doğrulayabileceği kararların açık soru olarak çıkarılması

**Kapsam dışı:**

- Yeni sayfa veya görünür metin üretmek
- `.org` yönlendirmesi açmak
- `.htaccess`, DNS, mail veya hosting değiştirmek
- Search Console, Google Ads veya production değiştirmek
- Eski EXE, MSI, APK, RAR veya PDF dosyalarını yeni domaine taşımak

**Geri alma noktası:** Bu paket yalnız iç doküman üretir. Canlı değişiklik olmadığı için bu dosya ve URL haritasına eklenen taslak satırlar kaldırılarak geri alınabilir.

## Kanıtlanmış güncel durum

### Canlı siteler

- `vakitmatik.org`, `www.vakitmatik.org` ve eski sayfaların büyük bölümü hâlâ `200` döndürüyor.
- Eski alan adındaki ana sayfa, ürünler, destek merkezleri ve PDF'ler canonical olmadan ayrı ayrı indekslenebiliyor.
- `mail.vakitmatik.org/index.html`, Google sonuçlarında görünen ikinci bir eski site kopyasıdır.
- Yeni `.com.tr` sitesinde sekiz canonical URL vardır; bağımsız model detay sayfası yoktur.
- Yeni sitede `/destek/`, `/destek/programlar/` ve `/destek/kilavuzlar/` bulunmuyor.
- Mevcut `/support/` yeni nesil mobil uygulama desteğidir; eski RS232/USB cihaz arşivi değildir.
- Mevcut `/destek/vakitmatik-ayarlama/` genel bir SEO/destek giriş sayfasıdır; doğrulanmış eski cihaz adımlarını içermez.

### 29 Temmuz 2026 Google sonuç anlık görüntüsü

Bu veri Türkiye, masaüstü Google sonuçlarının SerpAPI ile alınmış tek zamanlı görüntüsüdür. Search Console tıklama/gösterim verisi değildir ve sıralamalar değişebilir.

| Arama | Eski `.org` sonucu | Yeni `.com.tr` sonucu |
| --- | ---: | ---: |
| `vakitmatik` | 2 | İlk 20'de yok |
| `cami saati` | 3 | İlk 20'de yok |
| `cami saati fiyatları` | 4 | İlk 20'de yok |
| `ayet hadis panosu` | Eski Mesaj 5 Özel sayfası 7 | İlk 20'de yok |
| `Vakitmatik Vakit 57` | Eski ürün sayfası 1 | İlk 10'da yok |
| `Vakitmatik Vakit 38` | Eski ürün sayfası 1 | İlk 10'da yok |
| `Vakitmatik desenli mavi` | Eski ürün sayfası 1 | Ana sayfa 4 |
| `Vakitmatik Vakit 100` | Eski ürün sayfası 1 | Ana sayfa 8 |
| `Vakitmatik güncelleme` | Eski USB sayfası 1; RS232 sayfası 3 | İlk 10'da yok |
| `Vakitmatik programı` | Eski programlar sayfası 1 | Ana sayfa 4 |

`site:vakitmatik.org` sorgusunda 57 benzersiz sonuç görüldü. Bunların 13'ü eski 51 URL'lik sitemap haritasında yoktu. `site:vakitmatik.com.tr` sorgusunda beş sonuç görüldü; bunlardan biri OSEO-1'de yönlendirilen eski duplicate URL'dir ve Google'ın yeniden taramasıyla zaman içinde değişmesi beklenir.

### Bunun anlamı

**Gözlem:** Eski alan adı yalnız bir arşiv değil; marka, ana kategori, belirli modeller ve destek aramalarında hâlâ güçlü bir organik varlıktır.

**Kanıt:** Yukarıdaki canlı sonuçlar, eski model sayfalarının tam model aramalarında ve eski destek sayfalarının güncelleme aramalarında üst sıralarda olduğunu gösteriyor.

**Etkisi:** Bütün eski URL'leri ana sayfaya veya tek kategoriye topluca göndermek, kullanıcının aradığı cevabı zayıflatır ve Google tarafından alakasız/soft-404 benzeri hedef olarak değerlendirilebilir.

**Öneri:** Her eski URL, gerçekten aynı ihtiyacı karşılayan nihai hedefe tek adımda yönlendirilmeli. Yeni sayfa yalnız doğrulanmış ürün veya destek ihtiyacı varsa hazırlanmalı. Model önceliği belirlenmeden otomatik olarak on ürün sayfası açılmamalı.

Google'ın resmî taşıma rehberi de eski URL envanteri ve birebir hedef haritası hazırlanmasını, alakasız toplu ana sayfa yönlendirmelerinden kaçınılmasını ve sunucu taraflı kalıcı yönlendirme kullanılmasını önerir:

- <https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes>
- <https://developers.google.com/search/docs/crawling-indexing/301-redirects>

## Karar grubu A — Hazır ve güvenli hedefler

Bu eşleşmeler mevcut sayfaların amacıyla doğrudan uyumludur:

| Eski içerik | Yeni hedef |
| --- | --- |
| `.org/` ve `.org/index.html` | `https://www.vakitmatik.com.tr/` |
| Eski Vakitmatik kategori sayfası | `/cami-saati/` |
| Eski Ayet Hadis kategori sayfası | `/ayet-hadis-panosu/` |
| Eski fiyat listesi HTML/PDF adresleri | `/cami-saati-fiyatlari/` |
| Eski iletişim sayfası | `/#iletisim` |
| Eski gizlilik sayfası | `/privacy/` |
| `mail.vakitmatik.org/index.html` web kopyası | Mail hizmetine dokunmadan `/` |

Eski kullanım koşulları sayfasının yeni sitede birebir karşılığı yoktur. Yeni, güncel bir kullanım koşulları sayfası veya `410` kararı gerekir; gizlilik sayfasına otomatik yönlendirilmez.

## Karar grubu B — Güncel Vakitmatik model eşleşmeleri

Eski sayfaların tam model aramalarında birinci sırada görünmesi nedeniyle, doğrulanan eşleşmeler için bağımsız ve premium detay sayfası hazırlanması önerilir. Bu sayfalar ana menüyü pazar yerine çevirmek zorunda değildir; ilgili ürün kartından ve eski URL'den ulaşılabilir.

| Eski ürün URL'si veya ailesi | Önerilen güncel aile | Durum |
| --- | --- | --- |
| Desenli Mavi | Desen Mavi | `SAHİBİ ONAYLADI` |
| Desenli Siyah | Desen Siyah | `SAHİBİ ONAYLADI` |
| Vakit 57 + Vakit 38 | Dikey | `SAHİBİ ONAYLADI`; küçük boy ölçüsü zamanla `38 × 58`den `40 × 60`a değişti |
| Vakit 57 Yatay + Vakit 38 Yatay | Yatay | `SAHİBİ ONAYLADI` |
| Vakit 57 Resimli | Resimli | `SAHİBİ ONAYLADI` |
| Vakit 57 Mesajlı | Kayan Yazı | `SAHİBİ ONAYLADI` |
| Vakit 38 Mesajlı | Mesaj | `SAHİBİ ONAYLADI` |
| Vakit 100 | LED | `SAHİBİ ONAYLADI` |

Modül ve LCD güncel ürünlerdir, fakat doğrulanmış eski URL karşılıkları yoktur. Bunlar yalnız eski domain taşıması gerekçesiyle otomatik olarak detay sayfası önceliği almaz; model portföyü fazında ayrıca ele alınır.

### Güncel portföyde bulunmadığı onaylanan üç eski ürün

- Desenli Beyaz
- Sabah Duruş
- Vakit 38 Günlü

`SAHİBİ ONAYLADI`: Bu üç ürün güncel ürün portföyünde yoktur. Bunlar için yeni satış/detail sayfası açılmayacaktır. Eski URL'lerin eski cihaz desteğine mi, ilgili kategoriye mi yönleneceği yoksa `410` mu döndüreceği destek kararı sırasında belirlenecektir.

## Karar grubu C — Ezanmatik

Yeni sitede Ezanmatik ürün verisi veya hedef sayfa yoktur. Eski alan adında şu içerikler ayrı ayrı yaşamaktadır:

- Ezanmatik kategori sayfası
- EKS 1
- EKS 2
- Anfi Tip Ezanmatik
- Ezanmatik/eks güncelleme sayfaları
- Program ve kılavuzlar

Önce ürün ailesi için aşağıdaki ticari durumdan biri doğrulanmalıdır:

1. Güncel olarak üretiliyor ve satılıyor
2. Satılmıyor, fakat eski müşterilere destek veriliyor
3. Tamamen sona erdi; yalnız güvenli arşiv veya kaldırma gerekir

Bu karar alınmadan Ezanmatik sayfası hazırlanmaz ve eski URL'ler başka bir Vakitmatik ürününe yönlendirilmez.

## Karar grubu D — Eski Ayet/Hadis ürünleri

Eski tekil ürünler konu olarak `/ayet-hadis-panosu/` ile ilişkili olsa da güncel Modül, Mesaj veya Kayan Yazı ile birebir eşleşmeleri kanıtlı değildir:

- MesajVakit LED B
- MesajVakit LED K
- Esmaül Hüsna
- LED Esma
- Mesaj 5 Özel
- MesajVakit 8
- MesajVakit 8 Yatay
- Cami Kayan Yazı

Özellikle `Mesaj 5 Özel → güncel Mesaj` eşleşmesi otomatik yapılamaz: eski ürün beş satır, güncel ürün verisi üç satırdır.

Her eski ürün için `güncel Modül`, `güncel Mesaj`, `güncel Kayan Yazı`, `başka ürün`, `yalnız eski destek` veya `sona erdi` kararı gerekir. Aynı güncel ailede gerçekten birleşen ürünler tek güçlü detay sayfasına yönlendirilebilir.

## Karar grubu E — Destek mimarisi

Eski destek sayfalarını ürünün dış görünüşüne göre kopyalamak yerine güncelleme yöntemine ve cihaz nesline göre ayırmak daha güvenlidir:

1. **Yeni nesil mobil Vakitmatik**
   - Mevcut `/support/`
   - Mobil uygulama ve Bluetooth
2. **Eski USB Vakitmatik**
   - Doğrulanmış USB programı, sürücü ve doğru cihaz kapsamı
3. **Eski RS232 Vakitmatik**
   - Firma tarafından hazırlanan vakit dosyası ve eski yükleme süreci
4. **Ezanmatik desteği**
   - Yalnız Ezanmatik ticari/destek kararı sonrasında
5. **Mesaj/pano eski cihazları**
   - Yalnız kılavuz ve güncel ürün eşleşmesi doğrulandıktan sonra

Mevcut `/destek/vakitmatik-ayarlama/` bu merkezlerden birinin yerine geçmiş sayılmaz.

## Karar grubu F — Program, APK ve kılavuzlar

29 eski indirilebilir varlık salt okunur HEAD isteğiyle kontrol edildi:

- 23 dosya `200`
- 6 dosya/alias `404`
- Erişilen dosyaların tamamı `Last-Modified: 2021-10-02` gösteriyor; bu tarih gerçek sürüm veya güvenlik kanıtı değildir.
- Yeni `.com.tr` reposunda bu dosyaların hiçbiri yoktur.

### Vakitmatik ile ilişkili karar grupları

| Grup | Örnek dosyalar | Gerekli karar |
| --- | --- | --- |
| Yeni nesil mobil | `app-release.apk`, Bluetooth kılavuzu | Güncel üretim sürümü mü; herkese açık mı, müşteriye özel mi? |
| Eski RS232/USB | `ReksanVakit2020Setup.msi`, `VakitYukle.exe`, eski Vakitmatik PDF'leri | Hangi nesille uyumlu; açık indirme mi, iletişim sonrası mı? |
| Mesaj/pano | MesajVakit ve Mesaj5 kılavuzları | Güncel ürün mü, yalnız eski cihaz mı? |
| Ezanmatik | Ezanmatik EXE ve PDF'leri | Ezanmatik durumuna göre arşiv veya kaldırma |
| Eski veri | `81-İl.rar` | Eski cihazlarda hâlâ gerekiyor mu? |

### Vakitmatik'e taşınmayacak Reksan dosyaları

- `Doviz.rar`
- `ReksanNobet.exe`
- `SuperPano.rar`
- `FiyatPanKK.pdf`
- `NobEczKK.pdf`

`P3200.exe` için hangi ürün ailesine ait olduğu ayrıca doğrulanmalıdır.

### Değişmez güvenlik sınırı

EXE, MSI, APK veya RAR dosyası yeni domaine alınmadan önce:

- dosya hash'i
- sürüm ve cihaz uyumluluğu
- mümkünse dijital imza
- zararlı yazılım taraması
- yayınlama şekli

doğrulanmalıdır. Dosya gövdeleri bu pakette indirilmedi veya çalıştırılmadı.

## Search Console açık noktası

Bu pakette Search Console tıklama/gösterim verisine erişilemedi. Dolayısıyla SERP konumları arama talebi veya trafik miktarı gibi yorumlanmadı. OSEO-3 başlamadan önce eski ve yeni domainlerin aynı Search Console hesabında `owner` yetkisiyle doğrulanması gerekir.

## Önerilen onay sırası

OSEO-2 tek seferde çok sayıda ürün varsayımı üretmemek için üç karar kapısına ayrılmalıdır:

1. Güncel Vakitmatik modelleri ve üç eski ürün
2. Ezanmatik ile eski Ayet/Hadis ürünleri
3. Destek mimarisi ve dosyaların açık/kapalı dağıtım şekli

Bu üç kapı onaylanmadan görünür sayfa tasarımı veya OSEO-3 `.htaccess` hazırlığı başlamaz.
