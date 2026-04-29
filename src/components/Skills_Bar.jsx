"use client";
import { Sparkles } from "lucide-react";

const skills = [
  "Html",
  "CSS",
  "JavaScript",
  "TypeScript",
  "Tailwind CSS",
  "Rect js",
  "Next.js",
  "Framer Motion",
  "Node.js",
  "Express.js",
  "MongoDB",
  "My SQL",
  "Git",
];

export default function SkillsMarquee() {
  return (
    <div className="relative w-full h-[80px] overflow-hidden bg-card flex items-center border-y border-black/5 dark:border-white/5 transition-colors duration-300">
      {/* Scrolling Skills */}
      <div className="flex w-max animate-marquee">
        {[...skills, ...skills].map((skill, index) => (
          <div
            key={index}
            className="mx-3 font-heading text-muted font-mono text-md whitespace-nowrap flex items-center gap-1"
          >
            <Sparkles size={16} strokeWidth={2} className="text-orange-500" />
            {skill}
          </div>
        ))}
      </div>

      {/* Bottom Line */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-l from-transparent via-orange-400 to-transparent opacity-50" />
    </div>
  );
}

