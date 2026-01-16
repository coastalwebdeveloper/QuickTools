import { useState } from "react";
import { RefreshCw, Upload, Download } from "lucide-react";
import ToolLayout from "@/components/ToolLayout";
import ToolContent from "@/components/ToolContent";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";
import { toolContentData } from "@/lib/toolContent";

const ImageToWebP = () => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [convertedImage, setConvertedImage] = useState("");
  const [quality, setQuality] = useState([80]);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target?.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const convertToWebP = async () => {
    if (!file || !preview) return;
    setIsProcessing(true);
    
    try {
      const img = new Image();
      img.src = preview;
      await new Promise((resolve) => { img.onload = resolve; });
      
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      
      ctx.drawImage(img, 0, 0);
      const webpData = canvas.toDataURL('image/webp', quality[0] / 100);
      setConvertedImage(webpData);
      toast.success("Image converted to WebP!");
    } catch (error) {
      toast.error("Error converting image");
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadImage = () => {
    const a = document.createElement('a');
    a.href = convertedImage;
    a.download = `${file?.name.split('.')[0]}.webp`;
    a.click();
  };

  return (
    <ToolLayout
      title="Image to WebP Converter"
      description="Convert images to WebP format for better compression"
      icon={RefreshCw}
      iconColor="bg-green-500/10 text-green-600 dark:text-green-400"
      toolId="image-to-webp"
      tips={[
        "Upload images in JPG, PNG, or other formats",
        "WebP provides better compression than JPEG and PNG",
        "All processing happens in your browser",
        "No images are uploaded to any server"
      ]}
    >
      <div className="space-y-6">
        <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl p-8 text-center">
          <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Upload Image</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Select an image to convert to WebP format
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

        {preview && (
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Quality: {quality[0]}%</label>
              <Slider value={quality} onValueChange={setQuality} min={1} max={100} step={1} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium mb-2">Original</p>
                <img src={preview} alt="Original" className="w-full rounded-lg border" />
              </div>
              <div>
                <p className="text-sm font-medium mb-2">WebP Preview</p>
                {convertedImage ? (
                  <img src={convertedImage} alt="Converted" className="w-full rounded-lg border" />
                ) : (
                  <div className="w-full h-48 bg-gray-100 dark:bg-gray-800 rounded-lg border flex items-center justify-center">
                    <p className="text-gray-500">Preview after conversion</p>
                  </div>
                )}
              </div>
            </div>
            <Button onClick={convertToWebP} disabled={isProcessing} className="w-full">
              <RefreshCw className="w-4 h-4 mr-2" />
              {isProcessing ? "Converting..." : "Convert to WebP"}
            </Button>
            {convertedImage && (
              <Button onClick={downloadImage} variant="outline" className="w-full">
                <Download className="w-4 h-4 mr-2" />
                Download WebP
              </Button>
            )}
          </div>
        )}

        <ToolContent
          title="Image to WebP Converter"
          {...toolContentData["image-to-webp"]}
        />
      </div>
    </ToolLayout>
  );
};

export default ImageToWebP;
