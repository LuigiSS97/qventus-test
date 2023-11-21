import { useEffect, useState } from "react";

type CallbackFunction = (...args: any[]) => void;

function useDebouncedCallback<T extends CallbackFunction>(
  callback: T,
  timeout: number
): T {
  const [debouncedCallback, setDebouncedCallback] = useState<CallbackFunction>(
    () => () => {}
  );

  useEffect(() => {
    const timer = setTimeout(debouncedCallback, timeout);

    return () => clearTimeout(timer);
  }, [debouncedCallback, timeout]);

  const debounced = (...args: Parameters<T>) => {
    setDebouncedCallback(() => () => {
      callback(...args);
    });
  };

  return debounced as unknown as T;
}

export default useDebouncedCallback;
