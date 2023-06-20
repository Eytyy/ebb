import type { Mood, TimeLog } from "@prisma/client";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const logsRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    const logs = await ctx.prisma.timeLog.findMany({
      take: 10,
    });
    return logs;
  }),
  getByDay: protectedProcedure.query(async ({ ctx }) => {
    const logs = await ctx.prisma.$queryRaw<
      {
        day: string;
        logs: (TimeLog & {
          distractions: number;
          duration: number;
          mood: Mood;
        })[];
        total_duration: number;
      }[]
    >`
      SELECT
        CASE
          WHEN DATE_TRUNC('day', start) = CURRENT_DATE THEN 'Today'
          ELSE TO_CHAR(DATE_TRUNC('day', start), 'Mon DD, YYYY')
        END AS day,
        jsonb_agg(jsonb_build_object(
          'id', id,
          'start', start,
          'end', "end",
          'description', description,
          'duration', TO_CHAR("end" - "start", 'HH24:MI:SS'),
          'mood', (
            SELECT jsonb_build_object('id', id, 'name', name)
            FROM "Mood"
            WHERE "Mood".id = "TimeLog"."moodId"
          ),
          'distractions', (
            SELECT COUNT(*)
            FROM "Distraction"
            WHERE "Distraction"."timeLogId" = "TimeLog"."id"
          )
        )) AS logs,
        TO_CHAR(SUM("end" - "start"), 'FMHH24:MI:SS') AS total_duration
      FROM
        "TimeLog"
      GROUP BY
        day
      ORDER BY
        day DESC
    `;

    return logs;
  }),
  create: protectedProcedure
    .input(
      z.object({
        activityId: z.string(),
        start: z.date(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const timeLog = await ctx.prisma.timeLog.create({
        data: {
          start: input.start,
          userId: ctx.session.user.id,
          activityId: input.activityId,
        },
      });
      return {
        sessionId: timeLog.id,
        start: timeLog.start,
      };
    }),

  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        description: z.string(),
        end: z.date(),
        moodId: z.string(),
        distractions: z.array(
          z.object({
            start: z.date(),
            end: z.date(),
            text: z.string(),
            moodId: z.string(),
          })
        ),
        notes: z.array(
          z.object({
            start: z.date(),
            end: z.date(),
            text: z.string(),
            moodId: z.string(),
          })
        ),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.timeLog.update({
        where: {
          id: input.id,
        },
        data: {
          description: input.description,
          end: input.end,
          moodId: input.moodId,
          distractions: {
            createMany: {
              data: input.distractions,
            },
          },
          notes: {
            createMany: {
              data: input.notes,
            },
          },
        },
      });
    }),
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.timeLog.delete({
        where: {
          id: input.id,
        },
      });
    }),
  getActiveSession: protectedProcedure.query(async ({ ctx }) => {
    const timeLog = await ctx.prisma.timeLog.findFirst({
      select: {
        id: true,
        start: true,
        activity: {
          select: {
            id: true,
            name: true,
            category: true,
          },
        },
      },
      where: {
        userId: ctx.session.user.id,
        end: null,
      },
    });
    return timeLog;
  }),
});
