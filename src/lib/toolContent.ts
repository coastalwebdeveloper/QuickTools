export interface ToolContentData {
  description: string;
  howToUse: string[];
  benefits: string[];
  useCases: string[];
  faq: { question: string; answer: string }[];
}

export const toolContentData: Record<string, ToolContentData> = {
  "pdf-to-word": {
    description: "Convert PDF documents to editable Word files (.docx) while preserving text, formatting, and structure. Perfect for editing contracts, reports, and documents originally created as PDFs.",
    howToUse: [
      "Upload your PDF file",
      "Click 'Convert to Word'",
      "Wait for processing to complete",
      "Download the Word document (.docx)",
      "Open in Microsoft Word or Google Docs"
    ],
    benefits: [
      "Preserves document structure and formatting",
      "Maintains headings and paragraphs",
      "Includes page breaks",
      "Browser-based processing",
      "No file uploads to servers",
      "Free unlimited conversions",
      "Works offline after load"
    ],
    useCases: [
      "Editing PDF contracts and agreements",
      "Updating legacy documents",
      "Extracting content for reuse",
      "Converting reports for editing",
      "Recovering text from PDFs",
      "Modifying forms and templates",
      "Collaborative document editing"
    ],
    faq: [
      { question: "Will formatting be preserved?", answer: "Basic formatting like headings, paragraphs, and page breaks are preserved. Complex layouts may need manual adjustment." },
      { question: "Can I convert scanned PDFs?", answer: "Scanned PDFs contain images, not text. Use OCR PDF tool first to extract text, then convert to Word." },
      { question: "Are my PDFs uploaded anywhere?", answer: "No. All conversion happens in your browser. Your files never leave your device." },
      { question: "What about images in PDFs?", answer: "Images are preserved and embedded in the Word document where possible." },
      { question: "Can I edit the Word document?", answer: "Yes, the output is a fully editable .docx file that works with Microsoft Word, Google Docs, and other word processors." }
    ]
  },
  "pdf-compressor": {
    description: "Reduce PDF file sizes without losing quality. Compress PDFs for email attachments, faster uploads, and reduced storage space while maintaining document readability.",
    howToUse: [
      "Upload your PDF file",
      "View original file size",
      "Click 'Compress PDF'",
      "Wait for compression to complete",
      "Download the compressed PDF"
    ],
    benefits: [
      "Reduces file size by 40-70%",
      "Maintains document quality",
      "No quality loss for text",
      "Browser-based processing",
      "No file uploads to servers",
      "Free unlimited compression",
      "Works offline after load"
    ],
    useCases: [
      "Email attachments within size limits",
      "Faster website PDF downloads",
      "Reducing cloud storage usage",
      "Mobile-friendly file sizes",
      "Batch archiving documents",
      "Meeting upload size restrictions",
      "Optimizing PDF portfolios"
    ],
    faq: [
      { question: "How much compression can I expect?", answer: "Typically 40-70% reduction depending on content. Image-heavy PDFs compress more than text-only documents." },
      { question: "Will text quality be affected?", answer: "No. Text remains crisp and readable. Compression mainly affects images and redundant data." },
      { question: "Can I compress already-compressed PDFs?", answer: "Yes, but results may be minimal if the PDF is already optimized." },
      { question: "Are PDFs uploaded to servers?", answer: "No. All compression happens in your browser. Your files never leave your device." },
      { question: "Is there a file size limit?", answer: "The only limit is your browser's memory. Most PDFs up to 100MB compress without issues." }
    ]
  },
  "pdf-to-excel": {
    description: "Extract tables and data from PDF documents and convert them to Excel-compatible CSV format. Perfect for analyzing financial data, processing invoices, and working with tabular information.",
    howToUse: [
      "Upload your PDF file with tables",
      "Click 'Convert to Excel'",
      "Wait for extraction to complete",
      "Download the CSV file",
      "Open in Excel or Google Sheets"
    ],
    benefits: [
      "Extracts tabular data from PDFs",
      "CSV format compatible with all spreadsheet software",
      "Preserves data structure",
      "Browser-based processing",
      "No file uploads to servers",
      "Free unlimited conversions",
      "Works offline after load"
    ],
    useCases: [
      "Extracting financial statements",
      "Processing invoice data",
      "Converting report tables",
      "Analyzing survey results",
      "Importing data to databases",
      "Creating spreadsheets from PDFs",
      "Data analysis and manipulation"
    ],
    faq: [
      { question: "Will table formatting be preserved?", answer: "Data is extracted as CSV (comma-separated values). You may need to adjust formatting in Excel." },
      { question: "Can it handle complex tables?", answer: "Simple tables work best. Complex multi-level tables may require manual cleanup." },
      { question: "What if my PDF has multiple tables?", answer: "All tables are extracted and included in the CSV file." },
      { question: "Are PDFs uploaded anywhere?", answer: "No. All extraction happens in your browser. Your files never leave your device." },
      { question: "Can I convert scanned PDFs?", answer: "Scanned PDFs need OCR first. Use our OCR PDF tool to extract text before converting to Excel." }
    ]
  },
  "ocr-pdf": {
    description: "Extract text from scanned PDF documents using Optical Character Recognition. Convert image-based PDFs into searchable, editable text that you can copy, edit, and reuse.",
    howToUse: [
      "Upload your scanned PDF file",
      "Click 'Extract Text'",
      "Wait for OCR processing",
      "View extracted text",
      "Copy or download the text"
    ],
    benefits: [
      "Extracts text from scanned documents",
      "Makes PDFs searchable",
      "Copy and edit extracted text",
      "Browser-based processing",
      "No file uploads to servers",
      "Free unlimited extractions",
      "Works offline after load"
    ],
    useCases: [
      "Digitizing scanned documents",
      "Extracting text from old papers",
      "Making PDFs searchable",
      "Converting book pages to text",
      "Processing receipts and invoices",
      "Recovering text from images",
      "Creating editable versions of scans"
    ],
    faq: [
      { question: "How accurate is OCR?", answer: "Accuracy depends on scan quality. Clear, high-resolution scans (300+ DPI) produce best results." },
      { question: "Can it read handwriting?", answer: "OCR works best with typed or printed text. Handwriting recognition is limited." },
      { question: "What languages are supported?", answer: "The tool supports English and most Latin-based languages." },
      { question: "Are PDFs uploaded anywhere?", answer: "No. All OCR processing happens in your browser. Your files never leave your device." },
      { question: "Can I edit the extracted text?", answer: "Yes, extracted text can be copied, edited, and used in any application." }
    ]
  },
  "image-background-remover": {
    description: "Remove backgrounds from images automatically using AI technology. Create transparent PNGs perfect for product photos, profile pictures, and professional graphics.",
    howToUse: [
      "Upload your image (JPG, PNG, WebP)",
      "Click 'Remove Background'",
      "Wait for AI processing (5-15 seconds)",
      "Preview the result",
      "Download transparent PNG"
    ],
    benefits: [
      "AI-powered background removal",
      "Professional quality results",
      "Transparent PNG output",
      "Works with people, products, animals",
      "Browser-based processing",
      "No image uploads to servers",
      "Free unlimited removals"
    ],
    useCases: [
      "E-commerce product photos",
      "Professional profile pictures",
      "Marketing materials",
      "Social media graphics",
      "Presentation images",
      "Logo creation",
      "Photo editing projects"
    ],
    faq: [
      { question: "How does AI background removal work?", answer: "AI analyzes the image to identify the subject and precisely removes everything else, creating a transparent background." },
      { question: "What subjects work best?", answer: "People, products, animals, and objects with clear edges work best. Complex backgrounds may need manual touch-up." },
      { question: "Can I add a new background?", answer: "Yes, the transparent PNG can be placed on any background using image editing software." },
      { question: "Are images uploaded anywhere?", answer: "No. All AI processing happens in your browser. Your images never leave your device." },
      { question: "What format is the output?", answer: "Images are saved as PNG files with transparent backgrounds (alpha channel)." }
    ]
  },
  "image-to-webp": {
    description: "Convert images to modern WebP format for superior compression and faster website loading. Reduce image sizes by 30% compared to JPEG while maintaining quality.",
    howToUse: [
      "Upload your image (JPG, PNG, etc.)",
      "Adjust quality slider (1-100%)",
      "Click 'Convert to WebP'",
      "Preview the result",
      "Download WebP image"
    ],
    benefits: [
      "30% smaller than JPEG",
      "26% smaller than PNG",
      "Supports transparency",
      "Adjustable quality",
      "Browser-based processing",
      "No image uploads to servers",
      "Free unlimited conversions"
    ],
    useCases: [
      "Website image optimization",
      "Faster page loading",
      "E-commerce product images",
      "Blog post images",
      "Mobile app assets",
      "Reducing bandwidth costs",
      "Improving SEO rankings"
    ],
    faq: [
      { question: "What is WebP?", answer: "WebP is a modern image format developed by Google that provides superior compression for web images." },
      { question: "Do all browsers support WebP?", answer: "Yes, all modern browsers (Chrome, Firefox, Safari, Edge) support WebP since 2020." },
      { question: "Can WebP have transparent backgrounds?", answer: "Yes, WebP supports transparency like PNG but with better compression." },
      { question: "Are images uploaded anywhere?", answer: "No. All conversion happens in your browser. Your images never leave your device." },
      { question: "What quality setting should I use?", answer: "80-90% quality provides excellent results with significant file size reduction." }
    ]
  },
  "url-shortener": {
    description: "Create short, shareable links from long URLs. Perfect for social media, marketing campaigns, and making links more manageable and memorable.",
    howToUse: [
      "Paste your long URL",
      "Click 'Shorten URL'",
      "Copy the short link",
      "Share on social media or messaging",
      "Track clicks (if analytics enabled)"
    ],
    benefits: [
      "Creates short, memorable links",
      "Perfect for social media",
      "Easy to share and remember",
      "One-click copy to clipboard",
      "Browser-based processing",
      "Free unlimited shortening",
      "Works offline after load"
    ],
    useCases: [
      "Social media posts (Twitter, LinkedIn)",
      "SMS and text messages",
      "Print materials (business cards, flyers)",
      "QR code generation",
      "Email campaigns",
      "Marketing materials",
      "Presentation slides"
    ],
    faq: [
      { question: "Do short links expire?", answer: "Short links are permanent and never expire unless you delete them." },
      { question: "Can I customize the short URL?", answer: "Custom URLs may be available in future updates. Currently, URLs are auto-generated." },
      { question: "Can I track clicks?", answer: "Basic click tracking may be added in future updates." },
      { question: "Are URLs stored?", answer: "Short URLs are generated and stored to maintain the redirect functionality." },
      { question: "Is there a limit to URL length?", answer: "You can shorten URLs up to 2000 characters long." }
    ]
  },
  "word-counter": {
    description: "The Word Counter tool is a free online utility that instantly analyzes your text to provide detailed statistics including word count, character count, sentence count, paragraph count, and estimated reading time. Perfect for writers, students, bloggers, and content creators who need to track text metrics for essays, articles, social media posts, or any written content.",
    howToUse: [
      "Type or paste your text into the text area",
      "View real-time statistics as you type",
      "Check word count, character count (with and without spaces), sentences, paragraphs, and lines",
      "See estimated reading time (based on 200 words per minute)",
      "See estimated speaking time (based on 150 words per minute)",
      "Copy your text or clear it when done"
    ],
    benefits: [
      "Instant real-time counting - no need to click any buttons",
      "Multiple metrics in one tool - words, characters, sentences, paragraphs, lines",
      "Reading and speaking time estimates for presentations and content planning",
      "100% free with no registration required",
      "Works offline - all processing happens in your browser",
      "Mobile-friendly interface for counting on any device",
      "Privacy-focused - your text never leaves your device"
    ],
    useCases: [
      "Meeting essay or article word count requirements for school or work",
      "Staying within character limits for social media posts (Twitter, LinkedIn, etc.)",
      "Tracking blog post length for SEO optimization",
      "Estimating reading time for articles and presentations",
      "Checking resume or cover letter length",
      "Analyzing speech length for presentations and talks",
      "Monitoring content length for email campaigns"
    ],
    faq: [
      {
        question: "How accurate is the word count?",
        answer: "The word counter uses standard word counting algorithms that split text by whitespace. It's the same method used by most word processors and is highly accurate for English and most languages."
      },
      {
        question: "Does it work offline?",
        answer: "Yes! Once the page loads, the word counter works completely offline. All processing happens in your browser, so you don't need an internet connection."
      },
      {
        question: "Is my text stored or sent anywhere?",
        answer: "No. Your text is processed entirely in your browser and is never uploaded to our servers or stored anywhere. Your privacy is completely protected."
      },
      {
        question: "How is reading time calculated?",
        answer: "Reading time is calculated based on an average reading speed of 200 words per minute, which is the standard for adult readers. Speaking time uses 150 words per minute."
      },
      {
        question: "Can I use this for any language?",
        answer: "Yes, the word counter works with any language. However, reading time estimates are based on English reading speeds and may vary for other languages."
      }
    ]
  },
  "password-generator": {
    description: "The Password Generator creates strong, secure, random passwords to protect your online accounts. Generate passwords with customizable length and character types including uppercase, lowercase, numbers, and special symbols. Essential for maintaining cybersecurity and protecting sensitive information.",
    howToUse: [
      "Select your desired password length (8-128 characters)",
      "Choose character types: uppercase, lowercase, numbers, symbols",
      "Click 'Generate Password' to create a secure password",
      "Copy the password to your clipboard",
      "Use the password for your account registration or password reset",
      "Generate multiple passwords if needed"
    ],
    benefits: [
      "Creates cryptographically secure random passwords",
      "Customizable length and character types",
      "Instant generation - no waiting",
      "One-click copy to clipboard",
      "No password storage - generated on-demand",
      "Free and unlimited use",
      "Works offline for maximum security"
    ],
    useCases: [
      "Creating strong passwords for new online accounts",
      "Updating weak or compromised passwords",
      "Generating unique passwords for each service",
      "Creating temporary passwords for shared accounts",
      "Setting up secure Wi-Fi passwords",
      "Generating API keys and tokens",
      "Creating secure passphrases for encryption"
    ],
    faq: [
      {
        question: "How secure are the generated passwords?",
        answer: "Very secure. We use cryptographically secure random number generation (crypto.getRandomValues) to ensure passwords are truly random and unpredictable."
      },
      {
        question: "Are the passwords stored anywhere?",
        answer: "No. Passwords are generated in your browser and never sent to our servers or stored anywhere. Once you close the page, they're gone forever."
      },
      {
        question: "What makes a strong password?",
        answer: "A strong password is at least 12 characters long and includes a mix of uppercase, lowercase, numbers, and symbols. Avoid dictionary words and personal information."
      },
      {
        question: "Should I use different passwords for each account?",
        answer: "Absolutely! Using unique passwords for each account prevents a breach on one service from compromising all your accounts. Consider using a password manager to store them securely."
      },
      {
        question: "How long should my password be?",
        answer: "We recommend at least 12-16 characters for most accounts. For highly sensitive accounts (banking, email), use 20+ characters if possible."
      }
    ]
  },
  "qr-generator": {
    description: "The QR Code Generator creates scannable QR codes from any text, URL, or data. Perfect for sharing links, contact information, Wi-Fi credentials, or any text-based information that can be quickly scanned with a smartphone camera.",
    howToUse: [
      "Enter the text, URL, or data you want to encode",
      "The QR code generates automatically as you type",
      "Adjust the size if needed",
      "Download the QR code as a PNG image",
      "Use the QR code in your materials, websites, or print media"
    ],
    benefits: [
      "Instant QR code generation",
      "Supports URLs, text, phone numbers, and more",
      "Downloadable high-quality PNG images",
      "Customizable size",
      "Free and unlimited use",
      "No watermarks or branding",
      "Works offline after initial load"
    ],
    useCases: [
      "Sharing website URLs in print materials",
      "Creating digital business cards",
      "Sharing Wi-Fi passwords with guests",
      "Adding links to product packaging",
      "Event registration and ticketing",
      "Restaurant menu links",
      "Social media profile sharing"
    ],
    faq: [
      {
        question: "What can I encode in a QR code?",
        answer: "You can encode any text including URLs, plain text, phone numbers, email addresses, SMS messages, Wi-Fi credentials, and more. Most smartphones can scan and interpret these automatically."
      },
      {
        question: "Is there a limit to how much data I can encode?",
        answer: "QR codes can technically hold up to 4,296 alphanumeric characters, but for best scanning results, we recommend keeping it under 300 characters. Shorter data creates simpler, easier-to-scan codes."
      },
      {
        question: "Will the QR code expire?",
        answer: "No. QR codes are static and contain the data directly. They never expire and will work forever, even if our website goes offline."
      },
      {
        question: "What format is the downloaded QR code?",
        answer: "QR codes are downloaded as PNG images with a transparent background, making them easy to use in any design or document."
      },
      {
        question: "Can I customize the colors or design?",
        answer: "The current version generates standard black and white QR codes for maximum compatibility. Custom designs may be added in future updates."
      }
    ]
  },
  "bmi-calculator": {
    description: "The BMI (Body Mass Index) Calculator helps you determine your body mass index based on your height and weight. BMI is a widely used indicator of healthy body weight and can help identify potential health risks associated with being underweight, overweight, or obese.",
    howToUse: [
      "Select your preferred unit system (Metric or Imperial)",
      "Enter your weight (kg or lbs)",
      "Enter your height (cm or feet/inches)",
      "View your BMI result instantly",
      "Check your BMI category and health recommendations"
    ],
    benefits: [
      "Instant BMI calculation",
      "Supports both metric and imperial units",
      "Clear BMI category classification",
      "Health recommendations based on results",
      "Free and private - no data stored",
      "Mobile-friendly interface",
      "No registration required"
    ],
    useCases: [
      "Monitoring weight loss or gain progress",
      "Health screening and assessment",
      "Fitness goal setting",
      "Medical consultations preparation",
      "Insurance health assessments",
      "Personal health tracking",
      "Nutrition planning"
    ],
    faq: [
      {
        question: "What is BMI?",
        answer: "BMI (Body Mass Index) is a measure of body fat based on height and weight. It's calculated by dividing weight in kilograms by height in meters squared (kg/m²)."
      },
      {
        question: "Is BMI accurate for everyone?",
        answer: "BMI is a useful screening tool but has limitations. It doesn't account for muscle mass, bone density, or body composition. Athletes and very muscular individuals may have high BMI despite being healthy."
      },
      {
        question: "What are the BMI categories?",
        answer: "Underweight: <18.5, Normal: 18.5-24.9, Overweight: 25-29.9, Obese: ≥30. These are general guidelines and may vary by age, gender, and ethnicity."
      },
      {
        question: "Should I use BMI for medical decisions?",
        answer: "BMI is a screening tool, not a diagnostic tool. Always consult healthcare professionals for medical advice and comprehensive health assessments."
      },
      {
        question: "How often should I check my BMI?",
        answer: "For general health monitoring, checking BMI monthly or quarterly is sufficient. If you're actively working on weight goals, weekly checks can help track progress."
      }
    ]
  },
  "pdf-merge": {
    description: "The PDF Merge tool combines multiple PDF files into a single document. Perfect for consolidating reports, merging scanned pages, or creating comprehensive documents from separate files while maintaining quality and formatting.",
    howToUse: [
      "Upload multiple PDF files you want to merge",
      "Drag and drop to reorder the files",
      "Preview the order of pages",
      "Click 'Merge PDFs' to combine them",
      "Download the merged PDF file"
    ],
    benefits: [
      "Combine unlimited PDF files",
      "Drag-and-drop reordering",
      "No quality loss or compression",
      "All processing happens in your browser",
      "No file size limits",
      "Free and unlimited use",
      "Works offline after initial load"
    ],
    useCases: [
      "Combining multiple invoices or receipts",
      "Merging chapters of a book or report",
      "Consolidating scanned documents",
      "Creating presentation handouts",
      "Combining contracts and agreements",
      "Merging tax documents",
      "Creating complete project documentation"
    ],
    faq: [
      { question: "Is there a limit to how many PDFs I can merge?", answer: "No hard limit. You can merge as many PDFs as your browser memory can handle, typically dozens of files." },
      { question: "Will merging reduce PDF quality?", answer: "No. The tool preserves original quality, resolution, and formatting of all pages." },
      { question: "Are my PDFs uploaded to a server?", answer: "No. All merging happens locally in your browser. Your files never leave your device." },
      { question: "Can I merge password-protected PDFs?", answer: "You must unlock password-protected PDFs before merging due to security restrictions." },
      { question: "Can I change the order of PDFs?", answer: "Yes. Simply drag and drop files to reorder them before merging." }
    ]
  },
  "pdf-split": {
    description: "The PDF Split tool separates multi-page PDF documents into individual single-page files. Perfect for extracting specific pages, organizing documents, or sharing individual pages without sending the entire document.",
    howToUse: [
      "Upload your PDF file",
      "Preview the number of pages",
      "Click 'Split PDF' to separate pages",
      "Download individual page files",
      "Each page saves as a separate PDF"
    ],
    benefits: [
      "Split into individual pages",
      "No quality loss",
      "Batch download all pages",
      "Browser-based processing",
      "No file uploads to servers",
      "Free unlimited splits",
      "Works offline after load"
    ],
    useCases: [
      "Extracting specific pages from reports",
      "Separating scanned documents",
      "Sharing individual pages",
      "Organizing multi-page documents",
      "Creating single-page handouts",
      "Extracting forms from packets",
      "Splitting contracts and agreements"
    ],
    faq: [
      { question: "Does splitting reduce PDF quality?", answer: "No. Each page maintains the original quality and formatting from the source PDF." },
      { question: "Can I split password-protected PDFs?", answer: "You must unlock password-protected PDFs before splitting due to security restrictions." },
      { question: "Are PDFs uploaded to a server?", answer: "No. All splitting happens locally in your browser. Your files never leave your device." },
      { question: "Can I select specific pages to extract?", answer: "The current version splits all pages. Selective extraction may be added in future updates." },
      { question: "How are the files named?", answer: "Split pages are automatically named as 'page-1.pdf', 'page-2.pdf', etc." }
    ]
  },
  "pdf-to-images": {
    description: "The PDF to Images tool converts PDF pages into individual image files (PNG, JPEG). Ideal for extracting graphics, creating thumbnails, or converting documents into image format for presentations and web use.",
    howToUse: [
      "Upload your PDF file",
      "Select output format (PNG or JPEG)",
      "Choose quality settings",
      "Click 'Convert to Images'",
      "Download individual images or all as ZIP"
    ],
    benefits: [
      "Convert to PNG or JPEG format",
      "High-quality image output",
      "Batch download as ZIP",
      "Adjustable quality settings",
      "Browser-based processing",
      "No file uploads to servers",
      "Free unlimited conversions"
    ],
    useCases: [
      "Creating thumbnails for PDF documents",
      "Extracting diagrams and charts",
      "Converting slides for web display",
      "Creating social media graphics",
      "Extracting pages for editing",
      "Creating image backups of documents",
      "Preparing images for presentations"
    ],
    faq: [
      { question: "What image formats are supported?", answer: "You can convert PDFs to PNG (lossless, transparent background) or JPEG (smaller file size) formats." },
      { question: "Can I convert specific pages only?", answer: "Yes, you can select which pages to convert or convert all pages at once." },
      { question: "What resolution are the images?", answer: "Images are rendered at high resolution (typically 150-300 DPI) for clear, sharp output." },
      { question: "Are PDFs uploaded anywhere?", answer: "No. All conversion happens in your browser. Your PDF never leaves your device." },
      { question: "Can I convert multi-page PDFs?", answer: "Yes. Each page becomes a separate image file that you can download individually or as a ZIP." }
    ]
  },
  "image-compressor": {
    description: "The Image Compressor reduces image file sizes while maintaining visual quality. Perfect for optimizing photos for websites, social media, email attachments, or storage. Supports JPEG, PNG, and WebP formats with adjustable compression levels.",
    howToUse: [
      "Upload one or multiple images (JPEG, PNG, WebP)",
      "Adjust the compression quality slider",
      "Preview compressed images and size reduction",
      "Download individual images or all as ZIP",
      "Compare original vs compressed side-by-side"
    ],
    benefits: [
      "Reduce file sizes by 50-90%",
      "Batch compress multiple images",
      "Adjustable quality control",
      "Preview before downloading",
      "Browser-based processing",
      "Supports JPEG, PNG, WebP",
      "No watermarks or limits"
    ],
    useCases: [
      "Optimizing images for faster website loading",
      "Reducing photo sizes for email attachments",
      "Preparing images for social media",
      "Saving storage space on devices",
      "Meeting file size upload limits",
      "Optimizing product photos for e-commerce",
      "Compressing images for mobile apps"
    ],
    faq: [
      { question: "Will compression reduce image quality?", answer: "Some quality loss occurs, but at 80-90% quality most people can't see the difference while file sizes are dramatically reduced." },
      { question: "What's the difference between JPEG and PNG compression?", answer: "JPEG uses lossy compression (smaller files, slight quality loss) for photos. PNG uses lossless compression for graphics with text or transparency." },
      { question: "Are my images uploaded to servers?", answer: "No. All compression happens locally in your browser. Your images never leave your device." },
      { question: "Can I compress images on mobile?", answer: "Yes! The tool works on all devices including smartphones and tablets." },
      { question: "Is there a file size or quantity limit?", answer: "The only limit is your device's memory. You can typically compress dozens of images at once." }
    ]
  },
  "image-resizer": {
    description: "The Image Resizer changes image dimensions to any width and height. Perfect for creating thumbnails, fitting images to specific sizes, or preparing photos for different platforms while maintaining aspect ratio or custom dimensions.",
    howToUse: [
      "Upload your image",
      "Enter desired width and height",
      "Choose to maintain aspect ratio or not",
      "Preview the resized image",
      "Download the resized image"
    ],
    benefits: [
      "Resize to any dimensions",
      "Maintain or ignore aspect ratio",
      "Batch resize multiple images",
      "High-quality output",
      "Instant preview",
      "Browser-based processing",
      "Free unlimited resizing"
    ],
    useCases: [
      "Creating thumbnails for galleries",
      "Resizing profile pictures",
      "Fitting images to website layouts",
      "Preparing images for social media",
      "Creating consistent image sizes",
      "Resizing photos for printing",
      "Optimizing images for mobile displays"
    ],
    faq: [
      { question: "What does 'maintain aspect ratio' mean?", answer: "It keeps the image proportions the same, preventing distortion. If you enter width, height adjusts automatically." },
      { question: "Can I upscale images?", answer: "Yes, but upscaling may reduce quality. For best results, only downscale (make smaller) images." },
      { question: "What formats are supported?", answer: "JPEG, PNG, WebP, and most common image formats are supported." },
      { question: "Are images uploaded anywhere?", answer: "No. All resizing happens in your browser. Your images never leave your device." },
      { question: "Can I resize multiple images at once?", answer: "Yes, you can batch resize multiple images to the same dimensions." }
    ]
  },
  "image-cropper": {
    description: "The Image Cropper lets you trim and cut images to focus on specific areas. Perfect for removing unwanted backgrounds, creating square images for social media, or extracting specific portions of photos with precision.",
    howToUse: [
      "Upload your image",
      "Drag the crop area to select region",
      "Resize crop area by dragging corners",
      "Preview the cropped result",
      "Download the cropped image"
    ],
    benefits: [
      "Precise crop area selection",
      "Visual drag-and-drop interface",
      "Preset aspect ratios (1:1, 16:9, 4:3)",
      "Real-time preview",
      "High-quality output",
      "Browser-based processing",
      "Free unlimited cropping"
    ],
    useCases: [
      "Creating square images for Instagram",
      "Removing unwanted backgrounds",
      "Focusing on specific subjects",
      "Creating profile pictures",
      "Extracting portions of screenshots",
      "Preparing images for printing",
      "Creating consistent image formats"
    ],
    faq: [
      { question: "Can I crop to specific dimensions?", answer: "Yes, you can use preset aspect ratios or enter custom dimensions for precise cropping." },
      { question: "Will cropping reduce image quality?", answer: "No. Cropping only removes pixels outside the selected area without affecting quality of the remaining image." },
      { question: "Can I undo a crop?", answer: "Yes, you can reset and start over before downloading the final cropped image." },
      { question: "Are images uploaded to servers?", answer: "No. All cropping happens in your browser. Your images never leave your device." },
      { question: "What formats can I crop?", answer: "JPEG, PNG, WebP, and most common image formats are supported." }
    ]
  },
  "case-converter": {
    description: "The Case Converter transforms text between different letter cases including uppercase, lowercase, title case, sentence case, and more. Essential for formatting text, fixing caps lock mistakes, or preparing content for different contexts.",
    howToUse: [
      "Paste or type your text",
      "Select desired case format",
      "View instant conversion",
      "Copy the converted text",
      "Use in your documents or applications"
    ],
    benefits: [
      "Multiple case formats available",
      "Instant conversion",
      "One-click copy to clipboard",
      "Handles large text blocks",
      "Browser-based processing",
      "Free unlimited conversions",
      "Works offline"
    ],
    useCases: [
      "Fixing accidental caps lock text",
      "Converting titles to proper case",
      "Formatting code or variables",
      "Preparing text for social media",
      "Standardizing document formatting",
      "Converting database entries",
      "Formatting email content"
    ],
    faq: [
      { question: "What case formats are available?", answer: "Uppercase, lowercase, title case, sentence case, camelCase, snake_case, and more." },
      { question: "Does it work with special characters?", answer: "Yes, the tool preserves numbers, punctuation, and special characters while converting letter cases." },
      { question: "Can I convert multiple paragraphs?", answer: "Yes, you can convert text of any length including multiple paragraphs." },
      { question: "Is my text stored anywhere?", answer: "No. All conversion happens in your browser. Your text never leaves your device." },
      { question: "Does it work with non-English text?", answer: "Yes, it works with most languages that have uppercase and lowercase letters." }
    ]
  },
  "text-cleaner": {
    description: "The Text Cleaner removes extra spaces, line breaks, and formatting issues from text. Perfect for cleaning up copied text from PDFs, websites, or documents, and preparing clean text for use in other applications.",
    howToUse: [
      "Paste your messy text",
      "Select cleaning options",
      "View cleaned text instantly",
      "Copy the cleaned result",
      "Use in your documents"
    ],
    benefits: [
      "Remove extra spaces and line breaks",
      "Fix formatting issues",
      "Multiple cleaning options",
      "Instant results",
      "One-click copy",
      "Browser-based processing",
      "Free unlimited use"
    ],
    useCases: [
      "Cleaning text copied from PDFs",
      "Removing formatting from web content",
      "Preparing text for databases",
      "Fixing spacing issues",
      "Cleaning up email content",
      "Standardizing text format",
      "Preparing text for translation"
    ],
    faq: [
      { question: "What cleaning options are available?", answer: "Remove extra spaces, remove line breaks, trim whitespace, remove special characters, and more." },
      { question: "Will it remove all formatting?", answer: "You can choose which formatting to remove. Basic text structure can be preserved if desired." },
      { question: "Can it handle large text blocks?", answer: "Yes, the tool can clean text of any length efficiently." },
      { question: "Is my text stored anywhere?", answer: "No. All cleaning happens in your browser. Your text never leaves your device." },
      { question: "Does it work with special characters?", answer: "Yes, you can choose to keep or remove special characters based on your needs." }
    ]
  },
  "text-diff": {
    description: "The Text Diff Checker compares two text blocks and highlights the differences between them. Perfect for comparing document versions, finding changes in code, or reviewing edits and revisions.",
    howToUse: [
      "Paste first text in left panel",
      "Paste second text in right panel",
      "View highlighted differences",
      "See additions, deletions, and changes",
      "Export comparison results"
    ],
    benefits: [
      "Side-by-side comparison",
      "Color-coded differences",
      "Line-by-line analysis",
      "Character-level precision",
      "Browser-based processing",
      "Free unlimited comparisons",
      "Works offline"
    ],
    useCases: [
      "Comparing document versions",
      "Reviewing code changes",
      "Checking contract revisions",
      "Finding text modifications",
      "Verifying translations",
      "Comparing configuration files",
      "Reviewing edited content"
    ],
    faq: [
      { question: "How are differences displayed?", answer: "Additions are highlighted in green, deletions in red, and modifications in yellow for easy identification." },
      { question: "Can it compare large documents?", answer: "Yes, the tool can efficiently compare documents of any length." },
      { question: "Does it show line numbers?", answer: "Yes, line numbers are displayed to help you locate specific changes." },
      { question: "Is my text stored anywhere?", answer: "No. All comparison happens in your browser. Your text never leaves your device." },
      { question: "Can I compare code files?", answer: "Yes, the tool works great for comparing code, configuration files, and any text-based content." }
    ]
  },
  "unit-converter": {
    description: "The Unit Converter transforms measurements between different units including length, weight, temperature, volume, area, speed, and more. Essential for cooking, travel, science, construction, and everyday conversions.",
    howToUse: [
      "Select conversion category",
      "Choose from unit",
      "Choose to unit",
      "Enter value to convert",
      "View instant conversion result"
    ],
    benefits: [
      "Multiple categories supported",
      "Instant accurate conversions",
      "Bidirectional conversion",
      "Common and scientific units",
      "Browser-based processing",
      "Free unlimited conversions",
      "Works offline"
    ],
    useCases: [
      "Converting recipes between metric and imperial",
      "Travel distance and speed conversions",
      "Temperature conversions",
      "Construction measurements",
      "Scientific calculations",
      "Fitness tracking conversions",
      "International shipping calculations"
    ],
    faq: [
      { question: "What units can I convert?", answer: "Length, weight, temperature, volume, area, speed, time, pressure, energy, and more." },
      { question: "How accurate are the conversions?", answer: "Conversions use precise mathematical formulas and are accurate to multiple decimal places." },
      { question: "Can I convert between any units?", answer: "You can convert between any units within the same category (e.g., all length units)." },
      { question: "Does it work offline?", answer: "Yes, once loaded, all conversions happen in your browser without internet connection." },
      { question: "Are imperial and metric both supported?", answer: "Yes, both imperial and metric systems are fully supported across all categories." }
    ]
  },
  "color-converter": {
    description: "The Color Converter transforms colors between HEX, RGB, HSL, and other color formats. Perfect for web design, graphic design, and development work requiring precise color matching and format conversion.",
    howToUse: [
      "Enter color in any format (HEX, RGB, HSL)",
      "View all format conversions instantly",
      "Use color picker for visual selection",
      "Copy any format with one click",
      "Preview the color"
    ],
    benefits: [
      "Multiple format support",
      "Visual color picker",
      "Instant conversions",
      "One-click copy",
      "Color preview",
      "Browser-based processing",
      "Free unlimited use"
    ],
    useCases: [
      "Web development color matching",
      "Graphic design projects",
      "CSS color conversion",
      "Brand color standardization",
      "Design system creation",
      "Color palette development",
      "Converting design specs"
    ],
    faq: [
      { question: "What color formats are supported?", answer: "HEX, RGB, RGBA, HSL, HSLA, and named colors are all supported." },
      { question: "Can I use the color picker?", answer: "Yes, a visual color picker lets you select colors and see all format conversions instantly." },
      { question: "How do I copy a color value?", answer: "Click the copy button next to any format to copy it to your clipboard." },
      { question: "Are conversions accurate?", answer: "Yes, conversions use precise algorithms to ensure accurate color representation across formats." },
      { question: "Can I enter color names?", answer: "Yes, standard color names (red, blue, etc.) are recognized and converted to all formats." }
    ]
  },
  "base64-tool": {
    description: "The Base64 Encoder/Decoder converts text and data to and from Base64 format. Essential for encoding data for transmission, embedding images in HTML/CSS, or working with APIs that require Base64 encoding.",
    howToUse: [
      "Enter text or paste Base64 string",
      "Select encode or decode mode",
      "View instant conversion",
      "Copy the result",
      "Use in your applications"
    ],
    benefits: [
      "Encode and decode Base64",
      "Instant conversion",
      "Handle large text blocks",
      "One-click copy",
      "Browser-based processing",
      "Free unlimited use",
      "Works offline"
    ],
    useCases: [
      "Encoding data for APIs",
      "Embedding images in CSS",
      "Email attachment encoding",
      "URL-safe data transmission",
      "Encoding credentials",
      "Data obfuscation",
      "Working with web tokens"
    ],
    faq: [
      { question: "What is Base64 encoding?", answer: "Base64 is a method to encode binary data into ASCII text format, commonly used for data transmission and storage." },
      { question: "Is Base64 encryption?", answer: "No, Base64 is encoding, not encryption. It's easily reversible and should not be used for security." },
      { question: "Can I encode files?", answer: "This tool encodes text. For file encoding, you'll need a specialized file encoder." },
      { question: "Is my data stored anywhere?", answer: "No. All encoding/decoding happens in your browser. Your data never leaves your device." },
      { question: "Why use Base64?", answer: "Base64 ensures data can be safely transmitted over systems that only support text, like email or URLs." }
    ]
  },
  "age-calculator": {
    description: "The Age Calculator determines exact age from date of birth including years, months, days, hours, and minutes. Perfect for calculating precise age, planning events, or determining age-related eligibility.",
    howToUse: [
      "Enter date of birth",
      "Optionally enter a target date",
      "View detailed age breakdown",
      "See age in different units",
      "Calculate age at specific dates"
    ],
    benefits: [
      "Precise age calculation",
      "Multiple time units",
      "Calculate age at any date",
      "Instant results",
      "Browser-based processing",
      "Free unlimited use",
      "Works offline"
    ],
    useCases: [
      "Calculating exact age",
      "Planning milestone birthdays",
      "Determining eligibility requirements",
      "Calculating age for forms",
      "Planning retirement dates",
      "Calculating age differences",
      "Historical date calculations"
    ],
    faq: [
      { question: "How accurate is the calculation?", answer: "The calculator is precise to the day, accounting for leap years and varying month lengths." },
      { question: "Can I calculate age at a future date?", answer: "Yes, you can enter any target date to see age at that specific time." },
      { question: "Does it account for leap years?", answer: "Yes, all calculations properly account for leap years and calendar variations." },
      { question: "Can I calculate age in months or days only?", answer: "Yes, the tool shows age in years, months, days, and total days/months/hours." },
      { question: "Is my date of birth stored?", answer: "No. All calculations happen in your browser. No data is stored or transmitted." }
    ]
  },
  "emi-calculator": {
    description: "The EMI Calculator computes monthly loan payments (Equated Monthly Installments) for home loans, car loans, or personal loans. Calculate EMI, total interest, and payment schedules to plan your finances effectively.",
    howToUse: [
      "Enter loan amount",
      "Enter interest rate per year",
      "Enter loan tenure in months or years",
      "View EMI amount instantly",
      "See total interest and payment breakdown"
    ],
    benefits: [
      "Accurate EMI calculation",
      "Total interest breakdown",
      "Payment schedule visualization",
      "Compare different scenarios",
      "Browser-based processing",
      "Free unlimited calculations",
      "Works offline"
    ],
    useCases: [
      "Planning home loan payments",
      "Calculating car loan EMI",
      "Personal loan planning",
      "Comparing loan offers",
      "Budget planning",
      "Refinancing decisions",
      "Investment planning"
    ],
    faq: [
      { question: "What is EMI?", answer: "EMI (Equated Monthly Installment) is the fixed monthly payment you make to repay a loan, including principal and interest." },
      { question: "How is EMI calculated?", answer: "EMI is calculated using the loan amount, interest rate, and tenure with the formula: [P x R x (1+R)^N]/[(1+R)^N-1]." },
      { question: "Can I see the payment schedule?", answer: "Yes, the calculator shows a detailed breakdown of principal and interest for each payment." },
      { question: "Does it account for processing fees?", answer: "The calculator shows EMI based on loan amount and interest. Add processing fees separately to total cost." },
      { question: "Can I compare different loan terms?", answer: "Yes, adjust the values to compare different loan amounts, rates, and tenures instantly." }
    ]
  },
  "tip-calculator": {
    description: "The Tip Calculator helps you calculate tips and split bills easily. Perfect for restaurants, services, or any situation where you need to calculate gratuity and divide costs among multiple people.",
    howToUse: [
      "Enter bill amount",
      "Select or enter tip percentage",
      "Enter number of people splitting",
      "View tip amount and total",
      "See per-person amount"
    ],
    benefits: [
      "Quick tip calculation",
      "Bill splitting feature",
      "Custom tip percentages",
      "Per-person breakdown",
      "Browser-based processing",
      "Free unlimited use",
      "Works offline"
    ],
    useCases: [
      "Calculating restaurant tips",
      "Splitting dinner bills",
      "Service gratuity calculation",
      "Group dining expenses",
      "Delivery tip calculation",
      "Salon service tips",
      "Travel expense splitting"
    ],
    faq: [
      { question: "What tip percentages are standard?", answer: "Common tip percentages are 15% (standard), 18% (good service), and 20% (excellent service)." },
      { question: "Can I enter a custom tip percentage?", answer: "Yes, you can enter any tip percentage or amount you prefer." },
      { question: "How does bill splitting work?", answer: "Enter the number of people, and the calculator divides the total (bill + tip) equally among everyone." },
      { question: "Can I calculate tip on pre-tax amount?", answer: "Yes, enter the pre-tax amount to calculate tip before tax is added." },
      { question: "Does it round to nearest dollar?", answer: "You can see exact amounts and choose to round up or down as preferred." }
    ]
  },
  "stopwatch": {
    description: "The Stopwatch & Timer provides precise time tracking with start, stop, and lap features. Perfect for workouts, cooking, studying, or any activity requiring accurate time measurement and countdown functionality.",
    howToUse: [
      "Click start to begin timing",
      "Use lap button to record intervals",
      "Stop to pause timing",
      "Reset to clear and start over",
      "Switch to timer mode for countdowns"
    ],
    benefits: [
      "Precise time tracking",
      "Lap time recording",
      "Countdown timer mode",
      "Visual and audio alerts",
      "Browser-based processing",
      "Free unlimited use",
      "Works offline"
    ],
    useCases: [
      "Workout interval timing",
      "Cooking and baking",
      "Study session tracking",
      "Sports timing",
      "Presentation practice",
      "Task time tracking",
      "Meditation timing"
    ],
    faq: [
      { question: "How accurate is the stopwatch?", answer: "The stopwatch is accurate to milliseconds using browser timing APIs." },
      { question: "Can I record multiple laps?", answer: "Yes, you can record unlimited lap times during a session." },
      { question: "Does the timer have alerts?", answer: "Yes, the countdown timer provides visual and audio alerts when time expires." },
      { question: "Will it work if I switch tabs?", answer: "Yes, timing continues in the background even if you switch tabs or minimize the browser." },
      { question: "Can I set custom countdown times?", answer: "Yes, enter any duration for the countdown timer in hours, minutes, and seconds." }
    ]
  },
  "random-number": {
    description: "The Random Number Generator creates random numbers within a specified range. Perfect for games, raffles, statistical sampling, password generation, or any situation requiring unpredictable number selection.",
    howToUse: [
      "Enter minimum number",
      "Enter maximum number",
      "Choose quantity of numbers to generate",
      "Click generate",
      "View and copy random numbers"
    ],
    benefits: [
      "Cryptographically secure randomness",
      "Custom range selection",
      "Generate multiple numbers",
      "Unique or repeating options",
      "Browser-based processing",
      "Free unlimited use",
      "Works offline"
    ],
    useCases: [
      "Lottery and raffle drawings",
      "Game dice rolling",
      "Statistical sampling",
      "Random selection",
      "Password generation",
      "Contest winner selection",
      "Random testing data"
    ],
    faq: [
      { question: "How random are the numbers?", answer: "We use cryptographically secure random generation (crypto.getRandomValues) for true randomness." },
      { question: "Can I generate negative numbers?", answer: "Yes, you can set any minimum and maximum values including negative numbers." },
      { question: "Can I generate unique numbers only?", answer: "Yes, you can choose to generate unique numbers without repetition." },
      { question: "Is there a limit to the range?", answer: "You can use any range from very small to very large numbers." },
      { question: "Can I generate decimal numbers?", answer: "The current version generates integers. Decimal support may be added in future updates." }
    ]
  }
};
