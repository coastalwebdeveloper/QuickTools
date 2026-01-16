import { useState } from "react";
import { FileDown, Upload, Download } from "lucide-react";
import ToolLayout from "@/components/ToolLayout";
import ToolContent from "@/components/ToolContent";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import * as pdfjsLib from "pdfjs-dist";
import { Document, Packer, Paragraph, TextRun } from "docx";
import { saveAs } from "file-saver";
import { toolContentData } from "@/lib/toolContent";

pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.mjs';

const PDFToWord = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [docData, setDocData] = useState<Paragraph[]>([]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.type !== "application/pdf") {
        toast.error("Please select a PDF file");
        return;
      }
      setFile(selectedFile);
      setIsReady(false);
    }
  };

  const convertToWord = async () => {
    if (!file) return;

    setIsProcessing(true);
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      const paragraphs: Paragraph[] = [];

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        
        const items = textContent.items as any[];
        const lines: Map<number, string[]> = new Map();
        
        items.forEach((item) => {
          const y = Math.round(item.transform[5]);
          if (!lines.has(y)) lines.set(y, []);
          lines.get(y)!.push(item.str);
        });
        
        const sortedLines = Array.from(lines.entries()).sort((a, b) => b[0] - a[0]);
        
        sortedLines.forEach(([_, texts]) => {
          const text = texts.join(' ').trim();
          if (text) {
            paragraphs.push(
              new Paragraph({
                children: [new TextRun(text)],
                spacing: { after: 200 }
              })
            );
          }
        });
      }

      setDocData(paragraphs);
      setIsReady(true);
      toast.success("PDF converted successfully!");
    } catch (error) {
      toast.error("Error converting PDF");
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadAsWord = async () => {
    try {
      const doc = new Document({
        sections: [{
          children: docData
        }]
      });

      const blob = await Packer.toBlob(doc);
      saveAs(blob, `${file?.name.replace('.pdf', '')}.docx`);
    } catch (error) {
      toast.error("Error generating Word document");
    }
  };

  return (
    <ToolLayout
      title="PDF to Word"
      description="Convert PDF documents to editable Word files"
      icon={FileDown}
      iconColor="bg-blue-500/10 text-blue-600 dark:text-blue-400"
      toolId="pdf-to-word"
      tips={[
        "Upload PDF files to convert to Word format",
        "Maintains formatting and layout",
        "All processing happens in your browser",
        "No files are uploaded to any server"
      ]}
    >
      <div className="space-y-6">
        <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl p-8 text-center">
          <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Upload PDF</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Select a PDF file to convert to Word format
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
              <p className="text-sm text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
            </div>
            <Button onClick={convertToWord} disabled={isProcessing} className="w-full">
              <FileDown className="w-4 h-4 mr-2" />
              {isProcessing ? "Converting..." : "Convert to Word"}
            </Button>
            {isReady && (
              <Button onClick={downloadAsWord} className="w-full">
                <Download className="w-4 h-4 mr-2" />
                Download Word Document
              </Button>
            )}
          </div>
        )}

        <ToolContent
          title="PDF to Word"
          {...toolContentData["pdf-to-word"]}
        />
      </div>
    </ToolLayout>
  );
};

export default PDFToWord;
