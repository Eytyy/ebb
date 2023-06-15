import React from "react";
import {
  BottomLeftBtn,
  BottomRightBtn,
  TopLeftBtn,
  TopRightBtn,
} from "./Buttons";
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
      <TopLeftBtn>
        <div className="text-background">note</div>
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
                  className="text-forground h-10 w-10 rotate-90 rounded-full bg-background"
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
