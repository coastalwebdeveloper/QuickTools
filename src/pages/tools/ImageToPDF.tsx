import { useState } from "react";
import { FileText, Upload, Download, X } from "lucide-react";
import ToolLayout from "@/components/ToolLayout";
import ToolContent from "@/components/ToolContent";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { PDFDocument } from "pdf-lib";
import { saveAs } from "file-saver";
import { toolContentData } from "@/lib/toolContent";

const ImageToPDF = () => {
  const [images, setImages] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const imageFiles = files.filter(file => file.type.startsWith('image/'));
      if (imageFiles.length !== files.length) {
        toast.error("Some files were not images and were skipped");
      }
      setImages(prev => [...prev, ...imageFiles]);
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const moveImage = (index: number, direction: 'up' | 'down') => {
    const newImages = [...images];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex >= 0 && newIndex < images.length) {
      [newImages[index], newImages[newIndex]] = [newImages[newIndex], newImages[index]];
      setImages(newImages);
    }
  };

  const createPDF = async () => {
    if (images.length === 0) {
      toast.error("Please add at least one image");
      return;
    }

    setIsProcessing(true);
    try {
      const pdfDoc = await PDFDocument.create();

      for (const imageFile of images) {
        const imageBytes = await imageFile.arrayBuffer();
        let image;

        if (imageFile.type === 'image/png') {
          image = await pdfDoc.embedPng(imageBytes);
        } else if (imageFile.type === 'image/jpeg' || imageFile.type === 'image/jpg') {
          image = await pdfDoc.embedJpg(imageBytes);
        } else {
          continue;
        }

        const page = pdfDoc.addPage();
        const { width: pageWidth, height: pageHeight } = page.getSize();
        const { width: imgWidth, height: imgHeight } = image.scale(1);

        const scale = Math.min(
          pageWidth / imgWidth,
          pageHeight / imgHeight
        );

        const scaledWidth = imgWidth * scale;
        const scaledHeight = imgHeight * scale;

        page.drawImage(image, {
          x: (pageWidth - scaledWidth) / 2,
          y: (pageHeight - scaledHeight) / 2,
          width: scaledWidth,
          height: scaledHeight,
        });
      }

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      saveAs(blob, 'images.pdf');
      toast.success("PDF created successfully!");
    } catch (error) {
      toast.error("Error creating PDF");
    } finally {
      setIsProcessing(false);
    }
  };

  const relatedTools = [
    { name: "PDF to Images", path: "/tools/pdf-to-images" },
    { name: "Image Compressor", path: "/tools/image-compressor" },
    { name: "Merge PDF", path: "/tools/pdf-merge" },
    { name: "PDF Compressor", path: "/tools/pdf-compressor" }
  ];

  return (
    <ToolLayout
      title="Image to PDF"
      description="Convert images to PDF documents"
      icon={FileText}
      iconColor="bg-teal-500/10 text-teal-600 dark:text-teal-400"
      toolId="image-to-pdf"
      tips={[
        "Supports JPG, PNG, and WebP formats",
        "Add multiple images to create multi-page PDF",
        "Drag to reorder images",
        "All processing happens in your browser"
      ]}
    >
      <div className="space-y-6">
        <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl p-8 text-center">
          <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Upload Images</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Select one or multiple images to convert to PDF
          </p>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileUpload}
            className="hidden"
            id="image-upload"
          />
          <Button asChild>
            <label htmlFor="image-upload" className="cursor-pointer">
              Choose Images
            </label>
          </Button>
        </div>

        {images.length > 0 && (
          <div className="space-y-4">
            <div className="space-y-2">
              <h3 className="font-semibold">Selected Images ({images.length})</h3>
              {images.map((image, index) => (
                <div key={index} className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <span className="text-sm flex-1">{image.name}</span>
                  <div className="flex gap-1">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => moveImage(index, 'up')}
                      disabled={index === 0}
                    >
                      ↑
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => moveImage(index, 'down')}
                      disabled={index === images.length - 1}
                    >
                      ↓
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => removeImage(index)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <Button onClick={createPDF} disabled={isProcessing} className="w-full">
              <Download className="w-4 h-4 mr-2" />
              {isProcessing ? "Creating PDF..." : "Create PDF"}
            </Button>
          </div>
        )}

        <ToolContent
          title="Image to PDF Converter"
          {...toolContentData["image-to-pdf"]}
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

export default ImageToPDF;
