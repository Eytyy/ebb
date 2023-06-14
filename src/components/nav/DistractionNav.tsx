import React from "react";
import { BottomLeftBtn, BottomRightBtn, TopLeftBtn } from "./Buttons";
import { moodFace } from "../mood";

type Props = {
  time: string;
  moods?: { id: string; name: string }[];
  submit: (moodId: string) => void;
  close: () => void;
};

export default function DistractionNav({ time, moods, submit, close }: Props) {
  return (
    <>
      <TopLeftBtn>{time}</TopLeftBtn>
      <BottomLeftBtn>
        <button onClick={close}>cancel</button>
      </BottomLeftBtn>
      {moods && (
        <BottomRightBtn>
          <div className="flex items-center justify-between py-4">
            <div className="space-x-4">
              {moods.map((mood) => (
                <button
                  key={mood.id}
                  onClick={() => submit(mood.id)}
                  className="h-10 w-10 rotate-90 rounded-full bg-white text-black"
                >
                  {moodFace(mood.name)}
                </button>
              ))}
            </div>
          </div>
        </BottomRightBtn>
      )}
    </>
  );
}
