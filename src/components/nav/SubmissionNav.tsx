import React from "react";
import {
  BottomLeftBtn,
  BottomRightBtn,
  TopLeftBtn,
  TopRightBtn,
} from "./Buttons";
import { MoodFace } from "../mood";
import Link from "next/link";

type Props = {
  title: string;
  time: string;
  moods?: { id: string; name: string }[];
  submit: (moodId: string) => void;
  cancel: () => void;
};

export default function SubmissionNav({
  title,
  moods,
  time,
  submit,
  cancel,
}: Props) {
  return (
    <>
      <TopLeftBtn>{title}</TopLeftBtn>
      <TopRightBtn>{time}</TopRightBtn>
      <BottomLeftBtn>
        <button onClick={cancel}>Cancel</button>
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
