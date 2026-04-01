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
}

export interface SignupData {
  fullName: string;
  college: string;
  email: string;
  password: string;
}

interface AuthContextType {
  currentUser: User | null;
  session: Session | null;
  signupData: SignupData | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setSignupData: (data: SignupData) => void;
  logout: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function rowToUser(row: any, email?: string): User {
  return {
    id: row.id,
    fullName: row.full_name ?? "",
    username: row.username ?? "",
    college: row.college ?? "",
    currentTrack: row.current_track ?? "AI & Machine Learning",
    xpPoints: row.xp_points ?? 0,
    streakDays: row.streak_days ?? 0,
    avatarInitials: row.avatar_initials ?? "BU",
    bio: row.bio ?? undefined,
    email: row.email ?? email,
  };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [signupData, setSignupDataState] = useState<SignupData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const loadProfile = useCallback(async (supabaseUser: SupabaseUser) => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", supabaseUser.id)
        .single();

      if (error || !data) {
        console.warn("Profile not found for user:", supabaseUser.id, error?.message);
        setCurrentUser(null);
        return;
      }

      setCurrentUser(rowToUser(data, supabaseUser.email));
    } catch (err) {
      console.error("Error loading profile:", err);
      setCurrentUser(null);
    }
  }, []);

  const refreshProfile = useCallback(async () => {
    const { data: { session: currentSession } } = await supabase.auth.getSession();
    if (currentSession?.user) {
      await loadProfile(currentSession.user);
    }
  }, [loadProfile]);

  useEffect(() => {
    let mounted = true;

    // 1. Set up the auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, newSession) => {
        if (!mounted) return;

        setSession(newSession);

        if (newSession?.user) {
          // Use setTimeout to avoid Supabase deadlock on simultaneous calls
          setTimeout(async () => {
            if (!mounted) return;
            await loadProfile(newSession.user);
            if (mounted) setIsLoading(false);
          }, 0);
        } else {
          setCurrentUser(null);
          setIsLoading(false);
        }
      }
    );

    // 2. Get the initial session
    supabase.auth.getSession().then(async ({ data: { session: existingSession } }) => {
      if (!mounted) return;

      setSession(existingSession);
      if (existingSession?.user) {
        await loadProfile(existingSession.user);
      }
      if (mounted) setIsLoading(false);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [loadProfile]);

  const setSignupData = (data: SignupData) => setSignupDataState(data);

  const logout = async () => {
    await supabase.auth.signOut();
    setCurrentUser(null);
    setSession(null);
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        session,
        signupData,
        isAuthenticated: !!session,
        isLoading,
        setSignupData,
        logout,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
