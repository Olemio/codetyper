import type { MetaFunction } from "@remix-run/node";
import Start from "../components/start";
import React from "react";
import Stop from "../components/stop";
import { saveTimeDynamo, shuffleArray } from "../helpers";
import StatusStart from "../components/statusStart";
import StatusStop from "../components/statusStop";
import { useAuth } from "react-oidc-context";
import useTypingSession from "../hooks/useTypingSession";
import Modal from "../components/modal";

export const meta: MetaFunction = () => {
  return [
    { title: "<CodeTyper />" },
    { name: "description", content: "Welcome to Code Typer!" },
  ];
};

export default function Index() {
  const auth = useAuth();
  const [started, setStarted] = React.useState(false);
  const [randomize, setRandomize] = React.useState(false);
  const [showModal, setShowModal] = React.useState(false);
  const defaultText = `export function useSmartDocContext() {
    const ctx = React.useContext(smartDocContext);
    if (!ctx) throw new Error('useSmartDocContext must be used within <Editor />');
    return ctx;
}`;
  const [text, setText] = React.useState(defaultText);
  const [hasSaved, setHasSaved] = React.useState(false);

  const cleanedText = React.useMemo(() => {
    const words = text.trim().split(/\s+/);
    const finalWords = randomize ? shuffleArray(words) : words;
    return finalWords.join(" ");
  }, [text, randomize]);

  const { charNum, isWrongKey, wpm, elapsedTime, misClicks, reset } =
    useTypingSession(cleanedText, started, showModal);

  React.useEffect(() => {
    if (charNum === cleanedText.length && !hasSaved) {
      setShowModal(true);
      setHasSaved(false);
      saveTimeDynamo(auth, { wpm, misClicks, text, time: elapsedTime });
    }
  }, [charNum, cleanedText, auth, wpm, misClicks, text, elapsedTime, hasSaved]);

  return (
    <div className="flex flex-col items-center justify-center gap-4 p-12 h-[calc(100vh-80px)] ">
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
        <>
          <Modal
            isOpen={showModal}
            onClose={() => {
              setStarted(false);
              reset();
              setShowModal(false);
            }}
            wpm={wpm}
            misClicks={misClicks}
            time={elapsedTime}
            text={cleanedText}
          />
          <StatusStop
            setStarted={setStarted}
            wpm={wpm}
            elapsedTime={elapsedTime}
            reset={reset}
          />
          <Stop
            cleanedText={cleanedText}
            charNum={charNum}
            isWrongKey={isWrongKey}
          />
        </>
      )}
    </div>
  );
}
