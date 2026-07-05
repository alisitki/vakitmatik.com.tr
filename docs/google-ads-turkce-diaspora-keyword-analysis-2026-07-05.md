# Vakitmatik Türkçe Diaspora Keyword Analizi

Analiz tarihi: 2026-07-05

Kaynak: Google Ads API v22 / Keyword Planner

Dil: Türkçe (`languageConstants/1056`)

Network: Google Search

Kapsam: Türkiye baz pazarı + Almanya öncelikli Türkçe diaspora kontrolü. Ek kontrol ülkeleri: Hollanda, Belçika, Fransa, Avusturya, İsviçre.

Bu raporda Search Console, GA4, gerçek organik tıklama, gerçek sıralama ve manuel SERP pozisyon verisi kullanılmadı. Bu nedenle "bizim organik durumumuz" sadece mevcut site karşılığı ve ölçüm altyapısı üzerinden yorumlanabilir; gerçek gösterim/tıklama/sıralama bu veri setiyle ölçülemiyor.

## Executive Summary

- Türkiye ana talep pazarıdır. `cami saati` ve `ezanmatik` aylık 1.300 arama ile en güçlü hacme sahiptir; `vakitmatik` 590 arama ile marka bilinirliği gösterir.
- Almanya'da Türkçe diaspora hacmi vardır ama düşüktür. `cami saati` ve `vakitmatik` aylık 20 arama, `dijital cami saati`, `cami saati fiyatları`, `ezanmatik` ve ayarlama sorguları aylık 10 arama bandındadır.
- Hollanda, Belçika, Fransa, Avusturya ve İsviçre'de Türkçe sorgular çoğunlukla 10 arama bandındadır. Bu ülkelerde ayrı büyük kampanya yerine küçük bütçeli test veya Almanya kampanyasına düşük bütçeli ek hedefleme daha mantıklıdır.
- Avrupa Türkçe talebi satın alma açısından yok sayılmamalı, fakat Türkiye'deki gibi hacimli SEO/reklam beklentisiyle ele alınmamalıdır. Almanya için başarı metriği çok sayıda tıklama değil, az tıklamadan nitelikli teklif talebi üretmektir.
- Mevcut sitede Türkiye için doğru landing karşılıkları oluşmuş durumda: `/cami-saati/`, `/urunler/vakitmatik-cami-saati/`, `/urunler/dijital-cami-saati/`, `/cami-saati-fiyatlari/`, `/destek/vakitmatik-ayarlama/`.
- Google Ads hesabı şu an ölçüm açısından eksik görünüyor: hesap etkin, ancak conversion tracking durumu `NOT_CONVERSION_TRACKED`; conversion action listesi boş. Telefon/e-posta lead ölçümü kurulmadan hangi kelimelerin satış getirdiği sağlıklı ölçülemez.

## API Sorgu Detayı

Seed kelimeler:

- `cami saati`
- `dijital cami saati`
- `vakitmatik`
- `cami saati fiyatları`
- `ezanmatik`
- `vakitmatik ayarlama`
- `cami saati ayarlama`
- `namaz vakti panosu`

Hedefler:

| Ülke | Geo target | Dil |
| --- | --- | --- |
| Türkiye | `geoTargetConstants/2792` | Türkçe |
| Almanya | `geoTargetConstants/2276` | Türkçe |
| Hollanda | `geoTargetConstants/2528` | Türkçe |
| Belçika | `geoTargetConstants/2056` | Türkçe |
| Fransa | `geoTargetConstants/2250` | Türkçe |
| Avusturya | `geoTargetConstants/2040` | Türkçe |
| İsviçre | `geoTargetConstants/2756` | Türkçe |

Not: Avrupa sonuçlarında çok sayıda kelime 10 arama bandında görünüyor. Keyword Planner düşük hacimli sorgularda veriyi yuvarlar veya minimum bantta gösterir; bu değerler "kesin 10 kişi arıyor" değil, "ölçülebilir ama düşük hacimli niş talep var" şeklinde okunmalıdır.

## Keyword Tabloları

### Türkiye

| Sorgu | Ortalama aylık arama | Rekabet | Düşük üst sayfa bid | Yüksek üst sayfa bid | Niyet |
| --- | ---: | --- | ---: | ---: | --- |
| `cami saati` | 1.300 | LOW | 1,97 TRY | 9,90 TRY | Ana kategori / satış |
| `ezanmatik` | 1.300 | HIGH | 2,80 TRY | 11,23 TRY | Yakın kategori / satış, niyet karışabilir |
| `vakitmatik` | 590 | HIGH | 3,24 TRY | 11,33 TRY | Marka |
| `dijital cami saati` | 170 | HIGH | 1,77 TRY | 8,73 TRY | Ürün araştırması |
| `cami saati fiyatları` | 90 | LOW | 1,31 TRY | 4,18 TRY | Fiyat / teklif |
| `vakitmatik ayarlama` | 70 | LOW | N/A | N/A | Destek |
| `cami saati ayarlama` | 50 | LOW | N/A | N/A | Destek |
| `ezan saati cami` | 10 | LOW | N/A | N/A | Long-tail |
| `odesan ezan saati ayarlama` | 10 | LOW | N/A | N/A | Rakip/destek niyeti |

Türkiye sonucu, 2026-07-04 tarihli önceki Keyword Planner raporuyla ana sorgularda uyumlu. Büyük sapma yok. `namaz vakti panosu` tekil formuyla 0 görünüyor; önceki rapordaki `namaz vakitleri panosu` varyasyonu 10 arama bandındaydı. Bu nedenle bu niyet tamamen yok sayılmamalı, ancak ana öncelik olmamalıdır.

### Almanya

| Sorgu | Ortalama aylık arama | Rekabet | Düşük üst sayfa bid | Yüksek üst sayfa bid | Niyet |
| --- | ---: | --- | ---: | ---: | --- |
| `cami saati` | 20 | HIGH | N/A | N/A | Ana diaspora kategori |
| `vakitmatik` | 20 | LOW | N/A | N/A | Marka |
| `dijital cami saati` | 10 | MEDIUM | N/A | N/A | Ürün araştırması |
| `cami saati fiyatları` | 10 | N/A | N/A | N/A | Fiyat / teklif |
| `ezanmatik` | 10 | LOW | N/A | N/A | Yakın kategori |
| `vakitmatik ayarlama` | 10 | N/A | N/A | N/A | Destek |
| `cami saati ayarlama` | 10 | N/A | N/A | N/A | Destek |
| `ezan saati cami` | 10 | HIGH | N/A | N/A | Long-tail |
| `odesan ezan saati ayarlama` | 10 | LOW | N/A | N/A | Rakip/destek niyeti |

Almanya için Türkçe arama hacmi düşük ama tamamen boş değil. `cami saati` ve `vakitmatik` 20 bandında olduğu için bu pazar tek başına yüksek hacimli SEO yatırımı değil, nitelikli lead hedefleyen test pazarı gibi ele alınmalı.

### Avrupa Türkçe Diaspora Kontrolü

| Ülke | `cami saati` | `vakitmatik` | `dijital cami saati` | `cami saati fiyatları` | `ezanmatik` | Destek/ayarlama sinyali |
| --- | ---: | ---: | ---: | ---: | ---: | --- |
| Hollanda | 10 | 10 | 0 | 0 | 10 | `vakitmatik ayarlama` 10 |
| Belçika | 10 | 10 | 10 | 10 | 10 | Net pozitif destek sorgusu yok |
| Fransa | 10 | 10 | 10 | 10 | 10 | `cami saati ayarlama` 10, `vakitmatik ayarlama` 10 |
| Avusturya | 10 | 10 | 0 | 10 | 10 | `cami saati ayarlama` 10, `vakitmatik ayarlama` 10 |
| İsviçre | 10 | 10 | 0 | 0 | 10 | `cami saati ayarlama` 10, `vakitmatik ayarlama` 10 |

Bu tablo Avrupa için "talep yok" değil, "talep çok niş ve ülke bazında parçalı" sonucunu verir. Ayrı ülke landing sayfaları veya büyük reklam bütçeleri ilk aşamada verimli görünmüyor. Almanya öncelikli küçük test; diğer ülkeler için düşük bütçeli ek hedefleme daha doğru.

## Niyet Kümeleri

### `cami saati`

En güçlü doğrudan ürün niyeti Türkiye'de. Almanya'da 20, diğer Avrupa ülkelerinde 10 bandı var. Sitedeki `/cami-saati/` sayfası bu niyeti karşılayan doğru ana landing sayfasıdır.

Öneri:

- Türkiye'de SEO ana öncelik olmaya devam etmeli.
- Almanya'da reklam testi yapılırsa ilk exact/phrase kelime `cami saati` olmalı.
- Avrupa landing kopyasında "Türkiye'den Avrupa'ya cami saati / namaz vakti panosu çözümü" gibi ihracat ve teklif vurgusu kullanılmalı; mevcut rapor kapsamında yeni sayfa yapılmadı.

### `dijital cami saati`

Türkiye'de 170 arama ve yüksek rekabet var. Almanya, Belçika ve Fransa'da 10 bandında; Hollanda, Avusturya ve İsviçre'de bu seed için pozitif hacim görünmedi.

Öneri:

- `/urunler/dijital-cami-saati/` Türkiye için anlamlıdır.
- Almanya'da `dijital cami saati` tek başına büyük hacim üretmez; `cami saati` grubunun içinde test edilmelidir.
- LED/LCD farkı, görünürlük, büyük cami kullanımı ve teklif alma mesajı korunmalıdır.

### `vakitmatik`

Türkiye'de 590 arama ile marka talebi güçlü. Almanya'da 20, diğer Avrupa ülkelerinde 10 bandında marka araması var.

Öneri:

- Marka aramaları mutlaka korunmalı.
- Almanya'da küçük exact/phrase marka kampanyası, düşük bütçeyle bile rakip veya pazar yeri sonuçlarına kaymayı azaltabilir.
- `/urunler/vakitmatik-cami-saati/` marka + ürün niyeti için doğru karşılık.

### `cami saati fiyatları`

Türkiye'de 90 arama ile teklif niyeti net. Almanya, Belçika, Fransa ve Avusturya'da 10 bandında; Hollanda ve İsviçre'de bu seed pozitif görünmedi.

Öneri:

- `/cami-saati-fiyatlari/` sayfası Türkiye için kritik.
- Avrupa kullanıcıları için fiyatı doğrudan listelemek yerine ölçü, model, sevkiyat, kurulum/destek ve teklif süreci anlatılmalı.
- Reklamda "fiyat" kelimesi kullanılacaksa landing sayfasında gerçekten teklif alma aksiyonu görünür olmalı.

### `ezanmatik`

Türkiye'de 1.300 arama ve yüksek rekabet var. Avrupa Türkçe ülkelerinde çoğunlukla 10 bandında. Bu kelime hacimli ama niyet karışık olabilir: ev tipi ezan okuyan saat, küçük elektronik cihaz, cami panosu veya rakip kategori anlamına gelebilir.

Öneri:

- Türkiye'de test edilebilir ama ana bütçenin tamamı bu kelimeye verilmemeli.
- Avrupa'da yalnız exact/phrase ve düşük bütçeyle denenmeli.
- Negatif kelimelerle ev tipi, oyuncak/kol saati, ücretsiz, indir, apk, tamir gibi düşük kalite niyetler ayıklanmalı.

### Ayarlama / Destek

Türkiye'de `vakitmatik ayarlama` 70, `cami saati ayarlama` 50. Almanya ve birkaç Avrupa ülkesinde 10 bandında destek sinyali var.

Öneri:

- `/destek/vakitmatik-ayarlama/` sayfası doğru yönde.
- Bu sorgular satıştan çok satış sonrası güven ve marka güvenilirliği üretir.
- Reklam kampanyasında ilk aşamada destek sorguları negatiflenebilir; organikte ise tutulmalı.

## Mevcut Durum

### Site ve landing karşılığı

| Niyet | Mevcut karşılık | Durum |
| --- | --- | --- |
| `cami saati` | `/cami-saati/` | Uygun ana kategori landing'i var |
| `vakitmatik`, `vakitmatik cami saati` | `/urunler/vakitmatik-cami-saati/` | Uygun marka + ürün landing'i var |
| `dijital cami saati` | `/urunler/dijital-cami-saati/` | Uygun ürün landing'i var |
| `cami saati fiyatları` | `/cami-saati-fiyatlari/` | Uygun teklif/fiyat landing'i var |
| `vakitmatik ayarlama`, `cami saati ayarlama` | `/destek/vakitmatik-ayarlama/` | Uygun destek landing'i var |
| Ana ürün vitrini | `/` | Ürün aileleri, görseller, mobil uygulama ve iletişim için uygun |

Sitemap içinde bu URL'ler yer alıyor. Bu iyi bir başlangıçtır; asıl eksik gerçek performans ölçümü ve Avrupa'ya özel lead/fiyat/lojistik mesajının ayrı takip edilebilir hale getirilmesidir.

### Google Ads ve ölçüm durumu

API üzerinden okunan hesap durumu:

- Hesap: `vakitmatik mcc`
- Customer ID: `1244410893`
- Para birimi: TRY
- Time zone: Europe/Istanbul
- Hesap status: ENABLED
- Conversion tracking status: `NOT_CONVERSION_TRACKED`
- Conversion action listesi: boş
- `customer_client` listesinde yalnız yönetici hesap görünüyor; aktif alt müşteri hesabı bu okuma içinde görünmedi.

Sonuç: Keyword Planner okuması yapılabiliyor, ancak reklam performansı, conversion, lead başı maliyet veya satış getiren sorgu analizi bu hesap durumuyla ölçülemiyor. Önce telefon ve e-posta lead conversion action'ları kurulmalı; aksi halde "hangi kelime satış getiriyor?" sorusu API verisiyle cevaplanamaz.

## Almanya ve Türkçe Diaspora Değerlendirmesi

Almanya Türkçe arama hacmi şu an sınırlı:

- `cami saati`: 20
- `vakitmatik`: 20
- `dijital cami saati`: 10
- `cami saati fiyatları`: 10
- `ezanmatik`: 10
- destek/ayarlama sorguları: 10 bandı

Bu tablo Almanya'da talep olmadığını değil, Türkçe arama davranışının dar olduğunu gösterir. Satış açısından daha doğru yaklaşım:

1. Almanya'yı ayrı büyük SEO projesi değil, küçük ve ölçümlü test pazarı olarak ele almak.
2. İlk testte yalnız yüksek niyetli kelimeleri kullanmak: `cami saati`, `vakitmatik`, `dijital cami saati`, `cami saati fiyatları`.
3. Lead kalitesini telefon/e-posta conversion ile ölçmeden bütçe büyütmemek.
4. Landing mesajında Avrupa'ya satış, teklif, sevkiyat ve kurulum/destek netliği vermek.

Diğer Avrupa ülkeleri için sonuçlar daha parçalı. Hollanda, Belçika, Fransa, Avusturya ve İsviçre'de tek başına kampanya açmak yerine Almanya testinden sonra düşük bütçeli genişleme daha doğru olur.

## İyileştirme Önerileri

### P0 - Ölçüm

- Google Ads içinde telefon tıklaması ve e-posta tıklaması için conversion action oluştur.
- Env tarafında `NEXT_PUBLIC_GOOGLE_ADS_PHONE_SEND_TO` ve `NEXT_PUBLIC_GOOGLE_ADS_EMAIL_SEND_TO` değerlerini doldur.
- İlk 14 gün search terms + conversion raporu olmadan bütçe artırma.

### P0 - Türkiye SEO ve Ads

- Ana SEO odağı: `cami saati`, `vakitmatik`, `dijital cami saati`, `cami saati fiyatları`.
- Türkiye reklam testinde exact + phrase ile başla; broad match ilk aşamada kullanılmamalı.
- `ezanmatik` hacimli ama niyeti karışık olduğu için ayrı test grubunda ve sınırlı bütçeyle denenmeli.

### P1 - Almanya Türkçe Test

- Almanya için küçük bütçeli, exact/phrase test kampanyası açılabilir.
- Başlangıç kelimeleri: `[cami saati]`, `"cami saati"`, `[vakitmatik]`, `"vakitmatik"`, `[dijital cami saati]`, `[cami saati fiyatları]`.
- Başarı metriği tıklama sayısı değil, nitelikli telefon/e-posta lead olmalı.
- Landing tarafında Avrupa'ya teklif ve sevkiyat mesajı eksikse testten önce bu mesaj eklenmeli.

### P1 - Negatif Kelime Kontrolü

İlk kampanya negatifleri:

- `indir`
- `apk`
- `bedava`
- `ücretsiz`
- `kol saati`
- `cep telefonu`
- `telefon saati`
- `ramazan`
- `imsakiye`
- `tamir`
- `kullanım kılavuzu`
- `manuel`

Destek kampanyası açılmayacaksa `ayar` ve `ayarlama` reklam tarafında negatiflenebilir. Organik SEO tarafında negatiflenmemeli; destek sayfası güven sinyali sağlar.

### P2 - Avrupa İçerik Stratejisi

- Almanya Türkçe landing varyasyonu ileride değerlendirilebilir; ilk rapor verisine göre hemen çok sayfalı Avrupa SEO mimarisi kurmak öncelikli değil.
- Avrupa için içerik mesajı ürün hacminden çok güven ve lojistik üzerine kurulmalı: teklif alma, ölçü/model seçimi, Avrupa'ya gönderim, destek kanalı.
- Türkçe diaspora hacmi düşük kaldığı için Almanca/İngilizce/Arapça pazar çalışması ayrı bir rapor olarak ele alınmalı; bu raporun kapsamı dışında bırakıldı.

## Sonuç

Türkiye'de doğrudan ve ölçülebilir talep güçlüdür. Öncelikli ticari kelimeler `cami saati`, `vakitmatik`, `dijital cami saati`, `cami saati fiyatları` ve dikkatli test edilmek üzere `ezanmatik` grubudur.

Almanya ve Avrupa Türkçe diaspora tarafında talep var fakat niş ve düşük hacimli. Bu nedenle Avrupa için doğru aksiyon büyük SEO yatırımı veya geniş kampanya değil; Almanya merkezli, düşük bütçeli, exact/phrase, conversion ölçümlü bir testtir. Ölçüm kurulmadan reklam performansı veya satış getiren sorgu analizi yapılamaz.
