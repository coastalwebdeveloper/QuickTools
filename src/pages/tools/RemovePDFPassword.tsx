import { useState } from "react";
import { LockOpen, Upload, Download, AlertTriangle } from "lucide-react";
import ToolLayout from "@/components/ToolLayout";
import ToolContent from "@/components/ToolContent";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { PDFDocument } from "pdf-lib";
import { saveAs } from "file-saver";
import { toolContentData } from "@/lib/toolContent";

const RemovePDFPassword = () => {
  const [file, setFile] = useState<File | null>(null);
  const [password, setPassword] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [unlockedPDF, setUnlockedPDF] = useState<Uint8Array | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.type !== "application/pdf") {
        toast.error("Please select a PDF file");
        return;
      }
      setFile(selectedFile);
      setUnlockedPDF(null);
    }
  };

  const removePassword = async () => {
    if (!file || !password) {
      toast.error("Please provide both file and password");
      return;
    }

    setIsProcessing(true);
    try {
      const arrayBuffer = await file.arrayBuffer();
      
      // Try to load the PDF with password
      const pdfDoc = await PDFDocument.load(arrayBuffer, {
        password: password,
        ignoreEncryption: false
      });

      // Save without password
      const pdfBytes = await pdfDoc.save();
      setUnlockedPDF(pdfBytes);
      toast.success("Password removed successfully!");
    } catch (error: any) {
      if (error.message?.includes('password')) {
        toast.error("Incorrect password or PDF is not password-protected");
      } else {
        toast.error("Error removing password. The PDF may use unsupported encryption.");
      }
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadPDF = () => {
    if (unlockedPDF) {
      const blob = new Blob([unlockedPDF], { type: 'application/pdf' });
      saveAs(blob, `unlocked_${file?.name}`);
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
      title="Remove PDF Password"
      description="Unlock password-protected PDF files"
      icon={LockOpen}
      iconColor="bg-rose-500/10 text-rose-600 dark:text-rose-400"
      toolId="remove-pdf-password"
      tips={[
        "You must know the password to unlock",
        "Only use on PDFs you own or have permission to unlock",
        "All processing happens in your browser",
        "No files uploaded to servers"
      ]}
    >
      <div className="space-y-6">
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 flex gap-3">
          <AlertTriangle className="w-5 h-5 text-yellow-600 dark:text-yellow-500 shrink-0 mt-0.5" />
          <div className="text-sm">
            <p className="font-semibold text-yellow-800 dark:text-yellow-200 mb-1">
              Legal Notice
            </p>
            <p className="text-yellow-700 dark:text-yellow-300">
              Only unlock PDFs you own or have explicit permission to use. Unauthorized removal of password protection may violate copyright laws and terms of service.
            </p>
          </div>
        </div>

        <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl p-8 text-center">
          <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Upload Password-Protected PDF</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Select a PDF file to remove password protection
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
              <label className="block text-sm font-medium mb-2">PDF Password</label>
              <Input
                type="password"
                placeholder="Enter PDF password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <Button onClick={removePassword} disabled={isProcessing || !password} className="w-full">
              <LockOpen className="w-4 h-4 mr-2" />
              {isProcessing ? "Removing Password..." : "Remove Password"}
            </Button>

            {unlockedPDF && (
              <Button onClick={downloadPDF} className="w-full">
                <Download className="w-4 h-4 mr-2" />
                Download Unlocked PDF
              </Button>
            )}
          </div>
        )}

        <ToolContent
          title="Remove PDF Password Tool"
          {...toolContentData["remove-pdf-password"]}
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

export default RemovePDFPassword;
