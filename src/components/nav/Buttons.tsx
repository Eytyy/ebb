import { type PropsWithChildren } from "react";
import { type Variants, motion } from "framer-motion";

const topBtnVariants: Variants = {
  initial: {
    y: -100,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
  exit: {
    y: -100,
    opacity: 0,
  },
};

const bottomBtnVariants: Variants = {
  initial: {
    y: 100,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      y: {
        duration: 0.5,
      },
    },
  },
  exit: {
    y: 100,
    opacity: 0,
  },
};

export const TopLeftBtn = ({ children }: PropsWithChildren) => {
  return (
    <motion.div
      className="fixed left-20 top-16 z-10 text-3xl"
      variants={topBtnVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {children}
    </motion.div>
  );
};

export const TopRightBtn = ({ children }: PropsWithChildren) => {
  return (
    <motion.div
      className="fixed right-20 top-16 z-10 text-3xl"
      variants={topBtnVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {children}
    </motion.div>
  );
};

export const BottomLeftBtn = ({
  children,
}: PropsWithChildren<{
  solid?: boolean;
}>) => {
  return (
    <motion.div
      className="fixed bottom-16 left-20 z-20 text-3xl"
      variants={bottomBtnVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {children}
    </motion.div>
  );
};

export const BottomRightBtn = ({
  children,
}: PropsWithChildren<{
  solid?: boolean;
}>) => {
  return (
    <motion.div
      className="fixed bottom-16 right-20 z-10 text-3xl"
      variants={bottomBtnVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {children}
    </motion.div>
  );
};
