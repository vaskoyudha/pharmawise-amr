import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { Navbar } from "@/components/landing/Navbar";
import { ParticleBackground } from "@/components/effects/ParticleBackground";
import { FloatingElements } from "@/components/effects/FloatingElements";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "PharmaWise-AMR",
  description: "Decision-support and public education platform for responsible antibiotic use.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${spaceGrotesk.variable} ${inter.variable} font-body`}>
        <Providers>
          <ParticleBackground />
          <FloatingElements />
          <div className="relative z-10">
            <Navbar />
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
