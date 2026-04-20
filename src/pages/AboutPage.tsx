import { Link } from "react-router-dom";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { ExternalLink } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center pt-16">
        <div className="text-center px-6 py-24 max-w-sm mx-auto space-y-6">
          <p className="text-xs font-mono text-primary tracking-widest uppercase">About</p>
          <h1 className="font-heading text-4xl sm:text-5xl font-extrabold tracking-tight">
            Just<span className="text-primary">Build</span>
          </h1>
          <p className="text-muted-foreground text-base leading-relaxed">
            Built by{" "}
            <a
              href="https://anshmalviya.netlify.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline font-medium inline-flex items-center gap-1"
            >
              Ansh Malviya <ExternalLink size={12} />
            </a>
          </p>
          <div className="pt-4">
            <Link to="/signup"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors">
              Start Building →
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}