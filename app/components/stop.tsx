export default function Stop({
  text,
  setStarted,
}: {
  text: string;
  setStarted: (value: boolean) => void;
}) {
  return (
    <>
      <div className="flex justify-between w-full px-8">
        <p className="text-purpleLight text-xl">Char per minute: 64</p>
        <div className="flex items-center gap-4">
          <button
            className="ml-4 text-2xl text-redMedium"
            onClick={() => setStarted(false)}
          >
            Stop
          </button>
        </div>
      </div>
      <textarea className="resize-none px-16 py-4 h-full w-full rounded-sm text-xl text-grayMedium bg-purpleDark">
        {text}
      </textarea>
    </>
  );
}
