import { useState, useCallback, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { ChevronLeft, List } from "lucide-react";
import type { Module } from "@/data/trackData";
import { initialModules } from "@/data/trackData";
import TrackSidebar from "@/components/track/TrackSidebar";
import ModuleDetail from "@/components/track/ModuleDetail";
import CompletionModal from "@/components/track/CompletionModal";
import {
  useTrackProgress,
  useToggleResource,
  useCompleteModule,
  useSaveActiveModule,
} from "@/hooks/useTrackProgress";

function buildModules(completedIds: string[]): Module[] {
  return initialModules.map((mod, idx) => {
    const isCompleted = completedIds.includes(String(mod.id));
    const prevCompleted = idx === 0 || completedIds.includes(String(initialModules[idx - 1].id));
    const isInProgress = !isCompleted && prevCompleted;
    return {
      ...mod,
      status: isCompleted ? "completed" : isInProgress ? "in-progress" : "locked",
    };
  });
}

function TrackSkeleton() {
  return (
    <div className="flex h-full">
      <div className="hidden lg:block w-[400px] shrink-0 border-r border-border bg-surface p-6 space-y-5">
        <div className="h-7 w-48 bg-surface2 rounded-lg animate-pulse" />
        <div className="h-2 w-full bg-surface2 rounded-full animate-pulse" />
        <div className="space-y-2">
          {[1,2,3,4,5].map((i) => <div key={i} className="h-16 bg-surface2 rounded-lg animate-pulse" />)}
        </div>
      </div>
      <div className="flex-1 p-6 space-y-6">
        <div className="h-8 w-3/4 bg-surface2 rounded-lg animate-pulse" />
        <div className="h-4 w-full bg-surface2 rounded animate-pulse" />
        <div className="space-y-2 mt-6">
          {[1,2,3,4].map((i) => <div key={i} className="h-14 bg-surface2 rounded-lg animate-pulse" />)}
        </div>
      </div>
    </div>
  );
}

export default function TrackView() {
  const { toast } = useToast();
  const { currentUser } = useAuth();
  const userTrack = currentUser?.currentTrack || "AI & Machine Learning";

  const { data: progress, isLoading } = useTrackProgress(userTrack);
  const toggleResourceMutation  = useToggleResource();
  const completeModuleMutation  = useCompleteModule();
  const saveActiveModuleMutation = useSaveActiveModule();

  const completedIds      = progress?.completed_modules ?? [];
  const checkedResourceIds = progress?.checked_resources ?? [];
  const savedActiveId     = progress?.active_module_id ?? null;

  const modules = buildModules(completedIds);

  const [activeModuleId, setActiveModuleId]   = useState<number>(1);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [xpAnimation, setXpAnimation]         = useState({ show: false, amount: 0 });
  // Mobile: "list" shows sidebar, "detail" shows module content
  const [mobileView, setMobileView]            = useState<"list" | "detail">("list");

  useEffect(() => {
    if (isLoading) return;
    if (savedActiveId) {
      setActiveModuleId(savedActiveId);
    } else {
      const first = modules.find((m) => m.status === "in-progress");
      setActiveModuleId(first?.id ?? 1);
    }
  }, [isLoading, savedActiveId]); // eslint-disable-line

  const activeModule   = modules.find((m) => m.id === activeModuleId) ?? modules[0];
  const completedCount = completedIds.length;
  const totalXp        = modules.filter((m) => completedIds.includes(String(m.id))).reduce((s, m) => s + m.xp, 0);
  const totalPossibleXp = modules.reduce((s, m) => s + m.xp, 0);
  const progressPercent = (completedCount / modules.length) * 100;
  const checkedResources = new Set<string>(checkedResourceIds);

  const handleModuleClick = useCallback((mod: Module) => {
    if (mod.status === "locked") {
      toast({ title: "Module locked 🔒", description: "Complete the previous module first." });
      return;
    }
    setActiveModuleId(mod.id);
    setMobileView("detail"); // auto-navigate to detail on mobile
    saveActiveModuleMutation.mutate({ track: userTrack, moduleId: mod.id });
  }, [toast, userTrack, saveActiveModuleMutation]);

  const handleToggleResource = useCallback((resourceId: string) => {
    toggleResourceMutation.mutate({ track: userTrack, resourceId, currentChecked: checkedResourceIds });
  }, [toggleResourceMutation, userTrack, checkedResourceIds]);

  const handleCompleteModule = useCallback(async () => {
    const mod = modules.find((m) => m.id === activeModuleId);
    if (!mod || mod.status !== "in-progress") return;

    const nextModule = modules.find((m) => m.id === activeModuleId + 1);
    try {
      await completeModuleMutation.mutateAsync({
        track: userTrack, moduleId: activeModuleId,
        nextModuleId: nextModule?.id ?? null,
        xpEarned: mod.xp,
        currentCompleted: completedIds,
        currentXp: currentUser?.xpPoints ?? 0,
      });
      setXpAnimation({ show: true, amount: mod.xp });
      setTimeout(() => setXpAnimation({ show: false, amount: 0 }), 2000);
      toast({ title: "Module complete! 🎉", description: `+${mod.xp} XP — Project brief unlocked.` });
      if (nextModule) setTimeout(() => setActiveModuleId(nextModule.id), 600);
    } catch (err: any) {
      toast({ title: "Failed to save progress", description: err.message, variant: "destructive" });
    }
    setShowConfirmModal(false);
  }, [modules, activeModuleId, completedIds, currentUser, userTrack, completeModuleMutation, toast]);

  if (isLoading) return <TrackSkeleton />;

  return (
    <div className="flex h-full">
      {/* ── Desktop: always show sidebar ── */}
      <div className="hidden lg:flex w-[400px] shrink-0">
        <TrackSidebar
          modules={modules}
          activeModuleId={activeModuleId}
          completedCount={completedCount}
          totalXp={totalXp}
          totalPossibleXp={totalPossibleXp}
          progressPercent={progressPercent}
          track={userTrack}
          onModuleClick={handleModuleClick}
        />
      </div>

      {/* ── Mobile: tab switcher ── */}
      <div className="lg:hidden flex-1 flex flex-col overflow-hidden">
        {/* Tab bar */}
        <div className="flex border-b border-border bg-surface shrink-0">
          <button
            onClick={() => setMobileView("list")}
            className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium transition-colors ${
              mobileView === "list"
                ? "text-primary border-b-2 border-primary bg-primary/5"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <List size={16} /> Modules
            <span className="text-[10px] font-mono bg-surface2 px-1.5 py-0.5 rounded ml-1">
              {completedCount}/{modules.length}
            </span>
          </button>
          <button
            onClick={() => setMobileView("detail")}
            className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium transition-colors ${
              mobileView === "detail"
                ? "text-primary border-b-2 border-primary bg-primary/5"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {activeModule ? `Module ${activeModule.id}` : "Detail"}
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {mobileView === "list" ? (
            <TrackSidebar
              modules={modules}
              activeModuleId={activeModuleId}
              completedCount={completedCount}
              totalXp={totalXp}
              totalPossibleXp={totalPossibleXp}
              progressPercent={progressPercent}
              track={userTrack}
              onModuleClick={handleModuleClick}
              mobile
            />
          ) : (
            <div className="relative">
              {/* Back button on mobile */}
              <button
                onClick={() => setMobileView("list")}
                className="flex items-center gap-1.5 text-xs font-mono text-muted-foreground hover:text-foreground px-4 pt-4 pb-0 transition-colors"
              >
                <ChevronLeft size={14} /> All Modules
              </button>
              {xpAnimation.show && (
                <div className="absolute top-4 left-1/2 -translate-x-1/2 z-30 animate-fade-in-up opacity-0 pointer-events-none">
                  <span className="text-3xl font-heading font-extrabold text-primary drop-shadow-lg">
                    +{xpAnimation.amount} XP
                  </span>
                </div>
              )}
              <ModuleDetail
                module={activeModule}
                checkedResources={checkedResources}
                onToggleResource={handleToggleResource}
                onRequestComplete={() => setShowConfirmModal(true)}
              />
            </div>
          )}
        </div>
      </div>

      {/* ── Desktop: detail panel ── */}
      <div className="hidden lg:flex flex-1 overflow-y-auto relative flex-col">
        {xpAnimation.show && (
          <div className="absolute top-8 left-1/2 -translate-x-1/2 z-30 animate-fade-in-up opacity-0 pointer-events-none">
            <span className="text-3xl font-heading font-extrabold text-primary drop-shadow-lg">
              +{xpAnimation.amount} XP
            </span>
          </div>
        )}
        <ModuleDetail
          module={activeModule}
          checkedResources={checkedResources}
          onToggleResource={handleToggleResource}
          onRequestComplete={() => setShowConfirmModal(true)}
        />
      </div>

      {showConfirmModal && (
        <CompletionModal
          moduleName={activeModule.title}
          uncheckedCount={activeModule.resources.filter((r) => !checkedResources.has(r.id)).length}
          onConfirm={handleCompleteModule}
          onCancel={() => setShowConfirmModal(false)}
          isSaving={completeModuleMutation.isPending}
        />
      )}
    </div>
  );
}