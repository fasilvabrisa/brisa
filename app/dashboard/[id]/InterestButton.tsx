"use client";

import { useTransition } from "react";
import { toggleInterest } from "@/app/actions/requests";

interface Props {
  requestId: string;
  hasInterest: boolean;
  count: number;
}

export function InterestButton({ requestId, hasInterest, count }: Props) {
  const [pending, startTransition] = useTransition();

  function handleClick() {
    startTransition(() => {
      toggleInterest(requestId);
    });
  }

  return (
    <button
      onClick={handleClick}
      disabled={pending}
      className={`inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold transition-colors disabled:opacity-60 disabled:cursor-not-allowed ${
        hasInterest
          ? "bg-blue-600 text-white hover:bg-blue-700"
          : "border border-blue-600 text-blue-600 hover:bg-blue-50"
      }`}
    >
      {hasInterest ? "✓ Tenho interesse" : "Quero ajudar"}
      {count > 0 && (
        <span
          className={`rounded-full px-2 py-0.5 text-xs font-medium ${
            hasInterest ? "bg-blue-500 text-white" : "bg-blue-100 text-blue-700"
          }`}
        >
          {count}
        </span>
      )}
    </button>
  );
}
