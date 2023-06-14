import { useCallback, useRef, useMemo } from "react";
import { type Variants, motion } from "framer-motion";
import DistractionNav from "../nav/DistractionNav";

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
  const input = useRef<HTMLTextAreaElement | null>(null);

  const onSubmit = useCallback(
    (moodId: string) => {
      if (!input.current) return void 0;
      add({
        end: new Date(),
        start,
        moodId,
        text: input.current.value,
      });
      close();
    },
    [start, add, close]
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
        className="mx-auto h-full max-w-5xl"
        variants={variants}
        initial="initial"
        animate="animate"
      >
        <textarea
          ref={input}
          id="note"
          className="block h-full w-full bg-black text-2xl outline-none"
          placeholder="what's up?"
        />
      </motion.div>
    </>
  );
}
