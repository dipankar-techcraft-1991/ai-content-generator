"use client";

import { TotalUsageContext } from "@/app/(context)/TotalUsageContext";
import { UpdateCreditUsageContext } from "@/app/(context)/UpdateCreditUsageContext";
import { UserSubscriptionContext } from "@/app/(context)/UserSubscriptionContext";
import { db } from "@/utils/db";
import { AIOutput, UserSubscription } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import { useContext, useEffect, useState } from "react";

const UsageTrack = () => {
  const { user } = useUser();

  const { totalUsage, setTotalUsage } = useContext(TotalUsageContext);
  const { userSubscription, setUserSubscription } = useContext(
    UserSubscriptionContext
  );

  const [maxWords, setMaxWords] = useState<number>(10000);

  const { updateCreditUsage, setUpdateCreditUsage } = useContext(
    UpdateCreditUsageContext
  );

  useEffect(() => {
    getTotalUsage();
    isUserSubscription();
  }, [user]);

  useEffect(() => {
    getTotalUsage();
  }, [updateCreditUsage]);

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

  const getTotalUsage = async () => {
    if (!user?.primaryEmailAddress?.emailAddress) return;

    try {
      const result = await db
        .select()
        .from(AIOutput)
        .where(eq(AIOutput.createdBy, user.primaryEmailAddress.emailAddress));

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
      <button
        className={`w-full text-blue-800 font-medium border-2 border-gray-300 rounded-xl text-center mt-3 p-2 ${
          userSubscription && "cursor-not-allowed"
        }`}
        disabled={!!userSubscription}
      >
        {userSubscription ? "Subscribed" : "Upgrade"}
      </button>
    </div>
  );
};

export default UsageTrack;
