import { redirect } from "next/navigation";
import { getPageSession } from "@/lib/auth";
import { LoginForm } from "@/components/login-form";

export default async function LoginPage() {
  const session = await getPageSession();

  if (session) {
    redirect("/dashboard");
  }

  return (
    <main className="loginPage">
      <section className="loginCard">
        <div className="brandBlock">
          <div className="brandMark">V</div>
          <div>
            <strong>Vakitmatik</strong>
            <span>Raporlama</span>
          </div>
        </div>
        <h1>Dashboard girişi</h1>
        <p>Google Ads ve Search Console raporları yalnızca yetkili kullanıcılar için gösterilir.</p>
        <LoginForm />
      </section>
    </main>
  );
}
