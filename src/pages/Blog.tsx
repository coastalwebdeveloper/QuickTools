import { Link } from "react-router-dom";
import { ArrowLeft, BookOpen, FileText, Image, Calculator, Type } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const blogPosts = [
  {
    id: "pdf-best-practices",
    title: "PDF Management Best Practices: A Complete Guide",
    excerpt: "Learn how to efficiently manage, merge, and split PDF documents for personal and professional use.",
    category: "PDF Tools",
    icon: FileText,
    readTime: "8 min read",
    path: "/blog/pdf-best-practices"
  },
  {
    id: "image-optimization",
    title: "Image Optimization Guide: Compress Without Losing Quality",
    excerpt: "Discover techniques to reduce image file sizes while maintaining visual quality for web and print.",
    category: "Image Tools",
    icon: Image,
    readTime: "6 min read",
    path: "/blog/image-optimization"
  },
  {
    id: "financial-calculators",
    title: "Understanding EMI, Loans, and Financial Planning",
    excerpt: "Master loan calculations, EMI planning, and make informed financial decisions with our guide.",
    category: "Calculators",
    icon: Calculator,
    readTime: "10 min read",
    path: "/blog/financial-calculators"
  },
  {
    id: "text-productivity",
    title: "Text Processing Tips for Enhanced Productivity",
    excerpt: "Boost your writing efficiency with text tools, word counting, and formatting techniques.",
    category: "Text Tools",
    icon: Type,
    readTime: "7 min read",
    path: "/blog/text-productivity"
  }
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
