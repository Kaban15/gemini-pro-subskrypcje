"use client";

import { cn } from "@/lib/utils";

interface BillingToggleProps {
  isYearly: boolean;
  onToggle: (yearly: boolean) => void;
}

export function BillingToggle({ isYearly, onToggle }: BillingToggleProps) {
  return (
    <div className="flex items-center justify-center gap-4">
      <span
        className={cn(
          "text-sm font-medium transition-colors",
          !isYearly ? "text-white" : "text-zinc-500"
        )}
      >
        Miesięcznie
      </span>
      <button
        onClick={() => onToggle(!isYearly)}
        className="relative h-8 w-14 rounded-full bg-zinc-800 transition-colors hover:bg-zinc-700"
        aria-label={`Przełącz na płatność ${isYearly ? "miesięczną" : "roczną"}`}
      >
        <div
          className={cn(
            "absolute top-1 h-6 w-6 rounded-full bg-violet-500 transition-all duration-300",
            isYearly ? "left-7" : "left-1"
          )}
        />
      </button>
      <span
        className={cn(
          "text-sm font-medium transition-colors",
          isYearly ? "text-white" : "text-zinc-500"
        )}
      >
        Rocznie
      </span>
    </div>
  );
}
