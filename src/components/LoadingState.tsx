"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Brain } from "lucide-react";

const MESSAGES = [
  "Reading your paper...",
  "Extracting key ideas...",
  "Generating quiz questions...",
  "Almost done...",
];

export function LoadingState() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % MESSAGES.length);
    }, 3000);
    return () => clearInterval(id);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center rounded-xl border border-[#1a2332]/10 bg-white/80 p-12 shadow-sm"
    >
      <motion.div
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <Brain className="h-16 w-16 text-[#1a2332]" />
      </motion.div>
      <p className="mt-4 text-[#1a2332] font-medium">Analyzing your paper</p>
      <AnimatePresence mode="wait">
        <motion.p
          key={index}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          className="mt-1 text-sm text-[#1a2332]/60"
        >
          {MESSAGES[index]}
        </motion.p>
      </AnimatePresence>
      <div className="mt-6 flex gap-1">
        {MESSAGES.map((_, i) => (
          <motion.div
            key={i}
            className="h-1.5 w-1.5 rounded-full bg-[#1a2332]/30"
            animate={{ opacity: i === index ? 1 : 0.4 }}
            transition={{ duration: 0.3 }}
          />
        ))}
      </div>
    </motion.div>
  );
}
