import React from "react";
import { motion } from "framer-motion";

export default function Loading() {
  return (
    <div className="mx-auto grid min-h-screen grid-rows-[1fr,min-content] p-10">
      <main className="flex flex-col items-center justify-center">
        <motion.div
          animate={{
            scale: [0.8, 1],
            opacity: [0.8, 1],
            transition: {
              duration: 1,
              repeat: Infinity,
              repeatType: "reverse",
              repeatDelay: 0.2,
            },
          }}
          className="relative z-10 flex h-60 w-60 items-center justify-center rounded-full bg-white  text-black"
        ></motion.div>
      </main>
    </div>
  );
}
