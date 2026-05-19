import { Link } from "react-router-dom";
import {
  Brain,
  HeartPulse,
  ShoppingBag,
  Banknote,
  GraduationCap,
  Building2,
  Truck,
  Rocket,
  Store,
} from "lucide-react";
import { Reveal } from "@/components/site/Reveal";

const industries = [
  {
    icon: Brain,
    t: "Artificial Intelligence",
    d: "Datasets, MLOps, and intelligent product surfaces.",
  },
  {
    icon: HeartPulse,
    t: "Healthcare",
    d: "HIPAA-aware data, clinical tools, and patient platforms.",
  },
  {
    icon: ShoppingBag,
    t: "E-Commerce",
    d: "Conversion-focused storefronts and back-office automation.",
  },
  { icon: Banknote, t: "Finance", d: "Secure dashboards, analytics, and compliant workflows." },
  {
    icon: GraduationCap,
    t: "Education",
    d: "Learning platforms, content tagging, and adaptive systems.",
  },
  { icon: Store, t: "Retail", d: "Inventory, POS integrations, and customer experience." },
  { icon: Building2, t: "Real Estate", d: "Listings, CRMs, and virtual tour platforms." },
  { icon: Truck, t: "Logistics", d: "Tracking, routing, and supply chain automation." },
  { icon: Rocket, t: "Startups & Enterprises", d: "Built to scale with you — MVP to enterprise." },
];

export default function IndustriesPage() {
  return (
    <div>
      <section className="relative overflow-hidden">
        <div className="hero-glow absolute inset-0 -z-10" />
        <div className="container-x py-20 lg:py-28">
          <span className="eyebrow">Industries</span>
          <h1 className="mt-4 max-w-3xl text-4xl font-bold md:text-6xl">
            Domain expertise across the <span className="brand-text">modern economy</span>.
          </h1>
        </div>
      </section>

      <section className="container-x pb-24">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {industries.map((i, idx) => (
            <Reveal key={i.t} delay={idx * 70} className="card-surface">
              <div
                className="grid h-12 w-12 place-items-center rounded-xl"
                style={{ background: "color-mix(in oklab, var(--accent) 22%, transparent)" }}
              >
                <i.icon size={22} className="text-primary" />
              </div>
              <h3 className="mt-5 text-xl font-semibold">{i.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{i.d}</p>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
