import type { Metadata } from "next";
import ProjectDetail, { type Project } from "../ProjectDetail";

export const metadata: Metadata = { title: "Noma Archive", description: "An editorial archive for objects and images." };

const project: Project = {
  number: "03",
  title: "Noma Archive",
  discipline: "Identity · Editorial system",
  year: "2025",
  intro: "A living digital archive for a small collection of objects, images, and field notes.",
  challenge: "The collection had a distinct point of view but no consistent structure across exhibitions, print, and the web.",
  outcome: "A modular identity and strict editorial grid now let new material fit in without making every release look the same.",
  accent: "#d9d7d0",
  nextSlug: "northstar",
  nextTitle: "Northstar",
};

export default function NomaPage() { return <ProjectDetail project={project} />; }
