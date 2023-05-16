import { useCallback, useEffect, useReducer, useRef } from "react";

import { getFormatedTime } from "~/utils/helpers";
import { initialState, reducer } from "~/store/timer";

import DistractionView, { type DistractionProps } from "./distractionView";
import MainView from "./mainView";
import SubmissionView from "./submissionView";

type TimeWidgetProps = {
  onEnd: () => void;
  onStart: () => void;
  onCancel: () => void;
  onSubmit: ({
    description,
    moodId,
  }: {
    description?: string;
    moodId: string;
  }) => void;
  addDistraction: (d: DistractionProps) => void;
  active: boolean;
  moods?: { id: string; name: string }[];
};

export default function TimeWidget({
  onEnd,
  onStart,
  onSubmit,
  onCancel,
  addDistraction,
  active,
  moods,
}: TimeWidgetProps) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { time, view } = state;

  const worker = useRef<Worker>();

  useEffect(() => {
    // create new web worker instance for the timer
    worker.current = new Worker(
      new URL("../../workers/timer.ts", import.meta.url)
    );
    // update the time, this will be called every second
    worker.current.onmessage = () => {
      dispatch({ type: "UPDATE_TIME" });
    };

    // handle errors
    worker.current.onerror = (event) => {
      if (event instanceof Event) {
        console.log("🍎 Error message received from worker: ", event);
        return event;
      }

      console.log("🍎 Unexpected error: ", event);
      throw event;
    };
    // terminate worker on cleanup
    return () => {
      worker.current?.terminate();
    };
  }, []);

  const switchView = useCallback((view: (typeof initialState)["view"]) => {
    dispatch({ type: "SWITCH_VIEW", payload: view });
  }, []);

  const start = useCallback(() => {
    worker.current?.postMessage({ action: "start" });
    onStart();
  }, [onStart]);

  const end = useCallback(() => {
    worker.current?.postMessage({ action: "stop" });
    onEnd();
    dispatch({ type: "SWITCH_VIEW", payload: "submission" });
  }, [onEnd]);

  const cancel = useCallback(() => {
    worker.current?.postMessage({ action: "stop" });
    onCancel();
    dispatch({ type: "RESET" });
  }, [onCancel]);

  const closeDistraction = useCallback(() => {
    dispatch({
      type: "SWITCH_VIEW",
      payload: view === "distraction" ? "initial" : "distraction",
    });
  }, [view]);

  const add = useCallback(
    ({ description, moodId }: { description?: string; moodId: string }) => {
      onSubmit({ description, moodId });
      switchView("initial");
    },
    [onSubmit, switchView]
  );

  const formatedTime = getFormatedTime(time);
  switch (view) {
    case "distraction":
      return (
        <DistractionView
          moods={moods}
          close={closeDistraction}
          time={formatedTime}
          add={addDistraction}
        />
      );
    case "submission":
      return <SubmissionView moods={moods} onSubmit={add} />;
    default:
      return (
        <MainView
          time={formatedTime}
          active={active}
          switchView={switchView}
          start={start}
          stop={end}
          cancel={cancel}
        />
      );
  }
}
