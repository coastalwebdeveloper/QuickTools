import { useState } from "react";
import { FileOutput, Upload, Download } from "lucide-react";
import ToolLayout from "@/components/ToolLayout";
import ToolContent from "@/components/ToolContent";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import mammoth from "mammoth";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import { saveAs } from "file-saver";
import { toolContentData } from "@/lib/toolContent";

const WordToPDF = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [pdfData, setPdfData] = useState<Uint8Array | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (!selectedFile.name.endsWith('.docx')) {
        toast.error("Please select a .docx file");
        return;
      }
      setFile(selectedFile);
      setPdfData(null);
    }
  };

  const convertToPDF = async () => {
    if (!file) return;

    setIsProcessing(true);
    try {
      const arrayBuffer = await file.arrayBuffer();
      const result = await mammoth.extractRawText({ arrayBuffer });
      const text = result.value;

      const pdfDoc = await PDFDocument.create();
      const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
      const fontSize = 12;
      const margin = 50;
      const pageWidth = 595;
      const pageHeight = 842;
      const maxWidth = pageWidth - 2 * margin;

      let page = pdfDoc.addPage([pageWidth, pageHeight]);
      let yPosition = pageHeight - margin;

      const lines = text.split('\n');
      for (const line of lines) {
        const words = line.split(' ');
        let currentLine = '';

        for (const word of words) {
          const testLine = currentLine + word + ' ';
          const width = font.widthOfTextAtSize(testLine, fontSize);

          if (width > maxWidth && currentLine) {
            page.drawText(currentLine, {
              x: margin,
              y: yPosition,
              size: fontSize,
              font,
              color: rgb(0, 0, 0),
            });
            yPosition -= fontSize + 5;
            currentLine = word + ' ';

            if (yPosition < margin) {
              page = pdfDoc.addPage([pageWidth, pageHeight]);
              yPosition = pageHeight - margin;
            }
          } else {
            currentLine = testLine;
          }
        }

        if (currentLine) {
          page.drawText(currentLine, {
            x: margin,
            y: yPosition,
            size: fontSize,
            font,
            color: rgb(0, 0, 0),
          });
          yPosition -= fontSize + 5;

          if (yPosition < margin) {
            page = pdfDoc.addPage([pageWidth, pageHeight]);
            yPosition = pageHeight - margin;
          }
        }
      }

      const pdfBytes = await pdfDoc.save();
      setPdfData(pdfBytes);
      toast.success("Word document converted to PDF!");
    } catch (error) {
      toast.error("Error converting Word document");
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadPDF = () => {
    if (pdfData) {
      const blob = new Blob([pdfData], { type: 'application/pdf' });
      saveAs(blob, `${file?.name.replace('.docx', '')}.pdf`);
    }
  };

  const relatedTools = [
    { name: "PDF to Word", path: "/tools/pdf-to-word" },
    { name: "PDF Compressor", path: "/tools/pdf-compressor" },
    { name: "Merge PDF", path: "/tools/pdf-merge" },
    { name: "Image to PDF", path: "/tools/image-to-pdf" }
  ];

  return (
    <ToolLayout
      title="Word to PDF"
      description="Convert Word documents to PDF format"
      icon={FileOutput}
      iconColor="bg-indigo-500/10 text-indigo-600 dark:text-indigo-400"
      toolId="word-to-pdf"
      tips={[
        "Supports .docx format only",
        "Maintains text content and structure",
        "All processing happens in your browser",
        "No files uploaded to servers"
      ]}
    >
      <div className="space-y-6">
        <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl p-8 text-center">
          <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Upload Word Document</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Select a .docx file to convert to PDF
          </p>
          <input
            type="file"
            accept=".docx"
            onChange={handleFileUpload}
            className="hidden"
            id="word-upload"
          />
          <Button asChild>
            <label htmlFor="word-upload" className="cursor-pointer">
              Choose Word File
            </label>
          </Button>
        </div>

        {file && (
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <p className="text-sm font-medium">Selected: {file.name}</p>
              <p className="text-sm text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
            </div>
            <Button onClick={convertToPDF} disabled={isProcessing} className="w-full">
              <FileOutput className="w-4 h-4 mr-2" />
              {isProcessing ? "Converting..." : "Convert to PDF"}
            </Button>
            {pdfData && (
              <Button onClick={downloadPDF} className="w-full">
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </Button>
            )}
          </div>
        )}

        <ToolContent
          title="Word to PDF Converter"
          {...toolContentData["word-to-pdf"]}
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

export default WordToPDF;
