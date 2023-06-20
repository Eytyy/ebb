import React from "react";
import TimerActivity from "~/components/activity/TimerActivity";
import { requireAuth } from "~/requireAuth";
import { api } from "~/utils/api";

type Props = {
  slug: string;
};

export default function Activity({ slug }: Props) {
  const { data: activity } = api.activity.getById.useQuery({
    id: slug,
  });

  if (!activity) {
    return null;
  }

  switch (activity.tracker) {
    case "timer":
      return <TimerActivity activity={activity} />;
    default:
      return <div> no suitable activity </div>;
  }
}

export const getServerSideProps = requireAuth(async (ctx) => {
  return Promise.resolve({
    props: {
      slug: ctx.query.slug,
    },
  });
});
