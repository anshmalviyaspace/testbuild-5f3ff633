import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

// ── Plan limits ────────────────────────────────────────────────────────────
export const PLAN_LIMITS = {
  free: { maxProjects: 1 },
  pro:  { maxProjects: Infinity },
};

// ── Types ──────────────────────────────────────────────────────────────────
export interface CommunityProjectRow {
  id: string; user_id: string; title: string; description: string;
  tags: string[]; track: string; emoji: string;
  gradient_from: string; gradient_to: string; created_at: string;
  author_name?: string; author_username?: string;
  author_college?: string; author_initials?: string;
  like_count: number; user_liked: boolean;
}

export interface CommentRow {
  id: string; user_id: string; project_id: string;
  content: string; created_at: string;
  author_name?: string; author_username?: string; author_initials?: string;
}

export interface LeaderboardRow {
  id: string; username: string; full_name: string;
  avatar_initials: string; college: string;
  xp_points: number; current_track: string; project_count: number;
  plan_type?: string;
}

// ── Profile map helper ─────────────────────────────────────────────────────
async function fetchProfileMap(userIds: string[]) {
  if (!userIds.length) return new Map<string, any>();
  const { data, error } = await supabase
    .from("profiles")
    .select("id, full_name, username, college, avatar_initials, plan_type")
    .in("id", userIds);
  if (!error && data?.length) return new Map(data.map((p) => [p.id, p]));
  // Fallback to public view
  const { data: pub } = await supabase
    .from("public_profiles")
    .select("id, username, avatar_initials")
    .in("id", userIds);
  return new Map((pub || []).map((p) => [p.id, { ...p, full_name: p.username, college: "" }]));
}

// ── Real-time hook: subscribe to community changes ─────────────────────────
export function useCommunityRealtime() {
  const qc = useQueryClient();
  useEffect(() => {
    const channel = supabase
      .channel("community-realtime")
      .on("postgres_changes",
        { event: "*", schema: "public", table: "community_projects" },
        () => qc.invalidateQueries({ queryKey: ["community-projects"] })
      )
      .on("postgres_changes",
        { event: "*", schema: "public", table: "project_likes" },
        () => {
          qc.invalidateQueries({ queryKey: ["community-projects"] });
          qc.invalidateQueries({ queryKey: ["my-projects"] });
        }
      )
      .on("postgres_changes",
        { event: "INSERT", schema: "public", table: "project_comments" },
        (payload: any) => {
          qc.invalidateQueries({ queryKey: ["project-comments", payload.new?.project_id] });
        }
      )
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [qc]);
}

// ── Community projects ─────────────────────────────────────────────────────
export function useCommunityProjects(filter?: string, search?: string) {
  const { currentUser } = useAuth();
  return useQuery({
    queryKey: ["community-projects", filter, search],
    staleTime: 10_000,
    queryFn: async () => {
      let q = supabase.from("community_projects").select("*").order("created_at", { ascending: false });
      if (filter && filter !== "All") q = q.eq("track", filter);
      if (search?.trim()) q = q.ilike("title", `%${search.trim()}%`);
      const { data: projects, error } = await q;
      if (error) throw error;
      if (!projects?.length) return [];

      const userIds = [...new Set(projects.map((p) => p.user_id))];
      const profileMap = await fetchProfileMap(userIds);

      const projectIds = projects.map((p) => p.id);
      const { data: likes } = await supabase.from("project_likes").select("project_id").in("project_id", projectIds);
      const likeCounts = new Map<string, number>();
      (likes || []).forEach((l) => likeCounts.set(l.project_id, (likeCounts.get(l.project_id) || 0) + 1));

      let userLikes = new Set<string>();
      if (currentUser) {
        const { data: myLikes } = await supabase.from("project_likes").select("project_id")
          .eq("user_id", currentUser.id).in("project_id", projectIds);
        userLikes = new Set((myLikes || []).map((l) => l.project_id));
      }

      return projects.map((p) => {
        const prof = profileMap.get(p.user_id);
        return {
          ...p,
          author_name:     prof?.full_name     || prof?.username || "Builder",
          author_username: prof?.username       || "",
          author_college:  prof?.college        || "",
          author_initials: prof?.avatar_initials || "??",
          like_count:      likeCounts.get(p.id) || 0,
          user_liked:      userLikes.has(p.id),
        } as CommunityProjectRow;
      });
    },
  });
}

// ── Toggle like ────────────────────────────────────────────────────────────
export function useToggleLike() {
  const qc = useQueryClient();
  const { currentUser } = useAuth();
  return useMutation({
    mutationFn: async ({ projectId, liked }: { projectId: string; liked: boolean }) => {
      if (!currentUser) throw new Error("Not authenticated");
      if (liked) {
        await supabase.from("project_likes").delete().eq("user_id", currentUser.id).eq("project_id", projectId);
      } else {
        await supabase.from("project_likes").insert({ user_id: currentUser.id, project_id: projectId });
      }
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["community-projects"] });
      qc.invalidateQueries({ queryKey: ["my-projects"] });
    },
  });
}

// ── Comments ───────────────────────────────────────────────────────────────
export function useProjectComments(projectId: string | null) {
  return useQuery({
    queryKey: ["project-comments", projectId],
    enabled: !!projectId,
    staleTime: 5_000,
    queryFn: async () => {
      if (!projectId) return [];
      const { data: comments, error } = await supabase
        .from("project_comments").select("*").eq("project_id", projectId)
        .order("created_at", { ascending: true });
      if (error) throw error;
      if (!comments?.length) return [];
      const userIds = [...new Set(comments.map((c) => c.user_id))];
      const profileMap = await fetchProfileMap(userIds);
      return comments.map((c) => {
        const prof = profileMap.get(c.user_id);
        return { ...c, author_name: prof?.full_name || prof?.username || "Builder", author_username: prof?.username || "", author_initials: prof?.avatar_initials || "??" } as CommentRow;
      });
    },
  });
}

export function useAddComment() {
  const qc = useQueryClient();
  const { currentUser } = useAuth();
  return useMutation({
    mutationFn: async ({ projectId, content }: { projectId: string; content: string }) => {
      if (!currentUser) throw new Error("Not authenticated");
      const { error } = await supabase.from("project_comments").insert({ user_id: currentUser.id, project_id: projectId, content });
      if (error) throw error;
    },
    onSuccess: (_d, vars) => qc.invalidateQueries({ queryKey: ["project-comments", vars.projectId] }),
  });
}

// ── Leaderboard ────────────────────────────────────────────────────────────
export function useLeaderboard() {
  return useQuery({
    queryKey: ["leaderboard"],
    staleTime: 20_000,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("leaderboard_view").select("*")
        .order("xp_points", { ascending: false }).limit(50);
      if (!error && data?.length) {
        return data.map((r) => ({
          ...r, xp_points: r.xp_points ?? 0, project_count: r.project_count ?? 0,
          full_name: r.full_name || r.username || "Builder", avatar_initials: r.avatar_initials || "??",
          college: r.college || "",
        })) as LeaderboardRow[];
      }
      // Fallback manual build
      const { data: profs } = await supabase
        .from("profiles").select("id,username,full_name,avatar_initials,college,xp_points,current_track,plan_type")
        .order("xp_points", { ascending: false }).limit(50);
      if (!profs?.length) return [];
      const { data: projRows } = await supabase.from("community_projects").select("user_id").in("user_id", profs.map((p) => p.id));
      const counts = new Map<string, number>();
      (projRows || []).forEach((r) => counts.set(r.user_id, (counts.get(r.user_id) || 0) + 1));
      return profs.map((p) => ({
        id: p.id, username: p.username || "", full_name: p.full_name || p.username || "Builder",
        avatar_initials: p.avatar_initials || "??", college: p.college || "",
        xp_points: p.xp_points ?? 0, current_track: p.current_track || "",
        project_count: counts.get(p.id) ?? 0, plan_type: p.plan_type,
      })) as LeaderboardRow[];
    },
  });
}

// ── My projects ────────────────────────────────────────────────────────────
export function useMyProjects() {
  const { currentUser } = useAuth();
  return useQuery({
    queryKey: ["my-projects", currentUser?.id],
    enabled: !!currentUser,
    staleTime: 15_000,
    queryFn: async () => {
      if (!currentUser) return [];
      const { data: projects, error } = await supabase
        .from("community_projects").select("*").eq("user_id", currentUser.id).order("created_at", { ascending: false });
      if (error) throw error;
      if (!projects?.length) return [];
      const projectIds = projects.map((p) => p.id);
      const { data: likes } = await supabase.from("project_likes").select("project_id").in("project_id", projectIds);
      const likeCounts = new Map<string, number>();
      (likes || []).forEach((l) => likeCounts.set(l.project_id, (likeCounts.get(l.project_id) || 0) + 1));
      return projects.map((p) => ({
        ...p, author_name: currentUser.fullName, author_username: currentUser.username,
        author_college: currentUser.college, author_initials: currentUser.avatarInitials,
        like_count: likeCounts.get(p.id) || 0, user_liked: false,
      })) as CommunityProjectRow[];
    },
  });
}

// ── Check if user can post (plan limit) ───────────────────────────────────
export function useCanPost() {
  const { currentUser, isPro } = useAuth();
  return useQuery({
    queryKey: ["can-post", currentUser?.id],
    enabled: !!currentUser,
    staleTime: 30_000,
    queryFn: async () => {
      if (!currentUser) return { canPost: false, projectCount: 0, limit: 0 };
      if (isPro) return { canPost: true, projectCount: 0, limit: Infinity };
      const { count } = await supabase
        .from("community_projects").select("*", { count: "exact", head: true })
        .eq("user_id", currentUser.id);
      const projectCount = count ?? 0;
      const limit = PLAN_LIMITS[currentUser.planType ?? "free"].maxProjects;
      return { canPost: projectCount < limit, projectCount, limit };
    },
  });
}

// ── Delete project ─────────────────────────────────────────────────────────
export function useDeleteProject() {
  const qc = useQueryClient();
  const { currentUser } = useAuth();
  return useMutation({
    mutationFn: async (projectId: string) => {
      if (!currentUser) throw new Error("Not authenticated");
      const { error } = await supabase.from("community_projects").delete()
        .eq("id", projectId).eq("user_id", currentUser.id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["my-projects"] });
      qc.invalidateQueries({ queryKey: ["community-projects"] });
      qc.invalidateQueries({ queryKey: ["leaderboard"] });
      qc.invalidateQueries({ queryKey: ["can-post"] });
    },
  });
}

// ── Submit project ─────────────────────────────────────────────────────────
export function useSubmitProject() {
  const qc = useQueryClient();
  const { currentUser } = useAuth();
  return useMutation({
    mutationFn: async (project: { title: string; description: string; tags: string[]; track: string; emoji: string }) => {
      if (!currentUser) throw new Error("Not authenticated");
      const gradients = [
        { f: "hsl(160 100% 45% / 0.25)", t: "hsl(220 100% 50% / 0.15)" },
        { f: "hsl(280 80% 60% / 0.25)",  t: "hsl(346 100% 62% / 0.15)" },
        { f: "hsl(220 100% 50% / 0.25)", t: "hsl(160 100% 45% / 0.15)" },
        { f: "hsl(45 100% 60% / 0.25)",  t: "hsl(25 95% 55% / 0.15)"  },
      ];
      const g = gradients[Math.floor(Math.random() * gradients.length)];
      const { error } = await supabase.from("community_projects").insert({
        user_id: currentUser.id, ...project, gradient_from: g.f, gradient_to: g.t,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["community-projects"] });
      qc.invalidateQueries({ queryKey: ["my-projects"] });
      qc.invalidateQueries({ queryKey: ["leaderboard"] });
      qc.invalidateQueries({ queryKey: ["can-post"] });
    },
  });
}