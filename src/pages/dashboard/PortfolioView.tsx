import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { ArrowRight, PartyPopper, Heart } from "lucide-react";
import { useEffect, useState } from "react";
import { useMyProjects } from "@/hooks/useCommunity";
import { supabase } from "@/integrations/supabase/client";

interface QuizResult {
  personality_type: string;
  personality_description: string;
  score: number;
  level: string;
}

function Skeleton({ className = "" }: { className?: string }) {
  return <div className={`bg-surface2 rounded-lg animate-pulse ${className}`} />;
}

export default function PortfolioView() {
  const { currentUser, isLoading } = useAuth();
  const { data: projects = [], isLoading: projectsLoading } = useMyProjects();
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);
  const [joinedDate, setJoinedDate] = useState<string>("Recently");

  useEffect(() => {
    // Load quiz result from DB (more reliable than localStorage across devices)
    async function loadQuiz() {
      if (!currentUser) return;
      const { data } = await supabase
        .from("quiz_results")
        .select("personality_type, personality_description, score, level")
        .eq("user_id", currentUser.id)
        .single();
      if (data) setQuizResult(data as QuizResult);
      else {
        // Fallback to localStorage if DB result not found
        const stored = localStorage.getItem("justbuild_quiz_results");
        if (stored) {
          const p = JSON.parse(stored);
          setQuizResult({ personality_type: p.personality_type, personality_description: p.personality_description, score: p.score, level: p.level });
        }
      }
    }

    async function loadProfile() {
      if (!currentUser) return;
      const { data } = await supabase.from("profiles").select("created_at").eq("id", currentUser.id).single();
      if (data?.created_at) {
        setJoinedDate(new Date(data.created_at).toLocaleDateString("en-US", { month: "long", year: "numeric" }));
      }
    }

    loadQuiz();
    loadProfile();
  }, [currentUser]);

  if (isLoading || !currentUser) {
    return (
      <div className="p-6 sm:p-8 max-w-4xl space-y-6">
        <Skeleton className="h-8 w-40" />
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-48 w-full" />
      </div>
    );
  }

  return (
    <div className="p-6 sm:p-8 max-w-4xl animate-fade-in opacity-0">
      <div className="flex items-center justify-between mb-2">
        <h1 className="font-heading text-2xl font-extrabold">Portfolio</h1>
        <Link to={`/profile/${currentUser.username}`} className="text-xs font-mono text-primary hover:underline flex items-center gap-1">
          View Public Profile <ArrowRight size={12} />
        </Link>
      </div>
      <p className="text-sm text-muted-foreground mb-8">Your public-facing builder profile</p>

      {/* Profile Header */}
      <section className="bg-card border border-border rounded-xl p-6 mb-6">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-full shrink-0 flex items-center justify-center text-lg font-heading font-bold text-primary-foreground"
            style={{ background: "linear-gradient(135deg, hsl(160 100% 45%), hsl(220 100% 50%))" }}>
            {currentUser.avatarInitials}
          </div>
          <div className="flex-1">
            <h2 className="font-heading text-xl font-extrabold">{currentUser.fullName}</h2>
            <p className="text-sm font-mono text-primary">@{currentUser.username}</p>
            <p className="text-xs text-muted-foreground mt-1">{currentUser.college}</p>
            {currentUser.bio && <p className="text-sm text-muted-foreground/80 mt-2">{currentUser.bio}</p>}
            <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-border">
              <div>
                <p className="font-heading text-xl font-bold">{projects.length}</p>
                <p className="text-[10px] font-mono text-muted-foreground tracking-wide uppercase">Projects</p>
              </div>
              <div>
                <p className="font-heading text-xl font-bold">{currentUser.xpPoints}</p>
                <p className="text-[10px] font-mono text-muted-foreground tracking-wide uppercase">XP Earned</p>
              </div>
              <div>
                <p className="font-heading text-xl font-bold text-sm">{joinedDate}</p>
                <p className="text-[10px] font-mono text-muted-foreground tracking-wide uppercase">Joined</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Builder Profile */}
      {quizResult ? (
        <section className="bg-card border border-border rounded-xl p-6 mb-6 space-y-5">
          <p className="text-[10px] font-mono text-muted-foreground tracking-widest uppercase">BUILDER PROFILE</p>
          <div className="flex justify-center">
            <div className="inline-flex items-center gap-2 border border-primary/30 bg-primary/5 text-primary px-5 py-2.5 rounded-full text-sm font-mono tracking-wider">
              ✦ {quizResult.personality_type.toUpperCase()}
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-[10px] font-mono text-muted-foreground tracking-widest uppercase">BASE LEVEL</p>
              <p className="font-heading text-xl font-extrabold mt-1">{quizResult.level}</p>
              <p className="text-[10px] text-muted-foreground">when joined</p>
            </div>
            <div className="text-center">
              <p className="text-[10px] font-mono text-muted-foreground tracking-widest uppercase">KNOWLEDGE SCORE</p>
              <p className="font-heading text-xl font-extrabold text-primary mt-1">{quizResult.score} / 100</p>
              <p className="text-[10px] text-muted-foreground">at assessment</p>
            </div>
            <div className="text-center">
              <p className="text-[10px] font-mono text-muted-foreground tracking-widest uppercase">CURRENT XP</p>
              <p className="font-heading text-xl font-extrabold mt-1">{currentUser.xpPoints}</p>
              <p className="text-[10px] text-muted-foreground">earned building</p>
            </div>
          </div>
          {quizResult.personality_description && (
            <p className="text-sm text-muted-foreground/80 italic text-center max-w-lg mx-auto leading-relaxed">
              "{quizResult.personality_description}"
            </p>
          )}
        </section>
      ) : (
        <section className="bg-card border border-border border-dashed rounded-xl p-6 mb-6 text-center">
          <p className="text-sm text-muted-foreground">Assessment not taken yet</p>
          <Link to="/quiz" className="text-xs font-mono text-primary hover:underline mt-2 inline-block">Take Assessment →</Link>
        </section>
      )}

      {/* Shipped Projects */}
      <section className="mb-6">
        <p className="text-[10px] font-mono text-muted-foreground tracking-widest uppercase mb-4">
          SHIPPED PROJECTS{projects.length > 0 && ` (${projects.length})`}
        </p>
        {projectsLoading ? (
          <div className="grid sm:grid-cols-2 gap-4">
            {[1,2].map((i) => <Skeleton key={i} className="h-40" />)}
          </div>
        ) : projects.length === 0 ? (
          <div className="bg-card border border-border rounded-xl p-8 text-center">
            <p className="text-sm text-muted-foreground mb-1">Your portfolio is empty — for now.</p>
            <p className="text-xs text-muted-foreground mb-4">Every project you ship becomes part of your permanent portfolio.</p>
            <Link to="/dashboard/track" className="text-xs font-mono text-primary hover:underline">
              Start with your first project brief →
            </Link>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 gap-4">
            {projects.map((p) => (
              <div key={p.id} className="bg-card border border-border rounded-xl overflow-hidden card-hover-glow group">
                <div className="h-28 flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${p.gradient_from}, ${p.gradient_to})` }}>
                  <span className="text-4xl group-hover:scale-110 transition-transform duration-300">{p.emoji}</span>
                </div>
                <div className="p-4 space-y-2">
                  <h3 className="font-heading text-sm font-bold">{p.title}</h3>
                  <p className="text-xs text-muted-foreground line-clamp-2">{p.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {p.tags.map((tag) => <span key={tag} className="text-[10px] font-mono bg-surface2 text-muted-foreground px-2 py-0.5 rounded">{tag}</span>)}
                  </div>
                  <div className="flex items-center gap-3 text-[11px] font-mono text-muted-foreground pt-1">
                    <span className="flex items-center gap-1"><Heart size={10} className="text-destructive" /> {p.like_count}</span>
                    <span>{new Date(p.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Activity Timeline */}
      <section>
        <p className="text-[10px] font-mono text-muted-foreground tracking-widest uppercase mb-4">ACTIVITY</p>
        <div className="relative pl-6 space-y-0">
          <div className="absolute left-[7px] top-2 bottom-2 w-px bg-border" />
          {projects.slice(0, 3).map((p) => (
            <div key={p.id} className="relative flex items-start gap-4 py-3">
              <div className="absolute left-[-17px] top-[18px] w-3.5 h-3.5 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
              </div>
              <div className="flex-1 flex items-center justify-between gap-4">
                <span className="text-sm text-foreground">Shipped — {p.title}</span>
                <span className="text-[10px] font-mono text-muted-foreground whitespace-nowrap">
                  {new Date(p.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                </span>
              </div>
            </div>
          ))}
          <div className="relative flex items-start gap-4 py-3">
            <div className="absolute left-[-17px] top-[18px] w-3.5 h-3.5 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-primary" />
            </div>
            <div className="flex-1 flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <PartyPopper size={14} className="text-primary" />
                <span className="text-sm text-foreground">Joined JustBuild</span>
              </div>
              <span className="text-[10px] font-mono text-muted-foreground whitespace-nowrap">{joinedDate}</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}