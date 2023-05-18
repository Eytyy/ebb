import { api, type RouterOutputs } from "~/utils/api";
import { MoodAvatar } from "../mood";

type TimeLog = RouterOutputs["tracks"]["getTimeLogsByDay"][number];

export default function TimeList() {
  const { data } = api.tracks.getTimeLogsByDay.useQuery();
  console.log(data);
  return (
    <div className="w-full">
      {!data || data.length === 0 ? (
        <div>empty</div>
      ) : (
        <div className="w-full space-y-8">
          {data.map((log) => {
            return <LogsGroup key={log.day} {...log} />;
          })}
        </div>
      )}
    </div>
  );
}

function LogsGroup({ logs, day, total_duration }: TimeLog) {
  return (
    <div>
      <div className="flex justify-between">
        <div className="mb-2 block font-medium">{day}</div>
        <span>{total_duration}</span>
      </div>
      <div className="space-y-4">
        {logs.map((log) => (
          <Log key={log.id} {...log} />
        ))}
      </div>
    </div>
  );
}

function Log({
  id,
  description,
  duration,
  mood,
  distractions,
}: TimeLog["logs"][number]) {
  return (
    <div key={id} className="space-y-4 rounded-lg bg-[#222] p-4">
      <div className="flex justify-between ">
        {description ? (
          <h2>{description}</h2>
        ) : (
          <button>+ add description</button>
        )}
        <div>{duration}</div>
      </div>
      <div className="flex items-center justify-between">
        <MoodAvatar {...mood} />
      </div>
    </div>
  );
}

function LogDetails({ start, end }: TimeLog) {
  const start_time = new Date(start).toLocaleTimeString();
  const end_time = new Date(end).toLocaleTimeString();
  return (
    <div>
      <time dateTime={start_time}>{start_time}</time>
      <time dateTime={end_time}>{end_time}</time>
    </div>
  );
}
