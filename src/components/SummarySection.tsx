"use client";

import { BookOpen } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface SummarySectionProps {
  summary: string;
}

export function SummarySection({ summary }: SummarySectionProps) {
  return (
    <Card className="bg-[#FAFAF7]/80 border-[#1a2332]/10">
      <CardHeader className="flex flex-row items-center gap-2">
        <BookOpen className="h-5 w-5 text-[#1a2332]" />
        <h3 className="font-heading text-lg font-semibold text-[#1a2332]">
          Summary
        </h3>
      </CardHeader>
      <CardContent>
        <p className="text-lg leading-relaxed text-[#1a2332]">{summary}</p>
      </CardContent>
    </Card>
  );
}
