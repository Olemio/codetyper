import { useAuth } from "react-oidc-context";
import { formatTime, getUserDB, parseFromDynamo } from "../helpers";
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
  const [modalData, setModalData] = React.useState<(typeof results)[0] | null>(
    null
  );

  const handleGetResults = async () => {
    const dbData = await getUserDB(auth);
    const parsedData = dbData.map((item: Record<string, AttributeValue>) =>
      parseFromDynamo(item)
    );
    setResults(parsedData);
  };

  React.useEffect(() => {
    handleGetResults();
  }, []);

  return (
    <div className="flex flex-col items-center my-8 mx-4 text-purpleLight">
      <div className="flex text-xl mb-8">Previous results</div>

      <div className="flex flex-wrap justify-center gap-4">
        {results.length === 0 ? (
          <p>Nothing here yet...</p>
        ) : (
          results.map((result) => (
            <button
              key={result.id}
              onClick={() => {
                setModalData(result);
                setShowModal(true);
              }}
              className="bg-purpleDark px-6 py-4 rounded max-w-56 flex flex-col flex-1 gap-4"
            >
              <p className="flex gap-2">
                <p>Time</p>
                <p className="font-mono text-gray-400">
                  {formatTime(result.time)}
                </p>
              </p>
              <p className="flex gap-2">
                <p>WPM</p>
                <p className="font-mono text-gray-400">{result.wpm}</p>
              </p>
              <p className="flex gap-2">
                <p>Text</p>
                <p className="font-mono text-gray-400 truncate">
                  {result.text}
                </p>
              </p>
            </button>
          ))
        )}
      </div>
      {modalData && (
        <Modal
          isOpen={showModal}
          onClose={() => {
            setShowModal(false);
          }}
          wpm={modalData.wpm}
          misClicks={modalData.mistakes}
          time={modalData.time}
          text={modalData.text}
        />
      )}
    </div>
  );
}
