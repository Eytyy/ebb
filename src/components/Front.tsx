import React from "react";
import { motion, type Variants } from "framer-motion";

import SignIn from "./SignIn";

import type { BuiltInProviderType } from "next-auth/providers";
import type { ClientSafeProvider, LiteralUnion } from "next-auth/react";

const variants: Variants = {
  initial: {},
  animate: {
    transition: { staggerChildren: 0.5 },
  },
};

const titleVariants = {
  initial: { opacity: 0, y: -20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

const textVariants = {
  initial: { opacity: 0, y: -20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
    },
  },
};

type Props = {
  providers:
    | Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider>
    | never[];
};

export default function FrontDisplay({ providers }: Props) {
  return (
    <motion.div
      className="space-y-6"
      variants={variants}
      initial="initial"
      animate="animate"
    >
      <motion.h1 className="text-3xl font-bold" variants={titleVariants}>
        ebb
      </motion.h1>
      <div className="text-[9rem] font-medium leading-[1em]">
        <motion.span className="block" variants={textVariants}>
          Discover Serenity
        </motion.span>
        <motion.span className="block" variants={textVariants}>
          in Productivity,
        </motion.span>
        <motion.span className="block" variants={textVariants}>
          One Moment
        </motion.span>
        <motion.span className="block" variants={textVariants}>
          at a Time.
        </motion.span>
      </div>
      <SignIn providers={providers} />
    </motion.div>
  );
}
