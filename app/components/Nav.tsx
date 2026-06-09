import { NavLink } from "react-router-dom";

import brandIcon from "../assets/total-resa-icon.png";
import brandWordmark from "../assets/total-resa-wordmark.png";

const links = [
  { to: "/", label: "Executive Overview", end: true },
  { to: "/catalog", label: "RFP Catalog Builder" },
  { to: "/portal", label: "Portal-Lite Customer View" },
  { to: "/issues", label: "Exception Queue" },
  { to: "/roadmap", label: "Roadmap" }
];

export function Nav() {
  return (
    <nav className="nav" aria-label="Primary navigation">
      <div className="brand-block">
        <span className="brand-mark">
          <img src={brandIcon} alt="" />
        </span>
        <div>
          <img className="brand-wordmark" src={brandWordmark} alt="Total RESA" />
          <p className="brand-subtitle">RFP Readiness Portal</p>
        </div>
      </div>
      <div className="nav-links">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.end}
            className={({ isActive }) =>
              isActive ? "nav-link nav-link-active" : "nav-link"
            }
          >
            {link.label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
