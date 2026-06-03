import { useNavigate } from "react-router-dom";
import { ArrowRight, Shield } from "lucide-react";
import { Tool, categories } from "@/lib/toolsData";
import { cn } from "@/lib/utils";
import { useRef, useState } from "react";

interface ToolCardProps {
  tool: Tool;
  variant?: "default" | "compact" | "featured";
  showBadges?: boolean;
  className?: string;
  index?: number;
}

const categoryGradients: Record<string, string> = {
  pdf:        "from-red-500 to-orange-500",
  image:      "from-emerald-500 to-teal-500",
  converter:  "from-blue-500 to-cyan-500",
  text:       "from-violet-500 to-purple-500",
  calculator: "from-amber-500 to-yellow-500",
  misc:       "from-indigo-500 to-blue-500",
};

const categoryGlowShadows: Record<string, string> = {
  pdf:        "hover:shadow-pdf",
  image:      "hover:shadow-image",
  converter:  "hover:shadow-converter",
  text:       "hover:shadow-text",
  calculator: "hover:shadow-calculator",
  misc:       "hover:shadow-misc",
};

const categoryAccentBars: Record<string, string> = {
  pdf:        "from-red-500 to-orange-400",
  image:      "from-emerald-500 to-teal-400",
  converter:  "from-blue-500 to-cyan-400",
  text:       "from-violet-500 to-purple-400",
  calculator: "from-amber-500 to-yellow-400",
  misc:       "from-indigo-500 to-blue-400",
};

const categoryHoverText: Record<string, string> = {
  pdf:        "group-hover:text-red-500 dark:group-hover:text-red-400",
  image:      "group-hover:text-emerald-600 dark:group-hover:text-emerald-400",
  converter:  "group-hover:text-blue-600 dark:group-hover:text-blue-400",
  text:       "group-hover:text-violet-600 dark:group-hover:text-violet-400",
  calculator: "group-hover:text-amber-600 dark:group-hover:text-amber-400",
  misc:       "group-hover:text-indigo-600 dark:group-hover:text-indigo-400",
};

const ToolCard = ({ tool, variant = "default", showBadges = true, className, index = 0 }: ToolCardProps) => {
  const navigate = useNavigate();
  const Icon = tool.icon;
  const category = categories.find((c) => c.id === tool.category);
  const gradient = categoryGradients[tool.category] ?? "from-primary to-purple-500";
  const glowShadow = categoryGlowShadows[tool.category] ?? "hover:shadow-brand";
  const accentBar = categoryAccentBars[tool.category] ?? "from-primary to-purple-400";
  const hoverText = categoryHoverText[tool.category] ?? "group-hover:text-primary";
  const delay = Math.min(index * 45, 500);

  // Parallax tilt state for featured variant
  const cardRef = useRef<HTMLButtonElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (variant !== "featured") return;
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 10;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -10;
    setTilt({ x, y });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  };

  if (variant === "compact") {
    return (
      <button
        onClick={() => navigate(tool.path)}
        className={cn(
          "group w-full flex items-center gap-3 p-3 rounded-xl text-left overflow-hidden",
          "bg-card border border-border hover:border-primary/30",
          "shadow-card tool-card",
          glowShadow,
          className
        )}
        style={{ animationDelay: `${delay}ms` }}
      >
        {/* Left accent line */}
        <div className={cn(
          "absolute left-0 top-3 bottom-3 w-0.5 rounded-r-full bg-gradient-to-b opacity-0 group-hover:opacity-100 transition-opacity duration-300",
          accentBar
        )} style={{ position: "absolute" }} />

        <div className={cn("p-2.5 rounded-lg bg-gradient-to-br shrink-0 transition-all duration-300 group-hover:scale-110 group-hover:shadow-brand", gradient)}>
          <Icon className="w-4 h-4 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <p className={cn("text-sm font-semibold text-foreground transition-colors truncate", hoverText)}>
            {tool.name}
          </p>
          <p className="text-xs text-muted-foreground truncate">{tool.description.slice(0, 45)}…</p>
        </div>
        <ArrowRight className="w-4 h-4 text-muted-foreground/30 group-hover:text-primary group-hover:translate-x-1 transition-all duration-200 shrink-0" />
      </button>
    );
  }

  if (variant === "featured") {
    return (
      <button
        ref={cardRef}
        onClick={() => navigate(tool.path)}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        className={cn(
          "group relative w-full p-6 rounded-2xl text-left overflow-hidden",
          "bg-card border border-border",
          "shadow-card tool-card reveal",
          glowShadow,
          className
        )}
        style={{
          animationDelay: `${delay}ms`,
          transform: isHovered
            ? `perspective(1000px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg) translateY(-6px)`
            : "perspective(1000px) rotateX(0) rotateY(0) translateY(0)",
          transition: isHovered
            ? "transform 0.1s ease, box-shadow 0.3s ease, border-color 0.25s ease"
            : "transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.3s ease, border-color 0.25s ease",
        }}
      >
        {/* Category accent bar at top */}
        <div className={cn(
          "absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300",
          accentBar
        )} />

        {/* Hover glow overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-purple-500/0 group-hover:from-primary/5 group-hover:to-purple-500/5 transition-all duration-500 rounded-2xl pointer-events-none" />

        <div className="relative">
          <div className={cn(
            "inline-flex p-3.5 rounded-xl bg-gradient-to-br mb-4 transition-all duration-300",
            "group-hover:scale-110 group-hover:shadow-brand-lg",
            gradient
          )}>
            <Icon className="w-6 h-6 text-white" />
          </div>
          <h3 className={cn(
            "font-display font-semibold text-base text-foreground transition-colors mb-1.5 leading-snug",
            hoverText
          )}>
            {tool.name}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
            {tool.description}
          </p>
          {showBadges && (
            <div className="flex items-center gap-2 mt-3">
              {category && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded-full bg-muted text-muted-foreground">
                  {category.name}
                </span>
              )}
              <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400">
                <Shield className="w-2.5 h-2.5" />
                Secure
              </span>
            </div>
          )}
        </div>

        {/* Arrow indicator */}
        <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-200 translate-x-2 group-hover:translate-x-0">
          <div className={cn("p-1.5 rounded-lg bg-gradient-to-br shadow-sm", gradient)}>
            <ArrowRight className="w-3.5 h-3.5 text-white" />
          </div>
        </div>
      </button>
    );
  }

  // ── Default variant ──
  return (
    <button
      onClick={() => navigate(tool.path)}
      className={cn(
        "group relative w-full p-5 rounded-2xl text-left overflow-hidden",
        "bg-card border border-border hover:border-primary/25",
        "shadow-card tool-card",
        glowShadow,
        className
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Hover background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/0 group-hover:from-primary/4 group-hover:to-purple-500/4 transition-all duration-500 rounded-2xl pointer-events-none" />

      <div className="relative flex items-start gap-4">
        <div className={cn(
          "p-3 rounded-xl bg-gradient-to-br shrink-0 transition-all duration-300",
          "group-hover:scale-110 group-hover:shadow-brand group-hover:rotate-1",
          gradient
        )}>
          <Icon className="w-5 h-5 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className={cn(
              "font-display font-semibold text-sm text-foreground transition-colors leading-snug",
              hoverText
            )}>
              {tool.name}
            </h3>
          </div>
          {showBadges && category && (
            <span className="inline-block px-2 py-0.5 text-xs font-medium rounded-full bg-muted text-muted-foreground mb-2">
              {category.name}
            </span>
          )}
          <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
            {tool.description}
          </p>
        </div>
      </div>

      {showBadges && (
        <div className="relative flex items-center gap-2 mt-3 pt-3 border-t border-border/50">
          <span className="inline-flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
            <Shield className="w-3 h-3" />
            Browser-safe
          </span>
          <span className={cn(
            "inline-flex items-center gap-1 text-xs font-semibold ml-auto opacity-0 group-hover:opacity-100 transition-all duration-200 translate-x-2 group-hover:translate-x-0",
            hoverText
          )}>
            Use tool <ArrowRight className="w-3 h-3" />
          </span>
        </div>
      )}
    </button>
  );
};

export default ToolCard;
