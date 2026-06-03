import { useState, useEffect } from "react";
import { QrCode, Download, Copy, Check, Link2, Type, Mail, Phone, Sparkles, AlertCircle } from "lucide-react";
import QRCode from "qrcode";
import ToolLayout from "@/components/ToolLayout";
import ToolContent from "@/components/ToolContent";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { toolContentData } from "@/lib/toolContent";
import { cn } from "@/lib/utils";

const quickExamples = [
  { label: "Website", value: "https://google.com", icon: Link2 },
  { label: "Plain Text", value: "Hello, World!", icon: Type },
  { label: "Email", value: "mailto:example@email.com", icon: Mail },
  { label: "Phone", value: "tel:+1234567890", icon: Phone },
];

const sizes = [
  { label: "S", value: 200 },
  { label: "M", value: 300 },
  { label: "L", value: 400 },
];

const QRGenerator = () => {
  const [text, setText] = useState("");
  const [qrDataUrl, setQrDataUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const [qrSize, setQrSize] = useState(300);
  const [darkColor, setDarkColor] = useState("#1a1a2e");
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    if (text.trim()) {
      generateQR();
    } else {
      setQrDataUrl("");
    }
  }, [text, qrSize, darkColor]);

  const generateQR = async () => {
    if (!text.trim()) return;
    setIsGenerating(true);
    try {
      const dataUrl = await QRCode.toDataURL(text, {
        width: qrSize,
        margin: 2,
        color: {
          dark: darkColor,
          light: "#ffffff",
        },
        errorCorrectionLevel: "H",
      });
      setQrDataUrl(dataUrl);
    } catch {
      toast.error("Failed to generate QR code");
    } finally {
      setIsGenerating(false);
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
      await navigator.clipboard.write([new ClipboardItem({ "image/png": blob })]);
      setCopied(true);
      toast.success("QR code copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Failed to copy QR code");
    }
  };

  const charCount = text.length;
  const maxChars = 2953;
  const isNearLimit = charCount > maxChars * 0.85;
  const isOverLimit = charCount > maxChars;

  return (
    <ToolLayout
      title="QR Code Generator"
      description="Generate QR codes for any text, URL, or data — instantly, free, and browser-only"
      icon={QrCode}
      iconColor="bg-indigo-500/10 text-indigo-600 dark:text-indigo-400"
      toolId="qr-generator"
      tips={[
        "Enter any text, URL, email, or phone number",
        "QR codes update instantly as you type",
        "Download as PNG for best quality printing",
        "Works offline — no data is sent to servers",
      ]}
    >
      <div className="space-y-6">
        {/* Two-column layout on md+ */}
        <div className="grid md:grid-cols-2 gap-6 items-start">

          {/* ── Left: Input Panel ── */}
          <div className="space-y-4">
            {/* Input label + char counter */}
            <div className="flex items-center justify-between mb-1">
              <label className="text-sm font-semibold text-foreground flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-primary" />
                Enter text or URL
              </label>
              <span className={cn(
                "text-xs font-mono px-2 py-0.5 rounded-full transition-colors",
                isOverLimit
                  ? "bg-red-100 dark:bg-red-950/40 text-red-600 dark:text-red-400"
                  : isNearLimit
                  ? "bg-amber-100 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400"
                  : "bg-muted text-muted-foreground"
              )}>
                {charCount}/{maxChars}
              </span>
            </div>

            {/* Textarea */}
            <div className="relative">
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="https://example.com&#10;or any text, email, phone..."
                className={cn(
                  "w-full min-h-[140px] resize-none rounded-2xl px-4 py-3.5 text-sm",
                  "bg-card border-2 outline-none font-mono leading-relaxed",
                  "placeholder:text-muted-foreground/40 text-foreground",
                  "transition-all duration-200",
                  isOverLimit
                    ? "border-red-400 focus:border-red-500 focus:shadow-[0_0_0_3px_rgba(239,68,68,0.15)]"
                    : "border-border focus:border-primary focus:shadow-[0_0_0_3px_rgba(91,92,240,0.15),0_0_20px_rgba(91,92,240,0.08)]"
                )}
              />
              {isOverLimit && (
                <div className="flex items-center gap-1.5 mt-1.5 text-xs text-red-500">
                  <AlertCircle className="w-3.5 h-3.5" />
                  Content too long for a QR code
                </div>
              )}
            </div>

            {/* Quick Examples */}
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Quick Examples</p>
              <div className="flex flex-wrap gap-2">
                {quickExamples.map((ex) => {
                  const ExIcon = ex.icon;
                  return (
                    <button
                      key={ex.value}
                      onClick={() => setText(ex.value)}
                      className={cn(
                        "flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium",
                        "border transition-all duration-200",
                        text === ex.value
                          ? "bg-primary/10 border-primary/40 text-primary"
                          : "bg-muted/60 border-border hover:border-primary/40 hover:bg-primary/5 hover:text-primary text-muted-foreground"
                      )}
                    >
                      <ExIcon className="w-3 h-3" />
                      {ex.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* QR Settings */}
            <div className="p-4 rounded-2xl bg-muted/40 border border-border/60 space-y-3">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">QR Settings</p>

              {/* Size */}
              <div className="flex items-center gap-3">
                <span className="text-xs text-muted-foreground w-12 shrink-0">Size</span>
                <div className="flex gap-1.5">
                  {sizes.map((s) => (
                    <button
                      key={s.value}
                      onClick={() => setQrSize(s.value)}
                      className={cn(
                        "w-9 h-9 rounded-xl text-xs font-bold border transition-all",
                        qrSize === s.value
                          ? "bg-primary text-white border-primary shadow-brand"
                          : "bg-card border-border hover:border-primary/40 text-muted-foreground"
                      )}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color */}
              <div className="flex items-center gap-3">
                <span className="text-xs text-muted-foreground w-12 shrink-0">Color</span>
                <div className="flex gap-2 flex-wrap">
                  {["#1a1a2e", "#5B5CF0", "#059669", "#dc2626", "#d97706", "#000000"].map((color) => (
                    <button
                      key={color}
                      onClick={() => setDarkColor(color)}
                      title={color}
                      className={cn(
                        "w-7 h-7 rounded-lg border-2 transition-all",
                        darkColor === color
                          ? "border-primary scale-110 shadow-brand"
                          : "border-transparent hover:scale-105"
                      )}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                  <label className="w-7 h-7 rounded-lg border-2 border-border hover:border-primary/40 cursor-pointer overflow-hidden transition-all" title="Custom color">
                    <input
                      type="color"
                      value={darkColor}
                      onChange={(e) => setDarkColor(e.target.value)}
                      className="w-8 h-8 -mt-0.5 -ml-0.5 cursor-pointer"
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* ── Right: QR Preview Panel ── */}
          <div className="flex flex-col items-center gap-4">
            {/* QR Card */}
            <div className={cn(
              "relative w-full flex items-center justify-center rounded-3xl p-6 qr-bg-grid",
              "bg-gradient-to-br from-muted/30 to-muted/10 border border-border/60",
              "min-h-[280px]"
            )}>
              {qrDataUrl ? (
                <div className={cn(
                  "qr-preview-card rounded-2xl p-4 transition-all duration-500",
                  isGenerating ? "opacity-50 scale-95" : "opacity-100 scale-100"
                )}>
                  <img
                    src={qrDataUrl}
                    alt="Generated QR Code"
                    className="w-52 h-52 block"
                    style={{ imageRendering: "pixelated" }}
                  />
                </div>
              ) : (
                <div className="flex flex-col items-center gap-3 text-center py-4">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 border-2 border-dashed border-primary/30 flex items-center justify-center">
                    <QrCode className="w-8 h-8 text-primary/50" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-muted-foreground">Your QR code appears here</p>
                    <p className="text-xs text-muted-foreground/60 mt-0.5">Start typing on the left</p>
                  </div>
                </div>
              )}

              {/* Corner dots for aesthetics */}
              {!qrDataUrl && (
                <>
                  <div className="absolute top-3 left-3 w-3 h-3 rounded-sm border-l-2 border-t-2 border-primary/20" />
                  <div className="absolute top-3 right-3 w-3 h-3 rounded-sm border-r-2 border-t-2 border-primary/20" />
                  <div className="absolute bottom-3 left-3 w-3 h-3 rounded-sm border-l-2 border-b-2 border-primary/20" />
                  <div className="absolute bottom-3 right-3 w-3 h-3 rounded-sm border-r-2 border-b-2 border-primary/20" />
                </>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 w-full">
              <Button
                onClick={handleDownload}
                disabled={!qrDataUrl}
                className="flex-1 gradient-bg border-0 text-white shadow-brand hover:shadow-brand-lg btn-glow transition-all"
              >
                <Download className="w-4 h-4 mr-2" />
                Download PNG
              </Button>
              <Button
                onClick={handleCopyImage}
                disabled={!qrDataUrl}
                variant="outline"
                className="flex-1 border-2 hover:border-primary/40 hover:bg-primary/5 transition-all"
              >
                {copied ? (
                  <Check className="w-4 h-4 mr-2 text-emerald-500" />
                ) : (
                  <Copy className="w-4 h-4 mr-2" />
                )}
                {copied ? "Copied!" : "Copy Image"}
              </Button>
            </div>

            {/* Info note */}
            {qrDataUrl && (
              <p className="text-xs text-muted-foreground text-center">
                High error-correction QR (Level H) · {qrSize}×{qrSize}px
              </p>
            )}
          </div>
        </div>

        <ToolContent
          title="QR Code Generator"
          {...toolContentData["qr-generator"]}
        />
      </div>
    </ToolLayout>
  );
};

export default QRGenerator;
