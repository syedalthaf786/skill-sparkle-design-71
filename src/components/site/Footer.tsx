import { Link } from "@tanstack/react-router";
import { Linkedin, Instagram, Facebook, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="container-x grid gap-10 py-16 md:grid-cols-4">
        <div className="md:col-span-1">
          <div className="font-display text-xl font-bold">
            <span className="text-primary">Nova</span><span style={{ color: "var(--accent)" }}>Stack</span>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            Transforming data into intelligent solutions. Your trusted technology partner.
          </p>
          <div className="mt-5 flex gap-2">
            {[Linkedin, Instagram, Facebook].map((Icon, i) => (
              <a key={i} href="#" className="grid h-9 w-9 place-items-center rounded-full border border-border text-muted-foreground transition hover:border-primary hover:text-primary">
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider">Quick Links</h4>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            {[["/", "Home"], ["/about", "About"], ["/services", "Services"], ["/industries", "Industries"], ["/careers", "Careers"], ["/contact", "Contact"]].map(([to, l]) => (
              <li key={to}><Link to={to} className="hover:text-primary">{l}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider">Services</h4>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            {["Data Annotation", "Web Development", "AI Solutions", "IT Consulting", "Automation", "Cloud Solutions"].map((s) => (
              <li key={s}><Link to="/services" className="hover:text-primary">{s}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider">Get in Touch</h4>
          <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
            <li className="flex items-start gap-2"><Mail size={14} className="mt-1 text-primary" /> info@novastack.io</li>
            <li className="flex items-start gap-2"><Phone size={14} className="mt-1 text-primary" /> +91 98765 43210</li>
            <li className="flex items-start gap-2"><MapPin size={14} className="mt-1 text-primary" /> Hyderabad, India</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="container-x flex flex-col items-center justify-between gap-2 py-5 text-xs text-muted-foreground md:flex-row">
          <p>© 2026 NovaStack Technologies. All Rights Reserved.</p>
          <p>Smart Solutions for the Digital Future</p>
        </div>
      </div>
    </footer>
  );
}
