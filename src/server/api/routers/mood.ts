import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const moodRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.mood.findMany({
      select: {
        id: true,
        name: true,
      },
    });
  }),
});
