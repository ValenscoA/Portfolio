import type { Metadata } from "next";
import Portfolio from "./Portfolio";

export const metadata: Metadata = {
  title: "Valensco Aurelius — Portfolio",
  description:
    "Computer Science student building full-stack applications, AI tooling, and developer infrastructure.",
};

export default function Home() {
  return <Portfolio />;
}
