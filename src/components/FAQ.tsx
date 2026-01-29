"use client";

import { useState } from "react";
import { ChevronUp } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqItems: FAQItem[] = [
  {
    question: "Czy muszę zakładać nowe konto, aby korzystać z usługi?",
    answer:
      "Nie, dodaję Twoje istniejące konto do rodziny/zespołu. Korzystasz ze swojego dotychczasowego konta, tylko z rozszerzonymi funkcjami premium.",
  },
  {
    question: "Jak szybko otrzymam dostęp po zamówieniu?",
    answer:
      "Zazwyczaj aktywuję dostęp w ciągu 24 godzin od otrzymania potwierdzenia płatności. W wielu przypadkach dzieje się to znacznie szybciej, nawet w ciągu kilku minut.",
  },
  {
    question: "Czy moje dane są bezpieczne?",
    answer:
      "Tak, dbam o bezpieczeństwo danych moich klientów. W większości przypadków potrzebuję jedynie adresu email powiązanego z kontem, aby dodać je do rodziny/zespołu. Nie wymagam haseł ani innych wrażliwych danych.",
  },
  {
    question: "Jakie metody płatności akceptujesz?",
    answer:
      "Akceptuję przelewy bankowe, BLIK, kryptowaluty oraz popularne portfele elektroniczne jak Revolut czy Zen. Szczegółowe informacje o płatności otrzymasz po kontakcie i wyborze usługi.",
  },
  {
    question: "Jak długo ważny jest dostęp do subskrypcji?",
    answer:
      "Okres ważności zależy od wybranej usługi i pakietu. Niektóre subskrypcje są miesięczne, inne roczne. Dokładny czas trwania jest zawsze podany w opisie danej usługi.",
  },
  {
    question: "Czy mogę przedłużyć subskrypcję po jej wygaśnięciu?",
    answer:
      "Tak, istnieje możliwość przedłużenia subskrypcji. Wystarczy skontaktować się ze mną przed wygaśnięciem obecnego dostępu, aby omówić szczegóły przedłużenia.",
  },
  {
    question: "Czy mogę korzystać z usługi na wielu urządzeniach jednocześnie?",
    answer:
      "To zależy od konkretnej usługi. W przypadku większości subskrypcji możliwe jest korzystanie z usługi na wielu urządzeniach, ale niektóre platformy mogą mieć ograniczenia dotyczące jednoczesnego użytkowania.",
  },
  {
    question: "Twoje ceny są bardzo niskie. Czy te usługi są legalne?",
    answer:
      "Oferuję legalne subskrypcje w obniżonych cenach dzięki wykorzystaniu specjalnych promocji, grup rodzinnych i zespołowych oraz optymalizacji kosztów. Moim celem jest zapewnienie dostępu do premium usług w przystępnych cenach.",
  },
  {
    question: "Czy oferujesz zniżki przy zakupie wielu subskrypcji?",
    answer:
      "Tak, oferuję specjalne pakiety i zniżki dla klientów zamawiających więcej niż jedną usługę. Skontaktuj się ze mną, aby omówić indywidualną ofertę.",
  },
];

function FAQItemComponent({ item }: { item: FAQItem }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 overflow-hidden transition-all duration-300">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between p-6 text-left"
      >
        <span className="text-lg font-medium bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
          {item.question}
        </span>
        <ChevronUp
          className={`h-5 w-5 text-violet-400 transition-transform duration-300 ${
            isOpen ? "" : "rotate-180"
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-96 pb-6" : "max-h-0"
        }`}
      >
        <p className="px-6 text-zinc-400 leading-relaxed">{item.answer}</p>
      </div>
    </div>
  );
}

export function FAQ() {
  return (
    <section id="faq" className="mx-auto max-w-4xl px-6 py-24">
      <div className="mb-12 text-center">
        <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
          Najczęściej{" "}
          <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent italic">
            Zadawane Pytania
          </span>
        </h2>
        <p className="mx-auto max-w-xl text-zinc-400">
          Znajdź odpowiedzi na najczęściej zadawane pytania dotyczące moich
          usług i oferty.
        </p>
      </div>

      <div className="space-y-4">
        {faqItems.map((item, index) => (
          <FAQItemComponent key={index} item={item} />
        ))}
      </div>

      <div className="mt-16 text-center">
        <h3 className="mb-4 text-2xl font-bold text-white md:text-3xl">
          Nadal masz{" "}
          <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
            pytania
          </span>
          ?
        </h3>
        <p className="text-zinc-400">
          Skontaktuj się ze mną bezpośrednio. Chętnie odpowiem na wszystkie
          Twoje pytania.
        </p>
      </div>
    </section>
  );
}
