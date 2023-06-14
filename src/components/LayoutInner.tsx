import React, { type PropsWithChildren } from "react";

export default function LayoutInner({ children }: PropsWithChildren) {
  return <div className="relative h-screen p-16">{children}</div>;
}
