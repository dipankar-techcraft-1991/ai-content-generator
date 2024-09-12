"use client";

import { TEMPLATE } from "../../_components/TemplateListSection";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Loader2Icon } from "lucide-react";
import Image from "next/image";

interface PROPS {
  seletedTemplate?: TEMPLATE;
  userFormInput: any;
  loading: boolean;
}

const FormSection = ({ seletedTemplate, userFormInput, loading }: PROPS) => {
  const iconSrc = seletedTemplate?.icon as string;

  const [formData, setFormData] = useState<any>();

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const onSubmit = (e: any) => {
    e.preventDefault();
    userFormInput(formData);
  };

  return (
    <div className="p-5 shadow-md border rounded-lg bg-white h-full">
      <Image src={iconSrc} alt="icon" width={60} height={60} priority />
      <h2 className="font-bold text-2xl mb-2 text-primary">
        {seletedTemplate?.name}
      </h2>
      <p className="text-gray-500 text-sm">{seletedTemplate?.desc}</p>

      <form onSubmit={onSubmit} className="mt-6">
        {seletedTemplate?.form?.map((item, index) => (
          <div key={index} className="my-2 flex flex-col gap-2 mb-3.5">
            <label className="font-bold">{item.label}</label>
            {item.field === "input" ? (
              <Input
                onChange={handleInputChange}
                name={item.name}
                required={item?.required}
              />
            ) : item.field === "textarea" ? (
              <Textarea
                onChange={handleInputChange}
                name={item.name}
                rows={3}
              />
            ) : null}
          </div>
        ))}

        <Button
          type="submit"
          className="w-full py-5 text-md shadow-lg hover:bg-[#743dd4] transition-all duration-500"
          disabled={loading}
        >
          {loading && <Loader2Icon className="animate-spin" />}
          Generate Content
        </Button>
      </form>
    </div>
  );
};

export default FormSection;
