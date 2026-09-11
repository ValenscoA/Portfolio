import type { Metadata } from "next";
import { Instrument_Serif } from "next/font/google";
import MotionProvider from "./components/MotionProvider";
import "./globals.css";

const instrumentSerif = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-instrument-serif",
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL("https://valensco.me"),
  title: {
    default: "Valensco Aurelius",
    template: "%s — Valensco Aurelius",
  },
  description:
    "Computer Science student building full-stack applications, AI tooling, and developer infrastructure.",
  alternates: { canonical: "/" },
  icons: {
    icon: [{ url: "/images/valensco-logo.svg", type: "image/svg+xml" }],
    shortcut: "/images/valensco-logo.svg",
  },
  openGraph: {
    title: "Valensco Aurelius",
    description: "Computer Science student building full-stack applications, AI tooling, and developer infrastructure.",
    type: "website",
    images: [{ url: "/og.png", width: 1792, height: 1024, alt: "Valensco Aurelius portfolio" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Valensco Aurelius",
    description: "Computer Science student building full-stack applications, AI tooling, and developer infrastructure.",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={instrumentSerif.variable}>
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
