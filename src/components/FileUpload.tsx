"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { motion } from "framer-motion";
import { FileUp, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LoadingState } from "./LoadingState";
import type { AnalysisResult } from "@/lib/types";

interface FileUploadProps {
  onResult: (result: AnalysisResult) => void;
}

export function FileUpload({ onResult }: FileUploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setError(null);
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]!);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "application/pdf": [".pdf"] },
    maxSize: 10 * 1024 * 1024,
    maxFiles: 1,
    disabled: loading,
    onDropRejected: (rejections) => {
      const first = rejections[0];
      if (first?.errors[0]?.code === "file-too-large") {
        setError("File is too large. Maximum size is 10 MB.");
      } else if (first?.errors[0]?.code === "file-invalid-type") {
        setError("Only PDF files are accepted.");
      } else {
        setError("Invalid file. Please upload a PDF under 10 MB.");
      }
    },
  });

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append("paper", file);
      const res = await fetch("/api/analyze", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error ?? "Analysis failed");
      }
      onResult(data as AnalysisResult);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleRetry = () => {
    setError(null);
    setFile(null);
  };

  if (loading) {
    return <LoadingState />;
  }

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={`
          flex flex-col items-center justify-center rounded-xl border-2 border-dashed p-12
          transition-colors cursor-pointer
          ${isDragActive ? "border-[#1a2332] bg-[#1a2332]/5" : "border-[#1a2332]/30 hover:border-[#1a2332]/50 hover:bg-[#1a2332]/5"}
        `}
      >
        <input {...getInputProps()} />
        <FileUp className="h-12 w-12 text-[#1a2332]/60 mb-4" />
        <p className="text-[#1a2332] font-medium mb-1">
          {isDragActive ? "Drop your PDF here" : "Drag & drop a research paper PDF"}
        </p>
        <p className="text-sm text-[#1a2332]/60">or click to browse · max 10 MB</p>
      </div>

      {file && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between rounded-xl bg-white/80 p-4 shadow-sm border border-[#1a2332]/10"
        >
          <p className="text-[#1a2332] font-medium truncate">{file.name}</p>
          <Button
            onClick={handleUpload}
            className="bg-[#1a2332] hover:bg-[#1a2332]/90 text-white"
          >
            Analyze Paper
          </Button>
        </motion.div>
      )}

      {error && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center gap-3 rounded-xl bg-red-50 border border-red-200 p-4 text-red-800"
        >
          <AlertCircle className="h-5 w-5 shrink-0" />
          <div className="flex-1">
            <p className="font-medium">Error</p>
            <p className="text-sm">{error}</p>
          </div>
          <Button variant="outline" size="sm" onClick={handleRetry}>
            Try Again
          </Button>
        </motion.div>
      )}
    </div>
  );
}
