import { Search } from "lucide-react";

const Header = () => {
  return (
    <div className="flex p-5 shadow-sm bg-white border-b-2 items-center justify-between">
      <div className="flex gap-2 items-center p-2 border rounded-md max-w-lg">
        <Search />
        <input
          type="text"
          placeholder="Search..."
          id="search"
          className="outline-none"
        />
      </div>

      <div className="">
        <h2
          className="bg-primary p-1 rounded-full text-xs text-white px-2 hover:bg-[#743dd4] transition-all duration-500"
          title="Membership plan"
        >
          Join Membership just for ₹899/Month
        </h2>
      </div>
    </div>
  );
};

export default Header;
