import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import {
  Bricolage_Grotesque,
  JetBrains_Mono,
  Schibsted_Grotesk,
} from "next/font/google";
import { Footer } from "@/components/site/footer";
import { Navbar } from "@/components/site/navbar";
import { DESCRIPTION, TAGLINE } from "@/lib/site";
import "./globals.css";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
});

const body = Schibsted_Grotesk({
  subsets: ["latin"],
  variable: "--font-schibsted",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://openzync.tech"),
  title: {
    default: TAGLINE,
    template: "%s — OpenZync",
  },
  description: DESCRIPTION,
};

export const viewport: Viewport = {
  themeColor: "#04070d",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${mono.variable}`}
    >
      <body className="bg-void font-body text-foam antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
