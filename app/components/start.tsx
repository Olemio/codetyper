export default function Start({
  text,
  setStarted,
  setText,
}: {
  text: string;
  setStarted: (value: boolean) => void;
  setText: (valse: string) => void;
}) {
  const defaultText = `export function useSmartDocContext() {
    const ctx = React.useContext(smartDocContext);
    if (!ctx) throw new Error('useSmartDocContext must be used within <Editor />');
    return ctx;
}`;

  return (
    <>
      <div className="flex justify-between w-full px-8">
        <p className="text-purpleLight text-xl">Paste custom words here...</p>
        <div className="flex items-center gap-4">
          <button
            className="bg-purpleLight rounded-xl px-4 py-1"
            onClick={() => setText(defaultText)}
          >
            Use default text
          </button>
          <button className="bg-purpleLight rounded-xl px-4 py-1">
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
      <textarea
        className="resize-none px-16 py-4 h-full w-full rounded-sm text-xl text-gray-400 bg-purpleDark font-mono"
        onChange={(e) => setText(e.currentTarget.value)}
        value={text}
      ></textarea>
    </>
  );
}
