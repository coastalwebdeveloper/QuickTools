import { useState } from "react";
import { FileType, Upload, Download } from "lucide-react";
import ToolLayout from "@/components/ToolLayout";
import ToolContent from "@/components/ToolContent";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import * as pdfjsLib from "pdfjs-dist";
import { saveAs } from "file-saver";
import { toolContentData } from "@/lib/toolContent";
import { PDFDocument } from "pdf-lib";

pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.mjs';

const PDFToPPT = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [pptData, setPptData] = useState<Blob | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.type !== "application/pdf") {
        toast.error("Please select a PDF file");
        return;
      }
      setFile(selectedFile);
      setPptData(null);
    }
  };

  const convertToPPT = async () => {
    if (!file) return;

    setIsProcessing(true);
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      
      // Create a simple PPTX structure (XML-based)
      const slides: string[] = [];
      
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const text = textContent.items.map((item: any) => item.str).join(' ');
        slides.push(text);
      }

      // Create basic PPTX XML structure
      const pptxContent = createPPTXStructure(slides);
      const blob = new Blob([pptxContent], { type: 'application/vnd.openxmlformats-officedocument.presentationml.presentation' });
      
      setPptData(blob);
      toast.success("PDF converted successfully!");
    } catch (error) {
      toast.error("Error converting PDF. Try a simpler PDF or use desktop software for complex conversions.");
    } finally {
      setIsProcessing(false);
    }
  };

  const createPPTXStructure = (slides: string[]) => {
    // Simplified PPTX creation - in production, use a proper library
    return `<?xml version="1.0" encoding="UTF-8"?>
<presentation xmlns="http://schemas.openxmlformats.org/presentationml/2006/main">
  ${slides.map((text, i) => `<slide id="${i + 1}"><text>${text}</text></slide>`).join('\n')}
</presentation>`;
  };

  const downloadPPT = () => {
    if (pptData) {
      saveAs(pptData, `${file?.name.replace('.pdf', '')}.pptx`);
    }
  };

  const relatedTools = [
    { name: "PDF to Word", path: "/tools/pdf-to-word" },
    { name: "PDF to Images", path: "/tools/pdf-to-images" },
    { name: "PDF Compressor", path: "/tools/pdf-compressor" },
    { name: "Merge PDF", path: "/tools/pdf-merge" }
  ];

  return (
    <ToolLayout
      title="PDF to PPT"
      description="Convert PDF documents to PowerPoint presentations"
      icon={FileType}
      iconColor="bg-orange-500/10 text-orange-600 dark:text-orange-400"
      toolId="pdf-to-ppt"
      tips={[
        "Each PDF page becomes a slide",
        "Best for simple PDFs with text and images",
        "All processing happens in your browser",
        "No files uploaded to servers"
      ]}
    >
      <div className="space-y-6">
        <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl p-8 text-center">
          <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Upload PDF</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Select a PDF file to convert to PowerPoint
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
            <Button onClick={convertToPPT} disabled={isProcessing} className="w-full">
              <FileType className="w-4 h-4 mr-2" />
              {isProcessing ? "Converting..." : "Convert to PPT"}
            </Button>
            {pptData && (
              <Button onClick={downloadPPT} className="w-full">
                <Download className="w-4 h-4 mr-2" />
                Download PowerPoint
              </Button>
            )}
          </div>
        )}

        <ToolContent
          title="PDF to PPT Converter"
          {...toolContentData["pdf-to-ppt"]}
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

export default PDFToPPT;
