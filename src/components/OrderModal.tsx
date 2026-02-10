"use client";

import { useState } from "react";
import { track } from "@vercel/analytics";
import { X, Clock, Calendar, Shield } from "lucide-react";

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName: string;
  price: number;
  interval: string;
}

const PAYMENT_METHODS = [
  "Wybierz metodę",
  "Przelew bankowy",
  "BLIK",
  "Revolut",
  "Zen",
  "Kryptowaluty",
];

export function OrderModal({
  isOpen,
  onClose,
  productName,
  price,
  interval,
}: OrderModalProps) {
  const [formData, setFormData] = useState({
    paymentMethod: "",
    quantity: "1",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  if (!isOpen) return null;

  const totalPrice = price * parseInt(formData.quantity);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Zamówienie",
          email: formData.email,
          message: `
Zamówienie subskrypcji:
- Produkt: ${productName}
- Cena jednostkowa: ${price} zł/${interval}
- Liczba sztuk: ${formData.quantity}
- Łączna cena: ${totalPrice} zł
- Metoda płatności: ${formData.paymentMethod}

Wiadomość od klienta:
${formData.message || "Brak dodatkowej wiadomości"}
          `.trim(),
        }),
      });

      if (response.ok) {
        track("Complete Order", {
          paymentMethod: formData.paymentMethod,
          quantity: formData.quantity,
        });
        setSubmitSuccess(true);
        setTimeout(() => {
          onClose();
          setSubmitSuccess(false);
          setFormData({ paymentMethod: "", quantity: "1", email: "", message: "" });
        }, 3000);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl border border-zinc-800 bg-zinc-900 p-6 md:p-8 shadow-2xl">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-2 text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-white"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Header */}
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold text-white md:text-3xl">
            Zamów{" "}
            <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
              subskrypcję
            </span>
          </h2>
        </div>

        {submitSuccess ? (
          <div className="rounded-xl bg-emerald-500/10 border border-emerald-500/30 p-6 text-center">
            <p className="text-emerald-400 font-medium">
              Zamówienie zostało wysłane! Odpowiem najszybciej jak to możliwe.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Produkt */}
            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-300">
                Produkt:
              </label>
              <div className="w-full rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-3 text-white">
                {productName}
              </div>
            </div>

            {/* Cena */}
            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-300">
                Cena:
              </label>
              <div className="w-full rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-3 text-white">
                {totalPrice} zł
                {parseInt(formData.quantity) > 1 && (
                  <span className="text-zinc-400 text-sm ml-2">
                    ({formData.quantity} x {price} zł)
                  </span>
                )}
              </div>
            </div>

            {/* Metoda płatności */}
            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-300">
                Metoda płatności:
              </label>
              <select
                required
                value={formData.paymentMethod}
                onChange={(e) =>
                  setFormData({ ...formData, paymentMethod: e.target.value })
                }
                className="w-full rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-3 text-white outline-none transition-colors focus:border-violet-500 appearance-none cursor-pointer"
              >
                <option value="" disabled>
                  Wybierz metodę
                </option>
                {PAYMENT_METHODS.slice(1).map((method) => (
                  <option key={method} value={method}>
                    {method}
                  </option>
                ))}
              </select>
            </div>

            {/* Liczba sztuk */}
            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-300">
                Liczba sztuk:
              </label>
              <select
                value={formData.quantity}
                onChange={(e) =>
                  setFormData({ ...formData, quantity: e.target.value })
                }
                className="w-full rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-3 text-white outline-none transition-colors focus:border-violet-500 appearance-none cursor-pointer"
              >
                {[1, 2, 3, 4, 5].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
            </div>

            {/* Email */}
            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-300">
                Email:
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-3 text-white placeholder-zinc-500 outline-none transition-colors focus:border-violet-500"
                placeholder="twoj@email.com"
              />
            </div>

            {/* Treść wiadomości */}
            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-300">
                Treść wiadomości:
              </label>
              <textarea
                rows={4}
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                className="w-full rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-3 text-white placeholder-zinc-500 outline-none transition-colors focus:border-violet-500 resize-none"
                placeholder="Opisz swoje zapytanie..."
              />
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-xl bg-gradient-to-r from-violet-500 to-cyan-500 px-6 py-4 font-semibold text-white transition-all hover:from-violet-600 hover:to-cyan-600 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting ? "Wysyłanie..." : "Wyślij wiadomość"}
            </button>
          </form>
        )}

        {/* Footer info */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-zinc-400">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-violet-400" />
            <span>Odpowiedź w 24h</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-violet-400" />
            <span>7 dni w tygodniu</span>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-violet-400" />
            <span>Bezpieczne dane</span>
          </div>
        </div>
      </div>
    </div>
  );
}
