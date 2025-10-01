import { useLayoutEffect, useState } from "react";

export function useCountdown(endISO?: string) {
  const [timeLeft, setTimeLeft] = useState(0);

  useLayoutEffect(() => {
    if (!endISO) return;

    const endTime = new Date(endISO).getTime();

    const update = () => {
      const now = Date.now();
      const remaining = Math.max(endTime - now, 0);
      setTimeLeft(remaining);
    };

    update(); // сразу выставляем

    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [endISO]);

  const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
    const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");
    const seconds = String(totalSeconds % 60).padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  };

  return {
    timeLeft,
    formatted: formatTime(timeLeft),
  };
}