import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import CategorySection from "@/components/CategorySection";
import { Link } from "react-router-dom";
import { BookOpen, Shield, Zap, Star, Users } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <CategorySection />
        
        {/* Value Proposition Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              {/* Trust Stats */}
              <div className="text-center mb-12">
                <p className="text-sm text-muted-foreground mb-2">Trusted by users worldwide</p>
                <div className="flex flex-wrap justify-center gap-8 text-center">
                  <div>
                    <p className="text-3xl font-bold text-primary">10,000+</p>
                    <p className="text-sm text-muted-foreground">Active Users</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-primary">25+</p>
                    <p className="text-sm text-muted-foreground">Free Tools</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-primary">100%</p>
                    <p className="text-sm text-muted-foreground">Browser-Based</p>
                  </div>
                </div>
              </div>

              <h2 className="text-3xl font-bold text-center mb-12">Why Choose QuickTools Online?</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-card border border-border rounded-xl p-6 text-center">
                  <div className="inline-flex p-3 bg-primary/10 rounded-lg mb-4">
                    <Shield className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">100% Private</h3>
                  <p className="text-sm text-muted-foreground">All processing happens in your browser. Your files never leave your device.</p>
                  <p className="text-xs text-primary mt-2 font-medium">No files stored on our servers</p>
                </div>
                <div className="bg-card border border-border rounded-xl p-6 text-center">
                  <div className="inline-flex p-3 bg-primary/10 rounded-lg mb-4">
                    <Zap className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Lightning Fast</h3>
                  <p className="text-sm text-muted-foreground">No uploads or downloads. Instant results with local processing.</p>
                  <p className="text-xs text-primary mt-2 font-medium">Processing happens locally</p>
                </div>
                <div className="bg-card border border-border rounded-xl p-6 text-center">
                  <div className="inline-flex p-3 bg-primary/10 rounded-lg mb-4">
                    <Star className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Always Free</h3>
                  <p className="text-sm text-muted-foreground">No subscriptions, no hidden fees. All 25+ tools are completely free.</p>
                  <p className="text-xs text-primary mt-2 font-medium">Free forever</p>
                </div>
                <div className="bg-card border border-border rounded-xl p-6 text-center">
                  <div className="inline-flex p-3 bg-primary/10 rounded-lg mb-4">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">No Sign-Up</h3>
                  <p className="text-sm text-muted-foreground">Start using any tool immediately. No registration required.</p>
                  <p className="text-xs text-primary mt-2 font-medium">Instant access</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Resources Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center justify-center gap-3 mb-8">
                <BookOpen className="w-8 h-8 text-primary" />
                <h2 className="text-3xl font-bold">Learn & Improve</h2>
              </div>
              <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
                Explore our comprehensive guides to master digital tools and workflows. From PDF management to image optimization, we've got you covered.
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <Link to="/blog/pdf-best-practices" className="group bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all hover:border-primary/50">
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">PDF Management Best Practices</h3>
                  <p className="text-muted-foreground mb-3">Master the art of PDF document management with professional techniques for merging, splitting, and organizing files efficiently.</p>
                  <span className="text-primary text-sm font-medium">Read Guide →</span>
                </Link>
                <Link to="/blog/image-optimization" className="group bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all hover:border-primary/50">
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">Image Optimization Complete Guide</h3>
                  <p className="text-muted-foreground mb-3">Learn professional techniques to reduce image file sizes while maintaining visual quality for web and print applications.</p>
                  <span className="text-primary text-sm font-medium">Read Guide →</span>
                </Link>
              </div>
              <div className="text-center mt-8">
                <Link to="/blog" className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium">
                  View All Resources
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
