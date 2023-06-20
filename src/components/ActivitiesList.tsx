import React from "react";
import { type Variants, motion } from "framer-motion";
import { type RouterOutputs } from "~/utils/api";
import ActivityItem from "./activityItem";

type Activities = RouterOutputs["activity"]["getAll"];

type Props = {
  activities: Activities;
};

const variants: Variants = {
  initial: {},
  animate: { transition: { staggerChildren: 0.05 } },
};

export default function ActivitiesList({ activities }: Props) {
  return (
    <motion.main
      className="mx-auto grid max-w-5xl grid-cols-4 gap-10"
      variants={variants}
      initial="initial"
      animate="animate"
    >
      {activities.map((activity) => (
        <ActivityItem key={activity.id} activity={activity} />
      ))}
    </motion.main>
  );
}
