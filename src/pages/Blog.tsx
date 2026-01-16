import { Link } from "react-router-dom";
import { ArrowLeft, BookOpen, FileText, Image, Calculator, Type, Wrench } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const blogPosts = [
  { id: "all-tools-guide", title: "Complete Guide to QuickTools Online: 30+ Free Tools", excerpt: "Discover all the free, browser-based tools available on QuickTools Online.", category: "All Tools", icon: Wrench, readTime: "15 min read", path: "/blog/all-tools-guide" },
  { id: "pdf-to-word-guide", title: "How to Convert PDF to Word: Complete Guide", excerpt: "Learn how to convert PDF documents to editable Word files.", category: "PDF Tools", icon: FileText, readTime: "10 min read", path: "/blog/pdf-to-word-guide" },
  { id: "pdf-compressor-guide", title: "PDF Compression Guide: Reduce File Size", excerpt: "Compress PDF files effectively for email and storage.", category: "PDF Tools", icon: FileText, readTime: "8 min read", path: "/blog/pdf-compressor-guide" },
  { id: "pdf-to-excel-guide", title: "PDF to Excel Converter Guide", excerpt: "Extract tables and data from PDFs to Excel spreadsheets.", category: "PDF Tools", icon: FileText, readTime: "7 min read", path: "/blog/pdf-to-excel-guide" },
  { id: "ocr-pdf-guide", title: "OCR PDF: Extract Text from Scanned Documents", excerpt: "Convert scanned PDFs to searchable, editable text.", category: "PDF Tools", icon: FileText, readTime: "8 min read", path: "/blog/ocr-pdf-guide" },
  { id: "background-remover-guide", title: "AI Background Remover Guide", excerpt: "Remove backgrounds from images using AI technology.", category: "Image Tools", icon: Image, readTime: "12 min read", path: "/blog/background-remover-guide" },
  { id: "image-compressor-guide", title: "Image Compressor: Reduce File Size", excerpt: "Compress images for faster uploads and website optimization.", category: "Image Tools", icon: Image, readTime: "7 min read", path: "/blog/image-compressor-guide" },
  { id: "webp-converter-guide", title: "WebP Converter: Modern Image Format", excerpt: "Convert images to WebP for superior compression.", category: "Image Tools", icon: Image, readTime: "6 min read", path: "/blog/webp-converter-guide" },
  { id: "word-counter-guide", title: "Word Counter Guide", excerpt: "Track words, characters, and more for your content.", category: "Text Tools", icon: Type, readTime: "5 min read", path: "/blog/word-counter-guide" },
  { id: "qr-generator-guide", title: "QR Code Generator Guide", excerpt: "Create scannable QR codes for any purpose.", category: "Other Tools", icon: Wrench, readTime: "6 min read", path: "/blog/qr-generator-guide" },
  { id: "password-generator-guide", title: "Password Generator Guide", excerpt: "Create strong, secure passwords to protect your accounts.", category: "Other Tools", icon: Wrench, readTime: "5 min read", path: "/blog/password-generator-guide" },
  { id: "bmi-calculator-guide", title: "BMI Calculator Guide", excerpt: "Calculate and understand your Body Mass Index.", category: "Calculators", icon: Calculator, readTime: "6 min read", path: "/blog/bmi-calculator-guide" },
  { id: "url-shortener-guide", title: "URL Shortener Guide", excerpt: "Create short, shareable links for social media.", category: "Other Tools", icon: Wrench, readTime: "6 min read", path: "/blog/url-shortener-guide" },
  { id: "pdf-best-practices", title: "PDF Management Best Practices", excerpt: "Learn how to efficiently manage PDF documents.", category: "PDF Tools", icon: FileText, readTime: "8 min read", path: "/blog/pdf-best-practices" },
  { id: "image-optimization", title: "Image Optimization Guide", excerpt: "Reduce image file sizes while maintaining quality.", category: "Image Tools", icon: Image, readTime: "6 min read", path: "/blog/image-optimization" },
  { id: "financial-calculators", title: "Understanding EMI and Financial Planning", excerpt: "Master loan calculations and financial decisions.", category: "Calculators", icon: Calculator, readTime: "10 min read", path: "/blog/financial-calculators" },
  { id: "text-productivity", title: "Text Processing Tips", excerpt: "Boost writing efficiency with text tools.", category: "Text Tools", icon: Type, readTime: "7 min read", path: "/blog/text-productivity" }
];

const Blog = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="w-8 h-8 text-primary" />
            <h1 className="text-4xl font-bold">Resources & Guides</h1>
          </div>
          <p className="text-lg text-muted-foreground">
            Learn how to make the most of our tools with comprehensive guides, tips, and best practices.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {blogPosts.map((post) => {
            const Icon = post.icon;
            return (
              <Link
                key={post.id}
                to={post.path}
                className="group bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all hover:border-primary/50"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm text-muted-foreground mb-2">{post.category} • {post.readTime}</div>
                    <h2 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-muted-foreground">{post.excerpt}</p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Blog;
