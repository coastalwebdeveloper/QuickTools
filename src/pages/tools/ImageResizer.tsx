import { useState } from "react";
import { Maximize2, Upload, Download } from "lucide-react";
import ToolLayout from "@/components/ToolLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const ImageResizer = () => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");
  const [width, setWidth] = useState<number>(800);
  const [height, setHeight] = useState<number>(600);
  const [resizedImage, setResizedImage] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setResizedImage("");
      
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target?.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const resizeImage = async () => {
    if (!file) return;

    setIsProcessing(true);
    try {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      img.onload = () => {
        canvas.width = width;
        canvas.height = height;
        ctx?.drawImage(img, 0, 0, width, height);
        
        const resizedDataUrl = canvas.toDataURL('image/jpeg', 0.9);
        setResizedImage(resizedDataUrl);
        toast.success("Image resized successfully!");
        setIsProcessing(false);
      };
      
      img.src = preview;
    } catch (error) {
      toast.error("Error resizing image");
      setIsProcessing(false);
    }
  };

  const downloadResized = () => {
    if (!resizedImage) return;
    
    const a = document.createElement('a');
    a.href = resizedImage;
    a.download = `resized-${width}x${height}-${file?.name || 'image.jpg'}`;
    a.click();
  };

  return (
    <ToolLayout
      title="Image Resizer"
      description="Resize images to any dimension"
      icon={Maximize2}
      iconColor="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
      toolId="image-resizer"
      tips={[
        "Upload images in any common format",
        "Set custom width and height dimensions",
        "Maintain aspect ratio for best results",
        "All processing happens locally"
      ]}
    >
      <div className="space-y-6">
        <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl p-8 text-center">
          <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Upload Image</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Select an image file to resize to your desired dimensions
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
              Choose Image File
            </label>
          </Button>
        </div>

        {file && preview && (
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold mb-4">Resize Settings</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Width (px)</label>
                  <Input
                    type="number"
                    value={width}
                    onChange={(e) => setWidth(Number(e.target.value))}
                    min="1"
                    max="5000"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Height (px)</label>
                  <Input
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(Number(e.target.value))}
                    min="1"
                    max="5000"
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Preview</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <p className="text-sm font-medium">Original</p>
                  <img src={preview} alt="Original" className="w-full h-48 object-cover rounded-lg border" />
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium">Resized ({width}x{height})</p>
                  {resizedImage ? (
                    <img src={resizedImage} alt="Resized" className="w-full h-48 object-cover rounded-lg border" />
                  ) : (
                    <div className="w-full h-48 bg-gray-100 dark:bg-gray-800 rounded-lg border flex items-center justify-center">
                      <p className="text-gray-500">Preview after resize</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <Button className="flex-1" onClick={resizeImage} disabled={isProcessing || !file}>
                <Maximize2 className="w-4 h-4 mr-2" />
                {isProcessing ? "Resizing..." : "Resize Image"}
              </Button>
              {resizedImage && (
                <Button onClick={downloadResized} variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  );
};

export default ImageResizer;