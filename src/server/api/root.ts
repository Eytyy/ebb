import { createTRPCRouter } from "~/server/api/trpc";
import { exampleRouter } from "~/server/api/routers/example";
import { tracksRouter } from "./routers/tracks";
import { activityRouter } from "./routers/activity";
import { moodRouter } from "./routers/mood";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  tracks: tracksRouter,
  activity: activityRouter,
  mood: moodRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
