import { type PropsWithChildren } from "react";

export default function BigText({ children }: PropsWithChildren) {
  return <div className="text-4xl font-bold">{children}</div>;
}
