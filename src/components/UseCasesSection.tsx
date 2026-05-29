import { SectionIntro } from "@/components/SectionIntro";

export function UseCasesSection() {
  return (
    <section id="akilli-camiler" className="section-space smart-mosques-section">
      <div className="container-shell">
        <div className="smart-mosques-content smart-mosques-panel">
          <SectionIntro
            eyebrow="AKILLI CAMİLER"
            title="Caminiz için akıllı ve pratik çözümler"
            description="Ezan, ışıklandırma, ısıtma ve bilgilendirme sistemleri caminizin ihtiyacına göre birlikte planlanabilir."
          />
        </div>
      </div>
    </section>
  );
}
