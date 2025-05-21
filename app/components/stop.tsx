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
    <div className="px-12 py-6 h-full w-full rounded-sm text-xl font-mono bg-purpleDark">
      <span className="text-gray-500">{cleanedText.slice(0, charNum)}</span>
      <span
        className={`mx-[-5.5px] ${
          isWrongKey ? "text-redMedium" : "animate-pulse" // idee om cursor blink fra chat gpt. animate-pulse fra chat gpt
        }`}
      >
        |
      </span>
      <span className="text-gray-300">{cleanedText.slice(charNum)}</span>
    </div>
  );
}
