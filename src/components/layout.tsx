import React, { useState, type PropsWithChildren } from "react";
import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/react";
import type { Session } from "next-auth";
import { type Variants, motion } from "framer-motion";

export default function AppLayout({ children }: PropsWithChildren) {
  return <div className="relative h-screen p-16">{children}</div>;
}

function Header({ pageTitle }: { pageTitle: string }) {
  const { data: sessionData } = useSession();

  return (
    <header className="sticky top-10 z-20 flex justify-between">
      <h1 className="font-bold">{pageTitle}</h1>
      {sessionData ? <Settings {...sessionData.user} /> : <LoginMenu />}
    </header>
  );
}

const nav_variants: Variants = {
  hidden: {
    translateY: "-100vh",
  },
  visible: {
    translateY: "0vh",
  },
};

function Settings(props: Session["user"]) {
  const [visible, setVisible] = useState(false);

  function toggle() {
    setVisible((visible) => !visible);
  }

  return (
    <>
      <div className="flex items-center justify-between">
        {props.image && props.name && (
          <button onClick={toggle} className="z-30">
            <Image
              className="rounded-full"
              src={props.image}
              alt={props.name}
              width={32}
              height={32}
            />
          </button>
        )}
      </div>
      <motion.nav
        className="fixed left-0 top-0 z-20 h-full w-full bg-black p-10 text-2xl"
        variants={nav_variants}
        animate={visible ? "visible" : "hidden"}
        initial={{ translateY: "-100vh" }}
      >
        <button onClick={() => void signOut()}>logout</button>
      </motion.nav>
    </>
  );
}

function LoginMenu() {
  return (
    <div>
      <button onClick={() => void signIn()}>login</button>
    </div>
  );
}
