import Link from "next/link";

type LegalSection = {
  title: string;
  paragraphs?: string[];
  bullets?: string[];
  steps?: string[];
};

type LegalPageProps = {
  title: string;
  description: string;
  updatedAt?: string;
  sections: LegalSection[];
};

export function LegalPage({ title, description, updatedAt, sections }: LegalPageProps) {
  return (
    <main className="legal-page">
      <div className="container-shell">
        <article className="legal-card">
          <Link className="legal-back-link" href="/">
            Vakitmatik ana sayfa
          </Link>

          <header className="legal-header">
            <p className="eyebrow">Vakitmatik Mobil Uygulama</p>
            <h1>{title}</h1>
            <p>{description}</p>
            {updatedAt ? <time dateTime="2026-06-26">{updatedAt}</time> : null}
          </header>

          <div className="legal-content">
            {sections.map((section) => (
              <section key={section.title} className="legal-section">
                <h2>{section.title}</h2>
                {section.paragraphs?.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                {section.bullets ? (
                  <ul>
                    {section.bullets.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                ) : null}
                {section.steps ? (
                  <ol>
                    {section.steps.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ol>
                ) : null}
              </section>
            ))}
          </div>
        </article>
      </div>
    </main>
  );
}
