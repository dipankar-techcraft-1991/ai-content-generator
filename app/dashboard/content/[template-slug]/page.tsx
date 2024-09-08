"use client";

import Templates from "@/app/(data)/Templates";
import { TEMPLATE } from "../../_components/TemplateListSection";
import FormSection from "../_components/FormSection";
import OutputSection from "../_components/OutputSection";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { chatSession } from "@/utils/AiModel";
import { useState } from "react";

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

  const GenerateAIContent = async (formData: any) => {
    setLoading(true);

    const SelectedPrompt = selectedTemplate?.aiPrompt;

    const FinalAIPrompt = `${JSON.stringify(formData)}, ${SelectedPrompt}`;

    const result = await chatSession.sendMessage(FinalAIPrompt);

    // console.log(result?.response.text());
    setAiOutputResult(result?.response.text());

    setLoading(false);
  };

  return (
    <div className="p-3">
      <Link href={"/dashboard"}>
        <Button className="hover:bg-[#743dd4] transition-all duration-500">
          <ArrowLeft /> Back
        </Button>
      </Link>
      <div className=""></div>
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
