import { useState } from "react";
import { categories, getToolsByCategory, tools } from "@/lib/toolsData";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import ToolCard from "@/components/ToolCard";
import { cn } from "@/lib/utils";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const categoryTabs = [
  { id: "all", name: "All Tools", emoji: "⚡" },
  { id: "pdf", name: "PDF", emoji: "📄" },
  { id: "image", name: "Image", emoji: "🖼️" },
  { id: "converter", name: "Converter", emoji: "🔄" },
  { id: "text", name: "Text", emoji: "✏️" },
  { id: "calculator", name: "Calculator", emoji: "🧮" },
  { id: "misc", name: "Other", emoji: "🎯" },
];

const CategorySection = () => {
  const [activeTab, setActiveTab] = useState("all");
  useScrollReveal();

  const visibleTools = activeTab === "all"
    ? tools
    : getToolsByCategory(activeTab);

  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">

        {/* Section Header */}
        <div className="text-center mb-10 reveal">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            34+ Free Tools
          </div>
          <h2 className="font-display font-bold text-section text-foreground mb-3">
            Browse by Category
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-base">
            Professional-grade tools that run entirely in your browser. No uploads, no waiting, no sign-up.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-8 scrollbar-hide reveal">
          <div className="flex gap-2 mx-auto flex-nowrap min-w-max">
            {categoryTabs.map((tab) => {
              const count = tab.id === "all" ? tools.length : getToolsByCategory(tab.id).length;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all duration-200 border",
                    activeTab === tab.id
                      ? "gradient-bg text-white border-transparent shadow-brand"
                      : "bg-card text-muted-foreground border-border hover:border-primary/40 hover:text-foreground"
                  )}
                >
                  <span>{tab.emoji}</span>
                  <span>{tab.name}</span>
                  <span className={cn(
                    "text-xs px-1.5 py-0.5 rounded-full font-semibold",
                    activeTab === tab.id
                      ? "bg-white/20 text-white"
                      : "bg-muted text-muted-foreground"
                  )}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-10">
          {visibleTools.map((tool, i) => (
            <ToolCard
              key={tool.id}
              tool={tool}
              variant="featured"
              showBadges={true}
              index={i}
            />
          ))}
        </div>

        {/* CTA */}
        <div className="text-center reveal">
          <Link
            to="/tools"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl gradient-bg text-white font-semibold text-sm shadow-brand hover:shadow-brand-lg btn-glow transition-all duration-200"
          >
            <Sparkles className="w-4 h-4" />
            Browse All {tools.length} Tools
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
