import React from "react";
import {
  BottomLeftBtn,
  BottomRightBtn,
  TopLeftBtn,
  TopRightBtn,
} from "./Buttons";
import Circle from "./QuickCaptureBtn";
import { moodFace } from "../mood";

type Props = {
  title: string;
  moods?: { id: string; name: string }[];
  submit: (moodId: string) => void;
};

export default function SubmissionNav({ title, moods, submit }: Props) {
  return (
    <>
      <TopLeftBtn>{title}</TopLeftBtn>
      <TopRightBtn>
        <button>
          <Circle />
        </button>
      </TopRightBtn>
      <BottomLeftBtn>How was it?</BottomLeftBtn>
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
