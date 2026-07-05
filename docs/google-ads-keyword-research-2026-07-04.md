# Vakitmatik Google Ads Keyword Research

Analiz tarihi: 2026-07-04

Kaynak: Google Ads API / Keyword Planner

Hedefleme: Turkiye, Turkish, Google Search

Para birimi: TRY

## API Durumu

- OAuth refresh token yenilendi ve `.env` icindeki `GOOGLE_ADS_REFRESH_TOKEN` guncellendi.
- Google Ads API sorgusu basarili dondu.
- Hesap: `vakitmatik mcc`
- Customer ID: `1244410893`
- Time zone: `Europe/Istanbul`

Not: Google Cloud OAuth ekraninda `adwords` scope'u hassas scope olarak gorunebilir ve dogrulama uyarisi gosterebilir. Dahili kullanim icin yeni token ve API erisimi calisiyor; herkese acik OAuth uygulamasi gibi kullanilacaksa Google verification sureci ayrica tamamlanmalidir.

## En Onemli Bulgular

`ramazan imsakiye` ve `imsakiye saati` hacim olarak cok yuksek, fakat sezonluk ve dogrudan Vakitmatik satin alma niyeti tasimayabilir. Ana SEO onceligi bunlar degil; ana odak `cami saati`, `dijital cami saati`, `vakitmatik cami saati`, `cami saati fiyatlari` ve destek niyetli `ayarlama` sorgulari olmali.

## Keyword Oncelik Tablosu

| Sorgu | Ortalama aylik arama | Rekabet | Dusuk ust sayfa bid | Yuksek ust sayfa bid | Yorum |
| --- | ---: | --- | ---: | ---: | --- |
| `cami saati` | 1,300 | LOW | 1.97 | 9.90 | En guclu non-brand ana kategori sorgusu |
| `ezan okuyan saat` | 1,900 | MEDIUM | 1.50 | 4.93 | Hacim yuksek, ama ev tipi/consumer niyeti karisabilir |
| `ezanmatik` | 1,300 | HIGH | 2.80 | 11.23 | Yakin kategori; ticari rekabet yuksek |
| `vakitmatik` | 590 | HIGH | 3.24 | 11.33 | Marka sorgusu; korunmali |
| `ezanmatik fiyatlari` | 480 | MEDIUM | 1.94 | 6.89 | Fiyat niyeti guclu, teklif sayfasina yonlendirilebilir |
| `5 vakit ezan okuyan saat fiyatlari` | 260 | MEDIUM | 1.12 | 3.30 | Fiyat ve urun arastirma niyeti |
| `cami saati modelleri` | 210 | LOW | 0.90 | 4.75 | Kategori/urun vitrin sayfasi icin uygun |
| `dijital cami saati` | 170 | HIGH | 1.77 | 8.73 | Dogrudan urun niyeti, ayri sayfa adayi |
| `vakitmatik cami saati` | 140 | HIGH | 2.33 | 12.17 | Marka + kategori, yuksek degerli |
| `vakitmatik fiyatlari` | 140 | MEDIUM | 1.13 | 4.99 | Teklif/alma niyeti |
| `camii saatleri` | 140 | MEDIUM | 1.73 | 10.58 | Yazim varyasyonu, kategori iceriginde yakalanmali |
| `cami dijital saat fiyatlari` | 110 | LOW | 1.06 | 4.45 | Fiyat sayfasi/bolumu icin iyi long-tail |
| `ezan okuyan saat fiyatlari` | 110 | LOW | N/A | N/A | Fiyat niyeti var, ancak urun uyumu kontrol edilmeli |
| `cami vakit saati` | 90 | HIGH | 1.42 | 7.33 | Dogrudan urun niyeti |
| `cami ezan saati` | 90 | HIGH | 1.75 | 8.31 | Dogrudan urun niyeti |
| `cami saati fiyatlari` | 90 | LOW | 1.31 | 4.18 | Teklif sayfasi/bolumu icin ana long-tail |
| `vakitmatik ayarlama` | 70 | LOW | N/A | N/A | Destek icerigi ve marka guveni |
| `cami saati ayarlama` | 50 | LOW | N/A | N/A | Destek sayfasi icin uygun |
| `cami vakitmatik` | 50 | HIGH | 2.08 | 12.16 | Dogrudan ticari niyet |
| `dijital vakitmatik` | 30 | HIGH | N/A | N/A | Spesifik urun/marka varyasyonu |
| `cami led tabela` | 20 | MEDIUM | N/A | N/A | Tabela/pano kapsami varsa ikincil |
| `namaz vakitleri panosu` | 10 | N/A | N/A | N/A | Dusuk hacim ama cok alakali long-tail |

## Sayfa ve Icerik Plani

1. `/cami-saati/`
   - Hedef: `cami saati`, `cami saati modelleri`, `camii saatleri`, `cami saati fiyatlari`
   - Amaç: Non-brand kategori trafiğini toplamak.
   - Icerik: Cami saatinin ne oldugu, model farklari, kurulum, teklif alma, gorseller, SSS.

2. `/urunler/vakitmatik-cami-saati/`
   - Hedef: `vakitmatik`, `vakitmatik cami saati`, `cami vakitmatik`, `vakitmatik fiyatlari`
   - Amaç: Marka + ticari niyeti tek urun sayfasinda toplamak.
   - Icerik: Urun ozellikleri, model secenekleri, cami kullanimi, teklif cagrisi.

3. `/urunler/dijital-cami-saati/`
   - Hedef: `dijital cami saati`, `cami dijital saat fiyatlari`, `cami vakit saati`, `cami ezan saati`
   - Amaç: Dijital/LED arayan kullaniciyi yakalamak.
   - Icerik: LED/LCD farklari, okunabilirlik, otomatik vakit guncelleme, montaj.

4. `/cami-saati-fiyatlari/`
   - Hedef: `cami saati fiyatlari`, `vakitmatik fiyatlari`, `ezanmatik fiyatlari`
   - Amaç: Fiyat niyetli kullaniciyi kaybetmeden teklif formuna/telefon aksiyonuna tasimak.
   - Icerik: Net fiyat listesi verilmeyecekse fiyatı etkileyen faktorler ve teklif alma akisi.

5. `/destek/vakitmatik-ayarlama/`
   - Hedef: `vakitmatik ayarlama`, `cami saati ayarlama`, `ezanmatik ayarlama`
   - Amaç: Destek aramalarindan marka guveni ve satis sonrasi kalite sinyali uretmek.
   - Icerik: Adim adim ayarlama, sik sorunlar, destek iletisim bilgisi.

## Onceliklendirme

| Oncelik | Is | Gerekce |
| --- | --- | --- |
| P0 | `cami saati` kategori sayfasi | En guclu dogrudan non-brand hacim ve dusuk rekabet |
| P0 | `vakitmatik cami saati` urun sayfasi | Marka + kategori niyeti, yuksek donusum potansiyeli |
| P1 | Fiyat niyeti bolumu/sayfasi | `fiyatlari` sorgulari belirgin; kullanici teklif aksiyonuna yakin |
| P1 | `dijital cami saati` sayfasi | Dogrudan urun niyeti var, rekabet yuksek ama alakali |
| P2 | Ayarlama/destek icerikleri | Satis niyeti daha dusuk, fakat guven ve long-tail katkisi var |
| P2 | `ezanmatik` ve `ezan okuyan saat` icerikleri | Hacim yuksek, fakat niyet karisik; dikkatli konumlandirilmali |
| P3 | `imsakiye` icerikleri | Hacim cok yuksek ama sezonluk ve urun uyumu zayif olabilir |

## Uygulama Notlari

- Mevcut ana sayfa marka ve urun vitrini icin iyi calisiyor, fakat non-brand SEO icin ayri indexlenebilir sayfalar gerekli.
- Urun kartlarindaki anchor'lar tek basina Google'da ayri sayfa gibi calismaz; yeni URL'ler acilmadan `cami saati` ve `dijital cami saati` gibi sorgularda yukselme sinirli kalabilir.
- Price intent icin "fiyat" kelimesinden kacmak yerine, fiyatın modele, olcuye, LED/LCD yapisina, kurulum ve destek kapsamına gore degistigini anlatan teklif odakli sayfa daha guvenli olur.
- Product rich snippet hedeflenmemeli; sitede checkout, stok ve net fiyat yoksa structured data tarafinda Organization/WebSite ve uygun sayfalarda ItemList daha temizdir.
