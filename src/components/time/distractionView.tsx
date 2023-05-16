import { CgClose } from "react-icons/cg";
import { useCallback, useRef, useMemo } from "react";
import Mood from "../mood";

type Props = {
  time: string;
  moods?: { id: string; name: string }[];
  close: () => void;
  add: (d: DistractionProps) => void;
};

export type DistractionProps = {
  text: string;
  start: Date;
  end: Date;
  moodId: string;
};

export default function DistractionView({ time, moods, close, add }: Props) {
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
    <div className="grid h-full w-full grid-rows-[min-content,1fr,min-content] gap-8">
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
    </div>
  );
}
