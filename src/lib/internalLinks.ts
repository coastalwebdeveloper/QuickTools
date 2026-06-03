export interface ToolLinks {
  relatedTools: string[];
  nextTools: string[];
  blogLinks: { title: string; path: string }[];
  peopleAlsoSearch: string[];
}

export const internalLinksData: Record<string, ToolLinks> = {
  "pdf-to-word": {
    relatedTools: ["pdf-compressor", "pdf-to-excel", "ocr-pdf"],
    nextTools: ["word-to-pdf", "text-diff"],
    blogLinks: [
      { title: "Complete Guide to Converting PDF to Word Online", path: "/blog/pdf-to-word-guide" },
      { title: "PDF Best Practices for Professionals", path: "/blog/pdf-best-practices" },
    ],
    peopleAlsoSearch: ["convert pdf to word free", "pdf to docx no upload", "edit pdf text online"],
  },
  "pdf-compressor": {
    relatedTools: ["pdf-merge", "pdf-split", "pdf-to-word"],
    nextTools: ["pdf-to-images", "word-to-pdf"],
    blogLinks: [
      { title: "How to Compress PDFs Without Losing Quality", path: "/blog/pdf-compressor-guide" },
      { title: "PDF Best Practices for Professionals", path: "/blog/pdf-best-practices" },
    ],
    peopleAlsoSearch: ["reduce pdf size online free", "compress pdf without quality loss", "shrink pdf file size"],
  },
  "pdf-merge": {
    relatedTools: ["pdf-split", "pdf-compressor", "pdf-to-word"],
    nextTools: ["pdf-to-images", "pdf-compressor"],
    blogLinks: [{ title: "PDF Best Practices for Professionals", path: "/blog/pdf-best-practices" }],
    peopleAlsoSearch: ["combine pdf files online free", "merge pdfs without upload", "join multiple pdf files"],
  },
  "pdf-split": {
    relatedTools: ["pdf-merge", "pdf-compressor", "pdf-to-images"],
    nextTools: ["pdf-merge", "pdf-to-word"],
    blogLinks: [{ title: "PDF Best Practices for Professionals", path: "/blog/pdf-best-practices" }],
    peopleAlsoSearch: ["split pdf into pages free", "extract pages from pdf", "separate pdf pages online"],
  },
  "pdf-to-excel": {
    relatedTools: ["pdf-to-word", "ocr-pdf", "json-to-csv"],
    nextTools: ["pdf-compressor", "pdf-merge"],
    blogLinks: [
      { title: "How to Extract Data from PDF to Excel", path: "/blog/pdf-to-excel-guide" },
      { title: "PDF Best Practices for Professionals", path: "/blog/pdf-best-practices" },
    ],
    peopleAlsoSearch: ["extract table from pdf online free", "pdf to csv online", "convert pdf table to excel"],
  },
  "ocr-pdf": {
    relatedTools: ["pdf-to-word", "image-to-text", "pdf-to-excel"],
    nextTools: ["text-cleaner", "word-counter"],
    blogLinks: [{ title: "Using OCR to Extract Text from Scanned PDFs", path: "/blog/ocr-pdf-guide" }],
    peopleAlsoSearch: ["extract text from scanned pdf free", "ocr pdf online", "pdf text recognition tool"],
  },
  "pdf-to-images": {
    relatedTools: ["pdf-split", "image-compressor", "image-resizer"],
    nextTools: ["image-to-webp", "image-compressor"],
    blogLinks: [{ title: "PDF Best Practices for Professionals", path: "/blog/pdf-best-practices" }],
    peopleAlsoSearch: ["convert pdf to jpg online free", "pdf pages to images", "pdf to png converter free"],
  },
  "pdf-to-ppt": {
    relatedTools: ["pdf-to-word", "pdf-to-images", "pdf-compressor"],
    nextTools: ["word-to-pdf", "image-compressor"],
    blogLinks: [{ title: "PDF Best Practices for Professionals", path: "/blog/pdf-best-practices" }],
    peopleAlsoSearch: ["convert pdf to powerpoint online free", "pdf to slides online", "pdf presentation converter"],
  },
  "word-to-pdf": {
    relatedTools: ["pdf-to-word", "pdf-compressor", "pdf-merge"],
    nextTools: ["pdf-compressor", "pdf-merge"],
    blogLinks: [
      { title: "PDF Best Practices for Professionals", path: "/blog/pdf-best-practices" },
      { title: "Complete Guide to Converting PDF to Word Online", path: "/blog/pdf-to-word-guide" },
    ],
    peopleAlsoSearch: ["docx to pdf online free", "word document to pdf converter", "convert doc to pdf free"],
  },
  "image-to-pdf": {
    relatedTools: ["pdf-merge", "image-compressor", "image-resizer"],
    nextTools: ["pdf-compressor", "pdf-merge"],
    blogLinks: [{ title: "PDF Best Practices for Professionals", path: "/blog/pdf-best-practices" }],
    peopleAlsoSearch: ["jpg to pdf online free", "convert photos to pdf", "multiple images to pdf"],
  },
  "pdf-password-protector": {
    relatedTools: ["pdf-compressor", "pdf-merge", "pdf-split"],
    nextTools: ["pdf-to-word", "pdf-compressor"],
    blogLinks: [{ title: "PDF Best Practices for Professionals", path: "/blog/pdf-best-practices" }],
    peopleAlsoSearch: ["unlock pdf free online", "remove password from pdf", "decrypt pdf file free"],
  },
  "image-background-remover": {
    relatedTools: ["image-compressor", "image-resizer", "image-to-webp"],
    nextTools: ["image-to-pdf", "image-to-webp"],
    blogLinks: [
      { title: "AI Background Removal: Complete Guide", path: "/blog/background-remover-guide" },
      { title: "Image Optimization for the Web", path: "/blog/image-optimization" },
    ],
    peopleAlsoSearch: ["remove background from photo free", "transparent background maker", "ai photo background eraser"],
  },
  "image-to-webp": {
    relatedTools: ["image-compressor", "image-resizer", "image-background-remover"],
    nextTools: ["image-compressor", "image-background-remover"],
    blogLinks: [
      { title: "WebP Conversion Guide for Web Developers", path: "/blog/webp-converter-guide" },
      { title: "Image Optimization for the Web", path: "/blog/image-optimization" },
    ],
    peopleAlsoSearch: ["convert jpeg to webp free", "png to webp online", "webp format converter"],
  },
  "image-compressor": {
    relatedTools: ["image-resizer", "image-to-webp", "image-background-remover"],
    nextTools: ["image-to-webp", "image-resizer"],
    blogLinks: [
      { title: "How to Compress Images for Websites", path: "/blog/image-compressor-guide" },
      { title: "Image Optimization for the Web", path: "/blog/image-optimization" },
    ],
    peopleAlsoSearch: ["compress jpeg online free", "reduce image file size", "image optimizer free online"],
  },
  "image-resizer": {
    relatedTools: ["image-compressor", "image-cropper", "image-to-webp"],
    nextTools: ["image-compressor", "image-to-webp"],
    blogLinks: [{ title: "Image Optimization for the Web", path: "/blog/image-optimization" }],
    peopleAlsoSearch: ["resize photo online free", "change image dimensions", "scale image online free"],
  },
  "image-cropper": {
    relatedTools: ["image-resizer", "image-compressor", "image-background-remover"],
    nextTools: ["image-resizer", "image-compressor"],
    blogLinks: [{ title: "Image Optimization for the Web", path: "/blog/image-optimization" }],
    peopleAlsoSearch: ["crop photo online free", "cut image online", "crop picture to size free"],
  },
  "image-to-text": {
    relatedTools: ["ocr-pdf", "word-counter", "text-cleaner"],
    nextTools: ["text-cleaner", "word-counter"],
    blogLinks: [{ title: "Image Optimization for the Web", path: "/blog/image-optimization" }],
    peopleAlsoSearch: ["extract text from image free", "photo to text ocr online", "image text recognition free"],
  },
  "unit-converter": {
    relatedTools: ["bmi-calculator", "emi-calculator", "tip-calculator"],
    nextTools: ["bmi-calculator", "age-calculator"],
    blogLinks: [{ title: "Essential Tools for Students", path: "/blog/productivity-tools-students" }],
    peopleAlsoSearch: ["metric to imperial converter", "length unit converter online", "temperature unit converter free"],
  },
  "color-converter": {
    relatedTools: ["html-formatter", "base64-tool", "meta-tag-generator"],
    nextTools: ["html-formatter", "meta-tag-generator"],
    blogLinks: [{ title: "Web Development Tools Guide", path: "/blog/web-development-tools" }],
    peopleAlsoSearch: ["hex to rgb color converter", "rgb to hsl online free", "css color code converter"],
  },
  "json-to-csv": {
    relatedTools: ["base64-tool", "html-formatter", "pdf-to-excel"],
    nextTools: ["html-formatter", "text-cleaner"],
    blogLinks: [{ title: "Web Development Tools Guide", path: "/blog/web-development-tools" }],
    peopleAlsoSearch: ["convert json to excel free", "json to csv data converter", "parse json online free"],
  },
  "word-counter": {
    relatedTools: ["case-converter", "text-cleaner", "website-word-counter"],
    nextTools: ["case-converter", "text-cleaner"],
    blogLinks: [
      { title: "How to Use the Word Counter Tool Effectively", path: "/blog/word-counter-guide" },
      { title: "Text & Productivity Tools Guide", path: "/blog/text-productivity" },
    ],
    peopleAlsoSearch: ["count characters online free", "word count for essays", "writing character limit checker"],
  },
  "case-converter": {
    relatedTools: ["word-counter", "text-cleaner", "text-diff"],
    nextTools: ["text-cleaner", "word-counter"],
    blogLinks: [{ title: "Text & Productivity Tools Guide", path: "/blog/text-productivity" }],
    peopleAlsoSearch: ["change text to lowercase free", "convert to title case online", "camelcase converter online"],
  },
  "text-cleaner": {
    relatedTools: ["word-counter", "case-converter", "text-diff"],
    nextTools: ["word-counter", "case-converter"],
    blogLinks: [{ title: "Text & Productivity Tools Guide", path: "/blog/text-productivity" }],
    peopleAlsoSearch: ["remove extra spaces from text", "clean up copied text online", "text whitespace remover free"],
  },
  "text-diff": {
    relatedTools: ["text-cleaner", "html-formatter", "base64-tool"],
    nextTools: ["html-formatter", "text-cleaner"],
    blogLinks: [{ title: "Web Development Tools Guide", path: "/blog/web-development-tools" }],
    peopleAlsoSearch: ["compare two texts online free", "text comparison checker", "find differences in documents"],
  },
  "html-formatter": {
    relatedTools: ["json-to-csv", "base64-tool", "meta-tag-generator"],
    nextTools: ["meta-tag-generator", "color-converter"],
    blogLinks: [{ title: "Web Development Tools Guide", path: "/blog/web-development-tools" }],
    peopleAlsoSearch: ["format html code online free", "html beautifier online", "html indenter free"],
  },
  "bmi-calculator": {
    relatedTools: ["age-calculator", "emi-calculator", "unit-converter"],
    nextTools: ["age-calculator", "unit-converter"],
    blogLinks: [
      { title: "BMI Calculator: Complete Usage Guide", path: "/blog/bmi-calculator-guide" },
      { title: "Financial & Health Calculators Guide", path: "/blog/financial-calculators" },
    ],
    peopleAlsoSearch: ["body mass index calculator free", "bmi for adults calculator", "healthy bmi range checker"],
  },
  "age-calculator": {
    relatedTools: ["bmi-calculator", "tip-calculator", "emi-calculator"],
    nextTools: ["bmi-calculator", "emi-calculator"],
    blogLinks: [{ title: "Financial & Health Calculators Guide", path: "/blog/financial-calculators" }],
    peopleAlsoSearch: ["calculate exact age from birthday", "how many days old am i", "age difference calculator free"],
  },
  "emi-calculator": {
    relatedTools: ["tip-calculator", "age-calculator", "bmi-calculator"],
    nextTools: ["tip-calculator", "age-calculator"],
    blogLinks: [{ title: "Financial & Health Calculators Guide", path: "/blog/financial-calculators" }],
    peopleAlsoSearch: ["home loan emi calculator", "personal loan emi calculator free", "car loan monthly payment calculator"],
  },
  "tip-calculator": {
    relatedTools: ["emi-calculator", "age-calculator", "unit-converter"],
    nextTools: ["emi-calculator", "bmi-calculator"],
    blogLinks: [{ title: "Financial & Health Calculators Guide", path: "/blog/financial-calculators" }],
    peopleAlsoSearch: ["restaurant bill split calculator", "how to calculate tip percentage", "tip per person calculator free"],
  },
  "url-shortener": {
    relatedTools: ["qr-generator", "meta-tag-generator", "password-generator"],
    nextTools: ["qr-generator", "meta-tag-generator"],
    blogLinks: [{ title: "URL Shortener: Complete Usage Guide", path: "/blog/url-shortener-guide" }],
    peopleAlsoSearch: ["free link shortener no sign up", "short url creator online", "tiny link maker free"],
  },
  "qr-generator": {
    relatedTools: ["url-shortener", "password-generator", "meta-tag-generator"],
    nextTools: ["url-shortener", "meta-tag-generator"],
    blogLinks: [{ title: "QR Code Generator: Complete Guide", path: "/blog/qr-generator-guide" }],
    peopleAlsoSearch: ["create qr code free online", "qr code for business card", "qr code generator no watermark"],
  },
  "password-generator": {
    relatedTools: ["qr-generator", "base64-tool", "random-number"],
    nextTools: ["qr-generator", "url-shortener"],
    blogLinks: [{ title: "Password Generator: Security Best Practices", path: "/blog/password-generator-guide" }],
    peopleAlsoSearch: ["strong password creator free", "random secure password generator", "generate complex password online"],
  },
  "stopwatch": {
    relatedTools: ["age-calculator", "random-number", "tip-calculator"],
    nextTools: ["age-calculator", "emi-calculator"],
    blogLinks: [{ title: "Complete Guide to QuickTools", path: "/blog/all-tools-guide" }],
    peopleAlsoSearch: ["online timer with alarm", "countdown timer free", "lap stopwatch browser"],
  },
  "random-number": {
    relatedTools: ["password-generator", "stopwatch", "age-calculator"],
    nextTools: ["password-generator", "qr-generator"],
    blogLinks: [{ title: "Complete Guide to QuickTools", path: "/blog/all-tools-guide" }],
    peopleAlsoSearch: ["pick random number online", "lottery number generator free", "random integer generator online"],
  },
  "youtube-thumbnail-downloader": {
    relatedTools: ["url-shortener", "qr-generator", "image-compressor"],
    nextTools: ["image-compressor", "image-resizer"],
    blogLinks: [{ title: "Content Creation Tools for Creators", path: "/blog/content-creation-tools" }],
    peopleAlsoSearch: ["save youtube thumbnail hd", "youtube video thumbnail grabber", "download yt thumbnail free"],
  },
  "meta-tag-generator": {
    relatedTools: ["html-formatter", "word-counter", "url-shortener"],
    nextTools: ["html-formatter", "color-converter"],
    blogLinks: [{ title: "Web Development Tools Guide", path: "/blog/web-development-tools" }],
    peopleAlsoSearch: ["seo meta tags generator free", "open graph tag generator", "website metadata creator online"],
  },
  "website-word-counter": {
    relatedTools: ["word-counter", "meta-tag-generator", "url-shortener"],
    nextTools: ["word-counter", "text-cleaner"],
    blogLinks: [{ title: "Text & Productivity Tools Guide", path: "/blog/text-productivity" }],
    peopleAlsoSearch: ["count words on webpage free", "website content word count", "web page text analyzer"],
  },
  "base64-tool": {
    relatedTools: ["html-formatter", "json-to-csv", "text-cleaner"],
    nextTools: ["html-formatter", "json-to-csv"],
    blogLinks: [{ title: "Web Development Tools Guide", path: "/blog/web-development-tools" }],
    peopleAlsoSearch: ["base64 text encoder online free", "decode base64 string free", "base64 image encoder online"],
  },
};
