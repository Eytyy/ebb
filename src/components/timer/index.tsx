import { useCallback, useEffect, useReducer, useRef } from "react";

import { initialState, reducer } from "~/store/timer";
import { api } from "~/utils/api";
import { getFormatedTime } from "~/utils/helpers";

import TimerNav from "../nav/TimerNav";
import ViewSubmission from "./ViewSubmission";
import ViewMain from "./ViewMain";
import ViewDistraction, { type NoteProps } from "./ViewDistraction";
import { useApp } from "~/context/app";
import { AnimatePresence } from "framer-motion";
import LoadingScreen from "../LoadingScreen";

/**
 * get start time from the active session and set the timer to the difference between the start time and now
 * if the timer is stopped, set the timer to 0, and update the session with the end time
 * if the timer is canceled or the user navigates away from the timer, set the timer to 0, delete the session, and set session to null
 */

function calculateTime(start?: Date) {
  const now = new Date();
  const difference = start ? now.getTime() - start.getTime() : 0;
  const differenceInMins = Math.round(difference / 1000);
  return differenceInMins;
}

export default function Timer() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { state: appState, dispatch: appDispatch } = useApp();
  const { data: moods } = api.mood.getAll.useQuery();

  const { activeSession } = appState;
  const { end, distractions, notes } = state;

  const {
    mutate: updateSession,
    isLoading: isSubmitting,
    isError,
  } = api.logs.update.useMutation({
    onSuccess: () => {
      appDispatch({ type: "END_SESSION" });
    },
  });
  const { mutate: deleteSession } = api.logs.delete.useMutation();

  // using web workers to handle the timer
  const worker = useRef<Worker>();
  // start timer on mount and stop on unmount (cleanup)
  useEffect(() => {
    const timerValue = calculateTime(appState.activeSession?.start);
    // create new web worker instance for the timer
    worker.current = new Worker(
      new URL("../../workers/timer.ts", import.meta.url)
    );
    // update the time, this will be called every second
    worker.current.onmessage = () => dispatch({ type: "UPDATE_TIME" });

    // handle errors
    worker.current.onerror = (event) => {
      if (event instanceof Event) {
        console.log("🍎 Error message received from worker: ", event);
        return event;
      }

      console.log("🍎 Unexpected error: ", event);
      throw event;
    };

    // start timer
    dispatch({
      type: "START_TIMER",
      payload: timerValue,
    });

    worker.current.postMessage({ action: "start" });

    return () => {
      // terminate worker on cleanup
      worker.current?.terminate();
    };
  }, [appDispatch, dispatch, appState]);

  // handle timer session completion
  const onDone = useCallback(() => {
    worker.current?.postMessage({ action: "stop" });
    dispatch({ type: "STOP_TIMER", payload: new Date() });
  }, []);

  const addNote = useCallback(
    (
      props: NoteProps & {
        type: "distraction" | "note";
      }
    ) => {
      dispatch({ type: "ADD_NOTE", payload: props });
    },
    []
  );

  const onCancel = useCallback(() => {
    const activeSession = appState.activeSession;
    if (!activeSession || !activeSession.id) return void 0;
    worker.current?.postMessage({ action: "stop" });
    deleteSession({
      id: activeSession.id,
    });
    appDispatch({ type: "END_SESSION" });
  }, [appDispatch, appState, deleteSession]);

  const { time, view } = state;

  const closeDistraction = useCallback(() => {
    dispatch({
      type: "SWITCH_VIEW",
      payload: view === "distraction" ? "default" : "distraction",
    });
  }, [view]);

  const submit = useCallback(
    ({ description, moodId }: { description?: string; moodId: string }) => {
      if (!activeSession || !activeSession.id || !end) return void 0;
      updateSession({
        id: activeSession.id,
        end,
        description: description || "",
        moodId,
        distractions,
        notes,
      });
    },
    [activeSession, end, distractions, notes, updateSession]
  );

  if (isSubmitting) {
    return <LoadingScreen message="Saving" />;
  }

  if (!activeSession) return null;

  const { activity } = activeSession;
  const formattedTime = getFormatedTime(time);

  return (
    <AnimatePresence mode="wait">
      {view === "default" && (
        <div className="h-full" key="timer-main">
          <TimerNav
            title={activeSession.activity.name}
            onDone={onDone}
            onCancel={onCancel}
            time={formattedTime}
          />
          <ViewMain
            time={formattedTime}
            openDistraction={() =>
              dispatch({
                type: "SWITCH_VIEW",
                payload: "distraction",
              })
            }
          />
        </div>
      )}
      {view === "distraction" && (
        <div className="h-full" key="timer-distraction">
          {moods && (
            <ViewDistraction
              moods={moods}
              time={formattedTime}
              add={addNote}
              close={closeDistraction}
            />
          )}
        </div>
      )}
      {view === "submission" && (
        <div className="h-full" key="timer-submission">
          <ViewSubmission
            title={activity.name}
            category={activity.category.name}
            moods={moods}
            onSubmit={submit}
            onCancel={onCancel}
            time={formattedTime}
            onError={isError}
          />
        </div>
      )}
    </AnimatePresence>
  );
}
