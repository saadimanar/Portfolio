import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";
import { getSystemPrompt } from "@/actions/prompt.actions";
import { getProfile } from "./tools/getProfile";
import { getContact } from "./tools/getContact";
import { getProjects } from "./tools/getProjects";
import { getResume } from "./tools/getResume";
import { getSkills } from "./tools/getSkills";

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const systemPrompt = await getSystemPrompt();
  messages.unshift({
    role: "system",
    content: systemPrompt,
  });

  const tools = {
    getContact,
    getProfile,
    getProjects,
    getResume,
    getSkills,
  };

  const result = streamText({
    model: openai("gpt-4o-mini"),
    messages,
    tools,
  });

  return result.toDataStreamResponse();
}
