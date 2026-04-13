import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Plus, Heart, Calendar, ArrowRight, Trash2, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useKeyboardShortcuts } from "@/hooks/useKeyboardShortcuts";
import NewProjectModal from "@/components/projects/NewProjectModal";
import { useMyProjects, useSubmitProject, useDeleteProject } from "@/hooks/useCommunity";

function Skeleton({ className = "" }: { className?: string }) {
  return <div className={`bg-surface2 rounded-lg animate-pulse ${className}`} />;
}

export default function ProjectsView() {
  const { toast } = useToast();
  const location = useLocation();
  const [showModal, setShowModal] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const { data: projects = [], isLoading } = useMyProjects();
  const submitProject = useSubmitProject();
  const deleteProject = useDeleteProject();

  const briefData = location.state as { prefillTitle?: string; prefillDescription?: string; openModal?: boolean } | null;

  useEffect(() => {
    if (briefData?.prefillTitle || briefData?.openModal) setShowModal(true);
  }, [briefData]);

  useKeyboardShortcuts({ onNewProject: () => setShowModal(true), onEscape: () => setShowModal(false) });

  const handlePublish = async (project: { title: string; description: string; tags: string[]; emoji: string; url: string; track: string }) => {
    try {
      await submitProject.mutateAsync({ title: project.title, description: project.description, tags: project.tags, emoji: project.emoji, track: project.track });
      setShowModal(false);
      toast({ title: "Project shipped! 🚀", description: "It's live on the community feed." });
    } catch (err: any) {
      toast({ title: "Failed to ship", description: err.message, variant: "destructive" });
    }
  };

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      await deleteProject.mutateAsync(id);
      toast({ title: "Project deleted" });
    } catch (err: any) {
      toast({ title: "Failed to delete", description: err.message, variant: "destructive" });
    } finally {
      setDeletingId(null);
    }
  };

  if (isLoading) {
    return (
      <div className="p-6 sm:p-8 animate-fade-in opacity-0">
        <div className="flex items-center justify-between mb-8">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-10 w-44" />
        </div>
        <div className="grid sm:grid-cols-2 gap-5">
          {[1, 2].map((i) => (
            <div key={i} className="bg-card border border-border rounded-xl overflow-hidden">
              <Skeleton className="h-32 rounded-none" />
              <div className="p-5 space-y-3">
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center p-8 animate-fade-in opacity-0">
        <div className="text-center max-w-sm">
          <span className="text-6xl block mb-6">🚀</span>
          <h2 className="font-heading text-xl font-bold mb-2">Nothing shipped yet.</h2>
          <p className="text-sm text-muted-foreground mb-6">Your first project brief is waiting in your track.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link to="/dashboard/track" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors">
              Go to My Track <ArrowRight size={14} />
            </Link>
            <button onClick={() => setShowModal(true)} className="inline-flex items-center gap-2 border border-border px-6 py-3 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:border-muted-foreground/40 transition-colors">
              <Plus size={14} /> Ship Manually
            </button>
          </div>
        </div>
        {showModal && <NewProjectModal onClose={() => setShowModal(false)} onPublish={handlePublish} prefillTitle={briefData?.prefillTitle} prefillDescription={briefData?.prefillDescription} />}
      </div>
    );
  }

  return (
    <div className="p-6 sm:p-8 animate-fade-in opacity-0">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <h1 className="font-heading text-2xl font-extrabold">My Projects</h1>
          <span className="text-[10px] font-mono bg-primary/10 text-primary px-2.5 py-1 rounded-full">{projects.length} shipped</span>
        </div>
        <button onClick={() => setShowModal(true)} className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors">
          <Plus size={16} /> Ship a New Project
        </button>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        {projects.map((p) => (
          <div key={p.id} className="bg-card border border-border rounded-xl overflow-hidden card-hover-glow group">
            <div className="h-32 flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${p.gradient_from}, ${p.gradient_to})` }}>
              <span className="text-5xl group-hover:scale-110 transition-transform duration-300">{p.emoji}</span>
            </div>
            <div className="p-5 space-y-3">
              <h3 className="font-heading text-base font-bold">{p.title}</h3>
              <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">{p.description}</p>
              <div className="flex flex-wrap items-center gap-1.5">
                {p.tags.map((tag) => <span key={tag} className="text-[10px] font-mono bg-surface2 text-muted-foreground px-2 py-0.5 rounded">{tag}</span>)}
              </div>
              <div className="flex items-center gap-4 text-xs font-mono text-muted-foreground pt-1">
                <span className="flex items-center gap-1"><Heart size={11} className="text-destructive" /> {p.like_count}</span>
                <span className="flex items-center gap-1"><Calendar size={11} /> {new Date(p.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
                <span className="text-[10px] font-mono bg-surface2 px-2 py-0.5 rounded">{p.track}</span>
              </div>
              <div className="flex items-center gap-3 pt-2">
                <Link to="/dashboard/community" className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors font-mono">
                  View in Community <ArrowRight size={11} />
                </Link>
                <button onClick={() => handleDelete(p.id)} disabled={deletingId === p.id}
                  className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-destructive transition-colors font-mono ml-auto disabled:opacity-40">
                  {deletingId === p.id ? <Loader2 size={11} className="animate-spin" /> : <Trash2 size={11} />} Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showModal && <NewProjectModal onClose={() => setShowModal(false)} onPublish={handlePublish} prefillTitle={briefData?.prefillTitle} prefillDescription={briefData?.prefillDescription} />}
    </div>
  );
}