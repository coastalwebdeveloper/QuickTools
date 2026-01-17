import { useState } from "react";
import { Code2, Copy, Wand2 } from "lucide-react";
import ToolLayout from "@/components/ToolLayout";
import ToolContent from "@/components/ToolContent";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { toolContentData } from "@/lib/toolContent";
import prettier from "prettier/standalone";
import parserHtml from "prettier/parser-html";
import parserPostcss from "prettier/parser-postcss";
import parserBabel from "prettier/parser-babel";

const HTMLFormatter = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [indentSize, setIndentSize] = useState(2);

  const formatHTML = async () => {
    if (!input.trim()) {
      toast.error("Please enter HTML code");
      return;
    }

    try {
      const formatted = await prettier.format(input, {
        parser: "html",
        plugins: [parserHtml, parserPostcss, parserBabel],
        tabWidth: indentSize,
        printWidth: 80,
        htmlWhitespaceSensitivity: "css"
      });
      setOutput(formatted);
      toast.success("HTML formatted!");
    } catch (error) {
      toast.error("Error formatting HTML. Check syntax.");
    }
  };

  const minifyHTML = () => {
    if (!input.trim()) {
      toast.error("Please enter HTML code");
      return;
    }

    const minified = input
      .replace(/\n/g, '')
      .replace(/\s+/g, ' ')
      .replace(/>\s+</g, '><')
      .trim();
    
    setOutput(minified);
    toast.success("HTML minified!");
  };

  const copyOutput = () => {
    navigator.clipboard.writeText(output);
    toast.success("Copied to clipboard!");
  };

  const relatedTools = [
    { name: "JSON to CSV", path: "/tools/json-to-csv" },
    { name: "Base64 Tool", path: "/tools/base64-tool" },
    { name: "Text Cleaner", path: "/tools/text-cleaner" },
    { name: "Meta Tag Generator", path: "/tools/meta-tag-generator" }
  ];

  return (
    <ToolLayout
      title="HTML Formatter"
      description="Format and beautify HTML code"
      icon={Code2}
      iconColor="bg-orange-500/10 text-orange-600 dark:text-orange-400"
      toolId="html-formatter"
      tips={[
        "Beautify minified HTML code",
        "Formats embedded CSS and JavaScript",
        "Proper indentation and structure",
        "All processing happens in your browser"
      ]}
    >
      <div className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">Input HTML</label>
          <Textarea
            placeholder="Paste your HTML code here..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={10}
            className="font-mono text-sm"
          />
        </div>

        <div className="flex gap-2 items-center">
          <Button onClick={formatHTML} className="flex-1">
            <Wand2 className="w-4 h-4 mr-2" />
            Beautify
          </Button>
          <Button onClick={minifyHTML} variant="outline" className="flex-1">
            Minify
          </Button>
          <div className="flex items-center gap-2">
            <label className="text-sm">Indent:</label>
            <select 
              value={indentSize} 
              onChange={(e) => setIndentSize(Number(e.target.value))}
              className="border rounded px-2 py-1 text-sm"
            >
              <option value={2}>2 spaces</option>
              <option value={4}>4 spaces</option>
            </select>
          </div>
        </div>

        {output && (
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium">Formatted HTML</label>
              <Button size="sm" variant="outline" onClick={copyOutput}>
                <Copy className="w-4 h-4 mr-2" />
                Copy
              </Button>
            </div>
            <Textarea
              value={output}
              readOnly
              rows={10}
              className="font-mono text-sm"
            />
          </div>
        )}

        <ToolContent
          title="HTML Formatter"
          {...toolContentData["html-formatter"]}
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

export default HTMLFormatter;
