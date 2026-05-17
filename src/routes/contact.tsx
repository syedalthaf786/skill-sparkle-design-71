import { createFileRoute } from "@tanstack/react-router";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Let's Build Something Amazing | Svms Technologies" },
      {
        name: "description",
        content: "Have a project idea or business requirement? Reach out to our team today.",
      },
      { property: "og:title", content: "Contact Svms Technologies" },
      { property: "og:description", content: "Let's build something amazing together." },
    ],
  }),
  component: ContactPage,
});

const faqs = [
  {
    q: "Do you support large-scale annotation projects?",
    a: "Yes, we handle scalable AI data projects with quality assurance processes.",
  },
  {
    q: "Do you create custom websites?",
    a: "Yes, we develop fully customized and responsive websites tailored to your brand.",
  },
  {
    q: "What technologies do you use?",
    a: "Modern stacks including React, Python, Flask, AI/ML frameworks, cloud platforms, and databases.",
  },
  {
    q: "Do you provide ongoing support?",
    a: "Yes, we provide maintenance and technical support services after launch.",
  },
];

function ContactPage() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const service = formData.get("service") as string;
    const message = formData.get("message") as string;

    const whatsappMessage = `New Contact Form Submission\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nService: ${service}\nMessage: ${message}`;
    const encodedMessage = encodeURIComponent(whatsappMessage);
    window.open(`https://wa.me/919876543210?text=${encodedMessage}`, "_blank");
    setSent(true);
  };

  return (
    <div>
      <section className="relative overflow-hidden">
        <div className="hero-glow absolute inset-0 -z-10" />
        <div className="container-x py-20 lg:py-24">
          <span className="eyebrow">Contact</span>
          <h1 className="mt-4 max-w-3xl text-4xl font-bold md:text-6xl">
            Let's build something <span className="brand-text">amazing together</span>.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            Have a project idea or business requirement? Reach out to our team today.
          </p>
        </div>
      </section>

      <section className="container-x grid gap-10 pb-24 lg:grid-cols-5">
        <div className="space-y-4 lg:col-span-2">
          {[
            { icon: Mail, t: "Email", d: "info@Svms Technologies.io" },
            { icon: Phone, t: "Phone", d: "+91 98765 43210" },
            { icon: MapPin, t: "Location", d: "Hyderabad, India" },
          ].map((c) => (
            <div key={c.t} className="card-surface flex items-center gap-4">
              <div
                className="grid h-12 w-12 place-items-center rounded-xl"
                style={{ background: "var(--gradient-brand)" }}
              >
                <c.icon size={20} className="text-primary-foreground" />
              </div>
              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">{c.t}</div>
                <div className="font-semibold">{c.d}</div>
              </div>
            </div>
          ))}
        </div>

        <form
          className="rounded-3xl border border-border bg-card p-8 md:p-10 lg:col-span-3"
          onSubmit={handleSubmit}
        >
          {sent ? (
            <div className="grid place-items-center py-16 text-center">
              <div
                className="grid h-14 w-14 place-items-center rounded-full"
                style={{ background: "var(--gradient-brand)" }}
              >
                <Send size={22} className="text-primary-foreground" />
              </div>
              <h3 className="mt-5 text-2xl font-bold">Message sent to WhatsApp</h3>
              <p className="mt-2 text-muted-foreground">We'll get back to you within 24 hours.</p>
            </div>
          ) : (
            <>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Full Name" name="name" placeholder="Jane Doe" />
                <Field label="Email" type="email" name="email" placeholder="you@company.com" />
                <Field label="Phone" name="phone" placeholder="+91 ..." />
                <ServiceSelect />
              </div>
              <div className="mt-4">
                <label className="text-sm font-semibold">Message</label>
                <textarea
                  required
                  name="message"
                  rows={5}
                  placeholder="Tell us about your project..."
                  className="mt-2 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <button type="submit" className="btn-primary mt-6 w-full sm:w-auto">
                Send Message <Send size={16} />
              </button>
            </>
          )}
        </form>
      </section>

      <section className="bg-surface py-20">
        <div className="container-x">
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow">FAQ</span>
            <h2 className="mt-4 text-3xl font-bold md:text-4xl">Frequently Asked Questions</h2>
          </div>
          <div className="mx-auto mt-10 max-w-3xl divide-y divide-border rounded-2xl border border-border bg-card">
            {faqs.map((f) => (
              <details key={f.q} className="group p-6">
                <summary className="flex cursor-pointer list-none items-center justify-between font-semibold">
                  {f.q}
                  <span className="ml-4 grid h-6 w-6 place-items-center rounded-full bg-secondary text-primary transition group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-sm text-muted-foreground">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function ServiceSelect() {
  const services = [
    "AI Data Annotation",
    "Custom Website Development",
    "AI/ML Solutions",
    "Cloud Infrastructure",
    "Mobile App Development",
    "UI/UX Design",
  ];

  return (
    <div>
      <label className="text-sm font-semibold">Service Required</label>
      <select
        required
        name="service"
        className="mt-2 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
      >
        <option value="">Select a service</option>
        {services.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="text-sm font-semibold">{label}</label>
      <input
        required
        type={type}
        name={name}
        placeholder={placeholder}
        className="mt-2 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
      />
    </div>
  );
}
