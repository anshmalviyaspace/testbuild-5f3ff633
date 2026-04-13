import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

export default function ProtectedRoute() {
  const { isAuthenticated, isLoading, session } = useAuth();

  // Still initializing — Supabase restoring session from storage
  if (isLoading) return <Spinner />;

  // Session exists but profile row hasn't loaded yet (brief window after signup/login)
  // Keep spinning — do NOT redirect to /login here or the user gets kicked out
  if (session && !isAuthenticated) return <Spinner />;

  // No session at all
  if (!isAuthenticated) return <Navigate to="/login" replace />;

  return <Outlet />;
}

function Spinner() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4">
        <span className="font-heading text-xl font-extrabold tracking-tight">
          Just<span className="text-primary">Build</span>
        </span>
        <div className="w-5 h-5 rounded-full border-2 border-primary border-t-transparent animate-spin" />
      </div>
    </div>
  );
}