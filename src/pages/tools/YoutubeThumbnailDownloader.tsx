import { useState } from "react";
import { Youtube, Download, Search } from "lucide-react";
import ToolLayout from "@/components/ToolLayout";
import ToolContent from "@/components/ToolContent";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { toolContentData } from "@/lib/toolContent";

const YoutubeThumbnailDownloader = () => {
  const [url, setUrl] = useState("");
  const [videoId, setVideoId] = useState("");
  const [thumbnails, setThumbnails] = useState<any[]>([]);

  const extractVideoId = (input: string) => {
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/,
      /^([a-zA-Z0-9_-]{11})$/
    ];
    
    for (const pattern of patterns) {
      const match = input.match(pattern);
      if (match) return match[1];
    }
    return null;
  };

  const getThumbnails = () => {
    const id = extractVideoId(url);
    if (!id) {
      toast.error("Invalid YouTube URL or Video ID");
      return;
    }

    setVideoId(id);
    setThumbnails([
      { quality: "Max Resolution", url: `https://img.youtube.com/vi/${id}/maxresdefault.jpg`, size: "1920x1080" },
      { quality: "Standard", url: `https://img.youtube.com/vi/${id}/sddefault.jpg`, size: "640x480" },
      { quality: "High Quality", url: `https://img.youtube.com/vi/${id}/hqdefault.jpg`, size: "480x360" },
      { quality: "Medium Quality", url: `https://img.youtube.com/vi/${id}/mqdefault.jpg`, size: "320x180" },
      { quality: "Default", url: `https://img.youtube.com/vi/${id}/default.jpg`, size: "120x90" }
    ]);
    toast.success("Thumbnails loaded!");
  };

  const downloadThumbnail = async (thumbnailUrl: string, quality: string) => {
    try {
      const response = await fetch(thumbnailUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `youtube-thumbnail-${videoId}-${quality.toLowerCase().replace(/\s/g, '-')}.jpg`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      toast.success("Thumbnail downloaded!");
    } catch (error) {
      toast.error("Error downloading thumbnail");
    }
  };

  const relatedTools = [
    { name: "Image Compressor", path: "/tools/image-compressor" },
    { name: "Image Resizer", path: "/tools/image-resizer" },
    { name: "Image to WebP", path: "/tools/image-to-webp" },
    { name: "QR Code Generator", path: "/tools/qr-generator" }
  ];

  return (
    <ToolLayout
      title="YouTube Thumbnail Downloader"
      description="Download YouTube video thumbnails in high quality"
      icon={Youtube}
      iconColor="bg-red-500/10 text-red-600 dark:text-red-400"
      toolId="youtube-thumbnail-downloader"
      tips={[
        "Paste YouTube video URL or video ID",
        "Download thumbnails in multiple resolutions",
        "Works with any public YouTube video",
        "No video downloading - thumbnails only"
      ]}
    >
      <div className="space-y-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">YouTube Video URL or ID</label>
            <div className="flex gap-2">
              <Input
                placeholder="https://youtube.com/watch?v=... or video ID"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
              <Button onClick={getThumbnails}>
                <Search className="w-4 h-4 mr-2" />
                Get Thumbnails
              </Button>
            </div>
          </div>
        </div>

        {thumbnails.length > 0 && (
          <div className="space-y-4">
            <h3 className="font-semibold">Available Thumbnails</h3>
            <div className="grid gap-4">
              {thumbnails.map((thumb, index) => (
                <div key={index} className="border rounded-lg p-4 space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">{thumb.quality}</p>
                      <p className="text-sm text-gray-500">{thumb.size}</p>
                    </div>
                    <Button size="sm" onClick={() => downloadThumbnail(thumb.url, thumb.quality)}>
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </div>
                  <img 
                    src={thumb.url} 
                    alt={thumb.quality}
                    className="w-full rounded border"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        <ToolContent
          title="YouTube Thumbnail Downloader"
          {...toolContentData["youtube-thumbnail-downloader"]}
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

export default YoutubeThumbnailDownloader;
