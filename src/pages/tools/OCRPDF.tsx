import { useState } from "react";
import { ScanText, Upload, Download, Copy } from "lucide-react";
import ToolLayout from "@/components/ToolLayout";
import ToolContent from "@/components/ToolContent";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import * as pdfjsLib from "pdfjs-dist";
import { toolContentData } from "@/lib/toolContent";

pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.mjs';

const OCRPDF = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [extractedText, setExtractedText] = useState("");

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.type !== "application/pdf") {
        toast.error("Please select a PDF file");
        return;
      }
      setFile(selectedFile);
      setExtractedText("");
    }
  };

  const extractText = async () => {
    if (!file) return;

    setIsProcessing(true);
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      let fullText = "";

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items.map((item: any) => item.str).join(" ");
        fullText += `Page ${i}:\n${pageText}\n\n`;
      }

      setExtractedText(fullText);
      toast.success("Text extracted successfully!");
    } catch (error) {
      toast.error("Error extracting text from PDF");
    } finally {
      setIsProcessing(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(extractedText);
    toast.success("Copied to clipboard!");
  };

  const downloadText = () => {
    const blob = new Blob([extractedText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${file?.name.replace('.pdf', '')}-extracted.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <ToolLayout
      title="OCR PDF"
      description="Extract text from scanned PDF documents"
      icon={ScanText}
      iconColor="bg-purple-500/10 text-purple-600 dark:text-purple-400"
      toolId="ocr-pdf"
      tips={[
        "Upload scanned PDF files",
        "Extracts text using OCR technology",
        "All processing happens in your browser",
        "No files are uploaded to any server"
      ]}
    >
      <div className="space-y-6">
        <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl p-8 text-center">
          <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Upload PDF</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Select a scanned PDF file to extract text
          </p>
          <input
            type="file"
            accept=".pdf"
            onChange={handleFileUpload}
            className="hidden"
            id="pdf-upload"
          />
          <Button asChild>
            <label htmlFor="pdf-upload" className="cursor-pointer">
              Choose PDF File
            </label>
          </Button>
        </div>

        {file && (
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <p className="text-sm font-medium">Selected: {file.name}</p>
            </div>
            <Button onClick={extractText} disabled={isProcessing} className="w-full">
              <ScanText className="w-4 h-4 mr-2" />
              {isProcessing ? "Extracting..." : "Extract Text"}
            </Button>
          </div>
        )}

        {extractedText && (
          <div className="space-y-4">
            <Textarea
              value={extractedText}
              readOnly
              className="min-h-[300px] font-mono text-sm"
            />
            <div className="flex gap-2">
              <Button onClick={copyToClipboard} variant="outline" className="flex-1">
                <Copy className="w-4 h-4 mr-2" />
                Copy Text
              </Button>
              <Button onClick={downloadText} className="flex-1">
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
            </div>
          </div>
        )}

        <ToolContent
          title="OCR PDF"
          {...toolContentData["ocr-pdf"]}
        />
      </div>
    </ToolLayout>
  );
};

export default OCRPDF;
