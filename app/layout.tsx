import type { Metadata } from "next";
import { Instrument_Serif } from "next/font/google";
import "./globals.css";

const instrumentSerif = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-instrument-serif",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://valensco-aurelius.sites.openai.com"),
  title: {
    default: "Valensco Aurelius",
    template: "%s — Valensco Aurelius",
  },
  description: "A focused portfolio of digital products, interfaces, and front-end work.",
  icons: {
    icon: [{ url: "/images/valensco-logo.svg", type: "image/svg+xml" }],
    shortcut: "/images/valensco-logo.svg",
  },
  openGraph: {
    title: "Valensco Aurelius",
    description: "Selected digital products, interfaces, and front-end work.",
    type: "website",
    images: [{ url: "/og.png", width: 1792, height: 1024, alt: "Valensco Aurelius portfolio" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Valensco Aurelius",
    description: "Selected digital products, interfaces, and front-end work.",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={instrumentSerif.variable}>{children}</body>
    </html>
  );
}
