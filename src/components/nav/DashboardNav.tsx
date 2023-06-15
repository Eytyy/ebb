import React from "react";
import { motion } from "framer-motion";

import { useApp } from "~/context/app";

import {
  BottomLeftBtn,
  BottomRightBtn,
  TopLeftBtn,
  TopRightBtn,
} from "./Buttons";
import Circle from "./QuickCaptureBtn";
import Link from "next/link";

export default function DashboardNav() {
  const { dispatch, state } = useApp();
  const { isNavOpen } = state;

  function toggleMenu() {
    dispatch({ type: "TOGGLE_MENU" });
  }

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
      <BottomLeftBtn>
        <motion.button
          role="button"
          whileTap={{
            scale: 0.9,
          }}
          onClick={toggleMenu}
        >
          {isNavOpen ? "Close" : "Menu"}
        </motion.button>
      </BottomLeftBtn>
      <BottomRightBtn>
        <Link href="/activity/new">New</Link>
      </BottomRightBtn>
    </>
  );
}
