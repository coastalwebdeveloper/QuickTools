import { Link } from "react-router-dom";
import { ArrowLeft, Image, Minimize2, Maximize2, Zap } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const ImageOptimization = () => {
  return (
    <div className="min-h-screen bg-background">
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": "Image Optimization Guide: Compress Without Losing Quality",
          "description": "Learn professional techniques to reduce image file sizes while maintaining visual quality for web, social media, and print applications.",
          "author": {
            "@type": "Organization",
            "name": "QuickTools Online"
          },
          "publisher": {
            "@type": "Organization",
            "name": "QuickTools Online",
            "logo": {
              "@type": "ImageObject",
              "url": "https://www.quicktools.website/QuickTools_Logo.png"
            }
          },
          "datePublished": "2025-01-02",
          "dateModified": "2025-01-02"
        })}
      </script>
      <Navbar />
      <article className="container mx-auto px-4 py-8 max-w-4xl">
        <Link to="/blog" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back to Resources
        </Link>

        <header className="mb-8">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <Image className="w-4 h-4" />
            <span>Image Tools</span>
            <span>•</span>
            <span>6 min read</span>
          </div>
          <h1 className="text-4xl font-bold mb-4">Image Optimization Guide: Compress Without Losing Quality</h1>
          <p className="text-xl text-muted-foreground">
            Learn professional techniques to reduce image file sizes while maintaining visual quality for web, social media, and print applications.
          </p>
        </header>

        <div className="prose prose-slate dark:prose-invert max-w-none">
          <h2>Why Image Optimization Matters</h2>
          <p>
            In today's digital landscape, images are everywhere—websites, social media, emails, and documents. However, large image files can significantly impact:
          </p>
          <ul>
            <li><strong>Website loading speed:</strong> Slow-loading pages frustrate visitors and hurt search engine rankings</li>
            <li><strong>Storage costs:</strong> Large files consume valuable storage space on devices and cloud services</li>
            <li><strong>Email deliverability:</strong> Oversized attachments may be rejected by email servers</li>
            <li><strong>Mobile data usage:</strong> Large images drain data plans and battery life</li>
            <li><strong>User experience:</strong> Faster load times lead to better engagement and conversion rates</li>
          </ul>

          <h2>Understanding Image Formats</h2>
          <p>
            Choosing the right image format is the first step in optimization:
          </p>
          
          <h3>JPEG (JPG)</h3>
          <ul>
            <li><strong>Best for:</strong> Photographs, complex images with many colors</li>
            <li><strong>Compression:</strong> Lossy (some quality loss)</li>
            <li><strong>Transparency:</strong> Not supported</li>
            <li><strong>Use case:</strong> Product photos, portraits, landscapes</li>
          </ul>

          <h3>PNG</h3>
          <ul>
            <li><strong>Best for:</strong> Graphics, logos, images requiring transparency</li>
            <li><strong>Compression:</strong> Lossless (no quality loss)</li>
            <li><strong>Transparency:</strong> Fully supported</li>
            <li><strong>Use case:</strong> Logos, icons, screenshots, graphics with text</li>
          </ul>

          <h3>WebP</h3>
          <ul>
            <li><strong>Best for:</strong> Modern web applications</li>
            <li><strong>Compression:</strong> Both lossy and lossless options</li>
            <li><strong>Transparency:</strong> Supported</li>
            <li><strong>Use case:</strong> Web images (25-35% smaller than JPEG/PNG)</li>
          </ul>

          <div className="bg-primary/10 border border-primary/20 rounded-xl p-6 my-8">
            <h3 className="flex items-center gap-2 mt-0">
              <Minimize2 className="w-5 h-5 text-primary" />
              Image Compression Techniques
            </h3>
            <p className="mb-2"><strong>Lossy Compression:</strong></p>
            <ul>
              <li>Reduces file size by removing some image data</li>
              <li>Results in smaller files but slight quality reduction</li>
              <li>Ideal for web use where file size is critical</li>
              <li>Quality settings typically range from 60-90%</li>
            </ul>
            <p className="mb-2"><strong>Lossless Compression:</strong></p>
            <ul className="mb-0">
              <li>Reduces file size without any quality loss</li>
              <li>Larger files than lossy compression</li>
              <li>Perfect for images that will be edited further</li>
              <li>Essential for print materials and professional photography</li>
            </ul>
          </div>

          <h2>Optimal Image Dimensions for Different Platforms</h2>
          
          <h3>Website Images</h3>
          <ul>
            <li><strong>Hero images:</strong> 1920x1080px (Full HD)</li>
            <li><strong>Blog featured images:</strong> 1200x630px</li>
            <li><strong>Product images:</strong> 800x800px to 1200x1200px</li>
            <li><strong>Thumbnails:</strong> 300x300px to 400x400px</li>
          </ul>

          <h3>Social Media</h3>
          <ul>
            <li><strong>Facebook posts:</strong> 1200x630px</li>
            <li><strong>Instagram posts:</strong> 1080x1080px (square) or 1080x1350px (portrait)</li>
            <li><strong>Twitter posts:</strong> 1200x675px</li>
            <li><strong>LinkedIn posts:</strong> 1200x627px</li>
          </ul>

          <h3>Email Marketing</h3>
          <ul>
            <li><strong>Header images:</strong> 600-800px wide</li>
            <li><strong>Inline images:</strong> 400-600px wide</li>
            <li><strong>Total email size:</strong> Keep under 100KB for best deliverability</li>
          </ul>

          <div className="bg-primary/10 border border-primary/20 rounded-xl p-6 my-8">
            <h3 className="flex items-center gap-2 mt-0">
              <Maximize2 className="w-5 h-5 text-primary" />
              When to Resize Images
            </h3>
            <p className="mb-0">Resizing is necessary when:</p>
            <ul className="mb-0">
              <li>Images are larger than needed for their display size</li>
              <li>Preparing images for specific platform requirements</li>
              <li>Creating thumbnails from full-size images</li>
              <li>Optimizing for mobile devices</li>
              <li>Reducing file size for faster loading</li>
            </ul>
          </div>

          <h2>Step-by-Step Image Optimization Workflow</h2>
          
          <h3>1. Start with High-Quality Originals</h3>
          <p>
            Always keep original, uncompressed versions of your images. Work from copies to preserve quality for future use.
          </p>

          <h3>2. Resize to Target Dimensions</h3>
          <p>
            Before compressing, resize images to their final display dimensions. There's no benefit to serving a 4000px image when it will only display at 800px.
          </p>

          <h3>3. Choose the Right Format</h3>
          <p>
            Convert images to the most appropriate format for their use case. Photographs work best as JPEG, while graphics and logos should be PNG.
          </p>

          <h3>4. Apply Compression</h3>
          <p>
            Use quality settings between 70-85% for JPEG images. This typically provides the best balance between file size and visual quality.
          </p>

          <h3>5. Test and Compare</h3>
          <p>
            Always compare the optimized image with the original to ensure acceptable quality. View at actual size on the target device.
          </p>

          <h2>Common Image Optimization Mistakes</h2>
          <ol>
            <li><strong>Over-compression:</strong> Setting quality too low results in visible artifacts and blurry images</li>
            <li><strong>Wrong format choice:</strong> Using PNG for photos creates unnecessarily large files</li>
            <li><strong>Not resizing first:</strong> Compressing without resizing wastes potential file size savings</li>
            <li><strong>Losing originals:</strong> Always keep high-quality source files for future use</li>
            <li><strong>Ignoring mobile optimization:</strong> Mobile users need smaller, faster-loading images</li>
          </ol>

          <div className="bg-primary/10 border border-primary/20 rounded-xl p-6 my-8">
            <h3 className="flex items-center gap-2 mt-0">
              <Zap className="w-5 h-5 text-primary" />
              Quick Optimization Tips
            </h3>
            <ul className="mb-0">
              <li>Aim for images under 200KB for web use</li>
              <li>Use 72 DPI for screen display (300 DPI only for print)</li>
              <li>Remove EXIF data to reduce file size and protect privacy</li>
              <li>Consider lazy loading for images below the fold</li>
              <li>Use responsive images with srcset for different screen sizes</li>
              <li>Batch process multiple images to save time</li>
            </ul>
          </div>

          <h2>Tools for Image Optimization</h2>
          <p>
            QuickTools Online provides free, browser-based image tools that process files locally for maximum privacy:
          </p>
          <ul>
            <li><Link to="/tools/image-compressor" className="text-primary hover:underline">Image Compressor</Link> - Reduce file size while maintaining quality</li>
            <li><Link to="/tools/image-resizer" className="text-primary hover:underline">Image Resizer</Link> - Resize images to any dimension</li>
            <li><Link to="/tools/image-cropper" className="text-primary hover:underline">Image Cropper</Link> - Crop and adjust image composition</li>
          </ul>

          <h2>Measuring Optimization Success</h2>
          <p>
            Track these metrics to evaluate your image optimization efforts:
          </p>
          <ul>
            <li><strong>File size reduction:</strong> Aim for 50-70% reduction without visible quality loss</li>
            <li><strong>Page load time:</strong> Monitor how optimization affects overall page speed</li>
            <li><strong>Visual quality:</strong> Use tools to compare before/after images</li>
            <li><strong>User engagement:</strong> Faster pages typically see better engagement metrics</li>
          </ul>

          <h2>Conclusion</h2>
          <p>
            Image optimization is a crucial skill for anyone working with digital content. By understanding formats, compression techniques, and proper sizing, you can dramatically reduce file sizes while maintaining visual quality. This leads to faster websites, lower storage costs, and better user experiences across all devices.
          </p>

          <div className="bg-card border border-border rounded-xl p-6 mt-8">
            <h3 className="mt-0">Ready to optimize your images?</h3>
            <p className="mb-4">
              Try our free image tools that work entirely in your browser—no uploads, complete privacy.
            </p>
            <div className="flex gap-4">
              <Link to="/tools/image-compressor" className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
                Compress Images
              </Link>
              <Link to="/tools/image-resizer" className="inline-flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-accent transition-colors">
                Resize Images
              </Link>
            </div>
          </div>
        </div>
      </article>
      <Footer />
    </div>
  );
};

export default ImageOptimization;
