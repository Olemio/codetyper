export default function Stop({
  cleanedText,
  isWrongKey,
  charNum,
}: {
  cleanedText: string;
  isWrongKey: boolean;
  charNum: number;
}) {
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
