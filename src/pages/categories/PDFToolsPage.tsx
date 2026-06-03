import { Link } from "react-router-dom";
import { ChevronRight, Shield, Zap, Globe, Lock, CheckCircle, ArrowRight, FileText } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import ToolCard from "@/components/ToolCard";
import { tools } from "@/lib/toolsData";
import { buildWebPageSchema, buildItemListSchema, buildFAQSchema, buildBreadcrumbSchema } from "@/lib/seoSchemas";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const BASE_URL = "https://www.quicktools.website";

const faqs = [
  { question: "Are these PDF tools really free?", answer: "Yes, all QuickTools PDF tools are completely free with no usage limits, no sign-up required, and no hidden fees. You can use them as many times as you need." },
  { question: "Do my PDF files get uploaded to a server?", answer: "No. All PDF processing happens entirely within your browser using client-side JavaScript. Your files never leave your device, ensuring 100% privacy and security." },
  { question: "What PDF operations can I perform?", answer: "You can merge multiple PDFs into one, split PDFs into separate pages, compress PDFs to reduce file size, convert PDFs to Word/Excel/PowerPoint/images, extract text via OCR, and remove PDF passwords." },
  { question: "Is there a file size limit for PDF tools?", answer: "The only limit is your browser's available memory. Most modern browsers can handle PDFs up to 100MB or larger without any issues." },
  { question: "Can I use PDF tools on my smartphone?", answer: "Yes! All QuickTools PDF tools are fully mobile-optimized and work seamlessly on iPhone, Android, and tablet browsers without any app download." },
];

const otherCategories = [
  { name: "Image Tools", path: "/tools/image", emoji: "🖼️", desc: "Compress, resize, crop & convert" },
  { name: "Converter Tools", path: "/tools/converter", emoji: "🔄", desc: "Units, colors & data formats" },
  { name: "Text Tools", path: "/tools/text", emoji: "✏️", desc: "Word counter, case converter & more" },
  { name: "Calculators", path: "/tools/calculator", emoji: "🧮", desc: "BMI, EMI, age & tip calculator" },
  { name: "Other Tools", path: "/tools/other", emoji: "⚡", desc: "QR codes, passwords & utilities" },
];

const PDFToolsPage = () => {
  useScrollReveal();
  const categoryTools = tools.filter((t) => t.category === "pdf");
  const canonicalUrl = `${BASE_URL}/tools/pdf`;

  const schemas = [
    buildWebPageSchema({ name: "Free Online PDF Tools – QuickTools", description: "Free online PDF tools including merge, split, compress, and convert. Browser-based, no uploads.", url: canonicalUrl }),
    buildFAQSchema(faqs),
    buildBreadcrumbSchema([{ name: "Home", url: "/" }, { name: "All Tools", url: "/tools" }, { name: "PDF Tools", url: "/tools/pdf" }]),
    buildItemListSchema(categoryTools.map((t) => ({ name: t.name, url: `${BASE_URL}${t.path}`, description: t.description }))),
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SEOHead
        title="Free Online PDF Tools – Merge, Split & Compress PDFs | QuickTools"
        description="Free PDF tools online: merge PDFs, split PDF, compress PDF, convert PDF to Word/Excel. 100% browser-based – no uploads, no sign-up, instant results."
        canonical={canonicalUrl}
        keywords={["pdf tools online", "free pdf tools", "merge pdf free", "compress pdf online", "pdf converter", "pdf to word online", "split pdf free", "pdf editor online"]}
        schemas={schemas}
      />
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border bg-gradient-to-br from-red-50 via-background to-background dark:from-red-950/20 dark:via-background">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -right-40 -top-40 w-96 h-96 rounded-full bg-red-500/10 blur-3xl" />
        </div>
        <div className="relative container mx-auto px-4 py-14 md:py-20">
          <nav className="flex items-center gap-1.5 text-xs text-muted-foreground mb-6" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link to="/tools" className="hover:text-foreground transition-colors">All Tools</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-foreground font-medium">PDF Tools</span>
          </nav>
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-100 dark:bg-red-950/50 text-red-700 dark:text-red-400 text-xs font-semibold mb-4">
              📄 PDF Tools
            </div>
            <h1 className="font-display font-bold text-4xl md:text-5xl text-foreground mb-5 leading-tight">
              Free Online PDF Tools
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl leading-relaxed">
              Powerful, free PDF tools that work entirely in your browser. Merge multiple PDFs into one seamless document, split large PDFs into individual pages, compress PDFs to reduce file size without quality loss, convert PDFs to editable Word documents, extract data to Excel, convert to PowerPoint slides, turn pages into images, and extract text from scanned PDFs using OCR. All tools are completely free, require no account sign-up, and process your files locally — your documents never leave your device.
            </p>
            <div className="flex flex-wrap gap-3">
              {[{ icon: Shield, text: "No Uploads" }, { icon: Zap, text: "Instant Results" }, { icon: Globe, text: "Browser-Based" }, { icon: Lock, text: "100% Private" }].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-card border border-border text-xs font-medium text-muted-foreground">
                  <Icon className="w-3.5 h-3.5 text-red-600" /> {text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tool Grid */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <h2 className="font-display font-bold text-2xl text-foreground mb-2">All PDF Tools</h2>
          <p className="text-muted-foreground text-sm mb-8">{categoryTools.length} free PDF tools — no sign-up, no uploads required</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 reveal">
            {categoryTools.map((tool, i) => <ToolCard key={tool.id} tool={tool} variant="featured" index={i} />)}
          </div>
        </div>
      </section>

      {/* Why Use Section */}
      <section className="py-12 bg-muted/30 border-y border-border reveal">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="font-display font-bold text-2xl text-foreground mb-6 text-center">Why Choose QuickTools for PDF?</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { title: "Zero File Uploads", desc: "Files are processed in your browser. Your PDFs never touch our servers." },
              { title: "Completely Free", desc: "All PDF tools are free forever with no usage limits or premium tiers." },
              { title: "Works on Any Device", desc: "Desktop, tablet, or mobile — our tools work everywhere, no app needed." },
              { title: "Instant Processing", desc: "No queues, no waiting. Results are ready in seconds." },
              { title: "No Registration", desc: "No account, no email, no sign-up. Just open the tool and go." },
              { title: "High Quality Output", desc: "Professional-grade PDF processing that preserves formatting and quality." },
            ].map(({ title, desc }) => (
              <div key={title} className="p-4 rounded-xl bg-card border border-border">
                <CheckCircle className="w-4 h-4 text-emerald-500 mb-2" />
                <h3 className="font-semibold text-sm text-foreground mb-1">{title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 md:py-16" aria-labelledby="faq-heading" itemScope itemType="https://schema.org/FAQPage">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 id="faq-heading" className="font-display font-bold text-2xl text-foreground mb-8">Frequently Asked Questions About PDF Tools</h2>
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

      {/* Other Categories */}
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

      {/* CTA */}
      <section className="py-12 reveal">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display font-bold text-2xl text-foreground mb-3">Ready to Explore All 34+ Free Tools?</h2>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">Browse the full collection of free browser-based tools — PDF, image, text, calculator, and more.</p>
          <Link to="/tools" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl gradient-bg text-white font-semibold text-sm hover:opacity-90 transition-opacity">
            Browse All Tools <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PDFToolsPage;
