import { Link } from "react-router-dom";
import { Target, Eye, Heart, ArrowRight } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import gif from "@/assets/ai.webp";

export default function AboutPage() {
  return (
    <div>
      <section className="relative overflow-hidden">
        <div className="hero-glow absolute inset-0 -z-10" />
        <div className="container-x py-20 lg:py-28">
          <span className="eyebrow">About Us</span>
          <h1 className="mt-4 max-w-3xl text-4xl font-bold md:text-6xl">
            Building <span className="brand-text">intelligent systems</span> for ambitious
            businesses.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            We are a technology-focused company providing reliable Data Services and IT Solutions
            for businesses worldwide. Our expertise spans AI data annotation, image labeling, web
            design, software development, automation, and digital transformation.
          </p>
        </div>
      </section>

      <section className="border-y border-border bg-surface py-20">
        <div className="container-x grid gap-6 md:grid-cols-3">
          {[
            {
              icon: Target,
              t: "Our Mission",
              d: "Deliver scalable, high-quality solutions tailored to modern business needs.",
            },
            {
              icon: Eye,
              t: "Our Vision",
              d: "Be the trusted technology partner powering the next generation of digital business.",
            },
            {
              icon: Heart,
              t: "Our Values",
              d: "Innovation, accuracy, and accountability in every project we ship.",
            },
          ].map((b, i) => (
            <Reveal
              key={b.t}
              delay={i * 120}
              className="card-surface transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-xl"
            >
              <div
                className="grid h-12 w-12 place-items-center rounded-xl"
                style={{ background: "var(--gradient-brand)" }}
              >
                <b.icon size={22} className="text-primary-foreground" />
              </div>
              <h3 className="mt-5 text-xl font-semibold">{b.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{b.d}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="container-x grid gap-12 py-20 lg:grid-cols-2">
        <div>
          <h2 className="text-3xl font-bold md:text-4xl">Innovation meets execution.</h2>
          <img
            src={gif}
            alt="Innovation in action"
            className="mt-4 rounded-xl border border-border shadow-lg h-3/6 w-5/6"
          />
        </div>
        <div className="space-y-4 text-muted-foreground">
          <p>
            We combine innovation, accuracy, and technical expertise to help organizations build
            smarter systems, improve efficiency, and accelerate growth.
          </p>
          <p>
            From annotating training datasets for cutting-edge AI models to architecting
            cloud-native software platforms, our team brings depth across the modern technology
            stack — and a commitment to outcomes that move your business forward.
          </p>
          <Link to="/contact" className="btn-primary mt-4">
            Work With Us <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
