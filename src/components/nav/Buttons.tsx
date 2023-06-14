import clsx from "clsx";
import { type PropsWithChildren } from "react";

const Btn = ({
  children,
  className,
}: PropsWithChildren<{
  className?: string;
}>) => {
  return <div className={clsx("fixed text-3xl", className)}>{children}</div>;
};

export const BottomLeftBtn = ({
  children,
}: PropsWithChildren<{
  solid?: boolean;
}>) => {
  return <Btn className="bottom-16 left-20">{children}</Btn>;
};

export const BottomRightBtn = ({
  children,
}: PropsWithChildren<{
  solid?: boolean;
}>) => {
  return <Btn className="bottom-16 right-20">{children}</Btn>;
};

export const TopLeftBtn = ({ children }: PropsWithChildren) => {
  return <Btn className="left-20 top-16 text-white">{children}</Btn>;
};

export const TopRightBtn = ({ children }: PropsWithChildren) => {
  return <Btn className="right-20 top-16 text-white">{children}</Btn>;
};
