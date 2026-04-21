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
      title: "Token Cost Calculator",
      tagline: "Know exactly what your AI calls cost before you send them.",
      description:
        "Build a web tool where developers paste any prompt + system prompt, select a Claude model, and instantly see the token count and estimated API cost. Adds an \"optimize\" button that asks Claude to shorten the prompt while preserving intent — and shows the cost savings.",
      features: [
        "Paste prompt + system prompt in two text areas",
        "Real-time token count using tiktoken or Claude tokenizer",
        "Model selector: Haiku / Sonnet / Opus with pricing per token",
        "Live cost estimate updates as you type",
        "Optimize button: sends prompt to Claude asking it to shorten while preserving meaning",
        "Shows before/after token count + cost saved",
        "Copy optimized prompt button",
      ],
      techStack: ["React or HTML/JS", "Claude API", "Anthropic tokenizer or tiktoken-js"],
      estimatedHours: 5,
      difficulty: "Beginner",
      starterTip:
        "Use the Anthropic token counting API endpoint: POST /v1/messages/count_tokens — it returns exact token counts without making a full API call.",
      realReference: "https://docs.anthropic.com/en/api/counting-tokens",
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
      title: "System Prompt Stress Tester",
      tagline: "Find the holes in your system prompt before your users do.",
      description:
        "Build a tool where developers input a system prompt for their AI app, then Claude automatically generates 10 adversarial test cases — prompts that might break, confuse, or jailbreak the system prompt. Each test case runs against the system prompt and Claude judges whether the output was safe and on-topic.",
      features: [
        "System prompt input textarea",
        "Generate 10 adversarial test cases button — calls Claude to create edge case inputs",
        "Auto-runs each test case against the system prompt",
        "Claude-as-judge: third Claude call evaluates each response as Pass/Fail with reason",
        "Results table: test input | response | verdict | reason",
        "Overall safety score (X/10 passed)",
        "Export results as markdown report",
      ],
      techStack: ["React", "Claude API", "Promise.all for parallel calls"],
      estimatedHours: 8,
      difficulty: "Intermediate",
      starterTip:
        "Use three separate Claude roles: Generator (creates adversarial inputs), Responder (runs with the system prompt), Judge (evaluates output). Each role gets its own system prompt. This is called LLM-as-judge.",
      realReference: "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview",
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
      title: "AI Code Reviewer",
      tagline: "Paste code. Get a senior engineer review in 10 seconds.",
      description:
        "Build a code review tool where developers paste any code snippet, select the language, and Claude gives a structured review covering: bugs found, security issues, performance problems, readability suggestions, and a rewritten improved version. Streams the response so it feels instant.",
      features: [
        "Code input with syntax highlighting (use CodeMirror or Monaco)",
        "Language selector dropdown",
        "Streaming response — review appears word by word",
        "Structured output sections: Bugs | Security | Performance | Style | Rewrite",
        "Copy rewritten code button",
        "Severity badges on each issue: Critical / Warning / Suggestion",
        "Share review as URL (encode state in URL params)",
      ],
      techStack: ["React", "Claude API with streaming", "Vercel AI SDK useCompletion", "CodeMirror"],
      estimatedHours: 8,
      difficulty: "Intermediate",
      starterTip:
        'Use the Vercel AI SDK useCompletion hook — it handles streaming from Claude in React in about 5 lines of code. System prompt structure: "You are a senior engineer. Review this {language} code. Return your review in exactly this format: [BUGS], [SECURITY], [PERFORMANCE], [STYLE], [REWRITE]."',
      realReference: "https://sdk.vercel.ai/docs/ai-sdk-ui/overview",
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
      title: "Resume Intelligence Engine",
      tagline: "Upload a resume. Get structured data + hiring insights.",
      description:
        "Build a tool that takes a resume PDF or paste, extracts all information as structured JSON using Claude tool use, then generates: an ATS compatibility score, missing keywords for a target job description, a rewrite of the weakest bullet point, and 3 interview questions the candidate should prepare for.",
      features: [
        "Resume input: paste text or upload PDF (use Claude Files API)",
        "Optional: paste target job description",
        "Claude tool use extracts structured data: {name, skills[], experience[], education[], gaps[]}",
        "ATS score (0-100) with breakdown of what is missing",
        "Keyword gap analysis against job description",
        "Weakest bullet point rewrite with before/after",
        "3 likely interview questions based on resume gaps",
        "JSON export of extracted resume data",
      ],
      techStack: ["React or Streamlit", "Claude API tool use", "Anthropic Files API", "Pydantic or Zod"],
      estimatedHours: 10,
      difficulty: "Intermediate",
      starterTip:
        "Define a tool called extract_resume_data with a strict JSON schema for every field. Claude will be forced to return valid structured data matching your schema. Then make a second Claude call for the analysis using the extracted JSON as context.",
      realReference: "https://docs.anthropic.com/en/docs/build-with-claude/tool-use",
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
      title: "College Knowledge Bot",
      tagline: "Your college website, finally answerable.",
      description:
        "Build a RAG chatbot trained on your college website content. Scrape 20-30 pages (admissions, fees, hostel, exam rules, clubs), embed them with pgvector in Supabase, and let students ask natural language questions. Claude answers using only the actual college data — no hallucinations.",
      features: [
        "Scrape 20-30 college website pages using BeautifulSoup",
        "Chunk text into 400-word segments with 50-word overlap",
        "Embed chunks using OpenAI text-embedding-3-small",
        "Store in Supabase with pgvector extension",
        "Chat UI: user types question",
        "Question gets embedded, top 3 similar chunks retrieved",
        "Claude answers using ONLY retrieved chunks as context",
        "Show sources: which pages the answer came from",
        'If answer not found: "I could not find this in the college data"',
        "Deploy on Streamlit Cloud",
      ],
      techStack: ["Python", "Streamlit", "BeautifulSoup", "OpenAI embeddings", "Supabase pgvector", "Claude API", "LangChain"],
      estimatedHours: 14,
      difficulty: "Intermediate",
      starterTip:
        'The retrieval prompt is everything. Tell Claude: "You are a college assistant. Answer ONLY using the context below. If the answer is not in the context, say exactly: I could not find this information. Never make up information." Then append the retrieved chunks.',
      realReference: "https://python.langchain.com/docs/tutorials/rag/",
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
      title: "Deep Research Agent",
      tagline: "Give it a question. It reads the web and writes a report.",
      description:
        "Build a multi-step research agent using Claude tool use and LangGraph. The agent takes a research question, plans sub-questions, searches the web for each, reads the top articles, and synthesizes a structured research report with citations. Show the agent thinking in real time.",
      features: [
        "Research question input",
        "Agent planning step: Claude breaks question into 3-5 sub-questions",
        "For each sub-question: web_search tool call",
        "web_fetch tool to read full article content",
        "Agent synthesizes all gathered info into structured report",
        "Report format: Executive Summary | Key Findings | Evidence | Contradictions | Open Questions | Sources",
        "Real-time agent thinking display (streaming each step)",
        "Export report as markdown",
        "Show total sources read + time taken",
      ],
      techStack: ["Python", "Claude API tool use", "LangGraph", "Streamlit", "Tavily Search API (free tier)"],
      estimatedHours: 14,
      difficulty: "Advanced",
      starterTip:
        "Use Tavily API for web search (https://tavily.com — free tier, built for AI agents). Define two tools: search_web(query) and fetch_page(url). Use LangGraph to manage the agent loop: plan → search → read → synthesize → done.",
      realReference: "https://langchain-ai.github.io/langgraph/tutorials/introduction/",
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
      title: "Lecture Audio to Study Kit",
      tagline: "Record a lecture. Get notes, flashcards, and a quiz.",
      description:
        "Build a tool that takes any lecture audio file, transcribes it with Whisper, then uses Claude to generate: a structured notes document, 15 flashcards, a 10-question quiz with answers, and a concept map showing how ideas connect. Everything exported as a downloadable study pack.",
      features: [
        "Audio file upload (MP3, WAV, M4A up to 25MB)",
        "Transcribe with OpenAI Whisper API",
        "Show live transcription as it processes",
        "Claude generates structured notes with headings",
        "Claude generates 15 Q&A flashcards as JSON",
        "Claude generates 10 MCQ quiz questions with correct answers",
        "Claude generates concept map as a Mermaid diagram",
        "Interactive flashcard flip UI",
        "Quiz mode with scoring",
        "Export all as ZIP: notes.md, flashcards.json, quiz.pdf",
      ],
      techStack: ["React or Streamlit", "OpenAI Whisper API", "Claude API", "Claude vision for concept map", "Mermaid.js"],
      estimatedHours: 14,
      difficulty: "Advanced",
      starterTip:
        "Chain your Claude calls: first call generates notes, second call gets the notes as context and generates flashcards, third call generates quiz. Each call builds on the previous. For the concept map use Claude to write Mermaid diagram syntax then render it with mermaid.js.",
      realReference: "https://platform.openai.com/docs/guides/speech-to-text",
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
      title: "Ship an AI Micro-SaaS — Capstone",
      tagline: "Build one thing really well. Deploy it. Get 10 real users.",
      description:
        "Take your best project from modules 1-7. Turn it into a proper product with auth, usage limits, a landing page, and real deployment. The success criteria is not the code — it is getting 10 people who are not your friends to use it.",
      features: [
        "Polish the core feature to be genuinely useful for one specific user",
        "Add Supabase auth (Google OAuth — one click signup)",
        "Free tier: 5 uses/day tracked in database",
        "Landing page: headline, demo GIF, how it works, CTA",
        "Deploy frontend on Vercel",
        "Deploy backend on Railway (if Python)",
        "Add Langfuse for monitoring what prompts real users send",
        "Submit to one of: Product Hunt, Peerlist, IndieHackers, college group",
        "Write a 500-word build log: what you built, what broke, what you learned",
        "Share your JustBuild portfolio link in the post",
      ],
      techStack: ["Next.js or Streamlit", "Supabase auth + database", "Claude API", "Vercel + Railway", "Langfuse", "Google OAuth"],
      estimatedHours: 25,
      difficulty: "Advanced",
      starterTip:
        'The landing page matters more than the code. Use this formula: "[Tool name] — [what it does] for [who]. [One sentence on why it is different from ChatGPT]." Add a demo GIF (record with Loom, convert to GIF with Ezgif). The GIF on your landing page will 5x your signups.',
      realReference: "https://vercel.com/docs/deployments/overview",
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
      title: "College App Redesign — Validated with 5 Real Users",
      tagline: "Fix one thing that actually frustrates students.",
      description:
        "Pick one feature of your college website or app that you personally find confusing (registration, timetable, fee payment). Interview 5 students to understand their frustration. Write a problem statement using the HMW format. Sketch 3 different solutions. Test your top solution with 3 users using a paper prototype.",
      features: [
        "Interview script: 5 questions that get honest answers",
        "Affinity map: cluster 20+ observations from your interviews",
        "Problem statement: one clear HMW sentence backed by evidence",
        "3 solution sketches: fast, rough, quantity over quality",
        "Paper prototype: printed or drawn screens to test solution 1",
        "Usability test notes: what worked, what confused users",
        "One-page design brief: problem, evidence, proposed solution",
      ],
      techStack: ["Pen and paper", "Figma (sketching)", "Maze (optional testing)", "Google Forms (interview notes)"],
      estimatedHours: 6,
      difficulty: "Beginner",
      starterTip: "The best user interview question is 'Tell me about the last time you tried to [task].' Not 'Would you use this feature?' — people lie about hypothetical behaviour. Real stories give real insights.",
      realReference: "https://www.nngroup.com/articles/user-interviews/",
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
      title: "Mobile App UI — 5 Real Screens in Figma",
      tagline: "Design something you'd actually install.",
      description:
        "Design 5 connected screens for a mobile app of your choice — pick something you genuinely want to exist. Every screen must use Auto Layout, components, and the 8pt grid. The goal is not perfect pixels — it is understanding how a screen connects to the next and how components speed up your workflow.",
      features: [
        "Component library: at minimum Button, Input, Card, Navigation bar",
        "5 screens: Onboarding, Home/Feed, Detail View, Profile, Settings",
        "Auto Layout on every frame — no manual positioning",
        "8pt spacing grid — all gaps and padding divisible by 8",
        "3 component variants: e.g. Button in default, loading, disabled states",
        "Mobile frame: iPhone 14 Pro size (390 × 844)",
        "Prototype: click-through connections between all 5 screens",
      ],
      techStack: ["Figma", "Figma Community (component inspiration)", "iOS or Android UI guidelines"],
      estimatedHours: 8,
      difficulty: "Beginner",
      starterTip: "Start with the component library, not the screens. Build Button, Input, Card first. Then build screens using only your components. When you need to change the button colour, change it in the component — all 5 screens update instantly. This is why components exist.",
      realReference: "https://help.figma.com/hc/en-us/articles/360038662654-Guide-to-components-in-Figma",
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
      title: "Design Audit — Fix a Real App's Visual Problems",
      tagline: "Take a broken UI and make it 10x better.",
      description:
        "Find a real app or website with visual design problems (there are millions — look at your college site, a local business, any government portal). Document exactly what is wrong and why using the vocabulary from this module. Then redesign 2 screens in Figma that fix the problems. Write a brief design rationale explaining each change.",
      features: [
        "Screenshot + annotation: mark 10 specific problems on the original",
        "Problem explanation: for each issue, name the principle it violates",
        "Redesigned screen 1: apply correct typography hierarchy",
        "Redesigned screen 2: apply correct colour contrast (WCAG AA minimum)",
        "Before/after comparison in Figma with matching frame sizes",
        "Design rationale: 300-word doc explaining every major change",
        "Accessibility check: run both screens through Figma's contrast checker",
      ],
      techStack: ["Figma", "Contrast plugin (Figma)", "WCAG contrast checker"],
      estimatedHours: 7,
      difficulty: "Intermediate",
      starterTip: "The fastest way to improve any design: increase contrast between the most important thing on the screen and everything else. Then fix spacing — most beginner designs have inconsistent gaps. Use 8pt multiples everywhere. These two changes alone transform 80% of bad designs.",
      realReference: "https://www.refactoringui.com",
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
      title: "Your Design System — From Tokens to Real Components",
      tagline: "Build the design foundation for any future project.",
      description:
        "Build a complete mini design system in Figma: colour tokens, typography scale, spacing scale, and 8 core components. Document it as if a developer you have never met needs to implement it from scratch. Then use it to design a full 8-screen app and hand it off with complete specs.",
      features: [
        "Color tokens: primary, secondary, neutral (10 shades each), semantic colours",
        "Typography scale: 6 sizes from xs to 3xl with defined weights and line heights",
        "Spacing scale: 8pt-based, t-shirt sizes from xs to 2xl",
        "8 components: Button, Input, Badge, Card, Modal, Toast, Avatar, Navigation",
        "Each component: default + 2 variants + hover + disabled states",
        "8-screen app using only system components",
        "Dev handoff: annotated screens with spacing, colour tokens, component names",
        "Storybook: document 3 components with usage guidelines",
      ],
      techStack: ["Figma", "Figma Tokens plugin", "Storybook (optional)", "Notion (documentation)"],
      estimatedHours: 12,
      difficulty: "Intermediate",
      starterTip: "Name your colours semantically, not literally. Not 'blue-500' but 'color-primary'. Not 'gray-200' but 'color-surface'. When you change the primary colour from blue to green, you only update one token — every component using 'color-primary' updates automatically. This is the whole point of design tokens.",
      realReference: "https://storybook.js.org/docs/get-started",
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