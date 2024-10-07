import React from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import logo from "@/assets/logo2.png";
import dashboard from "@/assets/dashboard.svg";
import cruds from "@/assets/cruds.svg";

const Sidebar = () => {
  const { push } = useRouter();
  const pathname = usePathname();
  return (
    <div className="min-w-[90px] max-w-[90px] bg-[#282c2b] rounded-[16px] flex flex-col items-center justify-between py-2">
      <div className="flex flex-col items-center h-[300px] justify-between">
        <Image alt="logo" src={logo} className="w-[72px]" />
        <div>
          <div
            className={`mb-[20px] rounded-[4px] w-[40px] h-[40px] flex items-center justify-center cursor-pointer ${
              pathname === "/schedule"
                ? "bg-[#05a5fb] hover:bg-[#50C2FF]"
                : "bg-[#4a4e4d] hover:bg-[#50C2FF]"
            }`}
            onClick={async () => {
              push("/schedule");
            }}
          >
            <Image alt="dashboard" src={dashboard} className="w-[18px]" />
          </div>
          <div
            className={`mb-[20px] rounded-[4px] w-[40px] h-[40px] flex items-center justify-center cursor-pointer ${
              pathname === "/swaprequest"
                ? "bg-[#05a5fb] hover:bg-[#50C2FF]"
                : "bg-[#4a4e4d] hover:bg-[#50C2FF]"
            }`}
            onClick={async () => {
              push("/swaprequest");
            }}
          >
            <Image alt="dashboard" src={dashboard} className="w-[18px]" />
          </div>
          <div
            className={`mb-[20px] rounded-[4px] w-[40px] h-[40px] flex items-center justify-center cursor-pointer ${
              pathname === "/cruds"
                ? "bg-[#05a5fb] hover:bg-[#50C2FF]"
                : "bg-[#4a4e4d] hover:bg-[#50C2FF]"
            }`}
            onClick={async () => {
              push("/cruds");
            }}
          >
            <Image alt="cruds" src={cruds} className="w-[18px]" />
          </div>
        </div>
      </div>
      <div className="w-full text-[#fff] flex flex-col items-center ">
        <div className="text-[10px]">powered by</div>
        <div className="text-[12px] font-[700]">RFD SOFT</div>
      </div>
    </div>
  );
};

export default Sidebar;
