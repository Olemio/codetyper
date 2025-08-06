import { formatTime, getAllUsersDB, parseFromDynamo } from "../helpers";
import React from "react";
import type { AttributeValue } from "@aws-sdk/client-dynamodb";
import Modal from "../components/modal";

export default function Results() {
  const [results, setResults] = React.useState<
    {
      id: string;
      userId: string;
      email: string;
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
  const [loadNum, setLoadNum] = React.useState(5);

  const handleGetResults = async () => {
    const dbData = await getAllUsersDB();
    // Typen AttributeValue gitt fra chat gpt
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
      <div className="flex flex-col items-center text-xl mb-8">
        Leaderboard
        <p className="text-gray-400 font-mono text-sm">
          Score = WPM + Time (Max 15 sec)
        </p>
      </div>

      <div className="flex flex-col gap-4 w-full items-center">
        {results.length === 0 ? (
          <p>Nothing here yet...</p>
        ) : (
          <>
            {results
              .sort(
                // Jeg har ikke brukt sort så mye før, denne er generert fra chat gpt. Med litt tweaking fra meg i ettertid
                (a, b) =>
                  b.wpm +
                  (b.time > 15 ? 15 : b.time) -
                  (a.wpm + (a.time > 15 ? 15 : a.time))
              )
              .slice(0, loadNum)
              .map((result, i) => (
                <button
                  key={result.id}
                  onClick={() => {
                    setModalData(result);
                    setShowModal(true);
                  }}
                  className="flex gap-8 justify-between bg-purpleDark px-6 py-4 rounded w-full max-w-4xl"
                >
                  <div className="flex gap-4">
                    <p>{i + 1}.</p>
                    <p>User</p>
                    <p className="font-mono text-gray-400">
                      {result?.email ?? "Test"}
                    </p>
                  </div>
                  <div className="flex gap-4">
                    <p>WPM</p>
                    <p className="font-mono text-gray-400">{result.wpm}</p>
                    <p>Time</p>
                    <p className="font-mono text-gray-400">
                      {formatTime(result.time)}
                    </p>
                    <p>Score</p>
                    <p className="font-mono text-gray-400">
                      {(
                        result.wpm + (result.time > 15 ? 15 : result.time)
                      ).toFixed(2)}
                    </p>
                  </div>
                </button>
              ))}
            <button
              onClick={() => setLoadNum((prev) => prev + 10)}
              className="pt-2 text-grayMedium hover:text-purpleLight"
            >
              Load more...
            </button>
          </>
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
