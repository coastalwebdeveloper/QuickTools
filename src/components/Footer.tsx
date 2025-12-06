import { Link } from "react-router-dom";
import { Settings, Github, Twitter, Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-4">
              <img src="/QuickTools_Logo.png" alt="QuickTools" className="w-10 h-10" />
              <span className="font-bold text-2xl">
                <span className="text-white">Quick</span>
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Tools</span>
              </span>
            </Link>
            <p className="text-gray-300 max-w-md leading-relaxed">
              Professional online tools for everyday tasks. Fast, secure, and completely free.
              All processing happens in your browser - your privacy is guaranteed.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-white">Popular Tools</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/tools/word-counter"
                  className="text-gray-300 hover:text-blue-400 transition-colors"
                >
                  Word Counter
                </Link>
              </li>
              <li>
                <Link
                  to="/tools/password-generator"
                  className="text-gray-300 hover:text-blue-400 transition-colors"
                >
                  Password Generator
                </Link>
              </li>
              <li>
                <Link
                  to="/tools/qr-generator"
                  className="text-gray-300 hover:text-blue-400 transition-colors"
                >
                  QR Generator
                </Link>
              </li>
              <li>
                <Link
                  to="/tools/color-converter"
                  className="text-gray-300 hover:text-blue-400 transition-colors"
                >
                  Color Converter
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4 text-white">Company</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/about"
                  className="text-gray-300 hover:text-blue-400 transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-300 hover:text-blue-400 transition-colors"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="text-gray-300 hover:text-blue-400 transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="text-gray-300 hover:text-blue-400 transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © 2025 QuickTools Online. All Rights Reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <Link to="/privacy" className="text-gray-400 hover:text-blue-400 transition-colors">
                Privacy
              </Link>
              <Link to="/terms" className="text-gray-400 hover:text-blue-400 transition-colors">
                Terms
              </Link>
              <Link to="/contact" className="text-gray-400 hover:text-blue-400 transition-colors">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
