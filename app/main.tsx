import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { AppShell } from "./components/AppShell";
import { CatalogPage } from "./pages/CatalogPage";
import { ExecutiveOverviewPage } from "./pages/ExecutiveOverviewPage";
import { IssuesPage } from "./pages/IssuesPage";
import { PortalPage } from "./pages/PortalPage";
import { RoadmapPage } from "./pages/RoadmapPage";
import "./styles.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<AppShell />}>
          <Route index element={<ExecutiveOverviewPage />} />
          <Route path="catalog" element={<CatalogPage />} />
          <Route path="portal" element={<PortalPage />} />
          <Route path="issues" element={<IssuesPage />} />
          <Route path="roadmap" element={<RoadmapPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
