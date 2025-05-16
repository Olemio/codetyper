import { useAuth } from "react-oidc-context";
import { getDb, parseFromDynamo } from "../helpers";
import React from "react";
import type { AttributeValue } from "@aws-sdk/client-dynamodb";
import Modal from "../components/modal";

export default function Results() {
  const auth = useAuth();
  const [results, setResults] = React.useState<
    {
      id: string;
      userId: string;
      wpm: number;
      mistakes: number;
      text: string;
      time: number;
    }[]
  >([]);
  const [showModal, setShowModal] = React.useState(false);

  const handleGetResults = async () => {
    const dbData = await getDb(auth);
    const parsedData = dbData.map((item: Record<string, AttributeValue>) =>
      parseFromDynamo(item)
    );
    setResults(parsedData);
  };

  React.useEffect(() => {
    handleGetResults();
  }, []);

  return (
    <div className="flex flex-col items-center m-4">
      <div className="flex text-purpleLight text-xl mb-4">Previous results</div>

      <div className="flex flex-wrap justify-center gap-4">
        {results.map((result) => (
          <>
            <button
              key={result.id}
              onClick={() => {
                setShowModal(true);
              }}
              className="bg-purpleDark text-purpleLight p-4 rounded max-w-80"
            >
              <p className="flex gap-2">
                <p>WPM:</p> {result.wpm}
              </p>
              <p className="flex gap-2">
                <p>Mistakes:</p> {result.mistakes}
              </p>
              <p className="flex gap-2">
                <p>Time:</p> {result.time}
              </p>
              <p>
                <p>Text:</p>
                <p className="text-gray-400 font-mono">{result.text}</p>
              </p>
            </button>
            <Modal
              isOpen={showModal}
              onClose={() => {
                setShowModal(false);
              }}
              wpm={result.wpm}
              misClicks={result.mistakes}
              time={result.time}
              text={result.text}
            />
          </>
        ))}
      </div>
    </div>
  );
}
