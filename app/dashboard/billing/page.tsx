import { Check } from "lucide-react";

const Billing = () => {
  return (
    <div className="h-screen">
      <h2 className="text-center mt-10 font-bold text-2xl">
        Upgrade With Monthly Plan
      </h2>
      <div className="flex flex-col md:flex-row gap-5 justify-center my-5">
        {/* free section */}
        <div className="bg-white rounded-lg p-8 mx-4 md:mb-0 shadow-lg">
          <p className="text-center font-bold text-lg">Free</p>
          <p className="text-center my-4 font-bold">
            <span className="text-2xl">0$</span> /month
          </p>
          <p className="flex gap-2 font-semibold my-1">
            <Check />
            20,000 Words/Month
          </p>
          <p className="flex gap-2 font-semibold my-1">
            <Check />
            50+ Content Templates
          </p>
          <p className="flex gap-2 font-semibold my-1">
            <Check />
            Unlimited Download & Copy
          </p>
          <p className="flex gap-2 font-semibold my-1">
            <Check />1 Month of History
          </p>
          <p className="bg-green-500 text-white rounded-full text-center mt-8 p-2.5 cursor-pointer">
            Currently Active Plan
          </p>
        </div>
        {/* monthly section */}
        <div className="bg-white rounded-lg p-8 mx-4 md:mb-0 shadow-lg">
          <p className="text-center font-bold text-lg">Monthly</p>
          <p className="text-center my-4 font-bold">
            <span className="text-2xl">9.99$</span> /month
          </p>
          <p className="flex gap-2 font-semibold my-1">
            <Check />
            1,00,000 Words/Month
          </p>
          <p className="flex gap-2 font-semibold my-1">
            <Check />
            50+ Template Access
          </p>
          <p className="flex gap-2 font-semibold my-1">
            <Check />
            Unlimited Download & Copy
          </p>
          <p className="flex gap-2 font-semibold my-1">
            <Check />1 Year of History
          </p>
          <p className="bg-white text-blue-800 font-medium border-2 border-gray-300 rounded-full text-center mt-8 p-2 cursor-pointer">
            Get Started
          </p>
        </div>
      </div>
    </div>
  );
};

export default Billing;
