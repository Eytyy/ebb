import type { TimeLog } from "@prisma/client";
import React from "react";

type Props = TimeLog[];

export default function Log(timeLogs: Props) {
  return <div>Log</div>;
}
