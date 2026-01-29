"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { Send, Bot, User, Loader2, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRef, useEffect, useState, useMemo } from "react";

interface ChatInterfaceProps {
  isSubscribed: boolean;
}

export function ChatInterface({ isSubscribed }: ChatInterfaceProps) {
  const [inputValue, setInputValue] = useState("");

  const transport = useMemo(
    () => new DefaultChatTransport({ api: "/api/chat" }),
    []
  );

  const { messages, sendMessage, status, error } = useChat({
    transport,
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const isLoading = status === "streaming" || status === "submitted";

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const message = inputValue;
    setInputValue("");
    await sendMessage({ text: message });
  };

  if (!isSubscribed) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-900/50 p-12 text-center">
        <div className="mb-4 rounded-full bg-zinc-800 p-4">
          <Lock className="h-8 w-8 text-zinc-400" />
        </div>
        <h3 className="mb-2 text-xl font-semibold text-white">
          Subskrybuj aby uzyskać dostęp
        </h3>
        <p className="max-w-md text-zinc-400">
          Uzyskaj nieograniczony dostęp do Gemini Pro AI wykupując jedną z
          naszych subskrypcji. Zacznij rozmawiać z najbardziej zaawansowanym
          asystentem AI już dziś.
        </p>
      </div>
    );
  }

  return (
    <div className="flex h-[600px] flex-col rounded-2xl border border-zinc-800 bg-zinc-900/50">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-zinc-800 px-6 py-4">
        <div className="rounded-full bg-violet-500/20 p-2">
          <Bot className="h-5 w-5 text-violet-400" />
        </div>
        <div>
          <h3 className="font-semibold text-white">Gemini Pro</h3>
          <p className="text-sm text-zinc-400">Asystent AI</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6">
        {messages.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center text-center">
            <Bot className="mb-4 h-12 w-12 text-zinc-600" />
            <p className="text-zinc-400">Rozpocznij rozmowę z Gemini Pro</p>
            <p className="mt-1 text-sm text-zinc-500">
              Zapytaj o cokolwiek - programowanie, pisanie, analizy i więcej
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex gap-4",
                  message.role === "user" ? "justify-end" : "justify-start"
                )}
              >
                {message.role === "assistant" && (
                  <div className="flex-shrink-0 rounded-full bg-violet-500/20 p-2 h-fit">
                    <Bot className="h-4 w-4 text-violet-400" />
                  </div>
                )}
                <div
                  className={cn(
                    "max-w-[80%] rounded-2xl px-4 py-3",
                    message.role === "user"
                      ? "bg-violet-500 text-white"
                      : "bg-zinc-800 text-zinc-100"
                  )}
                >
                  <p className="whitespace-pre-wrap">
                    {message.parts
                      ?.filter((part) => part.type === "text")
                      .map((part, i) => (
                        <span key={i}>
                          {(part as { type: "text"; text: string }).text}
                        </span>
                      ))}
                  </p>
                </div>
                {message.role === "user" && (
                  <div className="flex-shrink-0 rounded-full bg-zinc-700 p-2 h-fit">
                    <User className="h-4 w-4 text-zinc-300" />
                  </div>
                )}
              </div>
            ))}
            {isLoading && messages[messages.length - 1]?.role === "user" && (
              <div className="flex gap-4">
                <div className="flex-shrink-0 rounded-full bg-violet-500/20 p-2 h-fit">
                  <Bot className="h-4 w-4 text-violet-400" />
                </div>
                <div className="rounded-2xl bg-zinc-800 px-4 py-3">
                  <Loader2 className="h-5 w-5 animate-spin text-zinc-400" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
        {error && (
          <div className="mt-4 rounded-lg bg-red-500/10 p-4 text-red-400">
            Błąd: {error.message}
          </div>
        )}
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="border-t border-zinc-800 p-4">
        <div className="flex gap-4">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Napisz wiadomość..."
            className="flex-1 rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-3 text-white placeholder-zinc-500 outline-none transition-colors focus:border-violet-500"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !inputValue.trim()}
            className="rounded-xl bg-violet-500 px-6 py-3 font-medium text-white transition-colors hover:bg-violet-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
      </form>
    </div>
  );
}
