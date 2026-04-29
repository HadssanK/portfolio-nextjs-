"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/data/projects";
import Loader from "@/components/Loader";

export default function ProjectsPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen bg-background text-muted font-sans selection:bg-orange-500/30 py-20 px-6 md:px-20 mt-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            <span className="text-foreground">My</span>{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
              Projects
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-muted text-lg max-w-2xl mx-auto"
          >
            A collection of real-world applications built with modern
            technologies and scalable architecture.
          </motion.p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative flex flex-col rounded-3xl bg-card border border-black/5 dark:border-orange-500/10 hover:border-orange-500/30 hover:shadow-[0_10px_40px_rgba(249,115,22,0.25)] transition-all duration-300 overflow-hidden"
            >
              {/* Image */}
              <div className="relative h-52 w-full overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-orange-400 transition-colors">
                  {project.title}
                </h3>

                <p className="text-muted text-sm leading-relaxed mb-6 flex-grow">
                  {project.shortDescription}
                </p>

                <div className="pt-4 border-t border-black/5 dark:border-orange-500/10">
                  <Link
                    href={`/projects/${project.id}`}
                    className="group/btn flex items-center gap-2 text-sm font-medium text-muted hover:text-orange-400 transition-colors"
                  >
                    <span className="w-8 h-[2px] bg-black/10 dark:bg-gray-600 group-hover/btn:w-12 group-hover/btn:bg-orange-500 transition-all duration-300" />
                    View Project
                    <ArrowUpRight
                      size={16}
                      className="opacity-0 -translate-x-2 group-hover/btn:opacity-100 group-hover/btn:translate-x-0 transition-all duration-300"
                    />
                  </Link>
                </div>
              </div>

              {/* Glow */}
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}