import { Link } from "react-router-dom";
import { ArrowLeft, Target, Users, Shield, Zap } from "lucide-react";
import Navbar from "@/components/Navbar";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <h1 className="text-4xl font-bold mb-6">About QuickTools Online</h1>

        <div className="prose prose-slate dark:prose-invert max-w-none space-y-6">
          <p className="text-lg text-muted-foreground">
            QuickTools Online is a free collection of browser-based utilities designed to make your daily tasks faster, easier, and more secure.
          </p>

          <div className="grid md:grid-cols-2 gap-6 my-8">
            <div className="bg-card border border-border rounded-xl p-6">
              <Target className="w-8 h-8 text-primary mb-3" />
              <h3 className="text-xl font-semibold mb-2">Our Mission</h3>
              <p className="text-muted-foreground">
                To provide fast, secure, and accessible online tools that anyone can use without registration, downloads, or complicated setups.
              </p>
            </div>

            <div className="bg-card border border-border rounded-xl p-6">
              <Shield className="w-8 h-8 text-primary mb-3" />
              <h3 className="text-xl font-semibold mb-2">Privacy First</h3>
              <p className="text-muted-foreground">
                All tools run locally in your browser. Your files and data never leave your device, ensuring complete privacy and security.
              </p>
            </div>

            <div className="bg-card border border-border rounded-xl p-6">
              <Zap className="w-8 h-8 text-primary mb-3" />
              <h3 className="text-xl font-semibold mb-2">Lightning Fast</h3>
              <p className="text-muted-foreground">
                No server uploads or processing delays. Everything happens instantly in your browser for maximum speed and efficiency.
              </p>
            </div>

            <div className="bg-card border border-border rounded-xl p-6">
              <Users className="w-8 h-8 text-primary mb-3" />
              <h3 className="text-xl font-semibold mb-2">Free Forever</h3>
              <p className="text-muted-foreground">
                All 25+ tools are completely free to use with no hidden fees, subscriptions, or premium tiers. Accessible to everyone.
              </p>
            </div>
          </div>

          <h2 className="text-2xl font-bold mt-8 mb-4">What We Offer</h2>
          <p>
            QuickTools Online provides over 25 professional-grade tools across multiple categories:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li><strong>PDF Tools:</strong> Merge, split, and convert PDF documents</li>
            <li><strong>Image Tools:</strong> Compress, resize, and crop images</li>
            <li><strong>Text Tools:</strong> Count words, convert cases, clean text, and compare differences</li>
            <li><strong>Converters:</strong> Unit conversion, color conversion, Base64 encoding</li>
            <li><strong>Calculators:</strong> BMI, age, EMI, tip calculations</li>
            <li><strong>Generators:</strong> QR codes, passwords, random numbers</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">Why Choose QuickTools?</h2>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li>No registration or account required</li>
            <li>No file uploads to external servers</li>
            <li>Works on all devices - desktop, tablet, and mobile</li>
            <li>Clean, modern interface with dark mode support</li>
            <li>Regular updates with new tools and features</li>
            <li>Open-source and transparent</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">Our Commitment</h2>
          <p>
            We are committed to maintaining QuickTools Online as a free, privacy-focused platform. We believe essential digital tools should be accessible to everyone without barriers. Your trust and privacy are our top priorities.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">How Our Tools Work</h2>
          <p>
            Unlike traditional online tools that require uploading files to remote servers, QuickTools processes everything locally in your web browser using modern JavaScript technologies. This approach offers several advantages:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li><strong>Complete Privacy:</strong> Your files never leave your device, eliminating privacy concerns</li>
            <li><strong>Faster Processing:</strong> No upload/download delays mean instant results</li>
            <li><strong>No File Size Limits:</strong> Process files of any size without server restrictions</li>
            <li><strong>Works Offline:</strong> Once loaded, many tools work without an internet connection</li>
            <li><strong>No Storage Concerns:</strong> We don't store any of your data, ever</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">Who Uses QuickTools?</h2>
          <p>
            Our tools serve a diverse community of users worldwide:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li><strong>Students:</strong> For assignments, research papers, and academic projects</li>
            <li><strong>Professionals:</strong> For business documents, presentations, and reports</li>
            <li><strong>Content Creators:</strong> For optimizing images and managing digital assets</li>
            <li><strong>Developers:</strong> For encoding, conversion, and testing tasks</li>
            <li><strong>Small Businesses:</strong> For everyday document and image processing needs</li>
            <li><strong>Anyone:</strong> Who values privacy, speed, and free access to quality tools</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">Our Technology Stack</h2>
          <p>
            QuickTools is built with modern web technologies to ensure the best performance and user experience:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li><strong>React & TypeScript:</strong> For a robust, type-safe user interface</li>
            <li><strong>Vite:</strong> For lightning-fast development and optimized builds</li>
            <li><strong>Tailwind CSS:</strong> For responsive, modern design</li>
            <li><strong>PDF.js:</strong> For client-side PDF processing</li>
            <li><strong>Canvas API:</strong> For image manipulation and optimization</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">Learn More</h2>
          <p>
            We regularly publish guides and tutorials to help you get the most out of our tools. Check out our resources section for in-depth articles on:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-6">
            <li>PDF management best practices</li>
            <li>Image optimization techniques</li>
            <li>Text processing workflows</li>
            <li>Financial calculations and planning</li>
          </ul>
          <Link to="/blog" className="text-primary hover:underline font-medium">
            Browse Resources & Guides →
          </Link>

          <div className="bg-primary/10 border border-primary/20 rounded-xl p-6 mt-8">
            <h3 className="text-xl font-semibold mb-2">Get in Touch</h3>
            <p className="text-muted-foreground mb-4">
              Have suggestions for new tools or feedback? We'd love to hear from you.
            </p>
            <Link to="/contact" className="text-primary hover:underline font-medium">
              Contact Us →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
