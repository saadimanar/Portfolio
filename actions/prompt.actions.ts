// lib/load-prompt.ts
import { connectToDatabase } from "@/lib/database";
import { Prompt } from "@/lib/database/models/prompt.model";

export async function getSystemPrompt(): Promise<string> {
  await connectToDatabase();

  const promptDoc = await Prompt.findById("system-bio");
  if (!promptDoc) throw new Error("System prompt not found in DB");

  return promptDoc.content;
}
