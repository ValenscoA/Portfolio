import type { Metadata } from "next";
import ProjectDetail, { type Project } from "../ProjectDetail";

export const metadata: Metadata = {
  title: "Relay",
  description: "A local-first desktop workspace for chatting with and comparing AI models.",
};

const project: Project = {
  number: "01",
  title: "Relay",
  discipline: "Desktop AI workspace · Full stack",
  year: "2026",
  intro:
    "A production-minded desktop client for private, multi-model AI conversations and side-by-side model comparison.",
  challenge:
    "Browser-based chat clients often scatter conversation data, credentials, provider traffic, and usage metrics across separate services. Relay needed to bring them together without sending secrets through the web interface.",
  outcome:
    "A Tauri desktop application with a React interface, native Rust streaming, SQLite conversation history, Windows Credential Manager integration, model comparison, usage tracking, and native backup tools.",
  accent: "#c4f661",
  logoSrc: "/images/projects/relay-logo.png",
};

export default function RelayPage() {
  return <ProjectDetail project={project} />;
}
