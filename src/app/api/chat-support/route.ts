import { streamText, convertToModelMessages } from "ai";
import { openai } from "@ai-sdk/openai";
import { KNOWLEDGE_BASE } from "@/knowledge/base";

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { messages } = body;

    // Debug: log raw messages from client
    console.log("RAW BODY KEYS:", Object.keys(body));
    console.log("RAW MESSAGES:", JSON.stringify(messages?.slice(0, 2), null, 2));

    const modelMessages = await convertToModelMessages(messages);
    console.log("MODEL MESSAGES:", JSON.stringify(modelMessages?.slice(0, 2), null, 2));

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
    const errMsg = error instanceof Error ? error.message : String(error);
    return new Response(
      JSON.stringify({ error: errMsg }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
