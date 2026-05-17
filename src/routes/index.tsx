import { createFileRoute, Link } from "@tanstack/react-router";
import heroTeam from "@/assets/hero-team.jpg";
import { Reveal } from "@/components/site/Reveal";
import {
  ArrowRight, Sparkles, ShieldCheck, Zap, Database, Code2, Cpu,
  CheckCircle2, Users, Award, Clock, Quote,
  Brain, HeartPulse, ShoppingBag, Banknote, GraduationCap, Building2, Truck, Rocket, Store,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "NovaStack — Empowering Businesses with Data & Digital Innovation" },
      { name: "description", content: "AI data annotation, web design, software development, and scalable IT solutions for modern enterprises." },
      { property: "og:title", content: "NovaStack — Data, AI & IT Solutions" },
      { property: "og:description", content: "Transforming data into intelligent solutions." },
    ],
  }),
  component: Index,
});

const services = [
  { icon: Database, title: "AI Data Annotation", desc: "Accurate, scalable annotation for AI & ML projects — image, video, text, and audio." },
  { icon: Code2, title: "Web Design & Development", desc: "Creative, responsive websites optimized for performance, SEO, and user experience." },
  { icon: Cpu, title: "IT & Software Solutions", desc: "End-to-end custom software, AI/ML, automation, and cloud services for enterprises." },
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
  { n: "01", t: "Requirement Analysis", d: "Understanding your business goals and project needs." },
  { n: "02", t: "Planning & Strategy", d: "Creating the right technical approach and workflow." },
  { n: "03", t: "Development & Execution", d: "Delivering high-quality services with precision." },
  { n: "04", t: "Quality Assurance", d: "Testing, validation, and performance optimization." },
  { n: "05", t: "Delivery & Support", d: "Successful deployment with continuous support." },
];

const stats = [
  { n: "100+", l: "Projects Completed" },
  { n: "50+", l: "Happy Clients" },
  { n: "99%", l: "Quality Accuracy" },
  { n: "24/7", l: "Client Support" },
];

const testimonials = [
  { q: "The team delivered exceptional annotation quality with fast turnaround times.", a: "Aarav Sharma", r: "AI Product Lead" },
  { q: "Our website now looks modern, responsive, and highly professional.", a: "Priya Mehta", r: "Marketing Director" },
  { q: "They provided scalable IT solutions that improved our workflow efficiency.", a: "Rahul Verma", r: "CTO, FinEdge" },
];

function Index() {
  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="hero-glow absolute inset-0 -z-10" />
        <div className="container-x grid items-center gap-12 py-20 lg:grid-cols-2 lg:py-28">
          <div>
            <span className="eyebrow">
              <Sparkles size={12} /> Hello! Welcome to NovaStack
            </span>
            <h1 className="mt-5 text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl">
              Empowering Businesses with{" "}
              <span className="brand-text">Data & Digital Innovation</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground">
              We deliver high-quality AI data annotation services, modern web development, and scalable IT solutions that help businesses grow faster in the digital era.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/contact" className="btn-primary">Get Started <ArrowRight size={16} /></Link>
              <Link to="/services" className="btn-outline">Explore Services</Link>
            </div>
            <p className="mt-6 text-xs uppercase tracking-[0.18em] text-muted-foreground">
              Trusted by startups, enterprises & AI-driven businesses
            </p>
          </div>
          <div className="relative animate-floaty">
            <div className="absolute -inset-6 -z-10 rounded-[2rem]" style={{ background: "var(--gradient-brand)", opacity: 0.08, filter: "blur(40px)" }} />
            <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-[var(--shadow-elevated)]">
              <img src={heroTeam} alt="Professional NovaStack team" width={1920} height={1080} className="h-auto w-full" />
            </div>
            <div className="absolute -bottom-6 -left-6 hidden rounded-2xl border border-border bg-card p-4 shadow-[var(--shadow-soft)] sm:block">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-xl" style={{ background: "var(--gradient-brand)" }}>
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
            <span className="eyebrow">About Us</span>
            <h2 className="mt-4 text-3xl font-bold md:text-4xl">A technology partner built for what's next.</h2>
          </div>
          <div className="space-y-4 text-muted-foreground">
            <p>We are a technology-focused company providing reliable Data Services and IT Solutions for businesses worldwide. Our expertise spans AI data annotation, image labeling, web design, software development, automation, and digital transformation.</p>
            <p>We combine innovation, accuracy, and technical expertise to help organizations build smarter systems, improve efficiency, and accelerate growth.</p>
            <p className="font-medium text-foreground">Our mission: deliver scalable, high-quality solutions tailored to modern business needs.</p>
            <Link to="/about" className="inline-flex items-center gap-2 font-semibold text-primary">Learn more about us <ArrowRight size={16} /></Link>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="container-x py-24">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">What We Do</span>
          <h2 className="mt-4 text-3xl font-bold md:text-5xl">Our Services</h2>
          <p className="mt-4 text-muted-foreground">Our expertise helps businesses stay ahead with innovative, efficient, and adaptable solutions.</p>
        </div>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={i * 90} className="card-surface group">
              <div className="grid h-12 w-12 place-items-center rounded-xl" style={{ background: "color-mix(in oklab, var(--accent) 20%, transparent)" }}>
                <s.icon size={22} className="text-primary" />
              </div>
              <h3 className="mt-5 text-xl font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
              <Link to="/services" className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                Learn more <ArrowRight size={14} className="transition group-hover:translate-x-1" />
              </Link>
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
              <Reveal key={w.t} delay={i * 60} className="card-surface flex items-center gap-3">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg" style={{ background: "var(--gradient-brand)" }}>
                  <w.icon size={18} className="text-primary-foreground" />
                </div>
                <span className="font-semibold">{w.t}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="container-x py-20">
        <div className="overflow-hidden rounded-3xl border border-border p-10 md:p-14" style={{ background: "var(--gradient-brand)" }}>
          <div className="grid gap-8 text-primary-foreground md:grid-cols-4">
            {stats.map((s) => (
              <div key={s.l}>
                <div className="font-display text-5xl font-bold">{s.n}</div>
                <div className="mt-2 text-sm opacity-80">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INDUSTRIES */}
      <section className="container-x py-20">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">Industries</span>
          <h2 className="mt-4 text-3xl font-bold md:text-5xl">Industries We Work With</h2>
        </div>
        <div className="mt-12 grid gap-4 sm:grid-cols-3 lg:grid-cols-3">
          {industries.map((i) => (
            <div key={i.t} className="card-surface flex items-center gap-4">
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-secondary">
                <i.icon size={22} className="text-primary" />
              </div>
              <span className="font-semibold">{i.t}</span>
            </div>
          ))}
        </div>
      </section>

      {/* PROCESS */}
      <section className="bg-surface py-24">
        <div className="container-x">
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow">Our Strategy</span>
            <h2 className="mt-4 text-3xl font-bold md:text-5xl">Our Process</h2>
            <p className="mt-4 text-muted-foreground">A strategic, result-driven approach to deliver lasting impact.</p>
          </div>
          <div className="mt-14 grid gap-6 md:grid-cols-3 lg:grid-cols-5">
            {process.map((p) => (
              <div key={p.n} className="card-surface relative">
                <div className="font-display text-4xl font-bold brand-text">{p.n}</div>
                <h3 className="mt-3 font-semibold">{p.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="container-x py-24">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">Testimonials</span>
          <h2 className="mt-4 text-3xl font-bold md:text-5xl">What Clients Say</h2>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <div key={t.a} className="card-surface">
              <Quote size={28} className="text-primary opacity-40" />
              <p className="mt-4 text-foreground">"{t.q}"</p>
              <div className="mt-6 border-t border-border pt-4">
                <div className="font-semibold">{t.a}</div>
                <div className="text-xs text-muted-foreground">{t.r}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container-x pb-24">
        <div className="overflow-hidden rounded-3xl border border-border bg-card p-10 text-center md:p-16">
          <span className="eyebrow">Get In Touch</span>
          <h2 className="mx-auto mt-4 max-w-2xl text-3xl font-bold md:text-5xl">
            Let's build something <span className="brand-text">amazing together</span>.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Have a project idea or business requirement? Reach out to our team today.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/contact" className="btn-primary">Contact Us <ArrowRight size={16} /></Link>
            <Link to="/services" className="btn-outline">View Services</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
