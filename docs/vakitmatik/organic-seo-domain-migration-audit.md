# Vakitmatik Organik SEO — Alan Adı Taşıma Denetimi

Hazırlanma tarihi: `2026-07-27`  
Çalışma dalı: `codex/google-ads-landing-quality`  
Kaynak commit: `1768d4e`  
Durum: `Salt okunur denetim tamamlandı; yönlendirme veya dış sistem değişikliği yapılmadı`

## Doğrulanmış sahiplik

- `SAHİBİ ONAYLADI`: `vakitmatik.org` kullanıcıya aittir.
- `SAHİBİ ONAYLADI`: `reksanreklam.com.tr` kullanıcıya aittir.
- `AÇIK SORU`: `vakitmatik.org` LiteSpeed hosting/cPanel/FTP erişiminin hangi hesapta olduğu henüz doğrulanmadı.
- `AÇIK SORU`: Eski ve yeni alan adlarının aynı Google hesabında Search Console `owner` yetkisiyle doğrulanıp doğrulanmadığı canlı olarak kontrol edilemedi.

## Yönetici özeti

Organik görünürlüğün önündeki en büyük sorun yeni sayfaların kısa olması değil, eski ve yeni alan adlarının birlikte çalışmasıdır.

- `vakitmatik.org` eski ürün, destek, program, kılavuz ve PDF ağıyla Google'da hâlâ güçlüdür.
- Hem `https://vakitmatik.org/` hem `https://www.vakitmatik.org/` eski siteyi `200` ile sunmaktadır.
- Eski sayfalarda canonical bulunmamaktadır.
- Eski sitede yeni siteye verilen bağlantı vardır; fakat sunucu taraflı kalıcı yönlendirme olmadığı için bu bir alan adı taşıması değildir.
- `mail.vakitmatik.org/index.html` aynı sitenin indekslenebilir kopyasını sunmaktadır ve TLS sertifikası bu alt alan adıyla eşleşmemektedir.
- Eski sitemap 51 URL içerir. Site içi taramada ayrıca sitemap dışında PDF, APK, MSI, EXE ve RAR dosyaları bulundu.
- Yeni `.com.tr` sitesinde eski URL'lerin tamamı için birebir karşılık henüz yoktur. Özellikle Ezanmatik, eski RS232/USB cihaz desteği, kılavuzlar ve indirilebilir programlar hazırlanmadan bütün eski URL'leri ana sayfaya göndermek doğru değildir.

Google'ın site taşıma rehberi eski URL'lerin ilgili yeni URL'lerle eşlenmesini, alakasız toplu ana sayfa yönlendirmelerinden kaçınılmasını ve indirilebilir dosyaların da envantere dahil edilmesini önerir:

- <https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes>
- <https://support.google.com/webmasters/answer/9370220>

## Alan adlarının görev ayrımı

### `vakitmatik.com.tr`

Vakitmatik'in ana ve öncelikli sitesi olacaktır:

- Vakitmatik marka aramaları
- Cami saati ve camii saati aramaları
- Cami saati modelleri
- Cami saati fiyat niyeti
- Ayet, hadis, Esmaül Hüsna ve cami mesaj panoları
- Yeni nesil mobil güncelleme
- Eski Vakitmatik cihazları için kontrollü destek arşivi

### `vakitmatik.org`

Geçici olarak eski içerik kaynağıdır. Yeni karşılıklar hazırlandıktan sonra URL bazlı kalıcı yönlendirmelerle `.com.tr`ye taşınmalıdır. Taşıma tamamlandıktan sonra eski içerik ayrıca indekslenebilir biçimde bırakılmamalıdır.

### `reksanreklam.com.tr`

Tamamı Vakitmatik'e yönlendirilmemelidir. Reksan daha geniş bir ürün kapsamına sahiptir:

- Genel LED ekranlar
- Döviz, kuyumcu, benzin, otel ve eczane panoları
- Fabrika ve Andon sistemleri
- Skorbordlar
- Genel dijital saatler
- Cephe reklamları
- Özel elektronik/devre tasarımları

Reksan'daki cami panoları bölümünden Vakitmatik'in ilgili kategori sayfalarına doğal bağlantı verilmesi önerilir. Bu ayrı bir Reksan iş paketidir.

## URL envanteri

Eski sitemap'teki 51 URL'nin satır bazlı önerisi:

- [`organic-seo-vakitmatik-org-url-map.csv`](./organic-seo-vakitmatik-org-url-map.csv)

Sınıfların anlamı:

- `HAZIR_HEDEF`: Yeni sitede ilgili ve indekslenebilir hedef vardır.
- `YENI_SAYFA_GEREKLI`: Yönlendirmeden önce yeni sitede gerçek karşılık hazırlanmalıdır.
- `URUN_KARARI_GEREKLI`: Eski ürünün hâlâ satılıp satılmadığı ve hangi yeni modele karşılık geldiği kullanıcı tarafından doğrulanmalıdır.
- `ESKI_DESTEK_GEREKLI`: İçerik yeni satış anlatımına karıştırılmadan eski cihaz desteği olarak korunmalıdır.
- `DOSYA_INCELEMESI`: Dosya yeni domaine taşınmadan önce güncellik, güvenlik ve ürün uyumu kontrol edilmelidir.
- `REKSAN_HEDEFI_GEREKLI`: İçerik Vakitmatik değil, Reksan ürün ailesine aittir.

## Sitemap dışında bulunan indirilebilir dosyalar

Tarama sırasında aşağıdaki ek dosyalar bulundu:

### Vakitmatik veya Ezanmatik ile ilişkili; manuel inceleme gerekli

- `/update/81-İl.rar`
- `/update/Data/kk/MesajVakitLedKK.pdf`
- `/update/Data/kk/ReksanEKSKK.pdf`
- `/update/Data/kk/ReksanEzanmatik-Kullanma-Kılavuzu.pdf`
- `/update/Data/kk/ReksanEzanmatikKK.pdf`
- `/update/Data/kk/SAAT-KUMANDA.pdf`
- `/update/Data/kk/VakitMatik-V4.pdf`
- `/update/Data/kk/Vakitmatik-Bluetooth-KK.pdf`
- `/update/Data/prg/REKSANEZANMATIK.exe`
- `/update/Data/prg/ReksanVakit2020Setup.msi`
- `/update/Data/prg/VakitYukle.exe`
- `/update/Data/prg/app-release.apk`

Bu dosyalar imza, sürüm, güncellik, zararlı yazılım taraması ve hangi cihaz nesline ait oldukları doğrulanmadan yeni alan adına taşınmamalıdır.

### Reksan ürün ailesine ait; Vakitmatik'e taşınmamalı

- `/update/Data/prg/Doviz.rar`
- `/update/Data/prg/ReksanNobet.exe`
- `/update/Data/prg/SuperPano.rar`
- `/update/Data/prg/P3200.exe` — ürün kapsamı ayrıca doğrulanmalı

## Eski içerikte görülen ticari riskler

- Bazı eski ürün sayfalarında `6 yıl garanti` yazmaktadır; yeni sitede doğrulanmış güncel garanti `3 yıl`dır.
- Bazı eski sayfalarda eski İstanbul adresi ve sabit telefon yer almaktadır.
- Bazı güncelleme sayfaları 2020/2021 namaz vakti dosyalarına referans vermektedir.
- USB, RS232, kumanda ve mobil uygulama kullanan cihaz nesilleri aynı içerik altında karışmaktadır.
- Eski fiyat PDF'i hâlâ erişilebilir durumdadır; güncel fiyat politikasıyla çelişebilir.

Bu nedenle eski içerik yeni siteye kopyala-yapıştır yapılmamalıdır. Faydalı eski cihaz desteği korunmalı, fakat güncel satış sayfalarından açıkça ayrılmalıdır.

## Teknik uygulama katmanı

`vakitmatik.org` LiteSpeed üzerinde çalışmaktadır. En güvenli taşıma yöntemi, eski hostingin kök `.htaccess` dosyasında URL bazlı `301` yönlendirmeleridir.

DNS'in doğrudan Vercel'e çevrilmesi şu aşamada önerilmez:

- `.org` MX kaydı doğrudan apex alan adına bağlıdır.
- `mail.vakitmatik.org` apex'e bağlıdır.
- SPF, DKIM, webmail, autodiscover, autoconfig ve hosting servisleri aynı altyapıyı kullanıyor olabilir.
- Apex veya nameserver değişikliği e-posta hizmetini kesebilir.

Yönlendirme için DNS değişikliğine gerek yoktur. Eski hostingte yalnız web istekleri yönlendirilerek e-posta kayıtları korunabilir.

## Önerilen kontrollü uygulama sırası

### Paket OSEO-1 — Yeni sitede canonical temizlik

Görünür tasarım ve metni değiştirmeden:

1. `/urunler/vakitmatik-cami-saati/` adresini `/cami-saati/` adresine kalıcı yönlendirmek.
2. Eski duplicate URL'yi sitemap'ten ve dahili yapılandırılmış referanslardan çıkarmak.
3. Statik sitemap'i yalnız canonical URL'lerden üretilen otomatik sitemap'e çevirmek.
4. `/cami-saati/` sayfasındaki `manufacturer` şema tipini düzeltmek.
5. Build, lint, sitemap, canonical, şema ve redirect testlerini çalıştırmak.

Bu paket eski alan adına, production'a, Search Console'a, Ads'e veya görünür sayfa tasarımına dokunmaz.

### Paket OSEO-2 — Yeni hedef sayfaların kararı

- Mevcut on Vakitmatik modelinin premium detay sayfaları
- Ezanmatik ürün ailesinin güncel durumu
- Eski ve yeni cihazları ayıran destek mimarisi
- Kılavuz/program dosyalarının güvenli arşivi
- Artık satılmayan eski modeller için ilgili kategori veya halef ürün kararı

Her sayfa ve ürün eşlemesi kullanıcı onayından geçer.

### Paket OSEO-3 — Eski domain yönlendirme hazırlığı

- Onaylı 51+ URL haritası
- `.htaccess` kural dosyası
- Mail ve DNS dokunulmazlık kontrolü
- Temsilî URL'lerde dry-run ve tek yönlendirme adımı testi
- Geri alma için eski `.htaccess` yedeği

### Paket OSEO-4 — Canlı alan adı taşıması

Ayrı açık onaydan sonra:

- URL bazlı `301` yönlendirmeleri açılır.
- Eski `www`, non-`www`, HTTP ve HTTPS varyantları test edilir.
- `mail.vakitmatik.org` web kopyası güvenli biçimde kaldırılır veya yönlendirilir; mail hizmeti ayrıca test edilir.
- Yeni sitemap gönderilir.
- Search Console Change of Address işlemi uygulanır.
- Eski URL, yeni URL, indeks ve sıralama takibi başlatılır.

Google işlemleri ve production yönlendirmeleri bu denetim belgesinin onayıyla otomatik olarak yetkilendirilmiş sayılmaz.

## Geri dönüş

Bu denetim paketinde canlı veya dış sistem değişikliği yapılmadığı için operasyonel geri alma gerekmemektedir. Oluşturulan iki iç doküman silinerek repo başlangıç durumuna dönülebilir. Sonraki teknik paketlerde ayrıca commit ve deployment geri dönüş noktası oluşturulacaktır.
