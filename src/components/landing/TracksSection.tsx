import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ElectricBorder from "@/components/ElectricBorder";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const tracks = [
  { emoji: "🤖", title: "AI & Machine Learning", desc: "From prompts to models. Build real AI tools and ship them.", tag1: "Beginner Friendly", tag2: "8 Projects", modules: 8 },
  { emoji: "🎨", title: "UI/UX Design", desc: "Design thinking, Figma workflows, and shipping polished interfaces.", tag1: "Visual", tag2: "6 Projects", modules: 6 },
  { emoji: "💻", title: "Full Stack Dev", desc: "Build web apps from scratch — frontend, backend, and deployment.", tag1: "Intermediate", tag2: "10 Projects", modules: 10 },
  { emoji: "🚀", title: "Build a Startup", desc: "Validate ideas, build MVPs, and pitch to peers and mentors.", tag1: "Advanced", tag2: "5 Projects", modules: 5 },
];

export default function TracksSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(headingRef.current!.children, {
      opacity: 0, y: 28, duration: 0.7, stagger: 0.1, ease: "power3.out",
      scrollTrigger: { trigger: headingRef.current, start: "top 85%", toggleActions: "play none none none" },
    });

    const cards = gridRef.current!.querySelectorAll(".track-card");
    gsap.from(cards, {
      opacity: 0, y: 44, scale: 0.97, duration: 0.65, stagger: 0.12, ease: "power3.out",
      scrollTrigger: { trigger: gridRef.current, start: "top 80%", toggleActions: "play none none none" },
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} id="tracks" className="border-t border-border py-[70px]">
      <div className="container">
        <div ref={headingRef} className="mb-12">
          <p className="text-xs font-mono text-primary tracking-widest uppercase mb-3">WHAT YOU'LL BUILD IN</p>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold">Explore Tracks</h2>
        </div>

        <div ref={gridRef} className="grid sm:grid-cols-2 gap-5">
          {tracks.map((t) => (
            <div key={t.title} className="track-card">
              <ElectricBorder color="#00e5a0" speed={0.3} chaos={0.04} borderRadius={20} className="group h-full">
                <div className="p-6 text-left bg-card rounded-[20px] h-full flex flex-col">
                  <span className="text-3xl mb-4 block">{t.emoji}</span>
                  <h3 className="font-heading text-lg font-bold mb-2">{t.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4 flex-1">{t.desc}</p>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-[11px] font-mono bg-surface2 text-muted-foreground px-2.5 py-1 rounded">{t.tag1}</span>
                    <span className="text-[11px] font-mono bg-surface2 text-muted-foreground px-2.5 py-1 rounded">{t.tag2}</span>
                  </div>
                  <Link to="/signup" className="inline-flex items-center gap-1.5 text-sm font-mono text-primary hover:underline">
                    Explore Track <ArrowRight size={14} />
                  </Link>
                </div>
              </ElectricBorder>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}