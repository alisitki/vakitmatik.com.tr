const footerItems = [
  { href: "/cami-saati/", label: "Cami Saati Modelleri" },
  { href: "/cami-saati-fiyatlari/", label: "Cami Saati Fiyatları" },
  { href: "/ayet-hadis-panosu/", label: "Ayet, Hadis ve Mesaj Panoları" },
  { href: "/support/", label: "Destek" },
  { href: "/privacy/", label: "Gizlilik" },
] as const;

export function FooterSection() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer-wrap">
      <div className="container-shell">
        <div className="site-footer">
          <div className="site-footer-head">
            <p>© {year} Reksan Reklem &amp; Elektronik . Tüm hakları saklıdır.</p>
            <p className="site-footer-trademarks">
              Apple ve Apple logosu, Apple Inc.’in; Google Play ve Google Play logosu,
              Google LLC’nin ticari markalarıdır.
            </p>
          </div>

          <nav aria-label="Alt menü">
            <ul className="site-footer-links">
              {footerItems.map((item) => (
                <li key={`footer-${item.href}-${item.label}`}>
                  <a href={item.href}>{item.label}</a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
