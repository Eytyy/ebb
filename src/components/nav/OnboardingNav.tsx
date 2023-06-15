import React from "react";
import { motion } from "framer-motion";

import { useApp } from "~/context/app";

import { BottomLeftBtn, TopLeftBtn } from "./Buttons";
import { signOut } from "next-auth/react";

export default function OnboardingNav() {
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
      <BottomLeftBtn>
        <motion.button
          role="button"
          whileTap={{
            scale: 0.9,
          }}
          onClick={() => void signOut()}
        >
          logout
        </motion.button>
      </BottomLeftBtn>
    </>
  );
}
