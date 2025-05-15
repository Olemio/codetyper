import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  const text = `export function useSmartDocContext() {
    const ctx = React.useContext(smartDocContext);
    if (!ctx) throw new Error('useSmartDocContext must be used within <Editor />');
    return ctx;
}`;
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-12 h-[calc(100vh-80px)] ">
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
    </div>
  );
}
