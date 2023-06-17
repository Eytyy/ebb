import { type Variants, motion } from "framer-motion";
import { useRouter } from "next/router";
import React, { forwardRef } from "react";
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
      return <Btn id={activity.id} name={activity.name} onClick={startTimer} />;
    }
    case "counter": {
      return (
        <Btn id={activity.id} name={activity.name} onClick={() => void 0} />
      );
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

function Btn({
  id,
  onClick,
  name,
}: {
  id: string;
  name: string;
  onClick: () => void;
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
          onClick();
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
