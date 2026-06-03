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
  { question: "What image formats are supported?", answer: "QuickTools image tools support all major formats including JPEG, PNG, WebP, GIF, and BMP. You can convert between these formats, compress them, resize them, and more." },
  { question: "Can I compress images without losing quality?", answer: "Yes! Our image compressor uses smart compression algorithms that can reduce file sizes by 50–90% while maintaining visually lossless quality at 80–90% quality settings." },
  { question: "How does AI background removal work?", answer: "The AI background remover uses machine learning models that run entirely in your browser to detect the subject in your image and remove everything else, creating a transparent PNG." },
  { question: "Are my images uploaded to a server?", answer: "Never. All image processing — compression, resizing, cropping, background removal, format conversion — happens locally in your browser. Your images never leave your device." },
  { question: "Can I process multiple images at once?", answer: "Yes! The Image Compressor and Image Resizer support batch processing. Upload multiple images at once and process them all simultaneously." },
];

const otherCategories = [
  { name: "PDF Tools", path: "/tools/pdf", emoji: "📄", desc: "Merge, split, compress & convert" },
  { name: "Converter Tools", path: "/tools/converter", emoji: "🔄", desc: "Units, colors & data formats" },
  { name: "Text Tools", path: "/tools/text", emoji: "✏️", desc: "Word counter, case converter & more" },
  { name: "Calculators", path: "/tools/calculator", emoji: "🧮", desc: "BMI, EMI, age & tip calculator" },
  { name: "Other Tools", path: "/tools/other", emoji: "⚡", desc: "QR codes, passwords & utilities" },
];

const ImageToolsPage = () => {
  useScrollReveal();
  const categoryTools = tools.filter((t) => t.category === "image");
  const canonicalUrl = `${BASE_URL}/tools/image`;

  const schemas = [
    buildWebPageSchema({ name: "Free Online Image Tools – QuickTools", description: "Free online image tools: compress, resize, crop, remove background, convert to WebP. Browser-based, no uploads.", url: canonicalUrl }),
    buildFAQSchema(faqs),
    buildBreadcrumbSchema([{ name: "Home", url: "/" }, { name: "All Tools", url: "/tools" }, { name: "Image Tools", url: "/tools/image" }]),
    buildItemListSchema(categoryTools.map((t) => ({ name: t.name, url: `${BASE_URL}${t.path}`, description: t.description }))),
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SEOHead
        title="Free Online Image Tools – Compress, Resize & Convert Images | QuickTools"
        description="Free image tools: compress images, resize photos, remove backgrounds, convert to WebP, crop images and more. Browser-based image editing – no uploads required."
        canonical={canonicalUrl}
        keywords={["image tools online", "compress image free", "resize image online", "remove background free", "image converter online", "crop image free", "image to webp", "image compressor"]}
        schemas={schemas}
      />
      <Navbar />

      <section className="relative overflow-hidden border-b border-border bg-gradient-to-br from-emerald-50 via-background to-background dark:from-emerald-950/20 dark:via-background">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -right-40 -top-40 w-96 h-96 rounded-full bg-emerald-500/10 blur-3xl" />
        </div>
        <div className="relative container mx-auto px-4 py-14 md:py-20">
          <nav className="flex items-center gap-1.5 text-xs text-muted-foreground mb-6" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link to="/tools" className="hover:text-foreground transition-colors">All Tools</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-foreground font-medium">Image Tools</span>
          </nav>
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 text-xs font-semibold mb-4">
              🖼️ Image Tools
            </div>
            <h1 className="font-display font-bold text-4xl md:text-5xl text-foreground mb-5 leading-tight">
              Free Online Image Tools
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl leading-relaxed">
              Professional-grade image editing tools that work entirely in your browser. Compress JPEG, PNG, and WebP images to reduce file sizes by up to 90% without visible quality loss. Resize images to any dimensions. Crop photos with preset aspect ratios for social media. Remove backgrounds using AI technology. Convert images to WebP format for faster websites. Extract text from images using OCR. All tools are completely free, no sign-up needed, and process your images locally — your photos never leave your device.
            </p>
            <div className="flex flex-wrap gap-3">
              {[{ icon: Shield, text: "No Uploads" }, { icon: Zap, text: "AI-Powered" }, { icon: Globe, text: "Browser-Based" }, { icon: Lock, text: "100% Private" }].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-card border border-border text-xs font-medium text-muted-foreground">
                  <Icon className="w-3.5 h-3.5 text-emerald-600" /> {text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <h2 className="font-display font-bold text-2xl text-foreground mb-2">All Image Tools</h2>
          <p className="text-muted-foreground text-sm mb-8">{categoryTools.length} free image tools — no sign-up, no uploads required</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 reveal">
            {categoryTools.map((tool, i) => <ToolCard key={tool.id} tool={tool} variant="featured" index={i} />)}
          </div>
        </div>
      </section>

      <section className="py-12 bg-muted/30 border-y border-border reveal">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="font-display font-bold text-2xl text-foreground mb-6 text-center">Why Use QuickTools for Images?</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { title: "AI Background Removal", desc: "State-of-the-art AI that runs in your browser to remove backgrounds perfectly." },
              { title: "Batch Processing", desc: "Compress or resize multiple images simultaneously to save time." },
              { title: "WebP Conversion", desc: "Convert images to WebP for 30% better compression than JPEG." },
              { title: "No Quality Loss", desc: "Smart compression maintains visual quality while dramatically reducing file sizes." },
              { title: "All Formats Supported", desc: "JPEG, PNG, WebP, GIF — all major image formats are supported." },
              { title: "Instant Preview", desc: "See your results before downloading with real-time previews." },
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

      <section className="py-12 md:py-16" aria-labelledby="faq-heading" itemScope itemType="https://schema.org/FAQPage">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 id="faq-heading" className="font-display font-bold text-2xl text-foreground mb-8">Frequently Asked Questions About Image Tools</h2>
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

export default ImageToolsPage;
