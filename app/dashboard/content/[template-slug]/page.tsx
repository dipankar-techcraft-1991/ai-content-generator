"use client";

import Templates from "@/app/(data)/Templates";
import { TEMPLATE } from "../../_components/TemplateListSection";
import FormSection from "../_components/FormSection";
import OutputSection from "../_components/OutputSection";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { chatSession } from "@/utils/AiModel";
import { useContext, useState } from "react";
import { db } from "@/utils/db";
import { AIOutput } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import moment from "moment";
import { TotalUsageContext } from "@/app/(context)/TotalUsageContext";
import { useRouter } from "next/navigation";

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

  const { totalUsage, setTotalUsage } = useContext(TotalUsageContext);

  const GenerateAIContent = async (formData: any) => {
    try {
      if (totalUsage >= 20000) {
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
      <Link href={"/dashboard"}>
        <Button className="hover:bg-[#743dd4] transition-all duration-500">
          <ArrowLeft /> Back
        </Button>
      </Link>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 py-3">
        {/* Form section */}
        <FormSection
          seletedTemplate={selectedTemplate}
          userFormInput={(value: any) => GenerateAIContent(value)}
          loading={loading}
        />

        {/* Output section */}
        <div className="col-span-2">
          <OutputSection aiOutputResult={aiOutputResult} />
        </div>
      </div>
    </div>
  );
};

export default CreateNewContent;
