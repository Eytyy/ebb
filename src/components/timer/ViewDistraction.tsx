import { CgClose } from "react-icons/cg";
import { useCallback, useRef, useMemo } from "react";
import Mood from "../mood";
import { type Variants, motion } from "framer-motion";
type Props = {
  time: string;
  moods?: { id: string; name: string }[];
  close: () => void;
  add: (d: DistractionProps) => void;
};

export type DistractionProps = {
  start: Date;
  end: Date;
  moodId: string;
  text: string;
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
      if (input.current) {
        add({
          end: new Date(),
          start,
          moodId,
          text: input.current.value,
        });
        close();
      }
    },
    [start, add, close]
  );

  return (
    <motion.div
      className="mx-auto grid max-w-5xl grid-cols-4 gap-8"
      variants={variants}
      initial="initial"
      animate="animate"
    >
      <h1>{time}</h1>
      <div className="grid grid-rows-[min-content,1fr] gap-4">
        <label htmlFor="note" className="text-4xl font-bold">
          {`What's up?`}
        </label>
        <textarea
          ref={input}
          id="note"
          className="bg-black text-2xl outline-none"
        />
      </div>
      <div className="flex items-center justify-between py-4">
        <button className="text-4xl" onClick={close}>
          <CgClose />
        </button>
        <div className="space-x-4">
          {moods?.map((mood) => (
            <Mood key={mood.id} onClick={onSubmit} {...mood} />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
