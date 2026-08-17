# Paket P0.5 — Vakitmatik.org Vercel Geçiş Hazırlığı

Hazırlanma tarihi: `2026-08-17`

Durum: `Hazırlık tamamlandı — canlı domain/DNS yayını onayı bekleniyor`

## Amaç ve sahibi onaylı sınır

`SAHİBİ ONAYLADI`

- `vakitmatik.org` alan adı kaydı ve yıllık yenilemesi SH'de kalacak.
- Eski `.org` web sitesi Vercel'deki bağımsız yönlendirme projesiyle
  `https://www.vakitmatik.com.tr` alan adına taşınacak.
- `vakitmatik.com.tr` ve `reksanreklam.com.tr` registrar transferi
  yapılmayacak.
- `.org` e-posta hizmeti taşınmayacak. Aktif Vakitmatik posta kanalı Google
  Workspace'teki `bilgi@vakitmatik.com.tr` olarak kalacak.
- SH hosting, canlı geçiş ve geri dönüş penceresi doğrulanmadan
  kapatılmayacak.
- P0.5, P1 ürün detay incelemesinden önce uygulanacaktır.

Bu hazırlık onayı canlı domain/DNS yayını veya SH hosting iptali değildir. Bu
iki geri dönüş riski farklı işlem gruplarıdır ve ayrı açık onay kapılarında
tutulur.

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
- Aynı ana hesapta tek aktif hosting hizmeti `Small (vakitmatik.com.tr)` adıyla
  görünür. Eski `.org` sitesi bu cPanel hesabına bağlıdır; bu nedenle ilerideki
  iptal hedefi `.org` adlı ayrı bir paket değil bu ortak hosting hizmetidir.
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
deployment'ı oluşturuldu. Vercel bu ilk deployment'ı proje içinde `production`
target olarak işaretledi; ancak hiçbir özel `.org` domaini projeye bağlanmadığı
için mevcut `.org` trafiği ve SH sitesi değişmedi. Varsayılan Vercel adresleri
hesap giriş korumasındadır; proje ayarı custom domainleri bu korumanın dışında
tutar, böylece canlı `.org` ziyaretçisinin giriş ekranı görmemesi beklenir ve
cutover kabul testinde ayrıca doğrulanır.

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
- `.org`, `www` veya `mail` custom domaini bağlanmadı; SH DNS, hosting, mail,
  Google Ads, Search Console ve `.com.tr` production deployment'ı değişmedi.

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
6. Ana SH hesapta ayrıca `vakitmatik.net` bulundu. Domain `2027-06-10`a kadar
   aktif ve SH nameserver'larına delege edilmiş olsa da SH zone'u bulunmadığı
   için şu anda DNS `SERVFAIL` verir; web/MX çalışmaz ve güncel `site:`
   aramasında sonuç görülmedi. Aynı Vercel redirect projesine alınması mantıklı
   görünür, fakat `.org` paketine sessizce eklenmez; canlı kapıda ayrı sahip
   kararı gerekir.

## Canlı geçiş kapısı

Canlı yayın onayından sonra tek koordineli pencerede:

1. SH web ve DNS başlangıç kayıtları ile statik site dosyalarının geri dönüş
   yedeği alınır.
2. Registrar/Vercel/Google hesap kurtarma veya yönetici adreslerinin
   `@vakitmatik.org` posta kutusuna bağlı olmadığı doğrulanır.
3. Mevcut 4–24 saatlik cache etkisini azaltmak için SH web/mail/TXT TTL'leri
   `300` saniyeye indirilir ve en az 24 saat beklenir.
4. Vercel projesine `vakitmatik.org`, `www.vakitmatik.org` ve indekslenmiş web
   kopyasını kapatmak için `mail.vakitmatik.org` bağlanır.
5. `.org` e-posta kullanılmadığını ilan eden Null MX, SPF `-all` ve DMARC
   `p=reject; sp=reject; adkim=s; aspf=s` kayıtları hazırlanır; eski SH mail
   kayıtları taşınmaz.
6. Vercel'in istediği doğrulama kaydı SH zone'a eklenerek apex/www/mail SSL
   sertifikalarının nameserver kesiminden önce hazır olması hedeflenir.
7. Registrar SH'de kalırken nameserver'lar Vercel DNS'e çevrilir.
8. Apex/www/mail; HTTP/HTTPS; GET/HEAD; query; Türkçe/encoded dosya; güçlü
   ürün/fiyat/pano/destek ve bilinmeyen yol matrisi test edilir.
9. Son hedeflerde `200`, doğru canonical, indexlenebilirlik, tek yönlendirme
   adımı ve döngüsüzlük doğrulanır.
10. Search Console yetkisi varsa eski/yeni mülk sahipliği ve Change of Address
   ayrıca uygulanır.

## Geri alma ve SH hosting iptali

- DNS öncesi geri dönüş noktası SH nameserver ve zone kaydıdır.
- Canlı geçişte kritik hata görülürse `.org` nameserver'ları kayıtlı SH
  değerlerine geri çevrilir; eski hosting bu sırada açık kalır.
- DNS yayılımı ve cache nedeniyle geri dönüş anlık olmayabilir.
- SH'deki `Small (vakitmatik.com.tr)` hosting hizmeti en az yedi günlük
  sağlıklı canlı gözlemden sonra, cPanel içindeki bütün domain/dosya/mail
  bağımlılıkları tekrar doğrulanarak ayrı ve açık iptal onayıyla kapatılır.
  İptal yalnız hosting hizmetini hedefler; alan adı kayıtları/yenilemeleri
  SH'de kalır.

## Bu kapıda kullanıcıdan beklenecek tek karar

`vakitmatik.org`, `www.vakitmatik.org` ve web kopyası olarak
`mail.vakitmatik.org` alanlarını Vercel yönlendirme projesine bağlayıp `.org`
nameserver'larını Vercel'e geçirecek canlı production/DNS yayınını onaylamak;
ayrıca şu anda çalışmayan `vakitmatik.net` apex/www adreslerinin aynı projeye
eklenip eklenmeyeceğini kararlaştırmak.
