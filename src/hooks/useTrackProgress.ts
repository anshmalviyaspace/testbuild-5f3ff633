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
      const { data, error } = await supabase
        .from("user_track_progress").select("*")
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
    onSuccess: (_d, vars) => qc.invalidateQueries({ queryKey: ["track-progress", currentUser?.id, vars.track] }),
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

      // Upsert track progress
      const { error: pe } = await supabase.from("user_track_progress").upsert(
        { user_id: currentUser.id, track, completed_modules: newCompleted, active_module_id: nextModuleId ?? moduleId },
        { onConflict: "user_id,track" }
      );
      if (pe) throw pe;

      // Update XP
      const newXp = currentXp + xpEarned;
      const { error: xe } = await supabase.from("profiles").update({ xp_points: newXp }).eq("id", currentUser.id);
      if (xe) throw xe;

      // Streak: if last_active_date was yesterday, increment; if today, skip; if older, reset to 1
      const today = new Date().toISOString().split("T")[0];
      const { data: prof } = await supabase.from("profiles").select("last_active_date, streak_days").eq("id", currentUser.id).single();
      if (prof) {
        const last = prof.last_active_date;
        const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];
        let newStreak = prof.streak_days ?? 0;
        if (!last || last < yesterday) newStreak = 1; // reset or start
        else if (last === yesterday) newStreak = newStreak + 1; // extend
        // if last === today, don't change streak
        if (last !== today) {
          await supabase.from("profiles").update({ last_active_date: today, streak_days: newStreak }).eq("id", currentUser.id);
        }
      }

      return { newCompleted, newXp };
    },
    onSuccess: async (_d, vars) => {
      qc.invalidateQueries({ queryKey: ["track-progress", currentUser?.id, vars.track] });
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
    onSuccess: (_d, vars) => qc.invalidateQueries({ queryKey: ["track-progress", currentUser?.id, vars.track] }),
  });
}