import { type Variants, motion } from "framer-motion";
import { useRouter } from "next/router";
import React from "react";
import { useApp } from "~/context/app";

import { type RouterOutputs } from "~/utils/api";
import { getShortTitle } from "~/utils/helpers";

type Activity = RouterOutputs["activity"]["getAll"][number];

type Props = {
  activity: Activity;
  startTimer: () => void;
};

export default function ActivityItem({ activity, startTimer }: Props) {
  switch (activity.tracker) {
    case "timer": {
      return <Btn id={activity.id} onClick={startTimer} />;
    }
    case "counter": {
      return <Btn id={activity.id} onClick={() => void 0} />;
    }
    default: {
      return null;
    }
  }
}

const itemVariants: Variants = {
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

function Btn({ id, onClick }: { id: string; onClick: () => void }) {
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
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.detail === 1) {
        timeout.current = setTimeout(() => {
          updatePos();
          onClick();
        }, 200);
      }
    },
    [updatePos, onClick]
  );

  return (
    <motion.div
      whileTap={{ scale: 0.9 }}
      ref={ref}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
    >
      <motion.button
        className="mb-4 w-full scale-100 rounded-full bg-white shadow-lg"
        variants={itemVariants}
      >
        <div className="pt-[100%]" />
      </motion.button>
    </motion.div>
  );
}
