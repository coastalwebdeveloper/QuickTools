import { useState } from "react";
import { GitCompare } from "lucide-react";
import ToolLayout from "@/components/ToolLayout";
import { Button } from "@/components/ui/button";

const TextDiff = () => {
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");
  const [diff, setDiff] = useState<{ type: string; value: string }[]>([]);

  const comparTexts = () => {
    const lines1 = text1.split("\n");
    const lines2 = text2.split("\n");
    const result: { type: string; value: string }[] = [];
    const maxLen = Math.max(lines1.length, lines2.length);

    for (let i = 0; i < maxLen; i++) {
      const line1 = lines1[i] || "";
      const line2 = lines2[i] || "";

      if (line1 === line2) {
        result.push({ type: "equal", value: line1 });
      } else {
        if (line1) result.push({ type: "removed", value: line1 });
        if (line2) result.push({ type: "added", value: line2 });
      }
    }
    setDiff(result);
  };

  return (
    <ToolLayout
      title="Text Diff Checker"
      description="Compare two texts and highlight differences"
      icon={GitCompare}
      iconColor="bg-violet-500/10 text-violet-600 dark:text-violet-400"
      tips={["Compare code snippets or documents", "Line-by-line comparison"]}
    >
      <div className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Original Text</label>
            <textarea
              value={text1}
              onChange={(e) => setText1(e.target.value)}
              className="w-full input-modern min-h-[200px] font-mono text-sm"
              placeholder="Enter original text..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Modified Text</label>
            <textarea
              value={text2}
              onChange={(e) => setText2(e.target.value)}
              className="w-full input-modern min-h-[200px] font-mono text-sm"
              placeholder="Enter modified text..."
            />
          </div>
        </div>

        <Button onClick={comparTexts} className="btn-primary w-full">
          Compare Texts
        </Button>

        {diff.length > 0 && (
          <div className="border border-border rounded-lg p-4">
            <h3 className="text-sm font-medium mb-3">Differences:</h3>
            <div className="space-y-1 font-mono text-sm">
              {diff.map((line, i) => (
                <div
                  key={i}
                  className={`p-2 rounded ${
                    line.type === "added"
                      ? "bg-green-500/10 text-green-600 dark:text-green-400"
                      : line.type === "removed"
                      ? "bg-red-500/10 text-red-600 dark:text-red-400"
                      : "bg-secondary"
                  }`}
                >
                  {line.type === "added" && "+ "}
                  {line.type === "removed" && "- "}
                  {line.value || "(empty line)"}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  );
};

export default TextDiff;
