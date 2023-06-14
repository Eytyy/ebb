import React from "react";
import {
  BottomLeftBtn,
  BottomRightBtn,
  TopLeftBtn,
  TopRightBtn,
} from "./Buttons";
import Circle from "./QuickCaptureBtn";

export default function TimerNav({
  title,
  onDone,
  onCancel,
}: {
  title: string;
  onDone: () => void;
  onCancel: () => void;
}) {
  return (
    <>
      <TopLeftBtn>{title}</TopLeftBtn>
      <TopRightBtn>
        <button>
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
