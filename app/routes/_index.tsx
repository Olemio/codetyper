import type { MetaFunction } from "@remix-run/node";
import Start from "../components/start";
import React from "react";
import Stop from "../components/stop";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  const [started, setStarted] = React.useState(false);
  const text = `export function useSmartDocContext() {
    const ctx = React.useContext(smartDocContext);
    if (!ctx) throw new Error('useSmartDocContext must be used within <Editor />');
    return ctx;
}`;
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-12 h-[calc(100vh-80px)] ">
      {!started ? (
        <Start text={text} setStarted={setStarted} />
      ) : (
        <Stop text={text} setStarted={setStarted} />
      )}
    </div>
  );
}
