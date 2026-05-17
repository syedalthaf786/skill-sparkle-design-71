import { createFileRoute, Link } from "@tanstack/react-router";
import { Database, Code2, Cpu, Check, ArrowRight } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { motion } from "framer-motion";
export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Data, Web & IT Solutions | Svms Technologies" },
      {
        name: "description",
        content:
          "AI data annotation, web design & development, and custom IT software solutions for startups and enterprises.",
      },
      { property: "og:title", content: "Svms Technologies Services" },
      {
        property: "og:description",
        content: "End-to-end technology services tailored for modern businesses.",
      },
    ],
  }),
  component: ServicesPage,
});

const services = [
  {
    icon: Database,
    title: "AI Data & Language Services",
    desc: "Accurate and scalable annotation solutions for AI and Machine Learning projects.",
    highlight: "High-quality datasets for training intelligent AI models.",
    items: [
      "Image Annotation",
      "Bounding Box Labeling",
      "Polygon Annotation",
      "Semantic Segmentation",
      "Video Annotation",
      "OCR Annotation",
      "Text Annotation",
      "NLP Data Tagging",
      "Audio Transcription",
      "Validation & QA",
      "Transcription",
      "Translation"
    ],
  },
  {
    icon: Code2,
    title: "Web Design & Development",
    desc: "Creative and responsive websites designed to build your online presence.",
    highlight: "Modern websites optimized for performance and user experience.",
    items: [
      "Business Websites",
      "Portfolio Websites",
      "E-Commerce Development",
      "Landing Pages",
      "UI/UX Design",
      "Responsive Design",
      "SEO Optimization",
      "Website Maintenance",
    ],
  },
  {
    icon: Cpu,
    title: "IT & Software Solutions",
    desc: "End-to-end technology services tailored for startups and enterprises.",
    highlight: "Innovative solutions that power digital transformation.",
    items: [
      "Custom Software Development",
      "AI & ML Solutions",
      "Automation Systems",
      "Cloud Solutions",
      "API Development",
      "Database Management",
      "Technical Support",
      "IT Consulting",
    ],
  },
];
const slides = [
  {
    title: "AI & Data Solutions",
    desc: "Training-grade datasets and AI-powered automation services.",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1600&auto=format&fit=crop",
  },
  {
    title: "Modern Software Development",
    desc: "Scalable web, mobile, and enterprise software solutions.",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1600&auto=format&fit=crop",
  },
  {
    title: "Cloud & DevOps",
    desc: "Secure cloud infrastructure and high-performance deployment pipelines.",
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1600&auto=format&fit=crop",
  },
];

function ServicesPage() {
  return (
    <div>
     <section className="relative overflow-hidden">
  {/* Background Carousel */}
  <div className="absolute inset-0 -z-20">
    <div className="carousel h-full w-full">
      {slides.map((slide, index) => (
        <div
          key={index}
          className="carousel-item absolute inset-0 animate-carousel"
          style={{
            animationDelay: `${index * 5}s`,
            backgroundImage: `url(${slide.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      ))}
    </div>

    {/* Overlay */}
    <div className="absolute inset-0 bg-black/70" />
  </div>

  {/* Glow */}
  <div className="hero-glow absolute inset-0 -z-10" />

  {/* Content */}
  <div className="container-x py-20 lg:py-28 relative z-10 text-white">
    <motion.span
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="eyebrow"
    >
      Our Services
    </motion.span>

    <motion.h1
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="mt-4 max-w-3xl text-4xl font-bold md:text-6xl leading-tight"
    >
      End-to-end{" "}
      <span className="brand-text animate-pulse">
        technology services
      </span>{" "}
      for every stage of growth.
    </motion.h1>

    <motion.p
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="mt-6 max-w-2xl text-lg text-gray-200"
    >
      From training-grade datasets to production-ready software, our team ships
      the work that powers modern businesses.
    </motion.p>
  </div>
</section>

      <section className="container-x space-y-10 pb-24">
        {services.map((s, idx) => (
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
                    <Check size={16} className="shrink-0" style={{ color: "var(--accent)" }} />
                    <span className="text-sm font-medium">{i}</span>
                  </Reveal>
                ))}
              </div>
            </div>
          </Reveal>
        ))}

        <div
          className="rounded-3xl border border-border p-10 text-center md:p-14"
          style={{ background: "var(--gradient-brand)" }}
        >
          <h2 className="text-3xl font-bold text-primary-foreground md:text-4xl">
            Ready to start your project?
          </h2>
          <Link
            to="/contact"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-background px-6 py-3 text-sm font-semibold text-foreground transition hover:scale-105"
          >
            Get a Quote <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
