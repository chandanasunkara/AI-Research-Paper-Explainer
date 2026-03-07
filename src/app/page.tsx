"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { FileUp, Brain, BookOpen } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { FileUpload } from "@/components/FileUpload";
import { ResultsView } from "@/components/ResultsView";
import type { AnalysisResult } from "@/lib/types";

export default function Home() {
  const resultsRef = useRef<HTMLDivElement>(null);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const handleResult = (data: AnalysisResult) => {
    setResult(data);
    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-[#FAFAF7]">
      <Navbar />
      <main className="mx-auto max-w-3xl px-4 py-12">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="font-heading text-4xl font-bold text-[#1a2332] md:text-5xl">
            AI Research Paper Explainer
          </h1>
          <p className="mt-4 text-lg text-[#1a2332]/80">
            Upload any research paper and get an instant, student-friendly
            breakdown
          </p>
          <div className="mt-10">
            <FileUpload onResult={handleResult} />
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-16"
        >
          <h2 className="font-heading text-xl font-semibold text-[#1a2332] mb-6 text-center">
            How it works
          </h2>
          <div className="grid gap-6 sm:grid-cols-3">
            <div className="flex flex-col items-center rounded-xl border border-[#1a2332]/10 bg-white/60 p-6 text-center">
              <FileUp className="h-10 w-10 text-[#1a2332] mb-3" />
              <h3 className="font-heading font-semibold text-[#1a2332]">
                Upload PDF
              </h3>
              <p className="mt-1 text-sm text-[#1a2332]/70">
                Drop your research paper
              </p>
            </div>
            <div className="flex flex-col items-center rounded-xl border border-[#1a2332]/10 bg-white/60 p-6 text-center">
              <Brain className="h-10 w-10 text-[#1a2332] mb-3" />
              <h3 className="font-heading font-semibold text-[#1a2332]">
                AI Analyzes
              </h3>
              <p className="mt-1 text-sm text-[#1a2332]/70">
                Gemini extracts key ideas
              </p>
            </div>
            <div className="flex flex-col items-center rounded-xl border border-[#1a2332]/10 bg-white/60 p-6 text-center">
              <BookOpen className="h-10 w-10 text-[#1a2332] mb-3" />
              <h3 className="font-heading font-semibold text-[#1a2332]">
                Learn & Quiz
              </h3>
              <p className="mt-1 text-sm text-[#1a2332]/70">
                Summary, concepts, and quiz
              </p>
            </div>
          </div>
        </motion.section>

        {result && (
          <motion.section
            ref={resultsRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-20 pt-12 border-t border-[#1a2332]/10"
          >
            <ResultsView result={result} />
          </motion.section>
        )}
      </main>
    </div>
  );
}
