import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { lazy, Suspense } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import SplitText from "@/components/SplitText";

gsap.registerPlugin(useGSAP);

const Dither = lazy(() => import("@/components/Dither"));

const stats = [
  { value: "5+", label: "BUILDERS" },
  { value: "3+",   label: "PROJECTS SHIPPED" },
  { value: "1",     label: "COLLEGES" },
  { value: "4",     label: "TRACKS" },
];

export default function HeroSection() {
  const statsRef = useRef<HTMLDivElement>(null);

  // Stagger stats in after headline animation completes
  useGSAP(() => {
    if (!statsRef.current) return;
    gsap.from(statsRef.current.querySelectorAll(".stat-item"), {
      opacity: 0,
      y: 18,
      duration: 0.55,
      stagger: 0.1,
      ease: "power3.out",
      delay: 1.6,
    });
  });

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Dither WebGL background */}
      <div className="absolute inset-0">
        <Suspense fallback={<div className="absolute inset-0 bg-background" />}>
          <Dither
            waveColor={[0.4, 0.4, 0.4]}
            disableAnimation={false}
            enableMouseInteraction
            mouseRadius={0.3}
            colorNum={4}
            waveAmplitude={0.3}
            waveFrequency={5}
            waveSpeed={0.03}
          />
        </Suspense>
      </div>

      <div className="container relative z-10 pt-16 sm:pt-24 pb-20 max-w-4xl mx-auto text-center">
        {/* Beta badge */}
        <div className="inline-flex items-center gap-2 border border-primary/40 rounded-full px-4 py-1.5 mb-8 animate-fade-in opacity-0 animate-glow-pulse">
          <span className="w-1.5 h-1.5 rounded-full bg-primary" />
          <span className="text-xs font-mono text-primary tracking-wider">
            NOW IN BETA — AI TRACK LIVE
          </span>
        </div>

        {/* Headline */}
        <h1 className="font-heading font-extrabold tracking-tight">
          <SplitText
            text="Don't just learn."
            className="block text-5xl sm:text-6xl lg:text-7xl leading-[1.05] text-foreground"
            tag="span"
            delay={60}
            duration={0.8}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 50 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            rootMargin="-50px"
          />
          <span className="block text-6xl sm:text-7xl lg:text-[5.5rem] leading-[1.05] mt-2 text-gradient-primary animate-fade-in-up opacity-0 stagger-2">
            BUILD.
          </span>
          <SplitText
            text="while you learn."
            className="block text-3xl sm:text-4xl lg:text-5xl leading-[1.1] mt-2 font-bold text-white"
            tag="span"
            delay={50}
            duration={0.8}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 30 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            rootMargin="-50px"
          />
        </h1>

        {/* Subtext */}
        <p className="mt-8 text-lg max-w-2xl mx-auto text-pretty animate-fade-in-up opacity-0 stagger-3 text-white/90">
          JustBuild is where college students learn AI, design, and tech by shipping real
          projects — not watching videos.
        </p>

        {/* CTAs — primary uses brand green, secondary subtle outline */}
        <div className="mt-10 flex items-center justify-center gap-4 animate-fade-in-up opacity-0 stagger-4 flex-wrap">
          <Link
            to="/signup"
            className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-7 py-3.5 rounded-lg font-semibold hover:bg-primary/90 transition-colors h-[46px]"
          >
            Start Building <ArrowRight size={16} />
          </Link>
          <a
            href="#projects"
            className="inline-flex items-center justify-center gap-2 border border-white/30 text-white/90 px-7 py-3.5 rounded-lg font-medium transition-colors hover:border-white/60 hover:bg-white/5 h-[46px]"
          >
            See Projects
          </a>
        </div>

        {/* Stats row — GSAP stagger in */}
        <div
          ref={statsRef}
          className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-2xl mx-auto"
        >
          {stats.map(({ value, label }) => (
            <div key={label} className="stat-item">
              <p className="text-2xl font-heading font-bold text-white">{value}</p>
              <p className="text-[10px] font-mono tracking-widest mt-1 text-white/60">
                {label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}