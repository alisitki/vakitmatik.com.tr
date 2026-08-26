# Vakitmatik — ChatGPT Proje Bağlamı ve Devir Teslim Dosyası

> Bu belge, kod deposuna erişimi olmayan ChatGPT ile sesli veya yazılı çalışırken kullanılacak tek dosyalık güncel proje bağlamıdır. Bir çalışma emri, production yayını veya Google Ads değişikliği izni değildir.

| Alan | Güncel durum |
| --- | --- |
| Hazırlanma tarihi | 26 Ağustos 2026 — Europe/Istanbul |
| Çalışma dalı | `main` |
| P0 kaynak başlangıcı | `108cb91ad739f33d1bdd573c4e49359c1bf693af` — `fix(seo): consolidate cami saati canonical` |
| P0 teknik baseline | `691b6cb`–`4228d18` arası ayrım ve kapanış commitleri; sonuç onayı bu belgenin son commitindedir |
| Remote durumu | `main` ve `origin/main` fiyat akışı production commitinde eşittir: `ecc568a` |
| `main` ve ilk güvenlik etiketi | `4b760fa`; `backup/pre-google-landing-20260717` aynı noktada |
| Canlı alan adı | `https://www.vakitmatik.com.tr` |
| Canlı Vercel deployment | `dpl_AJfjrYfLK5uWTiuE61MFf68SGKEW` — 26 Ağustos 2026 12:28 TRT |
| Son doğrulanmış rollback deployment | `dpl_CBnGJ9HKGmaEcWf5qBQjZvAWeciU` — 25 Ağustos 2026 09:12 TRT |
| Canlı deployment kaynak işareti | Git SHA `ecc568a`; temiz GitHub `main` deployment'ı, `gitDirty` işareti yok |
| Son yerel/doğrudan edge doğrulama | 17 Ağustos P0.5 canlı kesimi: redirect testleri `25/25`; `.org` apex/www/mail ve `.net` apex/www geçerli TLS + SSO'suz `301`; sekiz hedef `200` |
| Son Google Ads denetimi | 17 Ağustos 2026; conversion hedef hesabı ve metrikler salt okunur doğrulandı |
| P0 ayrıntılı kayıt | `docs/vakitmatik/p0-baseline-2026-08-17.md` |
| P0.5 ayrıntılı kayıt | `docs/vakitmatik/p0-5-org-vercel-migration-2026-08-17.md` |
| Bu dosyanın niteliği | Mantıksal commit zincirini, doğrulanmış canlı durumu ve açık blokajları birlikte ayırarak anlatır |

Gizlilik notu: Bu dosyada parola, API anahtarı, OAuth tokenı, sertifika, `.env` değeri, Google Ads müşteri kimliği veya başka bir secret yoktur. Ortam değişkenlerinin yalnız adları belirtilir. Google Ads ham snapshot dosyaları ve hesap kimlikleri bu belgeye alınmaz.

## 30 saniyelik yönetici özeti

- `[KANITLANDI]` Ana sayfa ve üç niyet sayfası canlıdır: `/cami-saati/`, `/cami-saati-fiyatlari/`, `/ayet-hadis-panosu/`.
- `[KANITLANDI]` Ana sayfanın premium ürün vitrini korunmuştur. Reklam landing'leri ayrı sayfalardır; ana sayfanın yerine geçmez.
- `[KANITLANDI]` Telefon ve WhatsApp tıklama dönüşümleri canlı kodda vardır. Google Ads son dört haftada 3 dönüşüm kaydetmiştir; üçünün de kanalı telefondur, WhatsApp dönüşümü 0'dır. Bunlar sipariş değil iletişim tıklaması sinyalidir.
- `[KANITLANDI]` Google Ads'teki etkin reklamların tamamı hâlâ ana sayfaya gider. Landing final URL geçişi yapılmamıştır. Mevcut reklam askıya alınmamıştır.
- `[KANITLANDI]` 10 bağımsız model detay sayfası canlıda `200` döner. Fiyat landing'indeki ürün kartları ilgili detay sayfasına gider ve WhatsApp mesajına aynı ürün URL'sini ekler. Sayfalar henüz sitemap'e alınmamıştır; ana sayfa/organik bağlama P2 kapsamındadır.
- `[KANITLANDI]` Mobil uygulama bölümündeki App Store ve Google Play kartları doğru mağaza adresleriyle canlıdır.
- `[KANITLANDI / YAYILIM]` Eski güçlü `vakitmatik.org` için Vercel redirect katmanı canlı kesime alındı. SH sahibi paneli, RDAP ve TLD parent delegasyonu yalnız Vercel nameserver'larını gösterir. Eski `14400` saniyelik cache nedeniyle SH sitesi yaklaşık dört saat daha görülebilir.
- `[KANITLANDI / YAYILIM]` `vakitmatik.net` sahibi tarafından P0.5 canlı kapsamına eklendi. TLD delegasyonu Vercel'e geçti; apex/www sertifikası ve yönlendirmesi hazırdır. Eski zonesuz SH delegasyonundan kalan `SERVFAIL` cache'i bazı resolverlarda 48 saate kadar sürebilir.
- `[KANITLANDI]` P0, karışık çalışma ağacını canlı eşdeğer, yalnız yerel ürün detail, dashboard/Ads aracı ve dokümantasyon commitlerine ayırmıştır. Production ve dış sistemler değişmemiştir.
- `[KANITLANDI]` 26 Ağustos production deployment'ı temiz `main` commit'i `ecc568a` ile üretildi; önceki `gitDirty: 1` kaynak belirsizliği kapandı. Geri dönüş noktası `dpl_CBnGJ9HKGmaEcWf5qBQjZvAWeciU` olarak kaydedildi.
- `[KANITLANDI]` `/cami-saati-fiyatlari/` genel fiyat sorusu yerine 10 model ve toplam 15 model/ölçü bazlı WhatsApp bağlantısı kullanır; ürünler bölümü siyah arka planlıdır, görseller kırpılmadan gösterilir ve ürün detaylarında modele özel Open Graph görseli vardır. Google Ads değişmedi.
- `[KANITLANDI / AÇIK SORU]` Telefon ve WhatsApp `send_to` hedefleri doğru Ads hesabındaki etkin conversion action'larla eşleşir. Temel tag farklı önek taşır; split-routing ve WhatsApp'ın 0 olma nedeni gerçek cihaz testi olmadan açık kalır.
- `[KANITLANDI BLOKAJ]` GSC credential kayıtları yerelde ve production'da boştur; güncel GSC snapshot'ı alınamamıştır.
- `[SAHİBİ ONAYLADI]` P1'den önce P0.5 canlı yayını `.net` dahil onaylandı ve uygulandı: registrar kayıtları SH'de kalır, `.org`/`.net` web-DNS Vercel'e geçer, `.org` mail taşınmaz. SH hosting iptali en az yedi günlük gözlem ve tam yedek/bağımlılık denetiminden sonraki ayrı kapıdır.

## Bilginin nasıl okunacağı

Bu belgede dört durum kullanılır:

- `[SAHİBİ ONAYLADI]`: Proje sahibi açıkça doğruladı; ticari kararlarda kullanılabilir.
- `[KANITLANDI]`: Kod, canlı sistem, test, resmî kaynak veya API verisi doğruladı.
- `[HİPOTEZ]`: Test edilmeye değer görüştür; onaysız olarak yayına veya reklama taşınamaz.
- `[AÇIK SORU]`: Yanıt alınmadan ilgili kamuya açık karar uygulanamaz.

Çelişkide öncelik sırası şöyledir:

1. Proje sahibinin en yeni açık beyanı
2. Güncel canlı kontrol, API verisi veya resmî kaynak
3. Mevcut çalışma ağacındaki kod
4. Tarihli roadmap, karar kaydı ve eski analiz belgeleri

`docs/vakitmatik/roadmap.md` ve `decision-log.md` P0.5 hazırlığıyla 17 Ağustos'ta güncellenmiştir. `project-charter.md` içindeki tarihli durum satırı tarihsel taslak aşamasını gösterir; marka, ürün ve onay sınırları geçerlidir.

## 1. Projenin amacı ve kullanım senaryosu

Vakitmatik sistemi iki bağımsız fakat ilişkili Next.js uygulaması ve bir config-only yönlendirme katmanından oluşur:

1. Kamuya açık satış ve ürün sitesi: cami saatlerini ve pano ürünlerini güçlü görsellerle tanıtır; organik arama, Google Ads landing deneyimi ve WhatsApp/telefon iletişimini destekler.
2. Özel operasyon dashboard'u: Google Ads, Google Search Console ve Vercel Analytics verilerini salt okunur biçimde bir araya getirir; günlük rapor üretebilir.
3. `apps/org-redirect`: `vakitmatik.org` ve `vakitmatik.net` trafiğini URL gruplarıyla canonical `.com.tr` hedeflerine taşıyan bağımsız canlı Vercel projesi; `.org` apex/www/mail ve `.net` apex/www bağlıdır.

`[SAHİBİ ONAYLADI]` Kuzey yıldızı gerçek sipariştir. Gösterim, tıklama, CTR, CPC, optimizasyon skoru, Quality Score, landing deneyimi, telefon ve WhatsApp tıklaması ara teşhis sinyalleridir; iş sonucu değildir.

Satış akışı e-ticaret değildir:

- Sepet, online ödeme ve web sipariş formu yoktur.
- Müşteri ürünleri inceler, WhatsApp veya telefonla iletişime geçer.
- E-posta satış açısından önemsizdir.
- Sayısal fiyat listesi yayımlanmaması bilinçli ticari tercihtir.
- `[SAHİBİ ONAYLADI]` Proje sahibi manuel “sipariş geldi” kaydıyla uğraşmak istemez. Şimdilik telefon ve WhatsApp tıklamalarının conversion sinyali olarak kullanılması kabul edilmiştir.

Ana hedef, Google'a ve müşteriye farklı gerçeklik göstermek değildir. Aynı doğru ürün anlatımı, arama niyetine göre ayrılmış faydalı sayfalarda kısa, görünür ve premium biçimde sunulur.

Bu repo cihaz firmware'ini veya mobil uygulama kaynak kodunu içermez. Mobil uygulama burada ürün özelliği, destek metni, mağaza bağlantısı, video ve görsel olarak temsil edilir.

## 2. Ürün ve iş kuralları

### 2.1 Marka konumu

- `[SAHİBİ ONAYLADI]` Firma 1996'dan beri faaliyet gösterir.
- `[SAHİBİ ONAYLADI]` Vakitmatik al-satçı değil; elektronik, yazılım ve özel ürün geliştirebilen üreticidir.
- İç marka metaforu “bu işin Ferrari'si ve öncüsü”dür.
- Bu metafor dışarıya kanıtsız “en iyi”, “Türkiye'de tek”, “dünyada ilk” veya rakibe saldırı olarak yazılmaz. Fark; ürün, kolay kullanım, gerçek görsel ve mühendislik kabiliyetiyle hissettirilir.
- Rakip isimleri üzerinden üstünlük anlatılmaz.

### 2.2 Doğrulanmış ürün yaklaşımı

- Yeni nesil Vakitmatik ürünlerinde mobil uygulama temel üstünlüktür.
- Diyanet'in güncel namaz vakitleri telefondan cihaza aktarılabilir.
- Uygulamanın mağaza veya gerektiğinde APK üzerinden dağıtılması, müşteriyi yoran ana satış mesajı yapılmaz.
- Eski cihazlarda RS232/USB tabanlı süreçler bulunabilir; bunlar yeni ürün satış sayfasında öne çıkarılmaz, ayrı destek bağlamında ele alınır.
- Yerli üretim, 3 yıl garanti, mobil güncelleme, Diyanet verileri ve Türkiye geneline kargo mevcut kamuya açık iddialardır.
- Duracell kullanılan zaman yedekleme devresi kamuya açık içerikte kullanılmıştır; model bazında özellik kopyalanmadan önce yine doğrulanmalıdır.
- Kalibrasyon, zaman sapması testi, teslimat öncesi sapma kontrolü veya “en düşük PPM” iddiası kullanılmaz; proje sahibi bunların yapılmadığını açıkça belirtmiştir.

Merkezi güncel katalog 10 model içerir:

1. Desen Mavi
2. Desen Siyah
3. Dikey
4. Yatay
5. Mesaj
6. Kayan Yazı
7. Resimli
8. LED
9. Modül
10. LCD

`[SAHİBİ ONAYLADI]` Güncel portföyde bulunmayan eski modeller:

- Desenli Beyaz
- Sabah Duruş
- Vakit 38 Günlü

### 2.3 Eski–yeni model eşleşmeleri

`[SAHİBİ ONAYLADI]` Eski organik URL'ler için doğrulanan aile karşılıkları:

| Eski aile | Güncel aile |
| --- | --- |
| Desenli Mavi | Desen Mavi |
| Desenli Siyah | Desen Siyah |
| Vakit 57 ve Vakit 38 | Dikey |
| Vakit 57 Yatay ve Vakit 38 Yatay | Yatay |
| Vakit 57 Resimli | Resimli |
| Vakit 57 Mesajlı | Kayan Yazı |
| Vakit 38 Mesajlı | Mesaj |
| Vakit 100 | LED |

Güncel Dikey küçük boy ölçüsü zaman içinde `38 × 58` cm'den `40 × 60` cm'ye değişmiştir. Modül ve LCD güncel ürünlerdir; doğrulanmış eski URL karşılıkları yoktur.

### 2.4 Fiyat ve sipariş kuralı

- Standart ürünlerin bilinen fiyatları vardır; sitede sayısal fiyat listesi yayımlanmaz.
- `cami saati fiyatları` arama niyeti yok sayılmaz.
- Onaylı temel ifade: “Cami saati fiyatları modele ve ölçüye göre değişmektedir.”
- Kullanıcı gerçek modelleri ve ölçüleri görür; güncel fiyatı WhatsApp veya telefonla öğrenir.
- “Neden fiyat yazmıyoruz?”, resmî teklif bürokrasisi, sahte model seçme danışmanlığı veya sunulmayan hizmet anlatılmaz.
- Özel ölçü/özellik ve ileri mühendislik talepleri mümkündür; sayfa bütün olasılıkları sayarak müşteriyi boğmaz.

### 2.5 Müşteri ve pazar

- İmam, cami dernek yöneticisi, müftülük, hayırsever ve yurt dışındaki Türk camileri dahil hepsi potansiyel müşteridir; yapay persona önceliği kurulmaz.
- Türkiye ana pazardır.
- Almanya başta olmak üzere Avrupa gerçek ikincil pazardır; İsviçre'ye geçmiş satış olduğu sahibi tarafından belirtilmiştir.
- `[AÇIK SORU]` Doğrudan DHL/FedEx sevkiyatı, gümrük, maliyet, süre ve garanti operasyonu net değildir. Doğrulanmadan sitede vaat edilemez.

### 2.6 Metin ve tasarım standardı

- Ürün görseli satın alma kararının merkezindedir.
- Kısa anlatım tercih edilir; kısa olmak adına metin anlamsızlaştırılmaz.
- Müşteriye “karta tıklayın”, “ana sayfaya gidin”, “bu SEO sayfasıdır” gibi arayüz veya SEO açıklaması yapılmaz.
- Ana sayfa premium ürün deneyimidir; pazar yeri, sepet veya fiyat etiketi kalabalığına çevrilmez.
- Landing sayfası ana sayfaya ve ürünlere doğal bağlantı verebilir; yalnız trafik aktaran doorway/bridge sayfa olamaz.
- Gizli metin, ekran dışına taşıma, arka plan rengiyle saklama, `opacity: 0` ve keyword stuffing kullanılmaz.
- PPM, RTC, COM port ve sürücü gibi terimler ana satış mesajında kullanılmaz; önce müşteri sonucu anlatılır.
- WhatsApp CTA'ları gereksiz tekrar edilmez.
- `camii saati` gerçek arama varyasyonudur; görünür Türkçe yapay biçimde bozulmaz ve kopya `/camii.../` sayfası açılmaz.

## 3. Kullanılan teknolojiler ve önemli bağımlılıklar

Repo npm workspace değildir; iki uygulamanın ayrı `package.json` ve lockfile'ı vardır.

| Katman | Kamu sitesi | Dashboard |
| --- | --- | --- |
| Framework | Next.js App Router `16.2.6` | Next.js App Router `16.2.10` |
| UI runtime | React/React DOM `19.2.3` | React/React DOM `19.2.7` |
| Dil | TypeScript 5, strict | TypeScript 5, strict |
| Stil | Tailwind CSS 4 altyapısı; ağırlık özel global CSS ve CSS Module | Tailwind CSS 4 altyapısı; özel global CSS |
| Rendering | Tam statik export | Dinamik Server Components, route handler, server action ve cron |
| Analytics | Vercel Analytics, Speed Insights, doğrudan `gtag.js` | Vercel Observability REST okuması |
| Paket yöneticisi | npm | npm, ayrı kurulum |

Önemli yokluklar:

- Veritabanı ve ORM yoktur.
- CMS yoktur; içerik TypeScript veri dosyalarındadır.
- Google Ads/Search Console/Vercel/Resend SDK'sı yoktur; dashboard REST `fetch` kullanır.
- Redux/Zustand benzeri genel state yönetimi yoktur.
- Unit, e2e veya görsel regresyon test framework'ü yoktur.
- GitHub Actions/CI workflow'u yoktur.

## 4. Genel sistem mimarisi

### 4.1 Kamu sitesi

- Kaynak `src/` ve `public/` altındadır.
- `next.config.ts`: `output: "export"`, `trailingSlash: true`, `images.unoptimized: true`.
- `next build`, statik çıktıyı `out/` klasörüne üretir.
- Çalışma zamanında CMS/veritabanı isteği yoktur.
- Ana sayfa ürün içeriği `src/data/landing.ts` içindeki tek veri kaynağından üretilir.
- Üç reklam/organik niyet landing'i ortak `AdLandingShell` ve `LandingConfig` yaklaşımını kullanır.
- Ürün rayındaki tüm kartlar ilk HTML'dedir; kaydırma davranışı küçük istemci bileşenidir.
- Route seviyesinde metadata, canonical, Open Graph/Twitter ve JSON-LD üretilir.
- `src/app/sitemap.ts` build sırasında 8 canonical URL ve ilgili görselleri üretir.

### 4.2 Dashboard

- `apps/dashboard/` ayrı Next.js/Vercel projesidir.
- Tek kullanıcı oturumu ister.
- Google Ads, Search Console ve Vercel verilerini yalnız sunucu tarafında çeker.
- Ana ekran KPI; alt ekranlar Ads, SEO ve günlük rapor ayrıntıları gösterir.
- Next cache ve cache tag kullanır.
- Günlük Vercel cron rapor üretir; Resend ayarlıysa e-posta yollar.
- UI salt okunurdur. Repo kökündeki bütçe scripti dashboard kapsamından ayrı ve mutasyon yapabilen bir araçtır.

### 4.3 Sınırlar

- Kamu sitesi açık satış yüzüdür; dashboard özel operasyon yüzüdür.
- İki uygulama doğrudan kod paketi paylaşmaz.
- Kamu sitesi public/build-time env ile; dashboard server-only secret env ile çalışır.
- Kamu sitesi statik olduğundan API route, Server Action veya veritabanı eklemek mimari değişikliktir ve ayrı onay gerektirir.

## 5. Klasör ve dosya yapısı

```text
/
├── AGENTS.md                         # Bütün ajanlar için zorunlu çalışma kuralları
├── CHATGPT_CONTEXT.md                # Bu taşınabilir bağlam/devir teslim dosyası
├── package.json / package-lock.json  # Kamu sitesi
├── next.config.ts                    # Statik export ayarı
├── vercel.json                       # Redirect ve Vercel ayarı
├── src/
│   ├── app/                          # Kamu sitesi route'ları
│   │   └── cami-saati/[slug]/        # Yerel, henüz canlı olmayan 10 ürün sayfası
│   ├── components/
│   │   ├── ad-landing/               # Ortak landing sistemi
│   │   └── sections/                 # Ana ürün vitrini / detay görünümü
│   ├── config/seo.ts                 # Canonical host ve metadata yardımcıları
│   ├── data/                         # Ürün, landing ve legacy SEO içerikleri
│   └── types/                        # İçerik sözleşmeleri
├── public/
│   ├── images/                       # Ürün, landing, SEO ve Ads görselleri
│   ├── videos/                       # Mobil uygulama videosu
│   └── robots.txt
├── apps/dashboard/
│   ├── src/app/                      # Dashboard sayfaları, login ve cron route'u
│   ├── src/components/               # Dashboard UI
│   ├── src/lib/                      # Auth, Ads, GSC, Vercel, rapor ve e-posta
│   ├── scripts/hash-password.mjs
│   ├── .env.example
│   └── vercel.json
├── scripts/
│   ├── next-node.sh
│   ├── export-google-ads-snapshot.mjs
│   ├── analyze-google-ads-friday.mjs
│   └── set-google-ads-budget.mjs
└── docs/
    ├── project-system/               # Kontrollü iş akışı
    ├── vakitmatik/                   # Anayasa, roadmap, karar ve SEO taşıma kayıtları
    └── google-ads-*.md / seo-audit.md
```

### 5.1 Canlı kamu route'ları

| Route | Görev | 17 Ağustos canlı durumu |
| --- | --- | --- |
| `/` | Marka ve premium ürün vitrini | 200, indexlenebilir |
| `/cami-saati/` | Cami saati kategori/model niyeti | 200, indexlenebilir |
| `/cami-saati-fiyatlari/` | Fiyat niyeti; model/ölçü yaklaşımı | 200, indexlenebilir |
| `/ayet-hadis-panosu/` | Ayet, hadis, Esmaül Hüsna, duyuru/pano niyeti | 200, indexlenebilir |
| `/urunler/dijital-cami-saati/` | Legacy organik dijital ürün sayfası | 200, indexlenebilir |
| `/destek/vakitmatik-ayarlama/` | Legacy organik destek giriş sayfası | 200, indexlenebilir |
| `/support/` | Yeni nesil mobil uygulama desteği | 200, indexlenebilir |
| `/privacy/` | Mobil uygulama gizlilik politikası | 200, indexlenebilir |
| `/landing-preview/` | Ortak landing önizlemesi | 200, `noindex,nofollow`, sitemap dışı |

`/urunler/vakitmatik-cami-saati/`, tek kalıcı yönlendirmeyle `/cami-saati/` adresine gider.

### 5.2 Yerelde hazırlanmış, canlı olmayan ürün route'ları

- `/cami-saati/vakitmatik-desen-mavi/`
- `/cami-saati/vakitmatik-desen-siyah/`
- `/cami-saati/vakitmatik-dikey/`
- `/cami-saati/vakitmatik-yatay/`
- `/cami-saati/vakitmatik-mesaj/`
- `/cami-saati/vakitmatik-kayan-yazi/`
- `/cami-saati/vakitmatik-resimli/`
- `/cami-saati/vakitmatik-led/`
- `/cami-saati/vakitmatik-modul/`
- `/cami-saati/vakitmatik-lcd/`

Bu sayfalar ana sayfadaki aynı ürün verisini kullanır; logo ana sayfaya, `Tüm ürünler` bağlantısı `/#urun-deneyimi` bölümüne gider. Metadata, Product ve Breadcrumb JSON-LD üretir. Henüz sitemap'e veya dahili model kartlarına bağlanmamıştır.

### 5.3 Dashboard route'ları

| Route | Görev |
| --- | --- |
| `/login` | Tek kullanıcı girişi |
| `/dashboard` | Genel KPI ve birleşik bakış |
| `/dashboard/google-ads` | Kampanya, keyword ve search term ayrıntısı |
| `/dashboard/seo` | GSC sorgu/sayfa ve URL Inspection |
| `/dashboard/daily-report` | Günlük birleşik rapor |
| `POST /api/login` | Oturum oluşturma |
| `POST /api/logout` | Oturumu silme |
| `GET /api/cron/daily-report` | Secret doğrulamalı cron/rapor |

## 6. Temel veri akışları ve kullanıcı akışları

### 6.1 İçerik üretimi

1. Ürün/metin/SSS/ölçü verileri `src/data/*.ts` içinde tutulur.
2. `src/types/*.ts` veri sözleşmesini sınırlar.
3. Route, veriyi sayfa veya ortak shell'e verir.
4. Next build statik HTML/CSS/JS üretir.
5. Vercel statik çıktıyı sunar.

İçerik anlık CMS yayını değildir; kod değişikliği, build ve deployment gerekir.

### 6.2 Ana satış akışı

1. Kullanıcı doğrudan, organik arama veya reklamla ana sayfaya/landing'e gelir.
2. Ana sayfada ayrıntılı premium ürün deneyimi; landing'de arama niyetine odaklı kısa açıklama, modeller, kanıt, SSS ve iletişim görür.
3. Kullanıcı ürünleri inceler; model sayfası canlıya alındığında tek ürünü ayrı URL'de görebilecektir.
4. WhatsApp veya `tel:` bağlantısıyla iletişime geçer.
5. Görüşme ve sipariş site dışında tamamlanır.

### 6.3 Ölçüm ve attribution akışı

- `NEXT_PUBLIC_GOOGLE_TAG_ID` varsa Google tag yüklenir.
- Delegated click handler telefon ve WhatsApp linklerini yakalar.
- Genel olay adları `lead_phone_click` ve `lead_whatsapp_click`tir.
- İlgili `send_to` env'i varsa ayrıca Google Ads `conversion` olayı gönderilir.
- Giriş sayfası varyantı ve yolu; `utm_source`, `utm_medium`, `utm_campaign`, `utm_content` oturum boyunca `sessionStorage` içinde korunur.
- Kod `gclid`, `gbraid`, `wbraid` varlığını yeni kampanya bağlamı olarak fark eder; bu kimlikleri saklamaz veya siparişe bağlamaz.
- Telefon navigasyonunda conversion callback için kısa bekleme/fallback vardır.
- Vercel Analytics trafik, Speed Insights performans sinyali toplar.
- Gerçek sipariş, gelir ve WhatsApp konuşma sonucu bu sistemde tutulmaz.

### 6.4 Dashboard veri akışı

1. Kullanıcı env tabanlı kimlikle giriş yapar.
2. İmzalı HTTP-only cookie ile `/dashboard/*` açılır.
3. Server Components Ads, GSC ve Vercel verilerini sunucudan paralel çeker.
4. REST yanıtları ortak dashboard tiplerine dönüştürülür ve cache'lenir.
5. UI KPI, kampanya, keyword, search term, SEO sorgu/sayfa ve URL Inspection görünümü verir.
6. Korumalı server action ilgili cache tag'lerini yeniler.

### 6.5 Günlük rapor

1. Vercel cron her gün `04:00 UTC` (`07:00 Europe/Istanbul`) çağrı yapar.
2. Bearer secret doğrulanır.
3. Ads, Search Console ve Vercel Analytics verileri toplanır.
4. En iyi keyword, dönüşümsüz yüksek harcama ve en çok tıklanan search term hesaplanır.
5. Resend ayarlıysa rapor e-posta ile gönderilir; değilse e-posta atlanır.

## 7. Veritabanı yapısı

Bu projede kalıcı veritabanı yoktur. Prisma, Drizzle, SQL, MongoDB, Supabase, Redis/KV veya başka bir ORM/veritabanı bağımlılığı bulunmaz.

| Veri | Yer | Kalıcılık |
| --- | --- | --- |
| Ürün, metin, SSS, ölçü | Git içindeki TypeScript dosyaları | Commit + deployment |
| Görsel ve video | `public/` | Git + deployment |
| Tema tercihi | Tarayıcı `localStorage` | Aynı tarayıcı |
| Lead giriş attribution'ı | Tarayıcı `sessionStorage` | Oturumluk |
| Dashboard session | İmzalı HTTP-only cookie | 8 saat |
| Login rate-limit | Sunucu process belleği | Instance/restart ile sıfırlanır |
| Google OAuth access token | Sunucu process belleği | Kısa süreli |
| GSC inspection cache | Sunucu process belleği | En fazla 7 gün, restart'a bağlı |
| Dashboard API verisi | Next cache | Süreli/tag ile yenilenir |
| Sipariş/WhatsApp konuşması | Sistem dışında | İşletmenin iletişim kanalında |

Müşteri, lead veya sipariş tablosu; çoklu kullanıcı/rol tablosu; ürün yönetim paneli; audit log ve Ads tıklamasını siparişe bağlayan kalıcı attribution tablosu yoktur.

## 8. API'ler ve harici servisler

### 8.1 Google Ads API

- User OAuth refresh-token akışı ve raw REST kullanılır; SDK yoktur.
- Mevcut çalışma ağacında varsayılan/minimum sürüm `v24`tür.
- 17 Ağustos salt-okunur denetim `v24` ile başarılıdır.
- Resmî güncel sürüm `v25`; `v24` Mayıs 2027'ye kadar desteklenir.
- Google'ın daha önce bildirdiği `v21` çağrısının kaynağı bulunmamıştır. Başka deployment/eski script/harici istemci olasılığı kapanmamıştır.
- Dashboard kampanya, conversion action, keyword ve search term verilerini GAQL ile okur.
- MCC/login-customer bağlamı desteklenir.

Operasyon scriptleri:

- `export-google-ads-snapshot.mjs`: salt okunur JSON/CSV yedeği.
- `analyze-google-ads-friday.mjs`: salt okunur dönem/saat/ağ/cihaz/keyword/search term analizi; untracked.
- `set-google-ads-budget.mjs`: gerçek bütçe mutasyonu yapabilir; dahili güvenli dry-run/onay katmanı yoktur. Ayrı açık Ads onayı olmadan çalıştırılmaz.

### 8.2 Google Ads OAuth ve passkey

- Repo service account değil, client ID/secret + refresh token akışı kullanır.
- Mevcut refresh tokenın rutin access-token üretimi passkey değişikliğinden etkilenmez.
- 5 Ağustos 2026 sonrası yeni refresh token üretmek gerekirse yetki veren Google hesabında passkey gerekir; yeni passkey için 7 güne kadar güvenlik gecikmesi uygulanabilir.
- `[AÇIK SORU]` Yetki veren Google hesabında passkey oluşturulup oluşturulmadığı koddan anlaşılamaz.
- Service account geçişi otomasyon için mantıklı bir sonraki bakım olabilir; bu e-posta nedeniyle zorunlu ve acil değildir.
- Çalışan refresh token sırf e-posta geldi diye iptal edilmez veya yeniden üretilmez.

### 8.3 Google Search Console

- Search Analytics API ile sorgu, sayfa, tıklama, gösterim, CTR ve pozisyon okunur.
- URL Inspection API ile coverage/indexing/canonical/crawl/fetch durumu okunur.
- İncelenecek URL listesi kodda manuel tanımlıdır.
- `[KANITLANDI]` Yerel Search Console env alanları bu denetimde kullanılabilir kimlik bilgisi sağlamadı; 17 Ağustos güncel 28 günlük GSC snapshot'ı alınamadı.
- Dashboard listesi hâlâ yönlendirilmiş eski `/urunler/vakitmatik-cami-saati/` URL'sini taşır; `/ayet-hadis-panosu/` ve yerel ürün detay sayfaları listede yoktur.

### 8.4 Vercel

- Kamu sitesi Vercel'de statik yayınlanır.
- Vercel Analytics ve Speed Insights root layout'ta aktiftir.
- Dashboard Vercel Observability API'den production pageview/referrer/custom event okumaya çalışır.
- Plan kısıtı custom event çağrısını kapatırsa UI bunu uygun biçimde belirtir.
- Dashboard cron Vercel üzerinden çalışır.

### 8.5 Google tag / Google Ads conversion etiketi

- Tarayıcıda doğrudan `gtag.js` kullanılır.
- Tag yalnız public env tanımlıysa yüklenir.
- Telefon ve WhatsApp click conversion desteklenir.
- `[AÇIK SORU]` Canlı temel tag hesabı ile iki conversion destination hesabının farklı Ads önekleri taşıması gerçek cihaz ve Ads kayıt ekranında doğrulanmalıdır.

### 8.6 Resend

- Günlük dashboard raporu REST API ile gönderilebilir.
- API key/gönderen/alıcı eksikse rapor oluşur, e-posta atlanır.
- `vakitmatik.com.tr` Google Workspace mail altyapısını kullanır. MX kayıtları bozulmamalı; ikinci SPF kaydı açılmamalıdır.

### 8.7 WhatsApp, telefon ve mağazalar

- WhatsApp `wa.me`, telefon `tel:` ile site dışına çıkar.
- App Store ve Google Play bağlantıları canlıda doğru mağaza sayfalarına gider ve 200 döner.
- Sipariş konuşması/sonucu bu repoda tutulmaz.

### 8.8 Diyanet

- Diyanet verisi ürün özelliği olarak anlatılır.
- Bu web reposunda Diyanet'e canlı API çağrısı yoktur.

## 9. Kimlik doğrulama ve yetkilendirme yapısı

Kamu sitesi tamamen açıktır; son kullanıcı hesabı yoktur.

Dashboard auth:

- Tek kullanıcı adı env'den gelir; çoklu kullanıcı/rol modeli yoktur.
- Düz parola saklanmaz; `hash-password.mjs` scrypt hash üretir.
- Girişte scrypt + `timingSafeEqual` kullanılır.
- Session HMAC-SHA256 ile imzalanır.
- Cookie `httpOnly`, `sameSite=lax`, production'da `secure`, ömrü 8 saattir.
- Dashboard layout session yoksa `/login`e yönlendirir.
- Yenileme server action'ı ve logout korumalıdır.

Rate-limit:

- IP + kullanıcı adı anahtarıyla 10 dakikada 5 hatalı deneme sonrası 10 dakika blok uygular.
- Process belleğindedir; serverless instance'lar arasında ortak değildir ve restart'ta sıfırlanır.

Cron:

- `/api/cron/daily-report`, bearer değerini `CRON_SECRET` ile karşılaştırır.

Google:

- Son kullanıcı OAuth ekranı yoktur.
- Önceden oluşturulmuş refresh token ile server-side access token alınır.
- Google secretları hiçbir zaman kamu sitesi bundle'ına konmaz.

## 10. Ortamlar, kurulum ve çalıştırma yöntemi

### 10.1 Kamu sitesi — local

```bash
npm install
npm run dev
npm run lint
npm run build
```

- `npm run dev/build/start`, `scripts/next-node.sh` üzerinden uygun Node binary'sini kullanır.
- `npm run build` statik `out/` çıktısı üretir.
- Kök `.env` gitignore kapsamındadır.

Public/build-time env adları:

- `NEXT_PUBLIC_GOOGLE_TAG_ID`
- `NEXT_PUBLIC_GOOGLE_ADS_PHONE_SEND_TO`
- `NEXT_PUBLIC_GOOGLE_ADS_WHATSAPP_SEND_TO`

`NEXT_PUBLIC_*` değerleri tarayıcıya açıktır; secret değildir ve secret içermemelidir.

### 10.2 Dashboard — local

```bash
cd apps/dashboard
npm install
cp .env.example .env.local
npm run hash-password "uzun-bir-parola"
npm run dev
npm run lint
npm run build
```

Server-only env grupları:

- Auth: `DASHBOARD_USERNAME`, `DASHBOARD_PASSWORD_HASH`, `DASHBOARD_SESSION_SECRET`
- Ads: `GOOGLE_ADS_CLIENT_ID`, `GOOGLE_ADS_CLIENT_SECRET`, `GOOGLE_ADS_REFRESH_TOKEN`, `GOOGLE_ADS_DEVELOPER_TOKEN`, `GOOGLE_ADS_LOGIN_CUSTOMER_ID`, `GOOGLE_ADS_CUSTOMER_ID`, `GOOGLE_ADS_API_VERSION`
- Search Console: `GOOGLE_SEARCH_CONSOLE_CLIENT_ID`, `GOOGLE_SEARCH_CONSOLE_CLIENT_SECRET`, `GOOGLE_SEARCH_CONSOLE_REFRESH_TOKEN`, `GOOGLE_SEARCH_CONSOLE_SITE_URL`
- Vercel: `VERCEL_API_TOKEN`, `VERCEL_TEAM_ID`, `VERCEL_ANALYTICS_PROJECT_ID`
- Cron/e-posta: `CRON_SECRET`, `RESEND_API_KEY`, `REPORT_EMAIL_FROM`, `REPORT_EMAIL_TO`

### 10.3 Preview, production ve rollback

- Her görünür paket önce preview'da incelenir.
- Production deploy ayrı açık onay gerektirir.
- Google Ads değişikliği production onayından ayrıdır.
- 17 Ağustos itibarıyla doğrulanmış rollback deployment: `dpl_9o9vFeAxpRYrntmuzmtRHHabXZ1y`.
- Rollback de dış durum değişikliğidir; ihtiyaç halinde kullanıcıya etkisi söylenerek çalıştırılır.
- `[KRİTİK]` Canlı deployment dirty kaynakla üretildiği için mevcut çalışma ağacı sınıflandırılmadan “aynı commit'i tekrar deploy et” güvenli bir yeniden üretim yöntemi değildir.

## 11. Alınmış önemli teknik kararlar ve nedenleri

| Karar | Gerekçe |
| --- | --- |
| Ana sayfayı koruyup ayrı niyet landing'leri kullanmak | Premium marka deneyimini bozmadan Ads/organik arama–sayfa tutarlılığı sağlamak |
| Landing'leri bağımsız ve görünür içerikle hazırlamak | Doorway/gizli SEO yaklaşımından kaçınmak |
| Ortak `AdLandingShell` + veri yapılandırması | Üç sayfada aynı kalite ve bakım disiplini |
| Ağır carousel yerine server-render kart + scroll-snap | Hız, erişilebilirlik ve ilk HTML'de gerçek içerik |
| Statik export | Basit, hızlı, düşük runtime bağımlılığı |
| Sayısal fiyat ve sahte `Offer` şeması kullanmamak | Ticari gerçek ve schema doğruluğu |
| Telefon/WhatsApp click conversion | Manuel sipariş girişi istemeden düşük sürtünmeli ara sinyal |
| Eski duplicate cami saati URL'sini `/cami-saati/`ye 301 taşımak | Canonical parçalanmasını azaltmak |
| Dinamik sitemap route'u | Canonical URL ve görsel listesini koddan üretmek |
| Ürün detayında ana sayfadaki aynı veri/bileşeni yeniden kullanmak | Yeni, düşük kaliteli kopya tasarım üretmemek |
| Eski `.org` için URL bazlı taşıma | Güçlü eski URL'leri alakasız ana sayfaya toplu yönlendirmemek |
| Dashboard'u ayrı uygulama ve salt okunur tutmak | Secretları kamu sitesinden ayırmak; operasyon riskini azaltmak |
| Google Ads'i Maximize Clicks'te bırakmak | Yalnız 3 click conversion varken otomatik dönüşüm teklifine geçmek için veri yetersiz |
| Auto-apply önerilerini kapalı bırakmak | Bütçe, ağ, teklif ve içerik kararlarını Google'a otomatik devretmemek |

## 12. Tamamlanan özellikler

### 12.1 Canlı ve doğrulanmış kamu sitesi

- Premium ana sayfa ve 10 modelli ürün vitrini.
- `/cami-saati/`, `/cami-saati-fiyatlari/`, `/ayet-hadis-panosu/` landing'leri.
- Responsive mobil/masaüstü düzen, model rayları, SSS, schema ve iletişim alanları.
- Canonical temizliği ve eski `/urunler/vakitmatik-cami-saati/` 301 yönlendirmesi.
- Dinamik sitemap ve doğru robots referansı.
- Telefon ve WhatsApp click event/conversion kodu.
- UTM ve giriş landing attribution'ının oturumluk korunması.
- App Store ve Google Play kartları/doğru bağlantıları.
- Vercel Analytics ve Speed Insights.
- `landing-preview` noindex önizleme route'u.

### 12.2 Yerelde tamamlanmış fakat yayınlanmamış

- 10 model için statik ürün detail route üretimi.
- Ürün detayında H1, tek ürün görünümü, eager ana görsel, metadata, Product ve Breadcrumb schema.
- Logo ile ana sayfaya, alt bağlantıyla bütün ürünlere dönüş.
- Tüm 10 slug'ın merkezi ürün verisine eklenmesi.
- Kamu sitesi build'inde toplam 23 sayfanın başarıyla üretilmesi.

### 12.3 Dashboard ve araçlar

- Tek kullanıcı auth/session.
- Google Ads bugün/dün/7 gün ve ayrıntı ekranları.
- Search Console sorgu/sayfa ve URL Inspection.
- Vercel production trafik/referrer görünümü.
- Cache yenileme.
- Günlük rapor/cron ve opsiyonel Resend e-postası.
- Salt okunur Ads snapshot ve dönem analiz araçları.
- Çalışma ağacında Ads API minimum/default v24 koruması.

## 13. Devam eden işler

### 13.1 Kaynak–canlı baseline konsolidasyonu

`[P0 TAMAMLANDI / SAHİBİ ONAYLADI]` Karışık çalışma ağacı aşağıdaki mantıksal commitlere ayrıldı:

- `691b6cb`: canlıyla eşleşen mobil mağaza kartları/footer/CSS
- `dcd9f56`: yalnız yerel 10 ürün detail route'u ve bağlı veri/bileşen/CSS
- `4aa6d6a`: dashboard Google Ads API v24 koruması
- `4276951`: salt-okunur Ads analiz aracı
- `b9dbd0c`: ayrı tutulan, çalıştırılmamış bütçe mutasyon aracı
- `2bbf157`: tarihli organik SEO taşıma kayıtları
- `15f1be0`: proje yönetişim belgeleri
- `4228d18`: P0 baseline, roadmap, karar kaydı ve devir teslim kapanış belgeleri

Canlı manifest, ölçüm bulguları, GSC blokajı ve geri alma yöntemi `docs/vakitmatik/p0-baseline-2026-08-17.md` dosyasındadır. P0 kapanışında çalışma ağacı temizdir; final doğrulama sonucu bu belgenin üst tablosuna işlenmiştir.

Bu düzenleme canlıdaki `gitDirty: 1` deployment'ı kendiliğinden temizlemez. Dal HEAD'i yayınlanmamış ürün route'larını içerdiği için yeni deployment ancak ayrı production paketi ve açık onayla hazırlanabilir.

### 13.2 Ürün detay sayfaları

- 10 sayfa build alıyor ancak canlı değildir.
- Kullanıcı aynı yönle hepsinin hazırlanmasına izin verdi.
- Her sayfanın metin, görsel sırası, ebat ve özellikleri son kez ürün gerçeğiyle gözden geçirilmelidir.
- Kullanıcı açıkça onaylamadan site içi link, sitemap, production ve eski domain redirect hedefi yapılmaz.

### 13.3 Organik SEO alan adı taşıması

- `vakitmatik.org` ve `reksanreklam.com.tr` kullanıcıya aittir.
- `.org` eski site 51 sitemap URL'si ve sitemap dışı PDF/APK/MSI/EXE/RAR dosyalarıyla hâlâ güçlü organik varlıktır.
- Proje sahibi P1'den önce P0.5 geçişini ve canlı kesimi `vakitmatik.net`
  dahil onayladı. Domain registrar transferi yapılmayacak; alan adı
  kayıt/yenilemeleri SH'de kalacak.
- `apps/org-redirect` altında bağımsız Vercel `301` katmanı hazırlandı. 64 envanter satırı test kapsamındadır ve Vercel edge örnekleri doğru hedefleri vermektedir.
- `.org` apex/www/mail ve `.net` apex/www canlı Vercel redirect projesine
  bağlandı. Vercel web kayıtları, Null MX/SPF/DMARC ve sertifikalar hazırdır;
  beş host doğrudan edge testinde geçerli TLS ile `301` verdi.
- Ana SH hesabında iki ayrı hosting vardır. Eski `.org` sitesi cp25 üzerindeki
  `Small — vakitmatik.org` hizmeti `83999` içindedir. Plesk01 üzerindeki
  `Small — vakitmatik.com.tr` hizmeti `96837` ayrıdır ve P0.5 iptal kapsamına
  girmez.
- SH panelinde `.org` ve `.net` nameserver'ları yalnız Vercel olarak başarıyla
  kaydedildi; iki TLD parent delegasyonu ve RDAP kaydı Vercel'e geçti. `.org`
  eski cache'i yaklaşık dört saat, `.net` eski `SERVFAIL` cache'i 48 saate
  kadar sürebilir.
- Eski ürün sayfaları, production'da detail route'lar `404` olduğu için şimdilik canlı `/cami-saati/` ailesine gider. Ayet/Hadis ve fiyat kümeleri kendi canlı landing'lerine gider.
- Ezanmatik/karşılıksız URL'lerin ana sayfaya; eski program/kılavuz/dosyaların genel ayarlama desteğine gitmesi, sahibin sadeleştirme kararına bağlı bilinen soft-404/alaka riskidir.
- `.org` mail taşınmayacaktır. Null MX/SPF/DMARC canlı DNS paketi içindedir; `bilgi@vakitmatik.com.tr` Google Workspace'te değişmeden kalır.
- Sıradaki adım public DNS/cache yakınsaması ve canlı kabul matrisidir. SH
  `.org` hosting hizmeti `83999` ancak en az yedi günlük gözlem, tam cPanel
  yedeği ve bağımlılık denetiminden sonra ayrıca onaylanarak iptal edilebilir.
- `reksanreklam.com.tr` bütünüyle Vakitmatik'e yönlendirilmemelidir; daha geniş ürün kapsamı vardır.

### 13.4 Ölçüm doğrulaması

- Google Ads'te telefon ve WhatsApp conversion action'ları etkin/primary'dir.
- Site `send_to` değerleri bu iki action'ın Ads API tag snippet'leriyle birebir eşleşir; hedef Ads hesabı doğrulanmıştır.
- Telefon dönüşümü kayıt olmaktadır; WhatsApp 0'dır. Telefonun 3 kaydı üretim akışının çalıştığına dair güçlü kanıttır.
- Temel tag farklı bir Ads öneki taşır. Açık conversion hedefleri doğru olsa da default/genel olaylar için split-routing riski vardır.
- Production verisini kirletecek yapay conversion oluşturulmadı. WhatsApp gerçek cihaz firing ve Google Tag connected/combined durumu ayrı açık ölçüm kararıdır.
- Click ID kalıcı saklama ve gerçek sipariş attribution'ı yoktur; kullanıcı manuel sipariş kaydı istemediği için şimdilik ertelenmiştir.
- Dashboard `totalLeads` hesaplaması hâlâ telefon + e-posta mantığına yakındır; WhatsApp adlarını doğru sınıflandırmaz.

### 13.5 Google Ads

- Aktif reklam final URL'leri hâlâ ana sayfadır.
- Etkin reklam grupları `Marka`, `Cami Saati`, `Model ve Fiyat` ve `Ayet Hadis Panosu`dur; eski bir grup duraklatılmıştır.
- Landing'lere giden ayrı RSA/final URL paketi hazırlanıp uygulanmamıştır.
- Maximize Conversions, Display expansion, dynamic images, sitelink ve RSA strength önerileri beklemededir.
- Google Ads çalışması organik SEO sonrasında ele alınmak üzere kullanıcı tarafından ertelenmiştir.
- v21 çağrısının kaynağı bulunmalıdır; v24 çağrılar çalışıyor olsa da eski çağıranın kalmadığı kanıtlanmış değildir.

### 13.6 Search Console ve dokümantasyon

- Güncel GSC performans snapshot'ı alınamadı; dört gerekli credential kaydı hem yerelde hem production'da mevcut fakat boştur.
- Dashboard URL listesi canlı canonical yapıyla eşitlenmelidir.
- Roadmap ve decision log P0 bulgularıyla 17 Ağustos durumuna güncellenmiştir.
- Root README sitemap açıklaması `src/app/sitemap.ts` kaynağını gösterecek biçimde düzeltilmiştir.

## 14. Bilinen hatalar, riskler ve teknik borçlar

### 14.1 Kritik operasyonel riskler

1. Önceki `gitDirty: 1` production kaynak belirsizliği 26 Ağustos'taki temiz `ecc568a` deployment'ıyla kapanmıştır.
2. 10 ürün route'u canlıdır ve fiyat landing'inden bağlanır; ancak sitemap ve ana sayfadaki doğal organik bağlama P2 onayı bekler.
3. Canlı tag ve conversion destination Ads önekleri farklıdır. Açık `send_to` hedef hesabı doğrulanmıştır; connected/combined tag durumu ve genel olay split-routing'i açık sorudur.
4. Root `.env` ve `apps/dashboard/.env.local` gibi birden fazla credential deposu gelecekte token rotasyonunda çakışma riski taşır.

### 14.2 Ölçüm ve ticari riskler

5. Son 4 haftadaki 3 conversionın tamamı telefon click'idir; sipariş kanıtı değildir.
6. WhatsApp conversion 0; gerçekten hiç dönüşüm olmaması ile event/config sorunu ayrıştırılmamıştır.
7. `gclid`, `gbraid`, `wbraid` kalıcı tutulmaz; siparişe bağlanmaz.
8. Dashboard WhatsApp action'ını toplam lead'e doğru katmayabilir.
9. E-posta ticari olarak ikincil olmasına rağmen dashboard sınıflandırmasında eski telefon/e-posta yaklaşımı kalmıştır.

### 14.3 Google Ads riskleri — 17 Ağustos 2026 snapshot'ı

| Ölçüm | Son 7 gün: 10–16 Ağustos | Önceki 7 gün |
| --- | ---: | ---: |
| Gösterim | 2.203 | 2.080 |
| Tıklama | 299 | 297 |
| CTR | %13,57 | %14,28 |
| Harcama | 3.705,25 TL | 3.397,33 TL |
| Ortalama CPC | 12,39 TL | 11,44 TL |
| Dönüşüm | 2 | 0 |

Ek Ads durumu:

- 20 Temmuz–16 Ağustos: 7.685 gösterim, 1.113 tıklama, 14.105,41 TL harcama, 3 conversion.
- Üç conversionın tarihleri 29 Temmuz, 15 Ağustos ve 16 Ağustos'tur; üçü de `Vakitmatik Telefon Lead`, değerleri 0'dır. `Vakitmatik WhatsApp Lead` 0 conversiondır.
- Son 7 gün tıklamalarının 282'si; harcamanın 3.485,25 TL'si mobilden geldi.
- Tek etkin Search kampanyası Maximize Clicks, günlük 500 TL; arama ortakları açık, Display ağı kapalıdır.
- Optimization score `%72,87`dir. Bu CTR veya iş başarısı puanı değildir.
- Skor, mevcut Google önerilerinin tahmini uplift'ine göre değişir. Tıklamalar iyi giderken yeni Maximize Conversions/Display önerileri açıldığı için düşebilir; düşüş tek başına kampanyanın kötüleştiğini göstermez.
- 8 bekleyen öneri vardır: 4 RSA strength, sitelink, Maximize Conversions, Display expansion, dynamic image.
- Auto-apply aboneliği görünmüyor.
- 56 pozitif keyword'ün 43'ünde landing experience `BELOW_AVERAGE`, 2'sinde `AVERAGE`, 11'inde veri yoktur.
- Yalnız 3 click conversion varken Maximize Conversions'a geçmek erken ve risklidir.

### 14.4 İçerik ve ürün doğruluğu riskleri

10. Ürün özellikleri model bazında kesin yetenek matrisi olmadan bütün modellere kopyalanmamalıdır.
11. Bazı `dimensions` ve `sizeOptions` değerleri geçmişte uyuşmazlık göstermiştir; detail onayında tek tek kontrol edilmelidir.
12. Ayet/Hadis ürünlerinin içerik ve mobil kontrol yetenekleri model bazında doğrulanmalıdır.
13. Eski `.org` içeriklerinde 6 yıl garanti, eski adres/telefon ve 2020/2021 veri referansları gibi güncel politikayla çelişen ifadeler vardır; kopyala-yapıştır yapılmamalıdır.
14. EXE/MSI/APK/RAR/PDF dosyaları hash, sürüm, uyumluluk, imza ve zararlı yazılım kontrolü olmadan yeni domaine taşınmamalıdır.

### 14.5 SEO borcu

15. `src/data/seoLandingPages.ts` içinde müşteriye “SEO sayfası/ana siteye geçiş” anlatan zayıf legacy metinler vardır.
16. `/destek/vakitmatik-ayarlama/`, gerçek “nasıl güncellerim / geri kalıyor / çalışmıyor” sorularını yeterince çözmez.
17. 10 ürün detail sayfası sitemap'te ve dahili link yapısında yoktur; yayınlanmadan önce bu bilinçli olarak böyle kalmalıdır.
18. Sitemap `lastmod` üretmez.
19. Dashboard Search Console URL listesi yönlendirilmiş URL içerir ve yeni canonical sayfaları eksik taşır.
20. Fresh GSC verisi olmadan organik öncelik yalnız eski SERP anlık görüntüsüne dayandırılamaz.

### 14.6 Bakım, performans ve güvenlik borcu

21. Otomatik test/CI/görsel regresyon yoktur; lint, build, browser ve Lighthouse'a dayanılır.
22. Public site ve dashboard Next/React patch sürümleri farklıdır.
23. Login rate-limit ve bazı cache'ler process belleğindedir.
24. `runtime-cache.ts` kullanılmayan eski yardımcı kod taşır.
25. Bazı artık render edilmeyen bileşen/veriler teknik borçtur.
26. Consent/KVKK yaklaşımı ayrıca doğrulanmamıştır.
27. Root public env adlarını örnekleyen `.env.example` yoktur.
28. `set-google-ads-budget.mjs` mutasyon scriptinde güvenli dry-run/onay kilidi yoktur.
29. Service account'a geçilmezse refresh tokenı veren Google hesabının erişimi operasyon bağımlılığı olarak kalır.

## 15. Yakın dönem geliştirme planı

Her satır ayrı iş paketidir. Bir paketin onayı sonrakini, production'ı veya Ads hesabını otomatik onaylamaz.

### Paket P0 — Kaynak, canlı ve karar baseline konsolidasyonu

Durum: `Tamamlandı — sahibi onayladı`.

Sonuç:

1. Canlı deployment/route/tag/store-link manifesti kaydedildi.
2. Çalışma ağacı canlı eşdeğer, yalnız yerel, dashboard/Ads aracı ve dokümantasyon commitlerine ayrıldı.
3. Roadmap, karar kaydı, README ve bu devir teslim dosyası güncellendi.
4. Telefon/WhatsApp conversion hedeflerinin doğru Ads hesabındaki action'larla eşleştiği kanıtlandı.
5. Gerçek cihaz WhatsApp firing, üretim verisini kirletmemek için yapay conversion oluşturulmadan açık soru bırakıldı.
6. GSC snapshot'ı, yerel ve production credential değerleri boş olduğu için kanıtlanmış blokaj olarak kaydedildi.

Değişmeyenler: görünür canlı site, production deployment, Ads reklam/bütçe/teklif/final URL, Search Console ayarı ve `.org` yönlendirmesi.

Ayrıntı ve geri alma: `docs/vakitmatik/p0-baseline-2026-08-17.md`.

P0 sonuç onayı P1'i otomatik başlatmamıştır. P1 ayrı kapsam ve yön onayı bekler.

### Paket P0.5 — Vakitmatik.org ve Vakitmatik.net Vercel geçişi

Durum: `Canlı kesim uygulandı — DNS/cache yakınsaması izleniyor`.

Tamamlanan hazırlık ve canlı adımlar:

1. Registrar transferi kapsamdan çıkarıldı; domain kayıt/yenilemeleri SH'de kalacak.
2. Bağımlılıksız `apps/org-redirect` Vercel projesi oluşturuldu.
3. Ana kategori, fiyat, Ayet/Hadis, iletişim, gizlilik, destek ve catch-all `301` grupları hazırlandı.
4. 64 URL envanteri, duplicate/loop/hedef allowlist ve temsilî route'larla `25/25` test geçti.
5. İzole Vercel edge deployment'ında gerçek `301`, mutlak `Location` ve query koruması doğrulandı.
6. `.org` apex/www/mail ile `.net` apex/www custom domainleri bağlandı; Vercel
   zone kayıtları, mail-kapalı Null MX/SPF/DMARC ve sertifikalar oluşturuldu.
7. SH sahibi panelinde iki domainin nameserver'ları yalnız Vercel olarak
   başarıyla kaydedildi; iki TLD parent delegasyonu da geçti. Recursive cache
   yakınsaması izleniyor.

Değişmeyenler: SH hosting hizmetleri, `.com.tr` production deployment'ı,
Google Ads ve Search Console. `.org` posta içeriği taşınmadı; Vercel DNS'te
alanın posta kabul etmediği ilan edildi.

Sıradaki adım public DNS/cache yakınsaması ve canlı kabul matrisidir. Hosting
iptali bu onayın kapsamında değildir. Ayrıntı ve geri alma:
`docs/vakitmatik/p0-5-org-vercel-migration-2026-08-17.md`.

### Paket P1 — 10 ürün detay sayfası incelemesi

- Önce bütün route'ları tek preview'da göster.
- Model adı, ana görsel, alternatif görseller, ebat, özellik ve kısa metni model model kontrol et.
- Hataları revize et.
- Kullanıcıdan her sayfa veya açıkça tanımlanmış sayfa grubu için içerik/görsel onayı al.

### Paket P2 — Organik bağlama hazırlığı

- Yalnız onaylı ürün sayfalarını ana sayfa/landing kartlarına doğal bağla.
- Sitemap ve ilgili schema/listeleri güncelle.
- Dashboard GSC URL listesini canonical sayfalarla eşitle.
- Build, structured data, mobil/masaüstü, 320/390/1024/1440 ve Lighthouse kontrollerini yap.

### Paket P3 — Ürün sayfalarını production'a alma

- `2026-08-26`: Fiyat sorma paketinin onaylı production yayınıyla 10 ürün route'u canlı `200` oldu. Sitemap ve ana sayfa organik bağlama bu yayın kapsamında değildi.
- Final preview ve değişiklik listesini göster.
- Açık `production'a al` onayından sonra deploy et.
- Canlı route, canonical, schema, görsel ve linkleri tekrar doğrula.
- Rollback noktasını kaydet.

### Paket P4 — Eski `.org` URL haritası ve dry-run

`P0.5 ile öne alındı/değiştirildi.` Vercel tabanlı URL haritası ve dry-run hazırdır. P1 sonrasında canlı ürün detail hedefleri `200` olursa model redirectleri ayrıca daraltılabilir.

### Paket P5 — Alan adı taşıması ve Search Console

`P0.5 canlı kapısıyla kısmen öne alındı.` Ayrı production/dış sistem onayıyla `.org` Vercel domain/DNS geçişi yapılacak; HTTP/HTTPS, www/non-www/mail ve temsilî URL'ler test edilecek. Search Console erişimi çözülürse Change of Address ayrıca uygulanacak.

### Paket P6 — Google Ads'i yeniden ele alma

- Mevcut reklamı koru.
- Her reklam grubu için yeni RSA metni ve doğru final URL'yi ayrı onaya sun.
- Bütçe, teklif stratejisi, ağ ve creative değişikliklerini aynı testte karıştırma.
- Maximize Conversions'a yalnız yeterli ve güvenilir conversion verisi sonrası karar ver.
- Optimization score'u hedef değil öneri listesi olarak kullan.

### Sonraki fazlar

- Gerçek destek mimarisi: yeni mobil, eski USB, eski RS232, Ezanmatik, eski mesaj/pano.
- Model portföyü: arama talebi + ticari değer + firmanın satmak istediği ürünler.
- Almanya/Avrupa: lojistik/gümrük/garanti doğrulandıktan sonra içerik ve reklam.
- Vakitmatik'te kanıtlanan kontrollü sistemin başka projelere genellenmesi.

## 16. Projeye özel terimler ve kısaltmalar

| Terim | Anlamı |
| --- | --- |
| Vakitmatik | Marka, fiziksel cami saati/pano ürün ailesi ve mobil yönetim yaklaşımı |
| Cami saati | Ana kategori ve görünür doğru Türkçe ifade |
| Camii saati | Gerçek arama varyasyonu; query/keyword olarak izlenir |
| Landing | Belirli Ads/organik niyete odaklanan bağımsız faydalı giriş sayfası |
| RSA | Responsive Search Ad |
| MCC / login customer | Google Ads yönetici hesabı bağlamı |
| GAQL | Google Ads Query Language |
| GSC | Google Search Console |
| Optimization score | Google önerilerinin tahmini etkisine dayalı yapılandırma skoru; performans/CTR puanı değil |
| Quality Score | Keyword düzeyinde teşhis metriği |
| Landing experience | Google Ads'in reklam sonrası sayfa deneyimi bileşeni |
| CTA | WhatsApp, telefon, ürün/mağaza gibi aksiyon |
| UTM | Trafik kaynağı ve kampanya parametreleri |
| gclid / gbraid / wbraid | Google reklam tıklaması ilişkilendirme kimlikleri |
| Canonical | Benzer içerikte tercih edilen asıl URL sinyali |
| JSON-LD / schema | Ürün, breadcrumb, liste, FAQ, marka gibi yapılandırılmış veri |
| LCP | En büyük içerik öğesinin yüklenme süresi |
| CLS | Yükleme sırasında görsel yer değiştirme |
| Static export | Build sırasında HTML üretip server runtime olmadan servis etme |
| RS232 | Eski cihaz veri yükleme bağlantısı; yeni satış anlatımında öne çıkarılmaz |
| RTC / PPM | Saat devresi/sapma terimleri; ana satış dili değildir |
| İş paketi | Tek amaç, kapsam, test, geri alma ve onay kapısı olan kontrollü çalışma |
| Kuzey yıldızı | Bu projede gerçek sipariş |
| Baseline | Değişiklikten önceki doğrulanmış kaynak/canlı/dış sistem durumu |

## 17. ChatGPT'nin özellikle dikkat etmesi gereken kısıtlar

1. Varsayım yapma; her önemli bilgiyi sahibi onaylı, kanıtlı, hipotez veya açık soru olarak ayır.
2. En yeni kullanıcı beyanını eski dokümandan üstün tut; çelişkide sor.
3. Ürün özelliğini tüm modellere otomatik kopyalama.
4. Sayısal fiyat listesi önererek bilinçli satış yaklaşımını değiştirme; fiyat aramasını da görmezden gelme.
5. Sunulmayan danışmanlık, kurulum, model seçme veya kalibrasyon süreci uydurma.
6. “En iyi/tek/dünyada ilk/en düşük PPM” gibi kanıtsız iddialar yazma.
7. Rakibe saldırma; teknik farkı müşteri sonucuna çevir.
8. Landing'i gizli metin, keyword tekrarları, uzun anlamsız SEO yazısı veya doorway sayfaya çevirme.
9. Müşteriye sayfanın nasıl kullanılacağını veya metnin Google için yazıldığını anlatma.
10. Ana sayfanın premium karakterini koru; pazar yerine çevirme.
11. WhatsApp CTA'sını gereksiz tekrar etme; ana kanallar WhatsApp ve telefondur.
12. Müşteri grupları arasında kanıtsız öncelik kurma.
13. Eski RS232/USB sürecini yeni ürün satış mesajına karıştırma.
14. Avrupa doğrudan kargoyu lojistik doğrulanmadan vaat etme.
15. Güncel Google kuralı, API sürümü, Ads verisi veya SEO bilgisi gerekiyorsa resmî kaynak/canlı veriyle doğrula.
16. Bu belgeyi production, Vercel, Google Ads, Search Console veya e-posta değişikliği izni sayma.
17. Görünür içerik, production ve Google Ads değişiklikleri için ayrı açık onay iste.
18. Bir paket onayı sonraki paketi yetkilendirmez.
19. Kullanıcının fikri ürün gerçeği, veri, Google politikası veya sipariş hedefiyle çelişirse sessizce uygulama; gözlem, kanıt, etki, öneri ve karar formatında muhalefet et.
20. Paket sonunda sonuç, değişen/değişmeyen alanlar, test, risk, geri alma ve tek karar talebini sun.
21. Secret isteme, yazma, loglama veya bu dosyaya ekleme.
22. Google Ads ham snapshot/hesap kimliklerini public belgeye veya Git'e koyma.
23. `set-google-ads-budget.mjs` veya başka mutasyonu açık Ads onayı olmadan çalıştırma.
24. Mevcut aktif reklamı silme/askıya alma; yeni reklam gerekirse eskisini koru.
25. Çalışma ağacındaki ilgisiz kullanıcı dosyalarını stage, commit, formatla, sil veya geri alma.
26. Canlı `gitDirty` kaynak sorunu çözülmeden yeni deploy'u rutin işlem sayma.
27. Eski `.org` URL'lerini topluca ana sayfaya yönlendirme; ilgili yeni hedef hazır olmalı.
28. Eski EXE/MSI/APK/RAR/PDF dosyalarını güvenlik ve uyumluluk kontrolü olmadan taşıma.

Muhalefet formatı:

- Gözlem
- Kanıt
- Olası etki
- Önerilen orta yol veya düşük riskli test
- Proje sahibinden beklenen karar

## 18. Belirli bir konu detaylandırılırken incelenmesi gereken önemli dosyalar

| Konu | Önce incelenecek dosyalar | Neden |
| --- | --- | --- |
| Zorunlu çalışma kuralları | `AGENTS.md`, `docs/project-system/controlled-workflow.md` | Bilgi sınıfı, paket, onay ve geri alma sınırı |
| Marka/ürün/SEO pusulası | `docs/vakitmatik/project-charter.md` | Sahibi onaylı gerçek ve yasaklı varsayımlar |
| Tarihli sıra ve kararlar | `docs/vakitmatik/roadmap.md`, `docs/vakitmatik/decision-log.md` | Geçmiş faz ve karar izi; durum satırları güncellenmeli |
| Güncel devir teslim | `CHATGPT_CONTEXT.md` | Canlı + repo + Ads + SEO'nun 17 Ağustos birleşik durumu |
| Ana sayfa | `src/app/page.tsx`, `src/components/HeroSection.tsx`, `src/components/sections/ProductShowcaseSection.tsx` | Premium ürün deneyimi |
| Merkezi ürün gerçekleri | `src/data/landing.ts`, `src/types/landing.ts` | Model, ölçü, özellik, medya ve slug |
| Ürün detail sayfaları | `src/app/cami-saati/[slug]/page.tsx`, `src/components/sections/ProductShowcaseSection.tsx`, `src/app/site.css` | Yerel 10 route'un davranışı |
| Ortak landing sistemi | `src/components/ad-landing/AdLandingShell.tsx`, `AdLandingProductRail.tsx`, `AdLandingShell.module.css`, `src/types/adLanding.ts` | Üç niyet sayfasının ortak UX'i |
| Cami saati landing | `src/data/adLandingCamiSaati.ts`, `src/app/cami-saati/page.tsx` | Cami saati metni, modeller ve schema |
| Fiyat landing | `src/data/adLandingFiyatModel.ts`, `src/app/cami-saati-fiyatlari/page.tsx` | Model/ölçü ve fiyat dili |
| Ayet/Hadis landing | `src/data/adLandingAyetHadis.ts`, `src/app/ayet-hadis-panosu/page.tsx` | Modül/pano içeriği ve görseller |
| Mobil mağaza kartları | `src/components/MobileAppSection.tsx`, `src/components/FooterSection.tsx`, `src/app/site.css` | App Store/Google Play canlı değişiklikleri |
| Legacy SEO metinleri | `src/data/seoLandingPages.ts`, `src/components/SeoLandingPage.tsx` | Müşteri dışı metin ve destek borcu |
| Global SEO | `src/config/seo.ts`, `src/app/layout.tsx`, `src/app/sitemap.ts`, `public/robots.txt`, `vercel.json` | Canonical, schema, sitemap ve redirect |
| Google Tag/attribution | `src/components/GoogleTag.tsx`, `src/components/TrafficSourceTracker.tsx`, `src/app/layout.tsx` | Telefon/WhatsApp, UTM ve send_to |
| Mobil destek iddiaları | `src/app/support/page.tsx`, `src/app/privacy/page.tsx`, `src/data/landing.ts` | Gerçek destek ile pazarlama iddiasını karşılaştırmak |
| Kamu build/deploy | `package.json`, `next.config.ts`, `scripts/next-node.sh`, `vercel.json` | Statik export ve runtime sınırı |
| Dashboard genel | `apps/dashboard/package.json`, `apps/dashboard/README.md`, `apps/dashboard/src/app/dashboard/` | Ayrı uygulama ve ekranlar |
| Dashboard auth | `apps/dashboard/src/lib/auth.ts`, `rate-limit.ts`, `env.ts`, `src/app/api/login/route.ts` | Session, parola ve rate-limit |
| Google OAuth/Ads | `apps/dashboard/src/lib/google-auth.ts`, `google-ads.ts` | Refresh token ve GAQL akışı |
| Search Console | `apps/dashboard/src/lib/search-console.ts` | Sorgu/sayfa, manuel URL listesi ve inspection |
| Vercel trafik | `apps/dashboard/src/lib/vercel-analytics.ts` | Pageview/referrer/custom event |
| Günlük rapor | `apps/dashboard/src/lib/report.ts`, `email.ts`, `src/app/api/cron/daily-report/route.ts`, `apps/dashboard/vercel.json` | Rapor, cron ve Resend |
| Ads snapshot | `scripts/export-google-ads-snapshot.mjs` | Değişiklik öncesi salt okunur yedek |
| Ads analiz | `scripts/analyze-google-ads-friday.mjs` | Dönem/ağ/cihaz/keyword analizi |
| Ads mutasyon riski | `scripts/set-google-ads-budget.mjs` | Açık onay gerektiren gerçek bütçe değişikliği |
| Eski domain taşıması | `docs/vakitmatik/organic-seo-domain-migration-audit.md`, `organic-seo-target-decision-package.md`, `organic-seo-vakitmatik-org-url-map.csv` | 51+ URL, ürün eşlemesi, mail/DNS ve dosya riski |
| `.org` Vercel yönlendirme katmanı | `apps/org-redirect/vercel.json`, `apps/org-redirect/test/redirects.test.mjs`, `docs/vakitmatik/p0-5-org-vercel-migration-2026-08-17.md` | 301 grupları, 64 URL kapsamı, canlı yayın ve geri alma kapısı |
| Tarihsel denetimler | `docs/seo-audit.md`, `docs/google-ads-*.md` | Yalnız tarihsel bağlam; canlı veri değildir |

### Yeni bir ChatGPT konuşmasına yapıştırılacak başlangıç metni

> Repo kökündeki `CHATGPT_CONTEXT.md` dosyasını proje için güncel devir teslim belgesi olarak tamamen oku. Ardından `AGENTS.md`, `docs/project-system/controlled-workflow.md`, `docs/vakitmatik/project-charter.md`, `docs/vakitmatik/roadmap.md` ve `docs/vakitmatik/decision-log.md` kurallarına uy. `docs/vakitmatik/p0-baseline-2026-08-17.md` tamamlanan Paket P0'ın; `docs/vakitmatik/p0-5-org-vercel-migration-2026-08-17.md` ise devam eden P0.5'in kanıt ve geri alma kaydıdır. Vakitmatik'in kuzey yıldızı sipariştir; müşteri, Google Ads ve organik SEO birlikte düşünülür. Varsayım yapma, marka karakterini pazar yerine çevirme, production veya Ads hesabına açık onaysız dokunma. P0.5 canlı kesimi `.net` dahil uygulanmıştır; public DNS/cache yakınsaması ve kabul matrisi izlenmektedir. SH hosting iptali ayrı kapıdır. P1 henüz başlamamıştır.
