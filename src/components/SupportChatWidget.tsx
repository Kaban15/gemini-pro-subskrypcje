"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { MessageCircle, X, Send, Bot, User, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRef, useEffect, useState, useMemo } from "react";

export function SupportChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const transport = useMemo(
    () => new DefaultChatTransport({ api: "/api/chat-support" }),
    []
  );

  const { messages, sendMessage, status, error } = useChat({ transport });

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

  return (
    <>
      {/* Chat Panel */}
      <div
        className={cn(
          "fixed bottom-20 right-4 z-50 flex w-[360px] flex-col rounded-2xl border border-zinc-800 bg-zinc-950 shadow-2xl shadow-black/50 transition-all duration-300 sm:right-6",
          isOpen
            ? "pointer-events-auto h-[500px] scale-100 opacity-100"
            : "pointer-events-none h-0 scale-95 opacity-0"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-800 px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="rounded-full bg-violet-500/20 p-1.5">
              <Bot className="h-4 w-4 text-violet-400" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">
                Asystent Gemini Pro
              </h3>
              <p className="text-xs text-zinc-500">Odpowiem na Twoje pytania</p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="rounded-lg p-1 text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4">
          {messages.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center px-4">
              <Bot className="mb-3 h-8 w-8 text-zinc-600" />
              <p className="text-sm text-zinc-400">
                Cześć! Jak mogę Ci pomóc?
              </p>
              <p className="mt-1 text-xs text-zinc-500">
                Zapytaj o cennik, funkcje, sposób zamawiania i więcej
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "flex gap-2",
                    message.role === "user" ? "justify-end" : "justify-start"
                  )}
                >
                  {message.role === "assistant" && (
                    <div className="flex-shrink-0 rounded-full bg-violet-500/20 p-1.5 h-fit">
                      <Bot className="h-3 w-3 text-violet-400" />
                    </div>
                  )}
                  <div
                    className={cn(
                      "max-w-[80%] rounded-xl px-3 py-2 text-sm",
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
                    <div className="flex-shrink-0 rounded-full bg-zinc-700 p-1.5 h-fit">
                      <User className="h-3 w-3 text-zinc-300" />
                    </div>
                  )}
                </div>
              ))}
              {isLoading && messages[messages.length - 1]?.role === "user" && (
                <div className="flex gap-2">
                  <div className="flex-shrink-0 rounded-full bg-violet-500/20 p-1.5 h-fit">
                    <Bot className="h-3 w-3 text-violet-400" />
                  </div>
                  <div className="rounded-xl bg-zinc-800 px-3 py-2">
                    <Loader2 className="h-4 w-4 animate-spin text-zinc-400" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
          {error && (
            <div className="mt-3 rounded-lg bg-red-500/10 p-3 text-xs text-red-400">
              Błąd: {error.message}
            </div>
          )}
        </div>

        {/* Input */}
        <form onSubmit={handleSubmit} className="border-t border-zinc-800 p-3">
          <div className="flex gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Napisz wiadomość..."
              className="flex-1 rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-white placeholder-zinc-500 outline-none transition-colors focus:border-violet-500"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !inputValue.trim()}
              className="rounded-lg bg-violet-500 px-3 py-2 text-white transition-colors hover:bg-violet-600 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </form>
      </div>

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "fixed bottom-4 right-4 z-50 rounded-full p-4 shadow-lg transition-all duration-300 hover:scale-110 sm:right-6",
          isOpen
            ? "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
            : "bg-gradient-to-r from-violet-500 to-cyan-500 text-white hover:from-violet-600 hover:to-cyan-600"
        )}
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <MessageCircle className="h-6 w-6" />
        )}
      </button>
    </>
  );
}
