import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import { Menu, X, Phone, Facebook, Instagram, Linkedin, Youtube } from "lucide-react";
import logo from "../../assets/logo (2).png";

const nav = [
  { to: "/", label: "Home" },
  { to: "/about", label: "Company" },
  { to: "/services", label: "Services" },
  { to: "/industries", label: "Industries" },
  { to: "/careers", label: "Careers" },
  { to: "/blog", label: "Blog" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50">
      {/* Top utility bar */}
      <div className="hidden md:block bg-[var(--accent)] text-white text-xs">
        <div className="container-x flex h-9 items-center justify-between">
          <a
            href="tel:+918328210998"
            className="inline-flex items-center gap-2 font-medium hover:text-[var(--primary-glow)] transition"
          >
            <Phone size={13} className="text-[var(--primary)]" />
            Talk to an Expert: +91 83282 10998
          </a>
          <div className="flex items-center gap-3">
            {[
              { Icon: Facebook, href: "https://www.facebook.com/share/18gTRuGN7i/" },
              { Icon: Instagram, href: "https://www.instagram.com/svms_technologies" },
              { Icon: Linkedin, href: "https://www.linkedin.com/company/svms-technologies/" },
              { Icon: Youtube, href: "#" },
            ].map(({ Icon, href }, i) => (
              <a
                key={i}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/80 hover:text-[var(--primary-glow)] transition"
              >
                <Icon size={14} />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="bg-white border-b border-border shadow-[0_2px_12px_rgba(10,31,77,0.06)]">
        <div className="container-x flex h-[68px] items-center justify-between gap-3">
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="SVMS Technologies" className="h-11 w-auto" />
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {nav.map((n) => (
              <NavLink
                key={n.to}
                to={n.to}
                end={n.to === "/"}
                className={({ isActive }) =>
                  `relative px-3.5 py-2 text-sm font-semibold uppercase tracking-wide transition ${
                    isActive
                      ? "text-[var(--primary)]"
                      : "text-[var(--accent)] hover:text-[var(--primary)]"
                  }`
                }
              >
                {n.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              to="/contact"
              className="hidden md:inline-flex btn-primary !py-2.5 !px-5"
            >
              Get Free Demo
            </Link>
            <button
              className="lg:hidden rounded-md p-2 text-[var(--accent)] hover:bg-[var(--secondary)]"
              onClick={() => setOpen(!open)}
              aria-label="Menu"
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-b border-border bg-white shadow-md">
          <div className="container-x flex flex-col py-3">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2.5 text-sm font-semibold uppercase tracking-wide text-[var(--accent)] hover:bg-[var(--secondary)] hover:text-[var(--primary)]"
              >
                {n.label}
              </Link>
            ))}
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="btn-primary mt-3 w-full"
            >
              Get Free Demo
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
