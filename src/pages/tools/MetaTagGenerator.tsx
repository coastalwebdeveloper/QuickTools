import { useState } from "react";
import { Tags, Copy } from "lucide-react";
import ToolLayout from "@/components/ToolLayout";
import ToolContent from "@/components/ToolContent";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { toolContentData } from "@/lib/toolContent";

const MetaTagGenerator = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [keywords, setKeywords] = useState("");
  const [author, setAuthor] = useState("");
  const [ogImage, setOgImage] = useState("");
  const [url, setUrl] = useState("");

  const generateMetaTags = () => {
    const tags = `<!-- Primary Meta Tags -->
<title>${title || 'Your Page Title'}</title>
<meta name="title" content="${title || 'Your Page Title'}">
<meta name="description" content="${description || 'Your page description'}">
<meta name="keywords" content="${keywords || 'keyword1, keyword2, keyword3'}">
<meta name="author" content="${author || 'Author Name'}">

<!-- Open Graph / Facebook -->
<meta property="og:type" content="website">
<meta property="og:url" content="${url || 'https://yourwebsite.com/'}">
<meta property="og:title" content="${title || 'Your Page Title'}">
<meta property="og:description" content="${description || 'Your page description'}">
<meta property="og:image" content="${ogImage || 'https://yourwebsite.com/image.jpg'}">

<!-- Twitter -->
<meta property="twitter:card" content="summary_large_image">
<meta property="twitter:url" content="${url || 'https://yourwebsite.com/'}">
<meta property="twitter:title" content="${title || 'Your Page Title'}">
<meta property="twitter:description" content="${description || 'Your page description'}">
<meta property="twitter:image" content="${ogImage || 'https://yourwebsite.com/image.jpg'}">`;

    return tags;
  };

  const copyTags = () => {
    const tags = generateMetaTags();
    navigator.clipboard.writeText(tags);
    toast.success("Meta tags copied to clipboard!");
  };

  const relatedTools = [
    { name: "HTML Formatter", path: "/tools/html-formatter" },
    { name: "Website Word Counter", path: "/tools/website-word-counter" },
    { name: "QR Code Generator", path: "/tools/qr-generator" },
    { name: "URL Shortener", path: "/tools/url-shortener" }
  ];

  return (
    <ToolLayout
      title="Meta Tag Generator"
      description="Generate SEO meta tags for your website"
      icon={Tags}
      iconColor="bg-purple-500/10 text-purple-600 dark:text-purple-400"
      toolId="meta-tag-generator"
      tips={[
        "Title should be 50-60 characters",
        "Description should be 150-160 characters",
        "Include relevant keywords",
        "Use high-quality Open Graph images"
      ]}
    >
      <div className="space-y-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Page Title <span className="text-gray-500">({title.length}/60)</span>
            </label>
            <Input
              placeholder="Your Page Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={60}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Meta Description <span className="text-gray-500">({description.length}/160)</span>
            </label>
            <Textarea
              placeholder="A compelling description of your page content"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              maxLength={160}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Keywords</label>
            <Input
              placeholder="keyword1, keyword2, keyword3"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Author</label>
            <Input
              placeholder="Author Name"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Page URL</label>
            <Input
              placeholder="https://yourwebsite.com/"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Open Graph Image URL</label>
            <Input
              placeholder="https://yourwebsite.com/image.jpg"
              value={ogImage}
              onChange={(e) => setOgImage(e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium">Generated Meta Tags</label>
            <Button size="sm" onClick={copyTags}>
              <Copy className="w-4 h-4 mr-2" />
              Copy Tags
            </Button>
          </div>
          <Textarea
            value={generateMetaTags()}
            readOnly
            rows={15}
            className="font-mono text-sm"
          />
        </div>

        <ToolContent
          title="Meta Tag Generator"
          {...toolContentData["meta-tag-generator"]}
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

export default MetaTagGenerator;
