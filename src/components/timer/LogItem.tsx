import { type TimeLog } from "@prisma/client";
import React from "react";
import type { RouterOutputs } from "~/utils/api";
import { calculateDuration } from "~/utils/helpers";

type Props = (RouterOutputs["activity"]["getById"] &
  TimeLog)["timeLogs"][number];

export default function LogItem(timeLog: Props) {
  return (
    <div className="flex justify-between rounded-lg bg-foreground p-4 text-background shadow-md">
      <div className="font-bold">{timeLog.description}</div>
      <div className="flex items-baseline gap-4">
        <span className="text-sm">
          {formatDate(timeLog.start)} – {formatDate(timeLog.end)}
        </span>
        <span className="text-lg font-medium">
          {calculateDuration(timeLog.start, timeLog.end)}
        </span>
      </div>
    </div>
  );
}

const formatDate = (date: Date) => {
  const d = new Date(date);
  return d.toLocaleTimeString("default", {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: false,
  });
};
