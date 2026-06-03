import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import CategorySection from "@/components/CategorySection";
import { Link } from "react-router-dom";
import {
  Shield, Zap, Star, Users, Lock, Globe,
  BookOpen, ArrowRight, CheckCircle, Sparkles,
  Clock, Wifi, FileText, Image, Type, Calculator
} from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { cn } from "@/lib/utils";

const features = [
  {
    icon: Lock,
    title: "100% Private",
    description: "All processing happens in your browser. Your files never touch our servers — ever.",
    color: "from-emerald-500 to-teal-500",
    bg: "bg-emerald-50 dark:bg-emerald-950/30",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "No uploads, no downloads, no waiting. Results are instant thanks to local processing.",
    color: "from-amber-500 to-yellow-500",
    bg: "bg-amber-50 dark:bg-amber-950/30",
  },
  {
    icon: Star,
    title: "Always Free",
    description: "No subscriptions, no hidden fees, no limits. All 34+ tools are completely free.",
    color: "from-blue-500 to-cyan-500",
    bg: "bg-blue-50 dark:bg-blue-950/30",
  },
  {
    icon: Users,
    title: "No Sign-Up",
    description: "Start using any tool immediately. No registration, no account, no email needed.",
    color: "from-violet-500 to-purple-500",
    bg: "bg-violet-50 dark:bg-violet-950/30",
  },
  {
    icon: Wifi,
    title: "Works Offline",
    description: "Once loaded, many tools work without internet. Perfect for planes and remote areas.",
    color: "from-indigo-500 to-blue-500",
    bg: "bg-indigo-50 dark:bg-indigo-950/30",
  },
  {
    icon: Globe,
    title: "Works Everywhere",
    description: "Any modern browser, any device, any OS. No installations or plugins required.",
    color: "from-pink-500 to-rose-500",
    bg: "bg-pink-50 dark:bg-pink-950/30",
  },
];

const audiences = [
  {
    icon: Users,
    title: "Students",
    color: "from-blue-500 to-cyan-500",
    uses: [
      "Merge PDF research papers and references",
      "Count words to meet essay requirements precisely",
      "Compress images for presentations",
      "Create QR codes to share study resources",
    ],
  },
  {
    icon: Sparkles,
    title: "Creators & Designers",
    color: "from-violet-500 to-purple-500",
    uses: [
      "Remove backgrounds from product photos",
      "Compress images for web without quality loss",
      "Download YouTube thumbnails for analysis",
      "Generate QR codes for campaigns",
    ],
  },
  {
    icon: Zap,
    title: "Developers",
    color: "from-amber-500 to-orange-500",
    uses: [
      "Encode/decode Base64 for API testing",
      "Convert JSON to CSV for data analysis",
      "Format HTML for code readability",
      "Generate secure passwords for projects",
    ],
  },
];

const blogPosts = [
  {
    title: "PDF Management Best Practices",
    excerpt: "Master the art of PDF document management with professional techniques.",
    path: "/blog/pdf-best-practices",
    category: "PDF Tools",
    readTime: "5 min",
    emoji: "📄",
  },
  {
    title: "Image Optimization Complete Guide",
    excerpt: "Reduce image sizes while maintaining visual quality for web and print.",
    path: "/blog/image-optimization",
    category: "Image Tools",
    readTime: "7 min",
    emoji: "🖼️",
  },
  {
    title: "Content Creation Tools for Creators",
    excerpt: "Discover the best tools for content creation, social media, and design.",
    path: "/blog/content-creation-tools",
    category: "Productivity",
    readTime: "6 min",
    emoji: "✨",
  },
];

const privacyPoints = [
  "Files are processed entirely in your browser using JavaScript",
  "Zero server-side processing — no backend receives your data",
  "Works for sensitive documents: legal, financial, medical",
  "HIPAA & GDPR friendly approach to data handling",
  "No telemetry or tracking of file contents",
  "Files are cleared from memory when you leave the page",
];

const Index = () => {
  useScrollReveal();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <CategorySection />

        {/* ── Why QuickTools ── */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12 reveal">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-4">
                <Shield className="w-3.5 h-3.5" />
                Why Choose Us
              </div>
              <h2 className="font-display font-bold text-section text-foreground mb-3">
                Built for speed, privacy, and trust
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Unlike other online tools, QuickTools processes everything locally in your browser — no servers, no storage, no risks.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
              {features.map((f, i) => {
                const FIcon = f.icon;
                return (
                  <div
                    key={f.title}
                    className={cn(
                      "reveal p-6 rounded-2xl border border-border bg-card shadow-card hover:shadow-card-hover tool-card group"
                    )}
                    style={{ transitionDelay: `${i * 60}ms` }}
                  >
                    <div className={cn(
                      "w-11 h-11 rounded-xl bg-gradient-to-br flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300",
                      f.color
                    )}>
                      <FIcon className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="font-display font-semibold text-base text-foreground mb-2">{f.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{f.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Who Uses QuickTools ── */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12 reveal">
              <h2 className="font-display font-bold text-section text-foreground mb-3">
                Who uses QuickTools?
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                From students to professionals — thousands rely on QuickTools every day for fast, private, browser-based productivity.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {audiences.map((aud, i) => {
                const AIcon = aud.icon;
                return (
                  <div
                    key={aud.title}
                    className="reveal bg-card border border-border rounded-2xl p-6 shadow-card hover:shadow-card-hover tool-card"
                    style={{ transitionDelay: `${i * 80}ms` }}
                  >
                    <div className={cn("inline-flex p-3 rounded-xl bg-gradient-to-br mb-4", aud.color)}>
                      <AIcon className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="font-display font-semibold text-base text-foreground mb-4">{aud.title}</h3>
                    <ul className="space-y-2.5">
                      {aud.uses.map((use) => (
                        <li key={use} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <CheckCircle className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                          {use}
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Privacy Deep Dive ── */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                {/* Left: Visual */}
                <div className="reveal">
                  <div className="relative">
                    <div className="p-8 rounded-3xl bg-gradient-to-br from-primary/8 to-purple-500/8 border border-primary/20">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 rounded-2xl gradient-bg flex items-center justify-center shadow-brand">
                          <Shield className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <p className="font-display font-bold text-foreground">Privacy-First by Design</p>
                          <p className="text-xs text-muted-foreground">Zero server-side processing</p>
                        </div>
                      </div>

                      <div className="space-y-3">
                        {privacyPoints.map((point, i) => (
                          <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-background/70 border border-border/60">
                            <div className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-950/40 flex items-center justify-center shrink-0">
                              <CheckCircle className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                            </div>
                            <p className="text-xs text-muted-foreground">{point}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right: Copy */}
                <div className="reveal">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 text-xs font-semibold mb-5 border border-emerald-200 dark:border-emerald-800">
                    <Lock className="w-3.5 h-3.5" />
                    Privacy First
                  </div>
                  <h2 className="font-display font-bold text-section text-foreground mb-4">
                    Your files never leave your device
                  </h2>
                  <p className="text-muted-foreground mb-5 leading-relaxed">
                    Traditional online tools upload your files to remote servers for processing. This creates serious privacy risks — especially for sensitive documents like contracts, financial records, or medical files.
                  </p>
                  <p className="text-muted-foreground mb-8 leading-relaxed">
                    QuickTools leverages modern browser APIs — WebAssembly, Canvas, File API — to process everything locally. Your data stays on your device, always.
                  </p>
                  <Link
                    to="/tools"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl gradient-bg text-white font-semibold text-sm shadow-brand hover:shadow-brand-lg btn-glow transition-all duration-200"
                  >
                    Try a Tool
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Blog / Resources ── */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-10">
              <div className="reveal">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-3">
                  <BookOpen className="w-3.5 h-3.5" />
                  Learn & Grow
                </div>
                <h2 className="font-display font-bold text-section text-foreground">
                  Guides & Resources
                </h2>
              </div>
              <Link
                to="/blog"
                className="hidden sm:flex items-center gap-1.5 text-sm text-primary font-medium hover:underline reveal"
              >
                View all guides <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {blogPosts.map((post, i) => (
                <Link
                  key={post.path}
                  to={post.path}
                  className="reveal group bg-card border border-border rounded-2xl p-6 hover:border-primary/40 hover:shadow-card-hover tool-card"
                  style={{ transitionDelay: `${i * 80}ms` }}
                >
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-2xl">{post.emoji}</span>
                    <span className="text-xs font-semibold text-primary px-2.5 py-1 rounded-full bg-primary/10">
                      {post.category}
                    </span>
                    <span className="text-xs text-muted-foreground ml-auto flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </span>
                  </div>
                  <h3 className="font-display font-semibold text-base text-foreground group-hover:text-primary transition-colors mb-2">
                    {post.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{post.excerpt}</p>
                  <span className="text-xs font-semibold text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
                    Read guide <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </Link>
              ))}
            </div>

            <div className="text-center mt-8 sm:hidden">
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl gradient-bg text-white font-semibold text-sm shadow-brand"
              >
                View All Guides <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* ── Final CTA Banner ── */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="relative overflow-hidden rounded-3xl gradient-bg p-10 md:p-16 text-center shadow-brand-lg reveal">
              {/* Background decoration */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
                <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full opacity-20"
                  style={{ background: "radial-gradient(circle, rgba(255,255,255,0.5) 0%, transparent 70%)" }} />
                <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full opacity-10"
                  style={{ background: "radial-gradient(circle, rgba(255,255,255,0.5) 0%, transparent 70%)" }} />
                <div className="absolute inset-0 opacity-5"
                  style={{
                    backgroundImage: "radial-gradient(rgba(255,255,255,1) 1px, transparent 1px)",
                    backgroundSize: "24px 24px",
                  }} />
              </div>

              <div className="relative">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 border border-white/20 text-white text-xs font-semibold mb-6">
                  <Sparkles className="w-3.5 h-3.5" />
                  34+ Free Tools. No Sign-Up Required.
                </div>
                <h2 className="font-display font-bold text-3xl md:text-5xl text-white mb-4 tracking-tight">
                  Ready to get started?
                </h2>
                <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
                  Join thousands of users who rely on QuickTools for their daily productivity needs.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link
                    to="/tools"
                    className="flex items-center gap-2 px-8 py-4 rounded-2xl bg-white text-primary font-bold text-sm shadow-xl hover:shadow-2xl transition-all hover:scale-[1.02]"
                  >
                    <Zap className="w-4 h-4" fill="currentColor" />
                    Explore All Tools
                  </Link>
                  <Link
                    to="/about"
                    className="flex items-center gap-2 px-8 py-4 rounded-2xl border border-white/30 text-white font-semibold text-sm hover:bg-white/10 transition-all"
                  >
                    Learn More
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
