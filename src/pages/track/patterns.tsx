import TrackLayout from "~/components/track/layout";
import { requireAuth } from "~/requireAuth";

export default function PatternsPage() {
  return <TrackLayout>Patterns</TrackLayout>;
}

export const getServerSideProps = requireAuth(async () => {
  return Promise.resolve({ props: {} });
});
