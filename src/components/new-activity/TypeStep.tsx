import { type ChangeEvent } from "react";

const types = ["timer", "count"];

type Props = {
  activityName: string;
  value: "timer" | "count";
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export default function TypeStep({ activityName, value, onChange }: Props) {
  return (
    <div className="text-8xl">
      <label htmlFor="">how would you like to track {activityName}?</label>
      <div className="flex flex-wrap gap-4">
        {types.map((type) => (
          <div key={type}>
            <label htmlFor={type}>{type}</label>
            <input
              checked={type === value}
              type="radio"
              name="type"
              id={type}
              value={type}
              onChange={onChange}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
