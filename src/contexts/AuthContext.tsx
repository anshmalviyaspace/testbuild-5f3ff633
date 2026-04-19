import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import { Session, User as SupabaseUser } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

export interface User {
  id: string;
  fullName: string;
  username: string;
  college: string;
  currentTrack: string;
  xpPoints: number;
  streakDays: number;
  avatarInitials: string;
  bio?: string;
  email?: string;
  planType: "free" | "pro";
}
export interface SignupData { fullName: string; college: string; email: string; password: string; }

interface AuthContextType {
  currentUser: User | null; session: Session | null; signupData: SignupData | null;
  isAuthenticated: boolean; isLoading: boolean; isPro: boolean;
  setSignupData: (d: SignupData) => void;
  logout: () => Promise<void>; refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function rowToUser(row: any, email?: string): User {
  return {
    id: row.id, fullName: row.full_name ?? "", username: row.username ?? "",
    college: row.college ?? "", currentTrack: row.current_track ?? "AI & Machine Learning",
    xpPoints: row.xp_points ?? 0, streakDays: row.streak_days ?? 0,
    avatarInitials: row.avatar_initials ?? "BU", bio: row.bio ?? undefined,
    email: row.email ?? email, planType: row.plan_type === "pro" ? "pro" : "free",
  };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [signupData, setSignupDataState] = useState<SignupData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const loadProfile = useCallback(async (u: SupabaseUser) => {
    try {
      const { data, error } = await supabase.from("profiles").select("*").eq("id", u.id).single();
      if (error || !data) { console.warn("Profile not found:", u.id); setCurrentUser(null); return; }
      setCurrentUser(rowToUser(data, u.email));
    } catch { setCurrentUser(null); }
  }, []);

  const refreshProfile = useCallback(async () => {
    const { data: { session: s } } = await supabase.auth.getSession();
    if (s?.user) await loadProfile(s.user);
  }, [loadProfile]);

  useEffect(() => {
    let mounted = true;
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_e, ns) => {
      if (!mounted) return;
      setSession(ns);
      if (ns?.user) {
        // setTimeout(0) prevents Supabase internal deadlock
        setTimeout(async () => {
          if (!mounted) return;
          await loadProfile(ns.user);
          if (mounted) setIsLoading(false);
        }, 0);
      } else {
        setCurrentUser(null);
        if (mounted) setIsLoading(false);
      }
    });
    // Get initial session (handles page refresh with existing auth)
    supabase.auth.getSession().then(async ({ data: { session: es } }) => {
      if (!mounted) return;
      setSession(es);
      if (es?.user) await loadProfile(es.user);
      if (mounted) setIsLoading(false);
    });
    return () => { mounted = false; subscription.unsubscribe(); };
  }, [loadProfile]);

  return (
    <AuthContext.Provider value={{
      currentUser, session, signupData,
      isAuthenticated: !!currentUser, isLoading,
      isPro: currentUser?.planType === "pro",
      setSignupData: (d) => setSignupDataState(d),
      logout: async () => { await supabase.auth.signOut(); setCurrentUser(null); setSession(null); },
      refreshProfile,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}