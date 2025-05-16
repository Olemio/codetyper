export default function Modal({
  isOpen,
  onClose,
  wpm,
  misClicks,
  time,
  text,
}: {
  isOpen: boolean;
  onClose: () => void;
  wpm: string;
  misClicks: number;
  time: number;
  text: string;
}) {
  if (!isOpen) return null;

  const totalClicks = text.length + misClicks;
  const accuracy = ((text.length / totalClicks) * 100).toFixed(2);

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center">
      <div className="flex flex-col gap-4 bg-purpleMedium text-purpleLight p-6 rounded w-[70%] h-[60%] shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-4 text-2xl text-gray-400"
        >
          ×
        </button>
        <h1 className="text-2xl">Result</h1>
        <div className="flex flex-1">
          <div className="flex flex-col gap-4 bg-purpleDark rounded w-full px-4 py-4">
            <p className="text-lg">WPM: {wpm}</p>
            <p className="text-lg">Acc: {accuracy}%</p>
            <p className="text-lg">Misses: {misClicks}</p>
            <p className="text-lg">Time: {time}</p>
          </div>
          <div className="flex flex-col gap-2 text-purpleLight px-4 py-2 rounded">
            <p className="text">Text:</p>
            <p className="text-gray-400 font-mono">{text}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
