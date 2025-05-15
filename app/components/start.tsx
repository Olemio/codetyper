export default function Start({ text }: { text: string }) {
  return (
    <>
      <div className="flex justify-between w-full px-8">
        <p className="text-purpleLight text-xl">Paste custom words here...</p>
        <div className="flex items-center gap-4">
          <button className="bg-purpleLight rounded-xl px-4 py-1">
            Use default text
          </button>
          <button className="bg-purpleLight rounded-xl px-4 py-1">
            Randomize
          </button>
          <button className="ml-4 text-2xl text-greenMedium">Start</button>
        </div>
      </div>
      <textarea className="resize-none px-16 py-4 h-full w-full rounded-sm text-xl text-grayMedium bg-purpleDark">
        {text}
      </textarea>
    </>
  );
}
