import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import CategorySection from "@/components/CategorySection";
import { Link } from "react-router-dom";
import { BookOpen, Shield, Zap, Star, Users } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <CategorySection />
        
        <section className="py-12 md:py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-8 md:mb-12">
                <p className="text-sm text-muted-foreground mb-2">Trusted by users worldwide</p>
                <div className="flex flex-wrap justify-center gap-6 md:gap-8 text-center">
                  <div>
                    <p className="text-2xl md:text-3xl font-bold text-primary">500+</p>
                    <p className="text-xs md:text-sm text-muted-foreground">Active Users</p>
                  </div>
                  <div>
                    <p className="text-2xl md:text-3xl font-bold text-primary">25+</p>
                    <p className="text-xs md:text-sm text-muted-foreground">Free Tools</p>
                  </div>
                  <div>
                    <p className="text-2xl md:text-3xl font-bold text-primary">100%</p>
                    <p className="text-xs md:text-sm text-muted-foreground">Browser-Based</p>
                  </div>
                </div>
              </div>

              <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12">Why Choose QuickTools Online?</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                <div className="bg-card border border-border rounded-xl p-4 md:p-6 text-center">
                  <div className="inline-flex p-3 bg-primary/10 rounded-lg mb-4">
                    <Shield className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-base md:text-lg font-semibold mb-2">100% Private</h3>
                  <p className="text-sm text-muted-foreground">All processing happens in your browser. Your files never leave your device.</p>
                </div>
                <div className="bg-card border border-border rounded-xl p-4 md:p-6 text-center">
                  <div className="inline-flex p-3 bg-primary/10 rounded-lg mb-4">
                    <Zap className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-base md:text-lg font-semibold mb-2">Lightning Fast</h3>
                  <p className="text-sm text-muted-foreground">No uploads or downloads. Instant results with local processing.</p>
                </div>
                <div className="bg-card border border-border rounded-xl p-4 md:p-6 text-center">
                  <div className="inline-flex p-3 bg-primary/10 rounded-lg mb-4">
                    <Star className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-base md:text-lg font-semibold mb-2">Always Free</h3>
                  <p className="text-sm text-muted-foreground">No subscriptions, no hidden fees. All 25+ tools are completely free.</p>
                </div>
                <div className="bg-card border border-border rounded-xl p-4 md:p-6 text-center">
                  <div className="inline-flex p-3 bg-primary/10 rounded-lg mb-4">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-base md:text-lg font-semibold mb-2">No Sign-Up</h3>
                  <p className="text-sm text-muted-foreground">Start using any tool immediately. No registration required.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">Who is QuickTools Online For?</h2>
              <p className="text-lg text-muted-foreground text-center mb-12 max-w-3xl mx-auto">
                QuickTools Online serves thousands of users worldwide who need fast, reliable, and secure online utilities. Our platform is designed for anyone who values privacy, efficiency, and free access to professional-grade tools.
              </p>

              <div className="space-y-8">
                <div className="bg-card border border-border rounded-xl p-6 md:p-8">
                  <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                      <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    How Students Use QuickTools
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Students face unique challenges when managing academic documents, research papers, and assignments. QuickTools Online provides essential utilities that help students work more efficiently without breaking their budget.
                  </p>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex gap-3">
                      <span className="text-primary font-bold">•</span>
                      <span><strong>Research Paper Management:</strong> Merge multiple PDF sources into a single reference document. Split large textbooks to extract only the chapters you need for your current assignment.</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-primary font-bold">•</span>
                      <span><strong>Assignment Preparation:</strong> Use our Word Counter to meet essay requirements precisely. Convert case formats for proper citations and references.</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-primary font-bold">•</span>
                      <span><strong>Image Optimization:</strong> Compress images for presentations and reports to meet file size limits for online submission portals.</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-primary font-bold">•</span>
                      <span><strong>Study Materials:</strong> Create QR codes for sharing study resources with classmates. Convert PDFs to images for easier annotation on tablets.</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-card border border-border rounded-xl p-6 md:p-8">
                  <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                    <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                      <Star className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                    </div>
                    How Creators & Content Professionals Use QuickTools
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Content creators, designers, and digital marketers need reliable tools that don't interrupt their creative workflow. Our browser-based tools integrate seamlessly into any content production pipeline.
                  </p>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex gap-3">
                      <span className="text-primary font-bold">•</span>
                      <span><strong>Social Media Content:</strong> Download YouTube thumbnails for competitive analysis. Generate QR codes for marketing campaigns. Create shortened URLs for tracking engagement.</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-primary font-bold">•</span>
                      <span><strong>Image Processing:</strong> Compress images without quality loss for faster website loading. Resize images in bulk for consistent social media posts. Remove backgrounds from product photos for e-commerce.</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-primary font-bold">•</span>
                      <span><strong>Document Creation:</strong> Merge client feedback PDFs into comprehensive revision documents. Convert Word documents to PDF for professional client deliverables.</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-primary font-bold">•</span>
                      <span><strong>SEO & Web Development:</strong> Generate meta tags for better search engine visibility. Count words on competitor websites for content benchmarking. Format HTML code for cleaner, more maintainable websites.</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-card border border-border rounded-xl p-6 md:p-8">
                  <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                    <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                      <Zap className="w-6 h-6 text-green-600 dark:text-green-400" />
                    </div>
                    How Developers & Technical Professionals Use QuickTools
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Developers and IT professionals require quick access to conversion and encoding tools during their daily work. QuickTools provides instant utilities without the need to install software or write custom scripts.
                  </p>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex gap-3">
                      <span className="text-primary font-bold">•</span>
                      <span><strong>Data Conversion:</strong> Convert JSON to CSV for data analysis. Encode and decode Base64 strings for API testing. Transform color codes between HEX, RGB, and HSL formats.</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-primary font-bold">•</span>
                      <span><strong>Code Management:</strong> Format HTML for better readability. Compare text differences to review code changes. Clean text data before database insertion.</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-primary font-bold">•</span>
                      <span><strong>Security Tools:</strong> Generate strong passwords for new accounts and services. Create random numbers for testing and simulations.</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-primary font-bold">•</span>
                      <span><strong>Documentation:</strong> Convert technical documentation PDFs to editable formats. Extract text from images using OCR for documentation updates.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">Why Browser-Based Tools Are Better for Privacy</h2>
              <p className="text-lg text-muted-foreground text-center mb-12 max-w-3xl mx-auto">
                In an era of increasing data breaches and privacy concerns, the way your tools process data matters more than ever. QuickTools Online uses client-side processing to give you complete control over your information.
              </p>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-card border border-border rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Shield className="w-8 h-8 text-primary" />
                    <h3 className="text-xl font-bold">Your Files Never Leave Your Device</h3>
                  </div>
                  <p className="text-muted-foreground">
                    Traditional online tools require you to upload files to their servers for processing. This creates multiple privacy risks: your data passes through their infrastructure, may be stored temporarily (or permanently), and could be accessed by third parties. With QuickTools, all processing happens locally in your browser using JavaScript. Your files never touch our servers because we don't have any servers processing your data.
                  </p>
                </div>

                <div className="bg-card border border-border rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Zap className="w-8 h-8 text-primary" />
                    <h3 className="text-xl font-bold">No Upload Delays or File Size Limits</h3>
                  </div>
                  <p className="text-muted-foreground">
                    Server-based tools often impose strict file size limits and require time-consuming uploads and downloads. Since QuickTools processes everything locally, you can work with files of any size, and results are instant. A 100MB PDF merge that might take minutes on a traditional service completes in seconds with our browser-based approach.
                  </p>
                </div>

                <div className="bg-card border border-border rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Shield className="w-8 h-8 text-primary" />
                    <h3 className="text-xl font-bold">Perfect for Sensitive Documents</h3>
                  </div>
                  <p className="text-muted-foreground">
                    Legal contracts, financial records, medical documents, and confidential business files require the highest level of privacy protection. With QuickTools, you can process these sensitive documents with confidence, knowing they remain exclusively on your device. This is especially important for professionals bound by confidentiality agreements or regulations like HIPAA and GDPR.
                  </p>
                </div>

                <div className="bg-card border border-border rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Zap className="w-8 h-8 text-primary" />
                    <h3 className="text-xl font-bold">Works Offline After Initial Load</h3>
                  </div>
                  <p className="text-muted-foreground">
                    Once you load a QuickTools page, many of our tools continue working even if you lose internet connection. This is possible because all the processing code runs in your browser. You can work on a plane, in areas with poor connectivity, or anywhere you need to maintain productivity without depending on a stable internet connection.
                  </p>
                </div>
              </div>

              <div className="bg-primary/10 border border-primary/20 rounded-xl p-6 md:p-8">
                <h3 className="text-2xl font-bold mb-4">The Technical Advantage</h3>
                <p className="text-muted-foreground mb-4">
                  Modern web browsers are incredibly powerful computing platforms. Technologies like WebAssembly, Canvas API, and the File API enable sophisticated file processing directly in the browser. QuickTools leverages these technologies to provide desktop-application-level functionality without requiring any downloads or installations.
                </p>
                <p className="text-muted-foreground">
                  This approach benefits everyone: you get better privacy and faster processing, while we can offer completely free tools without the massive server costs associated with traditional online services. It's a win-win that puts your privacy and convenience first.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center justify-center gap-3 mb-6 md:mb-8">
                <BookOpen className="w-6 h-6 md:w-8 md:h-8 text-primary" />
                <h2 className="text-2xl md:text-3xl font-bold">Learn & Improve Your Skills</h2>
              </div>
              <p className="text-center text-muted-foreground mb-8 md:mb-12 max-w-2xl mx-auto text-sm md:text-base">
                Explore our comprehensive guides to master digital tools and workflows. From PDF management to image optimization, we provide in-depth tutorials that help you work smarter, not harder.
              </p>
              <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                <Link to="/blog/pdf-best-practices" className="group bg-card border border-border rounded-xl p-4 md:p-6 hover:shadow-lg transition-all hover:border-primary/50">
                  <h3 className="text-lg md:text-xl font-semibold mb-2 group-hover:text-primary transition-colors">PDF Management Best Practices</h3>
                  <p className="text-sm text-muted-foreground mb-3">Master the art of PDF document management with professional techniques for merging, splitting, and organizing files efficiently.</p>
                  <span className="text-primary text-sm font-medium">Read Guide →</span>
                </Link>
                <Link to="/blog/image-optimization" className="group bg-card border border-border rounded-xl p-4 md:p-6 hover:shadow-lg transition-all hover:border-primary/50">
                  <h3 className="text-lg md:text-xl font-semibold mb-2 group-hover:text-primary transition-colors">Image Optimization Complete Guide</h3>
                  <p className="text-sm text-muted-foreground mb-3">Learn professional techniques to reduce image file sizes while maintaining visual quality for web and print applications.</p>
                  <span className="text-primary text-sm font-medium">Read Guide →</span>
                </Link>
              </div>
              <div className="text-center mt-6 md:mt-8">
                <Link to="/blog" className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium text-sm md:text-base">
                  View All Resources & Guides
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
