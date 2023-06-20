import React from "react";
import { motion } from "framer-motion";

type Props = {
  onToggle: () => void;
  value: "note" | "distraction";
};

export default function ToggleButton({ onToggle, value }: Props) {
  return (
    <div className="flex gap-2">
      <button
        onClick={onToggle}
        className="h-10 w-20 rounded-full bg-background"
      >
        <motion.div
          className="relative left-[2px] h-9 w-9 rounded-full bg-foreground shadow-lg"
          animate={value === "note" ? { x: 0 } : { x: 40 }}
          transition={{ duration: 0.2 }}
        />
      </button>
      {value}
    </div>
  );
}
