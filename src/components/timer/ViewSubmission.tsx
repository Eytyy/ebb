import { useRef } from "react";
import { motion, type Variants } from "framer-motion";
import SubmissionNav from "../nav/SubmissionNav";
import Label from "../new-activity/Label";
import useFormInputFocus from "~/hooks/useFormInputFocus";

type Props = {
  title: string;
  time: string;
  moods?: { id: string; name: string }[];
  onCancel: () => void;
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

export default function ViewSubmission({
  title,
  moods,
  time,
  onCancel,
  onSubmit,
}: Props) {
  const { ref } = useFormInputFocus();

  const submit = (moodId: string) => {
    if (!ref.current) return void 0;
    onSubmit({ moodId, description: ref.current.value });
  };
  return (
    <>
      <SubmissionNav
        submit={submit}
        cancel={onCancel}
        moods={moods}
        title={title}
        time={time}
      />
      {moods && (
        <motion.div
          className="h-full pt-16 text-8xl"
          variants={variants}
          initial="initial"
          animate="animate"
        >
          <Label id="note">{`What were you up to?`}</Label>
          <textarea
            ref={ref}
            id="desc"
            className="mt-4 block h-full w-full bg-transparent text-4xl outline-none"
            name="desc"
          />
        </motion.div>
      )}
    </>
  );
}
