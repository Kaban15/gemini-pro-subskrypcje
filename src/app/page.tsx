"use client";

import { Sparkles, Zap, Shield, MessageSquare } from "lucide-react";
import { PricingCard } from "@/components/PricingCard";
import { Benefits } from "@/components/Benefits";
import { Testimonials } from "@/components/Testimonials";
import { FAQ } from "@/components/FAQ";
import { Contact } from "@/components/Contact";
import { PRICE_IDS, PRICES, calculateYearlySavingsPercent } from "@/lib/stripe";

const FEATURES = [
  "Nieograniczony dostęp do Gemini Pro",
  "Priorytetowe czasy odpowiedzi",
  "Zaawansowane możliwości rozumowania",
  "Generowanie i analiza kodu",
  "Dostępność 24/7",
];

const YEARLY_FEATURES = [
  ...FEATURES,
  "Priorytetowe wsparcie",
  "Wczesny dostęp do nowych funkcji",
];

export default function Home() {
  const yearlySavings = calculateYearlySavingsPercent();

  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Hero Section */}
      <header className="relative overflow-hidden border-b border-zinc-800">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-6xl px-6 py-24 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-2">
            <Sparkles className="h-4 w-4 text-violet-400" />
            <span className="text-sm font-medium text-violet-300">
              Napędzany przez Google Gemini Pro
            </span>
          </div>
          <h1 className="mb-6 text-5xl font-bold tracking-tight text-white md:text-6xl">
            AI który rozumie
            <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
              {" "}
              Twoje potrzeby
            </span>
          </h1>
          <p className="mx-auto mb-10 max-w-2xl text-lg text-zinc-400">
            Uzyskaj dostęp do najbardziej zaawansowanego modelu AI od Google
            dzięki prostej subskrypcji. Inteligentne odpowiedzi, pomoc w
            programowaniu, kreatywne pisanie i więcej.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8">
            <div className="flex items-center gap-2 text-zinc-300">
              <Zap className="h-5 w-5 text-yellow-400" />
              <span>Błyskawicznie szybki</span>
            </div>
            <div className="flex items-center gap-2 text-zinc-300">
              <Shield className="h-5 w-5 text-emerald-400" />
              <span>Bezpieczny i prywatny</span>
            </div>
            <div className="flex items-center gap-2 text-zinc-300">
              <MessageSquare className="h-5 w-5 text-blue-400" />
              <span>Nielimitowane rozmowy</span>
            </div>
          </div>
        </div>
      </header>

      {/* Benefits Section */}
      <Benefits />

      {/* Testimonials Section */}
      <Testimonials />

      {/* Pricing Section */}
      <section id="pricing" className="mx-auto max-w-6xl px-6 py-24">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
            Prosty, przejrzysty cennik
          </h2>
          <p className="mx-auto max-w-xl text-zinc-400">
            Wybierz plan który Ci odpowiada. Możesz anulować w każdej chwili.
          </p>
        </div>

        <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-2">
          <PricingCard
            name="Miesięczny"
            price={PRICES.monthly.amount}
            interval={PRICES.monthly.interval}
            priceId={PRICE_IDS.monthly}
            features={FEATURES}
          />
          <PricingCard
            name="Roczny"
            price={PRICES.yearly.amount}
            interval={PRICES.yearly.interval}
            priceId={PRICE_IDS.yearly}
            features={YEARLY_FEATURES}
            popular
            savingsPercent={yearlySavings}
          />
        </div>
      </section>

      {/* FAQ Section */}
      <FAQ />

      {/* Contact Section */}
      <Contact />

      {/* Footer */}
      <footer className="border-t border-zinc-800 py-8 text-center text-sm text-zinc-500">
        <p>
          &copy; {new Date().getFullYear()} Gemini Pro SaaS. Wszelkie prawa
          zastrzeżone.
        </p>
      </footer>
    </div>
  );
}
