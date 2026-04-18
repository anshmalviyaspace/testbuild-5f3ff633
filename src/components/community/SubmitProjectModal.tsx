import { useState } from "react";
import { X, Loader2, Lock, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useSubmitProject, useCanPost, PLAN_LIMITS } from "@/hooks/useCommunity";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";

const tracks = ["AI & ML", "UI/UX", "Full Stack", "Startup"];
const emojis = ["🚀", "🤖", "🎨", "💡", "⚡", "🛠️", "📱", "🌐", "💰", "🎯", "🔥", "🧠"];

interface Props { onClose: () => void; }

export default function SubmitProjectModal({ onClose }: Props) {
  const { currentUser, isPro } = useAuth();
  const { data: canPostData, isLoading: checkingLimit } = useCanPost();
  const submit = useSubmitProject();

  const [title,       setTitle]       = useState("");
  const [description, setDescription] = useState("");
  const [tagsInput,   setTagsInput]   = useState("");
  const [track,       setTrack]       = useState(tracks[0]);
  const [emoji,       setEmoji]       = useState("🚀");

  const limit = isPro ? Infinity : PLAN_LIMITS.free.maxProjects;
  const projectCount = canPostData?.projectCount ?? 0;
  const canPost = canPostData?.canPost ?? true;

  const handleSubmit = () => {
    if (!title.trim() || !description.trim()) return;
    const tags = tagsInput.split(",").map((t) => t.trim()).filter(Boolean);
    submit.mutate(
      { title: title.trim(), description: description.trim(), tags, track, emoji },
      {
        onSuccess: () => {
          toast({ title: "Project shipped! 🚀", description: "Your project is live in the community feed." });
          onClose();
        },
        onError: (err: any) => {
          toast({ title: "Error", description: err.message || "Failed to submit.", variant: "destructive" });
        },
      }
    );
  };

  const inputClass = "w-full bg-surface border border-border rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:ring-1 focus:ring-primary";

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-[8vh] overflow-y-auto" onClick={onClose}>
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
      <div onClick={(e) => e.stopPropagation()} className="relative w-full max-w-lg bg-card border border-border rounded-xl p-6 animate-scale-in mb-8">
        <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-background/60 backdrop-blur-sm flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
          <X size={16} />
        </button>

        <h2 className="font-heading text-xl font-extrabold mb-2">Ship a Project 🚀</h2>

        {/* Plan limit indicator */}
        {!checkingLimit && (
          <div className={`mb-5 flex items-center justify-between px-4 py-2.5 rounded-lg text-sm border ${
            isPro
              ? "bg-primary/5 border-primary/20 text-primary"
              : canPost
              ? "bg-surface border-border text-muted-foreground"
              : "bg-destructive/10 border-destructive/20 text-destructive"
          }`}>
            <span className="font-mono text-xs">
              {isPro
                ? "✦ Pro — unlimited projects"
                : `Free plan: ${projectCount} / ${limit} project${limit === 1 ? "" : "s"} published`}
            </span>
            {!isPro && (
              <Link to="/dashboard/settings" onClick={onClose} className="text-[11px] font-mono text-primary hover:underline flex items-center gap-1">
                Upgrade <ArrowRight size={10} />
              </Link>
            )}
          </div>
        )}

        {/* Limit hit — show upgrade wall */}
        {!canPost && !checkingLimit ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-14 h-14 rounded-full bg-destructive/10 flex items-center justify-center mx-auto">
              <Lock size={24} className="text-destructive" />
            </div>
            <div>
              <p className="font-heading text-lg font-bold mb-1">Free plan limit reached</p>
              <p className="text-sm text-muted-foreground mb-4">
                Free builders can publish <strong>1 project</strong> to the community.<br />
                Upgrade to Pro for unlimited projects.
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <Link
                to="/dashboard/settings"
                onClick={onClose}
                className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors"
              >
                Upgrade to Pro — ₹299/mo <ArrowRight size={14} />
              </Link>
              <button onClick={onClose} className="text-sm text-muted-foreground hover:text-foreground">
                Maybe later
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <label className="text-xs font-mono text-muted-foreground mb-1.5 block">Project Title *</label>
              <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} maxLength={100} placeholder="My awesome project" className={inputClass} />
            </div>

            <div>
              <label className="text-xs font-mono text-muted-foreground mb-1.5 block">What did you build? *</label>
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} maxLength={500} rows={3}
                placeholder="What does it do? What tech did you use?"
                className={`${inputClass} resize-none`}
              />
              <p className="text-[10px] font-mono text-muted-foreground mt-1">{description.length}/500</p>
            </div>

            <div>
              <label className="text-xs font-mono text-muted-foreground mb-1.5 block">Tags <span className="text-muted-foreground/50">(comma separated)</span></label>
              <input type="text" value={tagsInput} onChange={(e) => setTagsInput(e.target.value)} maxLength={200} placeholder="React, AI, Python" className={inputClass} />
            </div>

            <div>
              <label className="text-xs font-mono text-muted-foreground mb-1.5 block">Track</label>
              <div className="flex flex-wrap gap-2">
                {tracks.map((t) => (
                  <button key={t} onClick={() => setTrack(t)}
                    className={`text-xs font-mono px-3 py-1.5 rounded-full transition-all ${track === t ? "bg-primary text-primary-foreground" : "bg-surface2 text-muted-foreground hover:text-foreground"}`}>
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-mono text-muted-foreground mb-1.5 block">Icon</label>
              <div className="flex flex-wrap gap-2">
                {emojis.map((e) => (
                  <button key={e} onClick={() => setEmoji(e)}
                    className={`w-9 h-9 rounded-lg text-lg flex items-center justify-center transition-all ${emoji === e ? "bg-primary/10 ring-1 ring-primary" : "bg-surface2 hover:bg-surface2/80"}`}>
                    {e}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleSubmit}
              disabled={!title.trim() || !description.trim() || submit.isPending}
              className="w-full bg-primary text-primary-foreground py-2.5 rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {submit.isPending ? <Loader2 size={16} className="animate-spin" /> : null}
              Ship It 🚀
            </button>
          </div>
        )}
      </div>
    </div>
  );
}