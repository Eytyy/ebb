import { type Variants, motion } from "framer-motion";
import { useRouter } from "next/router";
import React, { forwardRef } from "react";
import { useApp } from "~/context/app";

import { api, type RouterOutputs } from "~/utils/api";
import { getShortTitle } from "~/utils/helpers";

type Activity = RouterOutputs["activity"]["getAll"][number];

type Props = {
  activity: Activity;
};

export default function ActivityItem({ activity }: Props) {
  switch (activity.tracker) {
    case "timer": {
      return <TimerActivityItem activity={activity} />;
    }
    case "counter": {
      return <CounterActivityItem activity={activity} />;
    }
    default: {
      return null;
    }
  }
}

const BtnVars: Variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
};

function TimerActivityItem({ activity }: Props) {
  const { dispatch } = useApp();
  const { mutateAsync } = api.logs.create.useMutation();

  const startTimer = React.useCallback(async () => {
    const start = new Date();

    dispatch({
      type: "START_SESSION",
      payload: {
        activity: {
          id: activity.id,
          name: activity.name,
          category: activity.category,
        },
        start,
      },
    });
    const timelog = await mutateAsync({
      activityId: activity.id,
      start,
    });
    dispatch({
      type: "SET_ACTIVE_SESSION",
      payload: {
        id: timelog.sessionId,
        start: timelog.start,
        activity: {
          id: activity.id,
          name: activity.name,
          category: activity.category,
        },
      },
    });
  }, [activity, dispatch, mutateAsync]);

  return <Btn id={activity.id} name={activity.name} onClick={startTimer} />;
}

function CounterActivityItem({ activity }: Props) {
  return <Btn id={activity.id} name={activity.name} />;
}

function Btn({
  id,
  onClick = () => void 0,
  name,
}: {
  id: string;
  name: string;
  onClick?: () => Promise<void> | void;
}) {
  const { dispatch } = useApp();
  const router = useRouter();

  const ref = React.useRef<HTMLDivElement>(null);
  const timeout = React.useRef<NodeJS.Timeout | null>(null);

  const updatePos = React.useCallback(() => {
    if (!ref.current) return void 0;
    const { x, y } = ref.current.getBoundingClientRect();
    dispatch({
      type: "SET_POS",
      payload: { x, y },
    });
  }, [dispatch]);

  const handleDoubleClick = React.useCallback(() => {
    if (timeout.current) {
      clearTimeout(timeout.current);
      timeout.current = null;
    }
    updatePos();
    void router.push(`/activity/${id}`);
  }, [router, id, updatePos]);

  const handleClick = React.useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (e.detail === 1) {
        timeout.current = setTimeout(() => {
          updatePos();
          void onClick();
        }, 200);
      }
    },
    [updatePos, onClick]
  );

  return (
    <motion.button
      className="w-full"
      role="button"
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      variants={BtnVars}
    >
      <Circle ref={ref} />
      <h2 className="mt-2 text-center text-base font-medium capitalize">
        {getShortTitle(name)}
      </h2>
    </motion.button>
  );
}

const CircleVariants: Variants = {
  initial: {
    scale: 0,
    opacity: 0,
  },
  animate: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  },
};

const Circle = forwardRef<HTMLDivElement>(function Circle(_, ref) {
  return (
    <motion.div whileTap={{ scale: 0.9 }} ref={ref}>
      <motion.div
        className="mb-4 w-full scale-100 rounded-full bg-white shadow-lg"
        variants={CircleVariants}
      >
        <div className="pt-[100%]" />
      </motion.div>
    </motion.div>
  );
});
