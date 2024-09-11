"use client";

import { TotalUsageContext } from "@/app/(context)/TotalUsageContext";
import { UserSubscriptionContext } from "@/app/(context)/UserSubscriptionContext";
import { Button } from "@/components/ui/button";
import { db } from "@/utils/db";
import { AIOutput, UserSubscription } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import { useContext, useEffect, useState } from "react";

const UsageTrack = () => {
  const { user } = useUser();

  const { totalUsage, setTotalUsage } = useContext(TotalUsageContext);
  const { setUserSubscription } = useContext(UserSubscriptionContext);
  const [maxWords, setMaxWords] = useState<number>(10000);

  // Effect to fetch data when the component mounts
  useEffect(() => {
    getTotalUsage();
    isUserSubscription();
  }, [user]);

  const isUserSubscription = async () => {
    if (!user?.primaryEmailAddress?.emailAddress) return;

    try {
      const result = await db
        .select()
        .from(UserSubscription)
        .where(
          eq(UserSubscription.email, user.primaryEmailAddress.emailAddress)
        );

      if (result) {
        setUserSubscription(true);
        setMaxWords(100000);
      }
    } catch (error) {
      console.error("Error fetching user subscription:", error);
    }
  };

  // Fetch total usage
  const getTotalUsage = async () => {
    if (!user?.primaryEmailAddress?.emailAddress) return;

    try {
      const result = await db
        .select()
        .from(AIOutput)
        .where(eq(AIOutput.createdBy, user.primaryEmailAddress.emailAddress));

      // Calculate the total usage
      let total: number = 0;

      result.forEach((element) => {
        total += Number(element.aiResponse?.length);
      });

      setTotalUsage(total);
    } catch (error) {
      console.error("Error fetching total usage:", error);
    }
  };

  return (
    <div className="m-5">
      <div className="bg-primary text-white p-3 rounded-lg">
        <h2 className="font-medium">Credits</h2>
        <div className="h-2 bg-[#9981f9] w-full rounded-full mt-3">
          <div
            className="h-2 bg-white rounded-full"
            style={{ width: `${(totalUsage / maxWords) * 100}%` }}
          ></div>
        </div>
        <h2 className="text-sm my-2">
          {totalUsage}/{maxWords} Credit Used
        </h2>
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
