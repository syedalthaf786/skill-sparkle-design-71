import { Link } from "react-router-dom";
import { ArrowRight, Briefcase, X, Send } from "lucide-react";

import { Reveal } from "@/components/site/Reveal";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

interface CareerOpening {
  id: string;
  title: string;
  location: string;
  type: string;
}

const defaultRoles: CareerOpening[] = [
  { id: "1", title: "Frontend Developer", location: "Remote", type: "Full Time" },
  { id: "2", title: "Backend Engineer", location: "Hyderabad", type: "Full Time" },
  { id: "3", title: "UI/UX Designer", location: "Bangalore", type: "Internship" },
  { id: "4", title: "AI Engineer", location: "Remote", type: "Contract" },
];

export default function CareersPage() {
  const [open, setOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [step, setStep] = useState(1);
  const [roles, setRoles] = useState<CareerOpening[]>(defaultRoles);

  useEffect(() => {
    const loadRoles = async () => {
      try {
        const { error: checkError } = await supabase.from("career_openings").select("id").limit(1);
        if (checkError && !checkError.message.includes("could not find the table")) {
          throw checkError;
        }
        if (!checkError) {
          const { data } = await supabase
            .from("career_openings")
            .select("*")
            .order("id", { ascending: true });
          if (data && data.length > 0) {
            setRoles(data);
            localStorage.setItem("careerOpenings", JSON.stringify(data));
          }
        }
      } catch (err) {
        const saved = localStorage.getItem("careerOpenings");
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setRoles(parsed);
          }
        }
      }
    };
    loadRoles();
  }, []);

  // =========================
  // SUBMIT FORM
  // =========================

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);

    const form = e.currentTarget;

    const formData = new FormData(form);

    // WEB3FORMS KEY
    formData.append("access_key", "e4d6cdd5-7ee4-41ae-8c25-679fbcb4e3c8");

    // SAVE TO LOCAL STORAGE FOR ADMIN (always save as backup)
    const submission = {
      id: Date.now().toString(),
      role: selectedRole,
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      resume: formData.get("resume"),
      message: formData.get("message"),
      date: new Date().toISOString(),
    };

    const existing = JSON.parse(localStorage.getItem("careersSubmissions") || "[]");
    localStorage.setItem("careersSubmissions", JSON.stringify([submission, ...existing]));

    // SAVE TO SUPABASE (may fail if table doesn't exist)
    try {
      await supabase.from("careers_submissions").insert({
        role: selectedRole,
        name: formData.get("name"),
        email: formData.get("email"),
        phone: formData.get("phone"),
        resume: formData.get("resume"),
        message: formData.get("message"),
      });
    } catch (err) {
      console.warn("Supabase save failed, data saved to localStorage only:", err);
    }

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setSent(true);

        form.reset();

        setTimeout(() => {
          setOpen(false);
          setSent(false);
          setStep(1);
        }, 2500);
      } else {
        alert("Something went wrong!");
      }
    } catch (error) {
      console.log(error);

      alert("Failed to send application");
    }

    setLoading(false);
  };

  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="hero-glow absolute inset-0 -z-10" />

        <div className="container-x py-20 lg:py-28">
          <span className="eyebrow">Careers</span>

          <h1 className="mt-4 max-w-3xl text-4xl font-bold md:text-6xl">
            Build the <span className="brand-text">future of work</span> with us.
          </h1>

          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            Join our growing team and build modern AI & software products.
          </p>
        </div>
      </section>

      {/* ROLES */}
      <section className="container-x pb-24">
        <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl">
          {roles.map((r, i) => (
            <Reveal
              key={r.id}
              delay={i * 80}
              className={`flex flex-wrap items-center justify-between gap-4 p-6 transition-all duration-300 hover:bg-white/5 md:p-8 ${
                i !== 0 ? "border-t border-white/10" : ""
              }`}
            >
              <div className="flex items-center gap-4">
                <div className="grid h-14 w-14 place-items-center rounded-2xl bg-emerald-300 shadow-xl shadow-emerald-400/20 transition-all duration-300 hover:scale-110">
                  <Briefcase size={22} className="text-emerald-950" />
                </div>

                <div>
                  <h3 className="text-lg font-semibold">{r.title}</h3>

                  <p className="text-sm text-muted-foreground">
                    {r.location} · {r.type}
                  </p>
                </div>
              </div>

              {/* APPLY BUTTON */}
              <button
                onClick={() => {
                  setOpen(true);
                  setSelectedRole(r.title);
                }}
                className="inline-flex items-center gap-2 rounded-full bg-emerald-300 px-5 py-3 text-sm font-semibold text-emerald-950 transition-all duration-300 hover:-translate-y-1 hover:scale-105"
              >
                Apply
                <ArrowRight size={14} />
              </button>
            </Reveal>
          ))}
        </div>
      </section>

      {/* POPUP FORM */}
      {open && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-lg rounded-3xl border border-white/10 bg-background p-6 shadow-2xl md:p-8">
            {/* CLOSE */}
            <button
              onClick={() => {
                setOpen(false);
                setStep(1);
              }}
              className="absolute right-4 top-4 rounded-full bg-white/5 p-2 transition hover:bg-white/10"
            >
              <X size={18} />
            </button>

            {/* STEP INDICATOR */}
            <div className="mb-8 flex items-center justify-center gap-3">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-xl text-sm font-bold transition-all duration-300 ${
                  step >= 1 ? "bg-emerald-300 text-emerald-950" : "bg-white/5 text-muted-foreground"
                }`}
              >
                1
              </div>

              <div className="h-1 w-10 rounded bg-white/10" />

              <div
                className={`flex h-10 w-10 items-center justify-center rounded-xl text-sm font-bold transition-all duration-300 ${
                  step >= 2 ? "bg-emerald-300 text-emerald-950" : "bg-white/5 text-muted-foreground"
                }`}
              >
                2
              </div>

              <div className="h-1 w-10 rounded bg-white/10" />

              <div
                className={`flex h-10 w-10 items-center justify-center rounded-xl text-sm font-bold transition-all duration-300 ${
                  step >= 3 ? "bg-emerald-300 text-emerald-950" : "bg-white/5 text-muted-foreground"
                }`}
              >
                3
              </div>
            </div>

            {/* SUCCESS */}
            {sent ? (
              <div className="grid place-items-center py-10 text-center">
                <div className="grid h-16 w-16 place-items-center rounded-full bg-emerald-300 shadow-2xl shadow-emerald-300/40 animate-bounce">
                  <Send size={24} className="text-emerald-950" />
                </div>

                <h3 className="mt-5 text-2xl font-bold">Application Sent</h3>

                <p className="mt-2 text-sm text-muted-foreground">
                  Our HR team will contact you soon.
                </p>
              </div>
            ) : (
              <>
                <h2 className="text-center text-2xl font-bold md:text-3xl">
                  Apply for <span className="brand-text">{selectedRole}</span>
                </h2>

                <form onSubmit={handleSubmit} className="mt-8">
                  <input type="hidden" name="role" value={selectedRole} />

                  {/* STEP 1 */}
                  {step === 1 && (
                    <div className="space-y-5">
                      <Field label="Full Name" name="name" placeholder="John Doe" />

                      <Field
                        label="Email Address"
                        type="email"
                        name="email"
                        placeholder="you@example.com"
                      />

                      <button
                        type="button"
                        onClick={() => setStep(2)}
                        className="w-full rounded-2xl bg-emerald-300 px-6 py-3 font-semibold text-emerald-950 transition hover:scale-[1.02]"
                      >
                        Continue
                      </button>
                    </div>
                  )}

                  {/* STEP 2 */}
                  {step === 2 && (
                    <div className="space-y-5">
                      <Field label="Phone Number" name="phone" placeholder="+91 9876543210" />

                      <Field label="Resume Link" name="resume" placeholder="https://" />

                      <div className="flex gap-3">
                        <button
                          type="button"
                          onClick={() => setStep(1)}
                          className="w-full rounded-2xl border border-white/10 bg-white/5 px-6 py-3 font-semibold"
                        >
                          Back
                        </button>

                        <button
                          type="button"
                          onClick={() => setStep(3)}
                          className="w-full rounded-2xl bg-emerald-300 px-6 py-3 font-semibold text-emerald-950 transition hover:scale-[1.02]"
                        >
                          Continue
                        </button>
                      </div>
                    </div>
                  )}

                  {/* STEP 3 */}
                  {step === 3 && (
                    <div className="space-y-5">
                      <div>
                        <label className="text-sm font-semibold">Cover Letter</label>

                        <textarea
                          required
                          name="message"
                          rows={5}
                          placeholder="Tell us about yourself..."
                          className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none transition focus:border-emerald-300 focus:ring-2 focus:ring-emerald-300/20"
                        />
                      </div>

                      <div className="flex gap-3">
                        <button
                          type="button"
                          onClick={() => setStep(2)}
                          className="w-full rounded-2xl border border-white/10 bg-white/5 px-6 py-3 font-semibold"
                        >
                          Back
                        </button>

                        <button
                          type="submit"
                          disabled={loading}
                          className="w-full rounded-2xl bg-emerald-300 px-6 py-3 font-semibold text-emerald-950 shadow-xl shadow-emerald-300/30 transition hover:scale-[1.02] disabled:opacity-50"
                        >
                          {loading ? "Sending..." : "Submit"}
                        </button>
                      </div>
                    </div>
                  )}
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// =========================
// FIELD COMPONENT
// =========================

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
        className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none transition focus:border-emerald-300 focus:ring-2 focus:ring-emerald-300/20"
      />
    </div>
  );
}
