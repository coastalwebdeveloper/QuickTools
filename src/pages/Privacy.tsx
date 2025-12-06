import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
        <p className="text-muted-foreground mb-8">Last updated: {new Date().toLocaleDateString()}</p>

        <div className="prose prose-slate dark:prose-invert max-w-none space-y-6">
          <section>
            <h2 className="text-2xl font-bold mb-3">Introduction</h2>
            <p>
              At QuickTools Online ("we," "our," or "us"), we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you use our website and tools.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3">Information We Collect</h2>
            
            <h3 className="text-xl font-semibold mb-2">1. Information You Provide</h3>
            <p>
              We do not require registration or accounts. If you contact us via our contact form, we collect:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Name and email address</li>
              <li>Message content</li>
            </ul>

            <h3 className="text-xl font-semibold mb-2 mt-4">2. Automatically Collected Information</h3>
            <p>We collect limited analytics data through Google Analytics, including:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Browser type and version</li>
              <li>Device type and operating system</li>
              <li>Pages visited and time spent</li>
              <li>Referring website</li>
              <li>General location (country/city level)</li>
            </ul>

            <h3 className="text-xl font-semibold mb-2 mt-4">3. Files and Data You Process</h3>
            <p className="font-semibold text-primary">
              All files and data you process using our tools (PDFs, images, text, etc.) are processed entirely in your browser. We never upload, store, or have access to your files.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3">How We Use Your Information</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>To respond to your inquiries and support requests</li>
              <li>To analyze website usage and improve our services</li>
              <li>To detect and prevent technical issues</li>
              <li>To display relevant advertisements through Google AdSense</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3">Cookies and Tracking</h2>
            <p>We use cookies for:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Analytics:</strong> Google Analytics cookies to understand how visitors use our site</li>
              <li><strong>Advertising:</strong> Google AdSense cookies to display relevant ads</li>
              <li><strong>Preferences:</strong> Local storage to remember your theme preferences (dark/light mode)</li>
            </ul>
            <p className="mt-3">
              You can control cookies through your browser settings. Note that disabling cookies may affect website functionality.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3">Third-Party Services</h2>
            <p>We use the following third-party services:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Google Analytics:</strong> For website analytics and usage statistics</li>
              <li><strong>Google AdSense:</strong> For displaying advertisements</li>
            </ul>
            <p className="mt-3">
              These services have their own privacy policies. We recommend reviewing:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li><a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Google Privacy Policy</a></li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3">Data Security</h2>
            <p>
              We implement security measures to protect your information. All tools run client-side in your browser, meaning your files never leave your device. Our website uses HTTPS encryption for all communications.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3">Your Rights</h2>
            <p>You have the right to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Access the personal information we hold about you</li>
              <li>Request correction of inaccurate information</li>
              <li>Request deletion of your information</li>
              <li>Opt-out of analytics tracking</li>
              <li>Disable cookies through your browser</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3">Children's Privacy</h2>
            <p>
              Our services are not directed to children under 13. We do not knowingly collect personal information from children under 13. If you believe we have collected such information, please contact us immediately.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3">Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated revision date. Continued use of our services after changes constitutes acceptance of the updated policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3">Contact Us</h2>
            <p>
              If you have questions about this Privacy Policy, please contact us at:
            </p>
            <p className="mt-2">
              Email: <a href="mailto:coastal.webdeveloper@gmail.com" className="text-primary hover:underline">coastal.webdeveloper@gmail.com</a>
            </p>
            <p className="mt-2">
              Or visit our <Link to="/contact" className="text-primary hover:underline">Contact Page</Link>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
