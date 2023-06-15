import { type PropsWithChildren } from "react";
import { type Variants, motion } from "framer-motion";

const variants: Variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
  exit: {
    opacity: 0,
  },
};

export default function StepWrapper({ children }: PropsWithChildren) {
  return (
    <motion.div
      className="text-8xl"
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {children}
    </motion.div>
  );
}
