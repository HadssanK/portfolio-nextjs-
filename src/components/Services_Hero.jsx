"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  Globe,
  Smartphone,
  Trophy,
  Users,
  Cloud,
  Building2,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

// --- Data ---
const services = [
  {
    id: "1",
    title: "Frontend Development",
    description:
      "Building modern, responsive web interfaces using React.js and Next.js with clean and maintainable code.",
    icon: Globe,
  },
  {
    id: "2",
    title: "Responsive Design",
    description:
      "Creating mobile-first, fully responsive layouts that adapt smoothly across all screen sizes using Tailwind CSS.",
    icon: Smartphone,
  },
  {
    id: "3",
    title: "UI Implementation",
    description:
      "Converting Figma and design mockups into pixel-perfect, interactive user interfaces with attention to detail.",
    icon: Trophy,
  },
  {
    id: "4",
    title: "Performance Optimization",
    description:
      "Optimizing frontend performance with efficient rendering, lazy loading, and fast-loading UI components.",
    icon: Users,
  },
  {
    id: "5",
    title: "API Integration",
    description:
      "Connecting frontend applications with REST APIs, handling data efficiently with proper state management.",
    icon: Cloud,
  },
  {
    id: "6",
    title: "Bug Fixing & Improvements",
    description:
      "Fixing UI issues, improving design consistency, and enhancing user experience in existing projects.",
    icon: Building2,
  },
];
// --- Components ---
const ServiceCard = ({ service, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="group relative flex flex-col p-8 bg-card border border-black/5 dark:border-orange-500/30 hover:shadow-[0_10px_40px_rgba(249,115,22,0.25)] rounded-3xl hover:border-orange-500 transition-all duration-300"
    >
      {/* Icon Container */}
      <div className="mb-3 w-14 h-14 flex items-center justify-center rounded-2xl bg-orange-200/10 text-orange-500 group-hover:bg-orange-500 group-hover:text-white transition-colors duration-300 shadow-lg">
        <service.icon size={28} strokeWidth={1.5} />
      </div>

      {/* Content */}
      <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-orange-400 transition-colors">
        {service.title}
      </h3>
      <p className="text-muted text-sm leading-relaxed mb-3 flex-grow">
        {service.description}
      </p>
      {/* Decorative gradient blob on hover */}
      <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    </motion.div>
  );
};

export default function ServicesExpertise() {
  return (
    <div className="min-h-screen bg-background text-muted px-6 md:px-20 py-10 selection:bg-orange-500/30 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-orange-500 font-mono text-sm tracking-widest uppercase mb-3 block">
              What I Do
            </span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
              Services &{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
                Expertise
              </span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link
              href="/services"
              className="group flex items-center gap-2 text-muted hover:text-orange-400 transition-colors text-sm font-medium"
            >
              View All Services
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
          </motion.div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}