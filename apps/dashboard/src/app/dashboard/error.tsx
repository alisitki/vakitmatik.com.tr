"use client";

export default function DashboardError({ reset }: { reset: () => void }) {
  return (
    <div className="fatalError">
      <span>Bağlantı sorunu</span>
      <h1>Dashboard yüklenemedi</h1>
      <p>Veri kaynaklarından biri yanıt vermedi. Birkaç saniye sonra tekrar deneyin.</p>
      <button onClick={reset} type="button">Tekrar dene</button>
    </div>
  );
}
