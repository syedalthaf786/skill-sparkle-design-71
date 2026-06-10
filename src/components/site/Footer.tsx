import { Link } from "react-router-dom";
import { Linkedin, Instagram, Facebook, Youtube, Mail, Phone, MapPin } from "lucide-react";
import logo from "../../assets/logo (2).png";
import logo1 from "../../assets/logo1.png";

export function Footer() {
  return (
    <footer className="bg-[var(--accent)] text-white/85">
      <div className="container-x grid gap-10 py-16 md:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <div className="rounded-lg bg-white p-3 inline-block">
            <img src={logo} alt="SVMS Technologies" className="h-16 w-auto" />
          </div>
          <p className="mt-5 text-sm text-white/70 leading-relaxed">
            Transforming data into intelligent solutions. Your trusted technology partner for AI,
            web, and enterprise IT.
          </p>
          <div className="mt-5 flex gap-2">
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
                className="grid h-9 w-9 place-items-center rounded-full border border-white/20 text-white/80 transition hover:border-[var(--primary)] hover:bg-[var(--primary)] hover:text-white"
              >
                <Icon size={15} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-5">
            Quick Links
          </h4>
          <ul className="space-y-2.5 text-sm">
            {[
              ["/", "Home"],
              ["/about", "About"],
              ["/services", "Services"],
              ["/industries", "Industries"],
              ["/careers", "Careers"],
              ["/blog", "Blog"],
              ["/contact", "Contact"],
            ].map(([to, l]) => (
              <li key={to}>
                <Link to={to} className="text-white/70 hover:text-[var(--primary-glow)] transition">
                  {l}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-5">
            Our Services
          </h4>
          <ul className="space-y-2.5 text-sm text-white/70">
            <li>AI Data Annotation</li>
            <li>Web Design & Development</li>
            <li>IT & Software Solutions</li>
            <li>Cloud & Automation</li>
            <li>Enterprise Support</li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-5">
            Get in Touch
          </h4>
          <ul className="space-y-3.5 text-sm">
            <li className="flex items-start gap-3">
              <Mail size={16} className="mt-0.5 text-[var(--primary)] shrink-0" />
              <a
                href="mailto:info@svmstechnologies.com"
                className="text-white/80 hover:text-[var(--primary-glow)] transition break-all"
              >
                info@svmstechnologies.com
              </a>
            </li>
            <li className="flex items-start gap-3">
              <Phone size={16} className="mt-0.5 text-[var(--primary)] shrink-0" />
              <a
                href="tel:+918328210998"
                className="text-white/80 hover:text-[var(--primary-glow)] transition"
              >
                +91 83282 10998
              </a>
            </li>
            <li className="flex items-start gap-3">
              <MapPin size={16} className="mt-0.5 text-[var(--primary)] shrink-0" />
              <span className="text-white/80">Hyderabad, India</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x flex flex-col items-center justify-between gap-3 py-5 text-xs text-white/60 md:flex-row">
          <p>© 2026 SVMS Technologies. All Rights Reserved.</p>
          <span className="flex items-center gap-2">
            design & development by{" "}
            <a
              href="https://www.designdelivergrow.store"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={logo1} alt="DDG" className="h-7 w-7" />
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
