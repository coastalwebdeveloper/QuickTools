import { useState } from "react";
import { Shuffle, Copy, Check, History } from "lucide-react";
import ToolLayout from "@/components/ToolLayout";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const RandomNumber = () => {
  const [min, setMin] = useState("1");
  const [max, setMax] = useState("100");
  const [result, setResult] = useState<number | null>(null);
  const [history, setHistory] = useState<number[]>([]);
  const [copied, setCopied] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const generateNumber = () => {
    const minNum = parseInt(min) || 0;
    const maxNum = parseInt(max) || 100;

    if (minNum >= maxNum) {
      toast.error("Minimum must be less than maximum");
      return;
    }

    setIsAnimating(true);
    
    // Animation effect
    let iterations = 0;
    const maxIterations = 15;
    const interval = setInterval(() => {
      const randomNum = Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;
      setResult(randomNum);
      iterations++;
      
      if (iterations >= maxIterations) {
        clearInterval(interval);
        const finalNum = Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;
        setResult(finalNum);
        setHistory((prev) => [finalNum, ...prev.slice(0, 9)]);
        setIsAnimating(false);
      }
    }, 50);
  };

  const copyResult = async () => {
    if (result === null) return;
    await navigator.clipboard.writeText(result.toString());
    setCopied(true);
    toast.success("Copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const clearHistory = () => {
    setHistory([]);
    toast.success("History cleared!");
  };

  return (
    <ToolLayout
      title="Random Number Generator"
      description="Generate random numbers within any range"
      icon={Shuffle}
      iconColor="bg-sky-500/10 text-sky-600 dark:text-sky-400"
      tips={[
        "Set your minimum and maximum values",
        "Numbers are generated using cryptographic randomness",
        "View your last 10 generated numbers",
        "Perfect for games, raffles, or decision making",
      ]}
    >
      <div className="space-y-6">
        {/* Range Inputs */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Minimum</label>
            <input
              type="number"
              value={min}
              onChange={(e) => setMin(e.target.value)}
              className="w-full input-modern text-center text-lg font-mono"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Maximum</label>
            <input
              type="number"
              value={max}
              onChange={(e) => setMax(e.target.value)}
              className="w-full input-modern text-center text-lg font-mono"
            />
          </div>
        </div>

        {/* Result Display */}
        <div className="flex flex-col items-center py-8">
          <div
            className={`relative w-48 h-48 flex items-center justify-center rounded-full border-4 border-primary/30 ${
              isAnimating ? "animate-pulse" : ""
            }`}
          >
            <div className="absolute inset-2 rounded-full gradient-bg opacity-10" />
            <span
              className={`text-5xl md:text-6xl font-bold font-mono text-foreground ${
                isAnimating ? "scale-110" : ""
              } transition-transform duration-100`}
            >
              {result !== null ? result : "?"}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-center gap-3">
          <Button
            onClick={generateNumber}
            disabled={isAnimating}
            className="btn-primary px-8 py-6 text-lg"
          >
            <Shuffle className="w-5 h-5 mr-2" />
            Generate
          </Button>
          {result !== null && (
            <Button
              variant="outline"
              onClick={copyResult}
              className="py-6"
            >
              {copied ? (
                <Check className="w-5 h-5" />
              ) : (
                <Copy className="w-5 h-5" />
              )}
            </Button>
          )}
        </div>

        {/* Quick Presets */}
        <div className="pt-4 border-t border-border">
          <p className="text-sm text-muted-foreground mb-3">Quick presets:</p>
          <div className="flex flex-wrap gap-2">
            {[
              { min: "1", max: "6", label: "Dice (1-6)" },
              { min: "1", max: "10", label: "1-10" },
              { min: "1", max: "100", label: "1-100" },
              { min: "0", max: "1", label: "Coin (0-1)" },
              { min: "1", max: "1000", label: "1-1000" },
            ].map((preset) => (
              <button
                key={preset.label}
                onClick={() => {
                  setMin(preset.min);
                  setMax(preset.max);
                }}
                className="px-3 py-1.5 text-sm bg-secondary hover:bg-secondary/80 rounded-lg transition-colors"
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>

        {/* History */}
        {history.length > 0 && (
          <div className="pt-4 border-t border-border">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <History className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium">History</span>
              </div>
              <button
                onClick={clearHistory}
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Clear
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {history.map((num, index) => (
                <span
                  key={index}
                  className="px-3 py-1.5 bg-secondary rounded-lg font-mono text-sm"
                >
                  {num}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  );
};

export default RandomNumber;
