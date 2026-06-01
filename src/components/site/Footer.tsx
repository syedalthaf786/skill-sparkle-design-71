import { Link } from "react-router-dom";
import { Linkedin, Instagram, Facebook, Mail, Phone, MapPin } from "lucide-react";
import logo from "../../assets/logo (2).png";
import logo1 from "../../assets/logo1.png";
export function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="container-x grid gap-10 py-16 md:grid-cols-2 lg:grid-cols-3">
        <div className="md:col-span-1">
          <div className="font-display text-xl font-bold">
            <img src={logo} alt="Company Logo" className="h-36 w-36" />
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            Transforming data into intelligent solutions. Your trusted technology partner.
          </p>
          <div className="mt-5 flex gap-2">
            {[
              { Icon: Linkedin, href: "https://www.linkedin.com/company/svms-technologies/" },
              { Icon: Instagram, href: "https://www.instagram.com/svms_technologies?utm_source=qr&igsh=MTRjcmszMGs5dDE5OA==" },
              { Icon: Facebook, href: "https://www.facebook.com/share/18gTRuGN7i/" },
            ].map(({ Icon, href }, i) => (
              <a
                key={i}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="grid h-9 w-9 place-items-center rounded-full border border-border text-muted-foreground transition hover:border-primary hover:text-primary"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider">Quick Links</h4>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            {[
              ["/", "Home"],
              ["/about", "About"],
              ["/services", "Services"],
              ["/industries", "Industries"],
              ["/careers", "Careers"],
              ["/contact", "Contact"],
            ].map(([to, l]) => (
              <li key={to}>
                <Link to={to} className="hover:text-primary">
                  {l}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider">Get in Touch</h4>
          <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <Mail size={14} className="mt-1 text-primary" />
              <a href="mailto:info@svmstechnologies.com" target="_blank" rel="noopener noreferrer">
                info@svmstechnologies.com
              </a>
            </li>href={href}
            <li clrel=\"noopener noreferrer\"assName="flex items-start gap-2">
              <Phone size={14} className="mt-1 text-primary" />{" "}
              <a href="tel:+918328210998" target="_blank" rel="noopener noreferrer">
                +91 83282 10998
              </a>
            </li>
            <li className="flex items-start gap-2">
              <MapPin size={14} className="mt-1 text-primary" /> Hyderabad, India
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="container-x flex flex-col items-center justify-between gap-2 py-5 text-xs text-muted-foreground md:flex-row">
          <p>© 2026 SVMS Technologies. All Rights Reserved.</p>
          <span>
            design & development by{" "}
            <a href="https://www.designdelivergrow.store" target="_blank" rel="noopener noreferrer">
              <img src={logo1} alt="Design & Development Logo" className="h-8 w-8" />
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
