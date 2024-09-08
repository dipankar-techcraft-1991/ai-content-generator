"use client";

import { db } from "@/utils/db";
import { AIOutput } from "@/utils/schema";
import { useEffect, useState } from "react";

const History = () => {
  const [historyData, setHistoryData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const HistoryHeader: string[] = [
    "TEMPLATE",
    "AI RESPONSE",
    "DATE",
    "WORDS",
    "COPY",
  ];

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

  return (
    <div className="bg-white m-5 rounded-md p-4">
      <h1 className="font-bold text-2xl">History</h1>
      <p className="text-gray-600">
        Search your previously generated AI contents
      </p>

      {/* Header Section */}
      <div className="grid grid-cols-2 md:grid-cols-5 bg-gray-200 mt-4 rounded-md p-2 font-bold text-sm sm:text-base lg:text-md">
        {HistoryHeader.map((item, index) => (
          <h1 key={index} className="text-center">
            {item}
          </h1>
        ))}
      </div>

      {/* Data Section */}
      <div className="mt-4">
        {loading ? (
          <p>Loading...</p>
        ) : historyData.length > 0 ? (
          historyData.map((history: any, index: number) => (
            <div
              key={index}
              className="grid grid-cols-2 md:grid-cols-5 items-center p-2 bg-gray-100 mt-2 rounded-md text-sm sm:text-base lg:text-sm"
            >
              <p className="text-center">{history.templateSlug}</p>
              <p className="text-center line-clamp-3">{history.aiResponse}</p>
              <p className="text-center">
                {new Date(history.createdAt).toLocaleDateString()}
              </p>
              <p className="text-center">
                {history.aiResponse.split(" ").length}
              </p>
              <button className="text-blue-500 hover:underline text-center">
                Copy
              </button>
            </div>
          ))
        ) : (
          <p>No history available</p>
        )}
      </div>
    </div>
  );
};

export default History;
