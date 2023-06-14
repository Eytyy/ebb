import React from "react";
import {
  BottomLeftBtn,
  BottomRightBtn,
  TopLeftBtn,
  TopRightBtn,
} from "./Buttons";
import Circle from "./QuickCaptureBtn";
import Link from "next/link";
import DashboardIcon from "../icons/DashboardIcon";

type Props = {
  title: string;
};

export default function ActivityNav({ title }: Props) {
  return (
    <>
      <TopLeftBtn>{title}</TopLeftBtn>
      <TopRightBtn>
        <button>
          <Circle />
        </button>
      </TopRightBtn>
      <BottomLeftBtn>
        <Link href="/dashboard">
          <DashboardIcon />
        </Link>
      </BottomLeftBtn>
      <BottomRightBtn>+</BottomRightBtn>
    </>
  );
}
