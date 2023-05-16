import { signIn } from "next-auth/react";
import React from "react";

export default function Login() {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <button
        className="rounded-full bg-black/10 px-10 py-3 font-semibold no-underline transition hover:bg-black/20"
        onClick={() =>
          void signIn(undefined, {
            callbackUrl: "http://localhost:3000/tracks",
          })
        }
      >
        Sign in
      </button>
    </div>
  );
}
