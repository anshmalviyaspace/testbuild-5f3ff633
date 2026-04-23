import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const steps = [
  { num: "01", emoji: "🤖", title: "Pick a Track", desc: "Choose AI, Design, Full Stack, or Startup — each with a curated path built around real projects.", tag: "AI · Design · Code · Startup" },
  { num: "02", emoji: "🗺️", title: "Get Your Learning Path", desc: "A personalised roadmap of the world's best resources — curated, not algorithmic. Every link earned its place.", tag: "Handpicked resources" },
  { num: "03", emoji: "🔨", title: "Build the Project", desc: "Every module ends with a real project brief — not a quiz, not a drag-and-drop exercise. Something you can ship.", tag: "Real project brief" },
  { num: "04", emoji: "🚀", title: "Publish to Portfolio", desc: "Your work goes live instantly on your public JustBuild portfolio. Shareable, searchable, yours.", tag: "Live portfolio page" },
  { num: "05", emoji: "💬", title: "Get Peer Feedback", desc: "Community reviews your build. Real comments, likes, and ratings from people building the same things you are.", tag: "Community reviews" },
];

export default function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Heading fade up
    gsap.from(headingRef.current!.children, {
      opacity: 0,
      y: 30,
      duration: 0.7,
      stagger: 0.12,
      ease: "power3.out",
      scrollTrigger: {
        trigger: headingRef.current,
        start: "top 85%",
        toggleActions: "play none none none",
      },
    });

    // Steps stagger — each card slides up and fades in
    const cards = stepsRef.current!.querySelectorAll(".step-card");
    gsap.from(cards, {
      opacity: 0,
      y: 50,
      duration: 0.65,
      stagger: 0.15,
      ease: "power3.out",
      scrollTrigger: {
        trigger: stepsRef.current,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });

    // Progress line draw
    const line = sectionRef.current!.querySelector(".progress-line") as HTMLElement;
    if (line) {
      gsap.from(line, {
        scaleY: 0,
        transformOrigin: "top center",
        duration: 1.4,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: stepsRef.current,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      });
    }
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="border-t border-border py-[70px]">
      <div className="container max-w-4xl mx-auto">
        <div ref={headingRef}>
          <p className="text-xs font-mono text-primary tracking-widest uppercase mb-3">THE PROCESS</p>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold mb-14">Learn. Build. Ship. Repeat.</h2>
        </div>

        {/* Vertical timeline */}
        <div ref={stepsRef} className="relative">
          {/* Vertical line */}
          <div className="progress-line absolute left-[19px] top-6 bottom-6 w-px bg-border hidden sm:block" />

          <div className="space-y-0">
            {steps.map((step, i) => (
              <div key={step.num} className="step-card flex gap-6 sm:gap-8 pb-10 last:pb-0 relative">
                {/* Number dot */}
                <div className="flex-shrink-0 relative z-10">
                  <div className="w-10 h-10 rounded-full border-2 border-border bg-surface flex items-center justify-center font-mono text-xs font-bold text-muted-foreground">
                    {step.num}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 pt-1.5 pb-2">
                  <div className="flex items-start gap-3 mb-2">
                    <span className="text-2xl">{step.emoji}</span>
                    <div>
                      <h3 className="font-heading text-lg font-bold text-foreground">{step.title}</h3>
                      <span className="inline-block text-[10px] font-mono text-primary bg-primary/10 px-2 py-0.5 rounded mt-1">{step.tag}</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed max-w-lg">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}