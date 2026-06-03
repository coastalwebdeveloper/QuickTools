import { ReactNode, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  ArrowLeft, Info, Shield, Zap,
  ChevronRight, Keyboard, ExternalLink
} from "lucide-react";
import { LucideIcon } from "lucide-react";
import { useAnalytics } from "@/hooks/useAnalytics";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ToolCard from "@/components/ToolCard";
import SEOHead from "@/components/SEOHead";
import { tools, categories } from "@/lib/toolsData";
import { toolSEOData } from "@/lib/toolSEOData";
import {
  buildSoftwareApplicationSchema,
  buildFAQSchema,
  buildHowToSchema,
  buildBreadcrumbSchema,
} from "@/lib/seoSchemas";
import { cn } from "@/lib/utils";

interface ToolLayoutProps {
  title: string;
  description: string;
  icon: LucideIcon;
  iconColor: string;
  children: ReactNode;
  tips?: string[];
  toolId: string;
  shortcuts?: { key: string; action: string }[];
  // SEO content passthrough for schema generation
  toolFAQ?: { question: string; answer: string }[];
  toolHowTo?: string[];
}


const categoryGradients: Record<string, string> = {
  pdf:        "from-red-500 to-orange-500",
  image:      "from-emerald-500 to-teal-500",
  converter:  "from-blue-500 to-cyan-500",
  text:       "from-violet-500 to-purple-500",
  calculator: "from-amber-500 to-yellow-500",
  misc:       "from-indigo-500 to-blue-500",
};

const ToolLayout = ({
  title,
  description,
  icon: Icon,
  iconColor,
  children,
  tips,
  toolId,
  shortcuts,
  toolFAQ,
  toolHowTo,
}: ToolLayoutProps) => {
  const { trackToolUsage } = useAnalytics();
  const location = useLocation();

  const currentTool = tools.find((t) => t.id === toolId);
  const currentCategory = currentTool ? categories.find((c) => c.id === currentTool.category) : null;
  const gradient = currentTool ? categoryGradients[currentTool.category] ?? "from-primary to-purple-500" : "from-primary to-purple-500";

  // SEO metadata for this tool
  const seoMeta = toolSEOData[toolId];
  const BASE_URL = "https://www.quicktools.website";
  const toolUrl = `${BASE_URL}${currentTool?.path ?? "/tools"}`;

  // Build JSON-LD schemas
  const toolSchemas = seoMeta ? [
    buildSoftwareApplicationSchema({
      name: seoMeta.schemaName,
      description: description,
      url: toolUrl,
      category: currentCategory?.name ?? "Utility",
      keywords: seoMeta.keywords,
    }),
    ...(toolFAQ && toolFAQ.length > 0 ? [buildFAQSchema(toolFAQ)] : []),
    ...(toolHowTo && toolHowTo.length > 0 ? [buildHowToSchema({
      name: `How to use ${title}`,
      description: description,
      steps: toolHowTo,
      url: toolUrl,
    })] : []),
    buildBreadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "All Tools", url: "/tools" },
      ...(currentCategory ? [{ name: currentCategory.name, url: `/tools/${currentTool?.category}` }] : []),
      { name: title, url: currentTool?.path ?? "/tools" },
    ]),
  ] : [];

  // Related tools: same category, excluding this tool
  const relatedTools = currentTool
    ? tools.filter((t) => t.category === currentTool.category && t.id !== toolId).slice(0, 4)
    : [];


  useEffect(() => {
    trackToolUsage(toolId);
  }, [toolId, trackToolUsage]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Per-tool SEO head injection */}
      {seoMeta && (
        <SEOHead
          title={seoMeta.pageTitle}
          description={seoMeta.metaDescription}
          canonical={toolUrl}
          keywords={seoMeta.keywords}
          schemas={toolSchemas}
        />
      )}
      <Navbar />


      {/* Tool Hero Header */}
      <div className="relative overflow-hidden border-b border-border bg-gradient-to-br from-muted/40 to-background">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className={cn("absolute -right-32 -top-32 w-96 h-96 rounded-full opacity-10 bg-gradient-to-br blur-3xl", gradient)} />
        </div>
        <div className="relative container mx-auto px-4 py-6 md:py-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-xs text-muted-foreground mb-5" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            {currentCategory && (
              <>
                <Link to="/tools" className="hover:text-foreground transition-colors">{currentCategory.name}</Link>
                <ChevronRight className="w-3 h-3" />
              </>
            )}
            <span className="text-foreground font-medium truncate max-w-[200px]">{title}</span>
          </nav>

          <div className="flex items-start gap-4 md:gap-6">
            {/* Icon */}
            <div className={cn(
              "flex-shrink-0 w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br flex items-center justify-center shadow-brand",
              gradient
            )}>
              <Icon className="w-7 h-7 md:w-8 md:h-8 text-white" />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 flex-wrap mb-1">
                <h1 className="font-display font-bold text-xl md:text-2xl text-foreground">
                  {title}
                </h1>
                {/* Badges */}
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                    <Shield className="w-3 h-3" /> Browser-Safe
                  </span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-800">
                    <Zap className="w-3 h-3" /> Free
                  </span>
                </div>
              </div>
              <p className="text-sm md:text-base text-muted-foreground">{description}</p>
            </div>

            <Link
              to="/"
              className="hidden md:flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors shrink-0 px-3 py-2 rounded-xl hover:bg-muted/60"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              All Tools
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 container mx-auto px-4 py-6 md:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">

          {/* Tool Workspace */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-card border border-border rounded-2xl p-5 md:p-7 shadow-card">
              {children}
            </div>

            {/* Privacy Guarantee */}
            <div className="flex items-center gap-3 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/50">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center shrink-0">
                <Shield className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              </div>
              <p className="text-xs text-emerald-700 dark:text-emerald-400 leading-relaxed">
                <strong>100% Private.</strong> All processing happens locally in your browser. Your files are never uploaded to any server.
              </p>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-5">

            {/* Tips */}
            {tips && tips.length > 0 && (
              <div className="bg-card border border-border rounded-2xl p-5 shadow-card">
                <div className="flex items-center gap-2 mb-4">
                  <Info className="w-4 h-4 text-primary" />
                  <h3 className="font-semibold text-sm">Tips & Info</h3>
                </div>
                <ul className="space-y-2.5">
                  {tips.map((tip, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                      <span className="w-5 h-5 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Keyboard Shortcuts */}
            {shortcuts && shortcuts.length > 0 && (
              <div className="bg-card border border-border rounded-2xl p-5 shadow-card">
                <div className="flex items-center gap-2 mb-4">
                  <Keyboard className="w-4 h-4 text-primary" />
                  <h3 className="font-semibold text-sm">Keyboard Shortcuts</h3>
                </div>
                <div className="space-y-2">
                  {shortcuts.map(({ key, action }) => (
                    <div key={key} className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">{action}</span>
                      <kbd className="px-2 py-1 text-xs rounded-md bg-muted border border-border font-mono">{key}</kbd>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Related Tools */}
            {relatedTools.length > 0 && (
              <div className="bg-card border border-border rounded-2xl p-5 shadow-card">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-sm">Related Tools</h3>
                  <Link to="/tools" className="text-xs text-primary hover:underline flex items-center gap-1">
                    All <ExternalLink className="w-3 h-3" />
                  </Link>
                </div>
                <div className="space-y-2">
                  {relatedTools.map((tool) => (
                    <ToolCard key={tool.id} tool={tool} variant="compact" showBadges={false} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ToolLayout;
