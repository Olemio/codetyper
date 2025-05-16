export default function Start({
  text,
  setText,
}: {
  text: string;
  setText: (valse: string) => void;
}) {
  return (
    <textarea
      className="resize-none px-16 py-4 h-full w-full rounded-sm text-xl text-gray-400 bg-purpleDark font-mono"
      onChange={(e) => setText(e.currentTarget.value)}
      value={text}
    />
  );
}
