"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { AnalysisResult } from "@/lib/types";

interface QuizSectionProps {
  quizQuestions: AnalysisResult["quizQuestions"];
}

export function QuizSection({ quizQuestions }: QuizSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  const question = quizQuestions[currentIndex];
  const isLastQuestion = currentIndex === quizQuestions.length - 1;

  const handleSelect = (optionIndex: number) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(optionIndex);
    const correct = optionIndex === question!.correctAnswer;
    if (correct) setScore((s) => s + 1);
  };

  const handleNext = () => {
    if (isLastQuestion) {
      setShowScore(true);
    } else {
      setCurrentIndex((i) => i + 1);
      setSelectedAnswer(null);
    }
  };

  const handleRetake = () => {
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setShowScore(false);
  };

  if (showScore) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <Card className="bg-[#FAFAF7]/80 border-[#1a2332]/10">
          <CardHeader>
            <h3 className="font-heading text-xl font-semibold text-[#1a2332]">
              Quiz Complete!
            </h3>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-2xl font-bold text-[#1a2332]">
              {score}/{quizQuestions.length}
              {score >= 4 ? " — Great job!" : score >= 3 ? " — Not bad!" : " — Keep studying!"}
            </p>
            <Button
              onClick={handleRetake}
              className="bg-[#1a2332] hover:bg-[#1a2332]/90 text-white"
            >
              Retake Quiz
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  if (!question) return null;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentIndex}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.2 }}
      >
        <Card className="bg-[#FAFAF7]/80 border-[#1a2332]/10">
          <CardHeader className="space-y-2">
            <p className="text-sm text-[#1a2332]/60">
              Question {currentIndex + 1} of {quizQuestions.length}
            </p>
            <Progress
              value={((currentIndex + 1) / quizQuestions.length) * 100}
              className="h-1.5"
            />
            <h3 className="font-heading text-lg font-semibold text-[#1a2332]">
              {question.question}
            </h3>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              {question.options.map((opt, i) => {
                const isSelected = selectedAnswer === i;
                const isCorrect = i === question.correctAnswer;
                const showResult = selectedAnswer !== null;
                const isRightAnswer = showResult && isCorrect;
                const isWrongChoice = showResult && isSelected && !isCorrect;

                return (
                  <motion.button
                    key={i}
                    onClick={() => handleSelect(i)}
                    disabled={selectedAnswer !== null}
                    className={`
                      w-full rounded-xl border-2 p-4 text-left transition-all
                      ${!showResult ? "hover:border-[#1a2332]/30 hover:bg-[#1a2332]/5" : ""}
                      ${isRightAnswer ? "border-green-500 bg-green-50" : ""}
                      ${isWrongChoice ? "border-red-400 bg-red-50" : ""}
                      ${!showResult && selectedAnswer === null ? "border-[#1a2332]/10" : ""}
                    `}
                    whileHover={selectedAnswer === null ? { scale: 1.01 } : {}}
                    whileTap={selectedAnswer === null ? { scale: 0.99 } : {}}
                  >
                    <span className="font-medium text-[#1a2332]">{opt}</span>
                  </motion.button>
                );
              })}
            </div>

            {selectedAnswer !== null && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-lg bg-[#1a2332]/5 p-4 border border-[#1a2332]/10"
              >
                <p className="text-sm font-medium text-[#1a2332]/80">
                  Explanation
                </p>
                <p className="mt-1 text-[#1a2332]">{question.explanation}</p>
              </motion.div>
            )}

            {selectedAnswer !== null && (
              <Button
                onClick={handleNext}
                className="w-full bg-[#1a2332] hover:bg-[#1a2332]/90 text-white"
              >
                {isLastQuestion ? "See Score" : "Next Question"}
              </Button>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </AnimatePresence>
  );
}
