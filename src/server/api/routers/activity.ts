import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const activityRouter = createTRPCRouter({
  getCategories: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.activityCategory.findMany({
      select: {
        id: true,
        name: true,
      },
      where: {
        userId: ctx.session.user.id,
      },
    });
  }),
  createCategory: protectedProcedure
    .input(
      z.object({
        name: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.activityCategory.create({
        data: {
          name: input.name,
          userId: ctx.session.user.id,
        },
      });
    }),
  getById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.activity.findUnique({
        select: {
          id: true,
          name: true,
          tracker: true,
          category: {
            select: {
              id: true,
              name: true,
            },
          },
          timeLogs: {
            orderBy: {
              start: "desc",
            },
            select: {
              id: true,
              description: true,
              start: true,
              end: true,
              mood: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
          },
        },
        where: {
          id: input.id,
        },
      });
    }),
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.activity.findMany({
      select: {
        id: true,
        name: true,
        tracker: true,
        category: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }),
  create: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        type: z.string(),
        category: z.object({
          name: z.string(),
          id: z.string(),
        }),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // if category id is provided, use it
      // otherwise, create a new category
      const categoryId =
        input.category.id ||
        (await ctx.prisma.activityCategory
          .create({
            data: {
              name: input.category.name,
              userId: ctx.session.user.id,
            },
          })
          .then((category) => category.id));

      return ctx.prisma.activity.create({
        data: {
          name: input.name,
          tracker: input.type,
          userId: ctx.session.user.id,
          categoryId,
        },
      });
    }),
});
