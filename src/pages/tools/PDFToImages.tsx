import { useState, useEffect } from "react";
import { FileImage, Download } from "lucide-react";
import ToolLayout from "@/components/ToolLayout";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import * as pdfjsLib from "pdfjs-dist";

const PDFToImages = () => {
  const [file, setFile] = useState<File | null>(null);
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.mjs';
  }, []);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile);
      setImages([]);
      toast.success("PDF loaded! Click convert to extract images.");
    } else {
      toast.error("Please select a valid PDF file");
    }
  };

  const convertPDF = async () => {
    if (!file) return;
    setLoading(true);
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      const imageUrls: string[] = [];

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: 1.5 });
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        
        if (!context) continue;
        
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        await page.render({ canvasContext: context, viewport }).promise;
        imageUrls.push(canvas.toDataURL("image/png"));
      }

      setImages(imageUrls);
      toast.success(`Converted ${imageUrls.length} pages to images!`);
    } catch (error: any) {
      console.error("PDF Conversion Error:", error);
      toast.error(error?.message || "Failed to convert PDF");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ToolLayout
      title="PDF to Images"
      description="Convert PDF pages to image files"
      icon={FileImage}
      iconColor="bg-amber-500/10 text-amber-600 dark:text-amber-400"
      tips={["Convert each PDF page to an image", "Download images individually"]}
    >
      <div className="space-y-4">
        <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
          <input
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
            className="hidden"
            id="pdf-upload"
          />
          <label htmlFor="pdf-upload" className="cursor-pointer">
            <FileImage className="w-12 h-12 mx-auto mb-3 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              {file ? file.name : "Click to upload PDF"}
            </p>
          </label>
        </div>

        {file && (
          <Button onClick={convertPDF} disabled={loading} className="btn-primary w-full">
            {loading ? "Converting..." : "Convert to Images"}
          </Button>
        )}

        {images.length > 0 && (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">{images.length} page(s) converted</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {images.map((img, i) => (
                <div key={i} className="border border-border rounded-lg p-2">
                  <img src={img} alt={`Page ${i + 1}`} className="w-full rounded" />
                  <Button
                    size="sm"
                    className="w-full mt-2"
                    onClick={() => {
                      const link = document.createElement("a");
                      link.download = `page-${i + 1}.png`;
                      link.href = img;
                      link.click();
                    }}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download Page {i + 1}
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  );
};

export default PDFToImages;
