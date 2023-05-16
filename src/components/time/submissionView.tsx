import { useRef } from "react";
import Mood from "../mood";

type Props = {
  onSubmit: ({
    description,
    moodId,
  }: {
    description?: string;
    moodId: string;
  }) => void;
  moods?: { id: string; name: string }[];
};

export default function SubmissionView({ onSubmit, moods }: Props) {
  const desc = useRef<HTMLTextAreaElement | null>(null);
  const submit = (moodId: string) => {
    if (!desc.current) return void 0;
    onSubmit({ moodId, description: desc.current.value });
  };
  return (
    <div className="grid h-full w-full grid-rows-[min-content,1fr,min-content] gap-8">
      <div className="grid grid-rows-[min-content,1fr] gap-4">
        <label htmlFor="desc" className="text-4xl font-bold">
          description
        </label>
        <textarea
          ref={desc}
          id="desc"
          className="bg-black text-2xl outline-none"
        />
      </div>
      <div className="flex items-center justify-between py-4">
        <div className="space-x-4">
          {moods?.map((mood) => (
            <Mood key={mood.id} onClick={submit} {...mood} />
          ))}
        </div>
      </div>
    </div>
  );
}
