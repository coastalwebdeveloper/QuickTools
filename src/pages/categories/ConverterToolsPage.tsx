import { Link } from "react-router-dom";
import { ChevronRight, Shield, Zap, Globe, Lock, CheckCircle, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import ToolCard from "@/components/ToolCard";
import { tools } from "@/lib/toolsData";
import { buildWebPageSchema, buildItemListSchema, buildFAQSchema, buildBreadcrumbSchema } from "@/lib/seoSchemas";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const BASE_URL = "https://www.quicktools.website";

const faqs = [
  { question: "What can I convert with these tools?", answer: "QuickTools converter tools support unit conversion (length, weight, temperature, volume, speed, and more), color format conversion (HEX, RGB, HSL, CMYK), JSON to CSV data conversion, and Base64 encoding/decoding." },
  { question: "How accurate are the unit conversions?", answer: "All unit conversions use precise, internationally standardized conversion factors. Results are accurate to multiple decimal places and match the outputs of professional scientific calculators." },
  { question: "What is Base64 encoding?", answer: "Base64 is a binary-to-text encoding scheme that represents binary data in ASCII string format. It's commonly used for encoding data in URLs, embedding images in HTML/CSS, and data transmission over text protocols." },
  { question: "Can I convert JSON to Excel?", answer: "Yes! The JSON to CSV tool converts JSON data to CSV format, which can be directly opened in Microsoft Excel, Google Sheets, or any spreadsheet application." },
  { question: "Do conversion tools work offline?", answer: "Yes. Once the page loads, all converter tools work completely offline. All processing happens in your browser using JavaScript calculations, no internet connection required." },
];

const otherCategories = [
  { name: "PDF Tools", path: "/tools/pdf", emoji: "📄", desc: "Merge, split, compress & convert" },
  { name: "Image Tools", path: "/tools/image", emoji: "🖼️", desc: "Compress, resize & remove backgrounds" },
  { name: "Text Tools", path: "/tools/text", emoji: "✏️", desc: "Word counter, case converter & more" },
  { name: "Calculators", path: "/tools/calculator", emoji: "🧮", desc: "BMI, EMI, age & tip calculator" },
  { name: "Other Tools", path: "/tools/other", emoji: "⚡", desc: "QR codes, passwords & utilities" },
];

const ConverterToolsPage = () => {
  useScrollReveal();
  const categoryTools = tools.filter((t) => t.category === "converter");
  const canonicalUrl = `${BASE_URL}/tools/converter`;

  const schemas = [
    buildWebPageSchema({ name: "Free Online Converter Tools – QuickTools", description: "Free online converters: unit converter, color converter, JSON to CSV, Base64 encoder. Browser-based, instant results.", url: canonicalUrl }),
    buildFAQSchema(faqs),
    buildBreadcrumbSchema([{ name: "Home", url: "/" }, { name: "All Tools", url: "/tools" }, { name: "Converter Tools", url: "/tools/converter" }]),
    buildItemListSchema(categoryTools.map((t) => ({ name: t.name, url: `${BASE_URL}${t.path}`, description: t.description }))),
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SEOHead
        title="Free Online Converter Tools – Units, Colors & Data Converter | QuickTools"
        description="Free online converters: unit converter, color converter (HEX/RGB/HSL), JSON to CSV, Base64 encoder/decoder. Instant results, no sign-up needed."
        canonical={canonicalUrl}
        keywords={["unit converter online", "color converter free", "hex to rgb converter", "json to csv online", "base64 encoder free", "measurement converter", "online converter tools", "data format converter"]}
        schemas={schemas}
      />
      <Navbar />

      <section className="relative overflow-hidden border-b border-border bg-gradient-to-br from-blue-50 via-background to-background dark:from-blue-950/20 dark:via-background">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -right-40 -top-40 w-96 h-96 rounded-full bg-blue-500/10 blur-3xl" />
        </div>
        <div className="relative container mx-auto px-4 py-14 md:py-20">
          <nav className="flex items-center gap-1.5 text-xs text-muted-foreground mb-6" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link to="/tools" className="hover:text-foreground transition-colors">All Tools</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-foreground font-medium">Converter Tools</span>
          </nav>
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100 dark:bg-blue-950/50 text-blue-700 dark:text-blue-400 text-xs font-semibold mb-4">
              🔄 Converter Tools
            </div>
            <h1 className="font-display font-bold text-4xl md:text-5xl text-foreground mb-5 leading-tight">
              Free Online Converter Tools
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl leading-relaxed">
              Instant, accurate conversion tools that work entirely in your browser. Convert between metric and imperial units for length, weight, temperature, volume, speed, and more. Transform color codes between HEX, RGB, HSL, and CMYK formats for design and development work. Convert JSON data to CSV format for spreadsheet analysis. Encode and decode text to/from Base64 format for developers. All converters deliver instant results with professional accuracy — no sign-up, no uploads, completely free and private.
            </p>
            <div className="flex flex-wrap gap-3">
              {[{ icon: Shield, text: "No Uploads" }, { icon: Zap, text: "Instant Results" }, { icon: Globe, text: "Browser-Based" }, { icon: Lock, text: "Works Offline" }].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-card border border-border text-xs font-medium text-muted-foreground">
                  <Icon className="w-3.5 h-3.5 text-blue-600" /> {text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <h2 className="font-display font-bold text-2xl text-foreground mb-2">All Converter Tools</h2>
          <p className="text-muted-foreground text-sm mb-8">{categoryTools.length} free converter tools — no sign-up, instant results</p>
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

export default ConverterToolsPage;
