import React from "react";
import { motion } from "framer-motion";

export default function Submitting() {
  return (
    <div className="fixed left-0 top-0 z-30 flex h-full w-full flex-col items-center justify-center bg-background">
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
    </div>
  );
}
