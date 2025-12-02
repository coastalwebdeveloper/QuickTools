import { useState, useMemo } from "react";
import { Hash, Copy, Check } from "lucide-react";
import ToolLayout from "@/components/ToolLayout";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const WordCounter = () => {
  const [text, setText] = useState("");
  const [copied, setCopied] = useState(false);

  const stats = useMemo(() => {
    const trimmedText = text.trim();
    
    const characters = text.length;
    const charactersNoSpaces = text.replace(/\s/g, "").length;
    const words = trimmedText ? trimmedText.split(/\s+/).length : 0;
    const sentences = trimmedText
      ? (trimmedText.match(/[.!?]+/g) || []).length || (trimmedText.length > 0 ? 1 : 0)
      : 0;
    const paragraphs = trimmedText
      ? trimmedText.split(/\n\n+/).filter(Boolean).length
      : 0;
    const lines = trimmedText ? trimmedText.split(/\n/).length : 0;
    
    // Reading time (average 200 words per minute)
    const readingTime = Math.ceil(words / 200);
    // Speaking time (average 150 words per minute)
    const speakingTime = Math.ceil(words / 150);

    return {
      characters,
      charactersNoSpaces,
      words,
      sentences,
      paragraphs,
      lines,
      readingTime,
      speakingTime,
    };
  }, [text]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success("Text copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setText("");
    toast.success("Text cleared!");
  };

  const statItems = [
    { label: "Words", value: stats.words },
    { label: "Characters", value: stats.characters },
    { label: "Characters (no spaces)", value: stats.charactersNoSpaces },
    { label: "Sentences", value: stats.sentences },
    { label: "Paragraphs", value: stats.paragraphs },
    { label: "Lines", value: stats.lines },
    { label: "Reading Time", value: `${stats.readingTime} min` },
    { label: "Speaking Time", value: `${stats.speakingTime} min` },
  ];

  return (
    <ToolLayout
      title="Word Counter"
      description="Count words, characters, sentences, and paragraphs in your text"
      icon={Hash}
      iconColor="bg-purple-500/10 text-purple-600 dark:text-purple-400"
      tips={[
        "Paste or type your text to see instant statistics",
        "Reading time is calculated at 200 words per minute",
        "Speaking time is calculated at 150 words per minute",
        "All processing happens in your browser",
      ]}
    >
      <div className="space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {statItems.map((item) => (
            <div
              key={item.label}
              className="bg-secondary/50 rounded-xl p-4 text-center"
            >
              <p className="text-2xl md:text-3xl font-bold text-foreground">
                {item.value}
              </p>
              <p className="text-sm text-muted-foreground">{item.label}</p>
            </div>
          ))}
        </div>

        {/* Text Area */}
        <div>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type or paste your text here..."
            className="w-full h-64 input-modern resize-none font-mono text-sm"
          />
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-3">
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
            {copied ? "Copied!" : "Copy Text"}
          </Button>
          <Button
            onClick={handleClear}
            disabled={!text}
            variant="outline"
            className="btn-secondary"
          >
            Clear Text
          </Button>
        </div>
      </div>
    </ToolLayout>
  );
};

export default WordCounter;
