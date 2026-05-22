"use client";
import React from "react";
import { motion } from "framer-motion";
import { Mail, Phone } from "lucide-react";

const GithubIcon = ({ className, size = 24 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.18-.35 6.5-1.56 6.5-7.16 0-1.54-.53-2.8-1.5-3.8.15-.38.69-1.8-.15-3.8-1.2-.38-3.9 1.4-3.9 1.4-1.1-.3-2.3-.46-3.5-.46s-2.4.16-3.5.46c0 0-2.7-1.78-3.9-1.4-.84 2-.3 3.42-.15 3.8-1 1-1.5 2.26-1.5 3.8 0 5.6 3.32 6.81 6.5 7.16-.9.8-1.1 2.2-1.1 3.02V22" />
    <path d="M9 20c-4.2 1.4-5.6-1.4-5.6-1.4" />
  </svg>
);

const LinkedinIcon = ({ className, size = 24 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
      { icon: GithubIcon, label: "GitHub", href: "https://github.com/HadssanK" },
  { icon: LinkedinIcon, label: "LinkedIn", href: "https://www.linkedin.com/in/hassan-merndev/" },
  ];

  return (
    <footer className="border-t border-black/5 dark:border-orange-500/20 py-10 px-6 md:px-20 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">

          {/* Logo Section */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-2"
            >
              <div className="w-10 h-10 rounded-lg bg-orange-600 flex items-center justify-center border border-orange-400 shadow-[0_0_25px_rgba(250,204,21,0.8)]">
                <span className="text-white font-heading font-bold text-sm">
                  &lt;/&gt;
                </span>
              </div>

              <span className="font-heading text-orange-400 font-bold text-lg tracking-[0.2em] uppercase">
                Hassan
              </span>
            </motion.div>
          </div>

          {/* Center Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col items-center gap-3 text-center"
          >
            <p className="text-muted text-sm">
              Copyright © {currentYear}{" "}
              <span className="text-orange-400 font-medium">
                Muhammad Hassan
              </span>
            </p>

            <div className="flex items-center gap-2 text-muted hover:text-orange-400 transition-colors duration-300">
              <Mail size={16} />
              <a
                href="mailto:hassantheDev945@gmail.com"
                className="font-heading text-sm hover:underline"
              >
                hassantheDev945@gmail.com
              </a>
            </div>

            <div className="flex items-center gap-2 text-muted hover:text-orange-400 transition-colors duration-300">
              <Phone size={16} />
              <a
                href="tel:+92330 0273758"
                className="font-heading text-sm hover:underline"
              >
                +92 330 0273758
              </a>
            </div>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex items-center gap-4"
          >
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="w-10 h-10 rounded-full bg-black/5 dark:bg-zinc-800/50 border border-black/5 dark:border-orange-500/20 flex items-center justify-center text-muted hover:text-orange-400 hover:border-orange-500/50 hover:bg-orange-500/10 hover:shadow-[0_0_25px_rgba(250,204,21,0.8)] transition-all duration-300"
              >
                <social.icon size={20} />
              </a>
            ))}
          </motion.div>

        </div>
      </div>
    </footer>
  );
}