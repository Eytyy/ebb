import { useCallback, useEffect, useReducer, useRef } from "react";

import { initialState, reducer } from "~/store/timer";
import { type RouterOutputs, api } from "~/utils/api";
import { getFormatedTime } from "~/utils/helpers";

import TimerNav from "../nav/TimerNav";
import Submitting from "./submitting";
import DistractionNav from "../nav/DistractionNav";
import ViewSubmission from "./ViewSubmission";
import ViewMain from "./ViewMain";
import ViewDistraction, { type DistractionProps } from "./ViewDistraction";

type Props = {
  activity: RouterOutputs["activity"]["getAll"][0];
  onCancel: () => void;
  reset: () => void;
};

export default function Timer({ activity, onCancel, reset }: Props) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { data: moods } = api.mood.getAll.useQuery();

  const { mutate, isLoading: isSubmitting } =
    api.tracks.createTimeLog.useMutation({
      onSuccess: () => reset(),
    });

  // using web workers to handle the timer
  const worker = useRef<Worker>();

  // start timer on mount and stop on unmount (cleanup)
  useEffect(() => {
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
    worker.current.postMessage({ action: "start" });
    dispatch({
      type: "SET_START",
      payload: new Date(),
    });

    return () => {
      // terminate worker on cleanup
      worker.current?.terminate();
    };
  }, []);

  // handle timer session completion
  const onDone = useCallback(() => {
    worker.current?.postMessage({ action: "stop" });
    dispatch({ type: "SET_END", payload: new Date() });
  }, []);

  const addDistraction = useCallback((props: DistractionProps) => {
    dispatch({ type: "ADD_DISTRACTION", payload: props });
  }, []);

  const { time, view } = state;

  const closeDistraction = useCallback(() => {
    dispatch({
      type: "SWITCH_VIEW",
      payload: view === "distraction" ? "default" : "distraction",
    });
  }, [view]);

  const submit = useCallback(
    ({ description, moodId }: { description?: string; moodId: string }) => {
      const { start, end, distractions } = state;

      if (!start || !end || !activity) return void 0;

      mutate({
        activityId: activity.id,
        description: description || "",
        start,
        end,
        moodId,
        distractions: distractions || [],
      });
    },
    [state, mutate, activity]
  );

  if (isSubmitting) {
    return <Submitting />;
  }

  const formattedTime = getFormatedTime(time);

  return (
    <>
      {view === "default" && (
        <>
          <TimerNav title={activity.name} onDone={onDone} onCancel={onCancel} />
          <ViewMain time={formattedTime} />
        </>
      )}
      {view === "distraction" && (
        <>
          <DistractionNav />
          {moods && (
            <ViewDistraction
              moods={moods}
              time={formattedTime}
              add={addDistraction}
              close={closeDistraction}
            />
          )}
        </>
      )}
      {view === "submission" && (
        <>
          <ViewSubmission
            title={activity.name}
            moods={moods}
            onSubmit={submit}
          />
        </>
      )}
    </>
  );
}
