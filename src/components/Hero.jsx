"use client";
import { ArrowRight, Mail } from "lucide-react";
import Image from "next/image";
import TimelineModal from "./Timeline";
import Link from "next/link";

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

const LeetCodeIcon = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    role="img"
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    className={className}
  >
    <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" />
  </svg>
);

const SOCIAL_LINKS = [
  { icon: GithubIcon, label: "GitHub", href: "https://github.com/HadssanK" },
  { icon: LinkedinIcon, label: "LinkedIn", href: "https://www.linkedin.com/in/muhammad-hassan-a47b67251/" },
  { icon: Mail, label: "Gmail", href: "mailto:hassantheDev945@gmail.com" },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden flex items-center px-6 md:px-20 pt-24 pb-16">
      {/* Grid background */}
      <div
        className="absolute inset-0 pointer-events-none z-[-99]"
        style={{
          backgroundImage: `linear-gradient(rgba(156, 163, 175, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(156, 163, 175, 0.1) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Glow */}
      <div className="absolute -top-20 -left-20 w-100 h-100 bg-orange-500/10 rounded-full blur-[100px]" />
      <div className="absolute -bottom-20 -right-20 w-100 h-100 bg-yellow-500/10 rounded-full blur-[100px]" />

      <div className="relative z-10 flex flex-col-reverse md:flex-row items-center justify-between w-full gap-12">
        {/* Left Content */}
        <div className="flex-1 max-w-xl text-center md:mt-6 md:text-left">
          {/* Availability badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-orange-500/40 bg-orange-500/10 mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
            <span className="font-heading text-orange-500 text-xs tracking-wider">
              Available for Freelance and Full-time
            </span>
          </div>

          {/* Heading */}
          <h1 className="font-heading text-4xl md:text-5xl font-extrabold leading-tight text-foreground mb-4">
            Crafting{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-l from-orange-400 to-yellow-400">
              Digital Experiences
            </span>
          </h1>

          {/* Subtitle */}
          <h4 className="font-heading text-lg md:text-xl text-muted mb-6">
            Solving problems, building solutions, and bringing ideas to life.
          </h4>

          {/* Description */}
          <p className="text-muted text-base md:text-lg leading-relaxed mb-8">
I am <strong className="text-foreground">Muhammad Hassan</strong>, a Full Stack Developer who combines technical expertise with creative problem-solving to build scalable and elegant solutions.          </p>

          {/* Buttons */}
          <div className="flex items-center justify-center md:justify-start gap-4 flex-wrap mb-8">
            {/* <TimelineModal /> */}
            <button className="font-heading cursor-pointer flex items-center gap-2 px-6 py-3 rounded-full border border-black/10 dark:border-white/20 text-foreground text-sm hover:border-orange-400 hover:text-orange-400 hover:scale-105 hover:shadow-[0_0_15px_rgba(251,146,60,0.3)] transition-all">
              <Link href="/contact" className="flex items-center gap-2">
                Lets Talk
                <ArrowRight className="w-4 h-4" />
              </Link>
            </button>
          </div>

          {/* Social */}
          <div className="flex items-center justify-center md:justify-start gap-3">
            <div className="h-px w-8 bg-gray-600/70" />
            {SOCIAL_LINKS.map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-10 h-10 rounded-full border border-black/10 dark:border-gray-600/50 bg-black/5 dark:bg-white/5 flex items-center justify-center text-muted hover:text-orange-400 hover:border-orange-400/60 hover:bg-orange-500/10 hover:shadow-[0_0_15px_rgba(251,146,60,0.3)] transition-all duration-200"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
            <div className="h-px w-8 bg-gray-600/70" />
          </div>
        </div>

        {/* Profile Image */}
        <div className="relative flex-shrink-0 flex items-center justify-center mt-10 md:mt-0">
          {/* Glow blur */}
          <div className="absolute w-75 h-75 md:w-[420px] md:h-[420px] rounded-full bg-gradient-to-br from-orange-500/30 to-yellow-400/20 blur-[40px]" />

          {/* Each SVG = one dash */}
          {[
            { length: 10, offset: 0, duration: "58s", reverse: false },
            { length: 20, offset: -180, duration: "55s", reverse: true },
            { length: 8, offset: -420, duration: "14s", reverse: false },
            { length: 30, offset: -600, duration: "30s", reverse: true },
            { length: 14, offset: -850, duration: "20s", reverse: false },
            { length: 25, offset: -1050, duration: "39s", reverse: true },
            { length: 10, offset: -1300, duration: "22s", reverse: false },
            { length: 48, offset: -1050, duration: "49s", reverse: true },
            { length: 35, offset: -1300, duration: "42s", reverse: false },
          ].map((dash, i) => (
            <svg
              key={i}
              className="absolute w-[330px] h-[330px] md:w-[430px] md:h-[430px]"
              fill="transparent"
              viewBox="0 0 506 506"
              xmlns="http://www.w3.org/2000/svg"
              style={{
                animation: `spinSlow ${dash.duration} linear infinite ${dash.reverse ? "reverse" : ""}`,
              }}
            >
              <defs>
                <linearGradient id={`g${i}`} x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#f97316" />
                  <stop offset="100%" stopColor="#fbbf24" />
                </linearGradient>
              </defs>
              <circle
                cx="253"
                cy="253"
                r="244"
                stroke={`url(#g${i})`}
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={`${dash.length} ${1532 - dash.length}`}
                strokeDashoffset={dash.offset}
              />
            </svg>
          ))}

          {/* Profile image */}
      <div className="relative w-75 h-75 md:w-100 md:h-100 rounded-full overflow-hidden">
  <Image
    src="/dev.png"
    alt="Muhammad Hassan"
    fill
    className="object-cover object-[center_25%]"
  />
</div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-l from-transparent via-orange-400 to-transparent opacity-50" />

      <style>{`
        @keyframes spinSlow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
}