import { formatTime } from "../helpers";

export default function StatusStop({
  setStarted,
  wpm,
  elapsedTime,
  reset,
}: {
  setStarted: (value: boolean) => void;
  wpm: number;
  elapsedTime: number;
  reset: () => void;
}) {
  return (
    <div className="flex justify-between w-full px-8">
      <div className="flex gap-8">
        <p className="text-purpleLight text-xl">Words per minute: {wpm}</p>
        <p className="text-purpleLight text-xl">
          Time: {formatTime(elapsedTime)}
        </p>
      </div>

      <div className="flex items-center gap-4">
        <button
          className="ml-4 text-2xl text-redMedium"
          onClick={() => {
            reset();
            setStarted(false);
          }}
        >
          Stop
        </button>
      </div>
    </div>
  );
}
