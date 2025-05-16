export default function StatusStop({
  setStarted,
  wpm,
  elapsedTime,
}: {
  setStarted: (value: boolean) => void;
  wpm: string;
  elapsedTime: number;
}) {
  return (
    <div className="flex justify-between w-full px-8">
      <p className="text-purpleLight text-xl">
        Char per second: {wpm} {elapsedTime}
      </p>

      <div className="flex items-center gap-4">
        <button
          className="ml-4 text-2xl text-redMedium"
          onClick={() => setStarted(false)}
        >
          Stop
        </button>
      </div>
    </div>
  );
}
