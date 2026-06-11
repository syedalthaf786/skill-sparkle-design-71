import { Link } from "react-router-dom";
import { type ReactNode, useEffect, useRef, useState } from "react";
import { supabase } from "@/lib/supabase";
import heroTeam from "@/assets/hero-team.jpg";
import { Reveal } from "@/components/site/Reveal";
import RoboSnowBackground from "@/components/site/RoboSnowBackground";
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
  X,
  Phone,
} from "lucide-react";


import video from "@/assets/video.mp4";
import gif1 from "@/assets/ai1.webp";
import svcAnnotation from "@/assets/svc-annotation.jpg";
import svcWeb from "@/assets/svc-web.jpg";
import svcIt from "@/assets/svc-it.jpg";

const services = [
  {
    icon: Database,
    title: "AI Data Annotation",
    desc: "Accurate, scalable annotation for AI & ML projects — image, video, text, and audio.",
    image: svcAnnotation,
  },
  {
    icon: Code2,
    title: "Web Design & Development",
    desc: "Creative, responsive websites optimized for performance, SEO, and user experience.",
    image: svcWeb,
  },
  {
    icon: Cpu,
    title: "IT & Software Solutions",
    desc: "End-to-end custom software, AI/ML, automation, and cloud services for enterprises.",
    image: svcIt,
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
  { n: "50+", l: "Projects Completed" },
  { n: "25+", l: "Happy Clients" },
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

function ServicesGrid() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className="mt-14 grid gap-6 md:grid-cols-3">
      {services.map((s, i) => (
        <TooltipCard key={s.title} tooltip={s.desc}>
          <div
            className={`card-surface group ${visible ? "service-card" : "opacity-0"}`}
            style={{ ["--i" as any]: i }}
          >
            <div className="service-media">
              <img src={s.image} alt={s.title} loading="lazy" width={768} height={480} />
              <div className="badge">
                <s.icon size={18} />
              </div>
            </div>
            <h3 className="service-title mt-6 text-xl font-semibold">{s.title}</h3>
            <p className="service-desc mt-2 text-sm text-muted-foreground">{s.desc}</p>
            <Link
              to="/services"
              className="service-cta mt-5 inline-flex items-center gap-1 text-sm font-semibold text-primary"
            >
              Learn more{" "}
              <ArrowRight size={14} className="transition group-hover:translate-x-1" />
            </Link>
          </div>
        </TooltipCard>
      ))}
    </div>
  );
}

export default function Index() {
  const [showPopup, setShowPopup] = useState(false);
  const [ads, setAds] = useState<Array<{ id: string; url: string }>>([{ id: "1", url: "/ad-banner.jpg" }]);
  const [currentAdIndex, setCurrentAdIndex] = useState(0);

  // Allow reopening popup via URL param for testing: ?popup=true
  useEffect(() => {
    if (new URLSearchParams(window.location.search).get("popup") === "true") {
      sessionStorage.removeItem("popupShown");
    }
  }, []);

  useEffect(() => {
    const loadAds = async () => {
      const savedAds = localStorage.getItem("popupAds");
      const cachedTime = localStorage.getItem("popupAdsTime");
      const now = Date.now();
      const cacheAge = cachedTime ? now - parseInt(cachedTime) : Infinity;
      
      // Use cache only if less than 5 minutes old
      if (savedAds && cacheAge < 5 * 60 * 1000) {
        try {
          const parsed = JSON.parse(savedAds);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setAds(parsed);
          }
        } catch { /* fallback to supabase */ }
      }

      // Always try Supabase for fresh data
      try {
        const { data, error } = await supabase
          .from("popup_ads")
          .select("id, url, title")
          .eq("active", true)
          .order("created_at", { ascending: true });
        
        if (!error && data && data.length > 0) {
          setAds(data);
          localStorage.setItem("popupAds", JSON.stringify(data));
          localStorage.setItem("popupAdsTime", Date.now().toString());
        } else if (savedAds && cacheAge >= 5 * 60 * 1000) {
          // Cache expired and no data from Supabase, clear cache
          localStorage.removeItem("popupAds");
          localStorage.removeItem("popupAdsTime");
        }
      } catch (err) {
        console.warn("Could not load ads from Supabase:", err);
      }
    };
    loadAds();
  }, []);

  useEffect(() => {
    const popupShown = sessionStorage.getItem("popupShown");
    if (!popupShown) {
      const timer = setTimeout(() => setShowPopup(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    if (showPopup && ads.length > 0) {
      const interval = setInterval(() => {
        setCurrentAdIndex((prev) => (prev + 1) % ads.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [showPopup, ads.length]);

  const handleClose = () => {
    setShowPopup(false);
    sessionStorage.setItem("popupShown", "true");
  };

  const currentAdUrl = ads[currentAdIndex]?.url || "/ad-banner.jpg";

  return (
    <TooltipProvider>
      <div>
        {showPopup && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
            <div className="relative max-w-lg w-full animate-in fade-in zoom-in duration-300">
              <button
                onClick={handleClose}
                className="absolute -top-2 -right-2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white text-foreground shadow-lg hover:bg-muted transition-colors"
                aria-label="Close popup"
              >
                <X size={18} />
              </button>
<div className="overflow-hidden rounded-lg shadow-2xl">
                 <img
                   src={currentAdUrl}
                   alt="Special Offer"
                   className="w-full object-cover transition-opacity duration-500"
                   onError={(e) => {
                     e.currentTarget.src = "https://placehold.co/600x400/png?text=Special+Offer";
                   }}
                 />
               </div>
               {ads.length > 1 && (
                 <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                   {ads.map((_, i) => (
                     <button
                       key={i}
                       onClick={() => setCurrentAdIndex(i)}
                       className={`h-2 w-2 rounded-full transition ${
                         i === currentAdIndex ? "bg-white" : "bg-white/50"
                       }`}
                     />
                   ))}
                 </div>
               )}
             </div>
           </div>
         )}
        {/* HERO — QualityThought-style deep navy */}
        <section
          className="relative overflow-hidden text-white"
          style={{ background: "var(--gradient-navy)" }}
        >
          {/* subtle orange glow */}
          <div
            className="pointer-events-none absolute inset-0 -z-0"
            style={{
              background:
                "radial-gradient(ellipse 60% 50% at 80% 20%, rgba(242,107,26,0.22), transparent 60%), radial-gradient(ellipse 50% 40% at 10% 80%, rgba(242,107,26,0.12), transparent 70%)",
            }}
          />
          {/* decorative grid lines */}
          <div
            className="pointer-events-none absolute inset-0 -z-0 opacity-[0.08]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />

          <div className="container-x relative grid items-center gap-12 py-20 lg:grid-cols-2 lg:py-28">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/90 ring-1 ring-white/20">
                <Sparkles size={12} className="text-[var(--primary-glow)]" /> Trusted by 50+ Brands
                Since 2018
              </span>
              <h1 className="mt-5 text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl text-white">
                Empowering Businesses with{" "}
                <span
                  style={{
                    background: "var(--gradient-brand)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
                  }}
                >
                  Data & Digital Innovation
                </span>
              </h1>
              <p className="mt-6 max-w-xl text-lg text-white/75">
                100+ Industry-Focused Solutions • 50+ Success Stories • 6+ Years of Excellence in
                AI data annotation, modern web development, and scalable IT.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="tel:+918328210998" className="btn-primary">
                  <Phone size={16} /> Talk To Expert
                </a>
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-md border-2 border-white/30 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white hover:text-[var(--accent)]"
                >
                  Get Free Demo <ArrowRight size={16} />
                </Link>
              </div>
              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/80">
                {["Top Tech Partner", "1000+ Deliveries", "Expert Engineers", "24/7 Support"].map(
                  (t) => (
                    <span key={t} className="inline-flex items-center gap-2">
                      <CheckCircle2 size={14} className="text-[var(--primary-glow)]" />
                      {t}
                    </span>
                  ),
                )}
              </div>
            </div>

            <div className="relative animate-floaty">
              <div
                className="absolute -inset-6 -z-10 rounded-[2rem]"
                style={{ background: "var(--gradient-brand)", opacity: 0.18, filter: "blur(50px)" }}
              />
              <div className="overflow-hidden rounded-2xl border border-white/15 bg-white/5 shadow-[0_30px_80px_rgba(0,0,0,0.45)] backdrop-blur">
                <img
                  src={heroTeam}
                  alt="Xenvonta team collaborating"
                  className="w-full h-full object-cover"
                  loading="eager"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 hidden rounded-xl border border-white/15 bg-white p-4 shadow-2xl sm:block">
                <div className="flex items-center gap-3">
                  <div
                    className="grid h-10 w-10 place-items-center rounded-lg"
                    style={{ background: "var(--gradient-brand)" }}
                  >
                    <CheckCircle2 size={20} className="text-white" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-[var(--accent)]">99% Accuracy</div>
                    <div className="text-xs text-muted-foreground">Across 100+ projects</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats strip — QT style */}
          <div className="relative">
            <div className="container-x pb-20 lg:pb-24">
              <div className="grid grid-cols-2 gap-4 rounded-2xl border border-white/15 bg-white/8 p-6 backdrop-blur md:grid-cols-4 md:p-8">
                {[
                  { n: "6+", l: "Years of Excellence" },
                  { n: "100+", l: "Solutions Delivered" },
                  { n: "50+", l: "Happy Clients" },
                  { n: "1000+", l: "Annual Deliveries" },
                ].map((s) => (
                  <div key={s.l} className="text-center">
                    <div className="font-display text-3xl md:text-4xl font-bold text-[var(--primary-glow)]">
                      {s.n}
                    </div>
                    <div className="mt-1 text-xs md:text-sm font-medium uppercase tracking-wider text-white/80">
                      {s.l}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>


        {/* ABOUT */}
        <section className="border-y border-border bg_surface">
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
          <ServicesGrid />
        </section>

        {/* ENDORSEMENT — QT Sathyaraj style quote block */}
        <section className="bg_surface border-y border-border py-20">
          <div className="container-x">
            <div className="mx-auto max-w-3xl text-center">
              <span className="inline-flex rounded-full bg-[var(--secondary)] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--accent)]">
                Trusted Partner
              </span>
              <h2 className="mt-5 text-3xl font-bold text-[var(--accent)] md:text-5xl">
                Quality Through{" "}
                <span style={{ background: "var(--gradient-brand)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>
                  Excellence
                </span>
              </h2>
              <p className="mt-4 text-muted-foreground">
                India's most trusted technology partner for AI, data and digital transformation —
                with unmatched accuracy, delivery and support.
              </p>
              <div className="mt-10 mx-auto max-w-2xl rounded-2xl border border-border bg_card p-8 shadow-[var(--shadow-soft)]">
                <Quote size={28} className="mx-auto text-[var(--primary)]" />
                <p className="mt-4 text-lg italic text-[var(--accent)]">
                  "Xenvonta turned our raw data into a real growth engine. Their delivery quality
                  and consistency is simply best in class."
                </p>
                <div className="mt-5 text-sm font-semibold text-[var(--accent)]">
                  — Head of AI, Fortune 500 Enterprise
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CLIENT LOGOS — QT style marquee */}
        <section className="py-16">
          <div className="container-x">
            <div className="text-center">
              <span className="eyebrow">Our Clients & Partners</span>
              <h2 className="mt-3 text-2xl font-bold text-[var(--accent)] md:text-3xl">
                Trusted by leading brands across industries
              </h2>
            </div>
            <div className="marquee-mask mt-10 overflow-hidden">
              <div className="marquee-track gap-12 pr-12">
                {[...Array(2)].flatMap((_, k) =>
                  [
                    "Microsoft", "Amazon", "Google", "Oracle", "Adobe",
                    "Infosys", "TCS", "Wipro", "Capgemini", "Accenture",
                  ].map((name) => (
                    <div
                      key={`${k}-${name}`}
                      className="grid h-16 w-44 shrink-0 place-items-center rounded-xl border border-border bg_card text-lg font-bold tracking-tight text-[var(--accent)]/70 shadow-[var(--shadow-soft)] transition hover:text-[var(--primary)]"
                    >
                      {name}
                    </div>
                  )),
                )}
              </div>
            </div>
          </div>
        </section>


        <section className="bg_surface py-24">
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
                    <div className="grid h-12 w-12 place-items-center rounded-xl bg_secondary">
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
        <section className="bg_surface py-24 overflow-hidden">
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
                              <div className="text_sm font-semibold tracking-tight">{p.t}</div>
                              <div className="flex flex-col items-center gap-2">
                                <span className="inline-flex h-2 w-2 rounded-full bg_primary" />
                                <span className="block h-8 w-px bg-border" />
                              </div>
                            </div>
                          ) : null}
                          <div className="relative z-10 flex h-24 w-24 items-center justify-center rounded-full border border-border bg_card shadow-sm">
                            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary to-violet-700 text-sm font-semibold text-white shadow-inner">
                              Step {i + 1}
                            </div>
                          </div>
                          {!topLabel ? (
                            <div className="flex flex-col items-center gap-3">
                              <div className="flex flex-col items-center gap-2">
                                <span className="block h-8 w-px bg-border" />
                                <span className="inline-flex h-2 w-2 rounded-full bg_primary" />
                              </div>
                              <div className="text_sm font-semibold tracking-tight">{p.t}</div>
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
            <div className="overflow-hidden rounded-3xl border border-border bg_card p-10 text-center md:p-16">
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
