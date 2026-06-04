import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Mail, Send, CheckCircle, AlertCircle, Loader2, MessageSquare } from "lucide-react";
import Navbar from "@/components/Navbar";
import { submitContactMessage } from "@/lib/mongodb-client";

type FormState = "idle" | "loading" | "success" | "error";

const Contact = () => {
  const [formState, setFormState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("loading");
    setErrorMsg("");

    const result = await submitContactMessage({
      name: form.name,
      email: form.email,
      subject: form.subject || undefined,
      message: form.message,
    });

    if (result.success) {
      setFormState("success");
      setForm({ name: "", email: "", subject: "", message: "" });
    } else {
      setFormState("error");
      setErrorMsg(result.error || "Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <h1 className="text-4xl font-bold mb-3">Contact Us</h1>
        <p className="text-lg text-muted-foreground mb-10">
          Have questions, suggestions, or feedback? We'd love to hear from you.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* ── Left: Quick info ── */}
          <div className="md:col-span-2 flex flex-col gap-6">
            <div className="bg-card border border-border rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <h2 className="font-semibold">Email</h2>
              </div>
              <p className="text-sm text-muted-foreground mb-2">
                Prefer email? Reach us directly.
              </p>
              <a
                href="mailto:nammadesigns01@gmail.com"
                className="text-sm font-medium text-primary hover:underline break-all"
              >
                nammadesigns01@gmail.com
              </a>
            </div>

            <div className="bg-card border border-border rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <MessageSquare className="w-5 h-5 text-primary" />
                </div>
                <h2 className="font-semibold">Response Time</h2>
              </div>
              <p className="text-sm text-muted-foreground">
                We typically respond within <span className="font-medium text-foreground">24–48 hours</span>.
              </p>
            </div>
          </div>

          {/* ── Right: Contact form ── */}
          <div className="md:col-span-3">
            {formState === "success" ? (
              <div className="bg-card border border-border rounded-2xl p-8 flex flex-col items-center text-center gap-4">
                <div className="p-3 bg-green-500/10 rounded-full">
                  <CheckCircle className="w-10 h-10 text-green-500" />
                </div>
                <h2 className="text-2xl font-bold">Message Sent!</h2>
                <p className="text-muted-foreground max-w-xs">
                  Thanks for reaching out. We'll get back to you within 24–48 hours.
                </p>
                <button
                  onClick={() => setFormState("idle")}
                  className="mt-2 px-5 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-card border border-border rounded-2xl p-6 md:p-8 flex flex-col gap-5"
              >
                {/* Error banner */}
                {formState === "error" && (
                  <div className="flex items-start gap-3 p-4 rounded-lg bg-destructive/10 border border-destructive/20 text-sm text-destructive">
                    <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                {/* Name */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="contact-name" className="text-sm font-medium">
                    Name <span className="text-destructive">*</span>
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    required
                    minLength={2}
                    placeholder="Your name"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow"
                  />
                </div>

                {/* Email */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="contact-email" className="text-sm font-medium">
                    Email <span className="text-destructive">*</span>
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow"
                  />
                </div>

                {/* Subject */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="contact-subject" className="text-sm font-medium">
                    Subject <span className="text-muted-foreground text-xs font-normal">(optional)</span>
                  </label>
                  <select
                    id="contact-subject"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow"
                  >
                    <option value="">Select a subject...</option>
                    <option value="Bug Report">Bug Report</option>
                    <option value="Feature Request">Feature Request</option>
                    <option value="General Question">General Question</option>
                    <option value="Business Inquiry">Business Inquiry</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {/* Message */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="contact-message" className="text-sm font-medium">
                    Message <span className="text-destructive">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    minLength={10}
                    rows={5}
                    placeholder="Tell us what's on your mind..."
                    value={form.message}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow resize-none"
                  />
                  <span className="text-xs text-muted-foreground text-right">
                    {form.message.length} / 2000
                  </span>
                </div>

                {/* Submit */}
                <button
                  id="contact-submit-btn"
                  type="submit"
                  disabled={formState === "loading"}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 disabled:opacity-60 disabled:cursor-not-allowed transition-all"
                >
                  {formState === "loading" ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
