import type { MetaFunction } from "@remix-run/node";
import Start from "../components/start";
import React from "react";
import Stop from "../components/stop";

export const meta: MetaFunction = () => {
  return [
    { title: "Code Typer" },
    { name: "description", content: "Welcome to Code Typer!" },
  ];
};

export default function Index() {
  const [started, setStarted] = React.useState(false);
  const [randomize, setRandomize] = React.useState(false);

  const defaultText = `export function useSmartDocContext() {
    const ctx = React.useContext(smartDocContext);
    if (!ctx) throw new Error('useSmartDocContext must be used within <Editor />');
    return ctx;
}`;
  const [text, setText] = React.useState(defaultText);

  return (
    <div className="flex flex-col items-center justify-center gap-4 p-12 h-[calc(100vh-80px)] ">
      {!started ? (
        <>
          <div className="flex justify-between w-full px-8">
            <p className="text-purpleLight text-xl">
              Paste custom words here...
            </p>
            <div className="flex items-center gap-4">
              <button
                className="bg-purpleLight text-purpleDark rounded-xl px-4 py-1"
                onClick={() => setText(defaultText)}
              >
                Use default text
              </button>
              <button
                className={`rounded-xl px-4 py-1 ${
                  randomize
                    ? "bg-purpleDark text-purpleLight"
                    : "bg-purpleLight text-purpleDark"
                }`}
                onClick={() => setRandomize((prev) => !prev)}
              >
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
          <Start text={text} setText={setText} />
        </>
      ) : (
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
          <Stop text={text} randomize={randomize} />
        </>
      )}
    </div>
  );
}
