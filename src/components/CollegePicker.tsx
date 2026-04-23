// CollegePicker.tsx
// Searchable, verified college selector styled to match JustBuild's design system.
// Uses bg-surface / border-border / text-primary theme tokens throughout.

import { useState, useRef, useEffect, useCallback } from "react";
import { searchColleges, isVerifiedCollege, type College } from "@/data/indianColleges";
import clsx from "clsx";

interface Props {
  value: string;
  onChange: (name: string) => void;
  className?: string;
  placeholder?: string;
  disabled?: boolean;
}

const TYPE_BADGE: Record<string, string> = {
  IIT:   "text-red-400 bg-red-400/10",
  NIT:   "text-blue-400 bg-blue-400/10",
  IIM:   "text-purple-400 bg-purple-400/10",
  AIIMS: "text-green-400 bg-green-400/10",
  IISER: "text-cyan-400 bg-cyan-400/10",
  IIIT:  "text-orange-400 bg-orange-400/10",
};

export default function CollegePicker({ value, onChange, className = "", placeholder = "Search college or university…", disabled }: Props) {
  const [query, setQuery]           = useState(value || "");
  const [results, setResults]       = useState<College[]>([]);
  const [isOpen, setIsOpen]         = useState(false);
  const [highlighted, setHighlighted] = useState(0);
  const [verified, setVerified]     = useState(() => isVerifiedCollege(value || ""));
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef     = useRef<HTMLInputElement>(null);

  // Sync external value changes (e.g. pre-fill from signup data)
  useEffect(() => {
    setQuery(value || "");
    setVerified(isVerifiedCollege(value || ""));
  }, [value]);

  // Search on every keystroke
  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      return;
    }
    setResults(searchColleges(query));
    setHighlighted(0);
  }, [query]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    setIsOpen(true);
    const exact = isVerifiedCollege(val);
    setVerified(exact);
    onChange(val);
  }, [onChange]);

  const handleSelect = useCallback((college: College) => {
    setQuery(college.name);
    setVerified(true);
    setIsOpen(false);
    onChange(college.name);
  }, [onChange]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen || !results.length) return;
    if (e.key === "ArrowDown") { e.preventDefault(); setHighlighted((i) => Math.min(i + 1, results.length - 1)); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setHighlighted((i) => Math.max(i - 1, 0)); }
    else if (e.key === "Enter") { e.preventDefault(); if (results[highlighted]) handleSelect(results[highlighted]); }
    else if (e.key === "Escape") setIsOpen(false);
  };

  const badgeColor = (type: string) => TYPE_BADGE[type] || "text-muted-foreground bg-surface2";

  return (
    <div className={clsx("relative", className)} ref={containerRef}>
      {/* Input */}
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleInput}
          onFocus={() => query.length >= 2 && setIsOpen(true)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          placeholder={placeholder}
          autoComplete="off"
          className={clsx(
            "w-full mt-1.5 bg-surface border rounded-lg px-4 py-2.5 pr-10 text-sm text-foreground",
            "placeholder:text-muted-foreground/40 focus:outline-none focus:ring-1 transition-shadow",
            verified
              ? "border-primary/60 focus:ring-primary"
              : query.length > 3 && results.length === 0
              ? "border-destructive/40 focus:ring-destructive/40"
              : "border-border focus:ring-primary"
          )}
        />
        {/* Status icon */}
        <div className="absolute right-3 top-1/2 -translate-y-1/2 mt-0.5 pointer-events-none">
          {verified ? (
            // Green checkmark
            <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          ) : query.length >= 2 ? (
            // Search magnifier
            <svg className="w-4 h-4 text-muted-foreground/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          ) : null}
        </div>
      </div>

      {/* Helper hint */}
      {verified && (
        <p className="text-[11px] font-mono text-primary mt-1">✓ Verified institution</p>
      )}
      {!verified && query.length > 3 && results.length === 0 && (
        <p className="text-[11px] font-mono text-destructive/80 mt-1">
          Not found — please select from the dropdown
        </p>
      )}

      {/* Dropdown */}
      {isOpen && results.length > 0 && (
        <div className="absolute z-50 top-full left-0 right-0 mt-1 bg-card border border-border rounded-xl shadow-2xl overflow-hidden max-h-64 overflow-y-auto">
          {results.map((college, idx) => (
            <button
              key={college.name}
              type="button"
              onMouseDown={(e) => { e.preventDefault(); handleSelect(college); }}
              className={clsx(
                "w-full px-4 py-2.5 text-left flex items-center justify-between gap-3 transition-colors",
                "border-b border-border/50 last:border-b-0",
                idx === highlighted ? "bg-primary/[0.08]" : "hover:bg-surface2"
              )}
            >
              <div className="min-w-0">
                <p className="text-sm font-medium text-foreground leading-snug truncate">{college.name}</p>
                <p className="text-[10px] font-mono text-muted-foreground">{college.city}, {college.state}</p>
              </div>
              <span className={clsx("shrink-0 text-[9px] font-mono px-2 py-0.5 rounded-full", badgeColor(college.type))}>
                {college.type}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
