"use client";

import { useCallback, useEffect, useState } from "react";

export function useCountdown(initialSeconds: number) {
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (!active) return;
    if (secondsLeft <= 0) {
      setTimeout(() => {
        setActive(false);
      }, 300);
      return;
    }

    const id = setInterval(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(id);
  }, [active, secondsLeft]);

  const start = useCallback(() => {
    setSecondsLeft(initialSeconds);
    setActive(true);
  }, [initialSeconds]);

  const reset = useCallback(() => {
    setActive(false);
    setSecondsLeft(initialSeconds);
  }, [initialSeconds]);

  return { secondsLeft, active, start, reset };
}

