"use client";

import { db } from "@/utils/db";
import { AIOutput } from "@/utils/schema";
import { useEffect, useState } from "react";
import Image from "next/image";

const History = () => {
  const [historyData, setHistoryData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [copyMessage, setCopyMessage] = useState<string>(""); // Add state for copy message

  const fetchHistoryData = async () => {
    try {
      setLoading(true);
      const data: any = await db.select().from(AIOutput);
      setHistoryData(data);
    } catch (error) {
      console.error("Error fetching history data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistoryData();
  }, []);

  const handleCopy = (aiResponse: string) => {
    navigator.clipboard.writeText(aiResponse);
    setCopyMessage("AI Response copied to clipboard!"); // Set copy message

    // Hide the message after 3 seconds
    setTimeout(() => {
      setCopyMessage("");
    }, 3000);
  };

  return (
    <div className="bg-white m-5 rounded-md p-4">
      {/* Show copy message */}
      {copyMessage && (
        <div className="bg-gray-200 p-2 rounded-md mb-4">{copyMessage}</div>
      )}

      <h1 className="font-bold text-2xl">History</h1>
      <p className="text-gray-600">
        Search your previously generated AI contents
      </p>

      <div className="mt-4">
        <div className="grid grid-cols-2 md:grid-cols-5 bg-gray-200 rounded-md p-2 font-bold text-sm sm:text-base">
          <h1 className="text-center">TEMPLATE</h1>
          <h1 className="text-center">AI RESPONSE</h1>
          <h1 className="text-center">DATE</h1>
          <h1 className="text-center">WORDS</h1>
          <h1 className="text-center">COPY</h1>
        </div>

        {loading ? (
          <p className="text-center mt-5">Loading...</p>
        ) : historyData.length > 0 ? (
          historyData.map((history: any, index: number) => (
            <div
              key={index}
              className="grid grid-cols-2 md:grid-cols-5 items-center p-2 bg-gray-100 mt-2 rounded-md text-sm"
            >
              <p className="flex items-center gap-2 font-semibold line-clamp-2 p-3 sm:flex-col">
                <Image
                  src={history.templateIcon}
                  alt="icon"
                  width={30}
                  height={30}
                />
                {history.templateName}
              </p>
              <p className="line-clamp-4 text-justify">{history.aiResponse}</p>
              <p className="text-center">{history.createdAt}</p>
              <p className="text-center">
                {history.aiResponse.split(" ").length}
              </p>
              <button
                onClick={() => handleCopy(history.aiResponse)} // Call handleCopy on click
                className="text-blue-500 text-center"
              >
                Copy
              </button>
            </div>
          ))
        ) : (
          <p className="text-center mt-5">No history available</p>
        )}
      </div>
    </div>
  );
};

export default History;
