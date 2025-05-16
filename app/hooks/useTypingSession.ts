import React from "react";

export default function useTypingSession(cleanedText: string, active: boolean, paused: boolean) {
  const [charNum, setCharNum] = React.useState(0);
  const [isWrongKey, setIsWrongKey] = React.useState(false);
  const [elapsedTime, setElapsedTime] = React.useState(0);
  const [misClicks, setMisClicks] = React.useState(0)

  React.useEffect(() => {
    if (!active || paused) return;

    const start = Date.now();

    const interval = setInterval(() => {
      setElapsedTime((Date.now() - start) / 1000);
    }, 250);

    return () => clearInterval(interval);
  }, [active, paused]);

  React.useEffect(() => {
    if (!active || paused) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key;
      const next = cleanedText[charNum];

      if (key === "Backspace") {
        setCharNum((prev) => Math.max(prev - 1, 0));
      } else if (key === next) {
        setCharNum((prev) => prev + 1);
      } else if (!["Shift", "AltGraph", "Control"].includes(key)) {
        setMisClicks(prev => prev + 1)
        setIsWrongKey(true);
        setTimeout(() => setIsWrongKey(false), 250);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [active, charNum, cleanedText, paused]);

  const wpm =
    elapsedTime > 0 ? (charNum / 5 / (elapsedTime / 60)).toFixed(2) : "0.00";

  return {
    charNum,
    setCharNum,
    isWrongKey,
    elapsedTime,
    wpm,
    misClicks,
  };
}