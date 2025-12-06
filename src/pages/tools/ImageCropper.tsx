import { useState, useRef } from "react";
import { Crop, Download } from "lucide-react";
import ToolLayout from "@/components/ToolLayout";
import ToolContent from "@/components/ToolContent";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { toolContentData } from "@/lib/toolContent";

const ImageCropper = () => {
  const [image, setImage] = useState<string | null>(null);
  const [cropped, setCropped] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setImage(e.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const cropImage = () => {
    if (!image) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.onload = () => {
      const size = Math.min(img.width, img.height);
      canvas.width = size;
      canvas.height = size;
      ctx?.drawImage(img, (img.width - size) / 2, (img.height - size) / 2, size, size, 0, 0, size, size);
      setCropped(canvas.toDataURL());
      toast.success("Image cropped to square!");
    };
    img.src = image;
  };

  const downloadCropped = () => {
    if (!cropped) return;
    const link = document.createElement("a");
    link.download = "cropped-image.png";
    link.href = cropped;
    link.click();
  };

  return (
    <ToolLayout
      title="Image Cropper"
      description="Crop and resize your images"
      icon={Crop}
      iconColor="bg-teal-500/10 text-teal-600 dark:text-teal-400"
      toolId="image-cropper"
      tips={["Upload any image format", "Crop to square automatically"]}
    >
      <div className="space-y-4">
        <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
            id="image-upload"
          />
          <label htmlFor="image-upload" className="cursor-pointer">
            <Crop className="w-12 h-12 mx-auto mb-3 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">Click to upload image</p>
          </label>
        </div>

        {image && (
          <>
            <img src={image} alt="Original" className="w-full rounded-lg border border-border" />
            <Button onClick={cropImage} className="btn-primary w-full">
              Crop to Square
            </Button>
          </>
        )}

        <canvas ref={canvasRef} className="hidden" />

        {cropped && (
          <div className="space-y-3">
            <h3 className="text-sm font-medium">Cropped Image:</h3>
            <img src={cropped} alt="Cropped" className="w-full rounded-lg border border-border" />
            <Button onClick={downloadCropped} className="w-full">
              <Download className="w-4 h-4 mr-2" />
              Download Cropped Image
            </Button>
          </div>
        )}

        <ToolContent
          title="Image Cropper"
          {...toolContentData["image-cropper"]}
        />
      </div>
    </ToolLayout>
  );
};

export default ImageCropper;
