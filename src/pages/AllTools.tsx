import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Search, LayoutGrid, List, SlidersHorizontal, X, Sparkles, ArrowUpDown } from "lucide-react";
import { categories, tools, searchTools } from "@/lib/toolsData";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ToolCard from "@/components/ToolCard";
import { cn } from "@/lib/utils";
import { useScrollReveal } from "@/hooks/useScrollReveal";

type SortOption = "popular" | "az" | "category";
type ViewMode = "grid" | "list";

const categoryTabs = [
  { id: "all", label: "All Tools", emoji: "⚡" },
  { id: "pdf", label: "PDF", emoji: "📄" },
  { id: "image", label: "Image", emoji: "🖼️" },
  { id: "converter", label: "Converter", emoji: "🔄" },
  { id: "text", label: "Text", emoji: "✏️" },
  { id: "calculator", label: "Calculator", emoji: "🧮" },
  { id: "misc", label: "Other", emoji: "🎯" },
];

const sortOptions: { value: SortOption; label: string }[] = [
  { value: "popular", label: "Most Popular" },
  { value: "az", label: "A → Z" },
  { value: "category", label: "By Category" },
];

const AllTools = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [sortBy, setSortBy] = useState<SortOption>("popular");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [showFilters, setShowFilters] = useState(false);
  const navigate = useNavigate();
  useScrollReveal();

  const filteredTools = useMemo(() => {
    let result = searchQuery
      ? searchTools(searchQuery)
      : activeCategory === "all"
      ? [...tools]
      : tools.filter((t) => t.category === activeCategory);

    if (sortBy === "az") result = [...result].sort((a, b) => a.name.localeCompare(b.name));
    else if (sortBy === "category") result = [...result].sort((a, b) => a.category.localeCompare(b.category));
    // "popular" keeps original order (order in toolsData is curated)

    return result;
  }, [searchQuery, activeCategory, sortBy]);

  const selectedCategoryLabel = categoryTabs.find((c) => c.id === activeCategory)?.label ?? "All";

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      {/* Page Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-muted/40 via-background to-background border-b border-border">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full opacity-10"
            style={{ background: "radial-gradient(ellipse, rgba(91,92,240,1) 0%, transparent 70%)" }} />
        </div>
        <div className="relative container mx-auto px-4 py-10 md:py-14 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-4 reveal">
            <Sparkles className="w-3.5 h-3.5" />
            All {tools.length} Tools, Free Forever
          </div>
          <h1 className="font-display font-bold text-3xl md:text-5xl text-foreground mb-3 reveal">
            Browse All Tools
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto text-sm md:text-base mb-8 reveal">
            Professional browser-based tools for PDFs, images, text, conversions, and more. No sign-up required.
          </p>

          {/* Search */}
          <div className="relative max-w-xl mx-auto reveal">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-muted-foreground" />
            <input
              type="text"
              placeholder={`Search ${tools.length} tools...`}
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setActiveCategory("all"); }}
              className="w-full pl-11 pr-10 py-3.5 text-sm rounded-2xl bg-card border border-border focus:border-primary/50 focus:ring-4 focus:ring-primary/10 shadow-card transition-all outline-none"
              aria-label="Search all tools"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 rounded-lg hover:bg-muted/60 transition-colors"
              >
                <X className="w-3.5 h-3.5 text-muted-foreground" />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="flex-1 container mx-auto px-4 py-6 md:py-8">

        {/* Filter Bar */}
        <div className="flex items-center gap-3 mb-6 flex-wrap">
          {/* Category Tabs (desktop) */}
          <div className="hidden md:flex items-center gap-2 flex-1 overflow-x-auto">
            {categoryTabs.map((tab) => {
              const count = tab.id === "all" ? tools.length : tools.filter((t) => t.category === tab.id).length;
              return (
                <button
                  key={tab.id}
                  onClick={() => { setActiveCategory(tab.id); setSearchQuery(""); }}
                  className={cn(
                    "flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border shrink-0",
                    activeCategory === tab.id
                      ? "gradient-bg text-white border-transparent shadow-brand"
                      : "bg-card text-muted-foreground border-border hover:border-primary/40 hover:text-foreground"
                  )}
                >
                  <span>{tab.emoji}</span>
                  {tab.label}
                  <span className={cn(
                    "px-1.5 py-0.5 rounded-full text-[10px] font-bold",
                    activeCategory === tab.id ? "bg-white/20" : "bg-muted"
                  )}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Mobile: Category select + Filter toggle */}
          <div className="flex md:hidden items-center gap-2 flex-1">
            <select
              value={activeCategory}
              onChange={(e) => setActiveCategory(e.target.value)}
              className="flex-1 px-3 py-2.5 text-sm rounded-xl bg-card border border-border outline-none"
            >
              {categoryTabs.map((tab) => (
                <option key={tab.id} value={tab.id}>{tab.emoji} {tab.label}</option>
              ))}
            </select>
          </div>

          {/* Sort + View controls */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Sort */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="appearance-none pl-8 pr-3 py-2 text-xs rounded-xl bg-card border border-border outline-none hover:border-primary/40 cursor-pointer font-medium text-muted-foreground"
              >
                {sortOptions.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
              <ArrowUpDown className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-muted-foreground pointer-events-none" />
            </div>

            {/* View Toggle */}
            <div className="flex items-center bg-card border border-border rounded-xl overflow-hidden">
              <button
                onClick={() => setViewMode("grid")}
                className={cn(
                  "p-2 transition-colors",
                  viewMode === "grid" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                )}
                aria-label="Grid view"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={cn(
                  "p-2 transition-colors",
                  viewMode === "list" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                )}
                aria-label="List view"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Results info */}
        <div className="flex items-center justify-between mb-5">
          <p className="text-sm text-muted-foreground">
            Showing <span className="font-semibold text-foreground">{filteredTools.length}</span> tool{filteredTools.length !== 1 ? "s" : ""}
            {searchQuery && <> for "<span className="text-primary">{searchQuery}</span>"</>}
            {!searchQuery && activeCategory !== "all" && <> in <span className="text-primary">{selectedCategoryLabel}</span></>}
          </p>
          {(searchQuery || activeCategory !== "all") && (
            <button
              onClick={() => { setSearchQuery(""); setActiveCategory("all"); }}
              className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-3.5 h-3.5" /> Clear filters
            </button>
          )}
        </div>

        {/* Tools Grid */}
        {filteredTools.length > 0 ? (
          <div className={cn(
            viewMode === "grid"
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
              : "flex flex-col gap-3"
          )}>
            {filteredTools.map((tool, i) => (
              <ToolCard
                key={tool.id}
                tool={tool}
                variant={viewMode === "list" ? "compact" : "featured"}
                showBadges={viewMode === "grid"}
                index={i}
              />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-20">
            <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-muted-foreground/50" />
            </div>
            <h3 className="font-display font-semibold text-lg text-foreground mb-2">
              No tools found
            </h3>
            <p className="text-muted-foreground text-sm mb-6">
              Try different keywords or browse by category.
            </p>
            <button
              onClick={() => { setSearchQuery(""); setActiveCategory("all"); }}
              className="px-5 py-2.5 rounded-xl gradient-bg text-white text-sm font-medium shadow-brand"
            >
              Browse All Tools
            </button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default AllTools;