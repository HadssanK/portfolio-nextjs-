"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  GraduationCap,
  Briefcase,
  Code2,
  User,
  MapPin,
  Calendar,
  Award,
} from "lucide-react";
import Loader from "@/components/Loader";

// --- Data ---
const educationData = [
  {
    id: "1",
    year: "2020",
    title: "Class 10th",
    institution: "Govt High School",
  },
  {
    id: "2",
    year: "2025",
    title: "Class 12th (FSC)",
    institution: "Ziauddin College",
  },
  {
  id: "3",
  year: "2021 - 2024",
  title: "Advance Diploma in Software Engineering (ADSE)",
  institution: "APTECH",
},
];

const experienceData = [
{
  id: "1",
  year: "2026 - Present",
  role: "FRONT END DEVELOPER",
  company: "Bidec",
  description:
    "Building and maintaining web applications with Next.js, creating seamless user experiences and scalable solutions.",
},

  {
    id: "3",
    year: "2025",
    role: "WEB DEVELOPER INTERN",
    company: "Global Iconic",
    description:
      "Developed responsive UI components and optimized performance.",
  },
];

const skillsData = [
  { id: "1", name: "HTML5", icon: "/html.svg" },
  { id: "2", name: "CSS3", icon: "/css.svg" },
  { id: "3", name: "JavaScript", icon: "/js.svg" },
  
  { id: "5", name: "React", icon: "/react.svg" },
  { id: "6", name: "Next.js", icon: "/next.svg" },
  { id: "7", name: "Tailwind", icon: "/tailwind.svg" },
  { id: "8", name: "Bootstrap", icon: "/bootstrap.svg" },
  { id: "10", name: "Node.js", icon: "/node.png" },
  { id: "11", name: "Express", icon: "/express.png" },
  { id: "12", name: "MongoDB", icon: "/mongo.svg" },
 
  { id: "14", name: "MySQL", icon: "/sql.svg" },

  { id: "15", name: "Git", icon: "/git.svg" },
  { id: "16", name: "GitHub", icon: "/githun.png" },
  
  { id: "19", name: "Material UI", icon: "/mui.jpg" },
  { id: "20", name: "Vercel", icon: "/vercel.png" },
  { id: "21", name: "Netlify", icon: "/netlify.svg" },
  
];

const profileData = {
  name: "Muhammad Hassan",
  role: "Full Stack Developer",
  location: "Pakistan",
  email: "hassantheDev945@gmail.com",
  phone: "+92 330 0273758",
  bio: "A passionate Full Stack Developer with hands-on experience in real-world projects, delivering scalable, efficient, and user-friendly applications across the web.",
};

const TabButton = ({ active, onClick, icon: Icon, label }) => {
  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="relative flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-sm transition-all duration-300"
    >
      {active && (
        <motion.div
          layoutId="activeTab"
          className="absolute inset-0 rounded-xl bg-orange-600 shadow-lg shadow-orange-500/40"
          transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
        />
      )}

      <span
        className={`relative z-10 flex items-center gap-2 transition-colors ${
          active ? "text-white" : "text-muted hover:text-orange-400"
        }`}
      >
        <Icon size={18} />
        {label}
      </span>
    </motion.button>
  );
};

const EducationCard = ({ item, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative p-6 rounded-2xl bg-card border border-orange-500/10 hover:border-orange-500/30 hover:shadow-[0_10px_40px_rgba(249,115,22,0.25)] transition-all duration-300"
    >
      <div className="inline-flex items-center px-3 py-1 rounded-full bg-orange-500/20 text-orange-400 text-xs font-medium mb-4">
        <Calendar size={12} className="mr-1.5" />
        {item.year}
      </div>

      <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-orange-400 transition-colors">
        {item.title}
      </h3>

      <div className="flex items-center gap-2 text-muted text-sm">
        <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
        {item.institution}
      </div>

      <div className="absolute -bottom-2 -right-2 w-24 h-24 bg-orange-500/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </motion.div>
  );
};

const ExperienceCard = ({ item, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative p-6 rounded-2xl bg-card border border-orange-500/10 hover:border-orange-500/30 hover:shadow-[0_10px_40px_rgba(249,115,22,0.25)] transition-all duration-300"
    >
      <div className="inline-flex items-center px-3 py-1 rounded-full bg-orange-500/20 text-orange-400 text-xs font-medium mb-4">
        <Calendar size={12} className="mr-1.5" />
        {item.year}
      </div>

      <h3 className="text-lg font-bold text-foreground mb-1 group-hover:text-orange-400 transition-colors">
        {item.role}
      </h3>

      <p className="text-orange-400/80 text-sm font-medium mb-3">
        {item.company}
      </p>

      <p className="text-muted text-sm leading-relaxed">
        {item.description}
      </p>

      <div className="absolute -bottom-2 -right-2 w-24 h-24 bg-orange-500/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </motion.div>
  );
};

const SkillCard = ({ skill, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.1, delay: index * 0.03 }}
      whileHover={{ scale: 1.08 }}
      className="group relative h-24 rounded-xl bg-card border border-black/5 dark:border-zinc-800 hover:border-orange-500/50 transition-all duration-300 flex items-center justify-center cursor-pointer hover:shadow-[0_10px_40px_rgba(249,115,22,0.25)]"
    >
      <Image
        src={skill.icon}
        alt={skill.name}
        width={40}
        height={40}
        className="object-contain"
      />

      <span className="absolute -top-8 py-1.5 px-4 text-xs font-bold bg-card text-foreground rounded-md border border-orange-400/20 opacity-0 group-hover:opacity-100 transition-all duration-300">
        {skill.name}
      </span>
    </motion.div>
  );
};

const ProfileCard = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="p-8 rounded-2xl bg-card border border-black/5 dark:border-orange-500/20 hover:shadow-[0_10px_40px_rgba(249,115,22,0.25)] transition-all duration-300"
    >
      <div className="flex flex-col md:flex-row gap-8 items-start">
        <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white text-3xl font-bold shadow-lg shadow-orange-500/25">
          {profileData.name.charAt(0)}
        </div>

        <div className="flex-1">
          <h3 className="text-2xl font-bold text-foreground mb-1">
            {profileData.name}
          </h3>

          <p className="text-orange-400 font-medium mb-4">
            {profileData.role}
          </p>

          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex items-center gap-2 text-muted text-sm">
              <MapPin size={16} className="text-orange-500" />
              {profileData.location}
            </div>
          </div>

          <p className="text-muted leading-relaxed">
            {profileData.bio}
          </p>

          <div className="mt-6 pt-6 border-t border-black/5 dark:border-orange-500/10 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-muted text-xs uppercase tracking-wider mb-1">
                Email
              </p>
              <a
                href={`mailto:${profileData.email}`}
                className="text-foreground text-sm hover:text-orange-400 transition-colors duration-200 underline-offset-2 hover:underline"
              >
                {profileData.email}
              </a>
            </div>

            <div>
              <p className="text-muted text-xs uppercase tracking-wider mb-1">
                Phone
              </p>
              <a
                href={`tel:${profileData.phone.replace(/\s/g, "")}`}
                className="text-foreground text-sm hover:text-orange-400 transition-colors duration-200 underline-offset-2 hover:underline"
              >
                {profileData.phone}
              </a>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default function PersonalOverview() {
  const [activeTab, setActiveTab] = useState("education");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const tabs = [
    { id: "education", label: "Education", icon: GraduationCap },
    { id: "experience", label: "Experience", icon: Briefcase },
    { id: "skills", label: "Skills", icon: Code2 },
    { id: "profile", label: "Profile", icon: User },
  ];

  if (loading) return <Loader />;

  return (
   <div className="min-h-screen bg-background text-muted font-sans selection:bg-orange-500/30 mt-8 py-20 px-6 md:px-20 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            <span className="text-foreground">Personal</span>{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
              Overview
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-muted text-lg max-w-3xl mx-auto"
          >
            Discover my journey, skills, and passion for creating innovative
            digital solutions
          </motion.p>
        </div>

        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex w-fit mx-auto flex-wrap justify-center gap-2 p-2 rounded-2xl bg-card border border-black/10 dark:border-white/5 shadow-xl mb-12"
        >
          {tabs.map((tab) => (
            <TabButton
              key={tab.id}
              active={activeTab === tab.id}
              onClick={() => setActiveTab(tab.id)}
              icon={tab.icon}
              label={tab.label}
            />
          ))}
        </motion.div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {activeTab === "education" && (
            <motion.div
              key="education"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Section Title */}
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-xl bg-orange-500/20 flex items-center justify-center text-orange-500">
                  <GraduationCap size={24} />
                </div>
                <h3 className="text-3xl font-bold text-foreground">
                  Education
                </h3>
              </div>

              <p className="text-muted mb-8 w-auto">
                I am Full Stack Developer with hands-on experience in real-world projects. I combine technical skills with a passion for learning and strategic problem-solving. Below are my education detail
              </p>

              {/* Education Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {educationData.map((item, index) => (
                  <EducationCard key={item.id} item={item} index={index} />
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === "experience" && (
            <motion.div
              key="experience"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Section Title */}
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-xl bg-orange-500/20 flex items-center justify-center text-orange-500">
                  <Briefcase size={24} />
                </div>
                <h3 className="text-3xl font-bold text-foreground">
                  Experience
                </h3>
              </div>

              <p className="text-muted mb-8 w-auto">
                Over a year of experience building high-quality digital products, delivering scalable, efficient, and user-friendly applications across the full stack.
              </p>

              {/* Experience Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {experienceData.map((item, index) => (
                  <ExperienceCard key={item.id} item={item} index={index} />
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === "skills" && (
            <motion.div
              key="skills"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Section Title */}
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-xl bg-orange-500/20 flex items-center justify-center text-orange-500">
                  <Code2 size={24} />
                </div>
                <h3 className="text-3xl font-bold text-foreground">Skills</h3>
              </div>

              <p className="text-muted mb-8 w-auto">
               Hands-on experience in building responsive web applications with Next.js and React.js, integrating backend and database functionality, and exploring AI-driven tools.
              </p>

              {/* Skills Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {skillsData.map((skill, index) => (
                  <SkillCard key={skill.id} skill={skill} index={index} />
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === "profile" && (
            <motion.div
              key="profile"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Section Title */}
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-xl bg-orange-500/20 flex items-center justify-center text-orange-500">
                  <User size={24} />
                </div>
                <h3 className="text-3xl font-bold text-foreground">Profile</h3>
              </div>

              {/* Profile Card */}
              <ProfileCard />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}