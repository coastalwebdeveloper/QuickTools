import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import AllTools from "./pages/AllTools";
import NotFound from "./pages/NotFound";

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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/tools" element={<AllTools />} />
          
          {/* Text Tools */}
          <Route path="/tools/word-counter" element={<WordCounter />} />
          <Route path="/tools/case-converter" element={<CaseConverter />} />
          <Route path="/tools/text-cleaner" element={<TextCleaner />} />
          
          {/* Converters */}
          <Route path="/tools/color-converter" element={<ColorConverter />} />
          <Route path="/tools/unit-converter" element={<UnitConverter />} />
          
          {/* Calculators */}
          <Route path="/tools/bmi-calculator" element={<BMICalculator />} />
          <Route path="/tools/age-calculator" element={<AgeCalculator />} />
          <Route path="/tools/emi-calculator" element={<EMICalculator />} />
          <Route path="/tools/tip-calculator" element={<TipCalculator />} />
          
          {/* PDF Tools */}
          <Route path="/tools/pdf-merge" element={<PDFMerge />} />
          <Route path="/tools/pdf-split" element={<PDFSplit />} />
          
          {/* Image Tools */}
          <Route path="/tools/image-compressor" element={<ImageCompressor />} />
          <Route path="/tools/image-resizer" element={<ImageResizer />} />
          
          {/* Misc Tools */}
          <Route path="/tools/password-generator" element={<PasswordGenerator />} />
          <Route path="/tools/qr-generator" element={<QRGenerator />} />
          <Route path="/tools/stopwatch" element={<Stopwatch />} />
          <Route path="/tools/random-number" element={<RandomNumber />} />
          
          {/* Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
