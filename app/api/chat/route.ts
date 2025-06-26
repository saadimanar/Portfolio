import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";
import { getSystemPrompt } from "@/actions/prompt.actions";
import { getProfile } from "./tools/getProfile";

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const systemPrompt = await getSystemPrompt();
  messages.unshift({
    role: "system",
    content: systemPrompt,
  });

  const tools = {
    getProfile,
  };

  const result = streamText({
    model: openai("gpt-4o-mini"),
    messages,
    tools,
  });

  return result.toDataStreamResponse();
}
