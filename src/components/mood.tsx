export type MoodProps = {
  id: string;
  name: string;
  onClick: (id: string) => void;
};

export default function Mood({ id, name, onClick }: MoodProps) {
  return (
    <button
      onClick={() => onClick(id)}
      className="h-10 w-10 rotate-90 rounded-full bg-white text-black"
    >
      <MoodFace name={name} />
    </button>
  );
}

export function MoodAvatar({ name }: Omit<MoodProps, "onClick">) {
  return (
    <div className="flex h-6 w-6 rotate-90 items-end justify-center rounded-full bg-white text-black">
      <MoodFace name={name} />
    </div>
  );
}

export function MoodFace({ name }: { name: string }) {
  switch (name) {
    case "ok":
      return <>{`:)`}</>;
    case "not-ok":
      return <>{`:(`}</>;
    default:
      return <>{`:`}</>;
  }
}
