import { formatTime } from "../helpers";

export default function Modal({
  isOpen,
  onClose,
  wpm,
  misClicks,
  time,
  text,
  email,
}: {
  isOpen: boolean;
  onClose: () => void;
  wpm: number;
  misClicks: number;
  time: number;
  text: string;
  email: string;
}) {
  if (!isOpen) return null;

  // regnet ut med hjelp fra chat gpt
  const totalClicks = text.length + misClicks;
  const accuracy = ((text.length / totalClicks) * 100).toFixed(0);

  return (
    <div // triks fra chat gpt for å unngå errormelding
      onClick={onClose}
      onKeyDown={(e) => {
        if (e.key === "Escape") onClose();
      }}
      tabIndex={0}
      role="button"
      className="fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center"
    >
      <div // triks fra chat gpt for å unngå errormelding
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => e.stopPropagation()}
        tabIndex={0}
        role="button"
        className="flex flex-col gap-4 bg-purpleDark text-purpleLight p-6 rounded w-[70%] h-[60%] shadow-lg relative cursor-default"
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-4 text-2xl text-gray-400"
        >
          ×
        </button>
        <div className="flex gap-4 text-xl m-auto mb-2">
          <p>User</p>
          <p className="font-mono text-gray-400">{email}</p>
        </div>
        <div className="flex flex-1 gap-2">
          <div className="flex flex-col gap-4 bg-purpleDark rounded  px-4 py-4 w-1/2">
            <div className="flex gap-2 text-lg">
              <p>WPM</p>
              <p className="font-mono text-gray-400">{wpm}</p>
            </div>
            <div className="flex gap-2 text-lg">
              <p>Accuracy</p>
              <p className="font-mono text-gray-400">{accuracy}%</p>
            </div>
            <div className="flex gap-2 text-lg">
              <p>Time</p>
              <p className="font-mono text-gray-400">{formatTime(time)}</p>
            </div>
            <div className="flex gap-2 text-lg">
              <p>Misses</p>
              <p className="font-mono text-gray-400">{misClicks}</p>
            </div>
          </div>
          <div className="flex flex-col items-start gap-2 rounded px-4 py-2 w-1/2">
            <p className="text-lg">Text</p>
            <p className="text-gray-400 font-mono text-start pl-4">{text}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
