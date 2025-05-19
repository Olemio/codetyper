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
      <div className="flex items-center gap-4">
        <p className="flex gap-2">
          Words per minute{" "}
          <span className="text-gray-400 font-mono">{wpm}</span>
        </p>
        <p className="flex gap-2">
          Time{" "}
          <span className="text-gray-400 font-mono">
            {formatTime(elapsedTime)}
          </span>
        </p>
      </div>

      <div>
        <button
          className="text-redMedium"
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
