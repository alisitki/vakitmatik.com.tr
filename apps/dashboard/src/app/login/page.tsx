import { redirect } from "next/navigation";
import { Suspense } from "react";
import { getPageSession } from "@/lib/auth";
import { LoginForm } from "@/components/login-form";

async function LoginContent() {
  const session = await getPageSession();

  if (session) {
    redirect("/dashboard");
  }

  return (
    <main className="loginPage">
      <section className="loginCard">
        <div className="brandBlock">
          <div aria-label="Vakitmatik" className="wordLogo">
            <span>VAKIT</span>
            <span className="logoClock" />
            <span>MATIK</span>
          </div>
          <span className="brandCaption">PERFORMANS</span>
        </div>
        <h1>Dashboard girişi</h1>
        <p>Google Ads ve Search Console raporları yalnızca yetkili kullanıcılar için gösterilir.</p>
        <LoginForm />
      </section>
    </main>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="shellLoading">Giriş hazırlanıyor…</div>}>
      <LoginContent />
    </Suspense>
  );
}
