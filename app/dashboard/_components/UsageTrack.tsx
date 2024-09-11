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
  const { userSubscription, setUserSubscription } = useContext(
    UserSubscriptionContext
  );
  const [maxWords, setMaxWords] = useState<number>(10000);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user?.primaryEmailAddress?.emailAddress) {
      fetchUserData();
    }
  }, [user]);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      await Promise.all([getTotalUsage(), isUserSubscription()]);
    } catch (err) {
      console.error(err);
      setError("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  const isUserSubscription = async () => {
    if (!user?.primaryEmailAddress?.emailAddress) return;

    try {
      const result = await db
        .select()
        .from(UserSubscription)
        .where(
          eq(UserSubscription.email, user.primaryEmailAddress.emailAddress)
        );

      if (result.length > 0) {
        setUserSubscription(true);
        setMaxWords(100000);
      }
    } catch (error) {
      console.error("Error fetching user subscription:", error);
      setError("Failed to fetch user subscription");
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
      result?.forEach((element) => {
        total += Number(element.aiResponse?.length) || 0;
      });

      setTotalUsage(total);
    } catch (error) {
      console.error("Error fetching total usage:", error);
      setError("Failed to fetch total usage");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

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
          {totalUsage}/{maxWords} Credits Used
        </h2>
      </div>
      <Button
        variant={"secondary"}
        className="w-full my-3 text-primary font-bold"
        disabled={loading}
      >
        {userSubscription ? "Subscribed" : "Upgrade"}{" "}
      </Button>
    </div>
  );
};

export default UsageTrack;
