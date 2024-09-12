import { UserButton } from "@clerk/nextjs";
import { Search } from "lucide-react";

const Header = () => {
  return (
    <div className="flex flex-col md:flex-row p-3 md:p-5 shadow-sm bg-white border-b-2 items-end justify-end gap-4">
      {/* Membership plan */}
      <div className="flex md:flex-row gap-3 md:gap-5 w-full md:w-auto text-center md:text-right items-center md:items-end">
        <h2
          className="bg-primary p-1 rounded-full text-xs md:text-sm lg:text-base text-white px-3 hover:bg-[#743dd4] transition-all duration-500 w-full"
          title="Membership plan"
        >
          Join Membership just for $9.99/Month
        </h2>
        <UserButton />
      </div>
    </div>
  );
};

export default Header;
