import type { Metadata } from "next";
import ProjectDetail from "../ProjectDetail";
import { relayProject } from "../../data/projects";

export const metadata: Metadata = {
  title: "Relay",
  description:
    "A local-first desktop workspace for chatting with and comparing OpenAI-compatible language models.",
};

export default function RelayPage() {
  return <ProjectDetail project={relayProject} />;
}