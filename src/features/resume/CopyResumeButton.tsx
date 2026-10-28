"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

/** Copies the résumé as plain text, with a short "Copied" confirmation. */
export function CopyResumeButton({ text, className }: { text: string; className?: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard blocked: nothing to do, the PDF is still available.
    }
  };

  return (
    <button type="button" onClick={copy} className={className}>
      {copied ? <Check className="w-3.5 h-3.5" aria-hidden="true" /> : <Copy className="w-3.5 h-3.5" aria-hidden="true" />}
      {copied ? "Copied" : "Copy as text"}
    </button>
  );
}
