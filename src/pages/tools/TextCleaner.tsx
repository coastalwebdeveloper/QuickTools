import { useState } from "react";
import { Eraser, Copy, Check } from "lucide-react";
import ToolLayout from "@/components/ToolLayout";
import ToolContent from "@/components/ToolContent";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { toolContentData } from "@/lib/toolContent";

const TextCleaner = () => {
  const [text, setText] = useState("");
  const [copied, setCopied] = useState(false);

  const cleaningOptions = [
    {
      name: "Remove Extra Spaces",
      action: () => setText(text.replace(/\s+/g, " ").trim()),
    },
    {
      name: "Remove All Spaces",
      action: () => setText(text.replace(/\s/g, "")),
    },
    {
      name: "Remove Line Breaks",
      action: () => setText(text.replace(/[\r\n]+/g, " ").trim()),
    },
    {
      name: "Remove Duplicate Lines",
      action: () => {
        const lines = text.split("\n");
        const unique = [...new Set(lines)];
        setText(unique.join("\n"));
      },
    },
    {
      name: "Remove Empty Lines",
      action: () => setText(text.replace(/^\s*[\r\n]/gm, "")),
    },
    {
      name: "Remove Numbers",
      action: () => setText(text.replace(/[0-9]/g, "")),
    },
    {
      name: "Remove Special Chars",
      action: () => setText(text.replace(/[^a-zA-Z0-9\s]/g, "")),
    },
    {
      name: "Trim Each Line",
      action: () =>
        setText(
          text
            .split("\n")
            .map((line) => line.trim())
            .join("\n")
        ),
    },
  ];

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success("Copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ToolLayout
      title="Text Cleaner"
      description="Clean and format your text with various options"
      icon={Eraser}
      iconColor="bg-fuchsia-500/10 text-fuchsia-600 dark:text-fuchsia-400"
      tips={[
        "Remove extra whitespace and formatting",
        "Clean up copied text from documents",
        "Remove special characters or numbers",
        "Multiple cleaning options available",
      ]}
    >
      <div className="space-y-6">
        {/* Text Area */}
        <div>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste your messy text here..."
            className="w-full h-48 input-modern resize-none font-mono text-sm"
          />
        </div>

        {/* Cleaning Options */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {cleaningOptions.map((option) => (
            <Button
              key={option.name}
              variant="outline"
              onClick={option.action}
              disabled={!text}
              className="text-xs"
            >
              {option.name}
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
            {copied ? "Copied!" : "Copy Clean Text"}
          </Button>
          <Button
            variant="outline"
            onClick={() => setText("")}
            disabled={!text}
          >
            Clear All
          </Button>
        </div>

        <ToolContent
          title="Text Cleaner"
          {...toolContentData["text-cleaner"]}
        />
      </div>
    </ToolLayout>
  );
};

export default TextCleaner;
