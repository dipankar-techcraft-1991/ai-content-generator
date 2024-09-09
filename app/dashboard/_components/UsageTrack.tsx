"use client";

import { TotalUsageContext } from "@/app/(context)/TotalUsageContext";
import { Button } from "@/components/ui/button";
import { db } from "@/utils/db";
import { AIOutput } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import { useContext, useEffect, useState } from "react";

const UsageTrack = () => {
  const { user } = useUser();

  const { totalUsage, setTotalUsage } = useContext(TotalUsageContext);

  // Fetch total usage
  const getTotalUsage = async () => {
    if (!user?.primaryEmailAddress?.emailAddress) return;

    try {
      const result = await db
        .select()
        .from(AIOutput)
        .where(eq(AIOutput.createdBy, user.primaryEmailAddress.emailAddress));

      // Calculate the total usage
      let total = 0;

      result.forEach((element) => {
        total += Number(element.aiResponse?.length);
      });

      setTotalUsage(total);
    } catch (error) {
      console.error("Error fetching total usage:", error);
    }
  };

  // Effect to fetch data when the component mounts
  useEffect(() => {
    getTotalUsage();
  }, [user]);

  return (
    <div className="m-5">
      <div className="bg-primary text-white p-3 rounded-lg">
        <h2 className="font-medium">Credits</h2>
        <div className="h-2 bg-[#9981f9] w-full rounded-full mt-3">
          <div
            className="h-2 bg-white rounded-full"
            style={{ width: `${(totalUsage / 20000) * 100}%` }}
          ></div>
        </div>
        <h2 className="text-sm my-2">{totalUsage}/20,000 Credit Used</h2>
      </div>
      <Button
        variant={"secondary"}
        className="w-full my-3 text-primary font-bold"
      >
        Upgrade
      </Button>
    </div>
  );
};

export default UsageTrack;
