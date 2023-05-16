import type { ReactNode } from "react";
import type { View } from "~/pages/track";

export default function TrackOptionsView({
  switchTrack,
}: {
  switchTrack: (view: View) => void;
}) {
  return (
    <div className="flex flex-col gap-2">
      <Btn onClick={() => switchTrack("default")}>x</Btn>
      <div>what?</div>
      <Btn onClick={() => switchTrack("time")}>time</Btn>
      <Btn onClick={() => switchTrack("note")}>note</Btn>
    </div>
  );
}

function Btn({
  children,
  onClick,
}: {
  children: ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      className="bg-black px-4 py-2 text-lg capitalize text-white"
      onClick={onClick}
    >
      {children}
    </button>
  );
}
