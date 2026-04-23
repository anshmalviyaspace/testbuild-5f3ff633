// CommunityView.tsx
// Early-access mode: shows the Leaderboard only (no project feed, no submit button).
// All hook logic and imports preserved — just render output is scoped.
// To restore full community feed: uncomment the original render at the bottom.

import { useState } from "react";
import {
  useCommunityProjects, useToggleLike, useLeaderboard,
  useCommunityRealtime, type CommunityProjectRow,
} from "@/hooks/useCommunity";
import CommunityProjectCard from "@/components/community/CommunityProjectCard";
import CommunityProjectModal from "@/components/community/CommunityProjectModal";
import Leaderboard from "@/components/community/Leaderboard";
import SubmitProjectModal from "@/components/community/SubmitProjectModal";

export default function CommunityView() {
  // All state + hooks preserved for when full community goes live
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selected, setSelected] = useState<CommunityProjectRow | null>(null);
  const [visibleCount, setVisibleCount] = useState(9);
  const [showSubmit, setShowSubmit] = useState(false);

  // Realtime still active so leaderboard updates live
  useCommunityRealtime();

  const { data: projects = [], isLoading } = useCommunityProjects(activeFilter, searchQuery);
  const { data: leaderboard = [], isLoading: lbLoading } = useLeaderboard();
  const toggleLike = useToggleLike();
  const handleLike = (p: CommunityProjectRow) =>
    toggleLike.mutate({ projectId: p.id, liked: p.user_liked });

  // EARLY-ACCESS RENDER — Leaderboard only
  return (
    <div className="p-4 sm:p-8 animate-fade-in opacity-0">

      {/* Header */}
      <div className="flex items-center justify-between mb-1">
        <h1 className="font-heading text-xl sm:text-2xl font-extrabold">
          Builder Leaderboard 🏆
        </h1>
        <div className="inline-flex items-center gap-1.5 border border-primary/30 bg-primary/5 text-primary px-3 py-1.5 rounded-full text-[10px] font-mono tracking-wider shrink-0">
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          LIVE
        </div>
      </div>
      <p className="text-sm text-muted-foreground mb-8">
        Early builders on JustBuild — ranked by XP. Full community feed coming soon.
      </p>

      {/* Full-width Leaderboard */}
      <Leaderboard data={leaderboard} loading={lbLoading} />

      {/* Coming soon strip */}
      <div className="mt-10 bg-card border border-border rounded-xl p-5 flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="flex-1">
          <p className="text-sm font-semibold mb-0.5">Community Feed — Coming Soon</p>
          <p className="text-xs text-muted-foreground">
            Ship projects, get peer reviews, browse what others are building.
          </p>
        </div>
        <div className="inline-flex items-center gap-1.5 border border-primary/20 bg-primary/5 text-primary px-4 py-2 rounded-lg text-xs font-mono shrink-0">
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          In development
        </div>
      </div>

    </div>
  );
}
