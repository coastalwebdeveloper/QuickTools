import { Link } from "react-router-dom";
import { ArrowLeft, Minimize2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const ImageCompressorGuide = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <article className="container mx-auto px-4 py-8 max-w-4xl">
        <Link to="/blog" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back to Resources
        </Link>
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Image Compressor: Reduce File Size, Keep Quality</h1>
          <p className="text-xl text-muted-foreground">Compress images for faster uploads, email attachments, and website optimization.</p>
        </header>
        <div className="prose prose-slate dark:prose-invert max-w-none">
          <h2>Why Compress Images?</h2>
          <ul>
            <li>Faster website loading speeds</li>
            <li>Reduced storage space requirements</li>
            <li>Email attachments within size limits</li>
            <li>Quicker social media uploads</li>
            <li>Lower bandwidth costs</li>
          </ul>
          <h2>Compression Techniques</h2>
          <h3>Lossy Compression</h3>
          <p>Reduces file size by removing some image data. Best for photos where small quality loss is acceptable.</p>
          <h3>Quality Settings</h3>
          <p>Balance between file size and visual quality. 80-85% quality is often imperceptible to human eyes.</p>
          <h2>Best Practices</h2>
          <ul>
            <li>Compress before uploading to websites</li>
            <li>Keep original files as backups</li>
            <li>Test compressed images before publishing</li>
            <li>Use appropriate compression for image type</li>
          </ul>
          <div className="bg-card border border-border rounded-xl p-6 mt-8">
            <h3 className="mt-0">Compress Images Now</h3>
            <Link to="/tools/image-compressor" className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
              Try Image Compressor
            </Link>
          </div>
        </div>
      </article>
      <Footer />
    </div>
  );
};

export default ImageCompressorGuide;
