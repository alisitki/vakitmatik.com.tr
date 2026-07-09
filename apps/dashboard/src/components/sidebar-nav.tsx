"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AdsIcon, DocumentIcon, HomeIcon, MegaphoneIcon } from "./icons";

const navItems = [
  {
    href: "/dashboard",
    label: "Özet",
    icon: HomeIcon,
  },
  {
    href: "/dashboard/google-ads",
    label: "Reklam",
    icon: MegaphoneIcon,
  },
  {
    href: "/dashboard/seo",
    label: "SEO",
    icon: AdsIcon,
  },
  {
    href: "/dashboard/daily-report",
    label: "Rapor",
    icon: DocumentIcon,
  },
];

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <nav className="navList" aria-label="Dashboard">
      {navItems.map((item) => {
        const Icon = item.icon;
        const active = pathname === item.href;

        return (
          <Link aria-current={active ? "page" : undefined} className={active ? "active" : ""} href={item.href} key={item.href}>
            <Icon />
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
