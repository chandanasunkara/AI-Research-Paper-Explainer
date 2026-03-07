"use client";

import { Lightbulb } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface ELI12SectionProps {
  eli12: string;
}

export function ELI12Section({ eli12 }: ELI12SectionProps) {
  return (
    <Card className="bg-amber-50/80 border-l-4 border-l-amber-400 border-[#1a2332]/10">
      <CardHeader className="flex flex-row items-center gap-2">
        <Lightbulb className="h-5 w-5 text-amber-600" />
        <h3 className="font-heading text-lg font-semibold text-[#1a2332]">
          Explain Like I&apos;m 12
        </h3>
      </CardHeader>
      <CardContent>
        <p className="text-[#1a2332] leading-relaxed text-lg">{eli12}</p>
      </CardContent>
    </Card>
  );
}
