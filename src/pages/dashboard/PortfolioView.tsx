import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { ArrowRight, Download, ExternalLink, Heart, Flame, Zap, BookOpen, Calendar, Globe } from "lucide-react";
import { useEffect, useState } from "react";
import { useMyProjects } from "@/hooks/useCommunity";
import { supabase } from "@/integrations/supabase/client";

interface QuizResult {
  personality_type: string;
  personality_description: string;
  score: number;
  level: string;
}

function Sk({ className = "" }: { className?: string }) {
  return <div className={`bg-surface2 rounded-lg animate-pulse ${className}`} />;
}

function UserAvatar({ initials, avatarUrl }: { initials: string; avatarUrl?: string }) {
  return (
    <div
      className="w-16 h-16 rounded-full overflow-hidden flex items-center justify-center shrink-0 font-heading font-bold text-primary-foreground"
      style={{ background: "linear-gradient(135deg, hsl(160 100% 45%), hsl(220 100% 50%))" }}
    >
      {avatarUrl
        ? <img src={avatarUrl} alt={initials} className="w-full h-full object-cover" />
        : <span className="text-base">{initials}</span>}
    </div>
  );
}

export default function PortfolioView() {
  const { currentUser, isLoading } = useAuth();
  const { data: projects = [], isLoading: projectsLoading } = useMyProjects();
  const [quiz, setQuiz]     = useState<QuizResult | null>(null);
  const [joined, setJoined] = useState("Recently");

  const avatarUrl = (currentUser as any)?.avatarUrl;

  useEffect(() => {
    if (!currentUser) return;
    (async () => {
      const { data: qr } = await supabase
        .from("quiz_results")
        .select("personality_type,personality_description,score,level")
        .eq("user_id", currentUser.id)
        .single();
      if (qr) {
        setQuiz(qr as QuizResult);
      } else {
        const s = localStorage.getItem("justbuild_quiz_results");
        if (s) {
          const p = JSON.parse(s);
          setQuiz({
            personality_type: p.personality_type,
            personality_description: p.personality_description,
            score: p.score,
            level: p.level,
          });
        }
      }
      const { data: pr } = await supabase
        .from("profiles")
        .select("created_at")
        .eq("id", currentUser.id)
        .single();
      if (pr?.created_at) {
        setJoined(new Date(pr.created_at).toLocaleDateString("en-US", { month: "long", year: "numeric" }));
      }
    })();
  }, [currentUser]);

  if (isLoading || !currentUser) {
    return (
      <div className="p-6 sm:p-8 max-w-4xl space-y-6">
        <Sk className="h-8 w-40" />
        <Sk className="h-32 w-full" />
        <Sk className="h-48 w-full" />
      </div>
    );
  }

  return (
    <div className="p-6 sm:p-8 max-w-4xl animate-fade-in opacity-0">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-heading text-2xl font-extrabold">Portfolio</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Your professional builder profile</p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            to={`/profile/${currentUser.username}`}
            className="text-xs font-mono text-primary hover:underline flex items-center gap-1"
          >
            Public view <ArrowRight size={12} />
          </Link>
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-1.5 border border-border px-4 py-2 rounded-lg text-xs font-mono text-muted-foreground hover:text-foreground hover:border-muted-foreground/40 transition-colors"
          >
            <Download size={13} /> Export PDF
          </button>
        </div>
      </div>

      {/* Profile card */}
      <section className="bg-card border border-border rounded-2xl p-6 mb-5">
        <div className="flex items-start gap-5">
          <UserAvatar initials={currentUser.avatarInitials} avatarUrl={avatarUrl} />
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-3 flex-wrap">
              <div>
                <h2 className="font-heading text-2xl font-extrabold">{currentUser.fullName}</h2>
                <p className="text-sm font-mono text-primary mt-0.5">@{currentUser.username}</p>
                <p className="text-sm text-muted-foreground mt-0.5">{currentUser.college}</p>
              </div>
              <span className="text-[10px] font-mono bg-primary/10 text-primary px-3 py-1.5 rounded-full border border-primary/20 shrink-0">
                {currentUser.currentTrack}
              </span>
            </div>
            {currentUser.bio && (
              <p className="text-sm text-muted-foreground mt-3 max-w-xl leading-relaxed">{currentUser.bio}</p>
            )}
            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-5 pt-5 border-t border-border">
              <div className="text-center">
                <p className="font-heading text-2xl font-extrabold text-primary">{projects.length}</p>
                <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider mt-0.5">Projects</p>
              </div>
              <div className="text-center">
                <p className="font-heading text-2xl font-extrabold text-warning flex items-center justify-center gap-1">
                  <Zap size={16} className="text-warning" />{currentUser.xpPoints}
                </p>
                <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider mt-0.5">XP Earned</p>
              </div>
              <div className="text-center">
                <p className="font-heading text-2xl font-extrabold flex items-center justify-center gap-1">
                  <Flame size={16} className="text-streak" />{currentUser.streakDays}
                </p>
                <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider mt-0.5">Day Streak</p>
              </div>
              <div className="text-center">
                <p className="font-heading text-sm font-extrabold mt-1">{joined}</p>
                <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider mt-0.5">Joined</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Builder Assessment */}
      {quiz ? (
        <section className="bg-card border border-border rounded-2xl p-6 mb-5">
          <p className="text-[10px] font-mono text-muted-foreground tracking-widest uppercase mb-4">Builder Assessment</p>
          <div className="flex flex-col sm:flex-row sm:items-center gap-5">
            <div className="inline-flex items-center gap-2 border border-primary/30 bg-primary/5 text-primary px-5 py-3 rounded-xl text-sm font-mono tracking-wider shrink-0">
              ✦ {quiz.personality_type.toUpperCase()}
            </div>
            <div className="flex gap-6 text-center flex-wrap">
              {[
                { label: "Starting Level", value: quiz.level, sub: "when joined", accent: false },
                { label: "Knowledge Score", value: `${quiz.score}/100`, sub: "at assessment", accent: true },
                { label: "Current XP", value: String(currentUser.xpPoints), sub: "earned building", accent: false },
              ].map((s) => (
                <div key={s.label}>
                  <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">{s.label}</p>
                  <p className={`font-heading text-xl font-extrabold mt-1 ${s.accent ? "text-primary" : ""}`}>{s.value}</p>
                  <p className="text-[10px] text-muted-foreground">{s.sub}</p>
                </div>
              ))}
            </div>
          </div>
          {quiz.personality_description && (
            <p className="text-sm text-muted-foreground/80 italic mt-4 leading-relaxed border-l-2 border-primary/30 pl-4">
              "{quiz.personality_description}"
            </p>
          )}
        </section>
      ) : (
        <section className="bg-card border border-dashed border-border rounded-2xl p-6 mb-5 text-center">
          <p className="text-sm text-muted-foreground mb-2">Assessment not taken yet</p>
          <Link to="/quiz" className="text-xs font-mono text-primary hover:underline">Take Assessment →</Link>
        </section>
      )}

      {/* Shipped Projects */}
      <section className="mb-5">
        <p className="text-[10px] font-mono text-muted-foreground tracking-widest uppercase mb-4 flex items-center gap-2">
          <BookOpen size={11} /> Shipped Projects {projects.length > 0 && `(${projects.length})`}
        </p>
        {projectsLoading ? (
          <div className="grid sm:grid-cols-2 gap-4">
            {[1, 2].map((i) => <Sk key={i} className="h-48" />)}
          </div>
        ) : projects.length === 0 ? (
          <div className="bg-card border border-border rounded-2xl p-8 text-center">
            <p className="text-sm text-muted-foreground mb-1">Your portfolio is empty — for now.</p>
            <Link to="/dashboard/track" className="text-xs font-mono text-primary hover:underline">
              Start your first project →
            </Link>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 gap-4">
            {projects.map((p) => (
              <div key={p.id} className="bg-card border border-border rounded-2xl overflow-hidden group hover:border-muted-foreground/30 transition-colors">
                <div
                  className="h-24 flex items-center justify-center"
                  style={{ background: `linear-gradient(135deg, ${p.gradient_from}, ${p.gradient_to})` }}
                >
                  <span className="text-4xl group-hover:scale-110 transition-transform duration-300">{p.emoji}</span>
                </div>
                <div className="p-4 space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-heading text-sm font-bold leading-snug">{p.title}</h3>
                    {(p as any).project_url && (
                      <a
                        href={(p as any).project_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="shrink-0 text-muted-foreground hover:text-primary transition-colors"
                        title="View project"
                      >
                        <ExternalLink size={13} />
                      </a>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">{p.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {p.tags.map((tag) => (
                      <span key={tag} className="text-[9px] font-mono bg-surface2 text-muted-foreground px-2 py-0.5 rounded">{tag}</span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between text-[10px] font-mono text-muted-foreground pt-1">
                    <span className="flex items-center gap-1">
                      <Heart size={10} className="text-destructive" /> {p.like_count}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar size={10} />
                      {new Date(p.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Activity Timeline */}
      <section className="mb-5">
        <p className="text-[10px] font-mono text-muted-foreground tracking-widest uppercase mb-4">Activity</p>
        <div className="relative pl-6">
          <div className="absolute left-[7px] top-2 bottom-2 w-px bg-border" />
          {projects.slice(0, 5).map((p) => (
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
              <span className="text-sm text-foreground">Joined JustBuild 🎉</span>
              <span className="text-[10px] font-mono text-muted-foreground">{joined}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Export CTA */}
      <div className="mt-8 border-t border-border pt-6 flex items-center justify-between flex-wrap gap-4">
        <div>
          <p className="text-sm font-medium">Ready to share your portfolio?</p>
          <p className="text-xs text-muted-foreground mt-0.5">Export as PDF or share your public link.</p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            to={`/profile/${currentUser.username}`}
            className="inline-flex items-center gap-1.5 border border-border px-4 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:border-muted-foreground/40 transition-colors font-mono"
          >
            <Globe size={14} /> Public Link
          </Link>
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-1.5 bg-primary text-primary-foreground px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors"
          >
            <Download size={15} /> Export PDF
          </button>
        </div>
      </div>
    </div>
  );
}