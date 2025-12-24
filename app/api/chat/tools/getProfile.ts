import { tool } from "ai";
import { z } from "zod";

export const getProfile = tool({
  description:
    'This tool returns a concise personal introduction of Manar Saadi. It is used to answer the question "Who are you?" or "Tell me about yourself".',
  parameters: z.object({}),
  execute: async () => {
    return {
      presentation:
        "I'm Manar Saadi, a software developer based in Israel and a Computer Science graduate from the Technion. I have hands-on experience working in a startup environment at Playgent, where I built and maintained production web platforms and AI-generated games. I'm passionate about AI, building smart and clean user experiences, and turning ideas into real products — especially in tech, SaaS, and entrepreneurship.",
    };
  },
});
