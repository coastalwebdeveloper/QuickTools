import { Link } from "react-router-dom";
import { ArrowLeft, Mail } from "lucide-react";

const Contact = () => {

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <h1 className="text-4xl font-bold mb-6">Contact Us</h1>

        <p className="text-lg text-muted-foreground mb-8">
          Have questions, suggestions, or feedback? We'd love to hear from you.
        </p>

        <div className="bg-card border border-border rounded-2xl p-6 md:p-8">
          <div className="flex flex-col sm:flex-row items-start gap-4 mb-6">
            <Mail className="w-8 h-8 text-primary mt-1 shrink-0" />
            <div className="w-full">
              <h2 className="text-xl md:text-2xl font-bold mb-2">Email Us</h2>
              <p className="text-muted-foreground mb-4">
                Send us an email and we'll get back to you within 24-48 hours.
              </p>
              <a 
                href="mailto:coastal.webdeveloper@gmail.com" 
                className="inline-flex items-center gap-2 text-base md:text-xl font-semibold text-primary hover:underline break-all"
              >
                coastal.webdeveloper@gmail.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
