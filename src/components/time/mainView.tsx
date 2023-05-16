import { useCallback } from "react";
import { motion } from "framer-motion";
import { type InitialState } from "~/store/timer";

type MainViewProps = {
  time: string;
  active: boolean;
  start: () => void;
  stop: () => void;
  cancel: () => void;
  switchView: (view: InitialState["view"]) => void;
};

export default function MainView({
  time,
  active,
  switchView,
  start,
  stop,
  cancel,
}: MainViewProps) {
  const onClickOutsideCircle = useCallback(() => {
    switchView("distraction");
  }, [switchView]);

  return (
    <>
      {active && (
        <div
          onClick={onClickOutsideCircle}
          className="fixed left-0 top-0 h-full w-full cursor-pointer bg-[#222]"
        />
      )}
      <div className="relative flex flex-col items-center gap-2 text-6xl">
        <motion.button
          onClick={active ? stop : start}
          whileTap={{ scale: 0.8 }}
          className="relative z-10 flex h-60 w-60 items-center justify-center rounded-full bg-white  text-black"
        />
        {active && (
          <div className="absolute bottom-0 translate-y-[calc(100%+1rem)] font-bold text-white">
            {time}
          </div>
        )}
      </div>
      {active && (
        <div
          onClick={cancel}
          className="fixed bottom-10 left-1/2 -translate-x-full cursor-pointer font-medium"
        >
          x cancel
        </div>
      )}
    </>
  );
}
