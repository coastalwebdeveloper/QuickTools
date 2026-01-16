import { Link } from "react-router-dom";
import { ArrowLeft, Link as LinkIcon, CheckCircle, Shield, Zap } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const URLShortenerGuide = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <article className="container mx-auto px-4 py-8 max-w-4xl">
        <Link to="/blog" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back to Resources
        </Link>

        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-4">URL Shortener Guide: Create Short, Shareable Links</h1>
          <p className="text-xl text-muted-foreground">
            Learn how to create short URLs for social media, marketing campaigns, and easy sharing.
          </p>
        </header>

        <div className="prose prose-slate dark:prose-invert max-w-none">
          <h2>Why Shorten URLs?</h2>
          <ul>
            <li>Make long URLs manageable for social media posts</li>
            <li>Create memorable links for marketing campaigns</li>
            <li>Track click-through rates and engagement</li>
            <li>Improve aesthetics in printed materials</li>
            <li>Save character count in tweets and messages</li>
          </ul>

          <h2>Best Use Cases</h2>
          <h3>Social Media Marketing</h3>
          <p>Twitter's character limit makes short URLs essential. Share blog posts, products, and landing pages without wasting precious characters.</p>

          <h3>Print Materials</h3>
          <p>Business cards, flyers, and posters benefit from short, memorable URLs that people can easily type.</p>

          <h3>SMS Campaigns</h3>
          <p>Text messages have character limits. Short URLs ensure your message fits while including clickable links.</p>

          <h3>QR Codes</h3>
          <p>Shorter URLs create simpler QR codes that scan more reliably. Combine with our <Link to="/tools/qr-generator" className="text-primary hover:underline">QR Generator</Link>.</p>

          <div className="bg-card border border-border rounded-xl p-6 mt-8">
            <h3 className="mt-0">Start Shortening URLs</h3>
            <Link to="/tools/url-shortener" className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
              Create Short URL
            </Link>
          </div>
        </div>
      </article>
      <Footer />
    </div>
  );
};

export default URLShortenerGuide;
