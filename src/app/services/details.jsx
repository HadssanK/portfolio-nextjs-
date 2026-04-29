"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Globe, Code2, Server, Shield, ArrowUpRight, Brain, Sparkles, Zap } from "lucide-react";
import Loader from "@/components/Loader";

// --- Data ---
const services = [
  {
    id: "1",
    number: "01",
    title: "Frontend Development",
    description: "Building responsive, modern, and visually appealing user interfaces using React and Next.js with clean, maintainable code.",
    icon: Code2,
    gradient: "from-purple-500 to-pink-400",
  },
  {
    id: "2",
    number: "02",
    title: "Responsive Web Design",
    description: "Creating fully responsive layouts that work seamlessly across mobile, tablet, and desktop using Tailwind CSS and modern CSS techniques.",
    icon: Globe,
    gradient: "from-blue-500 to-cyan-400",
  },
  {
    id: "3",
    number: "03",
    title: "UI Implementation",
    description: "Converting Figma, PSD, or design mockups into pixel-perfect, high-quality frontend interfaces with attention to detail.",
    icon: Sparkles,
    gradient: "from-orange-500 to-amber-400",
  },
  {
    id: "4",
    number: "04",
    title: "Performance Optimization",
    description: "Improving website performance with optimized images, lazy loading, and efficient component structure for faster load times.",
    icon: Zap,
    gradient: "from-green-500 to-emerald-400",
  },
  {
    id: "5",
    number: "05",
    title: "API Integration",
    description: "Integrating REST APIs into frontend applications with proper state management, error handling, and smooth user experience.",
    icon: Server,
    gradient: "from-teal-500 to-cyan-400",
  },
  {
    id: "6",
    number: "06",
    title: "Bug Fixing & UI Improvements",
    description: "Fixing UI issues, improving layouts, and enhancing existing frontend code for better usability and design consistency.",
    icon: Shield,
    gradient: "from-violet-500 to-purple-400",
  },
];;

// --- Components ---
const ServiceCard = ({ service, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className="group relative flex flex-col p-8 rounded-3xl bg-card border border-black/5 dark:border-orange-500/10 hover:border-orange-500/30 hover:shadow-[0_10px_40px_rgba(249,115,22,0.25)] transition-all duration-300 h-full"
  >
    <div className="flex items-start justify-between mb-6">
      <span className="text-5xl font-bold text-muted/30 group-hover:text-orange-500/30 transition-colors duration-300 select-none">
        {service.number}
      </span>
      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center text-white shadow-lg transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
        <service.icon size={28} strokeWidth={1.5} />
      </div>
    </div>
    <h3 className="text-xl font-bold text-foreground mb-4 group-hover:text-orange-400 transition-colors leading-tight">
      {service.title}
    </h3>
    <p className="text-muted text-sm leading-relaxed mb-6 flex-grow">
      {service.description}
    </p>
    <div className="pt-4 border-t border-black/5 dark:border-orange-500/10">
      <Link href="/contact" className="group/btn flex items-center gap-2 text-sm font-medium text-muted hover:text-orange-400 transition-colors">
        <span className="w-8 h-[2px] bg-black/10 dark:bg-gray-600 group-hover/btn:w-12 group-hover/btn:bg-orange-500 transition-all duration-300" />
        Get in Touch
        <ArrowUpRight size={16} className="opacity-0 -translate-x-2 group-hover/btn:opacity-100 group-hover/btn:translate-x-0 transition-all duration-300" />
      </Link>
    </div>
    <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
  </motion.div>
);

export default function SolutionsIProvide() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen bg-background text-muted font-sans selection:bg-orange-500/30 py-20 px-6 md:px-20 mt-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            <span className="text-foreground">Solutions</span>{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
              I Provide
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-muted text-lg max-w-2xl mx-auto"
          >
            Comprehensive solutions tailored to meet your unique business needs
          </motion.p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}