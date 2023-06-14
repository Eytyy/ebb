import React, { type PropsWithChildren } from "react";
import { Inter } from "next/font/google";

import Menu from "./nav/Menu";
import { useApp } from "~/context/app";
import { AnimatePresence } from "framer-motion";
const inter = Inter({ subsets: ["latin"] });

export default function AppLayout({ children }: PropsWithChildren) {
  const {
    state: { isNavOpen },
  } = useApp();

  return (
    <div className={`relative h-screen p-16 ${inter.className}`}>
      <AnimatePresence mode="wait">{isNavOpen && <Menu />}</AnimatePresence>
      {children}
    </div>
  );
}
