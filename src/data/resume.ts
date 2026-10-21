/** Résumé content, transcribed from Gauri-Patel-Resume.pdf (updated Oct 2026). */

export const RESUME = {
  headline: "Full Stack Developer",
  stack: "Next.js · TypeScript · Tailwind CSS · Zustand · Prisma · AI tools",
  summary:
    "Full stack developer with 2 years of hands-on experience building production apps in Next.js, TypeScript and Tailwind CSS, with Zustand for state management and Prisma for database access. I build responsive, accessible web apps with pagination, filtering, role-based access and secure authentication, and I fix bugs end to end across the frontend and backend. I use AI coding tools (Cursor, Claude Code, Antigravity) daily to debug, refactor and ship faster. Comfortable with fully remote, async workflows and eager to grow through mentorship.",

  experience: [
    {
      role: "Front End Developer",
      company: "Inventive Rhino Pvt. Ltd.",
      location: "Gandhinagar, Gujarat",
      period: "Feb 2024 – Present",
      points: [
        "Built full stack features end to end for enterprise applications using Next.js, TypeScript, Tailwind CSS, Zustand and Prisma.",
        "Fixed bugs ranging from frontend UI regressions to backend API and database query issues across multiple production apps.",
        "Designed and developed admin dashboards with CRUD operations, dynamic filtering, server-side pagination and role-based access control (RBAC).",
        "Integrated REST APIs and built secure login flows with JWT and OAuth, including error handling and request validation.",
        "Used AI tools (Cursor, Claude Code) daily to debug issues, speed up code reviews and accelerate feature delivery.",
        "Improved performance with code splitting, lazy loading and component memoization, reducing initial load time.",
        "Worked with cross-functional teams in Git workflows, took part in code reviews and kept test coverage above 95%.",
      ],
    },
  ],

  projects: [
    {
      title: "AI RepoPilot",
      subtitle: "Full-stack AI software engineer agent",
      tech: "React.js, Node.js, Express.js, TypeScript, Tailwind CSS, Gemini / OpenAI / Claude, RAG, GitHub API, Docker",
      live: "https://repopilotai-delta.vercel.app",
      repo: "https://github.com/HUNNEY1426/Repopilot_AI",
      points: [
        "Built a full stack AI agent that analyzes GitHub repositories, identifies bugs, explains code and assists developers, using LLM APIs (Gemini, OpenAI, Claude).",
        "Implemented a RAG pipeline with code chunking, semantic search and vector embeddings to retrieve relevant source context before generating AI responses.",
        "Designed an AI tool-calling architecture for automated bug detection, code review, test generation, file search and Git operations.",
        "Integrated GitHub APIs for repo exploration, PR review, commit analysis and branch management, with conversation memory across AI sessions.",
        "Built a responsive developer-focused UI with AI chat, code snippets, analysis dashboards and diff views.",
      ],
    },
    {
      title: "Inventive Rhino",
      subtitle: "Company website",
      tech: "React.js, TypeScript, Tailwind CSS, SEO, Performance Optimization",
      live: "https://inventiverhino.com",
      repo: "https://github.com/HUNNEY1426/inventivRhino",
      points: [
        "Built the production frontend for inventiverhino.com from scratch: a responsive, SEO-friendly company website.",
        "Optimized Core Web Vitals and Lighthouse scores with lazy loading, image compression, code splitting and efficient content rendering.",
        "Implemented structured data, semantic HTML, meta tags and accessible design patterns for search visibility and cross-device performance.",
      ],
    },
    {
      title: "AI Terminal Agent",
      subtitle: "AI agent chatbot",
      tech: "Node.js, Express.js, JavaScript, Gemini API, REST API, Commander.js, Git",
      live: "https://agent-lemon-five.vercel.app/",
      repo: "https://github.com/HUNNEY1426/Agent",
      points: [
        "Built a terminal-based AI agent chatbot with persistent memory, multi-session management and conversation history export / import.",
        "Designed a multi-LLM provider architecture supporting Gemini, OpenAI, Claude, Ollama and OpenRouter, with configurable models and provider fallback.",
        "Integrated agent tools for file operations and controlled shell command execution, with RESTful APIs and CLI commands.",
        "Implemented environment-based configuration, error handling, response benchmarking and secure API credential management.",
      ],
    },
  ],

  skills: [
    { group: "Core stack", items: "Next.js (App Router), React.js, TypeScript, JavaScript (ES6+), Tailwind CSS, HTML5, CSS3" },
    { group: "State management", items: "Zustand, Redux, Context API, React Query" },
    { group: "Backend & ORM", items: "Prisma ORM, Node.js, RESTful APIs, GraphQL, Apollo Client, Axios, WebSocket" },
    { group: "Rendering & auth", items: "SSR, SSG, JWT, OAuth, role-based access control" },
    { group: "AI tools", items: "Cursor, Claude Code, Antigravity, AI-assisted debugging, AI code review" },
    { group: "Workflow & design", items: "Git, GitHub, bug triage, Postman, Swagger, Jira, Vercel, Firebase, Figma, Material-UI, responsive design, accessibility (WCAG)" },
  ],

  education: [
    { degree: "MSc in Computer Science", school: "Hemchandracharya North Gujarat University", location: "Patan, Gujarat", period: "Apr 2026 – Present" },
    { degree: "BSc in Computer Science & Information Technology", school: "Hemchandracharya North Gujarat University", location: "Patan, Gujarat", period: "Jun 2023 – Apr 2026" },
  ],
} as const;
