# Vakitmatik Google Ads Search Kampanya Planı

Plan tarihi: 2026-07-04

Durum: Ölçüm altyapısı production'a geçti. Kampanya yayına alma ve bütçe harcama ayrı onay gerektirir.

## Ön Koşul

- Google tag siteye env kontrollü eklendi.
- Telefon tıklaması `phone_lead`, e-posta tıklaması `email_lead` olarak ölçülecek.
- Google Ads conversion `send_to` değerleri Vercel Production ortamına girildi.
- Google Ads API ile iki website conversion action oluşturuldu: `Vakitmatik Telefon Lead` ve `Vakitmatik E-posta Lead`.
- Conversion tracking ID: `18230385651`; Google Ads tag ID olarak `AW-18230385651` kullanılacak.

## Env Değerleri

```txt
NEXT_PUBLIC_GOOGLE_TAG_ID=AW-18230385651
NEXT_PUBLIC_GOOGLE_ADS_PHONE_SEND_TO=AW-18230385651/e9oUCLLzgsscEPO39vRD
NEXT_PUBLIC_GOOGLE_ADS_EMAIL_SEND_TO=AW-18230385651/uGOcCLXzgsscEPO39vRD
```

Bu değerler Vercel Production env'e girildi ve production deploy alındı. Canlı HTML'de Google tag ve iki `send_to` değeri doğrulandı. 2026-07-05 tarihinde Tag Assistant/debug oturumunda telefon tıklaması `phone_lead` + `conversion`, e-posta tıklaması `email_lead` + `conversion` request'i olarak doğrulandı.

## Conversion Action Detayı

| Action | Google Ads ID | Type | Category | `send_to` |
| --- | ---: | --- | --- | --- |
| Vakitmatik Telefon Lead | `7673526706` | `WEBPAGE` | `CONTACT` | `AW-18230385651/e9oUCLLzgsscEPO39vRD` |
| Vakitmatik E-posta Lead | `7673526709` | `WEBPAGE` | `CONTACT` | `AW-18230385651/uGOcCLXzgsscEPO39vRD` |

## Kampanya Yapısı

| Kampanya | Match type | Landing | Bütçe payı | Amaç |
| --- | --- | --- | ---: | --- |
| Marka | Exact + phrase | `/urunler/vakitmatik-cami-saati/` | %10-15 | Marka aramalarını korumak |
| Ana satış | Exact + phrase | `/cami-saati/` | %45-55 | Non-brand yeni müşteri araması |
| Fiyat/teklif | Exact + phrase | `/cami-saati-fiyatlari/` | %20-25 | Teklife yakın kullanıcı |
| Dijital ürün | Exact + phrase | `/urunler/dijital-cami-saati/` | %10-15 | LED/LCD ürün niyeti |
| Test | Exact + phrase | `/cami-saati/` veya kapalı | %0-10 | `ezanmatik` yakın kategori testi |

İlk 14 gün broad match kullanılmayacak.

## Anahtar Kelimeler

### Marka

- `[vakitmatik]`
- `"vakitmatik"`
- `[vakitmatik fiyatları]`
- `"vakitmatik fiyatları"`
- `[vakitmatik cami saati]`
- `"vakitmatik cami saati"`

### Ana satış

- `[cami saati]`
- `"cami saati"`
- `[cami saati modelleri]`
- `"cami saati modelleri"`
- `[camii saatleri]`
- `"camii saatleri"`
- `[cami vakit saati]`
- `"cami vakit saati"`
- `[cami ezan saati]`
- `"cami ezan saati"`

### Fiyat/teklif

- `[cami saati fiyatları]`
- `"cami saati fiyatları"`
- `[cami dijital saat fiyatları]`
- `"cami dijital saat fiyatları"`
- `[vakitmatik fiyatları]`
- `"vakitmatik fiyatları"`

### Dijital ürün

- `[dijital cami saati]`
- `"dijital cami saati"`
- `[cami dijital saat]`
- `"cami dijital saat"`
- `[dijital vakitmatik]`
- `"dijital vakitmatik"`

### Test

- `[ezanmatik]`
- `"ezanmatik"`
- `[ezan okuyan saat]`
- `"ezan okuyan saat"`
- `[ezanmatik fiyatları]`
- `"ezanmatik fiyatları"`

## Negatif Kelimeler

- `indir`
- `apk`
- `bedava`
- `ücretsiz`
- `kol saati`
- `cep telefonu`
- `telefon saati`
- `ramazan`
- `imsakiye`
- `ayar`
- `ayarlama`
- `tamir`
- `kullanım kılavuzu`

## İlk 14 Gün Kontrol Rutini

1. Günlük search terms raporu kontrol edilecek.
2. Alakasız sorgular negatif kelime listesine eklenecek.
3. Telefon/e-posta conversion eventleri çalışıyor mu kontrol edilecek.
4. Tıklama var ama lead yoksa reklam metni ve landing eşleşmesi gözden geçirilecek.
5. İlk hafta sonunda test kampanyası `ezanmatik` niyeti kötü ise kapatılacak.
