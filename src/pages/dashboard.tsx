import React, { useEffect } from "react";

import { requireAuth } from "~/requireAuth";
import { type RouterOutputs, api } from "~/utils/api";

import DashboardNav from "~/components/nav/DashboardNav";
import Timer from "~/components/timer";
import ActivitiesList from "~/components/ActivitiesList";
import OnboardScreen from "~/components/OnboardScreen";
import OnboardingNav from "~/components/nav/OnboardingNav";
import LoadingScreen from "~/components/LoadingScreen";

export type DashboardViews = "list" | "timer" | "new" | "onboarding";

type InitialState = {
  view: DashboardViews;
  selectedActivity: RouterOutputs["activity"]["getAll"][0] | null;
};

type ViewAction = {
  type: "SET_VIEW";
  payload: DashboardViews;
};

type StartTimerAction = {
  type: "START_TIMER";
  payload: RouterOutputs["activity"]["getAll"][0];
};

type Actions = ViewAction | StartTimerAction;

const initialState: InitialState = {
  view: "list",
  selectedActivity: null,
};

const reducer = (state: InitialState = initialState, action: Actions) => {
  switch (action.type) {
    case "SET_VIEW": {
      return {
        ...state,
        view: action.payload,
      };
    }
    case "START_TIMER": {
      return {
        ...state,
        selectedActivity: action.payload,
        view: "timer" as DashboardViews,
      };
    }
    default: {
      return state;
    }
  }
};

export default function Dashboard() {
  const { data: activities, isLoading } = api.activity.getAll.useQuery();
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const { view, selectedActivity } = state;

  const startTimer = React.useCallback(
    (activity: RouterOutputs["activity"]["getAll"][0]) => {
      dispatch({
        type: "START_TIMER",
        payload: activity,
      });
    },
    []
  );

  useEffect(() => {
    if (activities && activities.length == 0) {
      dispatch({
        type: "SET_VIEW",
        payload: "onboarding",
      });
    } else if (activities && activities.length > 0) {
      dispatch({
        type: "SET_VIEW",
        payload: "list",
      });
    }
  }, [activities]);

  if (isLoading) {
    return <LoadingScreen message="Loading Activities" />;
  }

  return (
    <>
      {view === "onboarding" && (
        <>
          <OnboardingNav />
          <OnboardScreen />
        </>
      )}
      {view === "list" && (
        <>
          <DashboardNav />
          {activities && (
            <ActivitiesList activities={activities} startTimer={startTimer} />
          )}
        </>
      )}
      {view === "timer" && selectedActivity && (
        <Timer
          activity={selectedActivity}
          onCancel={() =>
            dispatch({
              type: "SET_VIEW",
              payload: "list",
            })
          }
          reset={() =>
            dispatch({
              type: "SET_VIEW",
              payload: "list",
            })
          }
        />
      )}
    </>
  );
}

export const getServerSideProps = requireAuth(async () => {
  return Promise.resolve({
    props: {
      title: "dashboard",
    },
  });
});
