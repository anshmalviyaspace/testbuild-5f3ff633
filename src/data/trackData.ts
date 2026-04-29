export interface Resource {
  id: string;
  type: "video" | "article" | "docs" | "tool";
  title: string;
  source: string;
  url: string;
  duration: string;
  why: string;
}

export interface ProjectBrief {
  title: string;
  tagline: string;
  description: string;
  features: string[];
  techStack: string[];
  estimatedHours: number;
  difficulty: string;
  starterTip: string;
  realReference: string;
}

export interface Module {
  id: number;
  title: string;
  status: "completed" | "in-progress" | "locked";
  xp: number;
  description: string;
  resources: Resource[];
  projectBrief: ProjectBrief | null;
}

export const initialModules: Module[] = [
  {
    id: 1,
    title: "How AI Actually Works — Then Build With It Immediately",
    status: "completed",
    xp: 50,
    description:
      "Skip the theory-first trap. In this module you learn just enough about how LLMs work to build something real today. You will understand tokens, context windows, and why prompts matter — then immediately call the Claude API and build your first AI-powered tool.",
    resources: [
      { id: "1a", type: "video", title: "But what is a neural network?", source: "3Blue1Brown", url: "https://www.youtube.com/watch?v=aircAruvnKk", duration: "19 min", why: "The clearest visual explanation of how neural networks work. Watch this once and you will understand what everyone else is confused about." },
      { id: "1b", type: "video", title: "Intro to Large Language Models", source: "Andrej Karpathy", url: "https://www.youtube.com/watch?v=zjkBMFhNj_g", duration: "1 hr", why: "The best technical explainer of LLMs by the man who built GPT-2. Dense but worth every minute." },
      { id: "1c", type: "tool", title: "Tiktokenizer — See how your text becomes tokens", source: "Tiktokenizer", url: "https://tiktokenizer.vercel.app", duration: "10 min", why: "Type any sentence and see exactly how it gets tokenized. This makes token limits click instantly." },
      { id: "1d", type: "docs", title: "Claude API — Quickstart", source: "Anthropic Docs", url: "https://docs.anthropic.com/en/docs/quickstart", duration: "15 min", why: "Official quickstart. Get your first Claude API call running in under 15 minutes." },
      { id: "1e", type: "article", title: "What I learned about LLMs", source: "Simon Willison", url: "https://simonwillison.net/2023/Aug/3/weird-world-of-llms/", duration: "12 min", why: "Written by the creator of Datasette. Cuts through hype and tells you what LLMs actually are and are not." },
    ],
    projectBrief: {
      title: "AI Explainer — Your First Real Webpage",
      tagline: "Ship a real website today. No code. Just prompts.",
      description:
        "You just learned how AI works. Now teach it to someone else — because explaining something is the best way to lock it in your brain. Use Lovable to build a one-page website explaining AI. You describe what you want in plain English, Lovable writes all the code, and you ship a real URL you can share on Instagram or WhatsApp.",
      features: [
        "Step 1: Go to lovable.dev → sign up free → click New Project",
        "Step 2: Paste this exact prompt — 'Build a clean dark-themed single page website called \"How AI Works\". Include 4 sections: 1) What is AI (simple analogy), 2) What is an LLM (explain like I\'m 15), 3) How ChatGPT works under the hood, 4) Why this matters for students in India. Use green as the accent color.'",
        "Step 3: Open claude.ai → ask Claude to write the actual text content for each of the 4 sections in simple language",
        "Step 4: In Lovable, prompt — 'Replace all the placeholder text with this content: [paste Claude\'s text]'",
        "Step 5: Add your name at the bottom — prompt 'Add a footer that says Built by [Your Name] using AI'",
        "Step 6: Click Publish → copy your live URL",
        "Step 7: Share the URL in the JustBuild community tab",
      ],
      techStack: ["Lovable (builds the site for free)", "Claude (writes the content)"],
      estimatedHours: 2,
      difficulty: "Zero coding required",
      starterTip:
        "The secret to Lovable: be specific and visual. Instead of 'make it look nice', say 'use a dark background #0a0a0a, green accent #00e676, Inter font, cards with subtle borders and rounded corners'. The more specific you are, the better it builds. If you don't like something — just prompt it to change.",
      realReference: "https://lovable.dev",
    },
  },
  {
    id: 2,
    title: "Prompt Engineering — The Skill That Multiplies Everything",
    status: "completed",
    xp: 50,
    description:
      "Prompting is not typing questions into ChatGPT. It is a systematic engineering skill. This module teaches you zero-shot, few-shot, chain-of-thought, system prompts, and output formatting — the techniques that separate builders who get consistent results from those who get lucky sometimes.",
    resources: [
      { id: "2a", type: "docs", title: "Prompt Engineering Overview", source: "Anthropic Docs", url: "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview", duration: "20 min", why: "The official guide from the people who built Claude. More practical and honest than any third-party tutorial." },
      { id: "2b", type: "docs", title: "Be Clear and Direct", source: "Anthropic Docs", url: "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/be-clear-and-direct", duration: "10 min", why: "The single most important prompting principle. Read this before anything else." },
      { id: "2c", type: "docs", title: "Use Examples (Few-shot)", source: "Anthropic Docs", url: "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/use-examples", duration: "10 min", why: "How to use examples to dramatically improve output quality and consistency." },
      { id: "2d", type: "docs", title: "Chain of Thought Prompting", source: "Anthropic Docs", url: "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/chain-of-thought", duration: "10 min", why: "How to make Claude reason step by step instead of jumping to conclusions." },
      { id: "2e", type: "docs", title: "Prompt Library — 60+ real prompts", source: "Anthropic", url: "https://docs.anthropic.com/en/prompt-library/library", duration: "Browse", why: "Real production prompts for real use cases. Study these like a chef studies recipes — then make your own." },
      { id: "2f", type: "docs", title: "Learn Prompting — Free open source guide", source: "Learn Prompting", url: "https://learnprompting.org/docs/intro", duration: "Self-paced", why: "The most comprehensive free prompting guide. Use as reference, not required reading end-to-end." },
      { id: "2g", type: "docs", title: "Prompt Engineering Guide", source: "Brex (GitHub)", url: "https://github.com/brexhq/prompt-engineering", duration: "30 min", why: "How a real tech company systematized prompting for production. Shows you what engineering-grade prompts look like." },
    ],
    projectBrief: {
      title: "Prompt Battle Card — Show the World What Prompting Can Do",
      tagline: "Same question. Bad prompt vs good prompt. Side by side.",
      description:
        "Prompting is a skill most people don't know exists. Build a webpage that shows 5 side-by-side comparisons: the same question asked badly vs asked well, with completely different Claude responses. Use Bolt.new to build the app in one prompt, then use Claude to generate the actual prompt pairs. This will make anyone who sees it say 'wait, that's the same question?'",
      features: [
        "Step 1: Go to bolt.new → sign up free → start a new project",
        "Step 2: Paste this prompt — 'Build a comparison webpage with 5 cards. Each card has two columns: BAD PROMPT on the left in red, GOOD PROMPT on the right in green. Both columns show the prompt text and the AI response below it. Dark theme, clean design.'",
        "Step 3: Open claude.ai → ask — 'Give me 5 examples of the same question asked badly vs well. Topics: study help, career advice, coding help, health question, college application. Show the bad prompt, good prompt, and what kind of response each would get.'",
        "Step 4: In Bolt, update the hardcoded example data with Claude's 5 examples",
        "Step 5: Add a title — 'Why Your Prompts Are Getting Terrible Answers'",
        "Step 6: Deploy → share the link with your college group",
      ],
      techStack: ["Bolt.new (builds the app)", "Claude (generates the prompt examples)"],
      estimatedHours: 2,
      difficulty: "Zero coding required",
      starterTip:
        "The most viral prompt comparison: ask Claude for homework help with 'explain photosynthesis' vs 'Explain photosynthesis to me like I'm a 14-year-old who finds biology boring. Use a fun analogy, keep it under 150 words, and end with one surprising fact.' The difference in response quality will shock people.",
      realReference: "https://bolt.new",
    },
  },
  {
    id: 3,
    title: "Build Real Apps with the Claude API",
    status: "completed",
    xp: 75,
    description:
      "This is where you stop experimenting and start building. You will learn to integrate Claude into a real frontend, handle streaming responses, write production-grade system prompts, and structure your app so the AI does exactly what you want — every time.",
    resources: [
      { id: "3a", type: "docs", title: "Anthropic SDK for Python", source: "GitHub", url: "https://github.com/anthropics/anthropic-sdk-python", duration: "20 min", why: "The official Python SDK. Read the README fully — it covers 90% of what you need for Python apps." },
      { id: "3b", type: "docs", title: "Anthropic SDK for JavaScript/TypeScript", source: "GitHub", url: "https://github.com/anthropics/anthropic-sdk-typescript", duration: "20 min", why: "The official JS SDK. Use this if you are building with React or Next.js." },
      { id: "3c", type: "docs", title: "Messages API Reference", source: "Anthropic API", url: "https://docs.anthropic.com/en/api/messages", duration: "15 min", why: "Understand the exact shape of every request and response. Essential reference you will return to constantly." },
      { id: "3d", type: "docs", title: "Streaming with Claude", source: "Anthropic API", url: "https://docs.anthropic.com/en/api/streaming", duration: "15 min", why: "Streaming makes your app feel instant instead of frozen. Every AI app should use streaming." },
      { id: "3e", type: "docs", title: "System Prompts", source: "Anthropic Docs", url: "https://docs.anthropic.com/en/docs/build-with-claude/system-prompts", duration: "10 min", why: "System prompts are how you give Claude its personality and constraints. This is the most powerful tool you have." },
      { id: "3f", type: "docs", title: "Models Overview", source: "Anthropic Docs", url: "https://docs.anthropic.com/en/docs/about-claude/models", duration: "5 min", why: "Know which model to use for what. Haiku for fast/cheap, Sonnet for most apps, Opus for complex reasoning." },
      { id: "3g", type: "docs", title: "useChat and useCompletion hooks", source: "Vercel AI SDK", url: "https://sdk.vercel.ai/docs/ai-sdk-ui/overview", duration: "20 min", why: "If you are building with Next.js, this SDK handles streaming, state, and Claude integration in ~10 lines of code." },
    ],
    projectBrief: {
      title: "Study Anything in 10 Minutes — AI Tutor App",
      tagline: "Type a topic. Get a lesson written exactly for your level.",
      description:
        "Build a personal study assistant app using Lovable. The user types any topic they want to learn, picks their level (total beginner / some knowledge / pretty good), and gets a custom explanation written by Claude at exactly the right level — with an analogy, key points, and a 3-question quiz at the end. This is a tool every student in India wishes existed.",
      features: [
        "Step 1: Go to lovable.dev → New Project",
        "Step 2: Paste this prompt — 'Build a study assistant app. Input: text field for topic, 3 radio buttons for level (Beginner / Intermediate / Advanced), Submit button. Output: explanation in a clean card with 4 sections: Simple Explanation, Key Points (bullet list), Real-World Example, Quick Quiz (3 MCQ questions with answer reveal). Dark theme, green accent.'",
        "Step 3: Lovable builds the UI — in Lovable chat say: 'Add a Supabase edge function that calls Claude API. System prompt: You are a patient tutor. Explain [topic] to a [level] student. Return JSON with keys: explanation (string), keyPoints (string array), example (string), quiz (array of 3 objects with question, options array, answer).'",
        "Step 4: Test it — type Machine Learning, pick Beginner, hit Submit",
        "Step 5: Try topics like Stock Market, Quantum Physics, How Loans Work, Why India is developing fast",
        "Step 6: Deploy and share with your class on WhatsApp",
      ],
      techStack: ["Lovable (builds the full app)", "Claude API via Lovable backend", "No manual coding needed"],
      estimatedHours: 3,
      difficulty: "Zero coding required",
      starterTip:
        "The magic prompt line: add 'Use an analogy from everyday Indian life — street food, cricket, Bollywood, or local transport if it helps'. This one addition makes Claude's explanations dramatically more relatable for Indian students. Also add 'end with one surprising fact they can share with friends' — it makes learning feel rewarding.",
      realReference: "https://lovable.dev",
    },
  },
  {
    id: 4,
    title: "Structured Outputs — Make AI Return Exactly What You Need",
    status: "in-progress",
    xp: 75,
    description:
      "The biggest mistake beginners make: treating AI output as a string to parse manually. This module teaches you to make Claude return structured JSON every time so you can build real data-driven UIs on top of it. This is the skill that makes your AI apps actually work reliably.",
    resources: [
      { id: "4a", type: "docs", title: "How to get structured JSON output", source: "Anthropic Docs", url: "https://docs.anthropic.com/en/docs/test-and-evaluate/strengthen-guardrails/increase-consistency", duration: "15 min", why: "Official guide to getting consistent, parseable output from Claude. Read this before building any data-driven feature." },
      { id: "4b", type: "docs", title: "Tool Use (Function Calling)", source: "Anthropic Docs", url: "https://docs.anthropic.com/en/docs/build-with-claude/tool-use", duration: "25 min", why: "Tool use forces Claude to return structured data with a defined schema. The most reliable way to get JSON." },
      { id: "4c", type: "docs", title: "Tool Use — Basic example walkthrough", source: "Anthropic Docs", url: "https://docs.anthropic.com/en/docs/build-with-claude/tool-use/implement-tool-use", duration: "20 min", why: "Step by step implementation. Follow this exactly for your first structured output project." },
      { id: "4d", type: "docs", title: "Pydantic — Data validation for Python AI apps", source: "Pydantic", url: "https://docs.pydantic.dev/latest/", duration: "20 min", why: "Pydantic lets you define exactly what shape your AI output should be and validates it automatically. Used by every serious Python AI app." },
      { id: "4e", type: "docs", title: "Zod — TypeScript schema validation", source: "Zod", url: "https://zod.dev", duration: "15 min", why: "The JavaScript equivalent of Pydantic. Use with the Vercel AI SDK for type-safe structured outputs." },
      { id: "4f", type: "docs", title: "Instructor library (structured LLM outputs)", source: "Jason Liu", url: "https://python.useinstructor.com", duration: "20 min", why: "Instructor wraps any LLM API and guarantees structured Pydantic output. Used in production by hundreds of companies." },
    ],
    projectBrief: {
      title: "Resume Roaster — Brutally Honest AI Feedback",
      tagline: "Paste your resume. Get feedback that actually helps.",
      description:
        "Every Indian student has a resume full of generic lines like 'team player' and 'hardworking'. Build an app that takes a resume, a target job description, and gives brutal but constructive feedback — what's generic, what's missing, what needs rewriting, and exactly how to fix each weak point. Use Bolt.new to build the app, Claude to do the analysis.",
      features: [
        "Step 1: Go to bolt.new → New Project → paste this prompt: 'Build a Resume Analyzer app with two text areas: one for pasting resume text, one for pasting a job description. A big Analyze button. Results show in 4 sections: Strengths (green), Weaknesses (red), Missing Keywords (orange), Improved Bullet Points (blue). Dark professional theme.'",
        "Step 2: Bolt builds the UI. Now add Claude. In Bolt chat: 'Connect the Analyze button to Claude API. System prompt: You are a senior HR professional who has reviewed 10,000 resumes. Analyze this resume against this job description. Be honest and specific. Return JSON with: strengths (array), weaknesses (array), missingKeywords (array), improvedBullets (array of {original, improved}), overallScore (0-100), topTip (string).'",
        "Step 3: Test with your own resume + a real job description from LinkedIn",
        "Step 4: Add a one-click copy button for the improved bullet points",
        "Step 5: Deploy and share with your college placement group — they will love this",
      ],
      techStack: ["Bolt.new (builds everything)", "Claude API (the brain)", "No manual coding"],
      estimatedHours: 3,
      difficulty: "Zero coding required",
      starterTip:
        "The killer system prompt addition: 'This student is applying for jobs in India. Give feedback that is specific to Indian tech hiring — mention FAANG, service companies vs product companies, what CGPA really matters for at this stage, and what internship experience actually looks like on paper.' This makes the feedback 10x more relevant.",
      realReference: "https://bolt.new",
    },
  },
  {
    id: 5,
    title: "RAG — Make AI Work on Your Own Data",
    status: "locked",
    xp: 100,
    description:
      "RAG (Retrieval Augmented Generation) is how every serious AI product works. It is how you make Claude answer questions about your documents, your database, your company knowledge — without hallucinating. This module takes you from zero to a working RAG system.",
    resources: [
      { id: "5a", type: "video", title: "What is RAG? (7 min explainer)", source: "IBM Technology", url: "https://www.youtube.com/watch?v=T-D1OfcDW1M", duration: "7 min", why: "The clearest short explainer of RAG. Watch this first before touching any code." },
      { id: "5b", type: "docs", title: "Build a RAG app (official tutorial)", source: "LangChain", url: "https://python.langchain.com/docs/tutorials/rag/", duration: "45 min", why: "The most complete hands-on RAG tutorial. Covers loading, splitting, embedding, storing, and retrieving." },
      { id: "5c", type: "docs", title: "Vector columns with pgvector", source: "Supabase", url: "https://supabase.com/docs/guides/ai/vector-columns", duration: "20 min", why: "If you are already using Supabase, you can add vector search without a separate database." },
      { id: "5d", type: "docs", title: "RAG with pgvector and OpenAI", source: "Supabase", url: "https://supabase.com/docs/guides/ai/examples/openai-embeddings", duration: "30 min", why: "Complete working example of RAG with Supabase. Adapt this for Claude instead of OpenAI." },
      { id: "5e", type: "docs", title: "Local vector database for development", source: "ChromaDB", url: "https://docs.trychroma.com/getting-started", duration: "15 min", why: "The easiest way to run a vector database locally for development. No cloud account needed." },
      { id: "5f", type: "docs", title: "Text Embeddings Guide", source: "OpenAI", url: "https://platform.openai.com/docs/guides/embeddings", duration: "15 min", why: "The best free embeddings API for building RAG. Use text-embedding-3-small — cheap, fast, excellent quality." },
      { id: "5g", type: "video", title: "Chunking strategies for RAG", source: "Greg Kamradt", url: "https://www.youtube.com/watch?v=8OJC21T2SL4", duration: "30 min", why: "Chunking strategy is the most underrated part of RAG. Bad chunking = bad answers." },
    ],
    projectBrief: {
      title: "Your College's AI Assistant — Built in 20 Minutes",
      tagline: "Upload your college PDFs. Ask it anything. Get instant answers.",
      description:
        "Every college has PDFs nobody reads — syllabus, fee structure, hostel rules, exam schedule. Build an AI assistant that knows all of it and answers student questions instantly. No coding needed. Use NotebookLM to create the knowledge base, then Lovable to build a clean wrapper.",
      features: [
        "Step 1: Go to notebooklm.google.com → sign in → New Notebook",
        "Step 2: Upload 5-10 college PDFs: syllabus, fee structure, hostel rules, exam schedule, placement stats",
        "Step 3: Test inside NotebookLM — ask 'What is the fee for 3rd year CSE?' See it answer with exact sources",
        "Step 4: Click Audio Overview — NotebookLM creates a 5-10 min podcast about your college. Download it.",
        "Step 5: Go to lovable.dev → prompt: 'Build a chat interface for a college AI assistant. Dark theme. Welcome message: Hi! I know everything about [College Name]. Ask me about fees, syllabus, hostel, or exams. Green accent.'",
        "Step 6: Add a button labeled 'Ask the AI →' linking to your NotebookLM share URL",
        "Step 7: Share in your college WhatsApp group — watch it spread",
      ],
      techStack: ["NotebookLM (AI brain, free from Google)", "Lovable (the UI)", "Your college PDFs"],
      estimatedHours: 2,
      difficulty: "Zero coding required",
      starterTip:
        "Upload MORE documents for better answers — add the college FAQ page, official notices, academic calendar. Also hit Generate in NotebookLM first: it auto-creates a Study Guide, FAQ, and Timeline instantly. Share these with classmates before even building the app.",
      realReference: "https://notebooklm.google.com",
    },
  },
  {
    id: 6,
    title: "AI Agents — Build Systems That Take Actions",
    status: "locked",
    xp: 100,
    description:
      "Agents are AI systems that can use tools, browse the web, write and run code, and make multi-step decisions to complete a goal. This is the frontier of what builders are making right now. You will build a working agent using Claude tool use.",
    resources: [
      { id: "6a", type: "article", title: "Build Effective Agents", source: "Anthropic Research", url: "https://www.anthropic.com/research/building-effective-agents", duration: "25 min", why: "Written by Anthropic engineers. The most honest and practical guide to building agents that actually work. Required reading." },
      { id: "6b", type: "docs", title: "Tool Use Overview", source: "Anthropic Docs", url: "https://docs.anthropic.com/en/docs/build-with-claude/tool-use", duration: "20 min", why: "Tools are what turn Claude from a chatbot into an agent. This is the foundation." },
      { id: "6c", type: "docs", title: "Computer Use (agents that control computers)", source: "Anthropic Docs", url: "https://docs.anthropic.com/en/docs/build-with-claude/computer-use", duration: "20 min", why: "Claude can now control a computer like a human. This is the most powerful agentic capability available today." },
      { id: "6d", type: "docs", title: "Build stateful multi-step agents", source: "LangGraph", url: "https://langchain-ai.github.io/langgraph/", duration: "Self-paced", why: "LangGraph is the best framework for building agents that need to loop, branch, and maintain state across steps." },
      { id: "6e", type: "docs", title: "LangGraph — Quickstart tutorial", source: "LangGraph", url: "https://langchain-ai.github.io/langgraph/tutorials/introduction/", duration: "45 min", why: "Build your first agent in under an hour. Follow this before building your own." },
      { id: "6f", type: "docs", title: "smolagents (minimal agent framework)", source: "Hugging Face", url: "https://huggingface.co/docs/smolagents/index", duration: "30 min", why: "The simplest possible agent framework. If LangGraph feels too heavy, start here." },
      { id: "6g", type: "docs", title: "Code execution sandbox for AI agents", source: "E2B", url: "https://e2b.dev/docs", duration: "20 min", why: "E2B lets your agent run actual Python code safely in a sandbox. Essential for code-executing agents." },
    ],
    projectBrief: {
      title: "AI Research Report Generator — Any Topic in 5 Minutes",
      tagline: "Pick a topic. Get a detailed report with sources. Share it.",
      description:
        "Research that used to take hours now takes 5 minutes. Build an app that takes any research topic, uses Perplexity to gather current information from the web, then uses Claude to turn that research into a structured, well-written report. The app should look good enough to actually submit or share professionally.",
      features: [
        "Step 1: Go to bolt.new → New Project → paste: 'Build a Research Report Generator app. Input: a text field for the research topic, a dropdown for report type (Academic Summary / Business Analysis / Simple Explainer / News Breakdown). Output: a formatted report with sections: Overview, Key Findings, Important Details, Current Developments, Conclusion. Has a Generate Report button and a Copy Report button. Dark professional theme.'",
        "Step 2: Open perplexity.ai → in the search bar, type your topic with 'detailed research' appended. Copy the full Perplexity response including all citations.",
        "Step 3: In claude.ai → paste: 'Here is raw research on [topic] from Perplexity: [paste research]. Now write a [report type] report structured as: Overview (2 paragraphs), Key Findings (5 bullet points with detail), Important Details (3 paragraphs), Current Developments (1 paragraph), Conclusion (1 paragraph). Make it detailed and professional.'",
        "Step 4: In your Bolt app, update the example output with Claude's formatted report",
        "Step 5: Wire up the Generate button to call Claude API via Bolt's backend integration",
        "Step 6: Add a one-click PDF export — prompt Bolt: 'Add a Download as PDF button using window.print()'",
      ],
      techStack: ["Bolt.new (the app)", "Perplexity (research gathering)", "Claude (report writing)"],
      estimatedHours: 3,
      difficulty: "Zero coding required",
      starterTip:
        "Perplexity Pro tip: use the 'Academic' mode by clicking the dropdown next to the search bar. It focuses on academic and authoritative sources. When you paste this into Claude, tell it 'here are excerpts from academic sources' — Claude will treat the information with more rigor and cite properly.",
      realReference: "https://perplexity.ai",
    },
  },
  {
    id: 7,
    title: "Multimodal AI — Build With Images, Audio, and Documents",
    status: "locked",
    xp: 100,
    description:
      "Modern AI is not just text. Claude can read images, analyze documents, and understand screenshots. OpenAI Whisper transcribes audio. This module teaches you to build multimodal apps — tools that work with the full richness of real-world information.",
    resources: [
      { id: "7a", type: "docs", title: "Vision: Analyze images with Claude", source: "Anthropic Docs", url: "https://docs.anthropic.com/en/docs/build-with-claude/vision", duration: "20 min", why: "Official guide to sending images to Claude. Covers base64, URLs, supported formats, and best practices." },
      { id: "7b", type: "docs", title: "Files API (PDFs and documents)", source: "Anthropic Docs", url: "https://docs.anthropic.com/en/docs/build-with-claude/files", duration: "15 min", why: "Upload and reuse files across multiple API calls. Essential for document-heavy apps." },
      { id: "7c", type: "docs", title: "PDF support", source: "Anthropic Docs", url: "https://docs.anthropic.com/en/docs/build-with-claude/pdf-support", duration: "10 min", why: "Claude can read entire PDFs natively. No chunking needed for smaller documents." },
      { id: "7d", type: "docs", title: "Whisper — Speech to text (open source)", source: "OpenAI (GitHub)", url: "https://github.com/openai/whisper", duration: "20 min", why: "The best open source speech-to-text model. Run it locally for free. Build voice-input AI apps." },
      { id: "7e", type: "docs", title: "Run image/audio models via API", source: "Replicate", url: "https://replicate.com/docs", duration: "15 min", why: "Run Stable Diffusion, Whisper, and 1000+ other models via a simple API. No GPU needed." },
      { id: "7f", type: "docs", title: "Audio intelligence API", source: "AssemblyAI", url: "https://www.assemblyai.com/docs", duration: "20 min", why: "Transcribe + analyze audio. Speaker detection, sentiment, chapter summaries." },
      { id: "7g", type: "docs", title: "Extract text from PDFs in Python", source: "PyPDF2", url: "https://pypdf2.readthedocs.io/en/3.x/", duration: "10 min", why: "The standard Python library for PDF text extraction. Used in almost every document AI pipeline." },
    ],
    projectBrief: {
      title: "Lecture → Complete Study Pack in 10 Minutes",
      tagline: "Upload lecture notes. Get flashcards, quiz, and a podcast summary.",
      description:
        "Stop wasting 3 hours making notes from a 1-hour lecture. Build a tool that takes any lecture content — notes, slides, or a PDF — and turns it into a complete study pack: structured notes, flashcards, practice quiz, AND a NotebookLM audio podcast you can listen to while commuting. This changes how your entire class studies.",
      features: [
        "Step 1: Take your lecture notes (any format — typed notes, PDF slides, even a photo of your notebook)",
        "Step 2: Go to notebooklm.google.com → New Notebook → upload your lecture material",
        "Step 3: In NotebookLM, click 'Generate' → it auto-creates an FAQ, a study guide, and a timeline",
        "Step 4: Click 'Audio Overview' → NotebookLM creates a 5-10 minute podcast of two AI hosts discussing your lecture content — download it",
        "Step 5: Go to claude.ai → paste your lecture notes → ask: 'Create 20 flashcards from this content. Format: Question on front, Answer on back. Then create a 10-question MCQ quiz with answers. Then write a 1-page cheat sheet with only the most important points.'",
        "Step 6: Go to lovable.dev → prompt: 'Build a flashcard app. Shows one card at a time, click to flip, buttons for Next and Previous, progress indicator showing Card 3 of 20. Dark theme with smooth flip animation.'",
        "Step 7: Paste Claude's flashcards into the app → Deploy → share with classmates",
      ],
      techStack: ["NotebookLM (study guide + audio podcast, free)", "Claude (flashcards + quiz)", "Lovable (flashcard app UI)"],
      estimatedHours: 2,
      difficulty: "Zero coding required",
      starterTip:
        "NotebookLM's Audio Overview is the most underrated AI feature of 2024. Two AI hosts actually discuss your content, debate points, and explain concepts conversationally. It sounds like a real podcast. Upload your notes before bed, listen during your morning commute — you will retain the content without sitting down to study.",
      realReference: "https://notebooklm.google.com",
    },
  },
  {
    id: 8,
    title: "Ship Your AI App — Deploy, Monitor, Iterate",
    status: "locked",
    xp: 150,
    description:
      "Building locally is easy. Shipping something real users can access is the hard part most tutorials skip. This module covers wrapping your AI in a proper UI, deploying it free, handling API key safety, monitoring usage, and iterating based on real feedback.",
    resources: [
      { id: "8a", type: "docs", title: "Build AI UIs in pure Python", source: "Streamlit", url: "https://docs.streamlit.io", duration: "30 min", why: "The fastest way to turn a Python AI script into a shareable web app. No frontend knowledge needed." },
      { id: "8b", type: "docs", title: "Deploy free on Streamlit Cloud", source: "Streamlit", url: "https://docs.streamlit.io/deploy/streamlit-community-cloud/get-started/deploy-an-app", duration: "10 min", why: "Deploy your Streamlit app publicly in under 5 minutes. Completely free." },
      { id: "8c", type: "docs", title: "Production AI apps with Next.js", source: "Vercel AI SDK", url: "https://sdk.vercel.ai/docs/getting-started/nextjs-app-router", duration: "30 min", why: "If you want a proper web app (not Streamlit), Vercel AI SDK + Next.js is the industry standard setup." },
      { id: "8d", type: "docs", title: "Deploy Next.js free", source: "Vercel", url: "https://vercel.com/docs/deployments/overview", duration: "10 min", why: "Push to GitHub, deploy automatically. Free tier is more than enough for your first AI app." },
      { id: "8e", type: "docs", title: "API key safety and best practices", source: "Anthropic", url: "https://docs.anthropic.com/en/api/getting-started", duration: "10 min", why: "Never expose your API key in frontend code. This guide tells you exactly how to keep it safe in production." },
      { id: "8f", type: "docs", title: "Deploy Python backends free", source: "Railway", url: "https://railway.app/new", duration: "15 min", why: "If your AI app needs a Python backend (FastAPI, Flask), Railway is the easiest free deployment option." },
      { id: "8g", type: "docs", title: "Open source LLM observability", source: "Langfuse", url: "https://langfuse.com/docs", duration: "20 min", why: "See exactly what prompts your users are sending, what Claude returns, latency, and costs." },
      { id: "8h", type: "docs", title: "Share AI demos free", source: "Hugging Face Spaces", url: "https://huggingface.co/docs/hub/spaces-overview", duration: "15 min", why: "The best platform for sharing AI demos with the community. Supports Streamlit and Gradio." },
    ],
    projectBrief: {
      title: "Launch Your AI Product — Real Users, Real Impact",
      tagline: "Pick your best project. Give it a proper launch. Get 50 real users.",
      description:
        "This is not a tutorial project. This is your first real product launch. Take the best thing you built in modules 1-7, give it a proper landing page, and launch it to real people. The goal: 50 people who are not your friends using something you made. This goes on your resume.",
      features: [
        "Step 1: Pick your best project. Write: 'This helps [who] do [what] in [how long]'",
        "Step 2: lovable.dev → prompt: 'Build a landing page for [tool]. Hero with headline, How It Works (3 steps), Who It Is For, 3 testimonials, CTA button Try It Free. Dark professional theme.'",
        "Step 3: gamma.app → sign up free → prompt: 'Product one-pager for [tool] — problem it solves, 3 features, how to access. Shareable on LinkedIn.' Export as PDF.",
        "Step 4: Record a 60-second Loom demo of the tool working. No editing needed — raw is authentic.",
        "Step 5: claude.ai → 'Write a LinkedIn post: I built [tool] as a student, it helps [who] do [what], here is the link. Genuine not corporate. 150 words.'",
        "Step 6: Share everywhere — college WhatsApp, LinkedIn, Twitter #buildinpublic, r/developersIndia",
        "Step 7: Post in JustBuild community with your portfolio link. You earned this.",
      ],
      techStack: ["Lovable (landing page)", "Gamma (one-pager PDF)", "Loom (demo video, free)", "Claude (copy)", "WhatsApp + LinkedIn (distribution)"],
      estimatedHours: 4,
      difficulty: "No coding — just shipping",
      starterTip:
        "Best headline formula: '[Tool] — [specific outcome] for [specific person] in [time]'. Example: 'ResumeAI — Brutally honest feedback for your next internship in 60 seconds'. Ship before it feels ready. Real users will tell you what to fix better than any amount of solo polishing.",
      realReference: "https://gamma.app",
    },
  },
];

// ═══════════════════════════════════════════════════════════════════════════
// MULTI-TRACK SUPPORT — Real modules for every track
// ═══════════════════════════════════════════════════════════════════════════

export const UIUX_MODULES: Module[] = [
  {
    id: 1,
    title: "Design Thinking — How to Solve Problems Users Actually Have",
    status: "in-progress",
    xp: 50,
    description:
      "Most beginner designers jump straight to Figma. That's backwards. Design thinking is the mental model professionals use before touching any tool — it stops you from building the right solution to the wrong problem. This module teaches you to think like a designer.",
    resources: [
      { id: "u1a", type: "article", title: "IDEO Design Thinking — The full framework", source: "IDEO", url: "https://designthinking.ideo.com", duration: "25 min", why: "The original source. IDEO invented design thinking for product teams. Read their explanation, not a summary." },
      { id: "u1b", type: "video", title: "The Design Thinking Process in 5 Steps", source: "AJ&Smart", url: "https://www.youtube.com/watch?v=_r0VX-aU_T8", duration: "8 min", why: "AJ&Smart runs Design Sprints for Fortune 500s. Their process is battle-tested and explained clearly." },
      { id: "u1c", type: "article", title: "How to run a user interview", source: "Nielsen Norman Group", url: "https://www.nngroup.com/articles/user-interviews/", duration: "15 min", why: "NNG is the world authority on UX research. This article is the definitive guide to interviewing users without leading them." },
      { id: "u1d", type: "article", title: "How to write a problem statement", source: "Interaction Design Foundation", url: "https://www.interaction-design.org/literature/article/define-and-frame-your-design-challenge-by-creating-your-point-of-view-and-ask-how-might-we", duration: "12 min", why: "\"How Might We\" questions are the bridge between user research and design solutions. This teaches the technique." },
      { id: "u1e", type: "tool", title: "Maze — Free usability testing tool", source: "Maze", url: "https://maze.co", duration: "10 min", why: "Test your designs with real users for free. Maze gives you quantitative UX data in hours instead of weeks." },
    ],
    projectBrief: {
      title: "Fix Any App's Design — AI Research + Your Eye",
      tagline: "Pick an app that frustrates you. Fix it with AI. Present the case.",
      description:
        "Every terrible app is a design opportunity. Pick one app or website you personally find frustrating — college portal, a government site, your canteen app, anything. Use Perplexity to research why users hate it, use Claude to write a professional design critique, and use Gamma to present your redesign proposal. No Figma needed for this one — just your thinking.",
      features: [
        "Step 1: Pick a bad app you use daily. Take 5 screenshots of the worst parts.",
        "Step 2: Go to perplexity.ai → ask: 'What are the main UX problems users complain about with [app name]? Find reviews, Reddit posts, and complaints.' Copy the research.",
        "Step 3: Go to claude.ai → paste your screenshots descriptions + Perplexity research → ask: 'Write a professional UX audit for this app. Structure it as: The Problem (1 paragraph), 5 Specific UX Issues (with the principle each one violates), 3 Quick Wins (changes that would help immediately), and The Ideal Fix (what the redesign should prioritize).'",
        "Step 4: Go to gamma.app → prompt: 'Create a design critique presentation with these sections: The App & Its Problems, User Pain Points (with evidence), 5 UX Issues Found, 3 Quick Fixes, My Design Recommendation. Dark professional theme.' Paste Claude's audit.",
        "Step 5: Export the Gamma presentation as PDF",
        "Step 6: Share in the JustBuild community with the title '[App Name] — A UX Audit'",
      ],
      techStack: ["Perplexity (user research)", "Claude (professional audit writing)", "Gamma (presentation, free)"],
      estimatedHours: 2,
      difficulty: "Zero design experience required",
      starterTip:
        "The best apps to audit for this module: IRCTC, any state government portal, most college websites, or any app with below 3.5 stars on the Play Store. Ask Claude: 'For each UX issue, name the exact usability heuristic it violates (use Nielsen's 10 heuristics).' This makes your critique sound expert-level immediately.",
      realReference: "https://www.nngroup.com/articles/ten-usability-heuristics/",
    },
  },
  {
    id: 2,
    title: "Figma — From Zero to Designing Real Product Screens",
    status: "locked",
    xp: 75,
    description:
      "Figma is where design lives. It is the industry standard used by designers at every startup and big tech company. This module teaches you the features that matter for real product work — Auto Layout, components, variants, and the fastest ways to build screens that look production-ready.",
    resources: [
      { id: "u2a", type: "video", title: "Figma for Beginners — Complete 4-part course", source: "Figma (official)", url: "https://www.youtube.com/watch?v=dXQ7IHkTiMM", duration: "4 × 25 min", why: "Made by Figma's own team. Covers the actual interface, not a third-party interpretation. Watch all 4 parts." },
      { id: "u2b", type: "docs", title: "Auto Layout — The most important Figma feature", source: "Figma Help", url: "https://help.figma.com/hc/en-us/articles/5731482952599-Using-auto-layout", duration: "20 min", why: "If you don't understand Auto Layout, your designs will break when content changes. This is foundational." },
      { id: "u2c", type: "docs", title: "Components and variants", source: "Figma Help", url: "https://help.figma.com/hc/en-us/articles/360038662654-Guide-to-components-in-Figma", duration: "20 min", why: "Components let you change one button and have it update everywhere. This is how real design systems work." },
      { id: "u2d", type: "article", title: "8 Point Grid System — Spacing that looks intentional", source: "Spec.fm", url: "https://spec.fm/specifics/8-pt-grid", duration: "10 min", why: "The 8pt grid is how every professional design team spaces elements. Use it and your designs instantly look more polished." },
      { id: "u2e", type: "tool", title: "Figma Community — 1000+ free templates and kits", source: "Figma Community", url: "https://www.figma.com/community", duration: "Browse", why: "Study how professionals structure their files. Look at how top designers use components before building your own." },
    ],
    projectBrief: {
      title: "Design Your Dream App — v0 + Figma in 3 Hours",
      tagline: "Describe your app idea. See it designed in seconds. Refine it.",
      description:
        "You have an idea for an app. Most people keep it in their head forever. Today you ship a real visual design that looks like a real product — using v0 (Vercel's AI design tool) to generate the initial UI, then Figma to refine and connect the screens. No design experience needed to start.",
      features: [
        "Step 1: Think of an app you genuinely want to exist. Write 2 sentences: what it does, who it is for.",
        "Step 2: Go to v0.dev → sign up free → in the prompt box, describe your app: 'Design a mobile app for [purpose]. Include: home screen showing [main content], a detail screen, a profile screen. Dark theme, modern design, smooth cards.'",
        "Step 3: v0 generates a React component with real UI. Click 'Open in Figma' or take a screenshot of what it generated.",
        "Step 4: Open Figma (figma.com, free) → create a new file → paste the v0 screenshot as reference",
        "Step 5: In Figma, trace over the v0 design on a real iPhone 14 frame (390x844). Use Auto Layout for every section.",
        "Step 6: Create 3 more screens using the same style: add more detail, a form, a settings screen",
        "Step 7: Connect all screens with Figma's Prototype tool → share the prototype link",
      ],
      techStack: ["v0.dev (AI UI generator, free tier)", "Figma (refinement and prototyping, free)"],
      estimatedHours: 3,
      difficulty: "Beginner-friendly",
      starterTip:
        "v0 prompt formula for great results: 'Mobile app screen for [app type]. Style: [dark/light], [minimal/bold]. Show [specific content — e.g. a list of tasks, a user profile, a payment screen]. Use [color] as the accent. Make it look like a real product, not a wireframe.' The more specific, the better the output.",
      realReference: "https://v0.dev",
    },
  },
  {
    id: 3,
    title: "Visual Design — Color, Typography, and Why Things Look the Way They Look",
    status: "locked",
    xp: 75,
    description:
      "Most beginners think visual design is taste. It is not — it is a set of rules that, once you know them, let you look at any design and explain exactly why it works or fails. This module covers the principles that separate beginner designs from professional ones.",
    resources: [
      { id: "u3a", type: "article", title: "Refactoring UI — The book that changed how developers design", source: "Adam Wathan & Steve Schoger", url: "https://www.refactoringui.com", duration: "Self-paced", why: "The most practically useful design resource for people who build things. The authors built Tailwind CSS. Every page has before/after examples with explanations." },
      { id: "u3b", type: "video", title: "Typography that works — the complete guide", source: "Satori Graphics", url: "https://www.youtube.com/watch?v=QrNi9FmdlxY", duration: "18 min", why: "Type is 95% of UI design. This video explains font pairing, hierarchy, and the rules that make text readable." },
      { id: "u3c", type: "article", title: "Color theory for designers", source: "Smashing Magazine", url: "https://www.smashingmagazine.com/2010/01/color-theory-for-designers-part-1-the-meaning-of-color/", duration: "20 min", why: "A comprehensive explanation of why colours mean what they mean and how to use contrast correctly." },
      { id: "u3d", type: "tool", title: "Realtime Colors — Preview your palette on a real UI", source: "Juxtopposed", url: "https://www.realtimecolors.com", duration: "10 min", why: "The best free tool for trying colour combinations on a real UI before committing. Saves hours of trial and error." },
      { id: "u3e", type: "article", title: "Visual hierarchy — how users read screens", source: "Nielsen Norman Group", url: "https://www.nngroup.com/articles/visual-hierarchy-ux-definition/", duration: "12 min", why: "NNG explains exactly how users scan screens and what you need to put where to guide their attention correctly." },
    ],
    projectBrief: {
      title: "Before vs After — Transform a Real Design Using AI",
      tagline: "Take any bad UI. Make it beautiful. Show the difference.",
      description:
        "The fastest way to develop a design eye is the before/after exercise. Pick any bad real-world UI, use Claude to understand exactly what is wrong, use v0 to generate an improved version, and present the transformation as a case study. This is portfolio gold — designers get hired on this type of work.",
      features: [
        "Step 1: Find a bad UI — IRCTC booking screen, any government portal, a local restaurant website. Screenshot it.",
        "Step 2: claude.ai → describe the screenshot → ask: 'Analyze this UI for visual design problems. For each problem, name: what is wrong, which design principle it breaks, and exactly how to fix it. List 8 specific issues.'",
        "Step 3: v0.dev → prompt: 'Redesign this UI: [describe the original]. Apply: proper typography hierarchy, 60-30-10 color rule, 8pt spacing grid, clear primary action. Make it clean and modern.' Iterate until it looks great.",
        "Step 4: gamma.app → prompt: 'Create a design transformation case study: Before (problems annotated), Issues Found (8 points with principles), Design Decisions Made, After (the new design), Key Improvements. Professional portfolio style.'",
        "Step 5: Add screenshots of before and after into the Gamma presentation",
        "Step 6: Export as PDF → add to your JustBuild portfolio",
      ],
      techStack: ["Claude (design critique)", "v0.dev (generates improved UI)", "Gamma (case study presentation)"],
      estimatedHours: 3,
      difficulty: "Beginner-friendly",
      starterTip:
        "For the before/after to be impressive, pick a design that is genuinely terrible — not just slightly dated. IRCTC, any state RTO website, most college portals are perfect. The bigger the transformation, the more impressive your portfolio piece. Ask Claude specifically about: contrast ratios, visual hierarchy, spacing consistency, and call-to-action clarity.",
      realReference: "https://v0.dev",
    },
  },
  {
    id: 4,
    title: "Prototyping, Handoff & Building a Real Design System",
    status: "locked",
    xp: 100,
    description:
      "The last mile of design is making your work usable — by developers, by testers, by your future self. This module covers interactive prototyping, developer handoff, and building a design system from scratch. It is also where you build a portfolio piece you can actually show in interviews.",
    resources: [
      { id: "u4a", type: "docs", title: "Figma Prototyping — interactions and animations", source: "Figma Help", url: "https://help.figma.com/hc/en-us/articles/360040314193-Guide-to-prototyping-in-Figma", duration: "20 min", why: "Figma's prototyping is powerful but easy to misuse. The official guide shows you the right way to structure interactions." },
      { id: "u4b", type: "article", title: "Design systems — what they are and why you need one", source: "Atlassian", url: "https://www.atlassian.com/blog/design/5-reasons-why-your-team-needs-a-design-system", duration: "10 min", why: "Atlassian built one of the most mature design systems (Atlaskit). Their explanation of why to build one is grounded in real experience." },
      { id: "u4c", type: "tool", title: "Storybook — document and test your components", source: "Storybook", url: "https://storybook.js.org/docs/get-started", duration: "20 min", why: "Storybook is how design systems get documented and tested in code. Used by Airbnb, Shopify, IBM." },
      { id: "u4d", type: "article", title: "How to write design specs developers actually follow", source: "UX Collective", url: "https://uxdesign.cc/how-to-write-design-specs-that-developers-will-actually-follow-78c274a3f6ab", duration: "15 min", why: "Most design handoffs fail because designers annotate the wrong things. This explains exactly what developers need to see." },
      { id: "u4e", type: "docs", title: "Figma Dev Mode — inspect and export code", source: "Figma Help", url: "https://help.figma.com/hc/en-us/articles/15023124644247-Guide-to-Dev-Mode", duration: "15 min", why: "Dev Mode turns your designs into inspect-ready screens with CSS values, spacing tokens, and exportable assets." },
    ],
    projectBrief: {
      title: "Design a Full Product — AI to Figma to Live Prototype",
      tagline: "Go from idea to clickable prototype in one sitting.",
      description:
        "This is your capstone design project. Pick a real problem you want to solve — something for college students, something for your city, anything genuine. Use Claude to define the product, v0 to generate the initial screens, Figma to refine into a proper design system, and Framer to make it click-through and shareable. Build something you would actually show in a design interview.",
      features: [
        "Step 1: claude.ai → ask: 'I want to build [app idea]. Who is the exact user? What is the core problem? What are the 5 most important screens? What should the app feel like (describe the visual mood)?' Use Claude's answers as your design brief.",
        "Step 2: v0.dev → generate the 5 most important screens one by one. Iterate each until it looks right.",
        "Step 3: Open Figma → create your color system: pick one primary color, one accent, define light/dark backgrounds, text hierarchy (4 sizes). Create these as Figma variables.",
        "Step 4: Rebuild all 5 screens in Figma using your color system. Use Auto Layout everywhere. Create reusable components for anything repeated.",
        "Step 5: Add prototype connections — every button goes somewhere, every back arrow works",
        "Step 6: Share the Figma prototype link publicly",
        "Step 7: gamma.app → prompt: 'Create a product design showcase for [app name]: problem statement, user persona, design decisions, 5 key screens, what I learned. Portfolio style.' Add your Figma screenshots.",
      ],
      techStack: ["Claude (product definition)", "v0.dev (initial screen generation)", "Figma (design system + prototype)", "Gamma (portfolio case study)"],
      estimatedHours: 5,
      difficulty: "Intermediate",
      starterTip:
        "The best design portfolio piece is a problem that is personal to you. If you struggled with something at college, if your city has a problem, if your parents face a daily friction — design the solution. Interviewers can tell the difference between a portfolio piece someone cared about and one they did just to tick a box. Real problems = real passion = real interviews.",
      realReference: "https://figma.com",
    },
  },
];

export const FULLSTACK_MODULES: Module[] = [
  {
    id: 1,
    title: "HTML, CSS & Tailwind — Build Anything You Can Imagine",
    status: "in-progress",
    xp: 50,
    description:
      "HTML and CSS are not just fundamentals — they are the output layer that every user sees. Most developers skip this and write terrible UI. This module gives you a practical, opinionated foundation using Tailwind CSS, the tool used by almost every modern React project including this one.",
    resources: [
      { id: "f1a", type: "docs", title: "MDN HTML — The complete reference", source: "Mozilla MDN", url: "https://developer.mozilla.org/en-US/docs/Learn/HTML", duration: "Self-paced", why: "MDN is the most trusted HTML reference. Use it as a textbook, not a read-through. Look things up as you build." },
      { id: "f1b", type: "docs", title: "CSS Flexbox — the layout system everything uses", source: "CSS Tricks", url: "https://css-tricks.com/snippets/css/a-guide-to-flexbox/", duration: "20 min", why: "The most referenced CSS article ever. Bookmark it. You will return to it 100 times." },
      { id: "f1c", type: "docs", title: "Tailwind CSS — Core concepts", source: "Tailwind Docs", url: "https://tailwindcss.com/docs/utility-first", duration: "30 min", why: "Read the first 5 sections of the docs, not tutorials. Understand why utility classes exist before using them." },
      { id: "f1d", type: "video", title: "Build a landing page with Tailwind CSS", source: "Traversy Media", url: "https://www.youtube.com/watch?v=dFgzHOX84xQ", duration: "45 min", why: "Traversy Media's Tailwind tutorial is the most practical starting point. Build while watching." },
      { id: "f1e", type: "tool", title: "Tailwind Play — Browser playground, no setup", source: "Tailwind", url: "https://play.tailwindcss.com", duration: "10 min", why: "Try Tailwind classes instantly in your browser. The fastest way to learn what each class does." },
    ],
    projectBrief: {
      title: "Personal Landing Page — Ship Your First Real Webpage",
      tagline: "The first page you would actually share with someone.",
      description:
        "Build a personal landing page using HTML and Tailwind CSS. No JavaScript, no React — just clean markup and utility classes. The page must work on mobile and desktop without any JavaScript. This forces you to master Tailwind's responsive utilities, which are the foundation of everything you will build later.",
      features: [
        "Hero section: name, one-liner bio, CTA button",
        "About section: 3-4 sentences, a photo or placeholder",
        "Skills or projects section: 3-4 cards",
        "Contact section: email link, social links",
        "Fully responsive: mobile-first, tested at 375px, 768px, 1280px",
        "No JavaScript: works entirely with HTML and Tailwind",
        "Dark/light using Tailwind's dark: prefix",
      ],
      techStack: ["HTML", "Tailwind CSS (CDN)", "Netlify (free deploy)"],
      estimatedHours: 5,
      difficulty: "Beginner",
      starterTip: "Use Tailwind's mobile-first approach: write the mobile layout first, then use 'md:' and 'lg:' prefixes to change it for larger screens. Most beginners do it backwards and get confused. The rule: no prefix = mobile, md: = tablet, lg: = desktop.",
      realReference: "https://tailwindcss.com/docs/responsive-design",
    },
  },
  {
    id: 2,
    title: "React — The UI Library That Runs the Modern Web",
    status: "locked",
    xp: 75,
    description:
      "React is the most used UI library in the world. This module skips the theory and teaches you what you actually need to build real interfaces: components, state, effects, and fetching data from an API. Every concept is introduced through something you ship.",
    resources: [
      { id: "f2a", type: "docs", title: "React Official Docs — new interactive tutorial", source: "React", url: "https://react.dev/learn", duration: "3-4 hours", why: "The 2023 React docs are the best resource ever written for learning React. The old tutorials are outdated — only use react.dev." },
      { id: "f2b", type: "docs", title: "useState and useEffect explained properly", source: "React Docs", url: "https://react.dev/reference/react/useState", duration: "30 min", why: "90% of React bugs come from misunderstanding useState and useEffect. Read the official reference, not a blog post." },
      { id: "f2c", type: "video", title: "React in 100 seconds", source: "Fireship", url: "https://www.youtube.com/watch?v=Tn6-PIqc4UM", duration: "2 min", why: "The fastest mental model for what React actually does before you write a single line." },
      { id: "f2d", type: "docs", title: "TanStack Query — the right way to fetch data in React", source: "TanStack", url: "https://tanstack.com/query/latest/docs/framework/react/overview", duration: "25 min", why: "Raw useEffect for data fetching is an anti-pattern. TanStack Query handles loading, caching, refetching, and errors. This is what production apps use (including this one)." },
      { id: "f2e", type: "article", title: "React patterns every developer should know", source: "Patterns.dev", url: "https://www.patterns.dev/react", duration: "Self-paced", why: "Reference: how senior React developers think about structuring components. Read the Container/Presentational and Custom Hook patterns." },
    ],
    projectBrief: {
      title: "GitHub Profile Explorer — Real API, Real React",
      tagline: "Search any GitHub user and see their repos, stats, and activity.",
      description:
        "Build a GitHub profile explorer using the GitHub public API (no auth needed, 60 requests/min free). Type a username, see their profile, repos, stars, and follower count. Loading states, error handling, and empty states included. This project forces you to use real async data, which is 80% of what React apps do.",
      features: [
        "Search input: type a GitHub username",
        "User profile: avatar, name, bio, followers, following, public repos",
        "Repo list: title, description, stars, forks, language badge",
        "Sort repos by: most starred, most recently updated",
        "Loading skeleton while fetching",
        "Error state: user not found message",
        "Click any repo to open it on GitHub",
      ],
      techStack: ["React 18", "TanStack Query", "Tailwind CSS", "GitHub REST API", "Vite"],
      estimatedHours: 8,
      difficulty: "Beginner",
      starterTip: "Use TanStack Query's useQuery hook for all API calls. Pass the username as the query key — the query re-runs automatically when it changes. You get loading, error, and data states for free. No useEffect, no useState for loading, no manual error handling.",
      realReference: "https://tanstack.com/query/latest/docs/framework/react/overview",
    },
  },
  {
    id: 3,
    title: "Backend, Authentication & Databases with Supabase",
    status: "locked",
    xp: 75,
    description:
      "Every real app needs a backend. Supabase gives you a Postgres database, authentication, file storage, and real-time subscriptions — all from a React app — without writing server code. This is how this entire platform was built.",
    resources: [
      { id: "f3a", type: "docs", title: "Supabase Quickstart for React", source: "Supabase", url: "https://supabase.com/docs/guides/getting-started/quickstarts/reactjs", duration: "20 min", why: "The official Supabase + React quickstart. Gets you from zero to a working app with auth in 20 minutes." },
      { id: "f3b", type: "docs", title: "Row Level Security — the right way to secure data", source: "Supabase", url: "https://supabase.com/docs/guides/database/postgres/row-level-security", duration: "25 min", why: "RLS is what stops users from reading each other's data. Skipping this means any user can read your entire database. Not optional." },
      { id: "f3c", type: "docs", title: "Supabase Auth — email, Google, GitHub login", source: "Supabase", url: "https://supabase.com/docs/guides/auth", duration: "20 min", why: "Supabase Auth handles password hashing, JWT tokens, session management — everything you would spend weeks building yourself." },
      { id: "f3d", type: "docs", title: "Supabase Storage — upload files and images", source: "Supabase", url: "https://supabase.com/docs/guides/storage", duration: "15 min", why: "File uploads (avatars, attachments) are a common requirement. Supabase Storage integrates with their auth so files are automatically protected." },
      { id: "f3e", type: "docs", title: "PostgreSQL for beginners", source: "Supabase Blog", url: "https://supabase.com/blog/postgres-full-text-search", duration: "20 min", why: "Supabase is Postgres under the hood. Knowing basic SQL makes you 10x more productive with Supabase — you can write custom queries, joins, and filters." },
    ],
    projectBrief: {
      title: "Full-Stack Notes App — With Auth, Data & Storage",
      tagline: "Build something you could actually charge money for.",
      description:
        "Build a notes app with real authentication, a Supabase database, and image attachment support. Users sign up, create and edit their own notes, and upload images. Notes are private by default — RLS ensures no user can ever see another's notes. Deploy it publicly on Vercel.",
      features: [
        "Supabase email auth: sign up, log in, log out",
        "Create, read, update, delete notes (CRUD)",
        "Notes table with RLS: only owner can read/write",
        "Rich text editor (use TipTap — free and powerful)",
        "Image upload to Supabase Storage (attach to notes)",
        "Real-time sync: update in one tab, see it in another",
        "Search notes by title (Supabase full-text search)",
        "Deployed on Vercel with Supabase env vars",
      ],
      techStack: ["React", "Supabase (database + auth + storage)", "TipTap editor", "TanStack Query", "Tailwind CSS", "Vercel"],
      estimatedHours: 12,
      difficulty: "Intermediate",
      starterTip: "Set up RLS before you write any data-fetching code. Create the table, enable RLS, write the policy, test it in the SQL editor. Then build the frontend. Most beginners do it the other way and ship an app where any authenticated user can read all data in the database.",
      realReference: "https://supabase.com/docs/guides/database/postgres/row-level-security",
    },
  },
  {
    id: 4,
    title: "Production — Ship Something Real People Can Use",
    status: "locked",
    xp: 100,
    description:
      "The gap between 'localhost works' and 'production is running' is where most student projects die. This module covers deployment, environment variables, error monitoring, performance, and SEO — the unglamorous work that separates a project from a product.",
    resources: [
      { id: "f4a", type: "docs", title: "Vercel deployment guide for React", source: "Vercel", url: "https://vercel.com/guides/deploying-react-with-vercel", duration: "15 min", why: "Vercel is the fastest way to deploy a React app with a real URL. Free tier is more than enough for a real product." },
      { id: "f4b", type: "docs", title: "Next.js App Router — the production-grade React framework", source: "Next.js", url: "https://nextjs.org/docs/app", duration: "Self-paced", why: "When you outgrow Vite+React, Next.js is what you upgrade to. It adds SSR, SEO, image optimisation, and API routes — all needed for production." },
      { id: "f4c", type: "docs", title: "Sentry — error monitoring for free", source: "Sentry", url: "https://docs.sentry.io/platforms/javascript/guides/react/", duration: "15 min", why: "Sentry tells you when your app crashes in production, what the error was, and what the user was doing. Free tier handles thousands of errors. Not knowing when your app breaks is not a viable strategy." },
      { id: "f4d", type: "docs", title: "Core Web Vitals — how Google measures your performance", source: "web.dev", url: "https://web.dev/explore/learn-core-web-vitals", duration: "20 min", why: "Google uses Core Web Vitals to rank pages. LCP, FID, CLS — know what they mean and how to fix them." },
      { id: "f4e", type: "tool", title: "Lighthouse — audit your app for performance, SEO, accessibility", source: "Google", url: "https://developer.chrome.com/docs/lighthouse/overview", duration: "10 min", why: "Run Lighthouse on any URL, get a 0-100 score with exact fixes. Your goal: 90+ on all four metrics before calling anything production-ready." },
    ],
    projectBrief: {
      title: "Production Deployment — Your Best Project, Live and Monitored",
      tagline: "Turn a project into a product.",
      description:
        "Take your best project from modules 1-3. Deploy it publicly, set up error monitoring, optimise it until Lighthouse scores 90+ on Performance, Accessibility, and SEO. Write a one-page post-mortem: what you built, what broke, how you fixed it, what you would do differently.",
      features: [
        "Production deployment on Vercel (custom domain optional)",
        "Environment variables properly set (no keys in code)",
        "Sentry error monitoring integrated and tested",
        "Lighthouse audit: 90+ Performance, 90+ Accessibility, 90+ SEO",
        "Meta tags: title, description, og:image for social sharing",
        "robots.txt and sitemap.xml",
        "404 page that doesn't look broken",
        "Post-mortem doc: 500 words on what you built and learned",
      ],
      techStack: ["Vercel", "Sentry", "Lighthouse", "Next.js (optional migration)", "GitHub Actions (optional CI)"],
      estimatedHours: 10,
      difficulty: "Intermediate",
      starterTip: "The fastest Lighthouse wins: add loading='lazy' to all images, add width and height attributes to all img tags, and add a meta description. Those three changes alone can take a 40 → 80 in Performance and SEO. Then address the specific issues Lighthouse flags.",
      realReference: "https://vercel.com/guides/deploying-react-with-vercel",
    },
  },
];

export const STARTUP_MODULES: Module[] = [
  {
    id: 1,
    title: "Validate Before You Build — How to Not Waste 6 Months",
    status: "in-progress",
    xp: 50,
    description:
      "Most startups fail because they build something nobody wants. Validation is how you find out if your idea has legs before you write a single line of code. This module teaches the frameworks used by Y Combinator founders to stress-test ideas in days instead of months.",
    resources: [
      { id: "s1a", type: "article", title: "How to get startup ideas — Paul Graham's essay", source: "PaulGraham.com", url: "https://paulgraham.com/startupideas.html", duration: "20 min", why: "The most referenced startup essay ever. Graham explains why the best ideas come from your own frustrations, not brainstorming." },
      { id: "s1b", type: "article", title: "The Mom Test — how to talk to customers", source: "Rob Fitzpatrick", url: "https://www.momtestbook.com", duration: "30 min", why: "The most important customer interview book. Your mom will lie to you. Your target customer will also lie — unless you ask the right questions. This teaches you how." },
      { id: "s1c", type: "video", title: "How to validate a startup idea in 24 hours", source: "Y Combinator", url: "https://www.youtube.com/watch?v=1hHMwLxN6EM", duration: "25 min", why: "YC partners explain their actual validation playbook. Watch this after reading The Mom Test." },
      { id: "s1d", type: "article", title: "Jobs to be Done framework", source: "HBS Working Knowledge", url: "https://hbsp.harvard.edu/inspiring-minds/the-jobs-to-be-done-theory-of-innovation", duration: "15 min", why: "People don't buy products — they hire them to do a job. Understanding the job your product does is what separates great positioning from generic." },
      { id: "s1e", type: "tool", title: "Typeform — free survey tool for customer research", source: "Typeform", url: "https://www.typeform.com", duration: "10 min", why: "Use Typeform to run quick validation surveys. 40 responses to 5 targeted questions gives you enough signal to make a decision." },
    ],
    projectBrief: {
      title: "Validation Sprint — 20 Conversations in 7 Days",
      tagline: "Find out if people will pay before you build anything.",
      description:
        "Pick an idea you care about. In 7 days, have 20 conversations with potential customers using The Mom Test techniques. No pitching — only listening. Document what you heard. Decide: pivot, continue, or kill. The deliverable is a one-page validation report, not a product.",
      features: [
        "Problem hypothesis: one sentence describing the pain you are solving",
        "Target customer profile: 3 specific demographic/behavioural traits",
        "Interview script: 5-7 Mom Test questions (no hypotheticals)",
        "20 conversations: DMs, WhatsApp, college groups, Reddit — any channel",
        "Evidence log: quotes and observations from each conversation",
        "Pattern analysis: what did 3+ people say unprompted?",
        "Go/No-Go decision with evidence-backed reasoning",
        "If Go: pricing assumption test — would they pay? How much?",
      ],
      techStack: ["Notion (interview log)", "Typeform (optional screener survey)", "WhatsApp / LinkedIn / Twitter (outreach)"],
      estimatedHours: 7,
      difficulty: "Beginner",
      starterTip: "The magic question from The Mom Test: 'Tell me about the last time you experienced [problem].' Not 'Would you use X?' People answer honestly about the past. They lie about what they would do in the future. Every interview should spend 80% of time on their past behaviour, 20% on your idea.",
      realReference: "https://www.momtestbook.com",
    },
  },
  {
    id: 2,
    title: "Build an MVP — Ship in 2 Weeks, Not 2 Years",
    status: "locked",
    xp: 75,
    description:
      "An MVP is not a smaller version of your idea — it is a tool to learn. The goal is the minimum amount of product needed to answer your riskiest assumption. This module teaches you how to scope ruthlessly, build fast, and launch before you feel ready.",
    resources: [
      { id: "s2a", type: "article", title: "The Lean Startup — minimum viable product explained", source: "Eric Ries", url: "https://theleanstartup.com/principles", duration: "15 min", why: "The framework behind every modern startup methodology. Understand build-measure-learn before building anything." },
      { id: "s2b", type: "video", title: "How to build an MVP in one week", source: "Y Combinator", url: "https://www.youtube.com/watch?v=jHyU54GhfGs", duration: "20 min", why: "YC founders explain their actual approach. The key insight: your first version will be embarrassing — that is the point." },
      { id: "s2c", type: "tool", title: "Lovable — ship a full-stack app from a prompt", source: "Lovable", url: "https://lovable.dev", duration: "20 min", why: "The fastest way to build a functional MVP with a real database and authentication. Describe what you want, get working code. Used by this platform." },
      { id: "s2d", type: "article", title: "The Riskiest Assumption Test — what to build first", source: "Inspired by Marty Cagan", url: "https://www.svpg.com/the-nature-of-product/", duration: "15 min", why: "Before scoping your MVP, ask: what is the one thing that, if wrong, kills the whole idea? Build the smallest test of that assumption first." },
      { id: "s2e", type: "tool", title: "Linear — project management built for startups", source: "Linear", url: "https://linear.app", duration: "10 min", why: "Free for small teams. Better than Jira, better than Trello. Used by every serious startup. Track your 2-week MVP sprint here." },
    ],
    projectBrief: {
      title: "MVP Launch — From Idea to First 10 Users in 14 Days",
      tagline: "Build the smallest thing that proves your idea works.",
      description:
        "Using your validation from Module 1, build and launch an MVP in 14 days. Define your riskiest assumption. Build only what tests it. Get 10 real users (not friends) to use it. Document what you learned. The success metric is not 'it works' — it is 'we learned whether the core value holds.'",
      features: [
        "One-sentence value prop: who it helps, what it does, why now",
        "Riskiest assumption defined: the one thing that could kill the idea",
        "MVP scope: list of features IN and explicitly OUT (the out list matters more)",
        "Working product: deployed with real URL, handles real user data",
        "10 non-friend users: acquired through genuine outreach, not 'please help me'",
        "Usage data: what did those 10 people actually do?",
        "Retention metric: did any of them come back without being asked?",
        "Learnings doc: 3 things you got right, 3 things you got wrong",
      ],
      techStack: ["Lovable (frontend + backend)", "Supabase (data)", "Vercel (deploy)", "PostHog (free analytics)", "Linear (sprint tracking)"],
      estimatedHours: 20,
      difficulty: "Intermediate",
      starterTip: "The most common MVP mistake: building all the features and none of the distribution. Before writing code, decide exactly how you will get 10 real users. If you cannot describe your acquisition channel, do not start building. Distribution is harder than product. Always.",
      realReference: "https://theleanstartup.com/principles",
    },
  },
  {
    id: 3,
    title: "Distribution — How to Get Your First 100 Users",
    status: "locked",
    xp: 75,
    description:
      "Building the product is less than half the battle. Most student startups die not because the product is bad but because nobody hears about it. Distribution is a skill you can learn. This module teaches the actual playbooks used by early-stage founders to acquire their first users.",
    resources: [
      { id: "s3a", type: "article", title: "Traction — 19 channels, pick one and go deep", source: "Gabriel Weinberg", url: "https://www.amazon.in/Traction-Startup-Achieve-Explosive-Customer/dp/0241242533", duration: "Self-paced", why: "The most comprehensive playbook on distribution. The core idea: most startups succeed by going deep on one channel, not shallow on many." },
      { id: "s3b", type: "video", title: "How to grow from 0 to 1000 users", source: "Y Combinator", url: "https://www.youtube.com/watch?v=z2_NtEHjT3g", duration: "28 min", why: "Real YC founders share the exact tactics they used to get first users. No theory — specific playbooks for specific stages." },
      { id: "s3c", type: "article", title: "Do things that don't scale — Paul Graham", source: "PaulGraham.com", url: "https://paulgraham.com/ds.html", duration: "12 min", why: "The most important essay for early-stage founders. The best early user acquisition is manual and personal, not automated. Instagram's founders personally messaged every early user." },
      { id: "s3d", type: "tool", title: "PostHog — free product analytics", source: "PostHog", url: "https://posthog.com", duration: "15 min", why: "PostHog gives you full product analytics (events, funnels, session recordings) for free. Know exactly where users drop off." },
      { id: "s3e", type: "article", title: "How to launch on Product Hunt", source: "Product Hunt Maker Guide", url: "https://www.producthunt.com/stories/maker-toolkit", duration: "15 min", why: "Product Hunt can send 500-2000 visitors in a day for free. Understand how launches work before you press go." },
    ],
    projectBrief: {
      title: "Growth Sprint — 100 Real Users in 30 Days",
      tagline: "Build a distribution engine, not just a product.",
      description:
        "Pick one distribution channel and go deep for 30 days. Track every acquisition attempt, conversion rate, and what messages worked. The deliverable is a distribution playbook — documented proof that you know how to get users for your specific product, with data to back it up.",
      features: [
        "Channel selection: pick one (Reddit, college WhatsApp groups, cold email, content, partnerships)",
        "Acquisition target: 100 real users (verified by PostHog signups, not analytics pageviews)",
        "Message testing: 3 different value proposition framings, track which converts",
        "Funnel setup: landing page → signup → first key action (measure each step)",
        "Weekly retrospective: what worked, what failed, adjust next week",
        "PostHog dashboard: DAU, activation rate, D7 retention",
        "Distribution playbook: 2-page doc of repeatable tactics that worked",
      ],
      techStack: ["PostHog (analytics)", "Mailchimp or loops.so (email)", "Notion (playbook doc)", "Canva (social assets if needed)"],
      estimatedHours: 15,
      difficulty: "Intermediate",
      starterTip: "College WhatsApp groups are the most underused distribution channel for student-focused products. A genuine, personal message about a real problem gets 10x the response rate of any ad. Write 20 personal messages before you build any automated outreach. Personal always beats programmatic at the start.",
      realReference: "https://paulgraham.com/ds.html",
    },
  },
  {
    id: 4,
    title: "Metrics, Retention & the Path to Revenue",
    status: "locked",
    xp: 100,
    description:
      "Acquiring users is not enough. The difference between a startup and a project is retention — do users come back? This module teaches you what to measure, how to set up real revenue, and how to build the pitch that gets investors and accelerators to take you seriously.",
    resources: [
      { id: "s4a", type: "article", title: "The only metrics that matter for early-stage startups", source: "Andreessen Horowitz", url: "https://a16z.com/16-metrics/", duration: "20 min", why: "a16z explains exactly which metrics investors look at and how to calculate them. Know these before any investor meeting." },
      { id: "s4b", type: "article", title: "Retention is the metric that predicts success", source: "Andrew Chen", url: "https://andrewchen.com/retention-is-king/", duration: "15 min", why: "Andrew Chen (Andreessen Horowitz partner) explains why retention predicts everything else, including revenue and valuation." },
      { id: "s4c", type: "docs", title: "Razorpay — accept payments in India in 30 minutes", source: "Razorpay", url: "https://razorpay.com/docs/payment-gateway/web-integration/", duration: "25 min", why: "For India-based products, Razorpay is the fastest way to accept payments. Integrates in 30 minutes, supports UPI, cards, net banking." },
      { id: "s4d", type: "video", title: "How to build a seed-stage pitch deck", source: "Y Combinator", url: "https://www.youtube.com/watch?v=17XZGUX_9iM", duration: "30 min", why: "YC's actual guidance on what a seed-stage deck should contain. 10 slides, no fluff, each slide answers one question investors ask." },
      { id: "s4e", type: "article", title: "How to apply to YC — the real requirements", source: "Y Combinator", url: "https://www.ycombinator.com/apply", duration: "15 min", why: "Understanding what YC actually looks for helps you build a more fundable company from day one, not retrofit the story later." },
    ],
    projectBrief: {
      title: "Path to Revenue — Charge Your First Paying Customer",
      tagline: "The day someone pays is the day you have a business.",
      description:
        "Integrate a payment system, set pricing, and get your first paying customer. The goal is not revenue — it is proof that someone values your product enough to spend money on it. Build a seed-stage pitch deck alongside it. Present to 3 people outside your circle and use their questions to improve the deck.",
      features: [
        "Pricing page: free tier + one paid tier (minimum viable pricing)",
        "Payment integration: Razorpay (India) or Stripe (international)",
        "First paying customer: any amount — ₹1 counts as proof",
        "Key metrics dashboard: DAU, D7/D30 retention, MRR, churn",
        "10-slide pitch deck: problem, solution, market, traction, team, ask",
        "3 pitch practice sessions: different audience each time",
        "Investor objections doc: most common questions + your answers",
      ],
      techStack: ["Razorpay or Stripe", "PostHog (metrics)", "Google Slides (deck)", "Loom (async demo video)"],
      estimatedHours: 14,
      difficulty: "Advanced",
      starterTip: "Set your pricing before you build the payment page. The best way to find pricing: ask your most engaged free users 'If this feature disappeared tomorrow, how upset would you be?' The ones who say Very Upset are your paid tier. Ask them what they would pay. Most founders underprice by 3-5x.",
      realReference: "https://a16z.com/16-metrics/",
    },
  },
];

// Keep backward compatibility
// initialModules is already exported above as the AI & ML track

/**
 * Returns the correct modules for a given track name.
 * Falls back to AI & Machine Learning if the track is not recognised.
 */
export function getTrackModules(track: string): Module[] {
  const map: Record<string, Module[]> = {
    "AI & Machine Learning": initialModules,
    "UI/UX Design":          UIUX_MODULES,
    "Full Stack Dev":        FULLSTACK_MODULES,
    "Build a Startup":       STARTUP_MODULES,
  };
  return map[track] ?? initialModules;
}