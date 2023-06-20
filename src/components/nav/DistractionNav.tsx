import React from "react";
import {
  BottomLeftBtn,
  BottomRightBtn,
  TopLeftBtn,
  TopRightBtn,
} from "./Buttons";
import { MoodFace } from "../mood";
import ToggleButton from "../ToggleButton";

type Props = {
  time: string;
  moods?: { id: string; name: string }[];
  submit: (moodId: string) => void;
  close: () => void;
};

export default function DistractionNav({ time, moods, submit, close }: Props) {
  const [state, setState] = React.useState<"note" | "distraction">("note");

  function toggle() {
    setState((state) => (state === "note" ? "distraction" : "note"));
  }

  return (
    <>
      <TopLeftBtn>
        <div className="text-background">
          <ToggleButton onToggle={toggle} value={state} />
        </div>
      </TopLeftBtn>
      <TopRightBtn>
        <div className="text-background">{time}</div>
      </TopRightBtn>
      <BottomLeftBtn>
        <button className="text-background" onClick={close}>
          cancel
        </button>
      </BottomLeftBtn>
      {moods && (
        <BottomRightBtn>
          <div className="flex items-center justify-between py-4">
            <div className="space-x-4">
              {moods.map((mood) => (
                <button
                  key={mood.id}
                  onClick={() => submit(mood.id)}
                  className="text-forground mt-4 h-10 w-10 rotate-90 rounded-full bg-background"
                >
                  <MoodFace name={mood.name} />
                </button>
              ))}
            </div>
          </div>
        </BottomRightBtn>
      )}
    </>
  );
}
