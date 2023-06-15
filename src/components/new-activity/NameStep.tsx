import useFormInputFocus from "~/hooks/useFormInputFocus";

import type { ChangeEvent } from "react";

type Props = {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export default function NameStep({ value, onChange }: Props) {
  const { ref } = useFormInputFocus();

  return (
    <div className="text-8xl">
      <label htmlFor="name" className="mr-4">
        What is the name of the activity you want to track
      </label>
      <input
        ref={ref}
        id="name"
        onChange={onChange}
        className="bg-transparent outline-none "
        type="text"
        value={value}
      />
    </div>
  );
}
