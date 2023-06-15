import { useEffect, useRef } from "react";

export default function useFormInputFocus() {
  const ref = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    ref.current.focus();
  });

  return {
    ref,
  };
}
