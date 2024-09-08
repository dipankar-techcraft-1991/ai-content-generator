"use client";

import { FileClock, Home, Settings, WalletCards } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

const SideNav = () => {
  const path = usePathname();

  useEffect(() => {
    // console.log(path);
  }, []);

  const MenuList = [
    {
      name: "Home",
      icon: Home,
      path: "/dashboard",
    },
    {
      name: "History",
      icon: FileClock,
      path: "/dashboard/history",
    },
    {
      name: "Billing",
      icon: WalletCards,
      path: "/dashboard/billing",
    },
    {
      name: "Setting",
      icon: Settings,
      path: "/dashboard/settings",
    },
  ];

  return (
    <div className="h-screen p-5 shadow-sm border bg-white">
      <div className="flex justify-center">
        <Image
          src="/logo.svg"
          alt="logo"
          width={120}
          height={100}
          className="cursor-pointer"
          priority
        />
      </div>
      <hr className="my-3.5 border" />
      <div className="mt-5">
        {MenuList.map((menu, index) => (
          <Link href={menu.path} key={index}>
            <div
              className={`flex gap-2 mb-2 p-3 hover:bg-primary hover:text-white hover:shadow-lg rounded-lg cursor-pointer items-center hover:scale-105 duration-500 transition-all ${
                path === menu.path && "bg-primary text-white shadow-lg"
              }`}
            >
              <menu.icon className="w-6 h-6" />
              <h2 className="text-lg">{menu.name}</h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SideNav;
