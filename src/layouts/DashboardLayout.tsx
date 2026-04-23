import { Outlet, NavLink, Link, useNavigate } from "react-router-dom";
import { Home, Target, FolderKanban, Users, TrendingUp, Settings, Globe, LogOut, Menu, X, Wrench } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useState, useCallback, useEffect } from "react";
import { useKeyboardShortcuts } from "@/hooks/useKeyboardShortcuts";
import clsx from "clsx";

const navItems = [
  { to: "/dashboard/home",      label: "Home",      icon: Home },
  { to: "/dashboard/track",     label: "My Track",  icon: Target },
  { to: "/dashboard/projects",  label: "Projects",  icon: FolderKanban },
  { to: "/dashboard/community", label: "Community", icon: Users },
  { to: "/dashboard/tools",     label: "AI Tools",  icon: Wrench },
  { to: "/dashboard/portfolio", label: "Portfolio", icon: TrendingUp },
  { to: "/dashboard/settings",  label: "Settings",  icon: Settings },
];

const bottomTabs = [navItems[0], navItems[1], navItems[2], navItems[3], navItems[6]]; // Home, Track, Projects, Community, Settings

function UserAvatar({ initials, avatarUrl, size = 10 }: { initials: string; avatarUrl?: string; size?: number }) {
  const dim = `w-${size} h-${size}`;
  const textSize = size <= 8 ? "text-xs" : "text-sm";
  return (
    <div className={`${dim} rounded-full overflow-hidden flex items-center justify-center shrink-0 font-mono font-semibold text-primary-foreground`}
      style={{ background: "linear-gradient(135deg, hsl(160 100% 45%), hsl(220 100% 50%))" }}>
      {avatarUrl
        ? <img src={avatarUrl} alt={initials} className="w-full h-full object-cover" />
        : <span className={textSize}>{initials}</span>}
    </div>
  );
}

export default function DashboardLayout() {
  const { currentUser, logout, isPro } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [quizResult, setQuizResult] = useState<{ personality_type: string } | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("justbuild_quiz_results");
    if (stored) {
      try { setQuizResult({ personality_type: JSON.parse(stored).personality_type }); } catch {}
    }
  }, []);

  const handleLogout = async () => { await logout(); navigate("/"); };
  const handleNewProject = useCallback(() => navigate("/dashboard/projects", { state: { openModal: true } }), [navigate]);
  useKeyboardShortcuts({ onNewProject: handleNewProject });

  const avatarUrl = (currentUser as any)?.avatarUrl;

  const sidebarContent = (
    <>
      {currentUser && (
        <div className="p-5 border-b border-border">
          <div className="flex items-center gap-3 mb-3">
            <UserAvatar initials={currentUser.avatarInitials} avatarUrl={avatarUrl} />
            <div className="min-w-0">
              <p className="text-sm font-heading font-bold truncate">{currentUser.fullName}</p>
              <p className="text-xs text-muted-foreground font-mono">@{currentUser.username}</p>
            </div>
          </div>
          <p className="text-[11px] text-muted-foreground truncate mb-2">{currentUser.college}</p>
          <div className="flex items-center gap-2 flex-wrap">
            {quizResult && (
              <span className="inline-flex items-center gap-1 text-[10px] font-mono text-primary border border-primary/20 px-2 py-0.5 rounded-full">
                ✦ {quizResult.personality_type.toUpperCase()}
              </span>
            )}
            {isPro && (
              <span className="inline-flex items-center gap-1 text-[10px] font-mono text-warning border border-warning/30 bg-warning/10 px-2 py-0.5 rounded-full">
                ★ Pro
              </span>
            )}
          </div>
          <p className="text-[10px] font-mono text-muted-foreground mt-1.5">
            {currentUser.xpPoints} XP · {currentUser.streakDays}🔥
          </p>
        </div>
      )}

      <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink key={to} to={to} onClick={() => setMobileOpen(false)}
            className={({ isActive }) => clsx(
              "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 relative",
              isActive ? "bg-primary/[0.08] text-primary border-l-2 border-primary -ml-px pl-[11px]" : "text-muted-foreground hover:text-foreground hover:bg-surface2",
              to === "/dashboard/tools" && "font-medium"
            )}
          >
            <Icon size={18} />
            <span>{label}</span>
            {to === "/dashboard/tools" && (
              <span className="ml-auto text-[9px] font-mono bg-primary/10 text-primary px-1.5 py-0.5 rounded">NEW</span>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-border space-y-2">
        {currentUser && (
          <Link to={`/profile/${currentUser.username}`} onClick={() => setMobileOpen(false)}
            className="flex items-center gap-2 text-xs font-mono text-muted-foreground hover:text-primary transition-colors px-1">
            <Globe size={13} /> View Public Profile →
          </Link>
        )}
        <button onClick={handleLogout}
          className="flex items-center gap-2 text-xs font-mono text-muted-foreground hover:text-destructive transition-colors px-1 mt-2">
          <LogOut size={13} /> Logout
        </button>
      </div>
    </>
  );

  return (
    <div className="flex h-[100dvh] overflow-hidden">
      <aside className="hidden md:flex w-60 shrink-0 border-r border-border bg-surface flex-col">
        {sidebarContent}
      </aside>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-background/60 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <aside className="absolute left-0 top-0 bottom-0 w-64 bg-surface border-r border-border flex flex-col">
            <div className="flex items-center justify-end p-3 border-b border-border">
              <button onClick={() => setMobileOpen(false)} className="text-muted-foreground hover:text-foreground p-1"><X size={18} /></button>
            </div>
            {sidebarContent}
          </aside>
        </div>
      )}

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="md:hidden flex items-center gap-3 p-4 border-b border-border bg-surface shrink-0">
          <button onClick={() => setMobileOpen(true)} className="text-muted-foreground hover:text-foreground"><Menu size={20} /></button>
          <span className="font-heading text-sm font-bold">Just<span className="text-primary">Build</span></span>
          {currentUser && (
            <div className="ml-auto">
              <UserAvatar initials={currentUser.avatarInitials} avatarUrl={avatarUrl} size={8} />
            </div>
          )}
        </header>

        <main className="flex-1 overflow-y-auto pb-[calc(4rem+env(safe-area-inset-bottom))] md:pb-0">
          <Outlet />
        </main>

        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-surface/95 backdrop-blur-md border-t border-border flex items-center justify-around pt-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))] z-40">
          {bottomTabs.map(({ to, icon: Icon, label }) => (
            <NavLink key={to} to={to}
              className={({ isActive }) => clsx(
                "flex flex-col items-center gap-0.5 px-2 py-1 rounded-lg transition-colors min-w-[3rem]",
                isActive ? "text-primary" : "text-muted-foreground"
              )}>
              <Icon size={20} />
              <span className="text-[9px] font-mono">{label}</span>
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  );
}