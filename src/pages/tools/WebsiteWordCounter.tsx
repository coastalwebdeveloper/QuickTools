import { useState } from "react";
import { Globe, Search } from "lucide-react";
import ToolLayout from "@/components/ToolLayout";
import ToolContent from "@/components/ToolContent";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { toolContentData } from "@/lib/toolContent";

const WebsiteWordCounter = () => {
  const [url, setUrl] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [stats, setStats] = useState<any>(null);
  const [mainContentOnly, setMainContentOnly] = useState(true);

  const analyzeWebsite = async () => {
    if (!url.trim()) {
      toast.error("Please enter a URL");
      return;
    }

    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      toast.error("URL must start with http:// or https://");
      return;
    }

    setIsAnalyzing(true);
    try {
      const response = await fetch(`/api/analyze-url?url=${encodeURIComponent(url)}&mainOnly=${mainContentOnly}`);
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to analyze URL');
      }
      
      const data = await response.json();
      setStats(data);
      toast.success("Analysis complete!");
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "Error analyzing website. Try a different URL.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const calculateFleschScore = (words: number, sentences: number) => {
    if (sentences === 0) return 0;
    const avgWordsPerSentence = words / sentences;
    const score = 206.835 - 1.015 * avgWordsPerSentence;
    return Math.max(0, Math.min(100, Math.round(score)));
  };

  const getReadingLevel = (score: number) => {
    if (score >= 90) return "Very Easy";
    if (score >= 80) return "Easy";
    if (score >= 70) return "Fairly Easy";
    if (score >= 60) return "Standard";
    if (score >= 50) return "Fairly Difficult";
    if (score >= 30) return "Difficult";
    return "Very Difficult";
  };

  const relatedTools = [
    { name: "Word Counter", path: "/tools/word-counter" },
    { name: "Meta Tag Generator", path: "/tools/meta-tag-generator" },
    { name: "Text Cleaner", path: "/tools/text-cleaner" },
    { name: "HTML Formatter", path: "/tools/html-formatter" }
  ];

  return (
    <ToolLayout
      title="Website Word Counter"
      description="Count words on any website by URL"
      icon={Globe}
      iconColor="bg-cyan-500/10 text-cyan-600 dark:text-cyan-400"
      toolId="website-word-counter"
      tips={[
        "Enter full URL including http:// or https://",
        "Only works with public websites",
        "Analyzes main content, excludes navigation",
        "Great for SEO content analysis"
      ]}
    >
      <div className="space-y-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Website URL</label>
            <div className="flex gap-2">
              <Input
                placeholder="https://example.com"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
              <Button onClick={analyzeWebsite} disabled={isAnalyzing}>
                <Search className="w-4 h-4 mr-2" />
                {isAnalyzing ? "Analyzing..." : "Analyze"}
              </Button>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="mainContent"
              checked={mainContentOnly}
              onChange={(e) => setMainContentOnly(e.target.checked)}
              className="w-4 h-4"
            />
            <label htmlFor="mainContent" className="text-sm">
              Main content only (exclude navigation, footer, sidebar)
            </label>
          </div>
        </div>

        {stats && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400">Words</p>
                <p className="text-2xl font-bold">{stats.words.toLocaleString()}</p>
              </div>
              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400">Characters</p>
                <p className="text-2xl font-bold">{stats.characters.toLocaleString()}</p>
              </div>
              <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400">Paragraphs</p>
                <p className="text-2xl font-bold">{stats.paragraphs}</p>
              </div>
              <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400">Sentences</p>
                <p className="text-2xl font-bold">{stats.sentences}</p>
              </div>
              <div className="p-4 bg-pink-50 dark:bg-pink-900/20 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400">Reading Time</p>
                <p className="text-2xl font-bold">{stats.readingTime} min</p>
              </div>
              <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400">Headings</p>
                <p className="text-sm font-medium">
                  H1: {stats.headings.h1} | H2: {stats.headings.h2} | H3: {stats.headings.h3}
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-cyan-50 dark:bg-cyan-900/20 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400">Avg Words per Paragraph</p>
                <p className="text-2xl font-bold">
                  {stats.paragraphs > 0 ? Math.round(stats.words / stats.paragraphs) : 0}
                </p>
              </div>
              <div className="p-4 bg-teal-50 dark:bg-teal-900/20 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400">Reading Level</p>
                <p className="text-2xl font-bold">
                  {getReadingLevel(calculateFleschScore(stats.words, stats.sentences))}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Flesch Score: {calculateFleschScore(stats.words, stats.sentences)}
                </p>
              </div>
            </div>
          </div>
        )}

        <ToolContent
          title="Website Word Counter"
          {...toolContentData["website-word-counter"]}
        />

        <section className="mt-8 pt-8 border-t">
          <h2 className="text-xl font-bold mb-4">Related Tools</h2>
          <div className="grid grid-cols-2 gap-3">
            {relatedTools.map((tool) => (
              <a
                key={tool.path}
                href={tool.path}
                className="p-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-sm"
              >
                {tool.name}
              </a>
            ))}
          </div>
        </section>
      </div>
    </ToolLayout>
  );
};

export default WebsiteWordCounter;
