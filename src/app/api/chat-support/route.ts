import { streamText } from "ai";
import { openai } from "@ai-sdk/openai";
import { KNOWLEDGE_BASE } from "@/knowledge/base";

export const maxDuration = 30;

// Convert UI messages (parts format) to model messages (content format)
function toModelMessages(
  messages: Array<{ role: string; parts?: Array<{ type: string; text?: string }>; content?: string }>
) {
  return messages.map((msg) => {
    // If already in model format (has content string), pass through
    if (typeof msg.content === "string") {
      return { role: msg.role as "user" | "assistant", content: msg.content };
    }
    // Convert from UI format (parts array) to simple content string
    const text = msg.parts
      ?.filter((p) => p.type === "text" && p.text)
      .map((p) => p.text)
      .join("") ?? "";
    return { role: msg.role as "user" | "assistant", content: text };
  });
}

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const modelMessages = toModelMessages(messages);

    const result = streamText({
      model: openai("gpt-4o-mini"),
      messages: modelMessages,
      system: `Jesteś pomocnym asystentem obsługi klienta na stronie Gemini Pro. Odpowiadasz WYŁĄCZNIE po polsku.

Twoje zasady:
- Odpowiadaj na pytania klientów na podstawie poniższej bazy wiedzy
- Bądź uprzejmy, profesjonalny i zwięzły
- Jeśli klient pyta o coś, czego nie ma w bazie wiedzy, powiedz że nie masz tej informacji i zasugeruj kontakt przez Telegram (@prolifefit) lub email (prolifefit777@gmail.com)
- Jeśli klient jest zainteresowany zakupem, kieruj go do sekcji cennik na stronie lub do kontaktu
- Nie wymyślaj informacji — korzystaj tylko z bazy wiedzy
- Używaj formatowania markdown gdy to odpowiednie
- Bądź pomocny i staraj się odpowiedzieć na pytanie klienta jak najlepiej

## Baza wiedzy:

${KNOWLEDGE_BASE}`,
    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error("Support chat API error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : String(error) }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
