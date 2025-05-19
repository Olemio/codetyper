export default function StatusStart({
  randomize,
  setRandomize,
  setStarted,
  setText,
  defaultText,
}: {
  randomize: boolean;
  setRandomize: (value: boolean) => void;
  setStarted: (value: boolean) => void;
  setText: (value: string) => void;
  defaultText: string;
}) {
  return (
    <div className="flex justify-between w-full px-8">
      <div className="flex items-center gap-4">
        <button className="rounded px-2" onClick={() => setText(defaultText)}>
          Use default text
        </button>
        <button
          className={`rounded px-2 text-sm ${
            randomize
              ? "bg-purpleDark text-purpleLight"
              : "bg-purpleLight text-purpleDark"
          }`}
          onClick={() => setRandomize(!randomize)}
        >
          Randomize
        </button>
      </div>
      <button className="text-greenMedium" onClick={() => setStarted(true)}>
        Start
      </button>
    </div>
  );
}
