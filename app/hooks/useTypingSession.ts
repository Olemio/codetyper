import { useEffect, useState } from "react";

export default function useTypingSession(cleanedText: string, active: boolean) {
  const [charNum, setCharNum] = useState(0);
  const [isWrongKey, setIsWrongKey] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    if (!active) return;

    const start = Date.now();

    const interval = setInterval(() => {
      setElapsedTime((Date.now() - start) / 1000);
    }, 250);

    return () => clearInterval(interval);
  }, [active]);

  useEffect(() => {
    if (!active) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key;
      const next = cleanedText[charNum];

      if (key === "Backspace") {
        setCharNum((prev) => Math.max(prev - 1, 0));
      } else if (key === next) {
        setCharNum((prev) => prev + 1);
      } else if (!["Shift", "AltGraph", "Control"].includes(key)) {
        setIsWrongKey(true);
        setTimeout(() => setIsWrongKey(false), 250);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [active, charNum, cleanedText]);

  const wpm =
    elapsedTime > 0 ? (charNum / 5 / (elapsedTime / 60)).toFixed(2) : "0.00";

  return {
    charNum,
    setCharNum,
    isWrongKey,
    elapsedTime,
    wpm,
  };
}