import type { Mood, TimeLog } from "@prisma/client";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const tracksRouter = createTRPCRouter({
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
        activityId: z.string(),
        description: z.string(),
        start: z.date(),
        end: z.date(),
        timeLogType: z.string().optional(),
        moodId: z.string(),
        distractions: z.array(
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
      return ctx.prisma.timeLog.create({
        data: {
          description: input.description,
          activityId: input.activityId,
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
