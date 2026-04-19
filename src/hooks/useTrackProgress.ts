import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export interface TrackProgressRow {
  id: string; user_id: string; track: string;
  completed_modules: string[]; checked_resources: string[]; active_module_id: number;
}

export function useTrackProgress(track: string) {
  const { currentUser } = useAuth();
  return useQuery({
    queryKey: ["track-progress", currentUser?.id, track],
    enabled: !!currentUser && !!track,
    staleTime: 0,
    queryFn: async (): Promise<TrackProgressRow | null> => {
      if (!currentUser) return null;
      const { data, error } = await supabase.from("user_track_progress").select("*")
        .eq("user_id", currentUser.id).eq("track", track).maybeSingle();
      if (error) throw error;
      return data as TrackProgressRow | null;
    },
  });
}

export function useToggleResource() {
  const qc = useQueryClient();
  const { currentUser } = useAuth();
  return useMutation({
    mutationFn: async ({ track, resourceId, currentChecked }: { track: string; resourceId: string; currentChecked: string[] }) => {
      if (!currentUser) throw new Error("Not authenticated");
      const next = currentChecked.includes(resourceId)
        ? currentChecked.filter((r) => r !== resourceId)
        : [...currentChecked, resourceId];
      const { error } = await supabase.from("user_track_progress").upsert(
        { user_id: currentUser.id, track, checked_resources: next },
        { onConflict: "user_id,track" }
      );
      if (error) throw error;
      return next;
    },
    onSuccess: (_d, v) => qc.invalidateQueries({ queryKey: ["track-progress", currentUser?.id, v.track] }),
  });
}

export function useCompleteModule() {
  const qc = useQueryClient();
  const { currentUser, refreshProfile } = useAuth();
  return useMutation({
    mutationFn: async ({ track, moduleId, nextModuleId, xpEarned, currentCompleted, currentXp }:
      { track: string; moduleId: number; nextModuleId: number | null; xpEarned: number; currentCompleted: string[]; currentXp: number }
    ) => {
      if (!currentUser) throw new Error("Not authenticated");
      const newCompleted = currentCompleted.includes(String(moduleId))
        ? currentCompleted : [...currentCompleted, String(moduleId)];

      // 1. Save progress
      const { error: pe } = await supabase.from("user_track_progress").upsert(
        { user_id: currentUser.id, track, completed_modules: newCompleted, active_module_id: nextModuleId ?? moduleId },
        { onConflict: "user_id,track" }
      );
      if (pe) throw pe;

      // 2. Update XP
      const { error: xe } = await supabase.from("profiles").update({ xp_points: currentXp + xpEarned }).eq("id", currentUser.id);
      if (xe) throw xe;

      // 3. Streak logic: increment if last_active was yesterday, reset if older, skip if today
      const today = new Date().toISOString().split("T")[0];
      const yesterday = new Date(Date.now() - 86_400_000).toISOString().split("T")[0];
      const { data: prof } = await supabase.from("profiles").select("last_active_date, streak_days").eq("id", currentUser.id).single();
      if (prof && prof.last_active_date !== today) {
        const newStreak = !prof.last_active_date || prof.last_active_date < yesterday ? 1
          : prof.last_active_date === yesterday ? (prof.streak_days ?? 0) + 1
          : prof.streak_days ?? 0;
        await supabase.from("profiles").update({ last_active_date: today, streak_days: newStreak }).eq("id", currentUser.id);
      }
      return { newCompleted, newXp: currentXp + xpEarned };
    },
    onSuccess: async (_d, v) => {
      qc.invalidateQueries({ queryKey: ["track-progress", currentUser?.id, v.track] });
      qc.invalidateQueries({ queryKey: ["leaderboard"] });
      await refreshProfile();
    },
  });
}

export function useSaveActiveModule() {
  const qc = useQueryClient();
  const { currentUser } = useAuth();
  return useMutation({
    mutationFn: async ({ track, moduleId }: { track: string; moduleId: number }) => {
      if (!currentUser) return;
      await supabase.from("user_track_progress").upsert(
        { user_id: currentUser.id, track, active_module_id: moduleId },
        { onConflict: "user_id,track" }
      );
    },
    onSuccess: (_d, v) => qc.invalidateQueries({ queryKey: ["track-progress", currentUser?.id, v.track] }),
  });
}