import type { Mood, TimeLog } from "@prisma/client";
import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const tracksRouter = createTRPCRouter({
  getTimeLogType: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.timeLogType.findMany({
      select: {
        id: true,
        name: true,
      },
    });
  }),
  getMoods: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.mood.findMany({
      select: {
        id: true,
        name: true,
      },
    });
  }),
  getTimeLogsByDay: protectedProcedure.query(async ({ ctx }) => {
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
  createTimeLog: protectedProcedure
    .input(
      z.object({
        description: z.string(),
        start: z.date(),
        end: z.date(),
        timeLogTypeId: z.string(),
        moodId: z.string(),
        distractions: z.array(
          z.object({
            text: z.string(),
            start: z.date(),
            end: z.date(),
            moodId: z.string(),
          })
        ),
      })
    )
    .mutation(({ ctx, input }) => {
      console.log(input.start);
      return ctx.prisma.timeLog.create({
        data: {
          description: input.description,
          timeLogTypeId: input.timeLogTypeId,
          start: input.start,
          end: input.end,
          userId: ctx.session.user.id,
          moodId: input.moodId,
          distractions: {
            createMany: {
              data: input.distractions,
            },
          },
        },
      });
    }),
});
