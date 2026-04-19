import { useState } from "react";
import { Search, Plus, Loader2 } from "lucide-react";
import clsx from "clsx";
import {
  useCommunityProjects, useToggleLike, useLeaderboard,
  useCommunityRealtime, type CommunityProjectRow,
} from "@/hooks/useCommunity";
import CommunityProjectCard from "@/components/community/CommunityProjectCard";
import CommunityProjectModal from "@/components/community/CommunityProjectModal";
import Leaderboard from "@/components/community/Leaderboard";
import SubmitProjectModal from "@/components/community/SubmitProjectModal";

const filters = ["All", "AI & ML", "UI/UX", "Full Stack", "Startup"];

export default function CommunityView() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selected, setSelected] = useState<CommunityProjectRow | null>(null);
  const [activeTab, setActiveTab] = useState<"latest" | "leaderboard">("latest");
  const [visibleCount, setVisibleCount] = useState(9);
  const [showSubmit, setShowSubmit] = useState(false);

  // Live Supabase realtime — auto-refreshes when anyone posts, likes, or comments
  useCommunityRealtime();

  const { data: projects = [], isLoading } = useCommunityProjects(activeFilter, searchQuery);
  const { data: leaderboard = [], isLoading: lbLoading } = useLeaderboard();
  const toggleLike = useToggleLike();

  const visible = projects.slice(0, visibleCount);
  const hasMore = visibleCount < projects.length;

  const handleLike = (p: CommunityProjectRow) => toggleLike.mutate({ projectId: p.id, liked: p.user_liked });

  return (
    <div className="p-4 sm:p-8 animate-fade-in opacity-0">
      <div className="flex items-center justify-between mb-1">
        <h1 className="font-heading text-xl sm:text-2xl font-extrabold">Builders Shipping 🚀</h1>
        <button
          onClick={() => setShowSubmit(true)}
          className="inline-flex items-center gap-1.5 bg-primary text-primary-foreground px-3 sm:px-4 py-2 rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors"
        >
          <Plus size={16} />
          <span className="hidden sm:inline">Ship Project</span>
          <span className="sm:hidden">Ship</span>
        </button>
      </div>
      <p className="text-sm text-muted-foreground mb-6">
        {projects.length} projects · <span className="text-primary font-mono text-xs">● live</span>
      </p>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 border-b border-border">
        {(["latest", "leaderboard"] as const).map((tab) => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className={clsx(
              "px-4 py-2.5 text-sm font-medium border-b-2 transition-colors -mb-px capitalize",
              activeTab === tab ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"
            )}
          >
            {tab === "leaderboard" ? "🏆 Leaderboard" : "Latest"}
          </button>
        ))}
      </div>

      {activeTab === "latest" ? (
        <>
          {/* Filter + search */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-6">
            <div className="flex items-center gap-1.5 flex-wrap">
              {filters.map((f) => (
                <button key={f} onClick={() => { setActiveFilter(f); setVisibleCount(9); }}
                  className={clsx(
                    "text-xs font-mono px-3 py-1.5 rounded-full transition-all",
                    activeFilter === f ? "bg-primary text-primary-foreground" : "bg-surface2 text-muted-foreground hover:text-foreground"
                  )}
                >
                  {f}
                </button>
              ))}
            </div>
            <div className="relative sm:ml-auto">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input type="text" value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setVisibleCount(9); }}
                maxLength={100} placeholder="Search projects..."
                className="w-full sm:w-56 bg-surface border border-border rounded-lg pl-9 pr-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:ring-1 focus:ring-primary transition-shadow"
              />
            </div>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-16"><Loader2 size={24} className="animate-spin text-muted-foreground" /></div>
          ) : visible.length === 0 ? (
            <div className="text-center py-16">
              <span className="text-4xl block mb-4">🔍</span>
              <p className="text-muted-foreground text-sm">No projects found. Be the first to ship!</p>
            </div>
          ) : (
            <>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {visible.map((p) => (
                  <CommunityProjectCard key={p.id} project={p} onLike={() => handleLike(p)} onClick={() => setSelected(p)} />
                ))}
              </div>
              {hasMore && (
                <div className="flex justify-center mt-8">
                  <button onClick={() => setVisibleCount((c) => c + 9)}
                    className="border border-border px-6 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:border-muted-foreground/40 transition-colors font-mono">
                    Load More
                  </button>
                </div>
              )}
            </>
          )}
        </>
      ) : (
        <Leaderboard data={leaderboard} loading={lbLoading} />
      )}

      {selected && (
        <CommunityProjectModal project={selected} onLike={() => handleLike(selected)} onClose={() => setSelected(null)} />
      )}
      {showSubmit && <SubmitProjectModal onClose={() => setShowSubmit(false)} />}
    </div>
  );
}