# Vakitmatik Karar ve Açık Soru Kaydı

Sürüm: `0.5-draft`

Son güncelleme: `2026-08-17`

Bu dosya yaşayan karar kaydıdır. Kullanıcı tarafından onaylanmamış taslak kayıtlar `TASLAK` olarak kalır.

## Onaylanmış sahip kararları

| Kimlik | Karar | Durum | Kaynak tarihi |
| --- | --- | --- | --- |
| D-001 | Vakitmatik bütün sistemin ilk ve ana önceliğidir | Sahibi onayladı | 2026-07-22 |
| D-002 | Her iş paketi sonunda kullanıcı onayı alınır; varsayımla kamuya açık karar uygulanmaz | Sahibi onayladı | 2026-07-22 |
| D-003 | Ajan gerektiğinde veriye dayalı muhalefet eder ve ortak orta yol aranır | Sahibi onayladı | 2026-07-22 |
| D-004 | Kuzey yıldızı sipariştir | Sahibi onayladı | 2026-07-22 |
| D-005 | Ana ticari aramalar `cami saati`, `cami saati fiyatları` ve `vakitmatik`; `camii` varyasyonları da izlenir | Sahibi onayladı | 2026-07-22 |
| D-006 | Bütün alıcı türleri potansiyel müşteridir; yapay persona önceliği kurulmaz | Sahibi onayladı | 2026-07-22 |
| D-007 | Sitede sayısal fiyat listesi yayımlanmaz; müşteri WhatsApp veya telefonla iletişime geçsin istenir | Sahibi onayladı | 2026-07-22 |
| D-008 | Firma 1996'dan beri faaliyet gösterir | Sahibi onayladı | 2026-07-22 |
| D-009 | Vakitmatik al-satçı değil, ileri mühendislik geliştirebilen üreticidir | Sahibi onayladı | 2026-07-22 |
| D-010 | Mobil uygulama yeni nesil ürünlerin temel üstünlüğüdür; mağaza/APK dağıtım ayrıntısı müşteri mesajı değildir | Sahibi onayladı | 2026-07-22 |
| D-011 | Eski RS232 cihaz süreci yeni ürün satış anlatımında öne çıkarılmaz | Sahibi onayladı | 2026-07-22 |
| D-012 | Türkiye ana pazar, Almanya öncelikli Avrupa ikincil pazardır | Sahibi onayladı | 2026-07-22 |
| D-013 | Avrupa doğrudan kargo yöntemi henüz kesin değildir ve doğrulanmadan vaat edilmez | Sahibi onayladı | 2026-07-22 |
| D-014 | Model önceliği; arama verisi ve firmanın satmak istediği ürünler birlikte ele alınan ayrı fazdır | Sahibi onayladı | 2026-07-22 |
| D-015 | Rakiplere çamur atılmaz; fark müşteri sonucu üzerinden anlatılır | Sahibi onayladı | 2026-07-22 |
| D-016 | Production ve Google Ads değişiklikleri ayrı açık onay gerektirir | Sahibi onayladı | Önceki plan + 2026-07-22 |
| D-017 | Eski Desenli Mavi/Siyah, Vakit 57/38, Yatay, Resimli, 57 Mesajlı, 38 Mesajlı ve Vakit 100 ürün ailelerinin güncel karşılıkları sırasıyla Desen Mavi/Siyah, Dikey, Yatay, Resimli, Kayan Yazı, Mesaj ve LED'dir | Sahibi onayladı | 2026-07-29 |
| D-018 | Eski Vakit 38 küçük boy ölçüsü `38 × 58` iken güncel Dikey küçük boy ölçüsü zaman içinde `40 × 60` olarak değişmiştir | Sahibi onayladı | 2026-07-29 |
| D-019 | Desenli Beyaz, Sabah Duruş ve Vakit 38 Günlü güncel ürün portföyünde yoktur | Sahibi onayladı | 2026-07-29 |
| D-020 | Dikey bağımsız ürün sayfası ana sayfadaki mevcut Dikey bölümünü ve aynı ürün veri kaynağını yeniden kullanır; logo ana sayfaya, alttaki tek `Tüm ürünler` bağlantısı ana sayfanın ürün bölümüne gider. Bu onay diğer modellere veya production yayınına otomatik uygulanmaz | Sahibi onayladı | 2026-07-29 |
| D-021 | Paket P0 kaynak–canlı–karar baseline konsolidasyonu sınırlarıyla onaylandı; bu onay production, Google Ads mutasyonu, `.org` yönlendirmesi veya P1 başlangıcı değildir | Sahibi onayladı | 2026-08-17 |
| D-022 | Paket P0 sonucu onaylandı ve paket tamamlandı; P1 henüz başlamadı ve ayrı kapsam/yön onayı gerektirir | Sahibi onayladı | 2026-08-17 |

## Kanıtlanmış mevcut durum

| Kimlik | Bulgu | Kanıt | Tarih |
| --- | --- | --- | --- |
| E-001 | 9–22 Temmuz Ads: 3.250 gösterim, 430 tıklama, 6.339,65 TL harcama, 0 dönüşüm | Google Ads API v24 salt okunur sorgu | 2026-07-22 |
| E-002 | 430 tıklamanın 404'ü mobil | Google Ads API v24 | 2026-07-22 |
| E-003 | Etkin reklamlar ana sayfaya gidiyor | Google Ads API v24 reklam snapshot'ı | 2026-07-22 |
| E-004 | Ana satış/fiyat/pano kelimelerinde landing deneyimi `BELOW_AVERAGE` | Google Ads API v24 keyword quality info | 2026-07-22 |
| E-005 | Reklam veren müşteri hesabında dönüşüm aksiyonu görünmüyor | Google Ads API v24 conversion action sorgusu | 2026-07-22 |
| E-006 | Kod WhatsApp tıklamasını ölçmüyor; telefon/e-posta olayları mevcut | `src/components/GoogleTag.tsx` | 2026-07-22 |
| E-007 | Eski organik sayfalarda SEO ve ana sayfaya geçişi anlatan müşteri dışı uzun metinler var | `src/data/seoLandingPages.ts` | 2026-07-22 |
| E-008 | `camii saatleri` gerçek gösterim ve tıklama alıyor | Google Ads arama terimleri ve keyword verisi | 2026-07-22 |
| E-009 | Canlı production deployment `dpl_54riDvXkHPwR2UpRbTTu4J7FUYr3`, Git SHA `108cb91` ve `gitDirty: 1` metadata'sı taşır | Vercel CLI/API salt-okunur denetimi | 2026-08-17 |
| E-010 | Sekiz canonical route canlıda 200/indexlenebilir; preview noindex; 10 yerel ürün route'u canlıda 404 ve sitemap dışıdır | Canlı HTTP, HTML canonical/robots ve sitemap denetimi | 2026-08-17 |
| E-011 | App Store ve Google Play kartları canlı ana sayfada doğru Vakitmatik mağaza hedeflerine gider | Canlı DOM ve mağaza GET denetimi | 2026-08-17 |
| E-012 | Telefon ve WhatsApp `send_to` değerleri hedef Ads hesabındaki etkin primary conversion action'ların tag snippet'leriyle birebir eşleşir | Google Ads API v24 salt-okunur GAQL + canlı asset karşılaştırması | 2026-08-17 |
| E-013 | 20 Temmuz–16 Ağustos dönemindeki 3 conversionın tamamı telefondur; WhatsApp 0'dır | Google Ads API v24 salt-okunur metrics sorgusu | 2026-08-17 |
| E-014 | Temel Google tag öneki, telefon/WhatsApp conversion destination önekinden farklıdır; bu açık conversion hedefini bozduğu kanıtlanmış hata değildir, ancak genel olaylar için split-routing riski taşır | Canlı HTML/JS, yerel env biçimi ve Ads API tag snippet denetimi | 2026-08-17 |
| E-015 | GSC için gerekli dört env kaydı hem yerelde hem production'da vardır fakat boştur; güncel snapshot alınamaz | Yerel env ad/değer-doluluğu ve Vercel production env salt-okunur denetimi | 2026-08-17 |
| E-016 | Karışık çalışma ağacı canlı eşdeğer, yalnız yerel ürün detail, dashboard/Ads aracı ve dokümantasyon commitlerine ayrıldı | Git diff, partial staging ve commit denetimi | 2026-08-17 |

E-001–E-008 tarihsel Temmuz snapshot'ıdır. Özellikle E-005 ve E-006, daha sonra kurulan conversion action'ları ve WhatsApp ölçüm kodundan önceki durumu anlatır; güncel durum için E-012–E-014 esas alınır.

## Açık sorular ve ertelenmiş kararlar

| Kimlik | Konu | Neden açık? | Bağlı faz |
| --- | --- | --- | --- |
| Q-001 | WhatsApp'ta kapanan siparişin en hafif nasıl kaydedileceği | Siparişler yalnız WhatsApp konuşmalarında; reklam bağlantısı yok | Faz 1 |
| Q-002 | Telefon siparişinin reklam tıklamasıyla nasıl ilişkilendirileceği | Tıklama ölçülebilir, gerçek sipariş bağlantısı yok | Faz 1 |
| Q-003 | Model satış/strateji önceliği | Kullanıcı ayrı ve geniş çalışma olarak belirledi | Faz 6 |
| Q-004 | Yeni nesil destek içeriklerinin gerçek adımları | Eski ve yeni cihaz süreçleri farklı | Faz 5 |
| Q-005 | Eski cihaz desteğinin herkese açık kapsamı | Satış mesajını geriye çekmeden destek sağlanmalı | Faz 5 |
| Q-006 | Avrupa doğrudan lojistik sağlayıcısı ve maliyeti | FedEx/DHL araştırması tamamlanmadı | Faz 7 |
| Q-007 | Gerçek sipariş sayısının Ads dönemine bağlanması | Kullanıcı hareket gözlemliyor ancak kesin sayı yok | Faz 1 ve Faz 8 |
| Q-008 | Temel Google tag ile hedef Ads tag'inin Google Tag yönetiminde connected/combined durumu | Ads API açık `send_to` hedeflerini doğruluyor; tag destination bağlantısını göstermiyor | Ayrı ölçüm doğrulaması |
| Q-009 | WhatsApp conversionının 0 olma nedeni | Kod, canlı asset ve Ads action doğru; gerçek talep yokluğu ile event teslim sorunu ayrışmadı | Ayrı gerçek cihaz testi |
| Q-010 | Search Console OAuth bilgilerinin güvenli kaynağı | Yerel ve production kayıtları boş; kullanıcıdan secret istenmeden mevcut yetkili kaynak belirlenmeli | Ayrı GSC yapılandırma paketi |
| Q-011 | Bare HTTPS hostun www'ye `307` yönlendirmesinin kalıcılaştırılması | Canonical www'ye doğru; redirect türü değişikliği Vercel/SEO dış sistem kararıdır | Teknik SEO paketi |

## Yasaklı varsayımlar

- Fiyatı kurulum veya danışmanlık etkiler denemez; kullanıcı bunu doğrulamadı.
- Firma müşteriye model seçme danışmanlığı sunuyor gibi yazılamaz.
- Bütün model özellikleri birbirine otomatik kopyalanamaz.
- Avrupa'ya DHL/FedEx ile gönderim hazırmış gibi yazılamaz.
- Eski cihazların teknik süreci yeni ürünün temel deneyimi gibi sunulamaz.
- Reklamın sipariş getirdiği kesin sayı olmadan kanıtlanmış gibi yazılamaz.
- Uzun metnin Google için zorunlu olduğu kabul edilemez.

## Değişiklik günlüğü

| Sürüm | Tarih | Değişiklik | Onay |
| --- | --- | --- | --- |
| 0.1-draft | 2026-07-22 | İlk kontrollü iş akışı, Vakitmatik anayasası, yol haritası ve karar kaydı hazırlandı | Bekliyor |
| 0.2-draft | 2026-07-29 | OSEO-2 Karar Kapısı 1 ürün eşleşmeleri, ölçü değişikliği ve güncel portföyde olmayan üç eski ürün kaydedildi | Sahibi onayladı |
| 0.3-draft | 2026-07-29 | Dikey bağımsız ürün sayfasının ana sayfa bölümünü yeniden kullanan görsel ve içerik yönü kaydedildi | Sahibi onayladı |
| 0.4-draft | 2026-08-17 | Paket P0 canlı/source/ölçüm/GSC baseline bulguları, commit ayrımı ve açık sorular kaydedildi | Sonuç onayı bekliyor |
| 0.5-draft | 2026-08-17 | Paket P0 sonuç onayı kaydedildi; paket tamamlandı ve P1 ayrı onay kapısında bırakıldı | Sahibi onayladı |
