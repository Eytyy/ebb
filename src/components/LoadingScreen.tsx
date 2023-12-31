import React from "react";
import { motion } from "framer-motion";

export default function LoadingScreen({ message }: { message?: string }) {
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
        className="relative z-10 flex h-96 w-96 items-center justify-center rounded-full bg-white  text-black"
      ></motion.div>
      {message && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="relative z-10 mt-4 text-2xl"
        >
          {message}
        </motion.div>
      )}
    </div>
  );
}
