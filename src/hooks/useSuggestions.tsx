import React, { useCallback, useEffect } from "react";

type Props<T extends Record<string, string>> = {
  data?: T[];
  property: keyof T;
  value: string;
};

export default function useSuggestions<T extends Record<string, string>>({
  data,
  property,
  value,
}: Props<T>) {
  const [suggestions, setSuggestions] = React.useState<typeof data>([]);
  const [notAvail, setNotAvail] = React.useState(false);

  const suggest = useCallback(
    (value: string) => {
      const suggestions = data?.filter((item) => {
        const lowerCaseVal = value.trim().toLowerCase();
        const lowerCaseProp = item[property]?.toLowerCase();

        return (
          lowerCaseVal !== "" &&
          lowerCaseProp &&
          lowerCaseProp.includes(lowerCaseVal)
        );
      });

      setNotAvail(value !== "" && suggestions?.length === 0);
      // if value is exact match, don't show suggestions
      if (
        suggestions &&
        suggestions?.length === 1 &&
        suggestions[0] &&
        suggestions[0][property] === value
      ) {
        return setSuggestions([]);
      } else {
        setSuggestions(suggestions ?? []);
      }
    },
    [data, property]
  );

  // suggest when the value changes
  useEffect(() => {
    suggest(value);
  }, [value, suggest]);

  // accept the suggestion and clear the suggestions
  const accept = () => {
    setSuggestions([]);
    setNotAvail(false);
  };

  return {
    accept,
    suggestions,
    notAvail,
  };
}
