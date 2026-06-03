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
const canonicalUrl = `${BASE_URL}/tools/calculator`;

const faqs = [
  { question: "How accurate is the BMI calculator?", answer: "The BMI calculator uses the standard WHO formula (weight in kg ÷ height in m²) and is accurate for adults aged 18–65. BMI is a screening tool and should be interpreted alongside other health indicators." },
  { question: "How is EMI calculated?", answer: "EMI is calculated using the standard formula: EMI = [P × R × (1+R)^N] / [(1+R)^N - 1], where P is the principal loan amount, R is the monthly interest rate (annual rate ÷ 12), and N is the loan tenure in months." },
  { question: "Can I calculate my exact age in days?", answer: "Yes! The Age Calculator shows your exact age in years, months, days, hours, and even minutes from your date of birth to today — or between any two dates you choose." },
  { question: "How do I calculate tip for a group?", answer: "Enter your total bill amount and the number of people in the Tip Calculator. Select your desired tip percentage (or enter a custom amount). The tool instantly shows the tip per person and total per person." },
  { question: "Are these calculators free to use?", answer: "Yes, all QuickTools calculators are completely free with no usage limits, no sign-up required, and all calculations happen privately in your browser." },
];

const otherCategories = [
  { name: "PDF Tools", path: "/tools/pdf", emoji: "📄", desc: "Merge, split, compress & convert" },
  { name: "Image Tools", path: "/tools/image", emoji: "🖼️", desc: "Compress, resize & remove backgrounds" },
  { name: "Converter Tools", path: "/tools/converter", emoji: "🔄", desc: "Units, colors & data formats" },
  { name: "Text Tools", path: "/tools/text", emoji: "✏️", desc: "Word counter, case converter & more" },
  { name: "Other Tools", path: "/tools/other", emoji: "⚡", desc: "QR codes, passwords & utilities" },
];

const CalculatorToolsPage = () => {
  useScrollReveal();
  const categoryTools = tools.filter((t) => t.category === "calculator");

  const schemas = [
    buildWebPageSchema({ name: "Free Online Calculators – QuickTools", description: "Free calculators: BMI, EMI loan, age, tip & bill split. Browser-based, instant results.", url: canonicalUrl }),
    buildFAQSchema(faqs),
    buildBreadcrumbSchema([{ name: "Home", url: "/" }, { name: "All Tools", url: "/tools" }, { name: "Calculators", url: "/tools/calculator" }]),
    buildItemListSchema(categoryTools.map((t) => ({ name: t.name, url: `${BASE_URL}${t.path}`, description: t.description }))),
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SEOHead
        title="Free Online Calculators – BMI, EMI, Age & Tip Calculator | QuickTools"
        description="Free online calculators: BMI calculator, age calculator, EMI loan calculator, tip calculator. Instant, accurate calculations in your browser."
        canonical={canonicalUrl}
        keywords={["bmi calculator online", "emi calculator free", "age calculator online", "tip calculator free", "loan calculator online", "online calculators free", "health calculator", "financial calculator"]}
        schemas={schemas}
      />
      <Navbar />

      <section className="relative overflow-hidden border-b border-border bg-gradient-to-br from-amber-50 via-background to-background dark:from-amber-950/20 dark:via-background">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -right-40 -top-40 w-96 h-96 rounded-full bg-amber-500/10 blur-3xl" />
        </div>
        <div className="relative container mx-auto px-4 py-14 md:py-20">
          <nav className="flex items-center gap-1.5 text-xs text-muted-foreground mb-6" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link to="/tools" className="hover:text-foreground transition-colors">All Tools</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-foreground font-medium">Calculators</span>
          </nav>
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100 dark:bg-amber-950/50 text-amber-700 dark:text-amber-400 text-xs font-semibold mb-4">
              🧮 Calculators
            </div>
            <h1 className="font-display font-bold text-4xl md:text-5xl text-foreground mb-5 leading-tight">
              Free Online Calculators
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl leading-relaxed">
              Accurate, instant calculators for health and finances — all free, all browser-based. Calculate your BMI (Body Mass Index) to understand your health status with metric and imperial support. Find your exact age in years, months, days, and hours from any date of birth. Plan loan repayments with the EMI calculator that shows monthly installments, total interest, and full amortization schedules. Calculate restaurant tips and split bills equally among any group size. All calculations happen instantly in your browser with no data sent to any server.
            </p>
            <div className="flex flex-wrap gap-3">
              {[{ icon: Shield, text: "Private & Secure" }, { icon: Zap, text: "Instant Results" }, { icon: Globe, text: "Browser-Based" }, { icon: Lock, text: "No Data Stored" }].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-card border border-border text-xs font-medium text-muted-foreground">
                  <Icon className="w-3.5 h-3.5 text-amber-600" /> {text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <h2 className="font-display font-bold text-2xl text-foreground mb-2">All Calculators</h2>
          <p className="text-muted-foreground text-sm mb-8">{categoryTools.length} free calculators — instant, accurate, browser-based</p>
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

export default CalculatorToolsPage;
