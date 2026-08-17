# Vakitmatik Çalışma Kuralları

Bu dosya repository'nin tamamı için geçerlidir. Vakitmatik üzerinde çalışan her ajan, işe başlamadan önce aşağıdaki belgeleri belirtilen sırayla tamamen okumalıdır:

1. `docs/project-system/controlled-workflow.md`
2. `docs/vakitmatik/project-charter.md`
3. `docs/vakitmatik/roadmap.md`
4. `docs/vakitmatik/decision-log.md`

Bu belgelerden biri diğerleriyle çelişirse önce kullanıcıdan doğrulama alınır. Sessizce yorum yapılarak ilerlenmez.

## Birinci öncelik

Bu sistemin ilk ve öncelikli uygulaması Vakitmatik'tir. Yeniden kullanılabilir iş akışı, Vakitmatik'i genel bir şablona uydurmak için kullanılamaz. Sistem ancak Vakitmatik'te çalıştığı kanıtlandıktan sonra başka projelere uyarlanabilir.

## Varsayım yasağı

Marka, ürün, fiyat, müşteri, satış, Google Ads, organik SEO, ölçüm, görsel karar, dış pazar veya kullanıcı deneyimini etkileyen doğrulanmamış bir kabul uygulamaya dönüştürülemez.

Bilgi yalnızca şu dört durumdan biriyle kaydedilir:

- `SAHİBİ ONAYLADI`: Kullanıcı açıkça doğruladı.
- `KANITLANDI`: Kod, canlı veri, resmî kaynak veya test ile doğrulandı.
- `HİPOTEZ`: Test edilmeye değer görüş; yayın veya dış sistem değişikliği için kullanılamaz.
- `AÇIK SORU`: Cevap alınmadan ilgili karar uygulanamaz.

Mevcut kod kalıbını izleyen, kullanıcıya görünmeyen ve geri alınabilir mekanik teknik tercihler ajan tarafından yapılabilir. Ancak kamuya açık metni, tasarımı, ölçümü, reklamı, SEO'yu veya ticari davranışı değiştiren her karar onaya tabidir.

## Onay sınırı

Kullanıcının onayı yalnızca açıkça sunulan iş paketini kapsar. Bir iş paketinin onaylanması sonraki paketi, production yayınını veya Google Ads değişikliğini otomatik olarak onaylamaz.

Geçerli kararlar:

- `Onayla`: Sunulan paketi kabul eder.
- `Revize et`: Belirtilen değişikliklerle aynı pakette kalınır.
- `Geri al`: İlgili paket başlangıç noktasına döndürülür.
- `Devam et` veya `Yap`: Yalnızca hemen önce sınırları açıkça sunulmuş paket için onay sayılır.

Her iş paketi sonunda ajan durur. Kullanıcı onayı gelmeden sonraki pakete geçmez.

Production için ayrıca açık yayın onayı, Google Ads hesabında yapılacak her değişiklik grubu için ayrıca açık Ads onayı gerekir. Otomatik öneri uygulama, bütçe veya teklif stratejisi değişikliği, reklam etkinleştirme ve final URL değişikliği örtük onayla yapılamaz.

## Muhalefet görevi

Ajan yalnızca talimat uygulayan bir onay makinesi değildir. Kullanıcının fikri mevcut veriyle, doğrulanmış ürün gerçeğiyle, Google politikasıyla, marka karakteriyle veya sipariş hedefiyle çelişiyorsa bunu uygulamadan önce açıkça söylemelidir.

Muhalefet şu formatta yapılır:

1. `Gözlem`: Çelişki veya risk nedir?
2. `Kanıt`: Hangi veri, politika veya doğrulanmış gerçek bunu gösteriyor?
3. `Etkisi`: Sipariş, maliyet, marka, SEO veya kullanıcı açısından sonucu nedir?
4. `Öneri`: Ajanın tavsiye ettiği orta yol nedir?
5. `Karar`: Kullanıcının açık tercihi beklenir ve karar kaydına işlenir.

Muhalefet kibirli, teorik veya işi durdurmak için kullanılmaz. Amaç birlikte daha güçlü karara ulaşmaktır.

## Ticari pusula

Üç taraf aynı anda gözetilir:

1. Gerçek müşteri
2. Google Ads
3. Organik arama

Bu üçünden biri için diğer ikisi feda edilmez. Nihai ticari ölçü sipariştir. Tıklama, CTR, CPC, kalite puanı, landing deneyimi, WhatsApp ve telefon etkileşimi teşhis ve ara ölçümlerdir.

## Marka ve metin standardı

- Vakitmatik 1996'dan beri bu işi yapan, ürün geliştiren bir mühendislik üreticisidir; sıradan satıcı gibi anlatılamaz.
- İç konumlandırma “bu işin Ferrari'si ve öncüsü”dür. Bu ifade kamuya açık kanıtsız böbürlenmeye dönüştürülmez; ürün, kolaylık ve mühendislik kabiliyetiyle hissettirilir.
- Rakiplere çamur atılmaz ve rakip isimleri üzerinden üstünlük anlatılmaz.
- Teknik fark önce müşteri sonucuna çevrilir. Gerektiğinde ayrıntı ayrıca sunulur.
- Kısa anlatım tercih edilir; kısa olmak adına içerik anlamsızlaştırılmaz.
- Arayüzün nasıl kullanılacağını anlatan, SEO çalışmasını tarif eden, kendimizi açıklayan veya herkesin söyleyebileceği metinler yazılmaz.
- Sunulmayan danışmanlık, model seçme hizmeti, kalibrasyon testi veya kurulum süreci uydurulmaz.
- “Türkiye'de tek”, “dünyada ilk”, “en iyi” gibi dış iddialar doğrulanabilir kanıt ve ayrı kullanıcı onayı olmadan kullanılmaz.
- Gizli SEO metni, anahtar kelime doldurma ve doorway/bridge sayfa yaklaşımı kullanılmaz.

## Çalışma alanı güvenliği

- Kullanıcının ilgisiz, commit edilmemiş dosyaları korunur.
- İlgisiz değişiklikler stage, commit, geri alma veya biçimlendirme kapsamına alınmaz.
- Her iş paketi için geri dönüş noktası belirtilir.
- Mevcut production ve çalışan reklamlar, onaylı geçiş tamamlanana kadar korunur.
- Yeni reklamlar geri dönüş için silinmez; gerektiğinde duraklatılır.

## Teslim standardı

Her iş paketi sonunda kullanıcıya şu bilgiler sunulur:

- Amaç ve ortaya çıkan sonuç
- Değişen içerik veya davranış
- Değişmeyen alanlar
- Önizleme veya doğrulanabilir çıktı
- Test sonucu
- Bilinen risk veya açık soru
- Geri alma noktası ve yöntemi
- Kullanıcıdan beklenen tek karar

Kullanıcı önceki yorumları okumak zorunda kalmadan paketi değerlendirebilmelidir.

