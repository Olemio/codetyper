import type { MetaFunction } from "@remix-run/node";
import Start from "../components/start";
import React from "react";
import Stop from "../components/stop";
import { useAuth } from "react-oidc-context";
import { parseJwt } from "../helpers";
import StatusStart from "../components/statusStart";

export const meta: MetaFunction = () => {
  return [
    { title: "Code Typer" },
    { name: "description", content: "Welcome to Code Typer!" },
  ];
};

export default function Index() {
  const auth = useAuth();
  const [started, setStarted] = React.useState(false);
  const [randomize, setRandomize] = React.useState(false);

  const defaultText = `export function useSmartDocContext() {
    const ctx = React.useContext(smartDocContext);
    if (!ctx) throw new Error('useSmartDocContext must be used within <Editor />');
    return ctx;
}`;
  const [text, setText] = React.useState(defaultText);

  const getDb = React.useCallback(async () => {
    if (!auth.user?.id_token || !auth.isAuthenticated) return;
    const tokenPayload = parseJwt(auth.user?.id_token);
    const userId = tokenPayload?.sub;
    const email = auth.user.profile.email;

    const response = await fetch("/api/getData", {
      method: "POST",
      body: JSON.stringify({ userId, email }),
    });

    const data = await response.json();

    console.log(data);
  }, [auth.user?.id_token, auth.isAuthenticated, auth.user?.profile.email]);

  return (
    <div className="flex flex-col items-center justify-center gap-4 p-12 h-[calc(100vh-80px)] ">
      <button onClick={getDb}>getdb</button>
      {!started ? (
        <>
          <StatusStart
            randomize={randomize}
            setStarted={setStarted}
            setRandomize={setRandomize}
            setText={setText}
            defaultText={defaultText}
          />
          <Start text={text} setText={setText} />
        </>
      ) : (
        <Stop text={text} randomize={randomize} setStarted={setStarted} />
      )}
    </div>
  );
}
