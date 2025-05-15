import React from "react";

export default function Stop({
  text,
  randomize,
  setStarted,
}: {
  text: string;
  randomize: boolean;
  setStarted: (value: boolean) => void;
}) {
  const [charNum, setCharNum] = React.useState(0);
  const [isWrongKey, setIsWrongKey] = React.useState(false);
  const [elapsedTime, setElapsedTime] = React.useState(0);
  const [startTime, setStartTime] = React.useState<number | null>(null);

  React.useEffect(() => {
    const start = Date.now();
    setStartTime(start);

    const interval = setInterval(() => {
      setElapsedTime((Date.now() - start) / 1000);
    }, 250);

    return () => clearInterval(interval);
  }, []);

  const cps = elapsedTime > 0 ? (charNum / elapsedTime).toFixed(2) : "0.00";

  const shuffle = (arr: string[]) => {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };

  const cleanedText = React.useMemo(() => {
    const words = text.trim().split(/\s+/);
    const finalWords = randomize ? shuffle(words) : words;
    return finalWords.join(" ");
  }, [text, randomize]);

  const handleKeyDown = React.useCallback(
    (key: string) => {
      if (key === "Backspace") return setCharNum((prev) => prev - 1);
      const nextKey = cleanedText[charNum];

      if (key === nextKey) {
        setCharNum((prev) => prev + 1);
      } else if (key !== "Shift" && key !== "AltGraph" && key !== "Control") {
        setIsWrongKey(true);
        setTimeout(() => setIsWrongKey(false), 250);
      }
    },
    [cleanedText, charNum]
  );

  React.useEffect(() => {
    const listener = (e: KeyboardEvent) => handleKeyDown(e.key);
    document.addEventListener("keydown", listener);
    return () => document.removeEventListener("keydown", listener);
  }, [handleKeyDown]);

  return (
    <>
      <div className="flex justify-between w-full px-8">
        <p className="text-purpleLight text-xl">Char per second: {cps}</p>

        <div className="flex items-center gap-4">
          <button
            className="ml-4 text-2xl text-redMedium"
            onClick={() => setStarted(false)}
          >
            Stop
          </button>
        </div>
      </div>
      <div className="px-16 py-4 h-full w-full rounded-sm text-xl font-mono bg-purpleDark text-white">
        <span className="text-gray-500">{cleanedText.slice(0, charNum)}</span>
        <span
          className={`mx-[-5.5px] ${
            isWrongKey ? "text-red-500" : "animate-pulse text-white"
          }`}
        >
          |
        </span>
        <span className="text-gray-200">{cleanedText.slice(charNum)}</span>
      </div>
    </>
  );
}
