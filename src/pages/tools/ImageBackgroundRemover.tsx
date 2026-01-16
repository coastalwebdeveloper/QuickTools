import { useState } from "react";
import { ImageMinus, Upload, Download } from "lucide-react";
import ToolLayout from "@/components/ToolLayout";
import ToolContent from "@/components/ToolContent";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { removeBackground } from "@imgly/background-removal";
import { toolContentData } from "@/lib/toolContent";

const ImageBackgroundRemover = () => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [processedImage, setProcessedImage] = useState("");
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
      setProcessedImage("");
    }
  };

  const removeBackgroundFromImage = async () => {
    if (!file) return;
    setIsProcessing(true);
    
    try {
      const blob = await removeBackground(file);
      const url = URL.createObjectURL(blob);
      setProcessedImage(url);
      toast.success("Background removed successfully!");
    } catch (error) {
      toast.error("Error removing background");
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadImage = () => {
    const a = document.createElement('a');
    a.href = processedImage;
    a.download = `no-bg-${file?.name.split('.')[0]}.png`;
    a.click();
  };

  return (
    <ToolLayout
      title="Image Background Remover"
      description="Remove backgrounds from images automatically"
      icon={ImageMinus}
      iconColor="bg-blue-500/10 text-blue-600 dark:text-blue-400"
      toolId="image-background-remover"
      tips={[
        "Upload images in JPG, PNG, or WebP format",
        "AI-powered background removal",
        "All processing happens in your browser",
        "No images are uploaded to any server"
      ]}
    >
      <div className="space-y-6">
        <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl p-8 text-center">
          <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Upload Image</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Select an image to remove its background
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium mb-2">Original</p>
                <img src={preview} alt="Original" className="w-full rounded-lg border" />
              </div>
              <div>
                <p className="text-sm font-medium mb-2">Background Removed</p>
                {processedImage ? (
                  <div className="relative">
                    <div className="absolute inset-0 rounded-lg" style={{background: 'repeating-conic-gradient(#e5e7eb 0% 25%, #f3f4f6 0% 50%) 50% / 20px 20px'}} />
                    <img src={processedImage} alt="Processed" className="relative w-full rounded-lg" />
                  </div>
                ) : (
                  <div className="w-full h-48 bg-gray-100 dark:bg-gray-800 rounded-lg border flex items-center justify-center">
                    <p className="text-gray-500">Preview after processing</p>
                  </div>
                )}
              </div>
            </div>
            <Button onClick={removeBackgroundFromImage} disabled={isProcessing} className="w-full">
              <ImageMinus className="w-4 h-4 mr-2" />
              {isProcessing ? "Removing Background..." : "Remove Background"}
            </Button>
            {processedImage && (
              <Button onClick={downloadImage} variant="outline" className="w-full">
                <Download className="w-4 h-4 mr-2" />
                Download PNG
              </Button>
            )}
          </div>
        )}

        <ToolContent
          title="Image Background Remover"
          {...toolContentData["image-background-remover"]}
        />
      </div>
    </ToolLayout>
  );
};

export default ImageBackgroundRemover;
