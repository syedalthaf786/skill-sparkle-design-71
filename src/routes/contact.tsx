import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

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

  // =========================
  // FORM SUBMIT
  // =========================

  // =========================
  // FORM SUBMIT
  // =========================

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);

    const form = e.currentTarget;

    const formData = new FormData(form);

    // GET VALUES
    const name = formData.get("name");
    const email = formData.get("email");
    const phone = formData.get("phone");
    const service = formData.get("service");
    const message = formData.get("message");

    // SAVE TO LOCAL STORAGE FOR ADMIN (always save as backup)
    const submission = {
      id: Date.now().toString(),
      name,
      email,
      phone,
      service,
      message,
      date: new Date().toISOString(),
    };

    const existing = JSON.parse(localStorage.getItem("contactSubmissions") || "[]");
    localStorage.setItem("contactSubmissions", JSON.stringify([submission, ...existing]));

    // SAVE TO SUPABASE (may fail if table doesn't exist)
    try {
      await supabase.from("contact_submissions").insert({
        name,
        email,
        phone,
        service,
        message,
      });
    } catch (err) {
      console.warn("Supabase save failed, data saved to localStorage only:", err);
    }

    // =========================
    // WEB3FORMS ACCESS KEY
    // =========================

    formData.append("access_key", "f2d5e054-38ee-42d9-babd-768e64728afc");

    try {
      // EMAIL SEND
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        // =========================
        // WHATSAPP SEND
        // =========================

        const whatsappMessage = `Hello SVMS Technologies 👋

We are interested in your services and would like to discuss a project requirement. Please get back to us with more details.

Thank you.

New Contact Form Submission

Name: ${name}
Email: ${email}
Phone: ${phone}
Service: ${service}

Message:
${message}`;

        // YOUR WHATSAPP NUMBER
        const whatsappNumber = "918328210998";

        window.open(
          `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`,
          "_blank",
        );

        // SUCCESS MESSAGE
        setSent(true);

        // RESET FORM
        form.reset();
      } else {
        alert("Something went wrong!");
      }
    } catch (error) {
      console.log(error);

      alert("Failed to send message");
    }

    setLoading(false);
  };
  return (
    <div>
      {/* HERO */}
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

      {/* CONTACT SECTION */}
      <section className="container-x grid gap-10 pb-24 lg:grid-cols-5">
        {/* LEFT SIDE */}
        <div className="space-y-4 lg:col-span-2">
          {[
            {
              icon: Mail,
              t: "Email",
              d: "info@svmstechnologies.com",
            },
            {
              icon: Phone,
              t: "Phone",
              d: "+91 83282 10998",
            },
            {
              icon: MapPin,
              t: "Location",
              d: "Hyderabad, India",
            },
          ].map((c) => (
            <div key={c.t} className="card-surface flex items-center gap-4">
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-emerald-300 shadow-lg shadow-emerald-200/50">
                <c.icon size={20} className="text-emerald-950" />
              </div>

              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">{c.t}</div>

                <div className="font-semibold">{c.d}</div>
              </div>
            </div>
          ))}
        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="rounded-3xl border border-border bg-card p-8 md:p-10 lg:col-span-3"
        >
          {sent ? (
            <div className="grid place-items-center py-16 text-center">
              <div className="grid h-14 w-14 place-items-center rounded-full bg-emerald-300 shadow-2xl shadow-emerald-200/50 animate-bounce">
                <Send size={22} className="text-emerald-950" />
              </div>

              <h3 className="mt-5 text-2xl font-bold">Message Sent Successfully</h3>

              <p className="mt-2 text-muted-foreground">We'll get back to you within 24 hours.</p>
            </div>
          ) : (
            <>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Full Name" name="name" placeholder="Jane Doe" />

                <Field label="Email" type="email" name="email" placeholder="you@company.com" />

                <Field label="Phone" name="phone" placeholder="+91 ..." />

                {/* SERVICE DROPDOWN */}
                <div>
                  <label className="text-sm font-semibold">Service Required</label>

                  <select
                    required
                    name="service"
                    className="mt-2 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-200"
                  >
                    <option value="">Select Service</option>

                    <option value="AI Data Annotation">AI Data Annotation</option>

                    <option value="AI Model Training">AI Model Training</option>

                    <option value="Web Development">Web Development</option>

                    <option value="Mobile App Development">Mobile App Development</option>

                    <option value="Digital Marketing">Digital Marketing</option>
                  </select>
                </div>
              </div>

              {/* MESSAGE */}
              <div className="mt-4">
                <label className="text-sm font-semibold">Message</label>

                <textarea
                  required
                  name="message"
                  rows={5}
                  placeholder="Tell us about your project..."
                  className="mt-2 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-200"
                />
              </div>

              {/* BUTTON */}
              <button
                type="submit"
                disabled={loading}
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-emerald-300 px-6 py-3 font-semibold text-emerald-950 shadow-2xl shadow-emerald-200/50 transition duration-300 hover:-translate-y-1 active:scale-95 disabled:opacity-50"
              >
                {loading ? "Sending..." : "Send Message"}

                <Send size={16} />
              </button>
            </>
          )}
        </form>
      </section>

      {/* FAQ */}
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
        className="mt-2 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-200"
      />
    </div>
  );
}
