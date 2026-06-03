import { Link } from "react-router-dom";
import { ArrowLeft, Zap, Search, FileText, Image, Calculator } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const quickLinks = [
  { to: "/tools", label: "All Tools", icon: Zap, emoji: "⚡" },
  { to: "/tools/pdf-merge", label: "Merge PDF", icon: FileText, emoji: "📄" },
  { to: "/tools/image-compressor", label: "Image Compressor", icon: Image, emoji: "🖼️" },
  { to: "/tools/bmi-calculator", label: "BMI Calculator", icon: Calculator, emoji: "🧮" },
];

const NotFound = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="text-center max-w-lg mx-auto">
          {/* 404 number */}
          <div className="relative inline-block mb-8">
            <span className="font-display font-black text-[120px] md:text-[160px] leading-none gradient-text opacity-20 select-none">
              404
            </span>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 rounded-3xl gradient-bg flex items-center justify-center shadow-brand-lg animate-float">
                <Search className="w-9 h-9 text-white" />
              </div>
            </div>
          </div>

          <h1 className="font-display font-bold text-2xl md:text-3xl text-foreground mb-3">
            Page not found
          </h1>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            The page you're looking for doesn't exist or has been moved.
            Try one of our popular tools below, or head back home.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-10">
            <Link
              to="/"
              className="flex items-center gap-2 px-6 py-3 rounded-xl gradient-bg text-white font-semibold text-sm shadow-brand hover:shadow-brand-lg transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
            <Link
              to="/tools"
              className="flex items-center gap-2 px-6 py-3 rounded-xl border border-border text-foreground font-semibold text-sm hover:bg-muted/60 transition-all"
            >
              Browse All Tools
            </Link>
          </div>

          {/* Quick Links */}
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              Popular Tools
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {quickLinks.map(({ to, label, emoji }) => (
                <Link
                  key={to}
                  to={to}
                  className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-card border border-border hover:border-primary/40 hover:bg-primary/5 transition-all text-center"
                >
                  <span className="text-xl">{emoji}</span>
                  <span className="text-xs font-medium text-muted-foreground hover:text-foreground">{label}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
