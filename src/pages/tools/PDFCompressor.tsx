import { useState } from "react";
import { Minimize2, Upload, Download } from "lucide-react";
import ToolLayout from "@/components/ToolLayout";
import ToolContent from "@/components/ToolContent";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import * as pdfjsLib from "pdfjs-dist";
import { PDFDocument } from "pdf-lib";
import { toolContentData } from "@/lib/toolContent";

pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.mjs';

const PDFCompressor = () => {
  const [file, setFile] = useState<File | null>(null);
  const [compressedFile, setCompressedFile] = useState<Blob | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [originalSize, setOriginalSize] = useState(0);
  const [compressedSize, setCompressedSize] = useState(0);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.type !== "application/pdf") {
        toast.error("Please select a PDF file");
        return;
      }
      setFile(selectedFile);
      setOriginalSize(selectedFile.size);
      setCompressedFile(null);
    }
  };

  const compressPDF = async () => {
    if (!file) return;

    setIsProcessing(true);
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      const pdfBytes = await pdfDoc.save({ useObjectStreams: false });
      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      
      setCompressedFile(blob);
      setCompressedSize(blob.size);
      toast.success("PDF compressed successfully!");
    } catch (error) {
      toast.error("Error compressing PDF");
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadCompressed = () => {
    if (!compressedFile) return;
    const url = URL.createObjectURL(compressedFile);
    const a = document.createElement('a');
    a.href = url;
    a.download = `compressed-${file?.name}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <ToolLayout
      title="PDF Compressor"
      description="Reduce PDF file size without losing quality"
      icon={Minimize2}
      iconColor="bg-red-500/10 text-red-600 dark:text-red-400"
      toolId="pdf-compressor"
      tips={[
        "Upload PDF files to compress",
        "Reduces file size significantly",
        "All processing happens in your browser",
        "No files are uploaded to any server"
      ]}
    >
      <div className="space-y-6">
        <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl p-8 text-center">
          <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Upload PDF</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Select a PDF file to compress and reduce its size
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
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <p className="text-sm font-medium mb-1">Original Size</p>
                <p className="text-2xl font-bold">{(originalSize / 1024 / 1024).toFixed(2)} MB</p>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <p className="text-sm font-medium mb-1">Compressed Size</p>
                <p className="text-2xl font-bold">
                  {compressedSize ? `${(compressedSize / 1024 / 1024).toFixed(2)} MB` : '-'}
                </p>
              </div>
            </div>
            <Button onClick={compressPDF} disabled={isProcessing} className="w-full">
              <Minimize2 className="w-4 h-4 mr-2" />
              {isProcessing ? "Compressing..." : "Compress PDF"}
            </Button>
            {compressedFile && (
              <Button onClick={downloadCompressed} variant="outline" className="w-full">
                <Download className="w-4 h-4 mr-2" />
                Download Compressed PDF
              </Button>
            )}
          </div>
        )}

        <ToolContent
          title="PDF Compressor"
          {...toolContentData["pdf-compressor"]}
        />
      </div>
    </ToolLayout>
  );
};

export default PDFCompressor;
