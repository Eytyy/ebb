import React from "react";
import {
  BottomLeftBtn,
  BottomRightBtn,
  TopLeftBtn,
  TopRightBtn,
} from "./Buttons";

type Props = {
  title: string;
  time: string;
  onDone: () => void;
  onCancel: () => void;
};
export default function TimerNav({ title, onDone, onCancel, time }: Props) {
  return (
    <>
      <TopLeftBtn>{title}</TopLeftBtn>
      <TopRightBtn>{time}</TopRightBtn>
      <BottomLeftBtn>
        <button onClick={onCancel}>cancel</button>
      </BottomLeftBtn>
      <BottomRightBtn>
        <button onClick={onDone}>done</button>
      </BottomRightBtn>
    </>
  );
}
