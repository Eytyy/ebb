import React from "react";
import { requireAuth } from "~/requireAuth";
import { api } from "~/utils/api";

export default function Tracks() {
  const { data } = api.tracks.getAll.useQuery(undefined, {
    staleTime: Infinity,
  });
  return (
    <div>
      {data?.map((track) => (
        <div key={track.id}>
          <div>{track.start.toString()}</div>
          <div>{track.end.toString()}</div>
        </div>
      ))}
    </div>
  );
}

export const getServerSideProps = requireAuth(async () => {
  return Promise.resolve({ props: {} });
});
