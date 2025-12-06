import { useState, useCallback } from "react";
import { Lock, Copy, Check, RefreshCw } from "lucide-react";
import ToolLayout from "@/components/ToolLayout";
import ToolContent from "@/components/ToolContent";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { toolContentData } from "@/lib/toolContent";

const PasswordGenerator = () => {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(16);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [copied, setCopied] = useState(false);

  const generatePassword = useCallback(() => {
    let charset = "";
    if (includeLowercase) charset += "abcdefghijklmnopqrstuvwxyz";
    if (includeUppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (includeNumbers) charset += "0123456789";
    if (includeSymbols) charset += "!@#$%^&*()_+-=[]{}|;:,.<>?";

    if (!charset) {
      toast.error("Please select at least one character type");
      return;
    }

    let newPassword = "";
    const array = new Uint32Array(length);
    crypto.getRandomValues(array);
    
    for (let i = 0; i < length; i++) {
      newPassword += charset[array[i] % charset.length];
    }

    setPassword(newPassword);
  }, [length, includeUppercase, includeLowercase, includeNumbers, includeSymbols]);

  const handleCopy = async () => {
    if (!password) return;
    await navigator.clipboard.writeText(password);
    setCopied(true);
    toast.success("Password copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const getStrength = () => {
    let score = 0;
    if (length >= 12) score++;
    if (length >= 16) score++;
    if (includeUppercase && includeLowercase) score++;
    if (includeNumbers) score++;
    if (includeSymbols) score++;

    if (score <= 2) return { label: "Weak", color: "bg-red-500", width: "33%" };
    if (score <= 3) return { label: "Medium", color: "bg-yellow-500", width: "66%" };
    return { label: "Strong", color: "bg-green-500", width: "100%" };
  };

  const strength = getStrength();

  return (
    <ToolLayout
      title="Password Generator"
      description="Generate strong, secure passwords with customizable options"
      icon={Lock}
      iconColor="bg-violet-500/10 text-violet-600 dark:text-violet-400"
      tips={[
        "Use at least 16 characters for maximum security",
        "Include all character types for strongest passwords",
        "Passwords are generated using cryptographic randomness",
        "Never share your passwords with anyone",
      ]}
    >
      <div className="space-y-6">
        {/* Password Display */}
        <div className="relative">
          <div className="flex items-center gap-2 p-4 bg-secondary/50 rounded-xl border border-border">
            <code className="flex-1 text-lg font-mono break-all text-foreground">
              {password || "Click generate to create a password"}
            </code>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleCopy}
              disabled={!password}
              className="shrink-0"
            >
              {copied ? (
                <Check className="w-5 h-5 text-green-500" />
              ) : (
                <Copy className="w-5 h-5" />
              )}
            </Button>
          </div>

          {/* Strength Indicator */}
          {password && (
            <div className="mt-3">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-muted-foreground">Strength</span>
                <span className="text-sm font-medium">{strength.label}</span>
              </div>
              <div className="h-2 bg-secondary rounded-full overflow-hidden">
                <div
                  className={`h-full ${strength.color} transition-all duration-300`}
                  style={{ width: strength.width }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Length Slider */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm font-medium">Password Length</label>
            <span className="text-sm font-mono bg-secondary px-2 py-1 rounded">
              {length}
            </span>
          </div>
          <Slider
            value={[length]}
            onValueChange={(value) => setLength(value[0])}
            min={8}
            max={64}
            step={1}
            className="w-full"
          />
        </div>

        {/* Options */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex items-center justify-between p-4 bg-secondary/30 rounded-xl">
            <label className="text-sm font-medium">Uppercase (A-Z)</label>
            <Switch
              checked={includeUppercase}
              onCheckedChange={setIncludeUppercase}
            />
          </div>
          <div className="flex items-center justify-between p-4 bg-secondary/30 rounded-xl">
            <label className="text-sm font-medium">Lowercase (a-z)</label>
            <Switch
              checked={includeLowercase}
              onCheckedChange={setIncludeLowercase}
            />
          </div>
          <div className="flex items-center justify-between p-4 bg-secondary/30 rounded-xl">
            <label className="text-sm font-medium">Numbers (0-9)</label>
            <Switch
              checked={includeNumbers}
              onCheckedChange={setIncludeNumbers}
            />
          </div>
          <div className="flex items-center justify-between p-4 bg-secondary/30 rounded-xl">
            <label className="text-sm font-medium">Symbols (!@#$%)</label>
            <Switch
              checked={includeSymbols}
              onCheckedChange={setIncludeSymbols}
            />
          </div>
        </div>

        {/* Generate Button */}
        <Button onClick={generatePassword} className="w-full btn-primary py-6 text-lg">
          <RefreshCw className="w-5 h-5 mr-2" />
          Generate Password
        </Button>

        <ToolContent
          title="Password Generator"
          {...toolContentData["password-generator"]}
        />
      </div>
    </ToolLayout>
  );
};

export default PasswordGenerator;
