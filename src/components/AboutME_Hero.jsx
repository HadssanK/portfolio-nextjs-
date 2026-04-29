"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Briefcase, GraduationCap, Calendar, MapPin } from "lucide-react";

/* ---------------- Animated Counter ---------------- */
const AnimatedCounter = ({ value, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      const duration = 2000;
      const startTime = Date.now();

      const timer = setInterval(() => {
        const now = Date.now();
        const progress = Math.min((now - startTime) / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 4);

        setCount(Math.floor(ease * value));

        if (progress === 1) clearInterval(timer);
      }, 16);

      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <span ref={ref} className="tabular-nums font-heading">
      {count}
      {suffix}
    </span>
  );
};

/* ---------------- Stat Card ---------------- */
const StatCard = ({ value, label, suffix = "+" }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center p-6 bg-card border border-black/5 dark:border-gray-800 rounded-2xl hover:border-orange-500/30 hover:shadow-[0_0_15px_rgba(251,146,60,0.3)] transition-colors group"
    >
      <h3 className="font-heading text-4xl md:text-5xl font-bold text-orange-500 mb-2 group-hover:scale-110 transition-transform duration-300">
        <AnimatedCounter value={value} suffix={suffix} />
      </h3>
      <p className="font-heading text-muted text-sm tracking-widest uppercase">
        {label}
      </p>
    </motion.div>
  );
};

/* ---------------- Info Card ---------------- */
const InfoCard = ({
  icon: Icon,
  title,
  subtitle,
  className = "",
  highlight = false,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.02 }}
      className={`
        relative overflow-hidden rounded-2xl p-5 flex items-center gap-4 
        transition-all duration-300 cursor-default
        ${
          highlight
            ? "bg-gradient-to-br from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-900/20"
            : "bg-card border border-black/5 dark:border-orange-500 hover:border-orange-600 text-muted"
        }
        ${className}
      `}
    >
      <div
        className={`p-3 rounded-xl ${highlight ? "bg-white/20" : "bg-background text-orange-500"}`}
      >
        <Icon size={24} />
      </div>

      <div>
        <h4
          className={`font-heading font-bold text-lg leading-tight ${highlight ? "text-white" : "text-foreground"}`}
        >
          {title}
        </h4>
        <p
          className={`text-sm ${highlight ? "text-orange-100" : "text-muted"}`}
        >
          {subtitle}
        </p>
      </div>

      {highlight && (
        <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/10 rounded-full blur-2xl" />
      )}
    </motion.div>
  );
};

/* ---------------- Main Component ---------------- */
export default function AtAGlance() {
  return (
    <div className="min-h-screen text-muted px-6 md:px-20 selection:bg-orange-500/30 transition-colors duration-300">
      <div className="max-w-7xl mx-auto py-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-start mb-10"
        >
          <span className="font-heading text-orange-500 text-sm tracking-[0.3em] uppercase mb-2 block">
            About Me
          </span>
          <h1 className="font-heading text-4xl md:text-6xl font-bold tracking-tight text-foreground">
            At a{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
              Glance
            </span>
          </h1>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <StatCard value={1} label="Years Experience" />
          <StatCard value={5} label="Projects Delivered" />
          <StatCard value={15} label="Technical Skills" />
          <StatCard value={4} label="Live Projects" />
        </div>

        {/* Cards + Bio */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="space-y-6">
            <InfoCard
    icon={Briefcase}
    title="Full Stack Developer"
    subtitle="MERN Stack & Frontend Expert"
    highlight={true}
  />
  
  <InfoCard
    icon={GraduationCap}
    title="Advance Diploma in Software Engineering (ADSE)"
    subtitle="APTECH | Completed 3-Year Program"
  />
  
  <InfoCard
    icon={Calendar}
    title="Open to Work"
    subtitle="Freelance & Full-time Opportunities"
  />
          </div>

          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-card border border-black/5 dark:border-orange-400 rounded-2xl p-8 relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-orange-500/10 transition-colors duration-500" />

            <div className="relative z-10">
              <div className="flex items-center gap-2 text-orange-500 mb-6 font-heading">
                <MapPin size={18} />
                <span className="tracking-wide">Based in Pakistan</span>
              </div>
              <div className="space-y-6 text-lg leading-relaxed text-muted">
                <p>
                  I am a passionate Full Stack Developer with hands-on
                  experience in real-world projects, building scalable,
                  efficient, high-performing applications.
                </p>
                <p>
                  I combine technical expertise with strategic thinking to
                  deliver impactful digital solutions that bridge technology and
                  business, turning complex problems into clean, user-friendly
                  experiences.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
