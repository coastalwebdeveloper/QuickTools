import { Link } from "react-router-dom";
import { ArrowLeft, Hash, Type, QrCode, Lock, Calculator } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const WordCounterGuide = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <article className="container mx-auto px-4 py-8 max-w-4xl">
      <Link to="/blog" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8">
        <ArrowLeft className="w-4 h-4" />
        Back to Resources
      </Link>
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Word Counter: Track Words, Characters, and More</h1>
        <p className="text-xl text-muted-foreground">Essential tool for writers, students, and content creators to meet word limits.</p>
      </header>
      <div className="prose prose-slate dark:prose-invert max-w-none">
        <h2>Why Count Words?</h2>
        <ul>
          <li>Meet essay and assignment word limits</li>
          <li>Track blog post and article length</li>
          <li>Optimize social media posts</li>
          <li>Monitor content for SEO</li>
          <li>Ensure consistent content length</li>
        </ul>
        <h2>What Gets Counted</h2>
        <p>Words, characters (with and without spaces), sentences, paragraphs, and reading time.</p>
        <div className="bg-card border border-border rounded-xl p-6 mt-8">
          <Link to="/tools/word-counter" className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
            Try Word Counter
          </Link>
        </div>
      </div>
    </article>
    <Footer />
  </div>
);

export const QRGeneratorGuide = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <article className="container mx-auto px-4 py-8 max-w-4xl">
      <Link to="/blog" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8">
        <ArrowLeft className="w-4 h-4" />
        Back to Resources
      </Link>
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4">QR Code Generator: Create Scannable Codes</h1>
        <p className="text-xl text-muted-foreground">Generate QR codes for URLs, text, contact info, and more.</p>
      </header>
      <div className="prose prose-slate dark:prose-invert max-w-none">
        <h2>QR Code Uses</h2>
        <ul>
          <li>Business cards and marketing materials</li>
          <li>Restaurant menus and contactless ordering</li>
          <li>Event tickets and registrations</li>
          <li>Product packaging and labels</li>
          <li>WiFi network sharing</li>
        </ul>
        <h2>Best Practices</h2>
        <p>Use high contrast colors, test scanning from different distances, and include a call-to-action near the QR code.</p>
        <div className="bg-card border border-border rounded-xl p-6 mt-8">
          <Link to="/tools/qr-generator" className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
            Generate QR Code
          </Link>
        </div>
      </div>
    </article>
    <Footer />
  </div>
);

export const PasswordGeneratorGuide = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <article className="container mx-auto px-4 py-8 max-w-4xl">
      <Link to="/blog" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8">
        <ArrowLeft className="w-4 h-4" />
        Back to Resources
      </Link>
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Password Generator: Create Strong, Secure Passwords</h1>
        <p className="text-xl text-muted-foreground">Generate random, secure passwords to protect your accounts.</p>
      </header>
      <div className="prose prose-slate dark:prose-invert max-w-none">
        <h2>Password Security</h2>
        <ul>
          <li>Use unique passwords for each account</li>
          <li>Minimum 12 characters recommended</li>
          <li>Include uppercase, lowercase, numbers, symbols</li>
          <li>Avoid dictionary words and personal info</li>
          <li>Change passwords regularly</li>
        </ul>
        <h2>Password Strength</h2>
        <p>Longer passwords with mixed characters are exponentially harder to crack. A 12-character password with mixed types takes centuries to brute force.</p>
        <div className="bg-card border border-border rounded-xl p-6 mt-8">
          <Link to="/tools/password-generator" className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
            Generate Password
          </Link>
        </div>
      </div>
    </article>
    <Footer />
  </div>
);

export const BMICalculatorGuide = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <article className="container mx-auto px-4 py-8 max-w-4xl">
      <Link to="/blog" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8">
        <ArrowLeft className="w-4 h-4" />
        Back to Resources
      </Link>
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4">BMI Calculator: Track Your Body Mass Index</h1>
        <p className="text-xl text-muted-foreground">Calculate your BMI and understand your health status.</p>
      </header>
      <div className="prose prose-slate dark:prose-invert max-w-none">
        <h2>Understanding BMI</h2>
        <p>Body Mass Index (BMI) is a measure of body fat based on height and weight. It's a screening tool for weight categories that may lead to health problems.</p>
        <h2>BMI Categories</h2>
        <ul>
          <li>Underweight: BMI less than 18.5</li>
          <li>Normal weight: BMI 18.5-24.9</li>
          <li>Overweight: BMI 25-29.9</li>
          <li>Obese: BMI 30 or greater</li>
        </ul>
        <div className="bg-card border border-border rounded-xl p-6 mt-8">
          <Link to="/tools/bmi-calculator" className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
            Calculate BMI
          </Link>
        </div>
      </div>
    </article>
    <Footer />
  </div>
);
