import { useState, useEffect, useRef } from "react";
import { QrCode, Download, Copy, Check } from "lucide-react";
import QRCode from "qrcode";
import ToolLayout from "@/components/ToolLayout";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const QRGenerator = () => {
  const [text, setText] = useState("");
  const [qrDataUrl, setQrDataUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (text.trim()) {
      generateQR();
    } else {
      setQrDataUrl("");
    }
  }, [text]);

  const generateQR = async () => {
    if (!text.trim()) return;

    try {
      const dataUrl = await QRCode.toDataURL(text, {
        width: 300,
        margin: 2,
        color: {
          dark: "#000000",
          light: "#ffffff",
        },
      });
      setQrDataUrl(dataUrl);
    } catch (error) {
      toast.error("Failed to generate QR code");
    }
  };

  const handleDownload = () => {
    if (!qrDataUrl) return;

    const link = document.createElement("a");
    link.download = "qrcode.png";
    link.href = qrDataUrl;
    link.click();
    toast.success("QR code downloaded!");
  };

  const handleCopyImage = async () => {
    if (!qrDataUrl) return;

    try {
      const response = await fetch(qrDataUrl);
      const blob = await response.blob();
      await navigator.clipboard.write([
        new ClipboardItem({ "image/png": blob }),
      ]);
      setCopied(true);
      toast.success("QR code copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast.error("Failed to copy QR code");
    }
  };

  return (
    <ToolLayout
      title="QR Code Generator"
      description="Generate QR codes for any text, URL, or data"
      icon={QrCode}
      iconColor="bg-indigo-500/10 text-indigo-600 dark:text-indigo-400"
      toolId="qr-generator"
      tips={[
        "Enter any text, URL, email, or phone number",
        "QR codes are generated instantly as you type",
        "Download as PNG for best quality",
        "Works offline - no data is sent to servers",
      ]}
    >
      <div className="space-y-6">
        {/* Input */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Enter text or URL
          </label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="https://example.com or any text..."
            className="w-full h-32 input-modern resize-none"
          />
        </div>

        {/* QR Code Display */}
        <div className="flex flex-col items-center">
          <div className="p-6 bg-white rounded-2xl shadow-lg border border-border">
            {qrDataUrl ? (
              <img
                src={qrDataUrl}
                alt="Generated QR Code"
                className="w-64 h-64"
              />
            ) : (
              <div className="w-64 h-64 flex items-center justify-center bg-secondary/50 rounded-xl">
                <p className="text-muted-foreground text-center px-4">
                  Enter text above to generate a QR code
                </p>
              </div>
            )}
          </div>
          <canvas ref={canvasRef} className="hidden" />
        </div>

        {/* Actions */}
        <div className="flex flex-wrap justify-center gap-3">
          <Button
            onClick={handleDownload}
            disabled={!qrDataUrl}
            className="btn-primary"
          >
            <Download className="w-4 h-4 mr-2" />
            Download PNG
          </Button>
          <Button
            onClick={handleCopyImage}
            disabled={!qrDataUrl}
            variant="outline"
            className="btn-secondary"
          >
            {copied ? (
              <Check className="w-4 h-4 mr-2" />
            ) : (
              <Copy className="w-4 h-4 mr-2" />
            )}
            {copied ? "Copied!" : "Copy Image"}
          </Button>
        </div>

        {/* Quick Examples */}
        <div className="pt-4 border-t border-border">
          <p className="text-sm text-muted-foreground mb-3">Quick examples:</p>
          <div className="flex flex-wrap gap-2">
            {[
              "https://google.com",
              "Hello World!",
              "tel:+1234567890",
              "mailto:example@email.com",
            ].map((example) => (
              <button
                key={example}
                onClick={() => setText(example)}
                className="px-3 py-1.5 text-sm bg-secondary hover:bg-secondary/80 rounded-lg transition-colors"
              >
                {example.length > 20 ? example.slice(0, 20) + "..." : example}
              </button>
            ))}
          </div>
        </div>
      </div>
    </ToolLayout>
  );
};

export default QRGenerator;
