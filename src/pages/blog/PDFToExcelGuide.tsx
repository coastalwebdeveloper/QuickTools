import { Link } from "react-router-dom";
import { ArrowLeft, FileSpreadsheet } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const PDFToExcelGuide = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <article className="container mx-auto px-4 py-8 max-w-4xl">
        <Link to="/blog" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back to Resources
        </Link>
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-4">PDF to Excel Converter: Extract Tables and Data</h1>
          <p className="text-xl text-muted-foreground">Convert PDF tables to Excel spreadsheets for easy data manipulation and analysis.</p>
        </header>
        <div className="prose prose-slate dark:prose-invert max-w-none">
          <h2>Why Convert PDF to Excel?</h2>
          <ul>
            <li>Extract financial data from reports and statements</li>
            <li>Analyze tabular data with Excel formulas</li>
            <li>Import invoice data into accounting software</li>
            <li>Create charts and graphs from PDF tables</li>
            <li>Perform calculations on extracted data</li>
          </ul>
          <h2>Best Use Cases</h2>
          <h3>Financial Reports</h3>
          <p>Extract balance sheets, income statements, and financial data from PDF reports for analysis in Excel.</p>
          <h3>Invoice Processing</h3>
          <p>Convert PDF invoices to Excel for batch processing, data entry, and accounting integration.</p>
          <h3>Data Analysis</h3>
          <p>Extract survey results, research data, and statistics from PDF documents for Excel analysis.</p>
          <h2>How to Convert</h2>
          <ol>
            <li>Upload your PDF file containing tables</li>
            <li>Click "Convert to Excel"</li>
            <li>Download the CSV file</li>
            <li>Open in Excel, Google Sheets, or any spreadsheet software</li>
          </ol>
          <div className="bg-card border border-border rounded-xl p-6 mt-8">
            <h3 className="mt-0">Convert PDF to Excel</h3>
            <Link to="/tools/pdf-to-excel" className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
              Try PDF to Excel
            </Link>
          </div>
        </div>
      </article>
      <Footer />
    </div>
  );
};

export default PDFToExcelGuide;
