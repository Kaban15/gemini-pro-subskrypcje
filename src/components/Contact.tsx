"use client";

import { Mail } from "lucide-react";
import { track } from "@vercel/analytics";

function TelegramIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
    </svg>
  );
}

export function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-4xl px-6 pb-24">
      <div className="text-center mb-12">
        <div className="mb-6 inline-flex items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 p-5">
          <TelegramIcon className="h-10 w-10 text-white" />
        </div>
        <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
          Skontaktuj się ze mną
        </h2>
        <p className="text-zinc-400">
          Masz pytania? Chcesz złożyć zamówienie? Jestem tutaj, aby Ci pomóc!
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Telegram Card */}
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-8 text-center">
          <div className="mb-6 inline-flex items-center justify-center rounded-full bg-violet-500/20 p-4">
            <TelegramIcon className="h-8 w-8 text-violet-400" />
          </div>
          <h3 className="mb-3 text-xl font-bold text-white">Telegram</h3>
          <p className="mb-6 text-zinc-400">
            Najszybsza metoda kontaktu. Odpowiadam zwykle w ciągu kilku godzin.
          </p>
          <a
            href="https://t.me/prolifefit"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track("Contact Click", { method: "Telegram" })}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-violet-500 to-violet-600 px-6 py-3 font-semibold text-white transition-all hover:from-violet-600 hover:to-violet-700"
          >
            <TelegramIcon className="h-5 w-5" />
            @prolifefit
          </a>
        </div>

        {/* Email Card */}
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-8 text-center">
          <div className="mb-6 inline-flex items-center justify-center rounded-full bg-cyan-500/20 p-4">
            <Mail className="h-8 w-8 text-cyan-400" />
          </div>
          <h3 className="mb-3 text-xl font-bold text-white">Email</h3>
          <p className="mb-6 text-zinc-400">
            Napisz do mnie na adres email. Idealne dla dłuższych zapytań.
          </p>
          <a
            href="mailto:prolifefit777@gmail.com"
            onClick={() => track("Contact Click", { method: "Email" })}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 to-cyan-600 px-6 py-3 font-semibold text-white transition-all hover:from-cyan-600 hover:to-cyan-700"
          >
            <Mail className="h-5 w-5" />
            prolifefit777@gmail.com
          </a>
        </div>
      </div>
    </section>
  );
}
