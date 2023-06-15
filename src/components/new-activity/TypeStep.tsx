import { type ChangeEvent } from "react";
import StepWrapper from "./StepWrapper";
import Label from "./Label";
import InputWrapper from "./InputWrapper";

const types = ["timer", "count"];

type Props = {
  activityName: string;
  value: "timer" | "count";
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export default function TypeStep({ activityName, value, onChange }: Props) {
  return (
    <StepWrapper>
      <Label id="type">how would you like to track {activityName}?</Label>
      <InputWrapper>
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
      </InputWrapper>
    </StepWrapper>
  );
}
