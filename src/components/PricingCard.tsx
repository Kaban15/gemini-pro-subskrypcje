"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { track } from "@vercel/analytics";
import { OrderModal } from "./OrderModal";

interface PricingCardProps {
  name: string;
  price: number;
  interval: string;
  priceId: string;
  features: string[];
  popular?: boolean;
  savingsPercent?: number;
}

export function PricingCard({
  name,
  price,
  interval,
  features,
  popular = false,
  savingsPercent,
}: PricingCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div
        className={cn(
          "relative flex flex-col rounded-2xl border p-8 shadow-lg transition-all duration-300 hover:scale-105",
          popular
            ? "border-violet-500 bg-gradient-to-b from-violet-500/10 to-transparent"
            : "border-zinc-800 bg-zinc-900/50"
        )}
      >
        {popular && (
          <div className="absolute -top-3 left-1/2 -translate-x-1/2">
            <span className="rounded-full bg-violet-500 px-4 py-1 text-sm font-medium text-white">
              Najpopularniejszy
            </span>
          </div>
        )}

        {savingsPercent && savingsPercent > 0 && (
          <div className="absolute -top-3 right-4">
            <span className="rounded-full bg-emerald-500 px-3 py-1 text-sm font-medium text-white">
              Oszczędzasz {savingsPercent}%
            </span>
          </div>
        )}

        <div className="mb-6">
          <h3 className="text-xl font-semibold text-white">{name}</h3>
          <div className="mt-4 flex items-baseline">
            <span className="text-5xl font-bold text-white">{price} zł</span>
            <span className="ml-2 text-zinc-400">/{interval}</span>
          </div>
        </div>

        <ul className="mb-8 flex-1 space-y-4">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center gap-3">
              <Check className="h-5 w-5 text-violet-400" />
              <span className="text-zinc-300">{feature}</span>
            </li>
          ))}
        </ul>

        <button
          onClick={() => {
            track("Select Plan", { plan: name, price });
            setIsModalOpen(true);
          }}
          className={cn(
            "w-full rounded-lg py-3 font-semibold transition-all duration-200",
            popular
              ? "bg-violet-500 text-white hover:bg-violet-600"
              : "bg-white text-zinc-900 hover:bg-zinc-100"
          )}
        >
          Subskrybuj
        </button>
      </div>

      <OrderModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        productName={name}
        price={price}
        interval={interval}
      />
    </>
  );
}
