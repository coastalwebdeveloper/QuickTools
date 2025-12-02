import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Tool } from "@/lib/toolsData";

interface ToolCardProps {
  tool: Tool;
  index?: number;
}

const ToolCard = ({ tool, index = 0 }: ToolCardProps) => {
  const Icon = tool.icon;

  return (
    <Link
      to={tool.path}
      className="tool-card group opacity-0 animate-fade-in"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="flex items-start gap-4">
        <div className={`p-3 rounded-xl ${tool.color} transition-transform group-hover:scale-110`}>
          <Icon className="w-6 h-6" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
            {tool.name}
          </h3>
          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
            {tool.description}
          </p>
        </div>
        <ArrowRight className="w-5 h-5 text-muted-foreground opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
      </div>
    </Link>
  );
};

export default ToolCard;
