import {
  streamText,
  createUIMessageStream,
  createUIMessageStreamResponse,
} from "ai";
import { google } from "@ai-sdk/google";
import { nanoid } from "nanoid";

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    // In production, you would verify the user's subscription here
    // Example:
    // const session = await getServerSession(authOptions);
    // if (!session?.user?.isSubscribed) {
    //   return new Response("Unauthorized", { status: 401 });
    // }

    const messageId = nanoid();

    const stream = createUIMessageStream({
      execute: async ({ writer }) => {
        const result = await streamText({
          model: google("gemini-1.5-pro-latest"),
          messages,
          system: `You are a helpful AI assistant powered by Google's Gemini Pro model.
You are part of a premium SaaS application. Be helpful, accurate, and concise in your responses.
Format your responses using markdown when appropriate.`,
        });

        // Write text chunks to the UI message stream
        writer.write({ type: "text-start", id: messageId });
        for await (const textPart of result.textStream) {
          writer.write({
            type: "text-delta",
            delta: textPart,
            id: messageId,
          });
        }
        writer.write({ type: "text-end", id: messageId });
      },
      onError: (error) => {
        console.error("Stream error:", error);
        return error instanceof Error ? error.message : "An error occurred";
      },
    });

    return createUIMessageStreamResponse({ stream });
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
