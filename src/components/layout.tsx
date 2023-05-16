import React, { type ReactNode } from "react";
import Header from "~/components/header";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto grid min-h-screen grid-rows-[min-content,1fr] p-10">
      <Header />
      <main className="flex flex-col items-center justify-center">
        {children}
      </main>
    </div>
  );
}
