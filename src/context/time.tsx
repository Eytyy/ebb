import { type PropsWithChildren, createContext, useContext } from "react";

const TimeContext = createContext<TimeContextProps | null>(null);

type TimeContextProps = { [key: string]: string } | null;

export default function TimeContextProvider({ children }: PropsWithChildren) {
  return <TimeContext.Provider value={{}}>{children}</TimeContext.Provider>;
}

export function useTimeContext() {
  const context = useContext(TimeContext);
  if (context === null) {
    throw new Error("useTimeContext must be used withing a TimeContext");
  }
  return context;
}
