"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRole } from "@/components/providers/role-context";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { useState, useEffect } from "react";
import { Menu, X, Rocket, LogIn, UserPlus, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const { role } = useRole();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      className={`sticky top-0 z-50 transition-all duration-300 ${scrolled
        ? "border-b border-white/20 bg-[#04060e]/95 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
        : "border-b border-white/5 bg-[#04060e]/80 backdrop-blur-xl"
        }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Gradient border effect */}
      <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-aurora-400/50 to-transparent" />

      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="group flex items-center gap-2">
          <motion.div
            whileHover={{ rotate: 360, scale: 1.1 }}
            transition={{ duration: 0.6 }}
            className="relative flex h-14 w-14 items-center justify-center"
          >
            <Image
              src="/img/pharmawise-logo.png?v=2"
              alt="PharmaWise-AMR Logo"
              width={48}
              height={48}
              className="object-contain"
              priority
              unoptimized
            />
          </motion.div>
          <span className="font-premium text-xl font-bold text-white transition-all group-hover:text-aurora-300">
            PharmaWise-AMR
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {[
            { href: "#modul", label: "Fitur" },
            { href: "/quiz-literasi", label: "Quiz Literasi" },
            { href: "/workspace/campaign", label: "Campaign" },
            { href: "/workspace", label: "Workspace" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group relative text-sm font-medium text-white/70 transition-colors hover:text-white"
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-gradient-to-r from-aurora-400 to-purple-500 transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        {/* Right side actions */}
        <div className="flex items-center gap-3">
          <ThemeToggle />

          {/* Auth Buttons - Always Visible on Desktop */}
          <Link
            href="/auth/login"
            className="hidden lg:flex items-center gap-2 px-4 py-2 rounded-xl text-white/70 hover:text-white hover:bg-white/10 transition-all duration-200 text-sm font-medium"
          >
            <LogIn className="w-4 h-4" />
            <span>Login</span>
          </Link>

          <Link
            href="/auth/register"
            className="hidden lg:flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-aurora-500 to-purple-600 text-white shadow-lg shadow-aurora-500/25 hover:shadow-aurora-500/40 hover:scale-105 transition-all duration-200 text-sm font-semibold"
          >
            <UserPlus className="w-4 h-4" />
            <span>Register</span>
          </Link>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="flex items-center justify-center rounded-lg bg-white/10 p-2.5 text-white md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait">
              {mobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="h-5 w-5" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="h-5 w-5" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="border-t border-white/10 bg-[#04060e]/98 backdrop-blur-2xl md:hidden overflow-hidden"
          >
            <nav className="flex flex-col gap-1 px-6 py-4">
              {[
                { href: "#modul", label: "Fitur" },
                { href: "/quiz-literasi", label: "Quiz Literasi" },
                { href: "/workspace/campaign", label: "Campaign" },
                { href: "/workspace", label: "Workspace" },
              ].map((item, idx) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Link
                    href={item.href}
                    className="block rounded-lg px-4 py-3 text-white/70 transition-all hover:bg-white/10 hover:text-white"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}

              <div className="mt-6 flex flex-col gap-3 border-t border-white/10 pt-6">
                <Button
                  asChild
                  variant="ghost"
                  className="w-full justify-start text-white/80 hover:bg-white/10 hover:text-white"
                >
                  <Link href="/auth/login" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3">
                    <LogIn className="w-4 h-4" />
                    Login
                  </Link>
                </Button>
                <Button
                  asChild
                  className="w-full justify-center bg-gradient-to-r from-aurora-500 to-purple-600 text-white shadow-lg shadow-aurora-500/20"
                >
                  <Link href="/auth/register" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2">
                    <UserPlus className="w-4 h-4" />
                    Create Account
                  </Link>
                </Button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
