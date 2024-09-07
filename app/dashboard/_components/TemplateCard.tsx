import Image from "next/image";
import { TEMPLATE } from "./TemplateListSection";
import Link from "next/link";

const TemplateCard = (item: TEMPLATE) => {
  return (
    <Link href={`/dashboard/content/${item?.slug}`}>
      <div className="p-5 border shadow-md rounded-md bg-white flex flex-col gap-3 cursor-pointer hover:scale-105 duration-500 transition-all">
        <Image src={item.icon} width={50} height={50} alt="icon" priority />
        <h2 className="font-medium text-lg line-clamp-1" title={item.name}>
          {item.name}
        </h2>
        <p className="text-gray-500 line-clamp-2">{item.desc}</p>
      </div>
    </Link>
  );
};

export default TemplateCard;
