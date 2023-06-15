import { type ChangeEvent } from "react";
import useFormInputFocus from "~/hooks/useFormInputFocus";
import useSuggestions from "~/hooks/useSuggestions";
import Label from "./Label";
import StepWrapper from "./StepWrapper";
import InputWrapper from "./InputWrapper";

type Props = {
  activityName: string;
  value: string;
  categories?: { name: string; id: string }[];
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  update: (value: string) => void;
};

export default function CategoryStep({
  activityName,
  value,
  categories,
  onChange,
  update,
}: Props) {
  const { accept, notAvail, suggestions } = useSuggestions({
    data: categories,
    property: "name",
    value,
  });

  const { ref } = useFormInputFocus();

  const onClickSuggestion = (category: string) => {
    update(category);
    accept();
  };

  return (
    <>
      <StepWrapper>
        <Label id="category">
          What is the name of the category you want to use for {activityName}
        </Label>
        <InputWrapper>
          <input
            id="category"
            ref={ref}
            value={value}
            onChange={onChange}
            className="border-b-2 bg-transparent outline-none"
            type="text"
            name="category"
          />
        </InputWrapper>

        {notAvail && (
          <p className="text-lg font-normal">
            <span className="font-bold">[ {value} ]</span>
            {` is not a category yet, but we'll create it automatically for you.`}
          </p>
        )}
        {suggestions && suggestions?.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-4 text-3xl">
            {suggestions?.map((category) => (
              <button
                role="button"
                key={category.id}
                onClick={() => {
                  onClickSuggestion(category.name);
                }}
                className="cursor-pointer rounded-md border-2 border-gray-700 p-2 hover:bg-gray-700"
              >
                {category.name}
              </button>
            ))}
          </div>
        )}
      </StepWrapper>
    </>
  );
}
