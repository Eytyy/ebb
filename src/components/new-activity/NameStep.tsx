import useFormInputFocus from "~/hooks/useFormInputFocus";

import type { ChangeEvent } from "react";
import Label from "./Label";
import StepWrapper from "./StepWrapper";
import InputWrapper from "./InputWrapper";

type Props = {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export default function NameStep({ value, onChange }: Props) {
  const { ref } = useFormInputFocus();

  return (
    <StepWrapper>
      <Label id="name">
        What is the name of the activity you want to track
      </Label>
      <InputWrapper>
        <input
          ref={ref}
          id="name"
          onChange={onChange}
          className="bg-transparent outline-none "
          type="text"
          value={value}
          name="name"
        />
      </InputWrapper>
    </StepWrapper>
  );
}
