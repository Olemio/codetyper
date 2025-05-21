import React from "react";

// Koden her er for det meste skrevet av meg. Jeg vet ikke hvordan man lager en god custom hook, så jeg har brukt chat gpt til å flytte denne logikken ut fra mine vanlige komponenter. Dette er det største bidraget derifra i prosjektet
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
    }, 100);

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
    Number(elapsedTime > 0 ? (charNum / 5 / (elapsedTime / 60)).toFixed(0) : 0.00);


  const reset = () => {
    setCharNum(0)
    setElapsedTime(0)
    setMisClicks(0)
  }
  return {
    charNum,
    setCharNum,
    isWrongKey,
    elapsedTime,
    wpm,
    misClicks,
    reset,
  };
}