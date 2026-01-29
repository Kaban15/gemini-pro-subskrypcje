import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Gemini Pro SaaS - Asystent AI",
  description:
    "Uzyskaj dostęp do modelu Gemini Pro AI od Google dzięki prostej subskrypcji. Inteligentne odpowiedzi, pomoc w programowaniu, kreatywne pisanie i więcej.",
  keywords: ["AI", "Gemini Pro", "ChatBot", "SaaS", "Google AI", "Asystent"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
