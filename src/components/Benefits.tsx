"use client";

import {
  Mail,
  ChefHat,
  Languages,
  FileText,
  PenTool,
  Image,
  HelpCircle,
  Wallet,
  ArrowRight,
} from "lucide-react";

const benefits = [
  {
    icon: Mail,
    title: "Pisanie pism i trudnych e-maili w 5 sekund",
    description:
      "Musisz napisać reklamację butów, podanie do spółdzielni albo delikatnego maila do szefa? Nie męcz się nad \"białą kartką\". Powiedz AI w dwóch słowach, o co chodzi, a otrzymasz gotowy, profesjonalny tekst do wysłania.",
  },
  {
    icon: ChefHat,
    title: "Brak pomysłu na obiad (lub prezent)",
    description:
      "Otwierasz lodówkę i widzisz \"światło\"? Wpisz listę składników, które masz, a AI poda Ci przepis na pyszne danie. Szukasz prezentu dla teściowej do 100 zł? Dostaniesz 10 konkretnych propozycji z linkami.",
  },
  {
    icon: Languages,
    title: "Tłumacz, który rozumie kontekst",
    description:
      "Wyjeżdżasz za granicę i boisz się bariery językowej? A może dostałeś instrukcję po niemiecku? AI przetłumaczy to dla Ciebie tak, jakby zrobił to człowiek, a nie maszyna – naturalnie i zrozumiale.",
  },
  {
    icon: FileText,
    title: "Szybka wiedza bez czytania elaboratów",
    description:
      "Masz przed sobą długą umowę lub artykuł i brak czasu? Wklej tekst i poproś o \"najważniejsze 3 punkty\". Dowiesz się wszystkiego w minutę, pijąc poranną kawę.",
  },
  {
    icon: PenTool,
    title: "Korekta Twoich tekstów",
    description:
      "Piszesz ważne ogłoszenie lub post na Facebooka? AI sprawdzi interpunkcję, usunie literówki i podpowie, jak napisać to ładniej, żeby przyciągnąć uwagę.",
  },
  {
    icon: Image,
    title: "Generowanie obrazów, filmów i więcej",
    description:
      "Potrzebujesz unikalnej grafiki na social media, okładkę do projektu albo krótki film? Opisz słowami, co chcesz zobaczyć, a AI stworzy to dla Ciebie w kilka sekund. Bez Photoshopa, bez umiejętności graficznych.",
  },
];

const objections = [
  {
    icon: HelpCircle,
    title: "Czy to jest dla mnie?",
    description:
      "Tak, jeśli cenisz swój czas. Nie musisz być informatykiem. Jeśli potrafisz czatować na Messengerze lub WhatsAppie, potrafisz korzystać z AI.",
  },
  {
    icon: Wallet,
    title: "Czy to kosztuje fortunę?",
    description:
      "Absolutnie nie! U mnie pełny dostęp do AI kosztuje tylko 30 zł miesięcznie. A jeśli zdecydujesz się na subskrypcję roczną, cena spada do zaledwie 20 zł miesięcznie. To mniej niż kawa w kawiarni, a zyskujesz asystenta dostępnego 24/7.",
  },
];

export function Benefits() {
  return (
    <section id="benefits" className="mx-auto max-w-6xl px-6 py-24">
      {/* Header */}
      <div className="mb-12 text-center">
        <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
          Co zyskasz dzięki{" "}
          <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
            AI
          </span>
          ?
        </h2>
        <p className="mx-auto max-w-3xl text-lg text-zinc-400">
          AI to nie roboty z filmów. To Twój darmowy asystent do codziennych spraw.
        </p>
      </div>

      {/* Intro */}
      <div className="mb-16 rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 md:p-8 text-center">
        <p className="text-zinc-300 leading-relaxed">
          Boisz się, że to skomplikowane? <span className="text-white font-medium">Niepotrzebnie.</span> Obsługa dzisiejszych narzędzi AI jest tak prosta, jak wysłanie SMS-a czy wpisanie hasła w Google. Różnica jest taka, że po drugiej stronie masz pomocnika, który nigdy się nie męczy i ma odpowiedź na (prawie) wszystko.
        </p>
      </div>

      {/* Benefits title */}
      <h3 className="mb-8 text-2xl font-bold text-white text-center">
        W czym wyręczy Cię sztuczna inteligencja?
      </h3>

      {/* Benefits grid */}
      <div className="mb-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {benefits.map((benefit, index) => (
          <div
            key={index}
            className="group rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 transition-all duration-300 hover:border-violet-500/50 hover:bg-zinc-900"
          >
            <div className="mb-4 inline-flex items-center justify-center rounded-xl bg-violet-500/20 p-3">
              <benefit.icon className="h-6 w-6 text-violet-400" />
            </div>
            <h4 className="mb-3 text-lg font-semibold text-white">
              {benefit.title}
            </h4>
            <p className="text-zinc-400 leading-relaxed text-sm">
              {benefit.description}
            </p>
          </div>
        ))}
      </div>

      {/* Objections section */}
      <div className="mb-16">
        <div className="grid gap-6 md:grid-cols-2">
          {objections.map((objection, index) => (
            <div
              key={index}
              className="rounded-2xl border border-zinc-800 bg-gradient-to-br from-zinc-900 to-zinc-900/50 p-6"
            >
              <div className="mb-4 flex items-center gap-3">
                <div className="inline-flex items-center justify-center rounded-full bg-cyan-500/20 p-2">
                  <objection.icon className="h-5 w-5 text-cyan-400" />
                </div>
                <h4 className="text-lg font-semibold text-white">
                  {objection.title}
                </h4>
              </div>
              <p className="text-zinc-400 leading-relaxed">
                {objection.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="rounded-2xl border border-violet-500/30 bg-gradient-to-br from-violet-500/10 to-cyan-500/10 p-8 md:p-12 text-center">
        <h3 className="mb-4 text-2xl font-bold text-white md:text-3xl">
          Sprawdź sam – to nic nie kosztuje
        </h3>
        <p className="mx-auto mb-8 max-w-2xl text-zinc-300">
          Nie wierz na słowo. Wejdź, wpisz proste pytanie (np. &quot;Jak doprać plamę z trawy?&quot; albo &quot;Napisz życzenia urodzinowe dla wujka&quot;) i zobacz, jak technologia pracuje dla Ciebie.
        </p>
        <a
          href="#pricing"
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-500 to-cyan-500 px-8 py-4 font-semibold text-white transition-all hover:from-violet-600 hover:to-cyan-600"
        >
          Rozpocznij teraz
          <ArrowRight className="h-5 w-5" />
        </a>
      </div>
    </section>
  );
}
