import { useMemo } from "react";

const useThrottle = <T extends any[]>(
  callback: (...args: T) => void,
  delay: number
) => {
  return useMemo(() => {
    let timerId: NodeJS.Timeout | null;
    return (...args: T) => {
      if (!timerId) {
        timerId = setTimeout(() => {
          callback(...args);
          timerId = null;
        }, delay);
      }
    };
  }, [callback, delay]);
};

export default useThrottle;
