import { useCallback, useRef, useMemo } from "react";
import { type Variants, motion, AnimatePresence } from "framer-motion";
import DistractionNav from "../nav/DistractionNav";
import Label from "../new-activity/Label";
import useFormInputFocus from "~/hooks/useFormInputFocus";
import { getScreenCenter } from "~/utils/dom";
import InputWrapper from "../new-activity/InputWrapper";

export type DistractionProps = {
  start: Date;
  end: Date;
  moodId: string;
  text: string;
};

type Props = {
  time: string;
  moods?: { id: string; name: string }[];
  close: () => void;
  add: (d: DistractionProps) => void;
};

const variants: Variants = {
  initial: {},
  animate: { transition: { staggerChildren: 0.05 } },
};

export default function ViewDistraction({ time, moods, add, close }: Props) {
  const start = useMemo(() => new Date(), []);
  const { ref } = useFormInputFocus();

  const onSubmit = useCallback(
    (moodId: string) => {
      if (!ref.current) return void 0;
      add({
        end: new Date(),
        start,
        moodId,
        text: ref.current.value,
      });
      close();
    },
    [start, add, close, ref]
  );

  return (
    <>
      <DistractionNav
        submit={onSubmit}
        time={time}
        close={close}
        moods={moods}
      />
      <motion.div
        className="h-full pt-16 text-8xl"
        variants={variants}
        initial="initial"
        animate="animate"
      >
        <Circle />
        <div className="relative text-background">
          <Label id="note">{`What's up?`}</Label>
          <InputWrapper>
            <textarea
              name="note"
              ref={ref}
              id="note"
              className="block h-full w-full bg-transparent text-4xl outline-none"
            />
          </InputWrapper>
        </div>
      </motion.div>
    </>
  );
}

function Circle() {
  const scaleFactor =
    typeof window !== "undefined" ? window.innerWidth / 348 : 2;
  return (
    <motion.div
      className="fixed-center h-96 w-96 rounded-full bg-foreground shadow-lg"
      initial={{
        scale: 1,
        x: "-50%",
        y: "-50%",
        borderRadius: "9999px",
      }}
      animate={{
        scale: scaleFactor,
        x: "-50%",
        y: "-50%",
        transition: { duration: 0.5, ease: "easeInOut" },
        borderRadius: "0px",
      }}
      exit={{
        scale: 1,
        borderRadius: "9999px",
      }}
    ></motion.div>
  );
}
