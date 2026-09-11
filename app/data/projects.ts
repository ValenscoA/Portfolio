export type ProjectMedia = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type ProjectStatus = {
  label: string;
  year: string;
};

export type ProjectLink = {
  label: string;
  href: string;
};

export type ProjectSummary = {
  slug: string;
  number: string;
  title: string;
  summary: string;
  status: ProjectStatus;
  technologies: string[];
  features: string[];
  sourceUrl?: string;
  demoUrl?: string;
  caseStudyUrl?: string;
  media: ProjectMedia[];
  visual?: "relay";
  note?: string;
};

export type ProjectSection = {
  id: string;
  title: string;
  body: string[];
};

export type ProjectArchitectureLayer = {
  label: string;
  detail?: string;
};

export type ProjectArchitecture = {
  caption: string;
  layers: ProjectArchitectureLayer[];
  note?: string;
};

export type ProjectDetailData = ProjectSummary & {
  discipline: string;
  accent: string;
  logoSrc?: string;
  overview: string;
  sections: ProjectSection[];
  architecture?: ProjectArchitecture;
  links: ProjectLink[];
  nextSlug?: string;
  nextTitle?: string;
};

const relayMedia: ProjectMedia[] = [
  {
    src: "/images/projects/relay-chat.png",
    alt: "Relay chat workspace showing a conversation with a configured model",
    width: 2559,
    height: 1503,
  },
];

export const projects: ProjectSummary[] = [
  {
    slug: "relay",
    number: "01",
    title: "Relay",
    summary:
      "A local-first desktop workspace for chatting with and comparing OpenAI-compatible models.",
    status: { label: "Active", year: "2026" },
    technologies: ["Tauri", "Rust", "React", "TypeScript", "SQLite"],
    features: [
      "Streaming responses handled in a native Rust backend, with stop-generation support",
      "Concurrent side-by-side model comparison with isolated failures per column",
      "API keys kept in the OS credential vault; SQLite stores history and usage telemetry",
    ],
    sourceUrl: "https://github.com/ValenscoA/relay-ai",
    caseStudyUrl: "/projects/relay",
    media: relayMedia,
    visual: "relay",
  },
  {
    slug: "fuchsia",
    number: "02",
    title: "Fuchsia",
    // TODO(content): description, status/year, technologies, features, and links
    // for the Fuchsia Discord bot / Minecraft server infrastructure project are not
    // present in this repository. Fill these in from the actual implementation.
    summary:
      "A Discord bot and server-management project connected to a Minecraft server and supporting infrastructure tooling.",
    status: { label: "Ongoing", year: "" },
    technologies: [],
    features: [],
    media: [],
    note: "Project write-up in progress.",
  },
];

export const relayProject: ProjectDetailData = {
  ...projects[0],
  discipline: "Desktop AI workspace",
  accent: "#c4f661",
  logoSrc: "/images/projects/relay-logo.png",
  overview:
    "Relay is a local-first desktop workspace for chatting with and comparing OpenAI-compatible language models. It uses a React/Vite renderer inside Tauri, a Rust backend that owns provider traffic, SQLite for durable history and metrics, and the operating system credential vault for API keys.",
  sections: [
    {
      id: "problem",
      title: "Problem",
      body: [
        "Browser-based chat clients scatter conversation data, credentials, provider traffic, and usage metrics across separate services. Relay needed to bring them together without routing secrets through the web interface.",
      ],
    },
    {
      id: "solution",
      title: "Solution",
      body: [
        "Relay keeps the interface thin and moves model communication, storage, and secret handling into a native Rust backend. The WebView renders state and never receives an API key or makes a provider request directly.",
      ],
    },
    {
      id: "features",
      title: "Key Features",
      body: [
        "Real SSE streaming from the Rust backend, with stop-generation support.",
        "Concurrent side-by-side model comparison where one column cannot abort another.",
        "Local conversations, messages, generation attempts, and usage telemetry in SQLite.",
        "Configurable per-million-token pricing with estimated cost reporting.",
        "API keys stored in the OS credential vault rather than SQLite or browser storage.",
        "Import and export through native file dialogs, with backups that exclude credentials.",
        "HTTPS-only provider endpoints with redirect denial and private-address blocking.",
      ],
    },
    {
      id: "decisions",
      title: "Technical Decisions",
      body: [
        "SQLite was chosen for a single-user desktop app: it removes an external service, gives atomic local transactions, works offline, and is easy to back up.",
        "Generation attempts are stored separately from assistant messages so that interruption and retry do not corrupt the logical transcript.",
        "Writes before and after a stream use short transactions, so no database lock is held across provider network time.",
        "Credentials live in the platform vault because encrypting a key beside its own encryption key offers little protection.",
        "Provider networking is confined to Rust; typed wrappers in the renderer are the only backend contract.",
      ],
    },
    {
      id: "challenges",
      title: "Challenges",
      body: [
        "DNS rebinding protection is best-effort because hostname resolution and connection are separate operations with the current HTTP client. A hardened release would pin the validated address for the request.",
      ],
    },
    {
      id: "learned",
      title: "What I Learned",
      // TODO(content): add your own takeaways from building Relay.
      // Intentionally left blank rather than inventing a narrative.
      body: [],
    },
  ],
  architecture: {
    caption: "How a message moves through Relay.",
    layers: [
      { label: "React / Vite renderer", detail: "Presentation only — no keys, no direct provider access" },
      { label: "Typed IPC boundary", detail: "invoke commands and generation:<request-id> events" },
      { label: "Tauri / Rust backend", detail: "commands · network · database · credentials" },
      { label: "OpenAI-compatible APIs", detail: "HTTPS only, redirects disabled" },
    ],
    note: "Persistence: SQLite holds conversations, messages, generations, and usage. API keys stay in the OS credential vault.",
  },
  links: [
    { label: "Source Code", href: "https://github.com/ValenscoA/relay-ai" },
  ],
};

export type SkillGroup = {
  label: string;
  description: string;
  technologies: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    label: "Primary",
    description: "Used most often and most recently.",
    technologies: ["TypeScript", "JavaScript", "React", "Node.js"],
  },
  {
    label: "Backend / Data",
    description: "Application logic and storage.",
    technologies: ["Python", "Java", "SQL"],
  },
  {
    label: "Tools / Infrastructure",
    description: "Day-to-day environment and delivery.",
    technologies: ["Git", "Docker", "Linux"],
  },
  {
    label: "Other / Hardware",
    description: "Coursework and physical computing.",
    technologies: ["HTML", "CSS", "C++", "Arduino", "Raspberry Pi"],
  },
];
