# Vakitmatik SEO Audit

Audit tarihi: 2026-06-28

## URL Envanteri

| URL | Amaç | Index | Canonical | Not |
| --- | --- | --- | --- | --- |
| `https://www.vakitmatik.com.tr/` | Ana landing ve ürün vitrini | Evet | `/` | Birincil dönüşüm telefon/e-posta |
| `https://www.vakitmatik.com.tr/privacy/` | Mobil uygulama gizlilik politikası | Evet | `/privacy/` | App store güven ve uyumluluk sayfası |
| `https://www.vakitmatik.com.tr/support/` | Mobil uygulama destek sayfası | Evet | `/support/` | App store destek ve sorun giderme sayfası |
| `https://www.vakitmatik.com.tr/robots.txt` | Crawl yönergesi | N/A | N/A | Sitemap bildiriyor |
| `https://www.vakitmatik.com.tr/sitemap.xml` | URL keşfi | N/A | N/A | 3 indexlenebilir URL içeriyor |

## Issue Listesi

| Öncelik | Alan | Durum | Kabul kriteri |
| --- | --- | --- | --- |
| P0 | Search Console | Tamamlandı | Domain property doğrulanır, sitemap gönderilir, 3 URL için URL Inspection çalışır |
| P1 | Bing/IndexNow | Tamamlandı | IndexNow key dosyası yayınlanır ve 3 URL Bing IndexNow API'ye gönderilir |
| P1 | Legal sayfa sosyal metadata | Kodda düzeltildi | `/privacy/` ve `/support/` kendi `og:title`, `og:url`, Twitter title değerlerini üretir |
| P1 | JSON-LD kapsamı | Kodda düzeltildi | Organization/WebSite tüm sayfalarda, ürün `ItemList` yalnızca ana sayfada görünür |
| P1 | Sosyal görsel formatı | Kodda düzeltildi | `og:image` PNG olarak `1200x630` servis edilir |
| P2 | Sitemap yönetimi | Kodda iyileştirildi | Sitemap URL'lerinde `lastmod` bulunur |
| P2 | Ürün içerik mimarisi | İçerik kararı bekliyor | Non-brand trafik hedeflenirse ürün detay URL'leri planlanır |
| P2 | Analytics | İş kararı bekliyor | GA4/Vercel Analytics kararı KVKK/gizlilik etkisiyle birlikte verilir |

## Keyword Map

| Sorgu | Niyet | Mevcut karşılık | Öneri |
| --- | --- | --- | --- |
| `vakitmatik` | Marka | Ana sayfa | Mevcut yapı yeterli |
| `cami saatleri` | Ürün araştırması | Ana title ve hero | Ana metinde daha açık ürün bağlamı korunmalı |
| `namaz vakti panosu` | Ürün araştırması | Ürün kartları ve metadata | İleride ayrı ürün/kategori sayfası açılabilir |
| `cami vakit ekranı` | Ürün araştırması | Keywords ve ürün vitrini | İçerikte doğal kullanım artırılabilir |
| `vakitmatik led` | Spesifik ürün | Ana sayfa anchor | Non-brand hedeflenirse `/urunler/vakitmatik-led/` önerilir |
| `akıllı cami otomasyon` | Proje hizmeti | Ana sayfa bölümü | Talep artarsa ayrı hizmet sayfası önerilir |

## Teknik Remediation

- Metadata: Sayfa bazlı title, description, canonical, Open Graph ve Twitter alanları tek SEO helper üzerinden yönetiliyor.
- Structured data: Site-genel Organization/WebSite layout'ta kalıyor; ürün ItemList ana sayfaya taşındı.
- Sosyal paylaşım: `public/images/og-vakitmatik.png` eklendi; SVG yedek olarak korunuyor.
- Sitemap: `lastmod` değerleri eklendi; canonical host `https://www.vakitmatik.com.tr` ile uyumlu.
- Dış servisler: Search Console domain property doğrulandı; Bing için hesap bağlamadan IndexNow kullanıldı.

## 30 Günlük Takip

1. Gün 0: Search Console domain doğrulama, sitemap gönderimi, URL Inspection ve IndexNow bildirimi.
2. Gün 3-7: Coverage, crawl ve sitemap keşif durumunu kontrol et.
3. Gün 7-14: Branded sorgular için impression/click görünmeye başladı mı kontrol et.
4. Gün 14-30: Non-branded sorguları, Core Web Vitals ve en çok gösterim alan sayfaları izle.
5. Gün 30: Ürün detay sayfalarına gerek var mı karar ver.

## Lighthouse Baseline

Ölçüm tarihi: 2026-06-28

| Strateji | Performance | SEO | Accessibility | Best Practices | FCP | LCP | CLS | TBT | Speed Index |
| --- | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- |
| Mobile | 95 | 100 | 100 | 100 | 1.1 s | 2.6 s | 0 | 10 ms | 4.0 s |
| Desktop | 98 | 100 | 100 | 100 | 0.6 s | 1.0 s | 0 | 0 ms | 1.3 s |

## Manuel Checklist

- Google Search Console'da domain property doğrulandı.
- `https://www.vakitmatik.com.tr/sitemap.xml` sitemap'i Search Console'da başarılı durumda.
- `/`, `/privacy/`, `/support/` için URL Inspection ve request indexing çalıştırıldı.
- Bing için `https://www.vakitmatik.com.tr/6e7827fabcf95fe208dfd49c8cd2ab0c.txt` IndexNow key dosyası yayınlandı ve URL bildirimi yapıldı.
- Google Business Profile'da ad, telefon, adres, web sitesi ve çalışma saatlerini doğrula.
- Sosyal paylaşım önizlemesini WhatsApp, LinkedIn ve X/Twitter kartlarında kontrol et.

## Kaynaklar

- [Google SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide)
- [Google Sitemaps](https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview)
- [Google Canonical URLs](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls)
- [Google Structured Data](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data)
- [Google Core Web Vitals](https://developers.google.com/search/docs/appearance/core-web-vitals)
- [IndexNow Documentation](https://www.indexnow.org/documentation)
