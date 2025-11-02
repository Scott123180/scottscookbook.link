// src/components/Nav.tsx
import * as React from "react";
import { Link } from "gatsby";
import { useLocation } from "@reach/router";

const NAV_ITEMS = [
  { to: "/tools", label: "Cooking Tools" },
  { to: "/about", label: "About" },
];

const Nav: React.FC = () => {
  const { pathname } = useLocation();
  const [open, setOpen] = React.useState(false);

  // marks active if pathname starts with item.to
  const isActive = (to: string) =>
    pathname === to || pathname.startsWith(to + "/");

  // close mobile menu on route change
  React.useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="site-nav" role="banner">
      <nav className="site-nav__inner" role="navigation" aria-label="Primary">
        <Link to="/" className="nav-brand fancy-brand">
          <span className="brand-icon">🥄</span>
          <span className="brand-text">
            Scott’s <span className="highlight">Cookbook</span>
          </span>
        </Link>

        <button
          className="nav-toggle"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="nav-toggle__bar" />
          <span className="nav-toggle__bar" />
          <span className="nav-toggle__bar" />
        </button>

        <ul className={`nav-links ${open ? "nav-links--open" : ""}`}>
          {NAV_ITEMS.map(({ to, label }) => (
            <li
              key={to}
              className={`nav-item ${isActive(to) ? "active-link" : ""}`}
            >
              <Link to={to} aria-current={isActive(to) ? "page" : undefined}>
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Nav;
