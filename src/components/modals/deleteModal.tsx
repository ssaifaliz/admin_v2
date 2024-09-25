"use client";
import React, { useState } from "react";
import Image from "next/image";
import close from "../../assets/close.png";
import fetchWithToken from "@/utils/api";
import AnimatedBtn from "../animatedBtn";

interface DeleteModalProps {
  route?: string;
  content?: string;
  visibilityState: string | number | boolean;
  setState: React.Dispatch<React.SetStateAction<string | number | boolean>>;
  fetchAllCall: () => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({
  route,
  content,
  visibilityState,
  setState,
  fetchAllCall,
}) => {
  const [isDecline, setIsDecline] = useState<boolean>(false);
  const [status, setStatus] = useState("");

  const deleteData = async () => {
    setStatus("onclic");
    try {
      await fetchWithToken(`/${route}/remove`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: visibilityState,
        }),
      });
      fetchAllCall();
      setStatus("success");
      setTimeout(() => {
        setState(!visibilityState);
      }, 1250);
    } catch (error) {
      setStatus("fail");
      console.error("Error creating department:", error);
    }
  };

  return (
    visibilityState && (
      <main
        onClick={() => setState(false)}
        className="fixed top-0 bottom-0 left-0 right-0 bg-black bg-opacity-30 flex justify-center align-middle z-[1]"
      >
        <div className="container my-auto">
          <div className="py-5 max-w-[40%] h-[70%] overflow-auto m-auto w-[385px] p-5 bg-[#FFF] rounded-[8px] scrollbar-hidden">
            <div
              className="w-[353px] h-[24px]"
              onClick={(e) => e?.stopPropagation()}
            >
              <div className="text-lg capitalize leading-6 font-semibold text-center">
                {route}
              </div>
              <div
                className="float-right w-[24px]"
                onClick={() => setState(false)}
              >
                <Image src={close} alt="close" className="w-[13px] p-[13px]" />
              </div>
            </div>
            <div className="w-[353px]">
              <div className="w-[245px] h-[48px] mx-auto text-center text-[#101010] text-lg leading-6 font-normal my-6">
                Are you sure you want to delete{" "}
                <span className="text-lg leading-6 font-semibold">
                  {content}?
                </span>
              </div>
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={() => {
                    setState(false);
                    setIsDecline(true);
                  }}
                  className={`w-[168px] h-[40px] rounded-[8px] border border-[#05A5FB] text-[#50C2FF] hover:border-[#50C2FF] hover:text-[#50C2FF] ${
                    isDecline ? "text-[#70CDFF] border-[#70CDFF]" : ""
                  } text-[16px] font-[700] px-[24px] py-[8px]`}
                >
                  Cancel
                </button>
                <div className="w-[168px]">
                  <AnimatedBtn
                    txt="Delete"
                    status={status}
                    setStatus={setStatus}
                    onClick={deleteData}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    )
  );
};

export default DeleteModal;
