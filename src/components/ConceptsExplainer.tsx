"use client";

import { BookOpen } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface ConceptsExplainerProps {
  concepts: { term: string; explanation: string }[];
}

export function ConceptsExplainer({ concepts }: ConceptsExplainerProps) {
  return (
    <Accordion className="w-full">
      {concepts.map(({ term, explanation }, i) => (
        <AccordionItem key={i} value={`term-${i}`}>
          <AccordionTrigger className="hover:no-underline">
            <span className="flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-[#1a2332]/70 shrink-0" />
              <span className="font-medium text-[#1a2332]">{term}</span>
            </span>
          </AccordionTrigger>
          <AccordionContent>
            <p className="text-[#1a2332]/90 leading-relaxed pl-6">
              {explanation}
            </p>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
