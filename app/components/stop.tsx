import React from "react";

export default function Stop({
  text,
  setStarted,
}: {
  text: string;
  setStarted: (value: boolean) => void;
}) {
  const [charNum, setCharNum] = React.useState(0);
  const [isWrongKey, setIsWrongKey] = React.useState(false);

  const cleanedText = React.useMemo(() => {
    return text.replace(/\s+/g, " ").trim();
  }, [text]);

  const handleKeyDown = React.useCallback(
    (key: string) => {
      if (key === "Backspace") return setCharNum((prev) => prev - 1);
      const nextKey = cleanedText[charNum];

      if (key === nextKey) {
        setCharNum((prev) => prev + 1);
      } else if (key !== "Shift" && key !== "AltGraph" && key !== "Control") {
        setIsWrongKey(true);
        setTimeout(() => setIsWrongKey(false), 250);
        console.log("wrong key", key, "next key was", nextKey);
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
        <p className="text-purpleLight text-xl">Char per minute: 64</p>

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
