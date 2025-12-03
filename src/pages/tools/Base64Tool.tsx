import { useState } from "react";
import { FileCode, Copy, Check } from "lucide-react";
import ToolLayout from "@/components/ToolLayout";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const Base64Tool = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [copied, setCopied] = useState(false);

  const handleConvert = () => {
    try {
      if (mode === "encode") {
        setOutput(btoa(input));
      } else {
        setOutput(atob(input));
      }
    } catch (error) {
      toast.error("Invalid input for decoding");
    }
  };

  const copyOutput = async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    toast.success("Copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ToolLayout
      title="Base64 Encoder/Decoder"
      description="Encode and decode text to/from Base64 format"
      icon={FileCode}
      iconColor="bg-slate-500/10 text-slate-600 dark:text-slate-400"
      toolId="base64-tool"
      tips={[
        "Base64 encoding converts binary data to ASCII text",
        "Commonly used for embedding images in HTML/CSS",
        "Switch between encode and decode modes easily",
      ]}
    >
      <div className="space-y-4">
        <div className="flex gap-2 p-1 bg-secondary rounded-lg">
          <button
            onClick={() => setMode("encode")}
            className={`flex-1 py-2 rounded-md transition-colors ${
              mode === "encode" ? "bg-background shadow-sm" : ""
            }`}
          >
            Encode
          </button>
          <button
            onClick={() => setMode("decode")}
            className={`flex-1 py-2 rounded-md transition-colors ${
              mode === "decode" ? "bg-background shadow-sm" : ""
            }`}
          >
            Decode
          </button>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Input</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={mode === "encode" ? "Enter text to encode..." : "Enter Base64 to decode..."}
            className="w-full input-modern min-h-[150px] font-mono text-sm"
          />
        </div>

        <Button onClick={handleConvert} className="btn-primary w-full">
          {mode === "encode" ? "Encode" : "Decode"}
        </Button>

        {output && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium">Output</label>
              <Button variant="ghost" size="sm" onClick={copyOutput}>
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </Button>
            </div>
            <textarea
              value={output}
              readOnly
              className="w-full input-modern min-h-[150px] font-mono text-sm bg-secondary"
            />
          </div>
        )}
      </div>
    </ToolLayout>
  );
};

export default Base64Tool;
