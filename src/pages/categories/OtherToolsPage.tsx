import { Link } from "react-router-dom";
import { ChevronRight, Shield, Zap, Globe, Lock, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import ToolCard from "@/components/ToolCard";
import { tools } from "@/lib/toolsData";
import { buildWebPageSchema, buildItemListSchema, buildFAQSchema, buildBreadcrumbSchema } from "@/lib/seoSchemas";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const BASE_URL = "https://www.quicktools.website";
const canonicalUrl = `${BASE_URL}/tools/other`;

const faqs = [
  { question: "Can I generate QR codes for free?", answer: "Yes! The QR Code Generator is completely free with no limits. Create QR codes for URLs, plain text, phone numbers, email addresses, Wi-Fi credentials, and more. Download as high-quality PNG instantly." },
  { question: "Are generated passwords secure?", answer: "Yes. The Password Generator uses cryptographically secure random number generation (crypto.getRandomValues API) built into your browser. Generated passwords are never stored or transmitted anywhere." },
  { question: "Can I download YouTube video thumbnails?", answer: "Yes, the YouTube Thumbnail Downloader lets you paste any YouTube video URL and instantly access thumbnails in multiple resolutions including Default, Medium, High, Standard, and Maximum quality." },
  { question: "How does the URL shortener work?", answer: "The URL Shortener takes your long URL and creates a compact, shareable short link. Short links are permanent and redirect to your original URL when clicked. Perfect for social media, print materials, and QR codes." },
  { question: "Does the stopwatch work offline?", answer: "Yes! Once the QuickTools page loads, the Stopwatch & Timer works completely offline. It uses your browser's high-resolution timing APIs for millisecond precision, with lap timing and countdown features." },
];

const otherCategories = [
  { name: "PDF Tools", path: "/tools/pdf", emoji: "📄", desc: "Merge, split, compress & convert" },
  { name: "Image Tools", path: "/tools/image", emoji: "🖼️", desc: "Compress, resize & remove backgrounds" },
  { name: "Converter Tools", path: "/tools/converter", emoji: "🔄", desc: "Units, colors & data formats" },
  { name: "Text Tools", path: "/tools/text", emoji: "✏️", desc: "Word counter, case converter & more" },
  { name: "Calculators", path: "/tools/calculator", emoji: "🧮", desc: "BMI, EMI, age & tip calculator" },
];

const OtherToolsPage = () => {
  useScrollReveal();
  const categoryTools = tools.filter((t) => t.category === "misc");

  const schemas = [
    buildWebPageSchema({ name: "Free Online Utility Tools – QuickTools", description: "Free utility tools: QR code generator, password generator, URL shortener, YouTube thumbnail downloader, stopwatch, and more.", url: canonicalUrl }),
    buildFAQSchema(faqs),
    buildBreadcrumbSchema([{ name: "Home", url: "/" }, { name: "All Tools", url: "/tools" }, { name: "Other Tools", url: "/tools/other" }]),
    buildItemListSchema(categoryTools.map((t) => ({ name: t.name, url: `${BASE_URL}${t.path}`, description: t.description }))),
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SEOHead
        title="Free Online Utility Tools – QR Code, Password Generator & More | QuickTools"
        description="Free utility tools: QR code generator, password generator, URL shortener, YouTube thumbnail downloader, stopwatch, and more. All browser-based, free."
        canonical={canonicalUrl}
        keywords={["qr code generator free", "password generator online", "url shortener free", "youtube thumbnail downloader", "online stopwatch free", "utility tools online", "random number generator", "free online tools"]}
        schemas={schemas}
      />
      <Navbar />

      <section className="relative overflow-hidden border-b border-border bg-gradient-to-br from-indigo-50 via-background to-background dark:from-indigo-950/20 dark:via-background">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -right-40 -top-40 w-96 h-96 rounded-full bg-indigo-500/10 blur-3xl" />
        </div>
        <div className="relative container mx-auto px-4 py-14 md:py-20">
          <nav className="flex items-center gap-1.5 text-xs text-muted-foreground mb-6" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link to="/tools" className="hover:text-foreground transition-colors">All Tools</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-foreground font-medium">Other Tools</span>
          </nav>
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-100 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-400 text-xs font-semibold mb-4">
              ⚡ Utility Tools
            </div>
            <h1 className="font-display font-bold text-4xl md:text-5xl text-foreground mb-5 leading-tight">
              Free Online Utility Tools
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl leading-relaxed">
              A collection of powerful free utility tools for everyday productivity tasks. Generate professional QR codes for URLs, business cards, Wi-Fi passwords, and more with instant PNG download. Create strong, cryptographically secure passwords with customizable length and character sets. Shorten long URLs into compact, shareable links for social media and print. Download YouTube video thumbnails in HD quality. Generate random numbers for lotteries, games, and simulations. Time events with a precise stopwatch and countdown timer. All tools are completely free, browser-based, and require no sign-up or downloads.
            </p>
            <div className="flex flex-wrap gap-3">
              {[{ icon: Shield, text: "No Sign-Up" }, { icon: Zap, text: "Instant Results" }, { icon: Globe, text: "Browser-Based" }, { icon: Lock, text: "100% Free" }].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-card border border-border text-xs font-medium text-muted-foreground">
                  <Icon className="w-3.5 h-3.5 text-indigo-600" /> {text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <h2 className="font-display font-bold text-2xl text-foreground mb-2">All Utility Tools</h2>
          <p className="text-muted-foreground text-sm mb-8">{categoryTools.length} free utility tools — no sign-up, no downloads required</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 reveal">
            {categoryTools.map((tool, i) => <ToolCard key={tool.id} tool={tool} variant="featured" index={i} />)}
          </div>
        </div>
      </section>

      <section className="py-12" aria-labelledby="faq-heading" itemScope itemType="https://schema.org/FAQPage">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 id="faq-heading" className="font-display font-bold text-2xl text-foreground mb-8">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <details key={i} className="group border border-border rounded-xl overflow-hidden" itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                <summary className="flex items-center justify-between gap-4 px-5 py-4 cursor-pointer hover:bg-muted/50 transition-colors list-none" itemProp="name">
                  <h3 className="font-semibold text-sm text-foreground">{faq.question}</h3>
                  <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0 group-open:rotate-90 transition-transform" />
                </summary>
                <div className="px-5 py-4 border-t border-border" itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                  <p className="text-sm text-muted-foreground leading-relaxed" itemProp="text">{faq.answer}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 border-t border-border bg-muted/20 reveal">
        <div className="container mx-auto px-4">
          <h2 className="font-display font-bold text-xl text-foreground mb-6">Explore Other Tool Categories</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {otherCategories.map((cat) => (
              <Link key={cat.path} to={cat.path} className="flex flex-col items-center gap-2 p-4 rounded-xl bg-card border border-border hover:border-primary/40 hover:bg-primary/5 transition-all text-center group">
                <span className="text-2xl">{cat.emoji}</span>
                <span className="text-xs font-semibold text-foreground group-hover:text-primary transition-colors">{cat.name}</span>
                <span className="text-xs text-muted-foreground">{cat.desc}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 reveal">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display font-bold text-2xl text-foreground mb-3">Explore All 34+ Free Tools</h2>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">Browse the complete collection of free browser-based productivity tools.</p>
          <Link to="/tools" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl gradient-bg text-white font-semibold text-sm hover:opacity-90 transition-opacity">
            Browse All Tools <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default OtherToolsPage;
