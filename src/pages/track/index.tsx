import { useSession } from "next-auth/react";
import { useCallback, useReducer } from "react";

import { requireAuth } from "~/requireAuth";
import { api } from "~/utils/api";

import { initialState, reducer } from "~/store/time";

import TrackLayout from "~/components/track/layout";
import type { DistractionProps } from "~/components/time/distractionView";
import TimeWidget from "~/components/time/widget";
import TimeList from "~/components/time/list";
import Submitting from "~/components/time/submitting";

export default function TimePage() {
  const { data: user } = useSession();
  const [state, dispatch] = useReducer(reducer, initialState);

  // fetch timeLogTypes
  const { data: types } = api.tracks.getTimeLogType.useQuery();
  // fetch moods
  const { data: moods } = api.tracks.getMoods.useQuery();
  // createTimeLog mutation
  const createTimeLog = api.tracks.createTimeLog.useMutation({
    onMutate: () => {
      dispatch({ type: "SET_SUBMIT" });
    },
    onSuccess: () => {
      dispatch({ type: "RESET" });
    },
  });
  // set timer start date
  const onStart = useCallback(
    () => dispatch({ type: "SET_START", payload: new Date() }),
    []
  );

  // set timer end date
  const onEnd = useCallback(
    () => dispatch({ type: "SET_END", payload: new Date() }),
    []
  );

  const onCancel = useCallback(() => {
    dispatch({ type: "RESET" });
  }, []);

  const addDistraction = useCallback((props: DistractionProps) => {
    dispatch({ type: "ADD_DISTRACTION", payload: props });
  }, []);

  // create timeLog
  const submit = useCallback(
    ({ description, moodId }: { description?: string; moodId: string }) => {
      const { start, end, distractions } = state.timer;

      if (!start || !end || !types || !types[0]) return void 0;

      createTimeLog.mutate({
        description: description || "",
        start,
        end,
        moodId,
        timeLogTypeId: types[0]?.id,
        distractions: distractions || [],
      });
    },
    [createTimeLog, state, types]
  );

  const switchView = useCallback(() => {
    dispatch({ type: "SWITCH_VIEW" });
  }, []);

  if (!user) return null;

  const { view, submitting } = state;
  if (submitting) {
    return <Submitting />;
  }
  return (
    <TrackLayout active={state.active} switchView={switchView}>
      {view === "widget" && (
        <div className="flex h-[calc(100vh-120px-64px)] flex-col items-center justify-center">
          <TimeWidget
            active={state.active}
            moods={moods}
            onEnd={onEnd}
            onStart={onStart}
            onCancel={onCancel}
            onSubmit={submit}
            addDistraction={addDistraction}
          />
        </div>
      )}
      {view === "list" && <TimeList />}
    </TrackLayout>
  );
}

export const getServerSideProps = requireAuth(async () => {
  return Promise.resolve({ props: {} });
});
