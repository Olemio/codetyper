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
      <p className="text-purpleLight text-xl">Paste custom words here...</p>
      <div className="flex items-center gap-4">
        <button
          className="bg-purpleLight text-purpleDark rounded-xl px-4 py-1"
          onClick={() => setText(defaultText)}
        >
          Use default text
        </button>
        <button
          className={`rounded-xl px-4 py-1 ${
            randomize
              ? "bg-purpleDark text-purpleLight"
              : "bg-purpleLight text-purpleDark"
          }`}
          onClick={() => setRandomize(!randomize)}
        >
          Randomize
        </button>
        <button
          className="ml-4 text-2xl text-greenMedium"
          onClick={() => setStarted(true)}
        >
          Start
        </button>
      </div>
    </div>
  );
}
