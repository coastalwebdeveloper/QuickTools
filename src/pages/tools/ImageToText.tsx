import { useState } from "react";
import { ScanEye, Upload, Copy } from "lucide-react";
import ToolLayout from "@/components/ToolLayout";
import ToolContent from "@/components/ToolContent";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { toolContentData } from "@/lib/toolContent";
import { createWorker } from 'tesseract.js';

const ImageToText = () => {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");
  const [extractedText, setExtractedText] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (!file.type.startsWith('image/')) {
        toast.error("Please select an image file");
        return;
      }
      setImage(file);
      setPreview(URL.createObjectURL(file));
      setExtractedText("");
    }
  };

  const extractText = async () => {
    if (!image) return;

    setIsProcessing(true);
    try {
      const worker = await createWorker('eng');
      const { data: { text } } = await worker.recognize(preview);
      await worker.terminate();
      
      setExtractedText(text);
      toast.success("Text extracted successfully!");
    } catch (error) {
      toast.error("Error extracting text");
    } finally {
      setIsProcessing(false);
    }
  };

  const copyText = () => {
    navigator.clipboard.writeText(extractedText);
    toast.success("Text copied to clipboard!");
  };

  const relatedTools = [
    { name: "OCR PDF", path: "/tools/ocr-pdf" },
    { name: "Image Compressor", path: "/tools/image-compressor" },
    { name: "PDF to Word", path: "/tools/pdf-to-word" },
    { name: "Word Counter", path: "/tools/word-counter" }
  ];

  return (
    <ToolLayout
      title="Image to Text (OCR)"
      description="Extract text from images using OCR technology"
      icon={ScanEye}
      iconColor="bg-violet-500/10 text-violet-600 dark:text-violet-400"
      toolId="image-to-text"
      tips={[
        "Use high-resolution images for best results",
        "Clear, well-lit images work best",
        "Supports printed and typed text",
        "All processing happens in your browser"
      ]}
    >
      <div className="space-y-6">
        <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl p-8 text-center">
          <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Upload Image</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Select an image containing text to extract
          </p>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
            id="image-upload"
          />
          <Button asChild>
            <label htmlFor="image-upload" className="cursor-pointer">
              Choose Image
            </label>
          </Button>
        </div>

        {preview && (
          <div className="space-y-4">
            <div className="border rounded-lg overflow-hidden">
              <img src={preview} alt="Preview" className="w-full max-h-96 object-contain" />
            </div>
            
            <Button onClick={extractText} disabled={isProcessing} className="w-full">
              <ScanEye className="w-4 h-4 mr-2" />
              {isProcessing ? "Extracting Text..." : "Extract Text"}
            </Button>

            {extractedText && (
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium">Extracted Text</label>
                  <Button size="sm" variant="outline" onClick={copyText}>
                    <Copy className="w-4 h-4 mr-2" />
                    Copy
                  </Button>
                </div>
                <Textarea
                  value={extractedText}
                  onChange={(e) => setExtractedText(e.target.value)}
                  rows={10}
                  className="font-mono text-sm"
                />
              </div>
            )}
          </div>
        )}

        <ToolContent
          title="Image to Text (OCR)"
          {...toolContentData["image-to-text"]}
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

export default ImageToText;
