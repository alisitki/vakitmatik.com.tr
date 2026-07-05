import Link from "next/link";
import type { ReactNode } from "react";
import { requirePageSession } from "@/lib/auth";
import { AdsIcon, GaugeIcon, LogOutIcon, MailIcon, SearchIcon } from "./icons";

const navItems = [
  {
    href: "/dashboard",
    label: "Özet",
    icon: GaugeIcon,
  },
  {
    href: "/dashboard/google-ads",
    label: "Google Ads",
    icon: AdsIcon,
  },
  {
    href: "/dashboard/seo",
    label: "SEO",
    icon: SearchIcon,
  },
  {
    href: "/dashboard/daily-report",
    label: "Günlük Rapor",
    icon: MailIcon,
  },
];

export async function DashboardShell({ children }: { children: ReactNode }) {
  const session = await requirePageSession();

  return (
    <div className="appShell">
      <aside className="sidebar">
        <div className="brandBlock">
          <div className="brandMark">V</div>
          <div>
            <strong>Vakitmatik</strong>
            <span>Raporlama</span>
          </div>
        </div>
        <nav className="navList" aria-label="Dashboard">
          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <Link href={item.href} key={item.href}>
                <Icon />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
        <form action="/api/logout" className="logoutForm" method="post">
          <button type="submit">
            <LogOutIcon />
            <span>Çıkış</span>
          </button>
        </form>
      </aside>
      <main className="mainArea">
        <header className="topbar">
          <div>
            <span className="eyebrow">dashboard.vakitmatik.com.tr</span>
            <strong>Karar destek paneli</strong>
          </div>
          <div className="sessionChip">
            <span>{session.u}</span>
          </div>
        </header>
        {children}
      </main>
    </div>
  );
}
