import { useRef } from "react";
import Mood from "../mood";
import { motion, type Variants } from "framer-motion";
import SubmissionNav from "../nav/SubmissionNav";

type Props = {
  title: string;
  moods?: { id: string; name: string }[];
  onSubmit: ({
    description,
    moodId,
  }: {
    description?: string;
    moodId: string;
  }) => void;
};

const variants: Variants = {
  initial: {},
  animate: { transition: { staggerChildren: 0.05 } },
};

export default function ViewSubmission({ title, moods, onSubmit }: Props) {
  const desc = useRef<HTMLTextAreaElement | null>(null);
  const submit = (moodId: string) => {
    if (!desc.current) return void 0;
    onSubmit({ moodId, description: desc.current.value });
  };
  return (
    <>
      <SubmissionNav submit={submit} moods={moods} title={title} />
      {moods && (
        <motion.div
          className="mx-auto grid max-w-5xl"
          variants={variants}
          initial="initial"
          animate="animate"
        >
          <div className="grid grid-rows-[min-content,1fr] gap-4">
            <textarea
              ref={desc}
              id="desc"
              placeholder="what where you doing?"
              className="bg-transparent text-2xl outline-none"
            />
          </div>
        </motion.div>
      )}
    </>
  );
}
