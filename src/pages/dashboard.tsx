import React from "react";

import { requireAuth } from "~/requireAuth";
import { api } from "~/utils/api";

import DashboardNav from "~/components/nav/DashboardNav";
import Timer from "~/components/timer";
import ActivitiesList from "~/components/ActivitiesList";
import OnboardScreen from "~/components/OnboardScreen";
import OnboardingNav from "~/components/nav/OnboardingNav";
import LoadingScreen from "~/components/LoadingScreen";
import { useApp } from "~/context/app";

export default function Dashboard() {
  const {
    state: { view, activeSession: timerSession },
    dispatch,
  } = useApp();

  // get all activities
  const { data: activities, isLoading } = api.activity.getAll.useQuery(
    undefined,
    {
      onSuccess(data) {
        if (activities && activities.length == 0) {
          dispatch({ type: "SET_VIEW", payload: "onboarding" });
        } else if (data && data.length > 0 && !timerSession) {
          dispatch({ type: "SET_VIEW", payload: "dashboard" });
        }
      },
    }
  );

  // get active session
  api.logs.getActiveSession.useQuery(undefined, {
    onSuccess(data) {
      if (data) {
        dispatch({
          type: "SET_ACTIVE_SESSION",
          payload: data,
        });
      } else if (timerSession) {
        dispatch({ type: "END_SESSION" });
      }
    },
  });

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
      {view === "dashboard" && (
        <>
          <DashboardNav />
          {activities && <ActivitiesList activities={activities} />}
        </>
      )}
      {view === "timerSession" && <Timer />}
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
