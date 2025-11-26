"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useRole } from "@/components/providers/role-context";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { useState } from "react";
import { Menu, X, Rocket } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const { role } = useRole();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-20 border-b border-white/10 bg-[#04060e]/70 backdrop-blur-lg">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="font-display text-xl text-white transition-all hover:text-neon">
          PharmaWise-AMR
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-6 text-sm text-white/70 md:flex">
          <Link href="#modul" className="transition-colors hover:text-white">Fitur</Link>
          <Link href="/quiz-literasi" className="transition-colors hover:text-white">Quiz Literasi</Link>
          <Link href="/workspace/campaign" className="transition-colors hover:text-white">Campaign</Link>
          <Link href="/workspace" className="transition-colors hover:text-white">Workspace</Link>
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <div className="hidden items-center gap-2 md:flex">
            <Button variant="ghost" onClick={() => document.dispatchEvent(new CustomEvent("open-auth-modal"))}>
              {role ? "Ganti akun" : "Login"}
            </Button>
            <Button onClick={() => document.dispatchEvent(new CustomEvent("open-auth-modal"))}>Register</Button>
            <Button asChild className="bg-gradient-to-r from-aurora-400 to-neon text-white shadow-lg hover:shadow-aurora-400/60">
              <Link href="/workspace" className="flex items-center gap-2">
                <Rocket size={16} />
                Launch App
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-white/10 bg-[#04060e]/95 backdrop-blur-lg md:hidden"
          >
            <nav className="flex flex-col gap-4 px-4 py-6">
              <Link href="#modul" className="text-white/70 transition-colors hover:text-white">Fitur</Link>
              <Link href="/quiz-literasi" className="text-white/70 transition-colors hover:text-white">Quiz Literasi</Link>
              <Link href="/workspace/campaign" className="text-white/70 transition-colors hover:text-white">Campaign</Link>
              <Link href="/workspace" className="text-white/70 transition-colors hover:text-white">Workspace</Link>
              <div className="flex flex-col gap-2 pt-4">
                <Button variant="ghost" onClick={() => document.dispatchEvent(new CustomEvent("open-auth-modal"))}>
                  {role ? "Ganti akun" : "Login"}
                </Button>
                <Button onClick={() => document.dispatchEvent(new CustomEvent("open-auth-modal"))}>Register</Button>
                <Button
                  asChild
                  className="bg-gradient-to-r from-aurora-400 to-neon text-white shadow-lg hover:shadow-aurora-400/60"
                >
                  <Link href="/workspace" className="flex items-center justify-center gap-2">
                    <Rocket size={16} />
                    Launch App
                  </Link>
                </Button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}







