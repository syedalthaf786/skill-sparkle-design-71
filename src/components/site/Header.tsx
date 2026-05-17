import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const nav = [
  { to: "/", label: "Home" },
  { to: "/about", label: "Company" },
  { to: "/services", label: "Services" },
  { to: "/industries", label: "Industries" },
  { to: "/careers", label: "Careers" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="container-x flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-display text-xl font-bold tracking-tight">
          <span className="grid h-8 w-8 place-items-center rounded-lg" style={{ background: "var(--gradient-brand)" }}>
            <span className="font-display text-sm text-primary-foreground">N</span>
          </span>
          <span><span className="text-primary">Nova</span><span style={{ color: "var(--accent)" }}>Stack</span></span>
        </Link>
        <nav className="hidden items-center gap-1 md:flex">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              activeOptions={{ exact: n.to === "/" }}
              activeProps={{ className: "text-primary bg-secondary" }}
              className="rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition hover:text-foreground"
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link to="/contact" className="btn-primary hidden md:inline-flex">Contact</Link>
          <button className="md:hidden rounded-md p-2 text-foreground" onClick={() => setOpen(!open)} aria-label="Menu">
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
      {open && (
        <div className="border-t border-border md:hidden">
          <div className="container-x flex flex-col py-3">
            {nav.map((n) => (
              <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="rounded-md px-3 py-2 text-sm font-medium text-foreground hover:bg-secondary">
                {n.label}
              </Link>
            ))}
            <Link to="/contact" onClick={() => setOpen(false)} className="btn-primary mt-2 w-full">Contact</Link>
          </div>
        </div>
      )}
    </header>
  );
}
