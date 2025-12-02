import { useState } from "react";
import { Scissors, Upload, Download } from "lucide-react";
import ToolLayout from "@/components/ToolLayout";
import { Button } from "@/components/ui/button";
import { PDFDocument } from "pdf-lib";
import { toast } from "sonner";

const PDFSplit = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const splitPDF = async () => {
    if (!file) return;

    setIsProcessing(true);
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await PDFDocument.load(arrayBuffer);
      const pageCount = pdf.getPageCount();
      
      for (let i = 0; i < pageCount; i++) {
        const newPdf = await PDFDocument.create();
        const [copiedPage] = await newPdf.copyPages(pdf, [i]);
        newPdf.addPage(copiedPage);
        
        const pdfBytes = await newPdf.save();
        const blob = new Blob([pdfBytes], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = `page-${i + 1}.pdf`;
        a.click();
        
        URL.revokeObjectURL(url);
      }
      
      toast.success(`PDF split into ${pageCount} pages!`);
    } catch (error) {
      toast.error("Error splitting PDF");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <ToolLayout
      title="PDF Splitter"
      description="Split PDF documents into separate pages"
      icon={Scissors}
      iconColor="bg-orange-500/10 text-orange-600 dark:text-orange-400"
      toolId="pdf-split"
      tips={[
        "Upload a PDF file to split it into pages",
        "Each page will be saved as a separate PDF",
        "All processing happens in your browser",
        "No data is sent to any server"
      ]}
    >
      <div className="space-y-6">
        <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl p-8 text-center">
          <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Upload PDF File</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Select a PDF file to split it into individual pages
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
            <h3 className="font-semibold">Selected File</h3>
            <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <Scissors className="w-5 h-5 text-orange-600" />
              <span className="flex-1">{file.name}</span>
              <span className="text-sm text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</span>
            </div>
            <Button className="w-full" onClick={splitPDF} disabled={isProcessing || !file}>
              <Download className="w-4 h-4 mr-2" />
              {isProcessing ? "Splitting..." : "Split PDF"}
            </Button>
          </div>
        )}
      </div>
    </ToolLayout>
  );
};

export default PDFSplit;