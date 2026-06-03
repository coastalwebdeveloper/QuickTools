import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ChevronDown,
  CheckCircle,
  ArrowRight,
  Lightbulb,
  BookOpen,
  Users,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";
import ToolCard from "@/components/ToolCard";
import { tools } from "@/lib/toolsData";
import { internalLinksData } from "@/lib/internalLinks";

interface FAQItem {
  question: string;
  answer: string;
}

interface ToolContentProps {
  title: string;
  description: string;
  howToUse: string[];
  benefits: string[];
  useCases: string[];
  faq: FAQItem[];
  toolId?: string;
}

// Expandable FAQ accordion item (zero-JS-dependency via CSS, enhanced with React state)
function FAQItem({ question, answer, index }: FAQItem & { index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="border border-border rounded-xl overflow-hidden"
      itemScope
      itemProp="mainEntity"
      itemType="https://schema.org/Question"
    >
      <button
        onClick={() => setOpen(!open)}
        className={cn(
          "w-full flex items-center justify-between gap-4 px-5 py-4 text-left transition-colors",
          open ? "bg-primary/5" : "hover:bg-muted/50"
        )}
        aria-expanded={open}
        id={`faq-q-${index}`}
      >
        <h3
          className="font-semibold text-sm text-foreground leading-snug"
          itemProp="name"
        >
          {question}
        </h3>
        <ChevronDown
          className={cn(
            "w-4 h-4 text-muted-foreground shrink-0 transition-transform duration-200",
            open && "rotate-180"
          )}
        />
      </button>
      <div
        className={cn(
          "overflow-hidden transition-all duration-300",
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        )}
        itemScope
        itemProp="acceptedAnswer"
        itemType="https://schema.org/Answer"
        role="region"
        aria-labelledby={`faq-q-${index}`}
      >
        <p
          className="px-5 py-4 text-sm text-muted-foreground leading-relaxed border-t border-border"
          itemProp="text"
        >
          {answer}
        </p>
      </div>
    </div>
  );
}

const ToolContent = ({
  title,
  description,
  howToUse,
  benefits,
  useCases,
  faq,
  toolId,
}: ToolContentProps) => {
  const linkData = toolId ? internalLinksData[toolId] : null;

  // Resolve related tools from internal links data
  const relatedTools = linkData?.relatedTools
    .map((id) => tools.find((t) => t.id === id))
    .filter(Boolean) ?? [];

  const nextTools = linkData?.nextTools
    .map((id) => tools.find((t) => t.id === id))
    .filter(Boolean) ?? [];

  return (
    <article
      className="mt-10 space-y-12"
      itemScope
      itemType="https://schema.org/SoftwareApplication"
    >
      {/* ── Definition / What Is ───────────────────────────────────────── */}
      <section aria-labelledby="section-what-is">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-1 h-6 rounded-full gradient-bg" />
          <h2
            id="section-what-is"
            className="font-display font-bold text-xl text-foreground"
          >
            What is {title}?
          </h2>
        </div>

        {/* Definition box — AI snippet / featured snippet target */}
        <div className="p-5 rounded-2xl bg-primary/5 border border-primary/20 mb-4">
          <div className="flex items-start gap-3">
            <Lightbulb className="w-5 h-5 text-primary mt-0.5 shrink-0" />
            <p
              className="text-sm text-foreground leading-relaxed font-medium"
              itemProp="description"
            >
              {description}
            </p>
          </div>
        </div>
      </section>

      {/* ── How To Use ─────────────────────────────────────────────────── */}
      <section
        aria-labelledby="section-how-to"
        itemScope
        itemType="https://schema.org/HowTo"
      >
        <div className="flex items-center gap-2 mb-4">
          <div className="w-1 h-6 rounded-full gradient-bg" />
          <h2
            id="section-how-to"
            className="font-display font-bold text-xl text-foreground"
            itemProp="name"
          >
            How to Use {title}
          </h2>
        </div>
        <p className="text-sm text-muted-foreground mb-5" itemProp="description">
          Follow these simple steps to get started — no sign-up or download required.
        </p>
        <ol className="space-y-3" role="list">
          {howToUse.map((step, i) => (
            <li
              key={i}
              className="flex items-start gap-4 p-4 rounded-xl bg-card border border-border hover:border-primary/30 transition-colors"
              itemScope
              itemProp="step"
              itemType="https://schema.org/HowToStep"
            >
              <span
                className="flex-shrink-0 w-7 h-7 rounded-full gradient-bg text-white text-xs font-bold flex items-center justify-center"
                itemProp="position"
                aria-hidden="true"
              >
                {i + 1}
              </span>
              <span
                className="text-sm text-foreground leading-relaxed pt-0.5"
                itemProp="text"
              >
                {step}
              </span>
            </li>
          ))}
        </ol>
      </section>

      {/* ── Key Benefits ───────────────────────────────────────────────── */}
      <section aria-labelledby="section-benefits">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-1 h-6 rounded-full gradient-bg" />
          <h2
            id="section-benefits"
            className="font-display font-bold text-xl text-foreground"
          >
            Key Features &amp; Benefits
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 gap-3">
          {benefits.map((benefit, i) => (
            <div
              key={i}
              className="flex items-start gap-3 p-3.5 rounded-xl bg-card border border-border"
            >
              <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
              <p className="text-sm text-muted-foreground leading-relaxed">
                <strong className="text-foreground font-medium">
                  {benefit.split(" ").slice(0, 2).join(" ")}
                </strong>{" "}
                {benefit.split(" ").slice(2).join(" ")}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Use Cases ──────────────────────────────────────────────────── */}
      <section aria-labelledby="section-usecases">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-1 h-6 rounded-full gradient-bg" />
          <h2
            id="section-usecases"
            className="font-display font-bold text-xl text-foreground"
          >
            Who Uses This Tool?
          </h2>
        </div>
        <div className="flex items-start gap-3 mb-4">
          <Users className="w-5 h-5 text-primary mt-0.5 shrink-0" />
          <p className="text-sm text-muted-foreground">
            Trusted by students, professionals, developers, designers, and small
            businesses worldwide for fast, private, browser-based processing.
          </p>
        </div>
        <ul className="space-y-2.5" role="list">
          {useCases.map((useCase, i) => (
            <li key={i} className="flex items-center gap-3 text-sm text-muted-foreground">
              <ArrowRight className="w-3.5 h-3.5 text-primary shrink-0" />
              {useCase}
            </li>
          ))}
        </ul>
      </section>

      {/* ── FAQ ────────────────────────────────────────────────────────── */}
      <section
        aria-labelledby="section-faq"
        itemScope
        itemType="https://schema.org/FAQPage"
      >
        <div className="flex items-center gap-2 mb-4">
          <div className="w-1 h-6 rounded-full gradient-bg" />
          <h2
            id="section-faq"
            className="font-display font-bold text-xl text-foreground"
          >
            Frequently Asked Questions
          </h2>
        </div>
        <div className="space-y-2">
          {faq.map((item, i) => (
            <FAQItem
              key={i}
              question={item.question}
              answer={item.answer}
              index={i}
            />
          ))}
        </div>
      </section>

      {/* ── People Also Use ────────────────────────────────────────────── */}
      {relatedTools.length > 0 && (
        <section aria-labelledby="section-related">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1 h-6 rounded-full gradient-bg" />
            <h2
              id="section-related"
              className="font-display font-bold text-xl text-foreground"
            >
              People Also Use
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            {relatedTools.map((tool) =>
              tool ? (
                <ToolCard
                  key={tool.id}
                  tool={tool}
                  variant="compact"
                  showBadges={false}
                />
              ) : null
            )}
          </div>
        </section>
      )}

      {/* ── Recommended Next ───────────────────────────────────────────── */}
      {nextTools.length > 0 && (
        <section aria-labelledby="section-next">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1 h-6 rounded-full gradient-bg" />
            <h2
              id="section-next"
              className="font-display font-bold text-xl text-foreground"
            >
              Recommended Next
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            {nextTools.map((tool) =>
              tool ? (
                <ToolCard
                  key={tool.id}
                  tool={tool}
                  variant="default"
                  showBadges={false}
                />
              ) : null
            )}
          </div>
        </section>
      )}

      {/* ── Blog Links ─────────────────────────────────────────────────── */}
      {linkData?.blogLinks && linkData.blogLinks.length > 0 && (
        <section aria-labelledby="section-guides">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1 h-6 rounded-full gradient-bg" />
            <h2
              id="section-guides"
              className="font-display font-bold text-xl text-foreground"
            >
              Guides &amp; Tutorials
            </h2>
          </div>
          <div className="space-y-2">
            {linkData.blogLinks.map((blog) => (
              <Link
                key={blog.path}
                to={blog.path}
                className="flex items-center gap-3 p-4 rounded-xl bg-card border border-border hover:border-primary/40 hover:bg-primary/5 transition-all group"
              >
                <BookOpen className="w-4 h-4 text-primary shrink-0" />
                <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors flex-1">
                  {blog.title}
                </span>
                <ExternalLink className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* ── People Also Search For ─────────────────────────────────────── */}
      {linkData?.peopleAlsoSearch && linkData.peopleAlsoSearch.length > 0 && (
        <section aria-labelledby="section-also-search">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-1 h-5 rounded-full bg-muted-foreground/40" />
            <h2
              id="section-also-search"
              className="text-sm font-semibold text-muted-foreground"
            >
              People also search for
            </h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {linkData.peopleAlsoSearch.map((term) => (
              <Link
                key={term}
                to="/tools"
                className="px-3 py-1.5 rounded-xl bg-muted border border-border text-xs text-muted-foreground hover:text-foreground hover:border-primary/40 hover:bg-primary/5 transition-all"
              >
                {term}
              </Link>
            ))}
          </div>
        </section>
      )}
    </article>
  );
};

export default ToolContent;
