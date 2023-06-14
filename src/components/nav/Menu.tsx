import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { AnimatePresence, motion, type Variants } from "framer-motion";

import type { Session } from "next-auth";

import React from "react";
import Link from "next/link";

const nav_variants: Variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 1,
      staggerChildren: 0.1,
      when: "afterChildren",
    },
  },
};

export default function Menu() {
  const { data } = useSession();

  const user = data?.user;

  return (
    <motion.div
      className="fixed bottom-16 left-20 right-20 top-16 z-10 grid grid-cols-2 bg-background"
      variants={nav_variants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <div className="flex flex-col gap-4 text-3xl">
        <MenuItem>
          <Link href="/dashboard">Dashboard</Link>
        </MenuItem>
        <MenuItem>
          <Link href="/journal">Journal</Link>
        </MenuItem>
        <MenuItem>
          <Link href="/patterns">Patterns</Link>
        </MenuItem>
        <MenuItem>
          <Link href="/settings">Settings</Link>
        </MenuItem>
      </div>
      {user && <Account user={user} />}
    </motion.div>
  );
}

const item_variants: Variants = {
  initial: {
    opacity: 0,
    y: -20,
  },
  animate: {
    opacity: 1,
    y: 0,
  },
  exit: {
    opacity: 0,
    y: -20,
  },
};

function MenuItem({ children }: { children: React.ReactNode }) {
  return <motion.div variants={item_variants}>{children}</motion.div>;
}

function Account({ user }: { user: Session["user"] }) {
  return (
    <motion.div
      className="space-y-1 self-end justify-self-end"
      variants={item_variants}
    >
      <div className="flex items-center gap-2 font-medium">{user.name}</div>
      <button onClick={() => void signOut()}>logout</button>
    </motion.div>
  );
}
