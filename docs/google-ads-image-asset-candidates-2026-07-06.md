# Google Ads Image Asset Adayları - 2026-07-06

Bu dosyalar Google Ads görsel asset seti için hazırlandı. 2026-07-07 tarihinde Google Ads API ile asset library'ye yüklendi; ancak Search kampanyasına `AD_IMAGE` olarak campaign/ad group seviyesinde bağlama isteği Google Ads API tarafından `UNSUPPORTED_FIELD_TYPE` ile reddedildi. Bu nedenle kampanya bağlantısı Google Ads UI üzerinden manuel yapılmalıdır.

Kullanıcı tercihi doğrultusunda aday ürün aileleri: Vakitmatik Desen Mavi, Vakitmatik Resimli, Vakitmatik Mesaj, Vakitmatik LCD ve Vakitmatik Modül.

## Kare Adaylar

- `public/images/google-ads-candidates/vakitmatik-desen-mavi-square-1200.png`
- `public/images/google-ads-candidates/vakitmatik-resimli-square-1200.png`
- `public/images/google-ads-candidates/vakitmatik-mesaj-square-1200.png`
- `public/images/google-ads-candidates/vakitmatik-lcd-square-1200.png`
- `public/images/google-ads-candidates/vakitmatik-modul-square-1200.png`

## Yatay Adaylar

- `public/images/google-ads-candidates/vakitmatik-desen-mavi-landscape-1200x628.png`
- `public/images/google-ads-candidates/vakitmatik-resimli-landscape-1200x628.png`
- `public/images/google-ads-candidates/vakitmatik-mesaj-landscape-1200x628.png`
- `public/images/google-ads-candidates/vakitmatik-lcd-landscape-1200x628.png`
- `public/images/google-ads-candidates/vakitmatik-modul-landscape-1200x628.png`

## Logo Adayları

- `public/images/google-ads-candidates/vakitmatik-logo-square-1200.png`
- `public/images/google-ads-candidates/vakitmatik-logo-landscape-1200x300.png`

## Notlar

- Tüm adaylar PNG formatında üretildi.
- Kare dosyalar `1200x1200`, yatay dosyalar `1200x628`.
- Logo dosyaları `1200x1200` ve `1200x300`.
- Dosya boyutları Google Ads limitinin altında.
- Görseller ürün deneyimini gösterir; ekstra yazı, logo veya grafik overlay eklenmedi.
- Google Ads API ile 10 ürün görseli, 2 logo ve `Vakitmatik` business name asset olarak oluşturuldu.
- Kampanyaya bağlı asset sayısı API kontrolünde `0` kaldı; ürün görselleri Google Ads UI'dan bağlanmalı.
- Business logo ve business name bağlantısı için Google Ads hesabında advertiser/customer verification gerekiyor.

## Manuel Google Ads UI Adımı

1. Google Ads > Campaigns > Assets ekranına gir.
2. `+ Image` ile image asset ekle.
3. Seviye olarak kampanyayı seç: `Campaign #1`.
4. Asset library'de görünen `Vakitmatik ...` ürün görsellerini seç veya canlı URL'lerden yükle.
5. Logo ve business name için önce advertiser verification tamamlanmalı; doğrulama tamamlanmadan API `CUSTOMER_NOT_VERIFIED` hatası veriyor.
6. Kaydettikten sonra asset status/policy review durumunu kontrol et.
