import type { MetaFunction } from "@remix-run/node";
import Start from "../components/start";

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
      <Start text={text} />
    </div>
  );
}
