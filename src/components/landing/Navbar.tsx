import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import clsx from "clsx";
import { useAuth } from "@/contexts/AuthContext";

gsap.registerPlugin(useGSAP);

const navLinks = [
  { label: "Tracks",    href: "#tracks" },
  { label: "Projects",  href: "#projects" },
  { label: "Community", href: "#community" },
  { label: "Pricing",   href: "#pricing" },
  { label: "About",     href: "/about", isRoute: true },
];

export default function Navbar() {
  const { isAuthenticated } = useAuth();
  const [scrolled,   setScrolled]   = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useGSAP(() => {
    gsap.from(".nav-item", {
      opacity: 0, y: -12, duration: 0.5, stagger: 0.06, ease: "power3.out", delay: 0.2,
    });
  });

  return (
    <header className={clsx(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
      scrolled ? "bg-background/80 backdrop-blur-xl border-b border-border" : "bg-transparent border-b border-transparent"
    )}>
      {/* Use px-6 directly so App.css container padding doesn't affect alignment */}
      <div className="w-full px-6 max-w-7xl mx-auto flex items-center h-16">

        {/* Logo */}
        <Link to="/" className="nav-item flex items-center gap-2 shrink-0">
          <span className="font-heading text-xl font-extrabold tracking-tight">
            Just<span className="text-primary">Build</span>
          </span>
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse-dot" />
        </Link>

        {/* Desktop nav — centered */}
        <nav className="hidden md:flex items-center gap-8 flex-1 justify-center">
          {navLinks.map(({ label, href, isRoute }) =>
            isRoute ? (
              <Link key={label} to={href} className="nav-item text-sm text-white/80 hover:text-white transition-colors">{label}</Link>
            ) : (
              <a key={label} href={href} className="nav-item text-sm text-white/80 hover:text-white transition-colors">{label}</a>
            )
          )}
        </nav>

        {/* Desktop CTAs — right-aligned, always same height via h-9 */}
        <div className="hidden md:flex items-center gap-3 shrink-0">
          {isAuthenticated ? (
            <Link to="/dashboard/home"
              className="nav-item h-9 px-5 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors flex items-center">
              Dashboard →
            </Link>
          ) : (
            <>
              <Link to="/login"
                className="nav-item h-9 px-4 text-sm text-white/80 hover:text-white transition-colors font-medium flex items-center">
                Log In
              </Link>
              <Link to="/signup"
                className="nav-item h-9 px-5 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors flex items-center">
                Start Building
              </Link>
            </>
          )}
        </div>

        {/* Mobile burger */}
        <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden ml-auto text-foreground p-2" aria-label="Toggle menu">
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-xl border-b border-border animate-in fade-in slide-in-from-top-2 duration-200">
          <nav className="px-6 flex flex-col gap-1 py-4">
            {navLinks.map(({ label, href, isRoute }) =>
              isRoute ? (
                <Link key={label} to={href} onClick={() => setMobileOpen(false)}
                  className="text-sm text-muted-foreground hover:text-foreground py-2.5 px-3 rounded-lg hover:bg-muted transition-colors">{label}</Link>
              ) : (
                <a key={label} href={href} onClick={() => setMobileOpen(false)}
                  className="text-sm text-muted-foreground hover:text-foreground py-2.5 px-3 rounded-lg hover:bg-muted transition-colors">{label}</a>
              )
            )}
            <div className="flex flex-col gap-2 mt-2 pt-2 border-t border-border">
              {isAuthenticated ? (
                <Link to="/dashboard/home" onClick={() => setMobileOpen(false)}
                  className="text-center bg-primary text-primary-foreground px-5 py-2.5 rounded-lg text-sm font-semibold">Go to Dashboard</Link>
              ) : (
                <>
                  <Link to="/login" onClick={() => setMobileOpen(false)}
                    className="text-center border border-border text-foreground px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-surface2 transition-colors">Log In</Link>
                  <Link to="/signup" onClick={() => setMobileOpen(false)}
                    className="text-center bg-primary text-primary-foreground px-5 py-2.5 rounded-lg text-sm font-semibold">Start Building</Link>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}