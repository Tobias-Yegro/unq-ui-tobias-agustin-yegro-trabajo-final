import { useState, useCallback } from "react";

export function useTransition(defaultDuration = 400) {
  const [transitioning, setTransitioning] = useState(false);

  const startTransition = useCallback(
    (callback, customDuration) => {
      const duration = customDuration ?? defaultDuration;

      setTransitioning(true);

      setTimeout(() => {
        callback?.();

        setTimeout(() => {
          setTransitioning(false);
        }, duration);
      }, duration);
    },
    [defaultDuration]
  );

  return {
    transitioning,
    startTransition,
  };
}
