import { useState } from "react";
import { Lock, Upload, Download, AlertTriangle } from "lucide-react";
import ToolLayout from "@/components/ToolLayout";
import ToolContent from "@/components/ToolContent";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { PDFDocument } from "pdf-lib";
import { saveAs } from "file-saver";
import { toolContentData } from "@/lib/toolContent";

const PDFPasswordProtector = () => {
  const [file, setFile] = useState<File | null>(null);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [protectedPDF, setProtectedPDF] = useState<Uint8Array | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.type !== "application/pdf") {
        toast.error("Please select a PDF file");
        return;
      }
      setFile(selectedFile);
      setProtectedPDF(null);
    }
  };

  const addPassword = async () => {
    if (!file || !password) {
      toast.error("Please provide both file and password");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    setIsProcessing(true);
    try {
      toast.error("PDF password protection requires server-side processing. This feature will be available in a future update. For now, use desktop PDF software like Adobe Acrobat or PDFtk.");
    } catch (error: any) {
      toast.error("Error adding password. " + (error.message || ''));
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadPDF = () => {
    if (protectedPDF) {
      const blob = new Blob([protectedPDF], { type: 'application/pdf' });
      saveAs(blob, `protected_${file?.name}`);
    }
  };

  const relatedTools = [
    { name: "PDF Compressor", path: "/tools/pdf-compressor" },
    { name: "Merge PDF", path: "/tools/pdf-merge" },
    { name: "Split PDF", path: "/tools/pdf-split" },
    { name: "PDF to Word", path: "/tools/pdf-to-word" }
  ];

  return (
    <ToolLayout
      title="PDF Password Protector"
      description="Add password protection to PDF files"
      icon={Lock}
      iconColor="bg-rose-500/10 text-rose-600 dark:text-rose-400"
      toolId="pdf-password-protector"
      tips={[
        "Use strong passwords (6+ characters)",
        "Protects PDFs from unauthorized access",
        "All processing happens in your browser",
        "No files uploaded to servers"
      ]}
    >
      <div className="space-y-6">
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 flex gap-3">
          <AlertTriangle className="w-5 h-5 text-blue-600 dark:text-blue-500 shrink-0 mt-0.5" />
          <div className="text-sm">
            <p className="font-semibold text-blue-800 dark:text-blue-200 mb-1">
              Feature Coming Soon
            </p>
            <p className="text-blue-700 dark:text-blue-300">
              PDF password protection requires server-side processing and will be available in a future update. For now, please use desktop PDF software like Adobe Acrobat, PDFtk, or online services that support PDF encryption.
            </p>
          </div>
        </div>

        <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl p-8 text-center">
          <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Upload PDF</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Select a PDF file to add password protection
          </p>
          <input
            type="file"
            accept=".pdf"
            onChange={handleFileUpload}
            className="hidden"
            id="pdf-upload"
          />
          <Button asChild>
            <label htmlFor="pdf-upload" className="cursor-pointer">
              Choose PDF File
            </label>
          </Button>
        </div>

        {file && (
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <p className="text-sm font-medium">Selected: {file.name}</p>
              <p className="text-sm text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Create Password</label>
              <Input
                type="password"
                placeholder="Enter password (min 6 characters)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Confirm Password</label>
              <Input
                type="password"
                placeholder="Re-enter password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <Button onClick={addPassword} disabled={isProcessing || !password || !confirmPassword} className="w-full">
              <Lock className="w-4 h-4 mr-2" />
              {isProcessing ? "Adding Password..." : "Protect PDF"}
            </Button>

            {protectedPDF && (
              <Button onClick={downloadPDF} className="w-full">
                <Download className="w-4 h-4 mr-2" />
                Download Protected PDF
              </Button>
            )}
          </div>
        )}

        <ToolContent
          title="PDF Password Protector"
          {...toolContentData["pdf-password-protector"]}
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

export default PDFPasswordProtector;
