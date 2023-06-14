import React from "react";
import {
  BottomLeftBtn,
  BottomRightBtn,
  TopLeftBtn,
  TopRightBtn,
} from "./Buttons";
import Circle from "./QuickCaptureBtn";

export default function DashboardNav() {
  return (
    <>
      <TopLeftBtn>
        {new Date().toLocaleDateString("default", {
          weekday: "short",
        })}
      </TopLeftBtn>
      <TopRightBtn>
        <button>
          <Circle />
        </button>
      </TopRightBtn>
      <BottomLeftBtn>M</BottomLeftBtn>
      <BottomRightBtn>+</BottomRightBtn>
    </>
  );
}
