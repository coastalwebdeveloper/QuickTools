import { Search, Zap, Shield, ArrowRight, Lock, Globe, Sparkles, TrendingUp, ChevronRight } from "lucide-react";
import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import { searchTools, tools } from "@/lib/toolsData";
import { cn } from "@/lib/utils";

const popularToolIds = [
  "youtube-thumbnail-downloader",
  "image-background-remover",
  "pdf-merge",
  "qr-generator",
  "image-compressor",
  "pdf-to-word",
];

const categoryPills = [
  { label: "PDF Tools", cat: "pdf", emoji: "📄", path: "/tools/pdf" },
  { label: "Image Tools", cat: "image", emoji: "🖼️", path: "/tools/image" },
  { label: "Converters", cat: "converter", emoji: "🔄", path: "/tools/converter" },
  { label: "Text Tools", cat: "text", emoji: "✏️", path: "/tools/text" },
  { label: "Calculators", cat: "calculator", emoji: "🧮", path: "/tools/calculator" },
  { label: "Utilities", cat: "misc", emoji: "⚡", path: "/tools/other" },
];

const statsData = [
  { end: 50, suffix: "K+", label: "Happy Users" },
  { end: 34, suffix: "+", label: "Free Tools" },
  { end: 100, suffix: "%", label: "Browser-Based" },
  { end: 0, suffix: "", label: "Uploads Needed" },
];

const categoryGradients: Record<string, string> = {
  pdf:        "from-red-500 to-orange-500",
  image:      "from-emerald-500 to-teal-500",
  converter:  "from-blue-500 to-cyan-500",
  text:       "from-violet-500 to-purple-500",
  calculator: "from-amber-500 to-yellow-500",
  misc:       "from-indigo-500 to-blue-500",
};

const categoryHoverGlows: Record<string, string> = {
  pdf:        "hover:shadow-pdf",
  image:      "hover:shadow-image",
  converter:  "hover:shadow-converter",
  text:       "hover:shadow-text",
  calculator: "hover:shadow-calculator",
  misc:       "hover:shadow-misc",
};

function useCountUp(target: number, duration = 1400, active = false) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active || target === 0) { setValue(target); return; }
    const start = performance.now();
    const raf = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
  }, [active, target, duration]);
  return value;
}

function StatCounter({ end, suffix, label, delay, active }: { end: number; suffix: string; label: string; delay: string; active: boolean }) {
  const val = useCountUp(end, 1200, active);
  return (
    <div className={cn("text-center animate-fade-in-up", delay)}>
      <p className="font-display font-bold text-2xl md:text-3xl gradient-text stat-counter-value">
        {val}{suffix}
      </p>
      <p className="text-xs text-muted-foreground mt-1 font-medium">{label}</p>
    </div>
  );
}

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<ReturnType<typeof searchTools>>([]);
  const [showResults, setShowResults] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isVisible, setIsVisible] = useState(false);
  const [statsActive, setStatsActive] = useState(false);
  const navigate = useNavigate();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const popularTools = popularToolIds.map((id) => tools.find((t) => t.id === id)).filter(Boolean);

  useEffect(() => {
    const t = setTimeout(() => setIsVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  // Trigger stat counters when they scroll into view
  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setStatsActive(true); obs.disconnect(); }
    }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Global ⌘K shortcut
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setSelectedIndex(-1);
    if (query.trim()) {
      setSearchResults(searchTools(query).slice(0, 7));
      setShowResults(true);
    } else {
      setSearchResults([]);
      setShowResults(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showResults || searchResults.length === 0) return;
    const max = searchResults.length - 1;
    if (e.key === "ArrowDown") { e.preventDefault(); setSelectedIndex((p) => (p < max ? p + 1 : p)); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setSelectedIndex((p) => (p > 0 ? p - 1 : -1)); }
    else if (e.key === "Enter") {
      e.preventDefault();
      if (selectedIndex >= 0) handleSelectTool(searchResults[selectedIndex].path);
    }
    else if (e.key === "Escape") { setShowResults(false); searchInputRef.current?.blur(); }
  };

  const highlightMatch = (text: string, query: string) => {
    if (!query.trim()) return text;
    const parts = text.split(new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi"));
    return parts.map((part, i) =>
      part.toLowerCase() === query.toLowerCase()
        ? <mark key={i} className="bg-primary/20 text-primary rounded px-0.5 not-italic">{part}</mark>
        : part
    );
  };

  const handleSelectTool = (path: string) => {
    navigate(path);
    setShowResults(false);
    setSearchQuery("");
  };

  return (
    <section className="relative overflow-hidden hero-bg">
      {/* ── Layered Background ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
        {/* Animated orbs */}
        <div
          className="absolute -top-48 -left-48 w-[700px] h-[700px] rounded-full opacity-25 animate-blob"
          style={{ background: "radial-gradient(circle, rgba(91,92,240,0.45) 0%, transparent 65%)", animationDuration: "14s" }}
        />
        <div
          className="absolute -bottom-32 -right-32 w-[600px] h-[600px] rounded-full opacity-20 animate-blob"
          style={{ background: "radial-gradient(circle, rgba(139,92,246,0.5) 0%, transparent 65%)", animationDuration: "18s", animationDelay: "4s" }}
        />
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full opacity-10 animate-blob"
          style={{ background: "radial-gradient(ellipse, rgba(6,182,212,0.35) 0%, transparent 60%)", animationDuration: "22s", animationDelay: "8s" }}
        />

        {/* Grid texture */}
        <div
          className="absolute inset-0 opacity-[0.035] dark:opacity-[0.055]"
          style={{
            backgroundImage: "linear-gradient(rgba(91,92,240,1) 1px, transparent 1px), linear-gradient(90deg, rgba(91,92,240,1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Light streaks */}
        <div
          className="light-streak top-1/4 opacity-60 animate-streak"
          style={{ animationDuration: "5s", animationDelay: "1s" }}
        />
        <div
          className="light-streak top-3/4 opacity-40 animate-streak"
          style={{ animationDuration: "7s", animationDelay: "3.5s" }}
        />
      </div>

      <div className="relative container mx-auto px-4 py-16 md:py-24 lg:py-28">
        <div className="max-w-4xl mx-auto text-center">

          {/* Trending badge */}
          <div className={cn(
            "inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-8 transition-all duration-700",
            "bg-gradient-to-r from-primary/10 to-purple-500/10 border border-primary/20 text-primary",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}>
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            Fast · Secure · Browser-Based · Always Free
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          </div>

          {/* Hero Headline */}
          <h1 className={cn(
            "font-display font-bold tracking-tight text-foreground mb-5 transition-all duration-700 delay-100",
            "text-5xl sm:text-6xl md:text-7xl lg:text-7xl",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}>
            Everything you need.{" "}
            <span className="gradient-text-animated block sm:inline">
              Right in your browser.
            </span>
          </h1>

          {/* Subtitle */}
          <p className={cn(
            "text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed transition-all duration-700 delay-200",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          )}>
            34+ free professional tools for PDFs, images, text, and more.
            <br className="hidden sm:block" />
            <span className="font-semibold text-foreground/80">No uploads. No sign-up. No limits.</span>
          </p>

          {/* ── Search Bar ── */}
          <div className={cn(
            "relative max-w-2xl mx-auto mb-8 transition-all duration-700 delay-300",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          )}>
            <div className={cn(
              "relative flex items-center rounded-2xl transition-all duration-300",
              "bg-card/90 backdrop-blur-xl",
              showResults
                ? "border-2 border-primary shadow-brand-lg ring-4 ring-primary/10"
                : "border-2 border-border/60 hover:border-primary/40 shadow-xl hover:shadow-brand"
            )}>
              <Search className="absolute left-5 w-5 h-5 text-muted-foreground/70 shrink-0 transition-colors" style={{ color: showResults ? "hsl(var(--primary))" : undefined }} />
              <input
                ref={searchInputRef}
                type="text"
                placeholder='Try "PDF merge", "Image compress", "QR code"...'
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                onKeyDown={handleKeyDown}
                onFocus={() => searchQuery && setShowResults(true)}
                onBlur={() => setTimeout(() => setShowResults(false), 200)}
                className="w-full pl-14 pr-5 py-4 md:py-5 text-sm md:text-base bg-transparent outline-none text-foreground placeholder:text-muted-foreground/50 rounded-2xl"
                aria-label="Search tools"
                aria-autocomplete="list"
                aria-expanded={showResults}
              />
              <div className="hidden sm:flex items-center gap-2 pr-4 shrink-0">
                <kbd className="kbd-premium">⌘K</kbd>
              </div>
            </div>

            {/* Search Results Dropdown */}
            {showResults && searchResults.length > 0 && (
              <div
                role="listbox"
                className="absolute top-full left-0 right-0 mt-2 bg-card/95 backdrop-blur-xl border border-border rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.15)] overflow-hidden z-50 animate-slide-down"
              >
                {searchResults.map((tool, idx) => {
                  const Icon = tool.icon;
                  const isSelected = idx === selectedIndex;
                  const grad = categoryGradients[tool.category] ?? "from-primary to-purple-500";
                  return (
                    <button
                      key={tool.id}
                      role="option"
                      aria-selected={isSelected}
                      onClick={() => handleSelectTool(tool.path)}
                      className={cn(
                        "w-full flex items-center gap-4 px-5 py-3.5 transition-colors text-left border-b border-border/40 last:border-0",
                        isSelected ? "bg-primary/8" : "hover:bg-muted/50"
                      )}
                    >
                      <div className={cn("p-2.5 rounded-xl shrink-0 text-white shadow-sm", `bg-gradient-to-br ${grad}`)}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm text-foreground">{highlightMatch(tool.name, searchQuery)}</p>
                        <p className="text-xs text-muted-foreground truncate">{highlightMatch(tool.description, searchQuery)}</p>
                      </div>
                      <ArrowRight className={cn("w-4 h-4 shrink-0 transition-all", isSelected ? "text-primary translate-x-0.5" : "text-muted-foreground/40")} />
                    </button>
                  );
                })}
                <div className="px-5 py-3 bg-muted/30 border-t border-border/40 flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">{searchResults.length} result{searchResults.length !== 1 ? "s" : ""}</span>
                  <Link to="/tools" className="text-xs text-primary font-semibold flex items-center gap-1 hover:underline">
                    Browse all <ChevronRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Category Quick Pills */}
          <div className={cn(
            "flex flex-wrap items-center justify-center gap-2 mb-12 transition-all duration-700 delay-400",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}>
            {categoryPills.map((pill, i) => (
              <Link
                key={pill.cat}
                to={pill.path}
                className={cn(
                  "flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-200 shadow-xs",
                  "bg-card/80 backdrop-blur-sm border border-border/60",
                  "hover:border-primary/40 hover:bg-primary/5 hover:text-primary hover:-translate-y-0.5 hover:shadow-brand",
                  "text-muted-foreground"
                )}
                style={{ animationDelay: `${400 + i * 60}ms` }}
              >
                <span className="text-base">{pill.emoji}</span>
                {pill.label}
              </Link>
            ))}
          </div>

          {/* ── Popular Tools ── */}
          <div className={cn(
            "mb-14 transition-all duration-700 delay-500",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}>
            <div className="flex items-center justify-center gap-3 mb-5">
              <div className="h-px flex-1 max-w-16 bg-gradient-to-r from-transparent to-border/60" />
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                <TrendingUp className="w-3 h-3 text-primary" />
                Popular Right Now
              </p>
              <div className="h-px flex-1 max-w-16 bg-gradient-to-l from-transparent to-border/60" />
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
              {popularTools.map((tool, idx) => {
                if (!tool) return null;
                const Icon = tool.icon;
                const gradient = categoryGradients[tool.category] ?? "from-primary to-purple-500";
                const hoverGlow = categoryHoverGlows[tool.category] ?? "hover:shadow-brand";
                return (
                  <button
                    key={tool.id}
                    onClick={() => navigate(tool.path)}
                    className={cn(
                      "group flex flex-col items-center gap-2.5 p-4 rounded-2xl text-left transition-all duration-300",
                      "bg-card/80 backdrop-blur-sm border border-border/60",
                      "hover:border-primary/30 tool-card",
                      hoverGlow
                    )}
                    style={{ animationDelay: `${idx * 80}ms` }}
                  >
                    <div className={cn(
                      "w-11 h-11 rounded-xl bg-gradient-to-br flex items-center justify-center transition-all duration-300",
                      "group-hover:scale-110 group-hover:shadow-brand",
                      gradient
                    )}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-xs font-semibold text-muted-foreground group-hover:text-foreground transition-colors text-center leading-snug">
                      {tool.name.replace(" Converter", "").replace(" Generator", "").replace("YouTube ", "YT ")}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ── Stats Strip ── */}
          <div
            ref={statsRef}
            className={cn(
              "grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto mb-12 transition-all duration-700 delay-600",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}
          >
            {statsData.map((stat, i) => (
              <StatCounter
                key={stat.label}
                end={stat.end}
                suffix={stat.suffix}
                label={stat.label}
                delay={`delay-${(i + 1) * 100}` as "delay-100" | "delay-200" | "delay-300" | "delay-400"}
                active={statsActive}
              />
            ))}
          </div>

          {/* Trust Badges */}
          <div className={cn(
            "flex flex-wrap items-center justify-center gap-2.5 transition-all duration-700 delay-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}>
            {[
              { icon: Lock, label: "No Uploads", desc: "Files stay on-device", cls: "trust-badge-green" },
              { icon: Zap, label: "Instant Results", desc: "Zero wait time", cls: "trust-badge-purple" },
              { icon: Shield, label: "100% Private", desc: "Browser-only", cls: "trust-badge-green" },
              { icon: Globe, label: "Always Free", desc: "No hidden fees", cls: "trust-badge-blue" },
            ].map(({ icon: TIcon, label, desc, cls }) => (
              <div key={label} className={cn("trust-badge", cls)}>
                <div className="relative">
                  <TIcon className="w-3 h-3" />
                </div>
                <div className="flex items-baseline gap-1.5">
                  <span className="font-bold">{label}</span>
                  <span className="opacity-60 text-[10px]">· {desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background/60 to-transparent pointer-events-none" />
    </section>
  );
};

export default HeroSection;
