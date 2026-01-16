import { Link } from "react-router-dom";
import { ArrowLeft, RefreshCw } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const WebPConverterGuide = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <article className="container mx-auto px-4 py-8 max-w-4xl">
        <Link to="/blog" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back to Resources
        </Link>
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-4">WebP Converter: Modern Image Format for Web</h1>
          <p className="text-xl text-muted-foreground">Convert images to WebP format for superior compression and faster website loading.</p>
        </header>
        <div className="prose prose-slate dark:prose-invert max-w-none">
          <h2>Why Use WebP?</h2>
          <ul>
            <li>30% smaller file sizes than JPEG</li>
            <li>26% smaller than PNG</li>
            <li>Supports transparency like PNG</li>
            <li>Better quality at smaller sizes</li>
            <li>Faster website loading times</li>
          </ul>
          <h2>Best Use Cases</h2>
          <h3>Website Optimization</h3>
          <p>Convert all website images to WebP for faster page loads and better SEO rankings.</p>
          <h3>E-Commerce</h3>
          <p>Reduce product image sizes while maintaining quality. Faster loading improves conversion rates.</p>
          <h3>Mobile Apps</h3>
          <p>Smaller images mean faster app performance and reduced data usage for mobile users.</p>
          <h2>Conversion Tips</h2>
          <p>Adjust quality slider to balance file size and visual quality. 80-90% quality works well for most images.</p>
          <div className="bg-card border border-border rounded-xl p-6 mt-8">
            <h3 className="mt-0">Convert to WebP</h3>
            <Link to="/tools/image-to-webp" className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
              Try WebP Converter
            </Link>
          </div>
        </div>
      </article>
      <Footer />
    </div>
  );
};

export default WebPConverterGuide;
