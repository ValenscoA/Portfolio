import type { Metadata } from "next";
import Portfolio from "./Portfolio";

export const metadata: Metadata = {
  title: "Valensco Aurelius — Portfolio",
  description: "Selected work and experiments by Valensco Aurelius.",
};

export default function Home() {
  return <Portfolio />;
}
