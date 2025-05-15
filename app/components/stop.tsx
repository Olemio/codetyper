import React from "react";

export default function Stop({
  text,
  randomize,
}: {
  text: string;
  randomize: boolean;
}) {
  const [charNum, setCharNum] = React.useState(0);
  const [isWrongKey, setIsWrongKey] = React.useState(false);

  const shuffle = (words: string[]) => {
    return words.sort(() => Math.random() - 0.5);
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
  );
}
