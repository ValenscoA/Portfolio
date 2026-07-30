import type { Metadata } from "next";
import ProjectDetail, { type Project } from "../ProjectDetail";

export const metadata: Metadata = { title: "Northstar", description: "A calm interface for personal finance." };

const project: Project = {
  number: "01",
  title: "Northstar",
  discipline: "Product direction · Interface",
  year: "2026",
  intro: "A financial workspace that makes a complicated portfolio readable at a glance.",
  challenge: "Dense account data was spread across separate views, forcing users to piece together the state of their finances.",
  outcome: "One flexible dashboard now shows position, movement, and risk without turning every screen into a spreadsheet.",
  accent: "#4ea7ff",
  nextSlug: "solace",
  nextTitle: "Solace",
};

export default function NorthstarPage() { return <ProjectDetail project={project} />; }
