import { useState, useRef, useEffect } from "react";

export const useDebounce = ({
  value,
  delay = 500,
}: {
  value: string;
  delay: number;
}) => {
  const [debounceValue, setDebounceValue] = useState("");
  const timerRef = useRef<ReturnType<typeof setInterval> | null>();

  useEffect(() => {
    timerRef.current = setTimeout(() => setDebounceValue(value), delay);
    return () => {
      clearTimeout(timerRef.current as NodeJS.Timeout);
    };
  }, [value, delay]);

  return debounceValue;
};
