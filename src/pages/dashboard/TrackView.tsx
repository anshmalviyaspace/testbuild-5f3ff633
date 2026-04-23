import { useState, useCallback, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { ChevronLeft, List, Zap, Flame, BookOpen } from "lucide-react";
import type { Module } from "@/data/trackData";
import { getTrackModules } from "@/data/trackData";
import TrackSidebar from "@/components/track/TrackSidebar";
import ModuleDetail from "@/components/track/ModuleDetail";
import CompletionModal from "@/components/track/CompletionModal";
import { useTrackProgress, useToggleResource, useCompleteModule, useSaveActiveModule } from "@/hooks/useTrackProgress";
// ── Early-access mode: show Coming Soon instead of full track UI ──
import ComingSoonView from "@/components/ComingSoonView";

function buildModules(completedIds: string[], trackModules: Module[]): Module[] {
  return trackModules.map((mod, idx) => {
    const isCompleted = completedIds.includes(String(mod.id));
    const prevCompleted = idx === 0 || completedIds.includes(String(trackModules[idx-1].id));
    const isInProgress = !isCompleted && prevCompleted;
    return { ...mod, status: isCompleted ? "completed" : isInProgress ? "in-progress" : "locked" };
  });
}

function Skeleton() {
  return (
    <div className="flex h-full">
      <div className="hidden lg:block w-[380px] shrink-0 border-r border-border bg-surface p-6 space-y-4">
        {[1,2,3,4,5].map((i) => <div key={i} className={`bg-surface2 rounded-lg animate-pulse ${i===1?"h-7 w-48":i===2?"h-2":"h-16"}`} />)}
      </div>
      <div className="flex-1 p-6 space-y-5">
        {[1,2,3,4].map((i) => <div key={i} className={`bg-surface2 rounded-lg animate-pulse ${i===1?"h-8 w-3/4":i===2?"h-4 w-full":"h-14"}`} />)}
      </div>
    </div>
  );
}

export default function TrackView() {
  const { toast } = useToast();
  const { currentUser } = useAuth();
  const userTrack = currentUser?.currentTrack || "AI & Machine Learning";

  const { data: progress, isLoading } = useTrackProgress(userTrack);
  const toggleResource   = useToggleResource();
  const completeModule   = useCompleteModule();
  const saveActiveModule = useSaveActiveModule();

  const completedIds       = progress?.completed_modules  ?? [];
  const checkedResourceIds = progress?.checked_resources  ?? [];
  const savedActiveId      = progress?.active_module_id   ?? null;
  const trackModules       = getTrackModules(userTrack);
  const modules            = buildModules(completedIds, trackModules);
  const checkedResources   = new Set<string>(checkedResourceIds);

  const [activeModuleId,   setActiveModuleId]   = useState<number>(1);
  const [showConfirm,      setShowConfirm]      = useState(false);
  const [xpAnim,           setXpAnim]           = useState({ show: false, amount: 0 });
  const [mobileView,       setMobileView]       = useState<"list" | "detail">("list");

  useEffect(() => {
    if (isLoading) return;
    if (savedActiveId) { setActiveModuleId(savedActiveId); return; }
    const first = modules.find((m) => m.status === "in-progress");
    setActiveModuleId(first?.id ?? 1);
  }, [isLoading, savedActiveId]); // eslint-disable-line

  const activeModule    = modules.find((m) => m.id === activeModuleId) ?? modules[0];
  const completedCount  = completedIds.length;
  const totalXp         = modules.filter((m) => completedIds.includes(String(m.id))).reduce((s,m) => s+m.xp, 0);
  const totalPossibleXp = trackModules.reduce((s,m) => s+m.xp, 0);
  const progressPercent = modules.length ? (completedCount/modules.length)*100 : 0;

  const handleModuleClick = useCallback((mod: Module) => {
    if (mod.status === "locked") { toast({ title: "Module locked 🔒", description: "Complete the previous module first." }); return; }
    setActiveModuleId(mod.id);
    setMobileView("detail");
    saveActiveModule.mutate({ track: userTrack, moduleId: mod.id });
  }, [toast, userTrack, saveActiveModule]);

  const handleToggleResource = useCallback((resourceId: string) => {
    toggleResource.mutate({ track: userTrack, resourceId, currentChecked: checkedResourceIds });
  }, [toggleResource, userTrack, checkedResourceIds]);

  const handleCompleteModule = useCallback(async () => {
    const mod = modules.find((m) => m.id === activeModuleId);
    if (!mod || mod.status !== "in-progress") return;
    const nextModule = modules.find((m) => m.id === activeModuleId + 1);
    try {
      await completeModule.mutateAsync({
        track: userTrack, moduleId: activeModuleId, nextModuleId: nextModule?.id ?? null,
        xpEarned: mod.xp, currentCompleted: completedIds, currentXp: currentUser?.xpPoints ?? 0,
      });
      setXpAnim({ show: true, amount: mod.xp });
      setTimeout(() => setXpAnim({ show: false, amount: 0 }), 2200);
      toast({ title: "Module complete! 🎉", description: `+${mod.xp} XP · Project brief unlocked.` });
      if (nextModule) setTimeout(() => setActiveModuleId(nextModule.id), 700);
    } catch (err: any) {
      toast({ title: "Couldn't save progress", description: err.message, variant: "destructive" });
    }
    setShowConfirm(false);
  }, [modules, activeModuleId, completedIds, currentUser, userTrack, completeModule, toast]);

  if (isLoading) return <Skeleton />;

  // ── EARLY-ACCESS GATE ── Remove this block when Track goes live ──────────
  return <ComingSoonView section="track" />;
  // ─────────────────────────────────────────────────────────────────────────

  const statsBar = (
    <div className="flex items-center gap-4 px-4 py-2.5 bg-surface border-b border-border text-xs font-mono shrink-0 flex-wrap">
      <span className="flex items-center gap-1.5"><Zap size={11} className="text-warning" /><span className="text-foreground">{totalXp}</span><span className="text-muted-foreground">/{totalPossibleXp} XP</span></span>
      <span className="flex items-center gap-1.5"><BookOpen size={11} className="text-primary" /><span className="text-foreground">{completedCount}</span><span className="text-muted-foreground">/{modules.length} modules</span></span>
      {(currentUser?.streakDays ?? 0) > 0 && (
        <span className="flex items-center gap-1 text-streak ml-auto"><Flame size={11} />{currentUser?.streakDays} day streak</span>
      )}
    </div>
  );

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {statsBar}
      <div className="flex flex-1 overflow-hidden">
        {/* Desktop: sidebar always visible */}
        <div className="hidden lg:block w-[380px] shrink-0">
          <TrackSidebar modules={modules} activeModuleId={activeModuleId} completedCount={completedCount}
            totalXp={totalXp} totalPossibleXp={totalPossibleXp} progressPercent={progressPercent}
            track={userTrack} onModuleClick={handleModuleClick} />
        </div>
        {/* Desktop: detail panel */}
        <div className="hidden lg:flex flex-1 overflow-y-auto relative flex-col">
          {xpAnim.show && (
            <div className="absolute top-8 left-1/2 -translate-x-1/2 z-30 pointer-events-none animate-fade-in-up opacity-0">
              <span className="text-3xl font-heading font-extrabold text-primary drop-shadow-lg">+{xpAnim.amount} XP</span>
            </div>
          )}
          <ModuleDetail module={activeModule} checkedResources={checkedResources}
            onToggleResource={handleToggleResource} onRequestComplete={() => setShowConfirm(true)} />
        </div>

        {/* Mobile: tab layout */}
        <div className="lg:hidden flex flex-col flex-1 overflow-hidden">
          <div className="flex border-b border-border bg-surface shrink-0">
            <button onClick={() => setMobileView("list")}
              className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium transition-colors ${mobileView==="list"?"text-primary border-b-2 border-primary bg-primary/5":"text-muted-foreground"}`}>
              <List size={15} />Modules
              <span className="text-[10px] font-mono bg-surface2 px-1.5 py-0.5 rounded">{completedCount}/{modules.length}</span>
            </button>
            <button onClick={() => setMobileView("detail")}
              className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium transition-colors ${mobileView==="detail"?"text-primary border-b-2 border-primary bg-primary/5":"text-muted-foreground"}`}>
              {activeModule ? `Module ${activeModule.id}` : "Detail"}
            </button>
          </div>
          <div className="flex-1 overflow-y-auto">
            {mobileView === "list" ? (
              <TrackSidebar modules={modules} activeModuleId={activeModuleId} completedCount={completedCount}
                totalXp={totalXp} totalPossibleXp={totalPossibleXp} progressPercent={progressPercent}
                track={userTrack} onModuleClick={handleModuleClick} mobile />
            ) : (
              <div className="relative">
                <button onClick={() => setMobileView("list")}
                  className="flex items-center gap-1.5 text-xs font-mono text-muted-foreground hover:text-foreground px-4 pt-4 pb-0">
                  <ChevronLeft size={14} />All Modules
                </button>
                {xpAnim.show && (
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 z-30 pointer-events-none animate-fade-in-up opacity-0">
                    <span className="text-3xl font-heading font-extrabold text-primary drop-shadow-lg">+{xpAnim.amount} XP</span>
                  </div>
                )}
                <ModuleDetail module={activeModule} checkedResources={checkedResources}
                  onToggleResource={handleToggleResource} onRequestComplete={() => setShowConfirm(true)} />
              </div>
            )}
          </div>
        </div>
      </div>

      {showConfirm && (
        <CompletionModal moduleName={activeModule.title}
          uncheckedCount={activeModule.resources.filter((r) => !checkedResources.has(r.id)).length}
          onConfirm={handleCompleteModule} onCancel={() => setShowConfirm(false)}
          isSaving={completeModule.isPending} />
      )}
    </div>
  );
}