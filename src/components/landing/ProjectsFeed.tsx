import { useState, useEffect, useRef } from "react";
import { Heart } from "lucide-react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Marquee } from "@/components/ui/marquee";
import { supabase } from "@/integrations/supabase/client";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface LiveProject {
  id: string;
  title: string;
  description: string;
  emoji: string;
  tags: string[];
  track: string;
  gradient_from: string;
  gradient_to: string;
  author_name: string;
  author_college: string;
  like_count: number;
}

// Shown while loading or when community_projects table is empty
const SEED: LiveProject[] = [
  { id: "s1", title: "AI Resume Analyzer",  emoji: "🤖", description: "Paste a resume and get ATS score, keyword gaps, and a rewritten bullet point.", tags: ["AI", "Claude API"],    track: "AI & ML",    gradient_from: "hsl(160 100% 45% / 0.25)", gradient_to: "hsl(220 100% 50% / 0.15)", author_name: "Rahul M.",  author_college: "IIT Delhi",   like_count: 47 },
  { id: "s2", title: "Campus Event App",    emoji: "📅", description: "Browse, RSVP, and get reminders for every club event on campus in one place.",  tags: ["React", "Firebase"],  track: "Full Stack", gradient_from: "hsl(220 100% 50% / 0.25)", gradient_to: "hsl(160 100% 45% / 0.15)", author_name: "Sneha K.",  author_college: "BITS Pilani", like_count: 31 },
  { id: "s3", title: "Prompt Library Tool", emoji: "📚", description: "Save, tag, and share your best Claude prompts across projects.",                tags: ["AI", "Open Source"], track: "AI & ML",    gradient_from: "hsl(280 80% 60% / 0.25)",  gradient_to: "hsl(346 100% 62% / 0.15)", author_name: "Diya S.",   author_college: "NIT Trichy",  like_count: 58 },
  { id: "s4", title: "Expense Splitter",    emoji: "💸", description: "Split bills instantly between friends with WhatsApp-style groups.",             tags: ["Next.js", "Supabase"],track: "Full Stack", gradient_from: "hsl(45 100% 60% / 0.25)",  gradient_to: "hsl(25 95% 55% / 0.15)",   author_name: "Aryan P.",  author_college: "VIT",         like_count: 22 },
  { id: "s5", title: "Study Buddy Matcher", emoji: "🧠", description: "Match with students studying the same topic, same week, same goal.",            tags: ["ML", "Firebase"],     track: "AI & ML",    gradient_from: "hsl(160 100% 45% / 0.25)", gradient_to: "hsl(220 100% 50% / 0.15)", author_name: "Karan R.",  author_college: "Manipal",     like_count: 43 },
  { id: "s6", title: "Design System Kit",   emoji: "🎨", description: "A Figma component library built for Indian startup MVPs. Free to use.",         tags: ["Figma", "UI/UX"],     track: "UI/UX",      gradient_from: "hsl(280 80% 60% / 0.25)",  gradient_to: "hsl(346 100% 62% / 0.15)", author_name: "Priya N.",  author_college: "SRM",         like_count: 37 },
];

function ProjectCard({ p }: { p: LiveProject }) {
  return (
    <div className="group w-[280px] sm:w-[310px] shrink-0 bg-card border border-border rounded-xl overflow-hidden card-hover-glow">
      <div
        className="h-28 flex items-center justify-center"
        style={{ background: `linear-gradient(135deg, ${p.gradient_from}, ${p.gradient_to})` }}
      >
        <span className="text-4xl group-hover:scale-110 transition-transform duration-300">{p.emoji}</span>
      </div>
      <div className="p-4 space-y-2">
        <h3 className="font-heading font-semibold text-sm truncate">{p.title}</h3>
        <p className="text-[11px] text-muted-foreground font-mono truncate">
          {p.author_name} · {p.author_college}
        </p>
        <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">{p.description}</p>
        <div className="flex items-center justify-between pt-1">
          <div className="flex flex-wrap gap-1">
            {p.tags.slice(0, 2).map((tag) => (
              <span key={tag} className="text-[9px] font-mono bg-surface2 text-muted-foreground px-1.5 py-0.5 rounded">
                {tag}
              </span>
            ))}
          </div>
          <span className="flex items-center gap-1 text-[11px] font-mono text-muted-foreground">
            <Heart size={10} className="text-destructive" /> {p.like_count}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function ProjectsFeed() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const [projects, setProjects] = useState<LiveProject[]>(SEED);
  const [isLive,   setIsLive]   = useState(false);

  // Silently try to fetch live projects from Supabase
  // Falls back to SEED data if table is empty or unreachable
  useEffect(() => {
    async function fetchLive() {
      const { data: rows, error } = await supabase
        .from("community_projects")
        .select("id, title, description, emoji, tags, track, gradient_from, gradient_to, user_id, created_at")
        .order("created_at", { ascending: false })
        .limit(12);

      if (error || !rows?.length) return; // keep seeds — no error shown to visitor

      const userIds = [...new Set(rows.map((r) => r.user_id))];
      const { data: profiles } = await supabase
        .from("profiles")
        .select("id, full_name, college")
        .in("id", userIds);
      const profileMap = new Map((profiles || []).map((p) => [p.id, p]));

      const projectIds = rows.map((r) => r.id);
      const { data: likes } = await supabase
        .from("project_likes")
        .select("project_id")
        .in("project_id", projectIds);
      const likeCounts = new Map<string, number>();
      (likes || []).forEach((l) => {
        likeCounts.set(l.project_id, (likeCounts.get(l.project_id) || 0) + 1);
      });

      setProjects(
        rows.map((r) => {
          const prof = profileMap.get(r.user_id);
          return {
            id:             r.id,
            title:          r.title,
            description:    r.description,
            emoji:          r.emoji,
            tags:           r.tags,
            track:          r.track,
            gradient_from:  r.gradient_from,
            gradient_to:    r.gradient_to,
            author_name:    prof?.full_name || "Builder",
            author_college: prof?.college   || "",
            like_count:     likeCounts.get(r.id) || 0,
          };
        })
      );
      setIsLive(true);
    }
    fetchLive();
  }, []);

  // Heading scroll reveal
  useGSAP(() => {
    if (!headingRef.current) return;
    gsap.from(headingRef.current.children, {
      opacity: 0, y: 24, duration: 0.65, stagger: 0.1, ease: "power3.out",
      scrollTrigger: { trigger: headingRef.current, start: "top 85%", toggleActions: "play none none none" },
    });
  }, { scope: sectionRef });

  const mid        = Math.ceil(projects.length / 2);
  const firstRow   = projects.slice(0, mid);
  const secondRow  = projects.slice(mid);

  return (
    <section ref={sectionRef} id="projects" className="border-t border-border py-[70px]">
      <div ref={headingRef} className="container mb-10">
        <p className="text-xs font-mono text-primary tracking-widest uppercase mb-3">
          BUILT BY STUDENTS
        </p>
        <div className="flex items-end justify-between gap-4 flex-wrap">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold">
            What builders are shipping
          </h2>
          {isLive && (
            <span className="text-xs font-mono text-muted-foreground flex items-center gap-1.5 pb-1">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse-dot" />
              Live from the community
            </span>
          )}
        </div>
      </div>

      <div className="relative">
        {/* Edge fade */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-l from-background to-transparent z-10" />

        <Marquee pauseOnHover className="[--duration:35s] mb-4">
          {firstRow.map((p) => <ProjectCard key={p.id} p={p} />)}
        </Marquee>
        <Marquee pauseOnHover reverse className="[--duration:35s]">
          {secondRow.map((p) => <ProjectCard key={p.id} p={p} />)}
        </Marquee>
      </div>
    </section>
  );
}