import type { Metadata } from "next";
import ProjectDetail, { type Project } from "../ProjectDetail";

export const metadata: Metadata = { title: "Solace", description: "A quieter way to plan time away." };

const project: Project = {
  number: "02",
  title: "Solace",
  discipline: "Digital experience · Front-end",
  year: "2025",
  intro: "A travel experience designed around pace, place, and fewer decisions.",
  challenge: "Most booking products reward speed and volume. Solace needed to make slower, considered travel feel simple to arrange.",
  outcome: "The final flow pairs direct planning tools with atmospheric storytelling, without burying practical details.",
  accent: "#80bddb",
  nextSlug: "noma",
  nextTitle: "Noma Archive",
};

export default function SolacePage() { return <ProjectDetail project={project} />; }
