import { streamText, convertToModelMessages } from "ai";
import { google } from "@ai-sdk/google";

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const modelMessages = await convertToModelMessages(messages);

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
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
