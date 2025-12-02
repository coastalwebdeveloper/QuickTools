import { useState } from "react";
import { Type, Copy, Check } from "lucide-react";
import ToolLayout from "@/components/ToolLayout";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const CaseConverter = () => {
  const [text, setText] = useState("");
  const [copied, setCopied] = useState(false);

  const conversions = [
    {
      name: "UPPERCASE",
      convert: (t: string) => t.toUpperCase(),
    },
    {
      name: "lowercase",
      convert: (t: string) => t.toLowerCase(),
    },
    {
      name: "Sentence case",
      convert: (t: string) =>
        t.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase()),
    },
    {
      name: "Title Case",
      convert: (t: string) =>
        t.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase()),
    },
    {
      name: "camelCase",
      convert: (t: string) =>
        t
          .toLowerCase()
          .replace(/[^a-zA-Z0-9]+(.)/g, (_, c) => c.toUpperCase()),
    },
    {
      name: "snake_case",
      convert: (t: string) =>
        t.toLowerCase().replace(/\s+/g, "_").replace(/[^a-zA-Z0-9_]/g, ""),
    },
    {
      name: "kebab-case",
      convert: (t: string) =>
        t.toLowerCase().replace(/\s+/g, "-").replace(/[^a-zA-Z0-9-]/g, ""),
    },
    {
      name: "aLtErNaTiNg",
      convert: (t: string) =>
        t
          .split("")
          .map((c, i) => (i % 2 === 0 ? c.toLowerCase() : c.toUpperCase()))
          .join(""),
    },
  ];

  const applyConversion = (convert: (t: string) => string) => {
    setText(convert(text));
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success("Copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ToolLayout
      title="Case Converter"
      description="Convert text between different cases instantly"
      icon={Type}
      iconColor="bg-pink-500/10 text-pink-600 dark:text-pink-400"
      tips={[
        "Enter or paste text, then click any conversion",
        "Great for coding (camelCase, snake_case)",
        "Useful for titles and headings",
        "All conversions happen instantly",
      ]}
    >
      <div className="space-y-6">
        {/* Text Area */}
        <div>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type or paste your text here..."
            className="w-full h-40 input-modern resize-none"
          />
        </div>

        {/* Conversion Buttons */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {conversions.map((conv) => (
            <Button
              key={conv.name}
              variant="outline"
              onClick={() => applyConversion(conv.convert)}
              disabled={!text}
              className="text-sm"
            >
              {conv.name}
            </Button>
          ))}
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <Button
            onClick={handleCopy}
            disabled={!text}
            className="btn-primary"
          >
            {copied ? (
              <Check className="w-4 h-4 mr-2" />
            ) : (
              <Copy className="w-4 h-4 mr-2" />
            )}
            {copied ? "Copied!" : "Copy Result"}
          </Button>
          <Button
            variant="outline"
            onClick={() => setText("")}
            disabled={!text}
          >
            Clear
          </Button>
        </div>
      </div>
    </ToolLayout>
  );
};

export default CaseConverter;
