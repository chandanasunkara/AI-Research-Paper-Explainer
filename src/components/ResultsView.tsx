"use client";

import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { FileDown } from "lucide-react";
import { SummarySection } from "./SummarySection";
import { KeyContributions } from "./KeyContributions";
import { ConceptsExplainer } from "./ConceptsExplainer";
import { ELI12Section } from "./ELI12Section";
import { QuizSection } from "./QuizSection";
import type { AnalysisResult } from "@/lib/types";

interface ResultsViewProps {
  result: AnalysisResult;
}

export function ResultsView({ result }: ResultsViewProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <h2 className="font-heading text-2xl font-bold text-[#1a2332]">
          Your Analysis
        </h2>
      </div>

      <Tabs defaultValue="summary" className="w-full">
        <TabsList className="bg-[#1a2332]/5 border border-[#1a2332]/10">
          <TabsTrigger value="summary">Summary</TabsTrigger>
          <TabsTrigger value="contributions">Contributions</TabsTrigger>
          <TabsTrigger value="concepts">Concepts</TabsTrigger>
          <TabsTrigger value="eli12">Explain Like I'm 12</TabsTrigger>
          <TabsTrigger value="quiz">Quiz</TabsTrigger>
        </TabsList>
        <TabsContent value="summary" className="mt-6">
          <SummarySection summary={result.summary} />
        </TabsContent>
        <TabsContent value="contributions" className="mt-6">
          <KeyContributions contributions={result.keyContributions} />
        </TabsContent>
        <TabsContent value="concepts" className="mt-6">
          <ConceptsExplainer concepts={result.concepts} />
        </TabsContent>
        <TabsContent value="eli12" className="mt-6">
          <ELI12Section eli12={result.eli12} />
        </TabsContent>
        <TabsContent value="quiz" className="mt-6">
          <QuizSection quizQuestions={result.quizQuestions} />
        </TabsContent>
      </Tabs>
    </motion.div>
  );
}
