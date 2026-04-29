"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="w-9 h-9" />;

  const isDark = resolvedTheme === "dark";

  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      whileHover={{ scale: 1.1 }}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative w-9 h-9 rounded-full flex items-center justify-center 
                 bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/10 
                 text-orange-500 transition-colors duration-200 overflow-hidden"
      aria-label="Toggle Theme"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={theme}
          initial={{ y: 20, opacity: 0, rotate: -90 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          exit={{ y: -20, opacity: 0, rotate: 90 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="cursor-pointer"
        >
          {isDark ? (
            <Sun
              size={18}
              strokeWidth={2.5}
              className="text-yellow-400 
                         drop-shadow-[0_0_5px_rgba(255,255,150,0.8)] 
                         drop-shadow-[0_0_10px_rgba(255,200,0,0.7)] 
                         drop-shadow-[0_0_15px_rgba(255,180,0,0.6)]"
            />
          ) : (
            <Moon
              size={18}
              strokeWidth={2.5}
              className="text-orange-500 drop-shadow-[0_0_5px_rgba(200,200,255,0.6)]"
            />
          )}
        </motion.div>
      </AnimatePresence>
    </motion.button>
  );
}