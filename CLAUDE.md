# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Polish-language SaaS landing page and AI chat app ("Gemini Pro") built with Next.js App Router. Users can browse pricing, place orders via email, and use a streaming chat interface powered by Google Gemini. All UI text is in Polish; prices are in PLN (zł).

## Commands

- **Dev server:** `npm run dev` (localhost:3000)
- **Build:** `npm run build`
- **Lint:** `npm run lint` (ESLint 9 flat config with Next.js core-web-vitals + TypeScript rules)
- **No test framework configured**

## Tech Stack

- **Next.js 16** (App Router) with **React 19** and **TypeScript** (strict)
- **Tailwind CSS v4** — uses `@import "tailwindcss"` + `@theme inline` in `globals.css` (no `tailwind.config.js`)
- **Vercel AI SDK** (`ai`, `@ai-sdk/google`, `@ai-sdk/openai`, `@ai-sdk/react`) for streaming chat
- **Resend** for transactional emails
- **Stripe** is stubbed in `src/lib/stripe.ts` but not wired up yet

## Architecture

All page sections are client components (`"use client"`) in `src/components/`, composed together in `src/app/page.tsx`. Server-side logic lives only in API route handlers:

- `src/app/api/chat/route.ts` — POST endpoint; streams Gemini Pro responses via `streamText` + `toUIMessageStreamResponse()`
- `src/app/api/chat-support/route.ts` — POST endpoint; OpenAI GPT-4o-mini support chatbot with knowledge base
- `src/app/api/contact/route.ts` — POST endpoint; sends order/contact emails via Resend to the owner

**Chat data flow:** `ChatInterface` → `useChat` with `DefaultChatTransport` → `/api/chat` → `google("gemini-1.5-pro-latest")` → streamed response via `toUIMessageStreamResponse()`

**Support chatbot flow:** `SupportChatWidget` → `useChat` with `DefaultChatTransport` → `/api/chat-support` → `openai("gpt-4o-mini")` with knowledge base → streamed response via `toUIMessageStreamResponse()`

**Order flow:** `PricingCard` opens `OrderModal` → form POST to `/api/contact` → Resend email (bypasses Stripe entirely)

## Key Patterns

- `cn()` utility in `src/lib/utils.ts` wraps `clsx` + `tailwind-merge` for conditional Tailwind classes
- Path alias: `@/*` maps to `src/*`
- Consistent dark theme: `zinc-950`/`zinc-900` backgrounds, `violet-500` primary, `cyan-400` secondary, gradient text via `bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent`
- No auth, no database, no ORM — subscription status is a boolean prop placeholder
- **AI SDK streaming pattern:** `useChat` sends UI messages (`parts` array format). API routes must convert to model messages (`content` string) using manual `toModelMessages()` helper, then return `result.toUIMessageStreamResponse()` — do NOT use `createUIMessageStream` with manual `writer.write()` as it produces incomplete stream protocol
- **Knowledge base:** `src/knowledge/base.ts` exports `KNOWLEDGE_BASE` constant (TypeScript module, not filesystem read — required for Vercel serverless compatibility)

## Environment Variables

See `.env.example`. Required for local dev:
- `GOOGLE_GENERATIVE_AI_API_KEY` — Gemini API key
- `OPENAI_API_KEY` — OpenAI API key (for support chatbot)
- `RESEND_API_KEY` — for email sending
