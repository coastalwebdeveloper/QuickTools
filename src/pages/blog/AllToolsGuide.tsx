import { Link } from "react-router-dom";
import { ArrowLeft, FileText, Image, Calculator, Type, RefreshCw, Shuffle, FileDown, Minimize2, FileSpreadsheet, ScanText, ImageMinus, Link as LinkIcon, QrCode, Lock, Hash } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const AllToolsGuide = () => {
  const toolCategories = [
    {
      title: "PDF Tools",
      icon: FileText,
      color: "from-red-500 to-orange-500",
      tools: [
        { name: "PDF to Word", path: "/tools/pdf-to-word", icon: FileDown, desc: "Convert PDFs to editable Word documents" },
        { name: "PDF Compressor", path: "/tools/pdf-compressor", icon: Minimize2, desc: "Reduce PDF file sizes" },
        { name: "Merge PDF", path: "/tools/pdf-merge", icon: FileText, desc: "Combine multiple PDFs" },
        { name: "Split PDF", path: "/tools/pdf-split", icon: FileText, desc: "Extract pages from PDFs" },
        { name: "PDF to Excel", path: "/tools/pdf-to-excel", icon: FileSpreadsheet, desc: "Convert PDF tables to Excel" },
        { name: "OCR PDF", path: "/tools/ocr-pdf", icon: ScanText, desc: "Extract text from scanned PDFs" },
        { name: "PDF to Images", path: "/tools/pdf-to-images", icon: Image, desc: "Convert PDF pages to images" },
      ]
    },
    {
      title: "Image Tools",
      icon: Image,
      color: "from-green-500 to-emerald-500",
      tools: [
        { name: "Background Remover", path: "/tools/image-background-remover", icon: ImageMinus, desc: "Remove image backgrounds with AI" },
        { name: "Image to WebP", path: "/tools/image-to-webp", icon: RefreshCw, desc: "Convert to modern WebP format" },
        { name: "Image Compressor", path: "/tools/image-compressor", icon: Minimize2, desc: "Reduce image file sizes" },
        { name: "Image Resizer", path: "/tools/image-resizer", icon: Image, desc: "Resize images to any dimension" },
        { name: "Image Cropper", path: "/tools/image-cropper", icon: Image, desc: "Crop and trim images" },
      ]
    },
    {
      title: "Text Tools",
      icon: Type,
      color: "from-purple-500 to-pink-500",
      tools: [
        { name: "Word Counter", path: "/tools/word-counter", icon: Hash, desc: "Count words and characters" },
        { name: "Case Converter", path: "/tools/case-converter", icon: Type, desc: "Convert text case" },
        { name: "Text Cleaner", path: "/tools/text-cleaner", icon: Type, desc: "Clean up messy text" },
        { name: "Text Diff", path: "/tools/text-diff", icon: Type, desc: "Compare text differences" },
      ]
    },
    {
      title: "Calculators",
      icon: Calculator,
      color: "from-amber-500 to-yellow-500",
      tools: [
        { name: "BMI Calculator", path: "/tools/bmi-calculator", icon: Calculator, desc: "Calculate Body Mass Index" },
        { name: "Age Calculator", path: "/tools/age-calculator", icon: Calculator, desc: "Calculate exact age" },
        { name: "EMI Calculator", path: "/tools/emi-calculator", icon: Calculator, desc: "Calculate loan EMI" },
        { name: "Tip Calculator", path: "/tools/tip-calculator", icon: Calculator, desc: "Calculate tips and split bills" },
      ]
    },
    {
      title: "Other Tools",
      icon: Shuffle,
      color: "from-indigo-500 to-violet-500",
      tools: [
        { name: "URL Shortener", path: "/tools/url-shortener", icon: LinkIcon, desc: "Create short links" },
        { name: "QR Generator", path: "/tools/qr-generator", icon: QrCode, desc: "Generate QR codes" },
        { name: "Password Generator", path: "/tools/password-generator", icon: Lock, desc: "Create secure passwords" },
        { name: "Stopwatch", path: "/tools/stopwatch", icon: Shuffle, desc: "Track time" },
        { name: "Random Number", path: "/tools/random-number", icon: Shuffle, desc: "Generate random numbers" },
      ]
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <article className="container mx-auto px-4 py-8 max-w-7xl">
        <Link to="/blog" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back to Resources
        </Link>

        <header className="mb-12 text-center">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Complete Guide to QuickTools Online</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover 30+ free, browser-based tools for PDF editing, image processing, text manipulation, and more. All tools work offline and protect your privacy.
          </p>
        </header>

        <div className="grid gap-8 mb-12">
          {toolCategories.map((category) => {
            const CategoryIcon = category.icon;
            return (
              <div key={category.title} className="bg-card border border-border rounded-2xl p-8 shadow-lg">
                <div className="flex items-center gap-4 mb-6">
                  <div className={`p-4 rounded-xl bg-gradient-to-br ${category.color}`}>
                    <CategoryIcon className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold">{category.title}</h2>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {category.tools.map((tool) => {
                    const ToolIcon = tool.icon;
                    return (
                      <Link
                        key={tool.path}
                        to={tool.path}
                        className="group p-4 rounded-xl border border-border hover:border-primary hover:shadow-md transition-all bg-background"
                      >
                        <div className="flex items-start gap-3">
                          <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                            <ToolIcon className="w-5 h-5 text-primary" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">{tool.name}</h3>
                            <p className="text-sm text-muted-foreground">{tool.desc}</p>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-primary/20 rounded-2xl p-8 mb-12">
          <h2 className="text-3xl font-bold mb-6">Why Choose QuickTools Online?</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">🔒</span>
              </div>
              <div>
                <h3 className="font-semibold mb-2">100% Private</h3>
                <p className="text-muted-foreground">All processing happens in your browser. No file uploads, complete privacy.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">⚡</span>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Lightning Fast</h3>
                <p className="text-muted-foreground">Browser-based processing means instant results without server delays.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">💯</span>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Completely Free</h3>
                <p className="text-muted-foreground">All tools are free forever. No subscriptions, no hidden costs.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">📱</span>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Works Everywhere</h3>
                <p className="text-muted-foreground">Mobile-friendly design works on phones, tablets, and desktops.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-2xl p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Start Using QuickTools Today</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Explore our complete collection of free online tools and boost your productivity.
          </p>
          <Link to="/tools" className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-lg font-semibold">
            View All Tools
          </Link>
        </div>
      </article>
      <Footer />
    </div>
  );
};

export default AllToolsGuide;
