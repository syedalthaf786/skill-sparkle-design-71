import { Link } from "react-router-dom";
import {
  Search,
  CheckCircle2,
  Target,
  TrendingUp,
  Layout,
  Zap,
  Settings,
  Activity,
} from "lucide-react";
import { Reveal } from "@/components/site/Reveal";

const seoServices = [
  {
    icon: Search,
    title: "Technical SEO",
    desc: "Optimize your website's infrastructure for search engine crawling and indexing.",
    highlight: "Site speed, mobile-friendliness, security, and architecture improvements.",
    items: [
      "Website Audits",
      "Site Speed Optimization",
      "Mobile-First Indexing",
      "XML Sitemap Optimization",
      "Robots.txt Configuration",
      "Schema Markup Implementation",
      "Canonicalization & Redirects",
      "HTTPS & Security Implementation",
      "Core Web Vitals Optimization",
      "JavaScript SEO",
    ],
  },
  {
    icon: CheckCircle2,
    title: "On-Page SEO",
    desc: "Optimize individual web pages to rank higher and earn more relevant traffic.",
    highlight: "Content optimization, keyword strategy, and HTML element improvements.",
    items: [
      "Keyword Research & Strategy",
      "Content Optimization",
      "Meta Tags & Headers",
      "Internal Linking Structure",
      "Image Optimization",
      "URL Structure Optimization",
      "Header Tags (H1-H6)",
      "Content Gap Analysis",
      "Featured Snippet Optimization",
      "User Experience Signals",
    ],
  },
  {
    icon: Target,
    title: "Local & Off-Page SEO",
    desc: "Build authority and visibility through external signals and local optimization.",
    highlight: "Link building, local citations, and reputation management.",
    items: [
      "Google Business Profile Optimization",
      "Local Citations & Listings",
      "Review Management",
      "Link Building Campaigns",
      "Competitor Backlink Analysis",
      "Digital PR & Outreach",
      "Brand Mention Monitoring",
      "Social Signals Optimization",
      "Local Service Ads",
      "Multi-location SEO",
    ],
  },
  {
    icon: TrendingUp,
    title: "Content & E-commerce SEO",
    desc: "Create and optimize content that ranks well and converts visitors.",
    highlight: "Blog optimization, product pages, and conversion-focused content.",
    items: [
      "Blog SEO Strategy",
      "Product Page Optimization",
      "Category Page SEO",
      "Content Gap & Opportunity Analysis",
      "Voice Search Optimization",
      "Video SEO",
      "International SEO",
      "Seasonal SEO Campaigns",
      "Conversion Rate Optimization",
      "Analytics & Reporting",
    ],
  },
];

export default function SeoPage() {
  return (
    <div>
      <section className="relative overflow-hidden">
        <div className="hero-glow absolute inset-0 -z-10" />
        <div className="container-x py-20 lg:py-28">
          <span className="eyebrow">Search Engine Optimization</span>
          <h1 className="mt-4 max-w-3xl text-4xl font-bold md:text-6xl">
            Drive Organic Growth with <span className="brand-text">Strategic SEO Services</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            Improve your search visibility, attract qualified traffic, and grow your business with
            data-driven SEO strategies tailored to your industry and goals.
          </p>
        </div>
      </section>

      <section className="container-x space-y-10 pb-24">
        {seoServices.map((s, idx) => (
          <Reveal
            key={s.title}
            delay={idx * 120}
            className="grid gap-8 rounded-3xl border border-border bg-card p-8 transition-all duration-500 hover:shadow-[var(--shadow-elevated)] md:grid-cols-3 md:p-12"
          >
            <div className="md:col-span-1">
              <div
                className="grid h-14 w-14 place-items-center rounded-2xl animate-floaty"
                style={{ background: "var(--gradient-brand)" }}
              >
                <s.icon size={26} className="text-primary-foreground" />
              </div>
              <div className="mt-4 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                0{idx + 1}
              </div>
              <h2 className="mt-2 text-2xl font-bold md:text-3xl">{s.title}</h2>
              <p className="mt-3 text-muted-foreground">{s.desc}</p>
              <p className="mt-4 rounded-xl border border-border bg-surface p-4 text-sm font-medium text-foreground">
                ✦ {s.highlight}
              </p>
            </div>
            <div className="md:col-span-2">
              <div className="grid gap-3 sm:grid-cols-2">
                {s.items.map((i, k) => (
                  <Reveal
                    key={i}
                    delay={k * 40}
                    className="flex items-center gap-3 rounded-xl border border-border bg-background p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-[color:var(--accent)] hover:shadow-[var(--shadow-soft)]"
                  >
                    <CheckCircle2
                      size={16}
                      className="shrink-0"
                      style={{ color: "var(--accent)" }}
                    />
                    <span className="text-sm font-medium">{i}</span>
                  </Reveal>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </section>

      <div
        className="rounded-3xl border border-border p-10 text-center md:p-14"
        style={{ background: "var(--gradient-brand)" }}
      >
        <h2 className="text-3xl font-bold text-primary-foreground md:text-4xl">
          Ready to improve your search rankings?
        </h2>
        <Link
          to="/contact"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-background px-6 py-3 text-sm font-semibold text-foreground transition hover:scale-105"
        >
          Get a Free SEO Audit <Search size={16} />
        </Link>
      </div>
    </div>
  );
}
