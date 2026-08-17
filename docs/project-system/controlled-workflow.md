# Kontrollü Proje İş Akışı

Sürüm: `0.1-draft`  
Durum: `Kullanıcı onayı bekliyor`  
İlk uygulama: `Vakitmatik`

Bu belge marka veya ürün stratejisi içermez. Vakitmatik'te uygulanacak karar, onay, muhalefet, ölçüm ve geri dönüş mekanizmasını tanımlar. Vakitmatik'te çalıştığı kanıtlanırsa daha sonra başka projelere uyarlanabilir.

## 1. Temel prensip

Her çalışma küçük, denetlenebilir ve geri alınabilir bir iş paketi olarak yürütülür. Bir paketin amacı, kapsamı, kapsam dışı alanları, kabul kriterleri ve onay kapısı başlamadan önce görünür olmalıdır.

## 2. Bilgi sınıfları

| Sınıf | Anlamı | Uygulamada kullanılabilir mi? |
| --- | --- | --- |
| Sahibi onayladı | Proje sahibi açıkça doğruladı | Evet |
| Kanıtlandı | Kod, canlı veri, test veya resmî kaynak doğruladı | Evet |
| Hipotez | Denenebilir görüş veya tahmin | Yalnız onaylı testte |
| Açık soru | Kararı etkileyen eksik bilgi | Hayır |

Bir hipotez doğruymuş gibi metne, reklama, SEO kararına veya dış sisteme uygulanamaz. Hipotez için önce test tasarlanır ve onay alınır.

## 3. İş paketi sözleşmesi

Her paket aşağıdaki başlıklarla tanımlanır:

```md
Paket kimliği:
Amaç:
Dayanak:
Kapsam:
Kapsam dışı:
Açık sorular:
Teslim edilecekler:
Kabul kriterleri:
Test yöntemi:
Geri alma noktası:
Onay kapısı:
```

Onay, yalnızca bu sözleşmede yazan kapsamı yetkilendirir. Çalışma sırasında amaç veya kamuya açık sonuç değişirse ajan durur ve kapsam değişikliği onayı ister.

## 4. Paket yaşam döngüsü

| Durum | Açıklama |
| --- | --- |
| Önerildi | Paket kapsamı kullanıcıya sunuldu |
| Onaylandı | Kullanıcı paketin başlamasına izin verdi |
| Çalışılıyor | Yalnız onaylı kapsam uygulanıyor |
| İncelemede | Sonuç, test ve geri alma bilgisi sunuldu |
| Tamamlandı | Kullanıcı sonucu açıkça onayladı |
| Revizyonda | Aynı paket için düzeltme isteniyor |
| Geri alındı | Paket başlangıç noktasına döndü |
| Bloke | Açık soru veya dış koşul ilerlemeyi engelliyor |

Bir anda yalnızca bir ana paket `Çalışılıyor` durumunda olabilir. Alt kontroller paralel yapılabilir; ancak sonuç tek onay kapısında birleştirilir.

## 5. Onay kapıları

Minimum kapılar:

1. `Yön onayı`: Amaç ve yaklaşım doğru mu?
2. `İçerik/görsel onayı`: Kullanıcıya görünen sonuç doğru mu?
3. `Teknik onay`: Test, ölçüm ve geri dönüş hazır mı?
4. `Production onayı`: Canlıya alınabilir mi?
5. `Dış sistem onayı`: Reklam, bütçe, e-posta veya başka haricî sistem değişebilir mi?
6. `Sonuç onayı`: Ölçüm sonrası karar devam, revizyon veya geri alma mı?

Küçük paketlerde ilk üç kapı tek incelemede birleştirilebilir. Production ve dış sistem kapıları birleştirilemez.

## 6. Muhalefet ve ortak karar

Ajan, proje sahibinin görüşünü otomatik olarak doğru kabul etmez. Aynı şekilde kendi önerisini de mutlak doğru gibi sunamaz.

Görüş ayrılığında:

- Önce ortak hedef yazılır.
- İki görüşün dayanakları ayrılır.
- Doğrulanmış veri ile kişisel tercih birbirinden ayrılır.
- Mümkünse düşük riskli bir test veya önizleme hazırlanır.
- Maliyet ve geri dönüş etkisi belirtilir.
- Son karar proje sahibinden alınır ve karar kaydına yazılır.

Veri yeterli değilse “en iyi uygulama” bahanesiyle kesin karar verilmez. Deney önerilir veya açık soru bırakılır.

## 7. Değişiklik yönetimi

Yol haritası yaşayan belgedir. Yeni veri, müşteri davranışı, Google politikası veya ürün kararı geldiğinde güncellenebilir.

Her güncellemede:

- Sürüm artırılır.
- Tarih eklenir.
- Değişen karar ve gerekçesi yazılır.
- Etkilenen paketler belirtilir.
- Daha önce alınmış onay sessizce geçersiz kılınmaz.

Onaylı paketin kapsamı değişirse yeni onay kapısı açılır.

## 8. Ölçüm ilkesi

Her proje bir kuzey yıldızı metriğine ve destekleyici ölçümlere sahip olmalıdır.

- Kuzey yıldızı iş sonucudur.
- Ara ölçümler sorunun nerede olduğunu anlamaya yarar.
- Ölçülemeyen sonuç için önce ölçüm tasarlanır.
- Bir metriği iyileştirmek iş sonucunu kötüleştiriyorsa metrik hedef olmaktan çıkarılır.

Vakitmatik'te kuzey yıldızı `sipariş`, birincil satış kanalları `WhatsApp` ve `telefon`dur.

## 9. Geri dönüş ilkesi

Her paket başlamadan önce geri alma noktası tanımlanır. Dış sistemlerde mümkünse silmek yerine duraklatma ve önceki sürüme dönme kullanılır.

Geri alma işlemi:

1. İlgili paketin etkisini durdurur.
2. Önceki doğrulanmış durumu geri getirir.
3. Veri kaybını ve gelecekteki karşılaştırmayı önler.
4. Karar kaydına gerekçesiyle yazılır.

## 10. Başka projeye uyarlama kuralı

Bu iş akışının başka projeye taşınabilecek kısmı yalnızca şunlardır:

- Bilgi sınıfları
- İş paketi sözleşmesi
- Onay kapıları
- Muhalefet protokolü
- Sürüm ve karar kaydı
- Ölçüm ve geri dönüş disiplini

Vakitmatik'in marka dili, ürün gerçekleri, URL mimarisi, metinleri ve ticari öncelikleri başka projeye kopyalanamaz.

