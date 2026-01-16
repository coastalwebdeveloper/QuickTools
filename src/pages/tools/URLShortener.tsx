import { useState } from "react";
import { Link, Copy, Check } from "lucide-react";
import ToolLayout from "@/components/ToolLayout";
import ToolContent from "@/components/ToolContent";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { toolContentData } from "@/lib/toolContent";

const URLShortener = () => {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [copied, setCopied] = useState(false);

  const handleShorten = () => {
    if (!url) {
      toast.error("Please enter a URL");
      return;
    }
    // Placeholder - implement actual URL shortening
    setShortUrl("https://short.link/abc123");
    toast.success("URL shortened successfully!");
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    toast.success("Copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ToolLayout
      title="URL Shortener"
      description="Create short, shareable links from long URLs"
      icon={Link}
      iconColor="bg-blue-500/10 text-blue-600 dark:text-blue-400"
      toolId="url-shortener"
      tips={[
        "Enter any long URL to shorten",
        "Get a short, easy-to-share link",
        "Track clicks and analytics",
        "Custom short links available"
      ]}
    >
      <div className="space-y-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Enter URL</label>
            <Input
              type="url"
              placeholder="https://example.com/very/long/url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </div>
          <Button onClick={handleShorten} className="w-full">
            <Link className="w-4 h-4 mr-2" />
            Shorten URL
          </Button>
        </div>

        {shortUrl && (
          <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg space-y-2">
            <label className="block text-sm font-medium">Shortened URL</label>
            <div className="flex gap-2">
              <Input value={shortUrl} readOnly />
              <Button onClick={handleCopy} variant="outline">
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </Button>
            </div>
          </div>
        )}

        <ToolContent
          title="URL Shortener"
          {...toolContentData["url-shortener"]}
        />
      </div>
    </ToolLayout>
  );
};

export default URLShortener;
