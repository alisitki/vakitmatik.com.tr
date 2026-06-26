import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Gizlilik Politikası",
  description:
    "Vakitmatik mobil uygulamasının veri kullanımı, izinleri ve gizlilik uygulamaları.",
  alternates: {
    canonical: "/privacy/",
  },
};

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Vakitmatik Gizlilik Politikası"
      description="Bu gizlilik politikası, Vakitmatik mobil uygulamasının hangi verileri hangi amaçlarla kullandığını açıklar."
      updatedAt="Yürürlük tarihi: 26 Haziran 2026"
      sections={[
        {
          title: "Yayıncı",
          bullets: [
            "Yayıncı: Vakitmatik",
            "Destek e-postası: bilgi@vakitmatik.com.tr",
            "Gizlilik politikası URL'si: https://www.vakitmatik.com.tr/privacy/",
            "Destek URL'si: https://www.vakitmatik.com.tr/support/",
          ],
        },
        {
          title: "Cihaz Bağlantısı",
          paragraphs: [
            "Uygulama, yakındaki uyumlu Vakitmatik cihazlarını bulmak ve seçilen cihaza bağlanmak için gerekli cihaz bağlantısı izinlerini ister.",
            "Bağlantı üzerinden telefon saati ve seçilen bölgenin namaz vakti paketi cihaza aktarılır. Yakındaki cihaz adı veya cihaz kimliği yalnızca cihaz seçimi ve bağlantı işlemi sırasında kullanılır; reklam veya analitik amacıyla kullanılmaz.",
          ],
        },
        {
          title: "İnternet Kullanımı",
          paragraphs: [
            "Uygulama, ülke, il ve ilçe listelerini ve seçilen bölgeye ait namaz vakti verisini indirmek için internet bağlantısı kullanır.",
            "Bu isteklerde seçilen ülke, il ve ilçe kodları gönderilebilir. Telefon konumu veya GPS koordinatı Vakitmatik veri API'sine gönderilmez.",
          ],
        },
        {
          title: "Toplanmayan Veriler",
          paragraphs: ["Vakitmatik şu verileri toplamaz:"],
          bullets: [
            "Hesap veya giriş bilgileri",
            "Ödeme bilgileri",
            "Kişiler, mesajlar, fotoğraflar, videolar veya dosyalar",
            "Reklam kimliği veya reklam profili",
            "Analitik veya crash reporting verisi",
            "Telefon konumu veya GPS koordinatı",
          ],
        },
        {
          title: "Verilerin Kullanım Amaçları",
          bullets: [
            "Uyumlu Vakitmatik cihazını bulmak ve cihaza bağlanmak",
            "Telefon saatini Vakitmatik cihazına aktarmak",
            "Seçilen bölgenin namaz vakti paketini indirmek ve cihaza aktarmak",
          ],
        },
        {
          title: "Veri Paylaşımı ve Saklama",
          paragraphs: [
            "Uygulama kullanıcı verilerini reklam ağlarıyla veya veri aracılarıyla paylaşmaz.",
            "Uygulama kullanıcı hesabı oluşturmaz ve kalıcı kullanıcı profili tutmaz. Cihaz bağlantısı verileri uygulama akışı sırasında kullanılır; geçici bilgiler işlem tamamlandığında veya uygulama kapatıldığında temizlenir.",
          ],
        },
        {
          title: "Kullanıcı Seçimleri",
          paragraphs: [
            "Kullanıcılar Android ayarlarından cihaz bağlantısı izinlerini istedikleri zaman kapatabilir. İzinler kapatıldığında ilgili özellikler çalışmayabilir.",
            "Ülke, il ve ilçe uygulama içinde manuel olarak seçilir. Uygulama telefon konumunu kullanmaz ve konum izni istemez.",
          ],
        },
        {
          title: "Güvenlik ve Çocukların Gizliliği",
          paragraphs: [
            "Uygulama, namaz vakti verisini HTTPS üzerinden almaya çalışır. Cihaza aktarım yalnızca kullanıcının seçtiği yakın cihazla başlatılır.",
            "Vakitmatik çocuklara özel olarak tasarlanmamıştır. Uygulamada kullanıcı hesabı, reklam veya çocuklara yönelik kişiselleştirilmiş içerik bulunmaz.",
          ],
        },
        {
          title: "İletişim",
          paragraphs: [
            "Gizlilikle ilgili sorular için bilgi@vakitmatik.com.tr adresinden bize ulaşabilirsiniz.",
            "Bu politika zaman zaman güncellenebilir. Güncel sürüm bu sayfada yayınlanır.",
          ],
        },
      ]}
    />
  );
}
