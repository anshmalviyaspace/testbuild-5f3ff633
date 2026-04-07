import { Link } from "react-router-dom";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { ArrowRight, Target, Users, Zap, Heart } from "lucide-react";

const values = [
  { icon: Target, title: "Build-First Learning", desc: "We believe the best way to learn is by building real projects, not watching tutorials." },
  { icon: Users, title: "Community Driven", desc: "Learn alongside other builders. Share progress, get feedback, and grow together." },
  { icon: Zap, title: "Action Over Theory", desc: "Less consuming, more creating. Every lesson ends with something you can ship." },
  { icon: Heart, title: "For Every Builder", desc: "Whether you're a beginner or experienced, there's a track and community for you." },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Hero */}
      <section className="pt-28 pb-16 sm:pt-36 sm:pb-24">
        <div className="container max-w-3xl text-center space-y-6">
          <p className="text-xs font-mono uppercase tracking-widest text-primary">About Us</p>
          <h1 className="font-heading text-4xl sm:text-5xl font-extrabold tracking-tight text-balance">
            We're building the platform we wished we had.
          </h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto text-pretty">
            JustBuild was born from a simple frustration: too many tutorials, not enough building. We created a space where aspiring developers learn by shipping real projects — not by consuming endless content.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 border-t border-border">
        <div className="container max-w-4xl grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-5">
            <p className="text-xs font-mono uppercase tracking-widest text-primary">Our Mission</p>
            <h2 className="font-heading text-3xl font-bold tracking-tight">
              Turn builders into shippers.
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              The tech industry has a consumption problem. Developers spend months watching courses but never build anything meaningful. JustBuild flips that model — you pick a track, build guided projects, earn XP, and walk away with a portfolio that proves your skills.
            </p>
            <p className="text-muted-foreground text-sm leading-relaxed">
              We're not another tutorial platform. We're a builder's gym — structured, challenging, and designed to make you ship.
            </p>
          </div>
          <div className="relative rounded-2xl overflow-hidden border border-border bg-surface p-8 text-center">
            <div className="text-6xl mb-4">🚀</div>
            <p className="font-heading text-2xl font-bold">Build more.</p>
            <p className="font-heading text-2xl font-bold text-primary">Consume less.</p>
            <p className="text-xs font-mono text-muted-foreground mt-3">— The JustBuild philosophy</p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 border-t border-border">
        <div className="container max-w-4xl space-y-10">
          <div className="text-center space-y-3">
            <p className="text-xs font-mono uppercase tracking-widest text-primary">Our Values</p>
            <h2 className="font-heading text-3xl font-bold tracking-tight">What we stand for</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            {values.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="rounded-xl border border-border bg-surface p-6 space-y-3 transition-shadow hover:shadow-lg">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Icon size={20} className="text-primary" />
                </div>
                <h3 className="font-heading text-lg font-semibold">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 border-t border-border">
        <div className="container max-w-2xl text-center space-y-6">
          <h2 className="font-heading text-3xl font-bold tracking-tight">Ready to start building?</h2>
          <p className="text-muted-foreground">Join thousands of builders who are shipping projects and growing their skills every day.</p>
          <Link
            to="/signup"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold text-sm transition-colors hover:bg-primary/90"
          >
            Get Started <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
