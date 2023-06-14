import React from "react";
import LayoutInner from "~/components/LayoutInner";
import ActivityNav from "~/components/nav/ActivityNav";
import LogItem from "~/components/timer/LogItem";
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

  return (
    <>
      <ActivityNav title={activity.name} />
      <main className={`mx-auto h-full max-w-5xl space-y-4 px-24`}>
        {activity.timeLogs.map((timeLog) => {
          return <LogItem key={timeLog.id} {...timeLog} />;
        })}
      </main>
    </>
  );
}

export const getServerSideProps = requireAuth(async (ctx) => {
  return Promise.resolve({
    props: {
      slug: ctx.query.slug,
    },
  });
});
