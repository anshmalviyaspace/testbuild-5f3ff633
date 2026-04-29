import { useState } from "react";
import { ExternalLink, ChevronDown, ChevronUp, Sparkles, Gift, HelpCircle } from "lucide-react";
import clsx from "clsx";
import ComingSoonView from "@/components/ComingSoonView";
import { useAuth } from "@/contexts/AuthContext";

interface Tool {
  name: string;
  emoji: string;
  tagline: string;
  freePlan: string;
  url: string;
  steps: string[];
  tags: string[];
  highlight?: boolean;
  stuckPrompt?: string; // Pre-filled Claude prompt for "I'm stuck"
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
    label: "App Builders",
    emoji: "🌐",
    description: "Build full apps with prompts — no code experience needed. Start here.",
    tools: [
      {
        name: "Lovable",
        emoji: "❤️",
        tagline: "Describe an app in plain English — Lovable builds the full React + Supabase stack for you. This is what JustBuild was built with.",
        freePlan: "5 projects free, no credit card",
        url: "https://lovable.dev",
        highlight: true,
        tags: ["React", "Full Stack", "No-code", "Supabase"],
        stuckPrompt: "I am a beginner using Lovable to build an app. I described what I want but the result is not what I expected. Help me write a better prompt. My original prompt was: [paste it here]. The problem is: [describe what went wrong].",
        steps: [
          "Go to lovable.dev → Sign up with GitHub (free)",
          "Click 'New Project' → Type what you want: 'Build me a dark-themed landing page for a student productivity app'",
          "Lovable builds it live — if you don't like something, prompt it: 'Make the hero text bigger and center-aligned'",
          "Click 'Publish' → get a real live URL you can share",
        ],
      },
      {
        name: "Bolt.new",
        emoji: "⚡",
        tagline: "Full-stack apps in your browser — no install, no setup, instant results. Great for quick experiments.",
        freePlan: "Limited daily tokens, no sign-up needed to start",
        url: "https://bolt.new",
        tags: ["React", "Node.js", "Browser IDE", "Instant"],
        stuckPrompt: "I am using Bolt.new to build an app and I am getting an error or unexpected result. Help me fix my prompt. Here is what I typed: [paste prompt]. Here is what went wrong: [describe issue].",
        steps: [
          "Go to bolt.new — no account needed to start",
          "Describe your app: 'Build a resume analyzer with two text areas and a results section. Dark theme.'",
          "Bolt builds and runs it live in the browser",
          "Export to GitHub → deploy to Netlify for a real URL",
        ],
      },
      {
        name: "v0 by Vercel",
        emoji: "▲",
        tagline: "Generate beautiful React UI components from descriptions. Copy the code straight into any project.",
        freePlan: "200 credits/month free",
        url: "https://v0.dev",
        tags: ["UI Components", "React", "Tailwind", "Copy-paste"],
        stuckPrompt: "I am using v0.dev to generate a UI component. The output does not look right. My prompt was: [paste it]. Help me rewrite the prompt to get a better result.",
        steps: [
          "Sign in at v0.dev with GitHub",
          "Describe the UI: 'A dark-themed pricing card with a free and pro tier, green accent, rounded corners'",
          "Iterate with follow-up prompts: 'Make the CTA button bigger' or 'Add a badge that says POPULAR'",
          "Click 'Code' → copy the React component into your project",
        ],
      },
      {
        name: "Framer",
        emoji: "🎯",
        tagline: "Design and publish interactive websites — no code. Better animations than anything else. Free plan includes publishing.",
        freePlan: "1 site free, publish with framer.site subdomain",
        url: "https://framer.com",
        tags: ["No-code", "Animations", "Landing Pages", "Design"],
        stuckPrompt: "I am using Framer to build a website and I am stuck on [describe what you are trying to do]. Can you help me figure out the best approach?",
        steps: [
          "Go to framer.com → Sign up free → 'Start from scratch' or pick a template",
          "Drag and drop sections, or use AI: click the ✨ icon → describe what you want",
          "Add animations in the 'Animate' panel — no code needed",
          "Click 'Publish' → get a live URL instantly",
        ],
      },
    ],
  },
  {
    id: "presentations",
    label: "Presentations & Docs",
    emoji: "📊",
    description: "Turn your ideas into professional decks, docs, and one-pagers — in minutes.",
    tools: [
      {
        name: "Gamma",
        emoji: "✨",
        tagline: "AI that builds beautiful presentations from a prompt. No PowerPoint, no Canva — just describe your deck and it appears.",
        freePlan: "400 AI credits free (about 10 decks)",
        url: "https://gamma.app",
        highlight: true,
        tags: ["Presentations", "Decks", "One-pagers", "AI"],
        stuckPrompt: "I am trying to create a presentation using Gamma. Help me write a good Gamma prompt for a presentation about: [your topic]. It should have these sections: [list them].",
        steps: [
          "Go to gamma.app → Sign up free (Google works)",
          "Click 'New' → 'Generate' → type your topic: 'Product pitch for a college student productivity app'",
          "Gamma creates a full deck in seconds — edit any card by clicking it",
          "Click 'Share' → copy the public link, or export as PDF",
        ],
      },
      {
        name: "Notion",
        emoji: "📋",
        tagline: "Free all-in-one workspace. Build docs, wikis, databases, and roadmaps. The best free tool for organizing your project.",
        freePlan: "Unlimited free for individuals",
        url: "https://notion.so",
        tags: ["Docs", "Database", "Free", "Project Management"],
        stuckPrompt: "I am using Notion to organize my project. Help me design a Notion workspace structure for [describe your project]. What pages and databases should I create?",
        steps: [
          "Go to notion.so → Sign up free with your email",
          "Create a new page → use '/' to add any block type (table, toggle, gallery)",
          "Try Notion AI: press spacebar on any page → ask AI to write, summarize, or brainstorm",
          "Share with teammates: click 'Share' → turn on 'Share to web'",
        ],
      },
      {
        name: "Loom",
        emoji: "🎬",
        tagline: "Record yourself demoing your product in 60 seconds. Shareable link instantly. Every builder needs this.",
        freePlan: "25 videos free, 5 min limit per video",
        url: "https://loom.com",
        tags: ["Screen Recording", "Demo", "Share", "Free"],
        stuckPrompt: "I need to record a demo of my app to share with people. Help me write a script for a 60-second Loom demo of [describe your app]. Keep it conversational and genuine.",
        steps: [
          "Go to loom.com → Sign up free → Install the Chrome extension",
          "Click the Loom icon → choose 'Screen + Camera' or just 'Screen'",
          "Hit record → demo your product naturally — mistakes are fine, it feels authentic",
          "Recording stops automatically → copy your share link → paste it anywhere",
        ],
      },
    ],
  },
  {
    id: "images",
    label: "Image Generation",
    emoji: "🎨",
    description: "Create app assets, logos, illustrations, and visuals — free credits every day.",
    tools: [
      {
        name: "Leonardo AI",
        emoji: "🎭",
        tagline: "Best quality free image generation — 150 tokens per day. Perfect for app assets, hero images, and illustrations.",
        freePlan: "150 free tokens daily (forever)",
        url: "https://leonardo.ai",
        highlight: true,
        tags: ["Images", "App Assets", "150/day", "High Quality"],
        stuckPrompt: "Help me write a better Leonardo AI prompt to generate [describe what you want]. My current prompt is: [paste it]. What details should I add to get a better result?",
        steps: [
          "Sign up at leonardo.ai → verify your email",
          "Choose a model: 'Leonardo Diffusion XL' for realistic, 'Anime XL' for illustrations",
          "Write a detailed prompt: 'Dark tech startup logo, neon green accent, clean minimal design, black background'",
          "Generate 4 variations → download your favourite",
        ],
      },
      {
        name: "Ideogram",
        emoji: "🔤",
        tagline: "The only AI image tool that handles text inside images well. Perfect for logos, banners, posters.",
        freePlan: "10 free generations/day",
        url: "https://ideogram.ai",
        tags: ["Logos", "Text in Images", "Posters", "10/day"],
        stuckPrompt: "I want to create a logo with text using Ideogram AI. Help me write a good prompt for a logo for [describe your project/app]. What style, colors, and text should I specify?",
        steps: [
          "Go to ideogram.ai → Sign up with Google",
          "Put text you want in quotes: 'a minimalist logo with the word \"JustBuild\" in bold green font'",
          "Select 'Design' style → Generate → pick your favourite",
          "Download PNG with transparent background",
        ],
      },
      {
        name: "Microsoft Designer",
        emoji: "🪟",
        tagline: "DALL-E 3 powered. Unlimited generations with a free Microsoft account. Best for social media posts.",
        freePlan: "Unlimited with any free Microsoft/Outlook account",
        url: "https://designer.microsoft.com",
        tags: ["Unlimited", "DALL-E 3", "Social Media", "Free"],
        steps: [
          "Go to designer.microsoft.com → sign in with any Microsoft or Outlook account",
          "Click 'AI Image Generator' → type your prompt",
          "Download HD quality — no daily limits",
        ],
      },
      {
        name: "Adobe Firefly",
        emoji: "🔥",
        tagline: "Commercially safe AI images — no copyright worries. Free credits monthly. Best for marketing assets.",
        freePlan: "25 generative credits/month free",
        url: "https://firefly.adobe.com",
        tags: ["Commercial Safe", "Marketing", "Monthly Credits"],
        steps: [
          "Create a free Adobe account at firefly.adobe.com",
          "Use 'Text to Image' → describe your marketing asset",
          "Use 'Generative Fill' to edit or extend an existing image",
        ],
      },
    ],
  },
  {
    id: "agents",
    label: "Automation & Analytics",
    emoji: "🤖",
    description: "Build workflows that run 24/7, and track how your users actually behave.",
    tools: [
      {
        name: "Make",
        emoji: "🔗",
        tagline: "Visual drag-drop automation. 1,000 operations/month free. More powerful than Zapier, easier than coding.",
        freePlan: "1,000 ops/month free forever",
        url: "https://make.com",
        highlight: true,
        tags: ["Automation", "No-code", "1000 ops/month", "Powerful"],
        stuckPrompt: "I am trying to build an automation using Make (formerly Integromat) that does the following: [describe what you want to automate]. What modules should I use and how should I connect them?",
        steps: [
          "Sign up at make.com → create a new Scenario",
          "Add a trigger: 'New row in Google Sheets', 'New email in Gmail', etc.",
          "Add an action: 'Send a Slack message', 'Create a Notion page', etc.",
          "Turn on → it runs automatically every time the trigger fires",
        ],
      },
      {
        name: "PostHog",
        emoji: "🦔",
        tagline: "Free product analytics for your app — see exactly what users do, where they drop off, and what to fix.",
        freePlan: "1M events/month free forever. No credit card.",
        url: "https://posthog.com",
        highlight: true,
        tags: ["Analytics", "Free", "Open Source", "Funnels"],
        stuckPrompt: "I want to add PostHog analytics to my app built with [Lovable/Bolt/React]. Walk me through how to install it and what events I should track for [describe your app].",
        steps: [
          "Sign up at posthog.com → free, no credit card needed",
          "Copy your snippet → paste it into your app's HTML <head> tag",
          "In Lovable/Bolt: prompt 'Add PostHog analytics with project key [YOUR_KEY]. Track button clicks and page views.'",
          "See live events in PostHog dashboard within seconds",
        ],
      },
      {
        name: "n8n",
        emoji: "⚙️",
        tagline: "Open-source automation. Self-host free forever, or use cloud trial. Connect Claude AI directly in workflows.",
        freePlan: "Self-host free forever (or 14-day cloud trial)",
        url: "https://n8n.io",
        tags: ["Open Source", "Self-host", "AI Workflows", "Developer"],
        steps: [
          "Go to n8n.io → start cloud trial (no CC needed)",
          "Create a workflow → add nodes from 400+ app integrations",
          "Add an AI node → connect Claude or OpenAI directly",
          "Trigger it manually, on a schedule, or via webhook",
        ],
      },
      {
        name: "Zapier",
        emoji: "⚡",
        tagline: "The easiest automation tool. 5 Zaps free. Perfect for connecting two apps without any code.",
        freePlan: "5 Zaps + 100 AI tasks free",
        url: "https://zapier.com",
        tags: ["Easiest", "5 Zaps Free", "Beginner Friendly"],
        steps: [
          "Sign up at zapier.com → click 'Create Zap'",
          "Set trigger: 'New form response in Typeform'",
          "Set action: 'Send email in Gmail' or 'Add row in Google Sheets'",
          "Turn on — runs automatically",
        ],
      },
    ],
  },
  {
    id: "code",
    label: "Code Assistants",
    emoji: "💻",
    description: "Write, debug, and understand code 10x faster — even if you're just starting.",
    tools: [
      {
        name: "Cursor",
        emoji: "🖱️",
        tagline: "VS Code with AI built in. Tab to complete entire functions. The best tool for learning to code with AI help.",
        freePlan: "500 fast completions/month + 2-week Pro trial",
        url: "https://cursor.com",
        highlight: true,
        tags: ["VS Code", "AI Autocomplete", "Learn to Code"],
        stuckPrompt: "I am learning to code using Cursor. I have this error: [paste the error]. My code is: [paste your code]. Explain what is wrong in simple terms and show me how to fix it.",
        steps: [
          "Download Cursor at cursor.com → install (it replaces VS Code, same interface)",
          "Open any project → press Ctrl+L to chat with AI about your code",
          "Press Ctrl+K to generate code from a prompt anywhere in the file",
          "Press Tab to accept AI suggestions as you type",
        ],
      },
      {
        name: "GitHub Copilot",
        emoji: "🐙",
        tagline: "FREE for verified students. AI that suggests entire lines and functions as you type.",
        freePlan: "FREE for students — verify at education.github.com",
        url: "https://github.com/features/copilot",
        tags: ["Free for Students", "VS Code", "JetBrains", "Auto-complete"],
        steps: [
          "Go to education.github.com → verify with your college email",
          "Install 'GitHub Copilot' extension in VS Code",
          "Start typing — Copilot suggests the next line, press Tab to accept",
        ],
      },
      {
        name: "Windsurf",
        emoji: "🏄",
        tagline: "Unlimited free AI code completions. No token limits, no credit card, works in any editor.",
        freePlan: "Unlimited completions free forever",
        url: "https://codeium.com",
        tags: ["Unlimited Free", "All Editors", "Fast", "No Limits"],
        steps: [
          "Go to codeium.com → sign up → install extension for VS Code or JetBrains",
          "Or download the Windsurf IDE at windsurf.com for a full AI coding environment",
          "Code normally — Codeium suggests completions automatically as you type",
        ],
      },
    ],
  },
  {
    id: "research",
    label: "Writing & Research",
    emoji: "✍️",
    description: "Research faster, write better, understand anything — with AI that cites its sources.",
    tools: [
      {
        name: "Claude",
        emoji: "🔮",
        tagline: "The best AI for writing, analysis, coding help, and long documents. Honest, careful, detailed.",
        freePlan: "Free daily limit at claude.ai — no credit card",
        url: "https://claude.ai",
        highlight: true,
        tags: ["Writing", "Coding Help", "Analysis", "Long Context"],
        stuckPrompt: "I need help with my JustBuild project brief. I am on module [number] and trying to build [describe your project]. I am stuck on this step: [paste the step]. What should I do?",
        steps: [
          "Go to claude.ai → sign up with Google or email",
          "Upload a PDF or paste text → ask questions about it",
          "For briefs: paste the project brief → ask 'Walk me through step 1 in more detail'",
          "For code: paste your error → ask 'What is wrong and how do I fix it?'",
        ],
      },
      {
        name: "Perplexity",
        emoji: "🔍",
        tagline: "AI search with real cited sources. Use it instead of Google when you need accurate, up-to-date answers.",
        freePlan: "Unlimited searches + 5 Pro searches/day free",
        url: "https://perplexity.ai",
        tags: ["Research", "Real Sources", "Real-time", "Cited"],
        stuckPrompt: "I want to research [your topic] using Perplexity. Help me write good search queries that will get me specific, useful results. My project is about: [describe it].",
        steps: [
          "Go to perplexity.ai — no account needed to start",
          "Ask specific questions: 'What are the most common UX problems with IRCTC as reported by users?'",
          "Click 'Academic' focus mode for research papers and citations",
          "Click any source to read the full article it cited",
        ],
      },
      {
        name: "NotebookLM",
        emoji: "📔",
        tagline: "Google's free AI that only answers from your uploaded documents. Zero hallucinations. The best study tool ever made.",
        freePlan: "Completely free — no limits, no credit card",
        url: "https://notebooklm.google.com",
        tags: ["Your Documents", "Study", "Completely Free", "No Hallucinations"],
        stuckPrompt: "I want to use NotebookLM to study [your subject]. What types of documents should I upload and what kinds of questions should I ask it to get the best results?",
        steps: [
          "Go to notebooklm.google.com → sign in with Google",
          "Create a new notebook → upload your PDFs, notes, or paste article URLs",
          "Ask questions — it only answers from your uploaded sources",
          "Click 'Audio Overview' → get a 10-minute AI podcast about your content",
        ],
      },
    ],
  },
  {
    id: "video",
    label: "Video & Voice",
    emoji: "🎬",
    description: "Generate videos, clone voices, and create audio — free starter credits on all tools.",
    tools: [
      {
        name: "ElevenLabs",
        emoji: "🔊",
        tagline: "Best AI voice generation. 10,000 characters/month free. Add narration to any project.",
        freePlan: "10,000 characters/month free forever",
        url: "https://elevenlabs.io",
        highlight: true,
        tags: ["Voice Gen", "Text to Speech", "Narration", "Free"],
        stuckPrompt: "I want to use ElevenLabs to add voice narration to my project. Help me write a good script for a 60-second audio introduction to [describe your project]. Keep it engaging and conversational.",
        steps: [
          "Sign up at elevenlabs.io → go to 'Speech Synthesis'",
          "Choose a voice from the library (Aria or Rachel work well for educational content)",
          "Paste your text → adjust speed and stability → click Generate",
          "Download MP3 → embed in your Lovable/Bolt app or Gamma presentation",
        ],
      },
      {
        name: "Kling AI",
        emoji: "🎥",
        tagline: "Best free text-to-video generator. 66 daily credits on signup. Make 5-second clips.",
        freePlan: "66 credits/day free after signup",
        url: "https://klingai.com",
        tags: ["Text to Video", "Image to Video", "66/day", "Free Credits"],
        steps: [
          "Go to klingai.com → sign up",
          "Choose 'Image to Video' (more reliable than text-to-video for beginners)",
          "Upload any still image → describe the motion: 'camera slowly zooming in, soft lighting'",
          "Generate 5s clip → download and use in your presentation",
        ],
      },
      {
        name: "Runway ML",
        emoji: "🎞️",
        tagline: "Professional video AI used by real filmmakers. 125 free credits on signup.",
        freePlan: "125 credits free on signup",
        url: "https://runwayml.com",
        tags: ["Professional", "Gen-3", "Video Edit", "AI Magic"],
        steps: [
          "Sign up at runwayml.com → 125 credits added automatically",
          "Try 'Image to Video' first — upload any photo and describe movement",
          "Or try 'Text to Video' → describe a scene in detail",
          "Download → share or use in your project",
        ],
      },
    ],
  },
];

// ─── "I'm Stuck" Help Button ──────────────────────────────────────────────────
function StuckButton({ prompt }: { prompt: string }) {
  const encodedPrompt = encodeURIComponent(prompt);
  const claudeUrl = `https://claude.ai/new?q=${encodedPrompt}`;

  return (
    <a
      href={claudeUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 text-[10px] font-mono text-muted-foreground hover:text-amber-400 border border-border hover:border-amber-400/30 px-2.5 py-1.5 rounded-lg transition-colors"
    >
      <HelpCircle size={9} /> I'm Stuck → Ask Claude
    </a>
  );
}

// ─── Tool Card ────────────────────────────────────────────────────────────────
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
          <a
            href={tool.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="shrink-0 inline-flex items-center gap-1 text-[10px] font-mono text-muted-foreground hover:text-primary border border-border hover:border-primary/30 px-2.5 py-1.5 rounded-lg transition-colors"
          >
            Try Free <ExternalLink size={9} />
          </a>
        </div>

        <p className="text-xs text-muted-foreground leading-relaxed mb-3">{tool.tagline}</p>

        <div className="flex flex-wrap gap-1 mb-3">
          {tool.tags.map((t) => (
            <span key={t} className="text-[9px] font-mono bg-surface2 text-muted-foreground px-1.5 py-0.5 rounded">
              {t}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-1.5 text-xs font-mono text-muted-foreground hover:text-foreground transition-colors"
          >
            {expanded ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
            {expanded ? "Hide" : "Show"} quick start
          </button>
          {tool.stuckPrompt && !expanded && (
            <StuckButton prompt={tool.stuckPrompt} />
          )}
        </div>
      </div>

      {/* Expandable quick start */}
      {expanded && (
        <div className="border-t border-border bg-surface px-4 py-3">
          <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest mb-2.5">
            QUICK START GUIDE
          </p>
          <ol className="space-y-2 mb-3">
            {tool.steps.map((step, i) => (
              <li key={i} className="flex items-start gap-2.5 text-xs text-foreground/90 leading-relaxed">
                <span className="w-5 h-5 rounded-full bg-primary/10 text-primary text-[10px] font-mono font-bold flex items-center justify-center shrink-0 mt-0.5">
                  {i + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>
          <div className="flex items-center gap-3 flex-wrap">
            <a
              href={tool.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-mono text-primary hover:underline"
            >
              Open {tool.name} <ExternalLink size={10} />
            </a>
            {tool.stuckPrompt && <StuckButton prompt={tool.stuckPrompt} />}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function ToolsView() {
  const [activeCategory, setActiveCategory] = useState("builders");
  const category = CATEGORIES.find((c) => c.id === activeCategory) ?? CATEGORIES[0];
  const { isAdmin } = useAuth();

  // EARLY-ACCESS GATE — admins bypass this
  if (!isAdmin) return <ComingSoonView section="tools" />;

  return (
    <div className="p-4 sm:p-8 animate-fade-in opacity-0">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-heading text-xl sm:text-2xl font-extrabold mb-1">AI Tools 🛠️</h1>
        <p className="text-sm text-muted-foreground">
          Every tool you need to build real things — all free to start. Use these in your project briefs.
        </p>
      </div>

      {/* Help banner */}
      <div className="bg-amber-500/5 border border-amber-500/20 rounded-xl px-4 py-3 mb-6 flex items-start gap-3">
        <HelpCircle size={15} className="text-amber-400 shrink-0 mt-0.5" />
        <p className="text-xs text-muted-foreground leading-relaxed">
          <span className="text-amber-400 font-medium">Stuck on any tool?</span>{" "}
          Every tool card has an <span className="font-medium text-foreground">"I'm Stuck → Ask Claude"</span> button
          that opens Claude with a pre-filled prompt for exactly that tool. You are never alone.
        </p>
      </div>

      {/* Category tabs */}
      <div className="flex gap-1 overflow-x-auto pb-2 mb-6 scrollbar-hide">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={clsx(
              "shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all",
              activeCategory === cat.id
                ? "bg-primary text-primary-foreground"
                : "bg-surface border border-border text-muted-foreground hover:text-foreground"
            )}
          >
            <span>{cat.emoji}</span>
            <span className="hidden sm:inline">{cat.label}</span>
            <span className="sm:hidden">{cat.label.split(" ")[0]}</span>
            <span className="text-[9px] opacity-60">({cat.tools.length})</span>
          </button>
        ))}
      </div>

      {/* Category description */}
      <div className="mb-5">
        <h2 className="font-heading text-base font-bold mb-0.5">
          {category.emoji} {category.label}
        </h2>
        <p className="text-xs text-muted-foreground">{category.description}</p>
      </div>

      {/* Tools grid */}
      <div className="grid sm:grid-cols-2 gap-4">
        {category.tools.map((tool) => (
          <ToolCard key={tool.name} tool={tool} />
        ))}
      </div>

      {/* Bottom note */}
      <div className="mt-10 bg-card border border-dashed border-border rounded-xl p-5 text-center">
        <p className="text-sm font-medium mb-1">Missing a tool?</p>
        <p className="text-xs text-muted-foreground">
          Every project brief in your track uses one or more of these tools. If you find something that should be here, share it in the community.
        </p>
      </div>
    </div>
  );
}
