import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Briefcase } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/careers")({
  head: () => ({
    meta: [
      { title: "Careers — Join NovaStack" },
      { name: "description", content: "Join a team that ships meaningful technology. Open roles in engineering, data, and design." },
      { property: "og:title", content: "Careers at NovaStack" },
      { property: "og:description", content: "Build the future of data & digital services with us." },
    ],
  }),
  component: CareersPage,
});

const roles = [
  { t: "Senior Full-Stack Engineer", loc: "Hyderabad / Remote", type: "Full-time" },
  { t: "Data Annotation Specialist", loc: "Hyderabad", type: "Full-time" },
  { t: "Machine Learning Engineer", loc: "Remote", type: "Full-time" },
  { t: "Product Designer", loc: "Hyderabad / Remote", type: "Full-time" },
  { t: "DevOps Engineer", loc: "Remote", type: "Contract" },
];

function CareersPage() {
  return (
    <div>
      <section className="relative overflow-hidden">
        <div className="hero-glow absolute inset-0 -z-10" />
        <div className="container-x py-20 lg:py-28">
          <span className="eyebrow">Careers</span>
          <h1 className="mt-4 max-w-3xl text-4xl font-bold md:text-6xl">
            Build the <span className="brand-text">future of work</span> with us.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            We're a small, senior team shipping serious technology — data pipelines, AI products, and enterprise software. Come help us build it.
          </p>
        </div>
      </section>

      <section className="container-x pb-24">
        <div className="rounded-3xl border border-border bg-card">
          {roles.map((r, i) => (
            <Reveal
              key={r.t}
              delay={i * 80}
              className={`flex flex-wrap items-center justify-between gap-4 p-6 transition-colors duration-300 hover:bg-surface md:p-8 ${i !== 0 ? "border-t border-border" : ""}`}
            >
              <div className="flex items-center gap-4">
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-secondary transition-transform duration-300 hover:scale-110">
                  <Briefcase size={20} className="text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{r.t}</h3>
                  <p className="text-sm text-muted-foreground">{r.loc} · {r.type}</p>
                </div>
              </div>
              <Link to="/contact" className="btn-outline">Apply <ArrowRight size={14} /></Link>
            </Reveal>
          ))}
        </div>

        <div className="mt-10 rounded-3xl border border-border p-10 text-center" style={{ background: "var(--gradient-brand)" }}>
          <h2 className="text-2xl font-bold text-primary-foreground md:text-3xl">Don't see your role?</h2>
          <p className="mx-auto mt-3 max-w-xl text-primary-foreground/80">We're always meeting great people. Tell us what you do best.</p>
          <Link to="/contact" className="mt-6 inline-flex items-center gap-2 rounded-full bg-background px-6 py-3 text-sm font-semibold text-foreground">
            Get in touch <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
