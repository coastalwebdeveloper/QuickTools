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
const canonicalUrl = `${BASE_URL}/tools/text`;

const faqs = [
  { question: "How does the word counter work?", answer: "The word counter analyzes your text in real time, splitting it by whitespace to count words, and counting individual characters for character count (with and without spaces). Reading time is estimated at 200 words per minute." },
  { question: "Can I convert text case for free?", answer: "Yes, completely free. The Case Converter supports uppercase, lowercase, title case, sentence case, camelCase, snake_case, kebab-case, and alternating case with no limits." },
  { question: "How do I compare two texts for differences?", answer: "Use the Text Diff Checker tool. Paste the first text in the left panel and the second in the right panel. Differences are highlighted in color — green for additions, red for deletions." },
  { question: "Does the HTML formatter work with large files?", answer: "Yes, the HTML formatter can handle large HTML files and code blocks. It formats, indents, and beautifies HTML code efficiently in your browser without any file size limit." },
  { question: "Is my text kept private?", answer: "Absolutely. All text processing in QuickTools happens locally in your browser. Your text, content, or code is never transmitted to our servers or stored anywhere." },
];

const otherCategories = [
  { name: "PDF Tools", path: "/tools/pdf", emoji: "📄", desc: "Merge, split, compress & convert" },
  { name: "Image Tools", path: "/tools/image", emoji: "🖼️", desc: "Compress, resize & remove backgrounds" },
  { name: "Converter Tools", path: "/tools/converter", emoji: "🔄", desc: "Units, colors & data formats" },
  { name: "Calculators", path: "/tools/calculator", emoji: "🧮", desc: "BMI, EMI, age & tip calculator" },
  { name: "Other Tools", path: "/tools/other", emoji: "⚡", desc: "QR codes, passwords & utilities" },
];

const TextToolsPage = () => {
  useScrollReveal();
  const categoryTools = tools.filter((t) => t.category === "text");

  const schemas = [
    buildWebPageSchema({ name: "Free Online Text Tools – QuickTools", description: "Free online text tools: word counter, case converter, text cleaner, diff checker, HTML formatter. Browser-based, instant.", url: canonicalUrl }),
    buildFAQSchema(faqs),
    buildBreadcrumbSchema([{ name: "Home", url: "/" }, { name: "All Tools", url: "/tools" }, { name: "Text Tools", url: "/tools/text" }]),
    buildItemListSchema(categoryTools.map((t) => ({ name: t.name, url: `${BASE_URL}${t.path}`, description: t.description }))),
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SEOHead
        title="Free Online Text Tools – Word Counter, Case Converter & More | QuickTools"
        description="Free text tools: word counter, case converter, text cleaner, diff checker, HTML formatter. Instant browser-based text processing – no uploads needed."
        canonical={canonicalUrl}
        keywords={["word counter online", "text tools free", "case converter online", "text diff checker", "html formatter free", "text cleaner online", "character counter", "free online text editor"]}
        schemas={schemas}
      />
      <Navbar />

      <section className="relative overflow-hidden border-b border-border bg-gradient-to-br from-violet-50 via-background to-background dark:from-violet-950/20 dark:via-background">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -right-40 -top-40 w-96 h-96 rounded-full bg-violet-500/10 blur-3xl" />
        </div>
        <div className="relative container mx-auto px-4 py-14 md:py-20">
          <nav className="flex items-center gap-1.5 text-xs text-muted-foreground mb-6" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link to="/tools" className="hover:text-foreground transition-colors">All Tools</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-foreground font-medium">Text Tools</span>
          </nav>
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-violet-100 dark:bg-violet-950/50 text-violet-700 dark:text-violet-400 text-xs font-semibold mb-4">
              ✏️ Text Tools
            </div>
            <h1 className="font-display font-bold text-4xl md:text-5xl text-foreground mb-5 leading-tight">
              Free Online Text Tools
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl leading-relaxed">
              Powerful text analysis and formatting tools that work instantly in your browser. Count words, characters, sentences, paragraphs, and estimated reading time with the Word Counter. Transform text case to uppercase, lowercase, title case, camelCase, and more. Clean messy copied text by removing extra spaces and line breaks. Compare two text versions side-by-side to spot every change. Format and beautify HTML code with automatic indentation. All tools are completely free, work offline, and keep your text 100% private.
            </p>
            <div className="flex flex-wrap gap-3">
              {[{ icon: Shield, text: "100% Private" }, { icon: Zap, text: "Real-Time" }, { icon: Globe, text: "Browser-Based" }, { icon: Lock, text: "Works Offline" }].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-card border border-border text-xs font-medium text-muted-foreground">
                  <Icon className="w-3.5 h-3.5 text-violet-600" /> {text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <h2 className="font-display font-bold text-2xl text-foreground mb-2">All Text Tools</h2>
          <p className="text-muted-foreground text-sm mb-8">{categoryTools.length} free text tools — instant processing, no uploads</p>
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

export default TextToolsPage;
