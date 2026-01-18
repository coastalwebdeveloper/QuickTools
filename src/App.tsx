import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Index from "./pages/Index";
import AllTools from "./pages/AllTools";
import Feedback from "./pages/Feedback";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Blog from "./pages/Blog";
import PdfBestPractices from "./pages/blog/PdfBestPractices";
import ImageOptimization from "./pages/blog/ImageOptimization";
import FinancialCalculators from "./pages/blog/FinancialCalculators";
import TextProductivity from "./pages/blog/TextProductivity";
import AllToolsGuide from "./pages/blog/AllToolsGuide";
import PDFToWordGuide from "./pages/blog/PDFToWordGuide";
import PDFCompressorGuide from "./pages/blog/PDFCompressorGuide";
import BackgroundRemoverGuide from "./pages/blog/BackgroundRemoverGuide";
import URLShortenerGuide from "./pages/blog/URLShortenerGuide";
import OCRPDFGuide from "./pages/blog/OCRPDFGuide";
import ImageCompressorGuide from "./pages/blog/ImageCompressorGuide";
import PDFToExcelGuide from "./pages/blog/PDFToExcelGuide";
import WebPConverterGuide from "./pages/blog/WebPConverterGuide";
import { WordCounterGuide, QRGeneratorGuide, PasswordGeneratorGuide, BMICalculatorGuide } from "./pages/blog/ToolGuides";

// Tool Pages
import WordCounter from "./pages/tools/WordCounter";
import PasswordGenerator from "./pages/tools/PasswordGenerator";
import QRGenerator from "./pages/tools/QRGenerator";
import ColorConverter from "./pages/tools/ColorConverter";
import BMICalculator from "./pages/tools/BMICalculator";
import UnitConverter from "./pages/tools/UnitConverter";
import Stopwatch from "./pages/tools/Stopwatch";
import RandomNumber from "./pages/tools/RandomNumber";
import CaseConverter from "./pages/tools/CaseConverter";
import TextCleaner from "./pages/tools/TextCleaner";
import AgeCalculator from "./pages/tools/AgeCalculator";
import EMICalculator from "./pages/tools/EMICalculator";
import TipCalculator from "./pages/tools/TipCalculator";
import PDFMerge from "./pages/tools/PDFMerge";
import PDFSplit from "./pages/tools/PDFSplit";
import ImageCompressor from "./pages/tools/ImageCompressor";
import ImageResizer from "./pages/tools/ImageResizer";
import ImageCropper from "./pages/tools/ImageCropper";
import Base64Tool from "./pages/tools/Base64Tool";
import TextDiff from "./pages/tools/TextDiff";
import PDFToImages from "./pages/tools/PDFToImages";
import PDFToWord from "./pages/tools/PDFToWord";
import PDFCompressor from "./pages/tools/PDFCompressor";
import PDFToExcel from "./pages/tools/PDFToExcel";
import OCRPDF from "./pages/tools/OCRPDF";
import ImageBackgroundRemover from "./pages/tools/ImageBackgroundRemover";
import ImageToWebP from "./pages/tools/ImageToWebP";
import URLShortener from "./pages/tools/URLShortener";
import PDFToPPT from "./pages/tools/PDFToPPT";
import WordToPDF from "./pages/tools/WordToPDF";
import ImageToPDF from "./pages/tools/ImageToPDF";
import RemovePDFPassword from "./pages/tools/RemovePDFPassword";
import ImageToText from "./pages/tools/ImageToText";
import YoutubeThumbnailDownloader from "./pages/tools/YoutubeThumbnailDownloader";
import HTMLFormatter from "./pages/tools/HTMLFormatter";
import JSONToCSV from "./pages/tools/JSONToCSV";
import MetaTagGenerator from "./pages/tools/MetaTagGenerator";
import WebsiteWordCounter from "./pages/tools/WebsiteWordCounter";

const queryClient = new QueryClient();

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/tools" element={<AllTools />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/pdf-best-practices" element={<PdfBestPractices />} />
          <Route path="/blog/image-optimization" element={<ImageOptimization />} />
          <Route path="/blog/financial-calculators" element={<FinancialCalculators />} />
          <Route path="/blog/text-productivity" element={<TextProductivity />} />
          <Route path="/blog/all-tools-guide" element={<AllToolsGuide />} />
          <Route path="/blog/pdf-to-word-guide" element={<PDFToWordGuide />} />
          <Route path="/blog/pdf-compressor-guide" element={<PDFCompressorGuide />} />
          <Route path="/blog/background-remover-guide" element={<BackgroundRemoverGuide />} />
          <Route path="/blog/url-shortener-guide" element={<URLShortenerGuide />} />
          <Route path="/blog/ocr-pdf-guide" element={<OCRPDFGuide />} />
          <Route path="/blog/image-compressor-guide" element={<ImageCompressorGuide />} />
          <Route path="/blog/pdf-to-excel-guide" element={<PDFToExcelGuide />} />
          <Route path="/blog/webp-converter-guide" element={<WebPConverterGuide />} />
          <Route path="/blog/word-counter-guide" element={<WordCounterGuide />} />
          <Route path="/blog/qr-generator-guide" element={<QRGeneratorGuide />} />
          <Route path="/blog/password-generator-guide" element={<PasswordGeneratorGuide />} />
          <Route path="/blog/bmi-calculator-guide" element={<BMICalculatorGuide />} />
          
          {/* Text Tools */}
          <Route path="/tools/word-counter" element={<WordCounter />} />
          <Route path="/tools/case-converter" element={<CaseConverter />} />
          <Route path="/tools/text-cleaner" element={<TextCleaner />} />
          <Route path="/tools/text-diff" element={<TextDiff />} />
          <Route path="/tools/html-formatter" element={<HTMLFormatter />} />
          
          {/* Converters */}
          <Route path="/tools/color-converter" element={<ColorConverter />} />
          <Route path="/tools/unit-converter" element={<UnitConverter />} />
          <Route path="/tools/base64-tool" element={<Base64Tool />} />
          <Route path="/tools/json-to-csv" element={<JSONToCSV />} />
          
          {/* Calculators */}
          <Route path="/tools/bmi-calculator" element={<BMICalculator />} />
          <Route path="/tools/age-calculator" element={<AgeCalculator />} />
          <Route path="/tools/emi-calculator" element={<EMICalculator />} />
          <Route path="/tools/tip-calculator" element={<TipCalculator />} />
          
          {/* PDF Tools */}
          <Route path="/tools/pdf-to-word" element={<PDFToWord />} />
          <Route path="/tools/pdf-compressor" element={<PDFCompressor />} />
          <Route path="/tools/pdf-merge" element={<PDFMerge />} />
          <Route path="/tools/pdf-split" element={<PDFSplit />} />
          <Route path="/tools/pdf-to-excel" element={<PDFToExcel />} />
          <Route path="/tools/ocr-pdf" element={<OCRPDF />} />
          <Route path="/tools/pdf-to-images" element={<PDFToImages />} />
          <Route path="/tools/pdf-to-ppt" element={<PDFToPPT />} />
          <Route path="/tools/word-to-pdf" element={<WordToPDF />} />
          <Route path="/tools/image-to-pdf" element={<ImageToPDF />} />
          <Route path="/tools/pdf-password-protector" element={<RemovePDFPassword />} />
          
          {/* Image Tools */}
          <Route path="/tools/image-background-remover" element={<ImageBackgroundRemover />} />
          <Route path="/tools/image-to-webp" element={<ImageToWebP />} />
          <Route path="/tools/image-compressor" element={<ImageCompressor />} />
          <Route path="/tools/image-resizer" element={<ImageResizer />} />
          <Route path="/tools/image-cropper" element={<ImageCropper />} />
          <Route path="/tools/image-to-text" element={<ImageToText />} />
          
          {/* Misc Tools */}
          <Route path="/tools/url-shortener" element={<URLShortener />} />
          <Route path="/tools/password-generator" element={<PasswordGenerator />} />
          <Route path="/tools/qr-generator" element={<QRGenerator />} />
          <Route path="/tools/stopwatch" element={<Stopwatch />} />
          <Route path="/tools/random-number" element={<RandomNumber />} />
          <Route path="/tools/youtube-thumbnail-downloader" element={<YoutubeThumbnailDownloader />} />
          <Route path="/tools/meta-tag-generator" element={<MetaTagGenerator />} />
          <Route path="/tools/website-word-counter" element={<WebsiteWordCounter />} />
          
          {/* Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
