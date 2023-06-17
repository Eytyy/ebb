import {
  type ChatCompletionRequestMessage,
  Configuration,
  OpenAIApi,
} from "openai";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(config);

export const gptRouter = createTRPCRouter({
  getActivityPrompt: protectedProcedure
    .input(z.object({ prompt: z.string() }))
    .query(async ({ input }) => {
      const prompt = input.prompt;
      const res = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: system,
          },
          {
            role: "user",
            content: "Ra Mix Uploader - Work - 02:00:00",
          },
          {
            role: "assistant",
            content:
              "Way to go! working for 2 hours straight takes a lot of discipline. What were you working on?",
          },
          {
            role: "user",
            content: "lunch - eating - 15:00",
          },
          {
            role: "assistant",
            content: "How was your lunch? Did you enjoy your meal?",
          },
          {
            role: "user",
            content: "workout - lifestyle - 00:01:00",
          },
          {
            role: "assistant",
            content:
              "Wow, only 1 minute of workout? Did you mean to log that or was it a quick warm-up before a longer workout session?",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.8,
        max_tokens: 256,
      });
      return res.data.choices[0];
    }),
});

const system = `Enquire the user about their activities. Write a question prompting the user to describe the activity based on the activity name, category, and time or duration.
Activity: name - category - time(13:00)/duration(Hours:Minutes:Seconds).
When the duration of the activity is relatively short based on its type, ask if it was a mistake.`;
