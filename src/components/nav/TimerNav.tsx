import React from "react";
import {
  BottomLeftBtn,
  BottomRightBtn,
  TopLeftBtn,
  TopRightBtn,
} from "./Buttons";
import Circle from "./QuickCaptureBtn";

type Props = {
  title: string;
  onDone: () => void;
  onCancel: () => void;
  openDistraction: () => void;
};
export default function TimerNav({
  title,
  onDone,
  onCancel,
  openDistraction,
}: Props) {
  return (
    <>
      <TopLeftBtn>{title}</TopLeftBtn>
      <TopRightBtn>
        <button role="button" onClick={openDistraction}>
          <Circle />
        </button>
      </TopRightBtn>
      <BottomLeftBtn>
        <button onClick={onCancel}>cancel</button>
      </BottomLeftBtn>
      <BottomRightBtn>
        <button onClick={onDone}>done</button>
      </BottomRightBtn>
    </>
  );
}
