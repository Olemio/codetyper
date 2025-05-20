import { useAuth } from "react-oidc-context";
import {
  deleteResult,
  formatTime,
  getUserDB,
  parseFromDynamo,
} from "../helpers";
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
      email: string;
      createdAt: string;
    }[]
  >([]);
  const [showModal, setShowModal] = React.useState(false);
  const [modalData, setModalData] = React.useState<(typeof results)[0] | null>(
    null
  );

  const handleGetResults = React.useCallback(async () => {
    const dbData = await getUserDB(auth);
    const parsedData = dbData.map((item: Record<string, AttributeValue>) =>
      parseFromDynamo(item)
    );
    setResults(parsedData);
  }, [auth]);

  React.useEffect(() => {
    if (auth.isAuthenticated) {
      handleGetResults();
    }
  }, [auth.isAuthenticated, handleGetResults]);

  return (
    <div className="flex flex-col items-center my-8 mx-4 text-purpleLight">
      <div className="flex text-xl mb-8">Previous results</div>

      <div className="flex flex-wrap justify-center gap-4">
        {results.length === 0 ? (
          <div className="flex flex-col items-center">
            <p>Nothing here yet...</p>
            <button onClick={handleGetResults}>Try again</button>
          </div>
        ) : (
          results
            .sort(
              (a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
            )
            .map((result) => (
              <div className="relative" key={result.id}>
                <button
                  onClick={() => {
                    setModalData(result);
                    setShowModal(true);
                  }}
                  className="bg-purpleDark px-6 py-4 rounded w-56 flex flex-col flex-1 gap-4"
                >
                  <div className="flex gap-2">
                    <p>Time</p>
                    <p className="font-mono text-gray-400">
                      {formatTime(result.time)}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <p>WPM</p>
                    <p className="font-mono text-gray-400">{result.wpm}</p>
                  </div>
                  <div className="flex gap-2">
                    <p>Text</p>
                    <p className="font-mono text-gray-400 truncate">
                      {result.text}
                    </p>
                  </div>
                </button>
                <button
                  onClick={async (e) => {
                    e.stopPropagation();
                    await deleteResult(result.id);
                    handleGetResults();
                  }}
                  className="absolute top-2 right-2 text-purpleLight text-sm"
                >
                  ✕
                </button>
              </div>
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
          email={modalData.email}
        />
      )}
    </div>
  );
}
