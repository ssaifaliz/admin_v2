"use client";
import React from "react";

const MessageModal = ({ isMsgTxt, setMsgTxt }: any) =>
  isMsgTxt && (
    <main
      onClick={() => setMsgTxt("")}
      className="fixed top-0 bottom-0 left-0 right-0 bg-black bg-opacity-30 flex justify-center align-middle z-[1]"
    >
      <div className="container my-auto">
        <div className="m-auto w-[385px] h-p[525px] capitalize p-5 bg-[#FFF] rounded-[8px]">
          <div className="text-center text-lg font-bold mb-5">Message</div>
          <div className="text-sm text-[#101010]">
            <div className="text-center">{isMsgTxt}</div>
          </div>
        </div>
      </div>
    </main>
  );
export default MessageModal;
