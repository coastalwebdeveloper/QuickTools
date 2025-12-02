import { useState } from "react";
import { Minimize2, Upload, Download } from "lucide-react";
import ToolLayout from "@/components/ToolLayout";
import { Button } from "@/components/ui/button";
import imageCompression from "browser-image-compression";
import { toast } from "sonner";

const ImageCompressor = () => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");
  const [compressedFile, setCompressedFile] = useState<File | null>(null);
  const [compressedPreview, setCompressedPreview] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setCompressedFile(null);
      setCompressedPreview("");
      
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target?.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const compressImage = async () => {
    if (!file) return;

    setIsProcessing(true);
    try {
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
      };
      
      const compressed = await imageCompression(file, options);
      setCompressedFile(compressed);
      
      const reader = new FileReader();
      reader.onload = (e) => {
        setCompressedPreview(e.target?.result as string);
      };
      reader.readAsDataURL(compressed);
      
      toast.success("Image compressed successfully!");
    } catch (error) {
      toast.error("Error compressing image");
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadCompressed = () => {
    if (!compressedFile) return;
    
    const url = URL.createObjectURL(compressedFile);
    const a = document.createElement('a');
    a.href = url;
    a.download = `compressed-${file?.name || 'image'}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <ToolLayout
      title="Image Compressor"
      description="Reduce image file size while maintaining quality"
      icon={Minimize2}
      iconColor="bg-green-500/10 text-green-600 dark:text-green-400"
      toolId="image-compressor"
      tips={[
        "Upload images in JPG, PNG, or WebP format",
        "Compression happens in your browser",
        "No images are uploaded to any server",
        "Adjust quality to balance size and appearance"
      ]}
    >
      <div className="space-y-6">
        <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl p-8 text-center">
          <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Upload Image</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Select an image file to compress and reduce its size
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
          <div className="space-y-4">
            <h3 className="font-semibold">Image Preview</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <p className="text-sm font-medium">Original</p>
                <img src={preview} alt="Original" className="w-full h-48 object-cover rounded-lg border" />
                <p className="text-sm text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium">Compressed</p>
                {compressedPreview ? (
                  <>
                    <img src={compressedPreview} alt="Compressed" className="w-full h-48 object-cover rounded-lg border" />
                    <p className="text-sm text-gray-500">{compressedFile ? (compressedFile.size / 1024 / 1024).toFixed(2) : '0'} MB</p>
                  </>
                ) : (
                  <>
                    <div className="w-full h-48 bg-gray-100 dark:bg-gray-800 rounded-lg border flex items-center justify-center">
                      <p className="text-gray-500">Preview after compression</p>
                    </div>
                    <p className="text-sm text-gray-500">Size after compression</p>
                  </>
                )}
              </div>
            </div>
            <div className="flex gap-2">
              <Button className="flex-1" onClick={compressImage} disabled={isProcessing || !file}>
                <Minimize2 className="w-4 h-4 mr-2" />
                {isProcessing ? "Compressing..." : "Compress Image"}
              </Button>
              {compressedFile && (
                <Button onClick={downloadCompressed} variant="outline">
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

export default ImageCompressor;