import { tool } from "ai";
import { z } from "zod";

export const getProfile = tool({
  description:
    'This tool returns a concise personal introduction of Raphael Giraud. It is used to answer the question "Who are you?" or "Tell me about yourself"',
  parameters: z.object({}),
  execute: async () => {
    return {
      presentation:
        "I'm Manar Saadi, a 25-year-old software developer and a computer science graduate from Technion. Worked as a software developer at a startup called playgen.io for 10 months. I'm passionate about AI, tech, Entrepreneurship and SaaS tech.",
    };
  },
});
