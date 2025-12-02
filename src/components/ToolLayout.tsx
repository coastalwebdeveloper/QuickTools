import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Info } from "lucide-react";
import { LucideIcon } from "lucide-react";

interface ToolLayoutProps {
  title: string;
  description: string;
  icon: LucideIcon;
  iconColor: string;
  children: ReactNode;
  tips?: string[];
}

const ToolLayout = ({
  title,
  description,
  icon: Icon,
  iconColor,
  children,
  tips,
}: ToolLayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Tools
        </Link>

        {/* Header */}
        <div className="flex items-start gap-4 mb-8">
          <div className={`p-4 rounded-2xl ${iconColor}`}>
            <Icon className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">{title}</h1>
            <p className="text-muted-foreground mt-1">{description}</p>
          </div>
        </div>

        {/* Tool Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-card border border-border rounded-2xl p-6 md:p-8">
              {children}
            </div>
          </div>

          {/* Tips Sidebar */}
          {tips && tips.length > 0 && (
            <div className="lg:col-span-1">
              <div className="bg-card border border-border rounded-2xl p-6 sticky top-24">
                <div className="flex items-center gap-2 mb-4">
                  <Info className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold">Tips & Info</h3>
                </div>
                <ul className="space-y-3">
                  {tips.map((tip, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-2 text-sm text-muted-foreground"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ToolLayout;
