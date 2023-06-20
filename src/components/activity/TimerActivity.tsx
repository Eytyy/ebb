import React from "react";
import ActivityNav from "../nav/ActivityNav";
import type { RouterOutputs } from "~/utils/api";
import TimerActivityLogItem from "./TimerActivityLogItem";

type Props = {
  activity: RouterOutputs["activity"]["getById"];
};

export default function TimerActivity({ activity }: Props) {
  if (!activity) {
    return null;
  }

  return (
    <>
      <ActivityNav title={activity.name} />
      <main className={`mx-auto h-full max-w-5xl space-y-4 px-24`}>
        {activity.timeLogs.map((timeLog) => {
          return <TimerActivityLogItem key={timeLog.id} {...timeLog} />;
        })}
      </main>
    </>
  );
}
