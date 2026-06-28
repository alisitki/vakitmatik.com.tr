import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { createPageMetadata } from "@/config/seo";

const description =
  "Vakitmatik mobil uygulaması için destek, kullanım ve sorun giderme bilgileri.";

export const metadata: Metadata = createPageMetadata({
  title: "Destek",
  description,
  path: "/support/",
});

export default function SupportPage() {
  return (
    <LegalPage
      title="Vakitmatik Destek"
      description="Vakitmatik mobil uygulaması, yeni nesil Vakitmatik cihazlarına seçilen ülke, il ve ilçe için yıllık namaz vakti paketini kolayca yüklemek için kullanılır."
      sections={[
        {
          title: "İletişim",
          bullets: [
            "Destek e-postası: bilgi@vakitmatik.com.tr",
            "Gizlilik politikası: https://www.vakitmatik.com.tr/privacy/",
            "Uygulama paketi: com.vakitmatik.vakitmatik",
            "İlk sürüm: 1.0.0",
            "Yayıncı: Vakitmatik",
          ],
        },
        {
          title: "Gereksinimler",
          bullets: [
            "Android 7.0 veya üzeri",
            "Uyumlu Android telefon",
            "Yeni nesil Vakitmatik cihazı",
            "Namaz vakti verisini indirmek için internet bağlantısı",
            "Cihaz arama ve yükleme için gerekli bağlantı izni",
          ],
        },
        {
          title: "Cihaz Bulunamıyor",
          paragraphs: [
            "Uyumlu Vakitmatik cihazı yoksa cihaz arama ekranı boş sonuç gösterebilir. Bu beklenen bir durumdur.",
          ],
          steps: [
            "Telefonun gerekli bağlantı izinlerinin açık olduğunu kontrol edin.",
            "Vakitmatik cihazının açık ve yakınınızda olduğundan emin olun.",
            "Android ayarlarında Vakitmatik için gerekli izinlerin verildiğini kontrol edin.",
            "Cihazın başka bir telefonla bağlı olmadığını kontrol edin.",
            "Uygulamadaki cihaz arama butonuna tekrar basın.",
          ],
        },
        {
          title: "Saat veya Vakit Aktarımı Başarısız",
          steps: [
            "Telefonu ve Vakitmatik cihazını birbirine yaklaştırın.",
            "Telefonun cihaz bağlantısını kapatıp tekrar açın.",
            "Uygulamayı kapatıp yeniden açın.",
            "İl ve ilçe seçiminin tamamlandığından emin olun.",
            "İnternet bağlantısını kontrol edin.",
          ],
          paragraphs: [
            "Sorun devam ederse destek e-postasına telefon modeli, Android sürümü, uygulama sürümü ve hata mesajını gönderin.",
          ],
        },
        {
          title: "Bölge Seçimi",
          paragraphs: [
            "Ülke, il ve ilçe uygulama içinden manuel olarak seçilir. Uygulama telefon konumunu kullanmaz ve konum izni istemez.",
          ],
        },
        {
          title: "Uygulama Veri Topluyor mu?",
          paragraphs: [
            "Uygulama hesap, ödeme, reklam, analitik veya telefon konumu verisi toplamaz.",
            "Gerekli bağlantı izni, yakındaki Vakitmatik cihazlarını bulmak ve seçilen cihaza yükleme yapmak için kullanılır. Ayrıntılar için gizlilik politikasına bakabilirsiniz.",
          ],
        },
      ]}
    />
  );
}
