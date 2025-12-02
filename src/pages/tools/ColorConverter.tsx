import { useState, useEffect } from "react";
import { Palette, Copy, Check } from "lucide-react";
import ToolLayout from "@/components/ToolLayout";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface ColorValues {
  hex: string;
  rgb: { r: number; g: number; b: number };
  hsl: { h: number; s: number; l: number };
}

const ColorConverter = () => {
  const [color, setColor] = useState<ColorValues>({
    hex: "#6366f1",
    rgb: { r: 99, g: 102, b: 241 },
    hsl: { h: 239, s: 84, l: 67 },
  });
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const hexToRgb = (hex: string): { r: number; g: number; b: number } | null => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  };

  const rgbToHex = (r: number, g: number, b: number): string => {
    return (
      "#" +
      [r, g, b]
        .map((x) => {
          const hex = Math.max(0, Math.min(255, x)).toString(16);
          return hex.length === 1 ? "0" + hex : hex;
        })
        .join("")
    );
  };

  const rgbToHsl = (
    r: number,
    g: number,
    b: number
  ): { h: number; s: number; l: number } => {
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0;
    let s = 0;
    const l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
          break;
        case g:
          h = ((b - r) / d + 2) / 6;
          break;
        case b:
          h = ((r - g) / d + 4) / 6;
          break;
      }
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100),
    };
  };

  const hslToRgb = (
    h: number,
    s: number,
    l: number
  ): { r: number; g: number; b: number } => {
    h /= 360;
    s /= 100;
    l /= 100;
    let r, g, b;

    if (s === 0) {
      r = g = b = l;
    } else {
      const hue2rgb = (p: number, q: number, t: number) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
      };
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h + 1 / 3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1 / 3);
    }

    return {
      r: Math.round(r * 255),
      g: Math.round(g * 255),
      b: Math.round(b * 255),
    };
  };

  const updateFromHex = (hex: string) => {
    const rgb = hexToRgb(hex);
    if (rgb) {
      const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
      setColor({ hex, rgb, hsl });
    }
  };

  const updateFromRgb = (r: number, g: number, b: number) => {
    const hex = rgbToHex(r, g, b);
    const hsl = rgbToHsl(r, g, b);
    setColor({ hex, rgb: { r, g, b }, hsl });
  };

  const updateFromHsl = (h: number, s: number, l: number) => {
    const rgb = hslToRgb(h, s, l);
    const hex = rgbToHex(rgb.r, rgb.g, rgb.b);
    setColor({ hex, rgb, hsl: { h, s, l } });
  };

  const copyToClipboard = async (text: string, field: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedField(field);
    toast.success("Copied to clipboard!");
    setTimeout(() => setCopiedField(null), 2000);
  };

  const hexString = color.hex.toUpperCase();
  const rgbString = `rgb(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b})`;
  const hslString = `hsl(${color.hsl.h}, ${color.hsl.s}%, ${color.hsl.l}%)`;

  return (
    <ToolLayout
      title="Color Converter"
      description="Convert colors between HEX, RGB, and HSL formats"
      icon={Palette}
      iconColor="bg-cyan-500/10 text-cyan-600 dark:text-cyan-400"
      tips={[
        "Click on the color preview to open the system color picker",
        "All formats are synchronized in real-time",
        "Click copy buttons to copy any format",
        "Works with both 3 and 6 digit HEX codes",
      ]}
    >
      <div className="space-y-6">
        {/* Color Preview */}
        <div className="flex flex-col items-center">
          <label htmlFor="colorPicker" className="cursor-pointer">
            <div
              className="w-32 h-32 rounded-2xl shadow-lg border-4 border-white dark:border-gray-800 transition-transform hover:scale-105"
              style={{ backgroundColor: color.hex }}
            />
          </label>
          <input
            id="colorPicker"
            type="color"
            value={color.hex}
            onChange={(e) => updateFromHex(e.target.value)}
            className="sr-only"
          />
          <p className="text-sm text-muted-foreground mt-2">
            Click to pick a color
          </p>
        </div>

        {/* HEX Input */}
        <div className="space-y-2">
          <label className="text-sm font-medium">HEX</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={color.hex}
              onChange={(e) => {
                const val = e.target.value;
                if (/^#?[0-9A-Fa-f]{0,6}$/.test(val)) {
                  const hex = val.startsWith("#") ? val : "#" + val;
                  if (hex.length === 7) {
                    updateFromHex(hex);
                  } else {
                    setColor((prev) => ({ ...prev, hex }));
                  }
                }
              }}
              className="flex-1 input-modern font-mono"
              placeholder="#6366f1"
            />
            <Button
              variant="outline"
              size="icon"
              onClick={() => copyToClipboard(hexString, "hex")}
            >
              {copiedField === "hex" ? (
                <Check className="w-4 h-4 text-green-500" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </Button>
          </div>
        </div>

        {/* RGB Inputs */}
        <div className="space-y-2">
          <label className="text-sm font-medium">RGB</label>
          <div className="flex gap-2">
            <div className="flex-1 grid grid-cols-3 gap-2">
              {(["r", "g", "b"] as const).map((channel) => (
                <div key={channel}>
                  <label className="text-xs text-muted-foreground uppercase">
                    {channel}
                  </label>
                  <input
                    type="number"
                    min={0}
                    max={255}
                    value={color.rgb[channel]}
                    onChange={(e) => {
                      const val = Math.max(0, Math.min(255, parseInt(e.target.value) || 0));
                      updateFromRgb(
                        channel === "r" ? val : color.rgb.r,
                        channel === "g" ? val : color.rgb.g,
                        channel === "b" ? val : color.rgb.b
                      );
                    }}
                    className="w-full input-modern font-mono text-center"
                  />
                </div>
              ))}
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={() => copyToClipboard(rgbString, "rgb")}
              className="self-end"
            >
              {copiedField === "rgb" ? (
                <Check className="w-4 h-4 text-green-500" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </Button>
          </div>
        </div>

        {/* HSL Inputs */}
        <div className="space-y-2">
          <label className="text-sm font-medium">HSL</label>
          <div className="flex gap-2">
            <div className="flex-1 grid grid-cols-3 gap-2">
              <div>
                <label className="text-xs text-muted-foreground">H</label>
                <input
                  type="number"
                  min={0}
                  max={360}
                  value={color.hsl.h}
                  onChange={(e) => {
                    const val = Math.max(0, Math.min(360, parseInt(e.target.value) || 0));
                    updateFromHsl(val, color.hsl.s, color.hsl.l);
                  }}
                  className="w-full input-modern font-mono text-center"
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground">S%</label>
                <input
                  type="number"
                  min={0}
                  max={100}
                  value={color.hsl.s}
                  onChange={(e) => {
                    const val = Math.max(0, Math.min(100, parseInt(e.target.value) || 0));
                    updateFromHsl(color.hsl.h, val, color.hsl.l);
                  }}
                  className="w-full input-modern font-mono text-center"
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground">L%</label>
                <input
                  type="number"
                  min={0}
                  max={100}
                  value={color.hsl.l}
                  onChange={(e) => {
                    const val = Math.max(0, Math.min(100, parseInt(e.target.value) || 0));
                    updateFromHsl(color.hsl.h, color.hsl.s, val);
                  }}
                  className="w-full input-modern font-mono text-center"
                />
              </div>
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={() => copyToClipboard(hslString, "hsl")}
              className="self-end"
            >
              {copiedField === "hsl" ? (
                <Check className="w-4 h-4 text-green-500" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </Button>
          </div>
        </div>

        {/* Preset Colors */}
        <div className="pt-4 border-t border-border">
          <p className="text-sm text-muted-foreground mb-3">Popular colors:</p>
          <div className="flex flex-wrap gap-2">
            {[
              "#ef4444",
              "#f97316",
              "#eab308",
              "#22c55e",
              "#06b6d4",
              "#3b82f6",
              "#8b5cf6",
              "#ec4899",
              "#000000",
              "#ffffff",
            ].map((presetColor) => (
              <button
                key={presetColor}
                onClick={() => updateFromHex(presetColor)}
                className="w-8 h-8 rounded-lg border-2 border-border hover:scale-110 transition-transform"
                style={{ backgroundColor: presetColor }}
                title={presetColor}
              />
            ))}
          </div>
        </div>
      </div>
    </ToolLayout>
  );
};

export default ColorConverter;
