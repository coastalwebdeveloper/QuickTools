import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect, lazy, Suspense } from "react";

const Index = lazy(() => import("./pages/Index"));
const AllTools = lazy(() => import("./pages/AllTools"));
const Feedback = lazy(() => import("./pages/Feedback"));
const NotFound = lazy(() => import("./pages/NotFound"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Terms = lazy(() => import("./pages/Terms"));
const Blog = lazy(() => import("./pages/Blog"));
const PdfBestPractices = lazy(() => import("./pages/blog/PdfBestPractices"));
const ImageOptimization = lazy(() => import("./pages/blog/ImageOptimization"));
const FinancialCalculators = lazy(() => import("./pages/blog/FinancialCalculators"));
const TextProductivity = lazy(() => import("./pages/blog/TextProductivity"));
const AllToolsGuide = lazy(() => import("./pages/blog/AllToolsGuide"));
const PDFToWordGuide = lazy(() => import("./pages/blog/PDFToWordGuide"));
const PDFCompressorGuide = lazy(() => import("./pages/blog/PDFCompressorGuide"));
const BackgroundRemoverGuide = lazy(() => import("./pages/blog/BackgroundRemoverGuide"));
const URLShortenerGuide = lazy(() => import("./pages/blog/URLShortenerGuide"));
const OCRPDFGuide = lazy(() => import("./pages/blog/OCRPDFGuide"));
const ImageCompressorGuide = lazy(() => import("./pages/blog/ImageCompressorGuide"));
const PDFToExcelGuide = lazy(() => import("./pages/blog/PDFToExcelGuide"));
const WebPConverterGuide = lazy(() => import("./pages/blog/WebPConverterGuide"));
const ToolGuides = lazy(() => import("./pages/blog/ToolGuides"));
const WordCounter = lazy(() => import("./pages/tools/WordCounter"));
const PasswordGenerator = lazy(() => import("./pages/tools/PasswordGenerator"));
const QRGenerator = lazy(() => import("./pages/tools/QRGenerator"));
const ColorConverter = lazy(() => import("./pages/tools/ColorConverter"));
const BMICalculator = lazy(() => import("./pages/tools/BMICalculator"));
const UnitConverter = lazy(() => import("./pages/tools/UnitConverter"));
const Stopwatch = lazy(() => import("./pages/tools/Stopwatch"));
const RandomNumber = lazy(() => import("./pages/tools/RandomNumber"));
const CaseConverter = lazy(() => import("./pages/tools/CaseConverter"));
const TextCleaner = lazy(() => import("./pages/tools/TextCleaner"));
const AgeCalculator = lazy(() => import("./pages/tools/AgeCalculator"));
const EMICalculator = lazy(() => import("./pages/tools/EMICalculator"));
const TipCalculator = lazy(() => import("./pages/tools/TipCalculator"));
const PDFMerge = lazy(() => import("./pages/tools/PDFMerge"));
const PDFSplit = lazy(() => import("./pages/tools/PDFSplit"));
const ImageCompressor = lazy(() => import("./pages/tools/ImageCompressor"));
const ImageResizer = lazy(() => import("./pages/tools/ImageResizer"));
const ImageCropper = lazy(() => import("./pages/tools/ImageCropper"));
const Base64Tool = lazy(() => import("./pages/tools/Base64Tool"));
const TextDiff = lazy(() => import("./pages/tools/TextDiff"));
const PDFToImages = lazy(() => import("./pages/tools/PDFToImages"));
const PDFToWord = lazy(() => import("./pages/tools/PDFToWord"));
const PDFCompressor = lazy(() => import("./pages/tools/PDFCompressor"));
const PDFToExcel = lazy(() => import("./pages/tools/PDFToExcel"));
const OCRPDF = lazy(() => import("./pages/tools/OCRPDF"));
const ImageBackgroundRemover = lazy(() => import("./pages/tools/ImageBackgroundRemover"));
const ImageToWebP = lazy(() => import("./pages/tools/ImageToWebP"));
const URLShortener = lazy(() => import("./pages/tools/URLShortener"));
const PDFToPPT = lazy(() => import("./pages/tools/PDFToPPT"));
const WordToPDF = lazy(() => import("./pages/tools/WordToPDF"));
const ImageToPDF = lazy(() => import("./pages/tools/ImageToPDF"));
const RemovePDFPassword = lazy(() => import("./pages/tools/RemovePDFPassword"));
const ImageToText = lazy(() => import("./pages/tools/ImageToText"));
const YoutubeThumbnailDownloader = lazy(() => import("./pages/tools/YoutubeThumbnailDownloader"));
const HTMLFormatter = lazy(() => import("./pages/tools/HTMLFormatter"));
const JSONToCSV = lazy(() => import("./pages/tools/JSONToCSV"));
const MetaTagGenerator = lazy(() => import("./pages/tools/MetaTagGenerator"));
const WebsiteWordCounter = lazy(() => import("./pages/tools/WebsiteWordCounter"));

const queryClient = new QueryClient();

const Loading = () => <div style={{minHeight:'100vh'}}></div>;

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
        <Suspense fallback={<Loading />}>
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
          <Route path="/blog/word-counter-guide" element={<ToolGuides />} />
          <Route path="/blog/qr-generator-guide" element={<ToolGuides />} />
          <Route path="/blog/password-generator-guide" element={<ToolGuides />} />
          <Route path="/blog/bmi-calculator-guide" element={<ToolGuides />} />
          
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
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
