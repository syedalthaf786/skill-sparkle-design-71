import { createFileRoute, Link } from "@tanstack/react-router";
import { type ReactNode, useEffect, useState } from "react";
import heroTeam from "@/assets/hero-team.jpg";
import { Reveal } from "@/components/site/Reveal";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import {
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Zap,
  Database,
  Code2,
  Cpu,
  CheckCircle2,
  Users,
  Award,
  Clock,
  Quote,
  MessageCircle,
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
import video from "@/assets/video.mp4";
import gif1 from "@/assets/ai1.gif";
export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Svms Technologies — Empowering Businesses with Data & Digital Innovation" },
      {
        name: "description",
        content:
          "AI data annotation, web design, software development, and scalable IT solutions for modern enterprises.",
      },
      { property: "og:title", content: "Svms Technologies — Data, AI & IT Solutions" },
      { property: "og:description", content: "Transforming data into intelligent solutions." },
    ],
  }),
  component: Index,
});

const services = [
  {
    icon: Database,
    title: "AI Data Annotation",
    desc: "Accurate, scalable annotation for AI & ML projects — image, video, text, and audio.",
  },
  {
    icon: Code2,
    title: "Web Design & Development",
    desc: "Creative, responsive websites optimized for performance, SEO, and user experience.",
  },
  {
    icon: Cpu,
    title: "IT & Software Solutions",
    desc: "End-to-end custom software, AI/ML, automation, and cloud services for enterprises.",
  },
];

const whyUs = [
  { icon: Users, t: "Experienced Team" },
  { icon: ShieldCheck, t: "Quality Assurance" },
  { icon: Zap, t: "Scalable Delivery" },
  { icon: ShieldCheck, t: "Secure Workflow" },
  { icon: Sparkles, t: "Cost-Effective" },
  { icon: Clock, t: "On-Time Delivery" },
  { icon: Cpu, t: "Modern Tech Stack" },
  { icon: Award, t: "Dedicated Support" },
];

const industries = [
  { icon: Brain, t: "Artificial Intelligence" },
  { icon: HeartPulse, t: "Healthcare" },
  { icon: ShoppingBag, t: "E-Commerce" },
  { icon: Banknote, t: "Finance" },
  { icon: GraduationCap, t: "Education" },
  { icon: Store, t: "Retail" },
  { icon: Building2, t: "Real Estate" },
  { icon: Truck, t: "Logistics" },
  { icon: Rocket, t: "Startups & Enterprises" },
];

const process = [
  { n: "01", t: "Data Collection", d: "Gathering raw data from sources across your business." },
  {
    n: "02",
    t: "Data Preparation",
    d: "Cleaning, labeling, and organizing data for reliable use.",
  },
  { n: "03", t: "Data Input", d: "Feeding prepared data into systems, models, and applications." },
  { n: "04", t: "Data Processing", d: "Transforming data into valuable insights and actions." },
  {
    n: "05",
    t: "Output & Interpretation",
    d: "Analyzing results and delivering clear business outcomes.",
  },
  { n: "06", t: "Data Storage", d: "Securing outputs and maintaining accessible data records." },
];

const stats = [
  { n: "100+", l: "Projects Completed" },
  { n: "50+", l: "Happy Clients" },
  { n: "99%", l: "Quality Accuracy" },
  { n: "24/7", l: "Client Support" },
];

function CountUp({ value }: { value: string }) {
  const match = value.match(/^(\d+)([%+]?)$/);
  const suffix = match?.[2] ?? "";
  const target = match ? Number(match[1]) : null;
  const [displayValue, setDisplayValue] = useState(match ? `0${suffix}` : value);

  useEffect(() => {
    if (target === null) {
      setDisplayValue(value);
      return;
    }

    const duration = 1200;
    const interval = 30;
    const steps = Math.max(1, Math.floor(duration / interval));
    let count = 0;
    const increment = target / steps;

    const timer = window.setInterval(() => {
      count += increment;
      if (count >= target) {
        setDisplayValue(`${target}${suffix}`);
        window.clearInterval(timer);
      } else {
        setDisplayValue(`${Math.floor(count)}${suffix}`);
      }
    }, interval);

    return () => window.clearInterval(timer);
  }, [target, suffix, value]);

  return <div className="font-display text-5xl font-bold">{displayValue}</div>;
}

function TooltipCard({ tooltip, children }: { tooltip: string; children: ReactNode }) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div className="w-full h-full">{children}</div>
      </TooltipTrigger>
      <TooltipContent side="top">{tooltip}</TooltipContent>
    </Tooltip>
  );
}

function Index() {
  return (
    <TooltipProvider>
      <div>
        {/* HERO */}
        <section className="relative overflow-hidden">
          <div className="hero-glow absolute inset-0 -z-10" />
          <div className="container-x grid items-center gap-12 py-20 lg:grid-cols-2 lg:py-28">
            <div>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="eyebrow cursor-help">
                    <Sparkles size={12} /> Hello! Welcome to Svms Technologies
                  </span>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  Welcome to Svms Technologies — your partner for data, AI, and digital innovation.
                </TooltipContent>
              </Tooltip>
              <h1 className="mt-5 text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl">
                Empowering Businesses with{" "}
                <span className="brand-text">Data & Digital Innovation</span>
              </h1>
              <p className="mt-6 max-w-xl text-lg text-muted-foreground">
                We deliver high-quality AI data annotation services, modern web development, and
                scalable IT solutions that help businesses grow faster in the digital era.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/contact" className="btn-primary">
                  Get Started <ArrowRight size={16} />
                </Link>
                <Link to="/services" className="btn-outline">
                  Explore Services
                </Link>
              </div>
              <p className="mt-6 text-xs uppercase tracking-[0.18em] text-muted-foreground">
                Trusted by startups, enterprises & AI-driven businesses
              </p>
            </div>
            <div className="relative animate-floaty">
              <div
                className="absolute -inset-6 -z-10 rounded-[2rem]"
                style={{ background: "var(--gradient-brand)", opacity: 0.08, filter: "blur(40px)" }}
              />
              <TooltipCard tooltip="A modern showcase of our team and digital capabilities.">
                <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-[var(--shadow-elevated)]">
                  <video src={video} autoPlay loop muted className="w-full h-full object-cover" />
                </div>
              </TooltipCard>
              <div className="absolute -bottom-6 -left-6 hidden rounded-2xl border border-border bg-card p-4 shadow-[var(--shadow-soft)] sm:block">
                <div className="flex items-center gap-3">
                  <div
                    className="grid h-10 w-10 place-items-center rounded-xl"
                    style={{ background: "var(--gradient-brand)" }}
                  >
                    <CheckCircle2 size={20} className="text-primary-foreground" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold">99% Accuracy</div>
                    <div className="text-xs text-muted-foreground">Across 100+ projects</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ABOUT */}
        <section className="border-y border-border bg-surface">
          <div className="container-x grid gap-12 py-20 lg:grid-cols-2">
            <div>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="eyebrow cursor-help">About Us</span>
                </TooltipTrigger>
                <TooltipContent side="top">
                  Learn more about our mission, expertise, and technology approach.
                </TooltipContent>
              </Tooltip>
              <h2 className="mt-4 text-3xl font-bold md:text-4xl">
                A technology partner built for what's next.
              </h2>
              <img src={gif1} alt="" className="h-30 w-200 object-contain mix-blend-multiply" />
            </div>
            <div className="space-y-4 text-muted-foreground">
              <p>
                We are a technology-focused company providing reliable Data Services and IT
                Solutions for businesses worldwide. Our expertise spans AI data annotation, image
                labeling, web design, software development, automation, and digital transformation.
              </p>
              <p>
                We combine innovation, accuracy, and technical expertise to help organizations build
                smarter systems, improve efficiency, and accelerate growth.
              </p>
              <p className="font-medium text-foreground">
                Our mission: deliver scalable, high-quality solutions tailored to modern business
                needs.
              </p>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 font-semibold text-primary"
              >
                Learn more about us <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section className="container-x py-24">
          <div className="mx-auto max-w-2xl text-center">
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="eyebrow cursor-help">What We Do</span>
              </TooltipTrigger>
              <TooltipContent side="top">
                Explore our services for data annotation, web development, and IT solutions.
              </TooltipContent>
            </Tooltip>
            <h2 className="mt-4 text-3xl font-bold md:text-5xl">Our Services</h2>
            <p className="mt-4 text-muted-foreground">
              Our expertise helps businesses stay ahead with innovative, efficient, and adaptable
              solutions.
            </p>
          </div>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {services.map((s, i) => (
              <Reveal key={s.title} delay={i * 90} className="w-full">
                <TooltipCard tooltip={s.desc}>
                  <div className="card-surface group">
                    <div
                      className="grid h-12 w-12 place-items-center rounded-xl"
                      style={{ background: "color-mix(in oklab, var(--accent) 20%, transparent)" }}
                    >
                      <s.icon size={22} className="text-primary" />
                    </div>
                    <h3 className="mt-5 text-xl font-semibold">{s.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
                    <Link
                      to="/services"
                      className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-primary"
                    >
                      Learn more{" "}
                      <ArrowRight size={14} className="transition group-hover:translate-x-1" />
                    </Link>
                  </div>
                </TooltipCard>
              </Reveal>
            ))}
          </div>
        </section>

        {/* WHY US */}
        <section className="bg-surface py-24">
          <div className="container-x">
            <div className="mx-auto max-w-2xl text-center">
              <span className="eyebrow">Why Choose Us</span>
              <h2 className="mt-4 text-3xl font-bold md:text-5xl">Why Businesses Choose Us</h2>
            </div>
            <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {whyUs.map((w, i) => (
                <Reveal key={w.t} delay={i * 60} className="w-full">
                  <TooltipCard tooltip={w.t}>
                    <div className="card-surface flex items-center gap-3">
                      <div
                        className="grid h-10 w-10 shrink-0 place-items-center rounded-lg"
                        style={{ background: "var(--gradient-brand)" }}
                      >
                        <w.icon size={18} className="text-primary-foreground" />
                      </div>
                      <span className="font-semibold">{w.t}</span>
                    </div>
                  </TooltipCard>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* STATS */}
        <section className="container-x py-20">
          <div className="text-center mb-10">
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="eyebrow cursor-help">Our Impact</span>
              </TooltipTrigger>
              <TooltipContent side="top">
                Metrics that show our quality, delivery, and client support performance.
              </TooltipContent>
            </Tooltip>
          </div>
          <div
            className="overflow-hidden rounded-3xl border border-border p-10 md:p-14"
            style={{ background: "var(--gradient-brand)" }}
          >
            <div className="grid gap-8 text-primary-foreground md:grid-cols-4">
              {stats.map((s, i) => (
                <Reveal key={s.l} delay={i * 100} className="w-full">
                  <TooltipCard tooltip={s.l}>
                    <div>
                      <CountUp value={s.n} />
                      <div className="mt-2 text-sm opacity-80">{s.l}</div>
                    </div>
                  </TooltipCard>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* INDUSTRIES */}
        <section className="container-x py-20">
          <div className="mx-auto max-w-2xl text-center">
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="eyebrow cursor-help">Industries</span>
              </TooltipTrigger>
              <TooltipContent side="top">
                Sectors where we deliver data, AI, e-commerce, and enterprise technology solutions.
              </TooltipContent>
            </Tooltip>
            <h2 className="mt-4 text-3xl font-bold md:text-5xl">Industries We Work With</h2>
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-3 lg:grid-cols-3">
            {industries.map((i, idx) => (
              <Reveal key={i.t} delay={idx * 60} className="w-full">
                <TooltipCard tooltip={i.t}>
                  <div className="card-surface flex items-center gap-4">
                    <div className="grid h-12 w-12 place-items-center rounded-xl bg-secondary">
                      <i.icon size={22} className="text-primary" />
                    </div>
                    <span className="font-semibold">{i.t}</span>
                  </div>
                </TooltipCard>
              </Reveal>
            ))}
          </div>
        </section>

        {/* PROCESS */}
        <section className="bg-surface py-24 overflow-hidden">
          <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-32 opacity-70">
            <svg
              viewBox="0 0 1440 160"
              className="h-full w-full"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path
                d="M0,96 C240,160 480,32 720,96 C960,160 1200,32 1440,96 L1440,160 L0,160 Z"
                fill="rgba(99,102,241,0.12)"
              />
            </svg>
          </div>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-24 opacity-50">
            <svg
              viewBox="0 0 1440 160"
              className="h-full w-full"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path
                d="M0,32 C360,96 720,-16 1080,32 C1260,56 1320,32 1440,32 L1440,160 L0,160 Z"
                fill="rgba(79,70,229,0.08)"
              />
            </svg>
          </div>
          <div className="container-x relative">
            <div className="mx-auto max-w-2xl text-center">
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="eyebrow cursor-help">Our Strategy</span>
                </TooltipTrigger>
                <TooltipContent side="top">
                  A step-by-step overview of how we turn data into business value.
                </TooltipContent>
              </Tooltip>
              <h2 className="mt-4 text-3xl font-bold md:text-5xl">Our Process</h2>
              <p className="mt-4 text-muted-foreground">
                A strategic, result-driven approach to deliver lasting impact.
              </p>
            </div>
            <div className="relative mt-14">
              <div className="absolute inset-x-0 top-1/2 -z-10 h-28 opacity-80">
                <svg
                  viewBox="0 0 1440 80"
                  className="h-full w-full"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <path
                    d="M0,40 C150,0 310,80 450,40 C590,0 750,80 890,40 C1030,0 1190,80 1320,40 C1380,20 1440,40 1440,40"
                    fill="none"
                    stroke="rgba(148,163,184,0.25)"
                    strokeWidth="2"
                  />
                </svg>
              </div>
              <div className="grid gap-6 grid-cols-1 md:grid-cols-3 lg:grid-cols-6">
                {process.map((p, i) => {
                  const topLabel = i % 2 === 0;
                  return (
                    <Reveal key={p.n} delay={i * 100} className="w-full">
                      <TooltipCard tooltip={p.d}>
                        <div className="relative flex flex-col items-center text-center">
                          {topLabel ? (
                            <div className="flex flex-col items-center gap-3">
                              <div className="text-sm font-semibold tracking-tight">{p.t}</div>
                              <div className="flex flex-col items-center gap-2">
                                <span className="inline-flex h-2 w-2 rounded-full bg-primary" />
                                <span className="block h-8 w-px bg-border" />
                              </div>
                            </div>
                          ) : null}
                          <div className="relative z-10 flex h-24 w-24 items-center justify-center rounded-full border border-border bg-card shadow-sm">
                            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary to-violet-700 text-sm font-semibold text-white shadow-inner">
                              Step {i + 1}
                            </div>
                          </div>
                          {!topLabel ? (
                            <div className="flex flex-col items-center gap-3">
                              <div className="flex flex-col items-center gap-2">
                                <span className="block h-8 w-px bg-border" />
                                <span className="inline-flex h-2 w-2 rounded-full bg-primary" />
                              </div>
                              <div className="text-sm font-semibold tracking-tight">{p.t}</div>
                            </div>
                          ) : null}
                          <p className="mt-3 max-w-[12rem] text-sm text-muted-foreground">{p.d}</p>
                        </div>
                      </TooltipCard>
                    </Reveal>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="container-x pb-24">
          <TooltipCard tooltip="Reach out to our team for AI, web, or software project support.">
            <div className="overflow-hidden rounded-3xl border border-border bg-card p-10 text-center md:p-16">
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="eyebrow cursor-help">Get In Touch</span>
                </TooltipTrigger>
                <TooltipContent side="top">
                  Contact our team to discuss your next AI, web, or software project.
                </TooltipContent>
              </Tooltip>
              <h2 className="mx-auto mt-4 max-w-2xl text-3xl font-bold md:text-5xl">
                Let's build something <span className="brand-text">amazing together</span>.
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
                Have a project idea or business requirement? Reach out to our team today.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Link to="/contact" className="btn-primary">
                  Contact Us <ArrowRight size={16} />
                </Link>
                <Link to="/services" className="btn-outline">
                  View Services
                </Link>
              </div>
            </div>
          </TooltipCard>
        </section>

        <div className="pointer-events-none fixed right-4 bottom-4 z-50">
          <Tooltip>
            <TooltipTrigger asChild>
              <a
                href="https://wa.me/918328210998"
                target="_blank"
                rel="noreferrer"
                title="Message us on WhatsApp"
                className="pointer-events-auto inline-flex h-14 w-14 items-center justify-center rounded-full bg-green-400 text-white shadow-2xl shadow-green-300/40 transition-transform duration-300 ease-out hover:-translate-y-1 active:scale-[0.98] animate-bounce"
              >
                <MessageCircle size={24} />
                <span className="sr-only">WhatsApp support 24/7</span>
              </a>
            </TooltipTrigger>
            <TooltipContent side="left">Send us a WhatsApp message anytime.</TooltipContent>
          </Tooltip>
        </div>
      </div>
    </TooltipProvider>
  );
}
