import { useEffect, useState } from "react";
import { MessageCircle, X } from "lucide-react";

export function CustomerSupportBot() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => setOpen(false), 8_000);
    return () => clearTimeout(t);
  }, [open]);

  return (
    <>
      <button
        className="support-bot-toggle support-bot-right"
        onClick={() => setOpen(!open)}
        aria-label="Customer Support"
      >
        <span className="dot" aria-hidden="true" />
        <span>24/7 Support</span>
        <MessageCircle size={16} />
      </button>
      {open && (
        <div
          role="dialog"
          aria-label="Customer Support Chat"
          className="support-chat-panel"
        >
          <div className="flex items-center justify-between rounded-t-2xl px-5 py-4"
            style={{ background: "var(--gradient-brand)" }}>
            <div>
              <h3 className="text-sm font-semibold text-primary-foreground">
                24/7 Customer Support
              </h3>
              <p className="text-xs text-primary-foreground/80 mt-0.5">
                We typically reply within minutes
              </p>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close support chat"
              className="rounded-full p-1.5 text-primary-foreground/80 transition hover:bg-white/20 hover:text-primary-foreground"
            >
              <X size={16} />
            </button>
          </div>
          <div className="p-5 text-sm text-muted-foreground">
            <p className="mb-3">
              Hi there 👋 How can we help you today?
            </p>
            <a
              href="mailto:svmstechnologies@gmail.com"
              className="btn-primary inline-flex w-full justify-center text-xs"
            >
              Start a Conversation
            </a>
            <p className="mt-4 text-xs text-muted-foreground">
              Or call us at&nbsp;
              <a href="tel:+918328210998" className="text-primary font-medium hover:underline">
                +91 8328210998
              </a>
            </p>
          </div>
        </div>
      )}
    </>
  );
}
