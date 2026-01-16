import { Link } from "react-router-dom";
import { ArrowLeft, ScanText } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const OCRPDFGuide = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <article className="container mx-auto px-4 py-8 max-w-4xl">
        <Link to="/blog" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back to Resources
        </Link>
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-4">OCR PDF: Extract Text from Scanned Documents</h1>
          <p className="text-xl text-muted-foreground">Convert scanned PDFs and images to searchable, editable text using OCR technology.</p>
        </header>
        <div className="prose prose-slate dark:prose-invert max-w-none">
          <h2>What is OCR?</h2>
          <p>Optical Character Recognition (OCR) converts images of text into actual text data that you can edit, search, and copy.</p>
          <h2>When to Use OCR</h2>
          <ul>
            <li>Extract text from scanned documents</li>
            <li>Make old paper documents searchable</li>
            <li>Convert book pages to digital text</li>
            <li>Extract data from receipts and invoices</li>
            <li>Digitize handwritten notes (typed text works best)</li>
          </ul>
          <h2>Best Practices</h2>
          <h3>Use High-Quality Scans</h3>
          <p>Scan documents at 300 DPI or higher for best OCR accuracy. Clear, high-contrast images produce better results.</p>
          <h3>Ensure Good Lighting</h3>
          <p>Well-lit documents with minimal shadows improve text recognition. Avoid glare and reflections.</p>
          <h3>Straighten Pages</h3>
          <p>Align documents properly when scanning. Crooked text reduces OCR accuracy.</p>
          <div className="bg-card border border-border rounded-xl p-6 mt-8">
            <h3 className="mt-0">Extract Text from PDFs</h3>
            <Link to="/tools/ocr-pdf" className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
              Try OCR PDF
            </Link>
          </div>
        </div>
      </article>
      <Footer />
    </div>
  );
};

export default OCRPDFGuide;
