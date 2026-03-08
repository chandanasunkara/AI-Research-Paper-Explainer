"use client";

import Link from "next/link";
import { Github } from "lucide-react";

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-[#1a2332]/10 bg-[#FAFAF7]/95 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-4xl items-center justify-between px-4">
        <span className="font-heading text-lg font-semibold text-[#1a2332]">
          🧠 PaperExplainer
        </span>
        <Link
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#1a2332]/70 hover:text-[#1a2332] transition-colors"
          aria-label="GitHub"
        >
          <Github className="h-5 w-5" />
        </Link>
      </div>
    </nav>
  );
}
