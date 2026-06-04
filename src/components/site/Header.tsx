import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import logo from "../../assets/logo (2).png";

const nav = [
  { to: "/", label: "Home" },
  { to: "/about", label: "Company" },
  { to: "/services", label: "Services" },
  // { to: "/seo", label: "SEO" },
  { to: "/industries", label: "Industries" },
  { to: "/careers", label: "Careers" },
  { to: "/blog", label: "Blog" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-3 z-50 px-3 sm:px-6">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-3 rounded-full border border-white/10 bg-[#0B0E11]/85 px-3 pl-5 backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,0.45)]">
        <Link
          to="/"
          className="flex items-center gap-2 font-display text-base font-bold tracking-tight"
        >
          <img src={logo} alt="Company Logo" className="h-9 w-auto" />
        </Link>
        <nav className="hidden items-center gap-1 md:flex">
          {nav.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              end={n.to === "/"}
              className={({ isActive }) =>
                `rounded-full px-3.5 py-1.5 text-sm font-medium text-muted-foreground transition hover:text-foreground ${isActive ? "text-foreground bg-white/5" : ""}`
              }
            >
              {n.label}
            </NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link to="/contact" className="btn-primary hidden md:inline-flex !py-2 !px-5">
            Contact
          </Link>
          <button
            className="md:hidden rounded-full p-2 text-foreground hover:bg-white/5"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
      {open && (
        <div className="border-t border-border md:hidden">
          <div className="container-x flex flex-col py-3">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2 text-sm font-medium text-foreground hover:bg-secondary"
              >
                {n.label}
              </Link>
            ))}
            <Link to="/contact" onClick={() => setOpen(false)} className="btn-primary mt-2 w-full">
              Contact
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
