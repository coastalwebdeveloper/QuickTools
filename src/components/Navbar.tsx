import { Link, useLocation } from "react-router-dom";
import { Moon, Sun, Menu, X, Search, ChevronDown, ArrowRight, FileText, Image, Calculator, Type, RefreshCw, Shuffle, Zap, Sparkles } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { searchTools } from "@/lib/toolsData";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import AuthButton from "@/components/AuthButton";
import { useAuth } from "@/hooks/useAuth";

const categoryGroups = [
  {
    id: "pdf",
    name: "PDF Tools",
    icon: FileText,
    color: "text-red-500",
    bg: "bg-red-50 dark:bg-red-950/40",
    tools: ["PDF to Word", "PDF Compressor", "Merge PDF", "Split PDF", "PDF to Excel", "OCR PDF"],
    paths: ["/tools/pdf-to-word", "/tools/pdf-compressor", "/tools/pdf-merge", "/tools/pdf-split", "/tools/pdf-to-excel", "/tools/ocr-pdf"],
  },
  {
    id: "image",
    name: "Image Tools",
    icon: Image,
    color: "text-emerald-500",
    bg: "bg-emerald-50 dark:bg-emerald-950/40",
    tools: ["Image Compressor", "Image Resizer", "Background Remover", "Image Cropper", "Image to WebP", "Image to Text"],
    paths: ["/tools/image-compressor", "/tools/image-resizer", "/tools/image-background-remover", "/tools/image-cropper", "/tools/image-to-webp", "/tools/image-to-text"],
  },
  {
    id: "converter",
    name: "Converters",
    icon: RefreshCw,
    color: "text-blue-500",
    bg: "bg-blue-50 dark:bg-blue-950/40",
    tools: ["Color Converter", "Unit Converter", "Base64 Tool", "JSON to CSV"],
    paths: ["/tools/color-converter", "/tools/unit-converter", "/tools/base64-tool", "/tools/json-to-csv"],
  },
  {
    id: "text",
    name: "Text Tools",
    icon: Type,
    color: "text-violet-500",
    bg: "bg-violet-50 dark:bg-violet-950/40",
    tools: ["Word Counter", "Case Converter", "Text Cleaner", "Text Diff", "HTML Formatter"],
    paths: ["/tools/word-counter", "/tools/case-converter", "/tools/text-cleaner", "/tools/text-diff", "/tools/html-formatter"],
  },
  {
    id: "calculator",
    name: "Calculators",
    icon: Calculator,
    color: "text-amber-500",
    bg: "bg-amber-50 dark:bg-amber-950/40",
    tools: ["BMI Calculator", "Age Calculator", "EMI Calculator", "Tip Calculator"],
    paths: ["/tools/bmi-calculator", "/tools/age-calculator", "/tools/emi-calculator", "/tools/tip-calculator"],
  },
  {
    id: "misc",
    name: "Other Tools",
    icon: Shuffle,
    color: "text-indigo-500",
    bg: "bg-indigo-50 dark:bg-indigo-950/40",
    tools: ["QR Code Generator", "Password Generator", "URL Shortener", "YouTube Thumbnail"],
    paths: ["/tools/qr-generator", "/tools/password-generator", "/tools/url-shortener", "/tools/youtube-thumbnail-downloader"],
  },
];

const Navbar = () => {
  const { isAuthenticated, login } = useAuth();
  const [isDark, setIsDark] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<ReturnType<typeof searchTools>>([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const megaMenuRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  const handleAiToolsClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      navigate('/login');
    } else {
      navigate('/dashboard');
    }
  };

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const dark = saved === "dark" || (!saved && window.matchMedia("(prefers-color-scheme: dark)").matches);
    setIsDark(dark);
    document.documentElement.classList.toggle("dark", dark);
  }, []);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (megaMenuRef.current && !megaMenuRef.current.contains(e.target as Node)) {
        setIsMegaMenuOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowSearchResults(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
    setIsMegaMenuOpen(false);
  }, [location.pathname]);

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  const handleSearch = (q: string) => {
    setSearchQuery(q);
    if (q.trim().length > 0) {
      setSearchResults(searchTools(q).slice(0, 6));
      setShowSearchResults(true);
    } else {
      setSearchResults([]);
      setShowSearchResults(false);
    }
  };

  const handleSelectTool = (path: string) => {
    navigate(path);
    setSearchQuery("");
    setShowSearchResults(false);
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <nav
        className={cn(
          "sticky top-0 z-50 transition-all duration-300",
          isScrolled
            ? "navbar-glass shadow-sm"
            : "bg-transparent border-b border-transparent"
        )}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 group shrink-0">
              <img
                src="/QuickTools_Logo.png"
                alt="QuickTools Logo"
                className="w-8 h-8 rounded-lg object-contain shadow-brand group-hover:shadow-brand-lg transition-shadow"
              />
              <span className="font-display font-bold text-xl tracking-tight">
                <span className="text-foreground">Quick</span>
                <span className="gradient-text">Tools</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-1">
              <Link
                to="/"
                className={cn(
                  "px-3.5 py-2 rounded-lg text-sm font-medium transition-colors",
                  isActive("/")
                    ? "text-primary bg-primary/8"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                )}
              >
                Home
              </Link>

              {/* Mega Menu Trigger */}
              <div ref={megaMenuRef} className="relative">
                <button
                  onClick={() => setIsMegaMenuOpen(!isMegaMenuOpen)}
                  className={cn(
                    "flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium transition-colors",
                    isMegaMenuOpen || location.pathname.startsWith("/tools")
                      ? "text-primary bg-primary/8"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                  )}
                >
                  All Tools
                  <ChevronDown className={cn("w-3.5 h-3.5 transition-transform duration-200", isMegaMenuOpen && "rotate-180")} />
                </button>

                {/* Mega Menu Dropdown */}
                {isMegaMenuOpen && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[720px] bg-card border border-border rounded-2xl shadow-xl animate-slide-down overflow-hidden">
                    <div className="p-4 grid grid-cols-3 gap-3">
                      {categoryGroups.map((cat) => {
                        const CatIcon = cat.icon;
                        return (
                          <div key={cat.id}>
                            <div className={cn("flex items-center gap-2 px-2 py-1.5 rounded-lg mb-2", cat.bg)}>
                              <CatIcon className={cn("w-3.5 h-3.5", cat.color)} />
                              <span className={cn("text-xs font-semibold", cat.color)}>{cat.name}</span>
                            </div>
                            <div className="space-y-0.5">
                              {cat.tools.map((toolName, i) => (
                                <Link
                                  key={toolName}
                                  to={cat.paths[i]}
                                  onClick={() => setIsMegaMenuOpen(false)}
                                  className="flex items-center gap-2 px-2 py-1.5 text-xs text-muted-foreground hover:text-foreground hover:bg-muted/60 rounded-lg transition-colors"
                                >
                                  <span className="w-1 h-1 rounded-full bg-border" />
                                  {toolName}
                                </Link>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <div className="px-4 py-3 border-t border-border bg-muted/30 flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">34+ free browser-based tools</span>
                      <Link
                        to="/tools"
                        onClick={() => setIsMegaMenuOpen(false)}
                        className="flex items-center gap-1.5 text-xs font-medium text-primary hover:text-primary/80 transition-colors"
                      >
                        View all tools <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              <Link
                to="/blog"
                className={cn(
                  "px-3.5 py-2 rounded-lg text-sm font-medium transition-colors",
                  isActive("/blog")
                    ? "text-primary bg-primary/8"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                )}
              >
                Blog
              </Link>
              <Link
                to="/about"
                className={cn(
                  "px-3.5 py-2 rounded-lg text-sm font-medium transition-colors",
                  isActive("/about")
                    ? "text-primary bg-primary/8"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                )}
              >
                About
              </Link>
            </div>

            {/* Right: Search + Theme + CTA */}
            <div className="hidden lg:flex items-center gap-2">
              {/* Search */}
              <div ref={searchRef} className="relative">
                <div className={cn(
                  "flex items-center gap-2 px-3 py-2 rounded-xl border transition-all duration-200 w-48",
                  searchFocused
                    ? "border-primary/50 bg-card shadow-sm w-64"
                    : "border-border bg-muted/40 hover:border-border/80"
                )}>
                  <Search className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                  <input
                    type="text"
                    placeholder="Search tools..."
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                    onFocus={() => { setSearchFocused(true); if (searchQuery) setShowSearchResults(true); }}
                    onBlur={() => { setTimeout(() => { setSearchFocused(false); setShowSearchResults(false); }, 200); }}
                    className="bg-transparent text-xs outline-none w-full text-foreground placeholder:text-muted-foreground"
                  />
                  {searchQuery && (
                    <button onClick={() => { setSearchQuery(""); setShowSearchResults(false); }} className="shrink-0">
                      <X className="w-3 h-3 text-muted-foreground hover:text-foreground" />
                    </button>
                  )}
                </div>

                {/* Search Dropdown */}
                {showSearchResults && searchResults.length > 0 && (
                  <div className="absolute top-full right-0 mt-2 w-72 bg-card border border-border rounded-xl shadow-xl animate-slide-down overflow-hidden z-50">
                    {searchResults.map((tool) => {
                      const Icon = tool.icon;
                      return (
                        <button
                          key={tool.id}
                          onMouseDown={() => handleSelectTool(tool.path)}
                          className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-muted/60 transition-colors text-left border-b border-border/50 last:border-0"
                        >
                          <div className={cn("p-1.5 rounded-lg shrink-0", tool.color.replace("text-", "bg-").replace("-600", "-100").replace("-400", "-900/30"))}>
                            <Icon className={cn("w-3.5 h-3.5", tool.color.split(" ")[0])} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-semibold text-foreground truncate">{tool.name}</p>
                            <p className="text-xs text-muted-foreground truncate">{tool.description.slice(0, 40)}...</p>
                          </div>
                        </button>
                      );
                    })}
                    <div className="px-3 py-2 border-t border-border bg-muted/30">
                      <Link to="/tools" onMouseDown={() => setShowSearchResults(false)} className="flex items-center gap-1.5 text-xs text-primary font-medium hover:underline">
                        Browse all tools <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* Dark mode toggle */}
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="rounded-xl w-9 h-9 hover:bg-muted/60"
                aria-label="Toggle theme"
              >
                {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </Button>

              {/* Auth */}
              <AuthButton />

              {/* CTA */}
              <button
                onClick={handleAiToolsClick}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl gradient-bg text-white text-sm font-semibold shadow-brand hover:shadow-brand-lg btn-glow transition-all duration-200"
              >
                <Sparkles className="w-3.5 h-3.5" />
                AI Tools
              </button>
            </div>

            {/* Mobile: Theme + Hamburger */}
            <div className="lg:hidden flex items-center gap-1.5">
              <Button variant="ghost" size="icon" onClick={toggleTheme} className="rounded-xl w-9 h-9" aria-label="Toggle theme">
                {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="rounded-xl w-9 h-9"
                aria-label="Open menu"
              >
                {isMenuOpen ? <X className="w-4.5 h-4.5" /> : <Menu className="w-4.5 h-4.5" />}
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Full-Screen Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-background/95 backdrop-blur-xl" onClick={() => setIsMenuOpen(false)} />
          <div className="relative h-full flex flex-col pt-20 pb-8 px-4 overflow-y-auto">

            {/* Mobile Search */}
            <div className="relative mb-6">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search 34+ tools..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full pl-11 pr-4 py-3.5 text-sm rounded-2xl bg-muted/50 border border-border focus:border-primary/50 focus:ring-2 focus:ring-primary/20 outline-none transition-all"
              />
            </div>

            {/* Mobile Search Results */}
            {showSearchResults && searchResults.length > 0 && (
              <div className="mb-6 bg-card border border-border rounded-2xl overflow-hidden shadow-card">
                {searchResults.map((tool) => {
                  const Icon = tool.icon;
                  return (
                    <button
                      key={tool.id}
                      onClick={() => { navigate(tool.path); setIsMenuOpen(false); }}
                      className="w-full flex items-center gap-3 px-4 py-3 hover:bg-muted/60 transition-colors text-left border-b border-border/50 last:border-0"
                    >
                      <div className={cn("p-2 rounded-lg", tool.color.split(" ").slice(0, 1).join(" ").replace("text-", "bg-").replace("600", "100").replace("400", "900/30"))}>
                        <Icon className={cn("w-4 h-4", tool.color.split(" ")[0])} />
                      </div>
                      <div>
                        <p className="text-sm font-semibold">{tool.name}</p>
                        <p className="text-xs text-muted-foreground">{tool.description.slice(0, 50)}...</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}

            {/* Mobile Nav Links */}
            <div className="space-y-1 mb-6">
              {[
                { to: "/", label: "Home" },
                { to: "/tools", label: "All Tools" },
                { to: "/blog", label: "Blog & Guides" },
                { to: "/about", label: "About" },
                { to: "/contact", label: "Contact" },
              ].map(({ to, label }) => (
                <Link
                  key={to}
                  to={to}
                  onClick={() => setIsMenuOpen(false)}
                  className={cn(
                    "flex items-center justify-between px-4 py-3.5 rounded-xl text-base font-medium transition-colors",
                    isActive(to)
                      ? "bg-primary/10 text-primary"
                      : "hover:bg-muted/60 text-foreground"
                  )}
                >
                  {label}
                  <ArrowRight className="w-4 h-4 text-muted-foreground" />
                </Link>
              ))}
            </div>

            {/* Category quick access */}
            <div className="mb-6">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-1 mb-3">Browse by Category</p>
              <div className="grid grid-cols-2 gap-2">
                {categoryGroups.map((cat) => {
                  const CatIcon = cat.icon;
                  return (
                    <Link
                      key={cat.id}
                      to="/tools"
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center gap-2.5 p-3 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
                    >
                      <CatIcon className={cn("w-4 h-4", cat.color)} />
                      <span className="text-sm font-medium">{cat.name}</span>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Mobile CTA */}
            <div className="flex flex-col gap-3">
              <button
                onClick={(e) => { setIsMenuOpen(false); handleAiToolsClick(e); }}
                className="flex items-center justify-center gap-2 py-3.5 rounded-xl gradient-bg text-white text-sm font-semibold shadow-brand"
              >
                <Sparkles className="w-4 h-4" />
                AI Tools
              </button>
              
              {!isAuthenticated ? (
                <button
                  onClick={() => { setIsMenuOpen(false); login(); }}
                  className="flex items-center justify-center gap-2 py-3.5 rounded-xl border-2 border-primary/20 text-primary text-sm font-semibold"
                >
                  Login with Google
                </button>
              ) : (
                <Link
                  to="/dashboard"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center justify-center gap-2 py-3.5 rounded-xl border-2 border-primary/20 text-primary text-sm font-semibold"
                >
                  Dashboard
                </Link>
              )}
              
              <Link
                to="/tools"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center justify-center gap-2 py-3.5 rounded-xl bg-muted text-foreground text-sm font-semibold hover:bg-muted/80 transition-colors"
              >
                Explore All Free Tools
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
