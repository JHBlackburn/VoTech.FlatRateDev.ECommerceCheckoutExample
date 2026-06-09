import { Outlet } from "react-router-dom";

import { Nav } from "./Nav";
import { TopBanner } from "./TopBanner";

export function AppShell() {
  return (
    <div className="app-shell">
      <TopBanner />
      <div className="app-frame">
        <aside className="sidebar">
          <Nav />
        </aside>
        <main className="main-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
