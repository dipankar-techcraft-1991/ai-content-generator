"use client";

import { TEMPLATE } from "../../_components/TemplateListSection";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { chatSession } from "@/utils/AiModel";
import { useContext, useState } from "react";
import { db } from "@/utils/db";
import { AIOutput } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { TotalUsageContext } from "@/app/(context)/TotalUsageContext";
import { useRouter } from "next/navigation";
import { UserSubscriptionContext } from "@/app/(context)/UserSubscriptionContext";
import { UpdateCreditUsageContext } from "@/app/(context)/UpdateCreditUsageContext";
import Templates from "@/app/(data)/Templates";
import FormSection from "../_components/FormSection";
import OutputSection from "../_components/OutputSection";
import Link from "next/link";
import moment from "moment";

interface PROPS {
  params: {
    "template-slug": string;
  };
}

const CreateNewContent = (props: PROPS) => {
  const selectedTemplate: TEMPLATE | undefined = Templates?.find(
    (item) => item.slug === props.params["template-slug"]
  );

  const [loading, setLoading] = useState(false);
  const [aiOutputResult, setAiOutputResult] = useState<string>("");
  const { user } = useUser();

  const router = useRouter();

  const { totalUsage } = useContext(TotalUsageContext);
  const { userSubscription } = useContext(UserSubscriptionContext);
  const { setUpdateCreditUsage } = useContext(UpdateCreditUsageContext);

  /**
   * Used to generate content from AI
   * @param formData
   * @returns
   */

  const GenerateAIContent = async (formData: any) => {
    try {
      if (totalUsage >= 10000 && !userSubscription) {
        router.push("/dashboard/billing");
        return;
      }

      setLoading(true);

      const SelectedPrompt = selectedTemplate?.aiPrompt;
      const FinalAIPrompt = `${JSON.stringify(formData)}, ${SelectedPrompt}`;
      const result = await chatSession.sendMessage(FinalAIPrompt);
      const resultText = await result?.response.text();

      setAiOutputResult(resultText);
      await SaveInDB(
        formData,
        selectedTemplate?.name,
        selectedTemplate?.icon,
        selectedTemplate?.slug,
        resultText
      );

      setLoading(false);

      setUpdateCreditUsage(Date.now());
    } catch (error) {
      console.error("Error generating AI content:", error);
    } finally {
      setLoading(false);
    }
  };

  const SaveInDB = async (
    formData: any,
    templateName: any,
    templateIcon: any,
    templateSlug: any,
    aiResponse: string
  ) => {
    try {
      const emailAddress = user?.primaryEmailAddress?.emailAddress;
      if (!emailAddress) {
        console.error("User email not found.");
        return;
      }

      const result = await db.insert(AIOutput).values({
        formData,
        templateName,
        templateIcon,
        templateSlug,
        aiResponse,
        createdBy: emailAddress,
        createdAt: moment().format("DD/MM/YYYY"),
      });

      console.log(result);
    } catch (error) {
      console.error("Error saving in DB:", error);
    }
  };

  if (!selectedTemplate) {
    return <div>Template not found</div>;
  }

  return (
    <div className="p-3">
      <Link href="/dashboard">
        <Button className="hover:bg-[#743dd4] transition-all duration-500">
          <ArrowLeft /> Back
        </Button>
      </Link>

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 py-3">
        {/* Form section */}
        <div className="md:col-span-1 col-span-3">
          <FormSection
            seletedTemplate={selectedTemplate}
            userFormInput={(value: any) => GenerateAIContent(value)}
            loading={loading}
          />
        </div>

        {/* Output section */}
        <div className="md:col-span-2 col-span-3">
          <OutputSection aiOutputResult={aiOutputResult} />
        </div>
      </div>
    </div>
  );
};

export default CreateNewContent;
