# Gemini Pro SaaS — Opis aplikacji dla agenta AI

## Czym jest aplikacja

Gemini Pro SaaS to polskojęzyczna strona landing page i aplikacja SaaS umożliwiająca sprzedaż subskrypcji na dostęp do modelu AI Google Gemini Pro. Skierowana do nietechnicznych użytkowników polskojęzycznych — oferuje stronę sprzedażową z cennikiem, systemem zamówień przez email (via Resend), sekcjami korzyści, opinii, FAQ oraz kontaktu. Zawiera również gotowy interfejs czatu streamingowego z modelem Gemini, który jest przygotowany, ale nie jest jeszcze osadzony na stronie głównej.

## Tech stack

| Technologia | Wersja / Szczegóły |
|---|---|
| **Framework** | Next.js 16.1.6 (App Router) |
| **React** | 19.2.3 |
| **TypeScript** | ^5 (tryb `strict`) |
| **CSS** | Tailwind CSS v4 (nowa składnia `@import "tailwindcss"` + `@theme inline`, bez `tailwind.config.js`) |
| **PostCSS** | `@tailwindcss/postcss` ^4 |
| **AI SDK** | `ai` ^6.0.57, `@ai-sdk/google` ^3.0.15, `@ai-sdk/openai` ^3.0.30, `@ai-sdk/react` ^3.0.59 (Vercel AI SDK) |
| **Email** | `resend` ^6.9.1 |
| **Ikony** | `lucide-react` ^0.563.0 |
| **Utility CSS** | `clsx` ^2.1.1 + `tailwind-merge` ^3.4.0 (wrapper `cn()`) |
| **ID generator** | `nanoid` ^5.1.6 |
| **Linting** | ESLint ^9 (flat config) z `eslint-config-next` (core-web-vitals + typescript) |
| **Płatności** | Stripe — **zastubowany** w `src/lib/stripe.ts`, brak faktycznej integracji |
| **Baza danych** | **Brak** — aplikacja nie korzysta z żadnej bazy danych |
| **Autentykacja** | **Brak** — brak systemu auth (tylko placeholder w komentarzu) |
| **Testy** | **Brak** — nie skonfigurowano żadnego frameworka testowego |
| **Analityka** | Vercel Analytics z Custom Events tracking |

## Komendy

```bash
npm run dev    # Uruchomienie serwera deweloperskiego (localhost:3000)
npm run build  # Budowanie produkcyjne Next.js
npm run start  # Uruchomienie serwera produkcyjnego
npm run lint   # Linting z ESLint 9 (flat config, core-web-vitals + TypeScript)
```

> **Uwaga:** Brak skryptów testowych — w projekcie nie ma konfiguracji Jest, Vitest ani Playwright.

## Architektura — KLUCZOWA INFORMACJA

### Routing

Aplikacja korzysta ze standardowego **Next.js App Router**. Istnieje **jedna strona** (`src/app/page.tsx`) — jest to SPA-like landing page, która renderuje wszystkie sekcje jako jeden ciągły widok.

**Brak dodatkowych stron** — cały routing to:
- `/` — strona główna (landing page)
- `/api/chat` — endpoint API do czatu AI (Gemini Pro)
- `/api/chat-support` — endpoint API do chatbota obsługi klienta (OpenAI GPT-4o-mini)
- `/api/contact` — endpoint API do wysyłania zamówień/wiadomości email

### Główne flow użytkownika

```
Użytkownik wchodzi na stronę (/)
    │
    ├── Hero Section (nagłówek, USP)
    │
    ├── Benefits (korzyści z AI — siatka 6 kart + sekcja obiekcji)
    │
    ├── Testimonials (opinie — automatycznie przewijany marquee)
    │
    ├── Pricing (cennik — 2 karty: Miesięczny 30 zł, Roczny 250 zł)
    │   │
    │   └── Klik "Subskrybuj" → otwiera OrderModal
    │       │
    │       └── Formularz zamówienia → POST /api/contact → email Resend
    │
    ├── FAQ (9 pytań, akordeon z animacją CSS)
    │
    ├── Contact (karty: Telegram @prolifefit + Email)
    │
    └── Footer
```

### Flow czatu AI (przygotowany, ale NIE osadzony na stronie głównej)

```
ChatInterface (komponent kliencki)
    │
    └── useChat() + DefaultChatTransport → POST /api/chat
        │
        └── toModelMessages() konwersja parts→content
            │
            └── streamText() z google("gemini-1.5-pro-latest")
                │
                └── result.toUIMessageStreamResponse()
```

> **Ważne:** Komponent `ChatInterface` istnieje w `src/components/ChatInterface.tsx`, ale **nie jest importowany ani renderowany** w `src/app/page.tsx`. Przyjmuje prop `isSubscribed: boolean` jako placeholder do kontroli dostępu.

### Flow chatbota obsługi klienta (floating widget na stronie głównej)

```
SupportChatWidget (floating widget, komponent kliencki)
    │
    └── useChat() + DefaultChatTransport → POST /api/chat-support
        │
        └── toModelMessages() konwersja parts→content
            │
            └── streamText() z openai("gpt-4o-mini") + KNOWLEDGE_BASE system prompt
                │
                └── result.toUIMessageStreamResponse()
```

> **Ważne:** `SupportChatWidget` jest osadzony na stronie głównej (`page.tsx`) jako floating bubble w prawym dolnym rogu. Używa bazy wiedzy z `src/knowledge/base.ts` (eksportowana jako stała TS, nie plik — wymagane dla Vercel serverless). Odpowiada wyłącznie po polsku.

### Krytyczny wzorzec: AI SDK v6 streaming

**useChat** z `@ai-sdk/react` wysyła wiadomości w formacie **UIMessage** (z tablicą `parts`). API route musi:
1. **Skonwertować** wiadomości z formatu `parts` na `content` string (helper `toModelMessages()`)
2. **Zwrócić** `result.toUIMessageStreamResponse()` — NIE używać `createUIMessageStream` z ręcznym `writer.write()`

Ręczne `writer.write()` generuje niekompletny protokół streamu (brak eventów `start`, `start-step`, metadanych providerów), przez co klient nie akumuluje tekstu odpowiedzi.

## Hierarchia Context Providerów

Aplikacja **nie używa żadnych custom Context Providerów**. Drzewo renderowania w `layout.tsx`:

```
<html lang="pl" className="dark">
  <body className="{geistSans} {geistMono} antialiased">
    {children}   ← page.tsx renderuje się tutaj
  </body>
</html>
```

- Fonty: `Geist` (sans) i `Geist_Mono` (mono) z `next/font/google` — ładowane jako zmienne CSS `--font-geist-sans` i `--font-geist-mono`
- Brak providerów: brak ThemeProvider, brak AuthProvider, brak QueryClientProvider
- Ciemny motyw wymuszony przez `className="dark"` na `<html>`

## Moduły i ich dane

| Moduł | Komponent główny | Hook/serwis danych | Baza danych | Ścieżka plików |
|---|---|---|---|---|
| **Landing Page** | `Home` (page.tsx) | Brak (dane statyczne) | Brak | `src/app/page.tsx` |
| **Korzyści** | `Benefits` | Brak (hardcoded arrays) | Brak | `src/components/Benefits.tsx` |
| **Opinie** | `Testimonials` | Brak (hardcoded array) | Brak | `src/components/Testimonials.tsx` |
| **Cennik** | `PricingCard` | Import z `src/lib/stripe.ts` (stałe cenowe) | Brak | `src/components/PricingCard.tsx` |
| **Zamówienia** | `OrderModal` | `fetch("/api/contact")` | Brak | `src/components/OrderModal.tsx` |
| **FAQ** | `FAQ` + `FAQItemComponent` | Brak (hardcoded array) | Brak | `src/components/FAQ.tsx` |
| **Kontakt** | `Contact` | Brak (linki statyczne) | Brak | `src/components/Contact.tsx` |
| **Czat AI** | `ChatInterface` | `useChat()` z `@ai-sdk/react` | Brak | `src/components/ChatInterface.tsx` |
| **Chatbot support** | `SupportChatWidget` | `useChat()` z `@ai-sdk/react` + `DefaultChatTransport` | Brak | `src/components/SupportChatWidget.tsx` |
| **Baza wiedzy** | — | Eksportowana stała `KNOWLEDGE_BASE` | Brak | `src/knowledge/base.ts` |
| **Toggle rozliczeń** | `BillingToggle` | Brak (kontrolowany komponent) | Brak | `src/components/BillingToggle.tsx` |

## Warstwa danych — szczegóły

### Dane statyczne (hardcoded)

Aplikacja **nie posiada bazy danych**. Wszystkie dane treściowe są zapisane bezpośrednio w komponentach jako stałe tablice:

| Stała | Lokalizacja | Opis |
|---|---|---|
| `benefits` (6 elementów) | `Benefits.tsx:15` | Tablica obiektów `{icon, title, description}` |
| `objections` (2 elementy) | `Benefits.tsx:54` | Tablica obiektów `{icon, title, description}` |
| `testimonials` (8 elementów) | `Testimonials.tsx:12` | Tablica obiektów `{name, product, content, rating}` |
| `faqItems` (9 elementów) | `FAQ.tsx:11` | Tablica obiektów `{question, answer}` |
| `FEATURES` / `YEARLY_FEATURES` | `page.tsx:11/21` | Tablice stringów z listą cech subskrypcji |
| `PRICES` / `PRICE_IDS` | `lib/stripe.ts:4/9` | Stałe cenowe: miesięczny 30 zł, roczny 250 zł |
| `PAYMENT_METHODS` | `OrderModal.tsx:14` | Metody płatności: Przelew, BLIK, Revolut, Zen, Kryptowaluty |

### Serwis email (Resend)

- **Endpoint:** `POST /api/contact`
- **Źródło danych:** payload JSON z formularza `OrderModal`
- **Pola:** `name`, `email`, `message`
- **Walidacja:** ręczna (sprawdzenie obecności pól), brak schematu Zod
- **Odbiorca:** `prolifefit777@gmail.com` (hardcoded)
- **Nadawca:** `Gemini Pro SaaS <onboarding@resend.dev>`

### Serwis AI Chat — Gemini (Vercel AI SDK)

- **Endpoint:** `POST /api/chat`
- **Model:** `google("gemini-1.5-pro-latest")`
- **Timeout:** `maxDuration = 30` sekund
- **System prompt:** Hardcoded w route handler — instrukcja bycia pomocnym asystentem AI
- **Streaming:** `streamText()` → `result.toUIMessageStreamResponse()`
- **Konwersja wiadomości:** `toModelMessages()` — ręczna konwersja z UIMessage (parts) na ModelMessage (content)

### Serwis AI Chat — Support Chatbot (OpenAI)

- **Endpoint:** `POST /api/chat-support`
- **Model:** `openai("gpt-4o-mini")`
- **Timeout:** `maxDuration = 30` sekund
- **System prompt:** Instrukcja obsługi klienta po polsku + pełna baza wiedzy z `src/knowledge/base.ts`
- **Baza wiedzy:** `KNOWLEDGE_BASE` — eksportowana jako stała TypeScript (nie plik .md) — wymagane dla Vercel serverless, gdzie `readFileSync` nie działa
- **Streaming:** `streamText()` → `result.toUIMessageStreamResponse()`
- **Konwersja wiadomości:** `toModelMessages()` — ręczna konwersja z UIMessage (parts) na ModelMessage (content)
- **Widget:** Floating bubble w prawym dolnym rogu strony (`SupportChatWidget`)

### Kluczowe formularze/modale

| Formularz | Komponent | Pola | Endpoint |
|---|---|---|---|
| **OrderModal** | `OrderModal.tsx` | `paymentMethod` (select), `quantity` (select 1-5), `email` (input), `message` (textarea) | `POST /api/contact` |
| **Chat input** | `ChatInterface.tsx` | `inputValue` (text input) | `POST /api/chat` |
| **Support chat input** | `SupportChatWidget.tsx` | `inputValue` (text input) | `POST /api/chat-support` |

## Offline support i bezpieczeństwo synchronizacji

**Brak.** Aplikacja nie korzysta z IndexedDB, LocalStorage, Service Workers ani żadnych mechanizmów synchronizacji offline.

## API routes / Backend

| Endpoint | Metoda | Plik | Opis | Zabezpieczenia |
|---|---|---|---|---|
| `/api/chat` | POST | `src/app/api/chat/route.ts` | Streamingowy czat z Gemini Pro | **Brak** — endpoint jest publiczny, brak auth, brak rate limitingu. `maxDuration = 30s`. |
| `/api/chat-support` | POST | `src/app/api/chat-support/route.ts` | Chatbot obsługi klienta (OpenAI GPT-4o-mini) z bazą wiedzy | **Brak** — endpoint jest publiczny, brak auth, brak rate limitingu. `maxDuration = 30s`. |
| `/api/contact` | POST | `src/app/api/contact/route.ts` | Wysyłanie zamówień/wiadomości email przez Resend | **Brak** — endpoint jest publiczny, brak auth, brak rate limitingu. Jedyna walidacja: sprawdzenie czy pola `name`, `email`, `message` istnieją. |

> **Uwaga bezpieczeństwa:** Oba endpointy nie posiadają żadnych mechanizmów zabezpieczeń — brak autentykacji, autoryzacji, rate limitingu ani walidacji CSRF. Endpoint `/api/contact` jest podatny na spam.

## Biblioteka / Utils

| Plik | Eksporty | Odpowiedzialność |
|---|---|---|
| `src/lib/utils.ts` | `cn(...inputs: ClassValue[])` | Wrapper na `clsx` + `tailwind-merge` — łączenie klas Tailwind z obsługą konfliktów |
| `src/lib/stripe.ts` | `PRICE_IDS`, `PRICES`, `calculateYearlySavingsPercent()`, `handleCheckout()` | **Stub/placeholder** — stałe cenowe i kalkulacja oszczędności. Funkcja `handleCheckout()` tylko loguje do konsoli i pokazuje `alert()`. Brak faktycznej integracji ze Stripe. |

## Wspólne komponenty

Projekt **nie posiada folderu komponentów współdzielonych** (`shared/`, `ui/`). Wszystkie komponenty są w jednym katalogu `src/components/`:

| Komponent | Wielokrotne użycie | Opis |
|---|---|---|
| `PricingCard` | Tak (2x w `page.tsx`) | Karta cenowa z przyciskiem otwierającym `OrderModal` |
| `OrderModal` | Tak (renderowany wewnątrz każdego `PricingCard`) | Modal zamówienia z formularzem |
| `SupportChatWidget` | 1x (w `page.tsx`) | Floating chatbot obsługi klienta (OpenAI GPT-4o-mini) |
| `BillingToggle` | **Nie używany** | Toggle miesięczny/roczny — istnieje, ale nie jest importowany nigdzie |
| `ChatInterface` | **Nie używany** | Interfejs czatu — istnieje, ale nie jest importowany w `page.tsx` |
| `Benefits` | 1x | Sekcja korzyści |
| `Testimonials` | 1x | Sekcja opinii z marquee |
| `FAQ` | 1x | Sekcja FAQ z akordeonem |
| `Contact` | 1x | Sekcja kontaktu |

### Sub-komponenty wewnętrzne (nieeksportowane globalnie)

| Sub-komponent | Zdefiniowany w | Opis |
|---|---|---|
| `FAQItemComponent` | `FAQ.tsx:59` | Pojedynczy element akordeonu FAQ |
| `TestimonialCard` | `Testimonials.tsx:86` | Pojedyncza karta opinii |
| `StarRating` | `Testimonials.tsx:71` | Wyświetlanie gwiazdek oceny |
| `TelegramIcon` | `Contact.tsx:5` | Custom SVG ikona Telegram |

## Walidacja

Aplikacja **nie używa Zod ani żadnej biblioteki walidacji**. Walidacja jest minimalna i ręczna:

| Lokalizacja | Typ walidacji | Szczegóły |
|---|---|---|
| `POST /api/contact` | Sprawdzenie obecności pól | `if (!name \|\| !email \|\| !message)` — zwraca 400 |
| `OrderModal` | Atrybuty HTML | `required` na polach `email` i `paymentMethod`, `type="email"` na input |
| `ChatInterface` | Sprawdzenie w JS | `if (!inputValue.trim() \|\| isLoading) return` |

> **Brak schematów walidacji** — nie ma plików `.schema.ts`, brak Zod, brak formularzy z react-hook-form.

## Wzorce do przestrzegania

### 1. Dyrektywa `"use client"`
**Wszystkie komponenty** w `src/components/` używają `"use client"`. Strona główna `page.tsx` również jest komponentem klienckim. Jedyny kod serwerowy to route handlery w `src/app/api/`.

### 2. Obsługa błędów
- **API routes:** try/catch z `console.error()` i zwróceniem odpowiedzi JSON z kodem 500
- **Chat stream:** błędy streamingu obsługiwane przez `toUIMessageStreamResponse()` — emitowane jako eventy `error` w strumieniu SSE
- **Formularz OrderModal:** blok try/finally (bez obsługi catch — błędy sieciowe nie są wyświetlane użytkownikowi)
- **ChatInterface:** obiekt `error` z `useChat()` renderowany w czerwonym bannerze

### 3. Konwencje nazewnicze
- **Pliki komponentów:** PascalCase (`PricingCard.tsx`, `OrderModal.tsx`)
- **Pliki utility/lib:** camelCase (`utils.ts`, `stripe.ts`)
- **Pliki route handlerów:** `route.ts` w zagnieżdżonych folderach (`api/chat/route.ts`)
- **Eksporty komponentów:** named exports z `function` (`export function Benefits()`)
- **Jedyny default export:** `page.tsx` (`export default function Home()`)
- **Interfejsy props:** `{ComponentName}Props` (np. `PricingCardProps`, `ChatInterfaceProps`)
- **Stałe:** UPPER_SNAKE_CASE (`FEATURES`, `PRICES`, `PRICE_IDS`, `PAYMENT_METHODS`)

### 4. Stylowanie
- **Tailwind CSS v4** — klasy utility bezpośrednio w JSX
- Funkcja `cn()` z `@/lib/utils` do warunkowego łączenia klas (używana w `PricingCard`, `ChatInterface`, `BillingToggle`)
- **Brak CSS Modules** — jedyny plik CSS to `globals.css`
- Token kolorów definiowany w CSS variables w `globals.css` (`@theme inline`)
- Konsystentna paleta ciemna:
  - Tła: `zinc-950`, `zinc-900`, `zinc-900/50`
  - Obramowania: `zinc-800`
  - Tekst główny: `white`, tekst drugorzędny: `zinc-400`, tekst trzeciego rzędu: `zinc-500`
  - Akcent główny: `violet-500` / `violet-400`
  - Akcent drugorzędny: `cyan-500` / `cyan-400`
  - Gradient tekstu: `bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent`
  - Gradient przycisków: `bg-gradient-to-r from-violet-500 to-cyan-500`

### 5. Zarządzanie stanem
- **Brak globalnego stanu** — brak Context, Redux, Zustand
- Cały stan jest lokalny w komponentach (`useState`)
- `ChatInterface` i `SupportChatWidget` używają hooka `useChat()` z `@ai-sdk/react` do zarządzania wiadomościami i statusem streamingu
- `OrderModal` używa jednego obiektu `formData` w `useState` do zarządzania formularzem
- `FAQItemComponent` — lokalny `useState(false)` do toggle open/close

### 6. Wzorzec modalu
- Modal renderuje `null` gdy `isOpen === false`
- Overlay: `fixed inset-0 z-50` z `bg-black/70 backdrop-blur-sm`
- Zamknięcie: klik na overlay (`onClick={onClose}`) lub przycisk X
- Sukces: `submitSuccess` state → komunikat sukcesu → auto-zamknięcie po 3s z `setTimeout`

### 7. Wzorzec animacji
- Marquee opinii: CSS keyframes `scroll-left` / `scroll-right` w `globals.css`
- Pauza na hover: `.animate-scroll-left:hover { animation-play-state: paused }`
- FAQ akordeon: `max-h-0` → `max-h-96` z `transition-all duration-300`
- Karty: `hover:scale-105`, `hover:border-violet-500/50`

### 8. Importy
- Alias ścieżek: `@/*` → `src/*` (skonfigurowany w `tsconfig.json`)
- Ikony importowane pojedynczo z `lucide-react` (named imports)
- Brak barrel exports — każdy komponent importowany bezpośrednio ze swojego pliku

## Zmienne środowiskowe

Na podstawie `.env.example` i kodu źródłowego:

| Zmienna | Używana w | Wymagana |
|---|---|---|
| `GOOGLE_GENERATIVE_AI_API_KEY` | `@ai-sdk/google` (automatycznie) | Tak — do API czatu Gemini |
| `OPENAI_API_KEY` | `@ai-sdk/openai` (automatycznie) | Tak — do chatbota obsługi klienta |
| `RESEND_API_KEY` | `src/app/api/contact/route.ts` | Tak — do wysyłania emaili |
| `STRIPE_SECRET_KEY` | `.env.example` (placeholder) | Nie — Stripe nie jest zintegrowany |
| `STRIPE_PUBLISHABLE_KEY` | `.env.example` (placeholder) | Nie — Stripe nie jest zintegrowany |
| `STRIPE_WEBHOOK_SECRET` | `.env.example` (placeholder) | Nie — Stripe nie jest zintegrowany |
| `STRIPE_PRICE_ID_MONTHLY` | `.env.example` (placeholder) | Nie — Stripe nie jest zintegrowany |
| `STRIPE_PRICE_ID_YEARLY` | `.env.example` (placeholder) | Nie — Stripe nie jest zintegrowany |
| `NEXT_PUBLIC_APP_URL` | `.env.example` (placeholder) | Nie — nigdzie nie używana w kodzie |

> **Aktualnie wymagane do działania:** `GOOGLE_GENERATIVE_AI_API_KEY`, `OPENAI_API_KEY` i `RESEND_API_KEY`. Na Vercel trzeba je dodać w Settings → Environment Variables.

## Testy

**Brak testów.** Projekt nie zawiera:
- Żadnego frameworka testowego (brak Jest, Vitest, Playwright, Cypress)
- Żadnych plików testowych (`*.test.ts`, `*.spec.ts`)
- Żadnego skryptu `test` w `package.json`
- Żadnej konfiguracji testowej
