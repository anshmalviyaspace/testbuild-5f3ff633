// ComingSoonView.tsx
// Reusable "Coming Soon" page for dashboard sections during early signup stage.
// Shows section-specific preview content + live builder count to build hype.
// Internal page logic is completely preserved — only the rendered UI swaps.

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Users, Zap, Bell } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import clsx from "clsx";

// ─── Section config ───────────────────────────────────────────────────────────
interface SectionConfig {
  emoji: string;
  title: string;
  tagline: string;
  features: string[];
  accentClass: string;
}

const SECTION_CONFIG: Record<string, SectionConfig> = {
  track: {
    emoji: "🗺️",
    title: "Learning Tracks",
    tagline: "Structured paths from zero to shipped — AI, Design, Full Stack & Startup.",
    features: [
      "Curated module-by-module learning paths",
      "Real project briefs at the end of every module",
      "XP system that tracks your actual progress",
      "Unlock the next module only when you ship",
    ],
    accentClass: "from-primary/20 to-primary/5",
  },
  projects: {
    emoji: "🚀",
    title: "Projects",
    tagline: "Ship real work that lives on your portfolio — not just exercises.",
    features: [
      "Project briefs tied to every module you complete",
      "One-click publish to your public portfolio",
      "Community likes, feedback & peer reviews",
      "GitHub / Figma / live link support",
    ],
    accentClass: "from-accent/20 to-accent/5",
  },
  tools: {
    emoji: "🛠️",
    title: "AI Tools Directory",
    tagline: "Every AI tool worth knowing — with free tiers and 3-step quick-start guides.",
    features: [
      "60+ curated tools across 6 categories",
      "Step-by-step quick-start guide for each",
      "Free plan breakdowns — no surprises",
      "New tools added every week",
    ],
    accentClass: "from-yellow-500/20 to-yellow-500/5",
  },
  portfolio: {
    emoji: "💼",
    title: "Portfolio",
    tagline: "Your public builder profile — shareable, searchable, yours.",
    features: [
      "Auto-generated from your shipped projects",
      "Builder personality type from the assessment",
      "XP, streak, and progress all in one place",
      "Share a single link with recruiters or founders",
    ],
    accentClass: "from-purple-500/20 to-purple-500/5",
  },
};

// ─── Component ────────────────────────────────────────────────────────────────
interface Props {
  section: "track" | "projects" | "tools" | "portfolio";
}

export default function ComingSoonView({ section }: Props) {
  const { currentUser } = useAuth();
  const [builderCount, setBuilderCount] = useState<number | null>(null);
  const [notified, setNotified] = useState(false);

  const config = SECTION_CONFIG[section];
  const firstName = currentUser?.fullName?.split(" ")[0] || "Builder";

  // Fetch live builder count from profiles table
  useEffect(() => {
    supabase
      .from("profiles")
      .select("id", { count: "exact", head: true })
      .then(({ count }) => {
        if (count !== null) setBuilderCount(count);
      });
  }, []);

  const handleNotify = () => {
    // Mark as "notified" — in production this would update a DB flag
    setNotified(true);
  };

  return (
    <div className="min-h-full flex flex-col items-center justify-center p-6 sm:p-10 animate-fade-in opacity-0">
      {/* Card */}
      <div className="w-full max-w-xl">

        {/* Top badge */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center gap-2 border border-primary/30 bg-primary/5 text-primary px-4 py-1.5 rounded-full text-xs font-mono tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            EARLY ACCESS — COLLECTING SIGNUPS
          </div>
        </div>

        {/* Hero */}
        <div className="text-center mb-10">
          <div
            className={clsx(
              "w-20 h-20 rounded-2xl mx-auto mb-6 flex items-center justify-center text-4xl",
              "bg-gradient-to-br border border-border",
              config.accentClass
            )}
          >
            {config.emoji}
          </div>

          <h1 className="font-heading text-3xl sm:text-4xl font-extrabold mb-3">
            {config.title}
          </h1>
          <p className="text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
            {config.tagline}
          </p>
        </div>

        {/* Coming Soon card */}
        <div className="bg-card border border-border rounded-2xl overflow-hidden mb-6">
          {/* Header strip */}
          <div className="px-6 py-4 border-b border-border flex items-center gap-3">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-border" />
              <div className="w-2.5 h-2.5 rounded-full bg-border" />
              <div className="w-2.5 h-2.5 rounded-full bg-border" />
            </div>
            <span className="text-[10px] font-mono text-muted-foreground tracking-widest uppercase">
              Coming Soon
            </span>
          </div>

          {/* Feature list */}
          <div className="p-6 space-y-3">
            {config.features.map((feature, i) => (
              <div
                key={i}
                className="flex items-center gap-3 p-3 rounded-lg bg-surface border border-border/50"
              >
                <div className="w-5 h-5 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary/50" />
                </div>
                <p className="text-sm text-muted-foreground">{feature}</p>
              </div>
            ))}
          </div>

          {/* Status bar */}
          <div className="px-6 py-4 bg-surface border-t border-border flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-xs font-mono text-muted-foreground">In development</span>
            </div>
            <span className="text-xs font-mono text-primary">Building now →</span>
          </div>
        </div>

        {/* Social proof */}
        {builderCount !== null && (
          <div className="bg-card border border-border rounded-xl px-5 py-4 mb-6 flex items-center gap-4">
            <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <Users size={16} className="text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold">
                <span className="text-primary font-heading">{builderCount.toLocaleString()}</span> builders already signed up
              </p>
              <p className="text-xs text-muted-foreground font-mono">
                {firstName}, you're one of the early ones. 🎉
              </p>
            </div>
          </div>
        )}

        {/* Notify CTA */}
        {!notified ? (
          <button
            onClick={handleNotify}
            className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground py-3.5 rounded-xl text-sm font-semibold hover:bg-primary/90 transition-colors mb-4"
          >
            <Bell size={15} />
            Notify me when {config.title} launches
          </button>
        ) : (
          <div className="w-full flex items-center justify-center gap-2 bg-primary/10 border border-primary/20 text-primary py-3.5 rounded-xl text-sm font-medium mb-4">
            <Zap size={15} />
            You're on the list, {firstName}! We'll ping you first.
          </div>
        )}

        {/* Go back to Home */}
        <div className="text-center">
          <Link
            to="/dashboard/home"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-muted-foreground hover:text-foreground transition-colors"
          >
            ← Back to Dashboard
          </Link>
        </div>

      </div>
    </div>
  );
}
