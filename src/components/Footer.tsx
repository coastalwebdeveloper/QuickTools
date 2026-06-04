import { Link } from "react-router-dom";
import { Shield, Twitter, Github, ArrowRight, Heart, Mail, ExternalLink } from "lucide-react";

const footerTools = [
  { name: "PDF to Word", path: "/tools/pdf-to-word" },
  { name: "Image Compressor", path: "/tools/image-compressor" },
  { name: "Background Remover", path: "/tools/image-background-remover" },
  { name: "QR Code Generator", path: "/tools/qr-generator" },
  { name: "PDF Merge", path: "/tools/pdf-merge" },
  { name: "Word Counter", path: "/tools/word-counter" },
];

const footerResources = [
  { name: "All Tools", path: "/tools" },
  { name: "Blog & Guides", path: "/blog" },
  { name: "PDF Best Practices", path: "/blog/pdf-best-practices" },
  { name: "Image Optimization", path: "/blog/image-optimization" },
  { name: "All Tools Guide", path: "/blog/all-tools-guide" },
];

const footerCompany = [
  { name: "About Us", path: "/about" },
  { name: "Contact", path: "/contact" },
  { name: "Privacy Policy", path: "/privacy" },
  { name: "Terms of Service", path: "/terms" },
];

const Footer = () => {
  return (
    <footer className="relative bg-gray-950 dark:bg-[hsl(234_28%_5%)] text-white overflow-hidden">
      {/* Glow top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      <div className="absolute top-0 left-1/4 right-1/4 h-8 blur-xl bg-primary/10" />

      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full opacity-5"
          style={{ background: "radial-gradient(circle, rgba(91,92,240,1) 0%, transparent 70%)" }} />
        <div className="absolute top-20 right-0 w-64 h-64 rounded-full opacity-5"
          style={{ background: "radial-gradient(circle, rgba(139,92,246,1) 0%, transparent 70%)" }} />
      </div>

      <div className="relative container mx-auto px-4 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-14">

          {/* Brand Column (2 cols on lg) */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2.5 mb-5 group">
              <img
                src="/QuickTools_Logo.png"
                alt="QuickTools Logo"
                className="w-9 h-9 rounded-xl object-contain shadow-brand group-hover:shadow-brand-lg transition-shadow"
              />
              <span className="font-display font-bold text-xl">
                <span className="text-white">Quick</span>
                <span className="gradient-text">Tools</span>
              </span>
            </Link>

            <p className="text-gray-400 text-sm leading-relaxed max-w-xs mb-6">
              Fast, secure, browser-based tools for everyone. 34+ free professional utilities — no uploads, no sign-up, no limits.
            </p>

            {/* Privacy Trust */}
            <div className="flex items-center gap-2.5 p-3.5 rounded-xl bg-white/5 border border-white/8 mb-6">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center shrink-0">
                <Shield className="w-4 h-4 text-emerald-400" />
              </div>
              <div>
                <p className="text-xs font-semibold text-white">100% Browser-Based Processing</p>
                <p className="text-xs text-gray-500">Your files never leave your device</p>
              </div>
            </div>

            {/* Newsletter */}
            <div className="mb-6">
              <p className="text-xs font-semibold text-gray-300 mb-2.5">Get tool updates in your inbox</p>
              <div className="flex gap-2">
                <div className="flex-1 flex items-center gap-2 px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 focus-within:border-primary/50 transition-colors">
                  <Mail className="w-3.5 h-3.5 text-gray-500 shrink-0" />
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="flex-1 bg-transparent text-sm text-white placeholder:text-gray-500 outline-none"
                  />
                </div>
                <button className="px-3.5 py-2.5 rounded-xl gradient-bg text-white text-xs font-semibold shadow-brand hover:shadow-brand-lg transition-shadow shrink-0">
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              <a
                href="#"
                aria-label="QuickTools on Twitter"
                className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary/20 hover:border-primary/30 transition-all"
              >
                <Twitter className="w-4 h-4 text-gray-400 hover:text-white" />
              </a>
              <a
                href="#"
                aria-label="QuickTools on GitHub"
                className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary/20 hover:border-primary/30 transition-all"
              >
                <Github className="w-4 h-4 text-gray-400 hover:text-white" />
              </a>
            </div>
          </div>

          {/* Popular Tools */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-5 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full gradient-bg inline-block" />
              Popular Tools
            </h4>
            <ul className="space-y-2.5">
              {footerTools.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-1.5 group"
                  >
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -ml-4 group-hover:ml-0 transition-all text-primary" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-5 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full gradient-bg inline-block" />
              Resources
            </h4>
            <ul className="space-y-2.5">
              {footerResources.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-1.5 group"
                  >
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -ml-4 group-hover:ml-0 transition-all text-primary" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-5 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full gradient-bg inline-block" />
              Company
            </h4>
            <ul className="space-y-2.5">
              {footerCompany.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-1.5 group"
                  >
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -ml-4 group-hover:ml-0 transition-all text-primary" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Free badge */}
            <div className="mt-6 p-3 rounded-xl bg-primary/10 border border-primary/20">
              <p className="text-xs font-bold text-primary mb-1">Always Free</p>
              <p className="text-xs text-gray-400">No subscription. No premium tier. All 34+ tools, free forever.</p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-8" />

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-xs flex items-center gap-1.5">
            © {new Date().getFullYear()} QuickTools Online.           
          </p>

          <div className="flex flex-wrap justify-center items-center gap-4 text-xs text-gray-500">
            <Link to="/privacy" className="hover:text-gray-300 transition-colors">Privacy</Link>
            <span className="w-px h-3 bg-gray-700" />
            <Link to="/terms" className="hover:text-gray-300 transition-colors">Terms</Link>
            <span className="w-px h-3 bg-gray-700" />
            <Link to="/contact" className="hover:text-gray-300 transition-colors">Contact</Link>
            <span className="w-px h-3 bg-gray-700" />
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              All systems operational
            </span>
          </div>
        </div>

        {/* Namma Designs Credit */}
        <div className="mt-6 pt-6 border-t border-white/5 flex flex-col items-center justify-center gap-1 text-center">
          <p className="text-xs text-gray-500 flex items-center gap-1.5 flex-wrap justify-center">
            <span>Powered by</span>
            <a
              href="https://www.nammadesigns.site/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-semibold text-primary hover:text-primary/80 transition-colors"
            >
              Namma Designs
              <ExternalLink className="w-3 h-3" />
            </a>
          </p>
          <p className="text-xs text-gray-600 flex items-center gap-1.5 flex-wrap justify-center">
            <span>Designed &amp; Developed by</span>
            <a
              href="https://www.nammadesigns.site/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-primary hover:text-primary/80 transition-colors"
            >
              Namma Designs
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
