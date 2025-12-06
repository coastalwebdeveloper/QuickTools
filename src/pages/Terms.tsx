import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const Terms = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
        <p className="text-muted-foreground mb-8">Last updated: {new Date().toLocaleDateString()}</p>

        <div className="prose prose-slate dark:prose-invert max-w-none space-y-6">
          <section>
            <h2 className="text-2xl font-bold mb-3">1. Acceptance of Terms</h2>
            <p>
              By accessing and using QuickTools Online ("the Service"), you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our Service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3">2. Description of Service</h2>
            <p>
              QuickTools Online provides free, browser-based tools for PDF manipulation, image processing, text utilities, converters, calculators, and other utilities. All tools run locally in your browser without uploading files to our servers.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3">3. Use of Service</h2>
            
            <h3 className="text-xl font-semibold mb-2">3.1 Permitted Use</h3>
            <p>You may use our Service for lawful purposes only. You agree to:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Use the tools for personal or commercial purposes</li>
              <li>Process your own files or files you have permission to process</li>
              <li>Comply with all applicable laws and regulations</li>
            </ul>

            <h3 className="text-xl font-semibold mb-2 mt-4">3.2 Prohibited Use</h3>
            <p>You agree NOT to:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Use the Service for any illegal or unauthorized purpose</li>
              <li>Attempt to gain unauthorized access to our systems</li>
              <li>Interfere with or disrupt the Service</li>
              <li>Use automated systems to access the Service excessively</li>
              <li>Process files containing malware, viruses, or harmful code</li>
              <li>Violate any intellectual property rights</li>
              <li>Harass, abuse, or harm others</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3">4. Privacy and Data</h2>
            <p>
              All file processing happens locally in your browser. We do not upload, store, or have access to your files. For more information, please review our <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3">5. Intellectual Property</h2>
            <p>
              The Service, including its design, code, features, and content, is owned by QuickTools Online and protected by copyright and other intellectual property laws. You may not copy, modify, distribute, or reverse engineer any part of the Service without permission.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3">6. Disclaimer of Warranties</h2>
            <p>
              THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED. WE DO NOT WARRANT THAT:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>The Service will be uninterrupted or error-free</li>
              <li>Results will be accurate or reliable</li>
              <li>The Service will meet your specific requirements</li>
              <li>Any errors will be corrected</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3">7. Limitation of Liability</h2>
            <p>
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, QUICKTOOLS ONLINE SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Loss of data or files</li>
              <li>Loss of profits or revenue</li>
              <li>Business interruption</li>
              <li>Loss of use or opportunity</li>
            </ul>
            <p className="mt-3">
              You are solely responsible for backing up your files before processing them with our tools.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3">8. User Responsibility</h2>
            <p>You are responsible for:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Maintaining the security of your device and browser</li>
              <li>Backing up your files before processing</li>
              <li>Verifying the output of any tool before using it</li>
              <li>Ensuring you have rights to process any files you use</li>
              <li>Your use of the Service and any consequences thereof</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3">9. Third-Party Services</h2>
            <p>
              Our Service may contain links to third-party websites or use third-party services (such as Google Analytics and AdSense). We are not responsible for the content, privacy policies, or practices of third-party services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3">10. Modifications to Service</h2>
            <p>
              We reserve the right to modify, suspend, or discontinue any part of the Service at any time without notice. We may also update these Terms of Service periodically. Continued use of the Service after changes constitutes acceptance of the updated terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3">11. Termination</h2>
            <p>
              We reserve the right to terminate or suspend access to the Service immediately, without notice, for any reason, including violation of these Terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3">12. Governing Law</h2>
            <p>
              These Terms shall be governed by and construed in accordance with applicable laws, without regard to conflict of law provisions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3">13. Severability</h2>
            <p>
              If any provision of these Terms is found to be unenforceable or invalid, that provision shall be limited or eliminated to the minimum extent necessary, and the remaining provisions shall remain in full force and effect.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3">14. Contact Information</h2>
            <p>
              If you have questions about these Terms of Service, please contact us:
            </p>
            <p className="mt-2">
              Email: <a href="mailto:coastal.webdeveloper@gmail.com" className="text-primary hover:underline">coastal.webdeveloper@gmail.com</a>
            </p>
            <p className="mt-2">
              Or visit our <Link to="/contact" className="text-primary hover:underline">Contact Page</Link>
            </p>
          </section>

          <div className="bg-primary/10 border border-primary/20 rounded-xl p-6 mt-8">
            <p className="text-sm">
              By using QuickTools Online, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service and our <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;
