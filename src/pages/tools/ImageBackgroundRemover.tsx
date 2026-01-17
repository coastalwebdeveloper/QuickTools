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
  const [progress, setProgress] = useState(0);
  const [showComparison, setShowComparison] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    if (!selectedFile.type.startsWith('image/')) {
      toast.error("❌ Unsupported format. Please upload JPG, PNG, or WebP.");
      return;
    }

    if (selectedFile.size > 5 * 1024 * 1024) {
      toast.error("❌ File too large (Max 5MB).");
      return;
    }

    setFile(selectedFile);
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target?.result as string);
    };
    reader.readAsDataURL(selectedFile);
    setProcessedImage("");
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      const fakeEvent = { target: { files: [droppedFile] } } as any;
      handleFileUpload(fakeEvent);
    }
  };

  const removeBackgroundFromImage = async () => {
    if (!file) return;
    setIsProcessing(true);
    setProgress(0);
    
    const messages = [
      "Removing background…",
      "AI is detecting edges…",
      "Processing image…",
      "Almost done ✨"
    ];
    let msgIndex = 0;
    
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 90) return prev;
        return prev + 10;
      });
      msgIndex = (msgIndex + 1) % messages.length;
    }, 800);
    
    try {
      const blob = await removeBackground(file);
      clearInterval(progressInterval);
      setProgress(100);
      const url = URL.createObjectURL(blob);
      setProcessedImage(url);
      toast.success("✅ Background removed successfully! Your image is ready to download.");
    } catch (error) {
      clearInterval(progressInterval);
      toast.error("Error removing background");
    } finally {
      setIsProcessing(false);
      setTimeout(() => setProgress(0), 1000);
    }
  };

  const downloadImage = () => {
    const a = document.createElement('a');
    a.href = processedImage;
    a.download = `${file?.name.split('.')[0]}-bg-removed.png`;
    a.click();
    toast.success("Image downloaded!");
  };

  return (
    <ToolLayout
      title="Image Background Remover"
      description="Remove backgrounds from images automatically"
      icon={ImageMinus}
      iconColor="bg-blue-500/10 text-blue-600 dark:text-blue-400"
      toolId="image-background-remover"
      tips={[
        "⏱ Average processing time: 5–10 seconds",
        "🔒 100% Browser-Based · No Uploads · No Storage",
        "Supports JPG, PNG, WebP (Max 5MB)",
        "AI-powered background removal"
      ]}
    >
      <div className="space-y-6">
        <div 
          className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl p-8 text-center hover:border-primary/50 transition-colors"
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
        >
          <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Upload Image</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Drag & drop an image here or click to upload
          </p>
          <p className="text-xs text-gray-500 mb-4">
            Supports JPG, PNG, WebP · Max 5MB
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
            {processedImage && (
              <div className="flex items-center justify-center gap-2 mb-4">
                <Button
                  size="sm"
                  variant={showComparison ? "outline" : "default"}
                  onClick={() => setShowComparison(false)}
                >
                  Show Result
                </Button>
                <Button
                  size="sm"
                  variant={showComparison ? "default" : "outline"}
                  onClick={() => setShowComparison(true)}
                >
                  Compare
                </Button>
              </div>
            )}
            
            <div className={`grid gap-4 ${showComparison && processedImage ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'}`}>
              {(!processedImage || showComparison) && (
                <div>
                  <p className="text-sm font-medium mb-2">Original</p>
                  <img src={preview} alt="Original" className="w-full rounded-lg border" />
                </div>
              )}
              {processedImage && (
                <div>
                  <p className="text-sm font-medium mb-2">Background Removed</p>
                  <div className="relative">
                    <div className="absolute inset-0 rounded-lg" style={{background: 'repeating-conic-gradient(#e5e7eb 0% 25%, #f3f4f6 0% 50%) 50% / 20px 20px'}} />
                    <img src={processedImage} alt="Processed" className="relative w-full rounded-lg" />
                  </div>
                </div>
              )}
              {!processedImage && isProcessing && (
                <div>
                  <p className="text-sm font-medium mb-2">Processing...</p>
                  <div className="w-full h-64 bg-gray-100 dark:bg-gray-800 rounded-lg border flex flex-col items-center justify-center gap-4">
                    <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                    <p className="text-sm text-gray-600">AI is detecting edges…</p>
                    <div className="w-64 bg-gray-200 rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full transition-all" style={{width: `${progress}%`}} />
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <Button 
              onClick={removeBackgroundFromImage} 
              disabled={isProcessing || !!processedImage} 
              className="w-full"
            >
              <ImageMinus className="w-4 h-4 mr-2" />
              {isProcessing ? "Removing Background..." : processedImage ? "Background Removed" : "Remove Background"}
            </Button>
            
            {processedImage && (
              <div className="space-y-2">
                <Button onClick={downloadImage} className="w-full">
                  <Download className="w-4 h-4 mr-2" />
                  Download PNG (Transparent)
                </Button>
              </div>
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
