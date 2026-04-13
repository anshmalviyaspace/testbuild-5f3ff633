import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GridScan from "@/components/GridScan";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function FinalCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const children = contentRef.current!.children;
    gsap.from(children, {
      opacity: 0, y: 40, duration: 0.75, stagger: 0.14, ease: "power3.out",
      scrollTrigger: { trigger: contentRef.current, start: "top 82%", toggleActions: "play none none none" },
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="py-24 border-t border-border relative overflow-hidden">
      <GridScan sensitivity={0.55} lineThickness={1} linesColor="#392e4e" gridScale={0.1}
        scanColor="#FF9FFC" scanOpacity={0.4} enablePost bloomIntensity={0.6}
        chromaticAberration={0.002} noiseIntensity={0.01} />
      <div ref={contentRef} className="container relative z-10 text-center max-w-2xl mx-auto">
        <p className="text-xs font-mono text-primary tracking-widest uppercase mb-4">READY?</p>
        <h2 className="font-heading text-4xl sm:text-5xl font-extrabold mb-4 text-balance">
          Your portfolio starts today.
        </h2>
        <p className="text-lg text-muted-foreground mb-10">
          Stop bookmarking tutorials. Start shipping.
        </p>
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <Link to="/signup" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-7 py-3.5 rounded-lg font-semibold hover:bg-primary/90 transition-colors">
            Pick Your Track <ArrowRight size={16} />
          </Link>
          <a href="#projects" className="inline-flex items-center gap-2 border border-border px-7 py-3.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:border-muted-foreground/50 transition-colors">
            See What Others Built
          </a>
        </div>
      </div>
    </section>
  );
}