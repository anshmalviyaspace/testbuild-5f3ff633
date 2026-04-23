import { useState } from "react";
import { ExternalLink, ChevronDown, ChevronUp, Sparkles, Gift } from "lucide-react";
import clsx from "clsx";
// ── Early-access mode: show Coming Soon instead of full tools UI ──
import ComingSoonView from "@/components/ComingSoonView";

interface Tool {
  name: string;
  emoji: string;
  tagline: string;
  freePlan: string;
  url: string;
  steps: string[];
  tags: string[];
  highlight?: boolean;
}

interface Category {
  id: string;
  label: string;
  emoji: string;
  description: string;
  tools: Tool[];
}

const CATEGORIES: Category[] = [
  {
    id: "builders",
    label: "Website & App Builders",
    emoji: "🌐",
    description: "Build full apps with prompts — no code experience needed.",
    tools: [
      {
        name: "Lovable",
        emoji: "❤️",
        tagline: "Describe an app and it builds the full React + Supabase stack for you.",
        freePlan: "5 projects free, no credit card",
        url: "https://lovable.dev",
        highlight: true,
        tags: ["React", "Full Stack", "No-code"],
        steps: [
          "Go to lovable.dev → Sign up with GitHub",
          "Type: 'Build me a todo app with a dark theme and Supabase backend'",
          "Edit visually or with prompts → Deploy in one click",
        ],
      },
      {
        name: "Bolt.new",
        emoji: "⚡",
        tagline: "Instant full-stack apps in your browser — StackBlitz powered.",
        freePlan: "Limited daily tokens, no sign-up needed to start",
        url: "https://bolt.new",
        tags: ["React", "Node.js", "Browser IDE"],
        steps: [
          "Go to bolt.new — no sign-up needed",
          "Describe your app idea in the prompt box",
          "Connect GitHub → export and deploy to Netlify or Vercel",
        ],
      },
      {
        name: "v0 by Vercel",
        emoji: "▲",
        tagline: "Generate React UI components from descriptions. Copy straight into your project.",
        freePlan: "200 credits/month free",
        url: "https://v0.dev",
        tags: ["UI Components", "React", "Tailwind"],
        steps: [
          "Sign in at v0.dev with GitHub",
          "Describe a component: 'A pricing card with a free and pro tier'",
          "Copy the generated code into your project",
        ],
      },
    ],
  },
  {
    id: "images",
    label: "Image Generation",
    emoji: "🎨",
    description: "Create stunning visuals, logos, and UI assets with AI — free credits every day.",
    tools: [
      {
        name: "Leonardo AI",
        emoji: "🎭",
        tagline: "Best quality free image gen — 150 tokens/day. Great for app assets and illustrations.",
        freePlan: "150 free tokens daily (forever)",
        url: "https://leonardo.ai",
        highlight: true,
        tags: ["Images", "App Assets", "Illustrations"],
        steps: [
          "Sign up at leonardo.ai → Verify email",
          "Choose a model (Leonardo Diffusion XL for photos, Anime XL for illustrations)",
          "Describe your image with style keywords → Generate 4 variations",
        ],
      },
      {
        name: "Ideogram",
        emoji: "🔤",
        tagline: "Best AI tool for text inside images — logos, posters, banners.",
        freePlan: "10 free slow generations/day",
        url: "https://ideogram.ai",
        tags: ["Logos", "Text in Images", "Posters"],
        steps: [
          "Go to ideogram.ai → Sign up with Google",
          "Write your prompt with text in quotes: 'a logo with the word JustBuild in neon green'",
          "Select style → Generate → Download",
        ],
      },
      {
        name: "Microsoft Designer",
        emoji: "🪟",
        tagline: "DALL-E 3 powered. Unlimited with a free Microsoft account. Great for social media.",
        freePlan: "Unlimited with free Microsoft account",
        url: "https://designer.microsoft.com",
        tags: ["Social Media", "DALL-E 3", "Unlimited"],
        steps: [
          "Go to designer.microsoft.com → Sign in with any Microsoft/Outlook account",
          "Click 'AI Image Generator' → Type your prompt",
          "Download HD image — no limits",
        ],
      },
      {
        name: "Adobe Firefly",
        emoji: "🔥",
        tagline: "Commercially safe AI images. Free monthly credits. Best for marketing assets.",
        freePlan: "25 generative credits/month free",
        url: "https://firefly.adobe.com",
        tags: ["Commercial Use", "Marketing", "Safe"],
        steps: [
          "Create a free Adobe account at firefly.adobe.com",
          "Use 'Text to Image' → describe your asset",
          "Use 'Generative Fill' to edit existing images",
        ],
      },
    ],
  },
  {
    id: "agents",
    label: "AI Agents & Automation",
    emoji: "🤖",
    description: "Build workflows that work 24/7. Connect your apps, automate tasks, launch AI agents.",
    tools: [
      {
        name: "Make (formerly Integromat)",
        emoji: "🔗",
        tagline: "Visual drag-drop automation. 1000 operations/month free. More powerful than Zapier.",
        freePlan: "1,000 ops/month free forever",
        url: "https://make.com",
        highlight: true,
        tags: ["Automation", "No-code", "API"],
        steps: [
          "Sign up at make.com → Create a new scenario",
          "Add trigger (e.g. 'New row in Google Sheets') → Add action (e.g. 'Send email')",
          "Click Run → Schedule it to repeat automatically",
        ],
      },
      {
        name: "n8n",
        emoji: "⚙️",
        tagline: "Open-source automation. Self-host for free forever, or use cloud trial.",
        freePlan: "Self-host free forever (or 14-day cloud trial)",
        url: "https://n8n.io",
        tags: ["Open Source", "Self-host", "Developer"],
        steps: [
          "Go to n8n.io → Start cloud trial (no CC needed)",
          "Create a workflow → Add nodes from 400+ integrations",
          "Connect AI models (OpenAI, Claude) directly in workflows",
        ],
      },
      {
        name: "Zapier AI",
        emoji: "⚡",
        tagline: "Easiest automation tool. 5 zaps free. 100 AI tasks/month with free plan.",
        freePlan: "5 zaps + 100 AI tasks free",
        url: "https://zapier.com",
        tags: ["Beginner Friendly", "5 Zaps Free", "AI Actions"],
        steps: [
          "Sign up at zapier.com → Click 'Create Zap'",
          "Set trigger app (e.g. Gmail) → Set action app (e.g. Notion)",
          "Turn on — runs automatically when triggered",
        ],
      },
    ],
  },
  {
    id: "code",
    label: "Code Assistants",
    emoji: "💻",
    description: "Write, debug, and ship code 10x faster with AI pair programmers.",
    tools: [
      {
        name: "Cursor",
        emoji: "🖱️",
        tagline: "VS Code fork with AI built-in. Best for serious coding. Tab-complete entire functions.",
        freePlan: "500 fast completions/month free + 2-week Pro trial",
        url: "https://cursor.com",
        highlight: true,
        tags: ["VS Code", "AI Autocomplete", "Code Gen"],
        steps: [
          "Download Cursor at cursor.com → Install (replaces VS Code)",
          "Open a project → Press Ctrl+K to generate code with a prompt",
          "Press Tab to accept AI suggestions as you type",
        ],
      },
      {
        name: "GitHub Copilot",
        emoji: "🐙",
        tagline: "Free for verified students via GitHub Student Developer Pack.",
        freePlan: "FREE for students (verify at education.github.com)",
        url: "https://github.com/features/copilot",
        tags: ["Free for Students", "VS Code", "JetBrains"],
        steps: [
          "Apply at education.github.com with your .edu email",
          "Install 'GitHub Copilot' extension in VS Code",
          "Start coding — suggestions appear automatically",
        ],
      },
      {
        name: "Windsurf (Codeium)",
        emoji: "🏄",
        tagline: "Unlimited free AI code completions. No token limits, no credit card.",
        freePlan: "Unlimited completions free forever",
        url: "https://codeium.com",
        tags: ["Unlimited Free", "All Editors", "Fast"],
        steps: [
          "Go to codeium.com → Sign up → Install extension for VS Code or JetBrains",
          "Or download Windsurf IDE at windsurf.com",
          "Code normally — Codeium suggests completions automatically",
        ],
      },
    ],
  },
  {
    id: "research",
    label: "Writing & Research",
    emoji: "✍️",
    description: "Research faster, write better, think clearer — with AI that cites its sources.",
    tools: [
      {
        name: "Claude",
        emoji: "🔮",
        tagline: "Best for long documents, coding, nuanced reasoning, and analysis.",
        freePlan: "Free daily limit at claude.ai — no CC needed",
        url: "https://claude.ai",
        highlight: true,
        tags: ["Analysis", "Coding", "Long Context"],
        steps: [
          "Go to claude.ai → Sign up with Google or email",
          "Upload a PDF or paste text → Ask questions about it",
          "Use for: writing code, summarizing research, generating content",
        ],
      },
      {
        name: "Perplexity",
        emoji: "🔍",
        tagline: "AI search with real sources. 5 Pro searches/day free. Use it instead of Google.",
        freePlan: "Unlimited free searches + 5 Pro/day",
        url: "https://perplexity.ai",
        tags: ["Research", "Citations", "Real-time"],
        steps: [
          "Go to perplexity.ai — no sign-up needed",
          "Ask any question — gets real-time web answers with sources",
          "Click 'Focus' → select Academic for research papers",
        ],
      },
      {
        name: "NotebookLM",
        emoji: "📔",
        tagline: "Google's AI for your own documents. Upload PDFs and chat with them.",
        freePlan: "Completely free — no limits",
        url: "https://notebooklm.google.com",
        tags: ["PDFs", "Study", "Completely Free"],
        steps: [
          "Go to notebooklm.google.com → Sign in with Google",
          "Upload up to 50 sources (PDFs, articles, Google Docs)",
          "Ask questions — only answers from your documents",
        ],
      },
    ],
  },
  {
    id: "video",
    label: "Video & Voice",
    emoji: "🎬",
    description: "Generate videos, clone voices, and create audio content — free starter credits.",
    tools: [
      {
        name: "Kling AI",
        emoji: "🎥",
        tagline: "Best free video generation. 66 daily credits on signup — generate 5-sec videos.",
        freePlan: "66 credits/day free after signup",
        url: "https://klingai.com",
        highlight: true,
        tags: ["Text to Video", "Image to Video", "Free Credits"],
        steps: [
          "Go to klingai.com → Sign up",
          "Choose 'Image to Video' (more reliable) → Upload a still image",
          "Write motion prompt → Generate 5s clip → Download",
        ],
      },
      {
        name: "ElevenLabs",
        emoji: "🔊",
        tagline: "Best AI voice generation. 10,000 characters/month free. Clone any voice.",
        freePlan: "10,000 characters/month free forever",
        url: "https://elevenlabs.io",
        tags: ["Voice Gen", "Text to Speech", "Voice Clone"],
        steps: [
          "Sign up at elevenlabs.io → Go to 'Speech Synthesis'",
          "Choose a voice → Paste text → Click Generate",
          "For voice cloning: 'Add Voice' → Upload 1+ min of audio",
        ],
      },
      {
        name: "Runway ML",
        emoji: "🎞️",
        tagline: "Professional video AI. 125 free credits on signup.",
        freePlan: "125 credits on signup (Gen-2 video model)",
        url: "https://runwayml.com",
        tags: ["Gen-2", "Video Edit", "AI Magic"],
        steps: [
          "Sign up at runwayml.com → 125 credits added automatically",
          "Try 'Text to Video' → describe a scene",
          "Or 'Image to Video' → bring photos to life",
        ],
      },
    ],
  },
];

function ToolCard({ tool }: { tool: Tool }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className={clsx(
      "bg-card border rounded-xl overflow-hidden transition-all duration-200 hover:border-muted-foreground/30",
      tool.highlight ? "border-primary/30 bg-primary/[0.02]" : "border-border"
    )}>
      <div className="p-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-2">
          <div className="flex items-center gap-2.5">
            <span className="text-2xl">{tool.emoji}</span>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-heading text-sm font-bold">{tool.name}</h3>
                {tool.highlight && (
                  <span className="text-[9px] font-mono bg-primary/15 text-primary px-1.5 py-0.5 rounded-full flex items-center gap-1">
                    <Sparkles size={8} /> Recommended
                  </span>
                )}
              </div>
              <div className="flex items-center gap-1 mt-0.5">
                <Gift size={10} className="text-primary shrink-0" />
                <span className="text-[10px] font-mono text-primary">{tool.freePlan}</span>
              </div>
            </div>
          </div>
          <a href={tool.url} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}
            className="shrink-0 inline-flex items-center gap-1 text-[10px] font-mono text-muted-foreground hover:text-primary border border-border hover:border-primary/30 px-2.5 py-1.5 rounded-lg transition-colors">
            Try Free <ExternalLink size={9} />
          </a>
        </div>

        <p className="text-xs text-muted-foreground leading-relaxed mb-3">{tool.tagline}</p>

        <div className="flex flex-wrap gap-1 mb-3">
          {tool.tags.map((t) => (
            <span key={t} className="text-[9px] font-mono bg-surface2 text-muted-foreground px-1.5 py-0.5 rounded">{t}</span>
          ))}
        </div>

        {/* Quick Start toggle */}
        <button onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-1.5 text-xs font-mono text-muted-foreground hover:text-foreground transition-colors">
          {expanded ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
          {expanded ? "Hide" : "Show"} quick start guide
        </button>
      </div>

      {/* Expandable quick start */}
      {expanded && (
        <div className="border-t border-border bg-surface px-4 py-3">
          <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest mb-2.5">3-STEP QUICK START</p>
          <ol className="space-y-2">
            {tool.steps.map((step, i) => (
              <li key={i} className="flex items-start gap-2.5 text-xs text-foreground/90 leading-relaxed">
                <span className="w-5 h-5 rounded-full bg-primary/10 text-primary text-[10px] font-mono font-bold flex items-center justify-center shrink-0 mt-0.5">
                  {i + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>
          <a href={tool.url} target="_blank" rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-1.5 text-xs font-mono text-primary hover:underline">
            Open {tool.name} <ExternalLink size={10} />
          </a>
        </div>
      )}
    </div>
  );
}

export default function ToolsView() {
  const [activeCategory, setActiveCategory] = useState("builders");
  const category = CATEGORIES.find((c) => c.id === activeCategory) ?? CATEGORIES[0];

  // ── EARLY-ACCESS GATE ── Remove this line when Tools goes live ────────────
  return <ComingSoonView section="tools" />;
  // ─────────────────────────────────────────────────────────────────────────

  return (
    <div className="p-4 sm:p-8 animate-fade-in opacity-0">
      {/* Header */}
      <div className="mb-6">
        <h1 className="font-heading text-xl sm:text-2xl font-extrabold mb-1">AI Tools Directory 🛠️</h1>
        <p className="text-sm text-muted-foreground">
          Curated tools with free tiers. Click any tool to see a 3-step quick start guide — right here.
        </p>
      </div>

      {/* Category tabs — horizontal scroll on mobile */}
      <div className="flex gap-2 overflow-x-auto pb-3 mb-6 scrollbar-none">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={clsx(
              "flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-mono whitespace-nowrap transition-all shrink-0",
              activeCategory === cat.id
                ? "bg-primary text-primary-foreground"
                : "bg-surface2 text-muted-foreground hover:text-foreground"
            )}
          >
            <span>{cat.emoji}</span> {cat.label}
          </button>
        ))}
      </div>

      {/* Active category */}
      <div>
        <div className="mb-5">
          <h2 className="font-heading text-lg font-bold flex items-center gap-2">
            <span>{category.emoji}</span> {category.label}
          </h2>
          <p className="text-sm text-muted-foreground mt-1">{category.description}</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {category.tools.map((tool) => <ToolCard key={tool.name} tool={tool} />)}
        </div>
      </div>

      {/* Footer note */}
      <div className="mt-10 p-4 bg-surface border border-border rounded-xl text-center">
        <p className="text-xs font-mono text-muted-foreground">
          All tools listed have verified free tiers. Upgrade when you're ready — start free. ✦
        </p>
      </div>
    </div>
  );
}