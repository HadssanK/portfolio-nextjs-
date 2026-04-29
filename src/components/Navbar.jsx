"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  Home,
  User,
  FolderGit2,
  BadgeCheck,
  ContactRound,
  Briefcase,
  X,
  Menu,
} from "lucide-react";
import Toogle from "./ToogleButton";

const NAV_LINKS = [
  { label: "Home", icon: Home, href: "/" },
  { label: "About Me", icon: User, href: "/about" },
  { label: "Projects", icon: FolderGit2, href: "/projects" },
  { label: "Services", icon: BadgeCheck, href: "/services" },
  { label: "Contact", icon: ContactRound, href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (href) => pathname === href;

  return (
    <>
      <nav className="w-full flex items-center justify-between px-6 md:px-20 py-3 bg-navbar fixed top-0 z-50 transition-colors duration-300">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-lg bg-orange-600 flex items-center justify-center border border-orange-400 shadow-[0_0_25px_rgba(250,204,21,0.8)]">
            <span className="text-white font-bold text-sm font-mono">
              &lt;/&gt;
            </span>
          </div>
          <span className="text-orange-400 font-bold text-lg tracking-[0.2em] uppercase font-mono ">
            Hassan
          </span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-3">
          <div className="flex items-center gap-1 bg-black/10 dark:bg-card backdrop-blur-xl border border-black/10 dark:border-white/10 rounded-3xl px-3 py-2">
            {NAV_LINKS.map(({ label, href }) => (
              <Link key={label} href={href}>
                <button
                  className={`relative px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer ${
                    isActive(href)
                      ? "text-white"
                      : "text-muted hover:text-foreground"
                  }`}
                >
                  {isActive(href) && (
                    <motion.div
                      layoutId="navbarActiveTab"
                      className="absolute inset-0 bg-primary rounded-full shadow-[0_0_15px_rgba(251,146,60,0.4)]"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="relative z-10">{label}</span>
                </button>
              </Link>
            ))}
            {/* Theme Toggle */}
          <div className="ml-2 border-l border-black/10 dark:border-white pl-2">
              <Toogle />
            </div>
          </div>
          <button className="relative px-5 py-2 rounded-md bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-heading font-semibold text-sm hover:bg-orange-100 dark:hover:bg-orange-900/50 transition-all shadow-lg hover:shadow-[0_0_25px_rgba(250,204,21,0.8)] cursor-pointer">
            <Link href="/contact">
              Hire Me
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-orange-500 rounded-full animate-ping" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-orange-500 rounded-full" />
            </Link>
          </button>
        </div>

        {/* Mobile Actions */}
        <div className="flex md:hidden items-center gap-3">
          <Toogle />
          <button
            onClick={() => setMenuOpen(true)}
            className="w-10 h-10 flex justify-center items-center border border-orange-400 rounded-full bg-orange-600 shadow-[0_0_20px_rgba(250,204,21,0.8)]"
          >
            <Menu className="text-white w-5 h-5" />
          </button>
        </div>
      </nav>

      {/* Mobile Full-Screen Panel */}
      {menuOpen && (
        <div className="fixed inset-0 z-[100] bg-background flex flex-col px-6 py-6 md:hidden transition-colors duration-300">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-foreground text-2xl font-bold">Navigation</h2>
              <div className="w-16 h-0.5 bg-gradient-to-l from-orange-500 to-yellow-400 mt-1 rounded-full" />
            </div>
            <button
              onClick={() => setMenuOpen(false)}
              className="w-10 h-10 rounded-full bg-card border border-black/10 dark:border-white/10 flex items-center justify-center text-foreground hover:bg-orange-600 transition-all shadow-[0_0_25px_rgba(250,204,21,0.8)]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Links */}
          <div className="flex flex-col gap-2 flex-1">
            {NAV_LINKS.map(({ label, href, icon: Icon }) => (
              <Link key={label} href={href} onClick={() => setMenuOpen(false)}>
                <div
                  className={`relative flex items-center gap-4 px-3 py-3 rounded-xl font-semibold text-base transition-all duration-300 w-full overflow-hidden ${
                    isActive(href)
                      ? "text-white"
                      : "text-muted hover:bg-black/5 dark:hover:bg-white/5"
                  }`}
                >
                  {isActive(href) && (
                    <motion.div
                      layoutId="mobileNavbarActiveTab"
                      className="absolute inset-0 bg-primary shadow-[0_0_20px_rgba(251,146,60,0.3)]"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <Icon className="relative z-10 w-5 h-5 flex-shrink-0" />
                  <span className="relative z-10">{label}</span>
                  {isActive(href) && (
                    <span className="relative z-10 ml-auto w-2 h-2 bg-white rounded-full animate-pulse" />
                  )}
                </div>
              </Link>
            ))}

            {/* Hire Me */}
            <Link href="/contact" onClick={() => setMenuOpen(false)}>
              <div className="flex items-center gap-4 px-5 py-3 rounded-xl font-semibold text-base text-muted hover:bg-black/5 dark:hover:bg-white/5 transition-all w-full">
                <Briefcase className="w-5 h-5 flex-shrink-0" />
                <span>Hire Me</span>
              </div>
            </Link>
          </div>
          <div className="w-full h-[4px] bg-gradient-to-l from-transparent via-orange-500 to-transparent" />
        </div>
      )}
    </>
  );
}