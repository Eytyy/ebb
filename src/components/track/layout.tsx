import { type PropsWithChildren } from "react";

import TrackNavigation from "./navigation";
import AppHeader from "../appHeader";

export default function TrackLayout({
  children,
  active,
  switchView,
}: PropsWithChildren<{ active: boolean; switchView: () => void }>) {
  return (
    <div className="relative mx-auto">
      {!active && <AppHeader />}
      <main className="px-10">{children}</main>
      {!active && <TrackNavigation switchView={switchView} />}
    </div>
  );
}
