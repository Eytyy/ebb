import { motion, type Variants } from "framer-motion";
import SubmissionNav from "../nav/SubmissionNav";
import Label from "../new-activity/Label";
import useFormInputFocus from "~/hooks/useFormInputFocus";
import { api } from "~/utils/api";
import LoadingScreen from "../LoadingScreen";

type Props = {
  title: string;
  time: string;
  category: string;
  moods?: { id: string; name: string }[];
  onError: boolean;
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
  category,
  moods,
  time,
  onCancel,
  onSubmit,
  onError,
}: Props) {
  const { ref } = useFormInputFocus();
  const { data: prompt, isLoading } = api.gpt.getActivityPrompt.useQuery(
    { prompt: `${title} - ${category} - ${time}` },
    { refetchOnWindowFocus: false }
  );

  const submit = (moodId: string) => {
    if (!ref.current) return void 0;
    onSubmit({ moodId, description: ref.current.value });
  };

  if (isLoading) return <LoadingScreen message="Saving" />;

  const question = prompt?.message?.content || "what were you up to?";

  return (
    <>
      {onError && (
        <div className="text-4xl">there was an Error! please try again!</div>
      )}
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
          <Label id="note">{question}</Label>
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
