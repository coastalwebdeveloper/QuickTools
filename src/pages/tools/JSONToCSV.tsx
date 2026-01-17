import { useState } from "react";
import { FileJson, Download, FileSpreadsheet } from "lucide-react";
import ToolLayout from "@/components/ToolLayout";
import ToolContent from "@/components/ToolContent";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { saveAs } from "file-saver";
import { toolContentData } from "@/lib/toolContent";

const JSONToCSV = () => {
  const [jsonInput, setJsonInput] = useState("");
  const [csvOutput, setCsvOutput] = useState("");

  const convertToCSV = () => {
    if (!jsonInput.trim()) {
      toast.error("Please enter JSON data");
      return;
    }

    try {
      const data = JSON.parse(jsonInput);
      
      if (!Array.isArray(data)) {
        toast.error("JSON must be an array of objects");
        return;
      }

      if (data.length === 0) {
        toast.error("JSON array is empty");
        return;
      }

      // Flatten nested objects
      const flattenObject = (obj: any, prefix = ''): any => {
        return Object.keys(obj).reduce((acc: any, key: string) => {
          const value = obj[key];
          const newKey = prefix ? `${prefix}.${key}` : key;
          
          if (value === null || value === undefined) {
            acc[newKey] = '';
          } else if (Array.isArray(value)) {
            acc[newKey] = JSON.stringify(value);
          } else if (typeof value === 'object') {
            Object.assign(acc, flattenObject(value, newKey));
          } else {
            acc[newKey] = value;
          }
          
          return acc;
        }, {});
      };

      const flatData = data.map(item => flattenObject(item));
      const keys = Array.from(new Set(flatData.flatMap(obj => Object.keys(obj))));
      
      const header = keys.join(',');
      
      const rows = flatData.map(obj => {
        return keys.map(key => {
          const value = obj[key];
          if (value === null || value === undefined) return '';
          const str = String(value);
          if (str.includes(',') || str.includes('"') || str.includes('\n')) {
            return `"${str.replace(/"/g, '""')}"`;
          }
          return str;
        }).join(',');
      });

      const csv = [header, ...rows].join('\n');
      setCsvOutput(csv);
      toast.success("JSON converted to CSV!");
    } catch (error) {
      toast.error("Invalid JSON format");
    }
  };

  const downloadCSV = () => {
    const blob = new Blob([csvOutput], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'data.csv');
    toast.success("CSV downloaded!");
  };

  const relatedTools = [
    { name: "Base64 Tool", path: "/tools/base64-tool" },
    { name: "HTML Formatter", path: "/tools/html-formatter" },
    { name: "PDF to Excel", path: "/tools/pdf-to-excel" },
    { name: "Text Cleaner", path: "/tools/text-cleaner" }
  ];

  return (
    <ToolLayout
      title="JSON to CSV"
      description="Convert JSON data to CSV format"
      icon={FileJson}
      iconColor="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
      toolId="json-to-csv"
      tips={[
        "JSON must be an array of objects",
        "Handles nested objects with dot notation",
        "Automatically escapes special characters",
        "All processing happens in your browser"
      ]}
    >
      <div className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">JSON Input</label>
          <Textarea
            placeholder='[{"name":"John","age":30},{"name":"Jane","age":25}]'
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
            rows={10}
            className="font-mono text-sm"
            spellCheck={false}
          />
        </div>

        <Button onClick={convertToCSV} className="w-full">
          <FileSpreadsheet className="w-4 h-4 mr-2" />
          Convert to CSV
        </Button>

        {csvOutput && (
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium">CSV Output</label>
              <Button size="sm" onClick={downloadCSV}>
                <Download className="w-4 h-4 mr-2" />
                Download CSV
              </Button>
            </div>
            <Textarea
              value={csvOutput}
              readOnly
              rows={10}
              className="font-mono text-sm"
              spellCheck={false}
            />
          </div>
        )}

        <ToolContent
          title="JSON to CSV Converter"
          {...toolContentData["json-to-csv"]}
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

export default JSONToCSV;
