import TrackLayout from "~/components/track/layout";
import { requireAuth } from "~/requireAuth";

export default function NotesPage() {
  return <TrackLayout>Notes</TrackLayout>;
}

export const getServerSideProps = requireAuth(async () => {
  return Promise.resolve({ props: {} });
});
