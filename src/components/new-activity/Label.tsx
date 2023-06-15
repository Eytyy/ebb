import type { PropsWithChildren } from "react";
import { type Variants, motion } from "framer-motion";

type Props = {
  id: string;
};

const variants: Variants = {
  initial: {
    y: 100,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
  exit: {
    y: 100,
    opacity: 0,
  },
};

export default function Label({ children, id }: PropsWithChildren<Props>) {
  return (
    <motion.label
      htmlFor={id}
      className="relative mr-4 block"
      variants={variants}
    >
      {children}
    </motion.label>
  );
}
