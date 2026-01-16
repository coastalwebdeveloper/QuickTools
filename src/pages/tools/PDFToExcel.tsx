import { useState } from "react";
import { FileSpreadsheet, Upload, Download } from "lucide-react";
import ToolLayout from "@/components/ToolLayout";
import ToolContent from "@/components/ToolContent";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import * as pdfjsLib from "pdfjs-dist";
import { toolContentData } from "@/lib/toolContent";

pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.mjs';

const PDFToExcel = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [extractedData, setExtractedData] = useState("");

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.type !== "application/pdf") {
        toast.error("Please select a PDF file");
        return;
      }
      setFile(selectedFile);
      setExtractedData("");
    }
  };

  const convertToExcel = async () => {
    if (!file) return;

    setIsProcessing(true);
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      let csvData = "";

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items.map((item: any) => item.str).join(",");
        csvData += pageText + "\n";
      }

      setExtractedData(csvData);
      toast.success("PDF converted successfully!");
    } catch (error) {
      toast.error("Error converting PDF");
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadAsCSV = () => {
    const blob = new Blob([extractedData], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${file?.name.replace('.pdf', '')}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <ToolLayout
      title="PDF to Excel"
      description="Convert PDF tables to Excel spreadsheets"
      icon={FileSpreadsheet}
      iconColor="bg-green-500/10 text-green-600 dark:text-green-400"
      toolId="pdf-to-excel"
      tips={[
        "Upload PDF files with tables",
        "Extracts tables to Excel format",
        "All processing happens in your browser",
        "No files are uploaded to any server"
      ]}
    >
      <div className="space-y-6">
        <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl p-8 text-center">
          <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Upload PDF</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Select a PDF file to convert to Excel format
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
            <Button onClick={convertToExcel} disabled={isProcessing} className="w-full">
              <FileSpreadsheet className="w-4 h-4 mr-2" />
              {isProcessing ? "Converting..." : "Convert to Excel"}
            </Button>
          </div>
        )}

        {extractedData && (
          <Button onClick={downloadAsCSV} className="w-full">
            <Download className="w-4 h-4 mr-2" />
            Download as CSV
          </Button>
        )}

        <ToolContent
          title="PDF to Excel"
          {...toolContentData["pdf-to-excel"]}
        />
      </div>
    </ToolLayout>
  );
};

export default PDFToExcel;
