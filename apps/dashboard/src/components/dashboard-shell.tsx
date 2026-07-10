import type { ReactNode } from "react";
import { requirePageSession } from "@/lib/auth";
import { LogOutIcon } from "./icons";
import { SidebarNav } from "./sidebar-nav";

export async function DashboardShell({ children }: { children: ReactNode }) {
  const session = await requirePageSession();

  return (
    <div className="appShell">
      <aside className="sidebar">
        <div className="brandBlock">
          <div aria-label="Vakitmatik" className="wordLogo">
            <span>VAKIT</span>
            <span className="logoClock" />
            <span>MATIK</span>
          </div>
          <span className="brandCaption">PERFORMANS</span>
        </div>
        <SidebarNav />
        <div className="sidebarBottom">
          <form action="/api/logout" className="userCard" method="post">
            <div className="userAvatar">VK</div>
            <div>
              <strong>Vakitmatik</strong>
              <span>{session.u}</span>
            </div>
            <button aria-label="Çıkış yap" type="submit">
              <LogOutIcon />
            </button>
          </form>
        </div>
      </aside>
      <main className="mainArea">{children}</main>
    </div>
  );
}
