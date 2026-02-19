import { streamText } from "ai";
import { google } from "@ai-sdk/google";

export const maxDuration = 30;

// Convert UI messages (parts format) to model messages (content format)
function toModelMessages(
  messages: Array<{ role: string; parts?: Array<{ type: string; text?: string }>; content?: string }>
) {
  return messages.map((msg) => {
    if (typeof msg.content === "string") {
      return { role: msg.role as "user" | "assistant", content: msg.content };
    }
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
      model: google("gemini-1.5-pro-latest"),
      messages: modelMessages,
      system: `You are a helpful AI assistant powered by Google's Gemini Pro model.
You are part of a premium SaaS application. Be helpful, accurate, and concise in your responses.
Format your responses using markdown when appropriate.`,
    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error("Chat API error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to process chat request" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
