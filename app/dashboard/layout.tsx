import { ReactNode } from "react";
import SideNav from "./_components/SideNav";
import Header from "./_components/Header";

const layout = ({ children }: Readonly<{ children: ReactNode }>) => {
  return (
    <div>
      <div className="md:w-64 hidden md:block fixed">
        <SideNav />
      </div>
      <div className="md:ml-64">
        <Header />
        {children}
      </div>
    </div>
  );
};

export default layout;
