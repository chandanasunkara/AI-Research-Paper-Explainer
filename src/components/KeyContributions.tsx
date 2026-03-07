"use client";

import { Check } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface KeyContributionsProps {
  contributions: string[];
}

export function KeyContributions({ contributions }: KeyContributionsProps) {
  return (
    <Card className="bg-[#FAFAF7]/80 border-[#1a2332]/10">
      <CardHeader>
        <h3 className="font-heading text-lg font-semibold text-[#1a2332]">
          Key Contributions
        </h3>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {contributions.map((item, i) => (
            <li
              key={i}
              className="flex gap-3 items-start rounded-lg bg-white/60 p-3 border border-[#1a2332]/5"
            >
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#1a2332]/10 text-[#1a2332] text-sm font-medium">
                {i + 1}
              </span>
              <Check className="h-5 w-5 shrink-0 text-[#1a2332]/70 mt-0.5" />
              <p className="text-[#1a2332] leading-relaxed">{item}</p>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
