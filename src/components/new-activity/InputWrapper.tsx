import { type PropsWithChildren } from "react";
import { motion, type Variants } from "framer-motion";

const variants: Variants = {
  initial: {
    y: -100,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
  },
  exit: {
    y: -100,
    opacity: 0,
  },
};

export default function InputWrapper({ children }: PropsWithChildren) {
  return <motion.div variants={variants}>{children}</motion.div>;
}
