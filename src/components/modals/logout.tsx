"use client";
import React, { useState } from "react";
import Image from "next/image";
import close from "../../assets/close.png";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

interface LogoutProps {
  isLogout: boolean;
  setIsLogout: React.Dispatch<React.SetStateAction<boolean>>;
}

const Logout: React.FC<LogoutProps> = ({ isLogout, setIsLogout }) => {
  const { push, refresh } = useRouter();

  return (
    isLogout && (
      <main
        onClick={() => setIsLogout(false)}
        className="fixed top-0 bottom-0 left-0 right-0 bg-black bg-opacity-30 flex justify-center align-middle z-[1]"
      >
        <div className="container my-auto">
          <div className="py-5 w-[385px] h-[192px] rounded-lg p-4 bg-[#FFFFFF] overflow-auto m-auto scrollbar-hidden">
            <div
              className="w-[353px] h-[24px]"
              onClick={(e) => e?.stopPropagation()}
            >
              <div className="text-lg leading-6 font-semibold text-center">
                Log Out
              </div>
              <div
                className="float-right w-[24px]"
                onClick={() => setIsLogout(false)}
              >
                <Image src={close} alt="close" className="w-[13px] p-[13px]" />
              </div>
            </div>
            <div className="w-[353px]">
              <div className="w-[245px] h-[48px] mx-auto text-center text-[#101010] text-lg leading-6 font-normal mt-6">
                Are you sure you want to log out?
              </div>
              <button
                type="button"
                onClick={() => {
                  setIsLogout(false);
                }}
                className={`w-[168px] h-[40px] rounded-[8px] border border-[#05A5FB] text-[#50C2FF] hover:border-[#50C2FF] hover:text-[#50C2FF]
                 text-[16px] font-[700] px-[24px] py-[8px]`}
              >
                Cancel
              </button>
              <button
                onClick={async () => {
                  Cookies?.remove("session");
                  refresh();
                }}
                className={`w-[168px] rounded-[8px] bg-[#E23121] text-white p-2 text-[16px] mt-5 px-[24px] py-[8px] ml-[13px]`}
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      </main>
    )
  );
};

export default Logout;
