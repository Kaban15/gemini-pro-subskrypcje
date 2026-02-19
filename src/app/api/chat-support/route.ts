import {
  streamText,
  createUIMessageStream,
  createUIMessageStreamResponse,
} from "ai";
import { openai } from "@ai-sdk/openai";
import { nanoid } from "nanoid";
import { KNOWLEDGE_BASE } from "@/knowledge/base";

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const messageId = nanoid();

    const stream = createUIMessageStream({
      execute: async ({ writer }) => {
        try {
          const result = await streamText({
            model: openai("gpt-4o-mini"),
            messages,
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

          for await (const textPart of result.textStream) {
            writer.write({
              type: "text-delta",
              delta: textPart,
              id: messageId,
            });
          }
        } catch (err) {
          const errorMsg =
            err instanceof Error ? err.message : "Nieznany błąd";
          console.error("streamText error:", errorMsg);
          writer.write({
            type: "text-delta",
            delta: `[Błąd: ${errorMsg}]`,
            id: messageId,
          });
        }
      },
      onError: (error) => {
        console.error("Support chat stream error:", error);
        return error instanceof Error ? error.message : "Wystąpił błąd";
      },
    });

    return createUIMessageStreamResponse({ stream });
  } catch (error) {
    console.error("Support chat API error:", error);
    return new Response(
      JSON.stringify({ error: "Nie udało się przetworzyć wiadomości" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
