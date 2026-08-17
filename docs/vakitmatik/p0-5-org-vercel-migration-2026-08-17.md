# Paket P0.5 — Vakitmatik.org ve Vakitmatik.net Vercel Geçişi

Hazırlanma tarihi: `2026-08-17`

Durum: `Canlı kesim uygulandı — DNS/cache yakınsaması izleniyor; SH hosting korunuyor`

## Amaç ve sahibi onaylı sınır

`SAHİBİ ONAYLADI`

- `vakitmatik.org` alan adı kaydı ve yıllık yenilemesi SH'de kalacak.
- Eski `.org` web sitesi Vercel'deki bağımsız yönlendirme projesiyle
  `https://www.vakitmatik.com.tr` alan adına taşınacak.
- Çalışmayan `vakitmatik.net` alanının apex ve `www` girişleri aynı Vercel
  yönlendirme projesine alınacak.
- `vakitmatik.com.tr` ve `reksanreklam.com.tr` registrar transferi
  yapılmayacak.
- `.org` e-posta hizmeti taşınmayacak. Aktif Vakitmatik posta kanalı Google
  Workspace'teki `bilgi@vakitmatik.com.tr` olarak kalacak.
- SH hosting, canlı geçiş ve geri dönüş penceresi doğrulanmadan
  kapatılmayacak.
- P0.5, P1 ürün detay incelemesinden önce uygulanacaktır.
- Proje sahibi `.org` ve `.net` için canlı production/DNS yayınını 17 Ağustos
  2026'da ayrıca açıkça onayladı.

Hazırlık onayı canlı domain/DNS yayını veya SH hosting iptali değildi. Canlı
yayın daha sonra `.net` dahil ayrıca onaylandı ve uygulandı. SH hosting iptali
ise geri dönüş penceresi sonrasındaki ayrı açık onay kapısında kalır.

## Kanıtlanmış başlangıç durumu

`KANITLANDI — 2026-08-17`

- `vakitmatik.org` ve `www.vakitmatik.org` SH/LiteSpeed üzerinden `200`
  dönüyor; `.com.tr` yönlendirmesi henüz yok.
- `.org` nameserver'ları `ns1.sh.com.tr`–`ns4.sh.com.tr`; apex web ve posta
  kayıtları SH altyapısına bağlı.
- `vakitmatik.com.tr` ile `reksanreklam.com.tr` web ve DNS katmanı zaten
  Vercel'de; e-posta MX kayıtları Google Workspace'e gidiyor.
- Kullanıcının açtığı ana SH sahiplik hesabında `vakitmatik.org`,
  `vakitmatik.com.tr` ve `reksanreklam.com.tr` aktif/otomatik faturalı domainler
  olarak birlikte görünür. `.org` bitiş tarihi `2027-09-09`dur.
- Ana SH hesap yeniden denetlendiğinde iki ayrı aktif hosting hizmeti
  kanıtlandı. Eski `.org` sitesi cp25/`78.135.65.2` üzerindeki `Small —
  vakitmatik.org` hizmeti `83999` içindedir. `Small — vakitmatik.com.tr`
  hizmeti `96837` ise Plesk01/`78.135.65.11` üzerindedir ve ayrı bağımlılıklar
  taşır. İlerideki olası iptal hedefi yalnız `.org` hizmeti `83999` olabilir;
  `96837` bu paketin kapsamı değildir.
- SH ana hesap iletişim adresi ve Vercel kullanıcı adresi `@vakitmatik.org`
  kullanmıyor. `.org` mail kapanışı bu iki yönetim hesabını kilitlemez.
- Vercel `.com.tr` registrar transferini desteklemiyor. Kullanıcının
  sadeleştirilmiş hedefi doğrultusunda hiçbir registrar transferi
  yapılmayacak.
- Eski sitemap ve ek tarama envanterinde 64 karar satırı vardır. Yereldeki 10
  ürün detay route'u production'da `404` olduğu için yönlendirme hedefi
  değildir.

## Hazırlanan uygulama

Bağımsız ve bağımlılıksız yönlendirme katmanı:

- Kaynak: `apps/org-redirect/`
- Vercel proje adı: `vakitmatik-org-redirect`
- Framework/runtime/env gereksinimi: yok
- Yönlendirme türü: açık `301`
- Canonical hedef kökü: `https://www.vakitmatik.com.tr`

Vercel'de yeni projenin varsayılan `vercel.app` aliasına bağlı izole doğrulama
deployment'ı oluşturuldu. `vakitmatik.org`, `www.vakitmatik.org`,
`mail.vakitmatik.org`, `vakitmatik.net` ve `www.vakitmatik.net` projeye özel
domain olarak bağlandı. Varsayılan Vercel adresleri hesap giriş korumasında
kalırken custom domainlerin bu koruma dışında olduğu edge testinde doğrulandı.

## URL grupları

| Eski `.org` yolu | Geçici/nihai canlı hedef |
| --- | --- |
| `/`, `/index.html` | `https://www.vakitmatik.com.tr/` |
| `/urunler/vakitmatik.html`, `/urunler/vakitmatik/*` | `/cami-saati/` |
| `/fiyatlist/*` | `/cami-saati-fiyatlari/` |
| `/urunler/ayet-hadis.html`, `/urunler/cami-ayet-hadis/*` | `/ayet-hadis-panosu/` |
| `/iletisim.html` | `/#iletisim` |
| `/gizlilik-politikasi.html` | `/privacy/` |
| `/programlar.html`, `/kilavuzlar.html`, `/update/*` | `/destek/vakitmatik-ayarlama/` |
| Ezanmatik, karşılıksız ve bilinmeyen yollar | `/` |
| `/robots.txt`, `/sitemap.xml` | Yeni canonical dosyalar |

Ürün detay hedefleri production'da `200` olduktan ve ürün sayfaları ayrıca
onaylandıktan sonra model URL'leri kategori hedefinden ilgili detay hedeflerine
ayrı pakette daraltılabilir.

## Doğrulama sonucu

`KANITLANDI`

- Yapılandırma ve envanter testleri: `25/25` başarılı.
- 64 eski URL satırının tamamı bir yönlendirme sonucuna ulaşıyor.
- Bütün kurallar açık `301`; duplicate kaynak veya `.org`a dönen hedef yok.
- Catch-all kuralı son sırada.
- Bütün hedefler doğrulanmış canlı hedef allowlist'inde.
- Vercel edge testi; ana sayfa, robots, fiyat, ürün, Ayet/Hadis, destek ve
  bilinmeyen yol örneklerinde `301` ile doğru mutlak `Location` verdi.
- Proje koruması `all_except_custom_domains` olarak doğrulandı; custom domain
  üzerinde Vercel SSO ekranı çıkmaması canlı kabul kriteridir.
- Query parametresi edge testinde korundu.
- Sekiz benzersiz son hedefin tamamı `200` döndü ve başka bir hosta
  sapmadı.
- Beş custom host projeye bağlandı. Vercel zone'larında apex ve gerekli
  `www`/`mail` web kayıtları; Null MX, SPF `-all` ve DMARC `reject` hazırlandı.
- `.org` apex/www/mail SAN sertifikası ve `.net` apex/www SAN sertifikası
  üretildi. Beş host da Vercel edge üzerinde geçerli TLS, SSO'suz doğrudan
  `301` ve doğru `.com.tr` hedefi verdi.
- SH sahibi panelinde `.org` ve `.net` için yalnız `ns1.vercel-dns.com` ve
  `ns2.vercel-dns.com` kaydedildi. Her iki TLD parent delegasyonu ve RDAP kaydı
  Vercel nameserver'larına geçti.
- SH hosting, `.com.tr` production deployment'ı, Google Ads ve Search Console
  değiştirilmedi.

## Bilinen riskler

1. Ezanmatik ve karşılıksız yolları ana sayfaya göndermek, Google tarafından
   soft-404 gibi değerlendirilebilir. Bu, kullanıcının bütün düşük öncelikli
   sayfalar için yeni hedef üretmeme yönündeki sadeleştirme kararının bilinen
   SEO bedelidir.
2. Eski USB/RS232/program/kılavuz ve indirilebilir dosyaları genel ayarlama
   desteğine göndermek birebir içerik eşleşmesi değildir. Dosyalar güvenlik ve
   uyumluluk doğrulaması yapılmadığı için yeni domaine kopyalanmaz.
3. Kalıcı `301` tarayıcılar ve botlar tarafından cache'lenebilir. Bu nedenle
   DNS öncesi edge matrisi ve geri dönüş kaydı zorunludur.
4. `.org` e-posta taşınmayacağı için eski `@vakitmatik.org` adreslerine gönderim
   teslim edilmeyecektir. Web yönlendirmesi e-postayı yönlendirmez.
5. Güncel Search Console credential'ları boş olduğu için API üzerinden site
   taşıma snapshot'ı alınamıyor. Search Console sahipliği/Change of Address
   ayrı dış sistem kontrolüdür.
6. `vakitmatik.net` geçiş öncesinde SH nameserver'larına delege fakat zonesuzdu;
   DNS `SERVFAIL` veriyor, web/MX çalışmıyor ve güncel `site:` sonucu
   bulunmuyordu. Proje sahibi alanı canlı kapsama açıkça ekledi. Eski delegation
   TTL'i `172800` olduğu için bazı recursive resolverlarda eski `SERVFAIL`
   önbelleği 48 saate kadar sürebilir.
7. `.org` eski web/MX/CNAME kayıtlarının TTL'i `14400` iken canlı kesim
   uygulandı. Eski cache'ler yaklaşık dört saat SH sitesini göstermeye devam
   edebilir; bu aralıkta eski hosting açık tutulur. Hazırlık runbook'undaki
   `TTL 300 + 24 saat bekleme` adımı uygulanmış kabul edilemez.
8. Doğrudan HTTPS girişleri tek `301` ile canonical `.com.tr` hedefine gider.
   Vercel HTTP'yi önce aynı hostun HTTPS sürümüne platform düzeyinde `308`
   yönlendirdiği için düz HTTP girişlerinde toplam iki yönlendirme vardır.

## Canlı geçiş uygulama kaydı

Canlı yayın onayından sonra uygulanan koordineli pencere:

1. SH authoritative DNS başlangıcı, canlı URL/dosya envanteri ve geri dönüş
   nameserver'ları kaydedildi. Tam off-server cPanel hesap yedeği bu kesimde
   alınmadı; hosting iptal paketinin zorunlu önkoşulu olarak kaldı.
2. Registrar/Vercel yönetim adreslerinin `@vakitmatik.org` posta kutusuna
   bağlı olmadığı doğrulandı. Google Search Console erişimi ayrı blokajda
   kaldı.
3. SH zone başlangıcı kaydedildi. Mevcut web/MX/CNAME TTL'i `14400` olarak
   kaldı; cache etkisi eski hosting açık tutularak yönetildi.
4. Vercel projesine `.org` apex/www/mail ile `.net` apex/www bağlandı.
5. `.org` ve `.net` için e-posta kullanılmadığını ilan eden Null MX, SPF
   `-all` ve DMARC `p=reject; sp=reject; adkim=s; aspf=s` kayıtları hazırlandı;
   eski SH mail kayıtları taşınmadı.
6. Vercel'in verdiği üç `.org` ACME TXT kaydı SH zone'a eklendi; dört SH
   authoritative sunucusunda doğrulandı ve apex/www/mail sertifikası kesimden
   önce üretildi. `.net` eski zone'u bulunmadığından sertifika nameserver
   kesiminden hemen sonra Vercel TXT kayıtları üzerinden üretildi.
7. Registrar SH'de kalırken `.org` ve `.net` nameserver'ları Vercel DNS'e
   çevrildi.
8. Beş host; HTTP/HTTPS, query ve temsilî güçlü/bilinmeyen yollar Vercel edge
   üzerinde test edildi. HTTPS doğrudan `301`; HTTP ise Vercel `308` HTTPS
   yükseltmesinden sonra `301` verir. Public recursive-resolver kabulü cache
   yakınsaması boyunca sürer.
9. Son hedeflerde `200`, doğru canonical/indexlenebilirlik ve döngüsüzlük edge
   testinde doğrulandı.
10. Search Console credential'ları boş olduğu için Change of Address
    uygulanmadı; ayrı blokaj olarak kaldı.

## Geri alma ve SH hosting iptali

- DNS öncesi geri dönüş noktası SH nameserver ve zone kaydıdır.
- Canlı geçişte kritik hata görülürse `.org` nameserver'ları kayıtlı SH
  değerlerine geri çevrilir; eski hosting bu sırada açık kalır.
- DNS yayılımı ve cache nedeniyle geri dönüş anlık olmayabilir.
- SH'deki `Small — vakitmatik.org` hizmeti `83999` en az yedi günlük sağlıklı
  canlı gözlemden ve tam cPanel yedeği/bağımlılık denetiminden sonra ayrı ve
  açık iptal onayıyla kapatılabilir. `Small — vakitmatik.com.tr` hizmeti
  `96837` bu iptal kapsamına alınmaz.
  İptal yalnız hosting hizmetini hedefler; alan adı kayıtları/yenilemeleri
  SH'de kalır.

## Sıradaki ayrı kapı

Canlı DNS/cache yakınsaması ve en az yedi günlük gözlem tamamlandıktan sonra
yalnız `.org` hosting hizmeti `83999` için tam yedek, bağımlılık denetimi ve
iptal kararı ayrı iş paketi olarak sunulur. Bu P0.5 yayını hosting iptalini
onaylamaz.
