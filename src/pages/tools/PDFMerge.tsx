import { useState } from "react";
import { FileText, Upload, Download } from "lucide-react";
import ToolLayout from "@/components/ToolLayout";
import { Button } from "@/components/ui/button";

const PDFMerge = () => {
  const [files, setFiles] = useState<File[]>([]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  return (
    <ToolLayout
      title="PDF Merger"
      description="Combine multiple PDF files into one document"
      icon={FileText}
      iconColor="bg-red-500/10 text-red-600 dark:text-red-400"
      toolId="pdf-merge"
      tips={[
        "Upload multiple PDF files to merge them",
        "Files are processed in your browser",
        "No files are uploaded to any server",
        "Drag and drop files for easier upload"
      ]}
    >
      <div className="space-y-6">
        <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl p-8 text-center">
          <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Upload PDF Files</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Select multiple PDF files to merge them into one document
          </p>
          <input
            type="file"
            multiple
            accept=".pdf"
            onChange={handleFileUpload}
            className="hidden"
            id="pdf-upload"
          />
          <Button asChild>
            <label htmlFor="pdf-upload" className="cursor-pointer">
              Choose PDF Files
            </label>
          </Button>
        </div>

        {files.length > 0 && (
          <div className="space-y-4">
            <h3 className="font-semibold">Selected Files ({files.length})</h3>
            <div className="space-y-2">
              {files.map((file, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <FileText className="w-5 h-5 text-red-600" />
                  <span className="flex-1">{file.name}</span>
                  <span className="text-sm text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</span>
                </div>
              ))}
            </div>
            <Button className="w-full" disabled>
              <Download className="w-4 h-4 mr-2" />
              Merge PDFs (Coming Soon)
            </Button>
          </div>
        )}
      </div>
    </ToolLayout>
  );
};

export default PDFMerge;