import Link from "next/link";
import React from "react";

export default function Header() {
  return (
    <header>
      <nav className="flex gap-10">
        <Link className="text-white" href="/">
          home
        </Link>
        <Link className="text-white" href="/track">
          track
        </Link>
        <Link className="text-white" href="/welcome">
          welcome
        </Link>
        <Link className="text-white" href="/tracks">
          tracks
        </Link>
      </nav>
    </header>
  );
}
