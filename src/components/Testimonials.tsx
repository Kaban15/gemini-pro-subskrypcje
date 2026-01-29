"use client";

import { Star } from "lucide-react";

interface Testimonial {
  name: string;
  product: string;
  content: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    name: "Mateusz K.",
    product: "Gemini Pro",
    content:
      "Używam Gemini Pro codziennie do pracy. Pomaga mi pisać maile, tłumaczyć dokumenty i analizować dane. Oszczędzam minimum 2 godziny dziennie!",
    rating: 5,
  },
  {
    name: "Anna W.",
    product: "Gemini Pro",
    content:
      "Byłam sceptyczna, ale po tygodniu używania jestem zachwycona. AI pisze za mnie posty na social media i pomaga w kreatywnych projektach. Polecam!",
    rating: 5,
  },
  {
    name: "Tomasz P.",
    product: "Gemini Pro",
    content:
      "Błyskawiczna realizacja zamówienia - dostęp w 10 minut! Kontakt z obsługą super, a sam Gemini Pro to game changer w mojej firmie.",
    rating: 5,
  },
  {
    name: "Karolina M.",
    product: "Gemini Pro",
    content:
      "Płaciłam wcześniej 100 zł miesięcznie za podobne narzędzie. Tutaj mam to samo za 30 zł. Nie wiem jak to możliwe, ale działa świetnie!",
    rating: 5,
  },
  {
    name: "Piotr S.",
    product: "Gemini Pro",
    content:
      "Jako programista doceniam możliwości Gemini. Generuje kod, wyjaśnia błędy i pomaga w debugowaniu. Zdecydowanie wart swojej ceny.",
    rating: 5,
  },
  {
    name: "Monika R.",
    product: "Gemini Pro",
    content:
      "Prowadzę małą firmę i Gemini Pro zastąpił mi asystenta. Pisze oferty, odpowiada na zapytania klientów, tworzy treści marketingowe. Rewelacja!",
    rating: 5,
  },
  {
    name: "Jakub N.",
    product: "Gemini Pro",
    content:
      "Subskrypcja roczna to strzał w dziesiątkę. 20 zł miesięcznie za tak potężne narzędzie? Zdecydowanie polecam każdemu!",
    rating: 5,
  },
  {
    name: "Ewa T.",
    product: "Gemini Pro",
    content:
      "Używam do nauki języków i tłumaczeń. Gemini tłumaczy naturalnie, nie jak translator. Mega pomocne przy pracy z zagranicznymi klientami.",
    rating: 5,
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${
            i < rating ? "fill-yellow-400 text-yellow-400" : "text-zinc-600"
          }`}
        />
      ))}
    </div>
  );
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="flex-shrink-0 w-80 rounded-2xl border border-zinc-800 bg-zinc-900/80 p-6">
      <StarRating rating={testimonial.rating} />
      <p className="mt-4 text-zinc-300 text-sm leading-relaxed">
        {testimonial.content}
      </p>
      <div className="mt-6 flex items-center gap-3">
        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center text-white font-semibold text-sm">
          {testimonial.name.charAt(0)}
        </div>
        <div>
          <p className="font-medium text-white">{testimonial.name}</p>
          <p className="text-xs text-zinc-500">{testimonial.product}</p>
        </div>
      </div>
    </div>
  );
}

export function Testimonials() {
  // Double the testimonials for seamless loop
  const doubledTestimonials = [...testimonials, ...testimonials];

  return (
    <section className="py-24 overflow-hidden">
      {/* Header */}
      <div className="mb-12 text-center px-6">
        <div className="mb-4 inline-flex items-center rounded-full bg-violet-500/20 px-4 py-2">
          <span className="text-sm font-medium text-violet-400">OPINIE</span>
        </div>
        <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
          Co mówią klienci
        </h2>
        <p className="text-zinc-400 mb-6">
          Dołącz do grona zadowolonych użytkowników
        </p>
        <div className="inline-flex items-center gap-2 rounded-full border border-zinc-700 bg-zinc-800/50 px-5 py-2.5">
          <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
          <span className="text-zinc-200 font-medium">1000+ zadowolonych klientów</span>
        </div>
      </div>

      {/* Scrolling testimonials */}
      <div className="relative">
        {/* Gradient overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-zinc-950 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-zinc-950 to-transparent z-10 pointer-events-none" />

        {/* Single row - scrolling left */}
        <div className="flex gap-6 animate-scroll-left">
          {doubledTestimonials.map((testimonial, index) => (
            <TestimonialCard key={`row-${index}`} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
}
