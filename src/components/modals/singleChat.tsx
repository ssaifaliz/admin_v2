"use client";
import React, { useEffect, useState } from "react";
import fetchWithToken from "@/utils/api";
import leftArrow from "../../assets/leftArrow.png";
import Image from "next/image";

interface singleChatProps {
  showChat: boolean;
  setShowChat: React.Dispatch<React.SetStateAction<boolean>>;
}

const SingleChat: React.FC<singleChatProps> = ({ showChat, setShowChat }) => {
  const [messages, setMessages] = useState([]);

  const fetchMessages = async () => {
    try {
      const data = await fetchWithToken("/notifications", {
        method: "GET",
      });
      setMessages(data);
      console.log("messages", data);
    } catch (error) {
      console.error("Failed to fetch Messages:", error);
    }
  };

  useEffect(() => {
    // fetchMessages();
  }, []);

  const formatTimeDifference = (timestamp: string) => {
    const date = new Date(timestamp);

    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;

    const minutesStr = minutes < 10 ? "0" + minutes : minutes.toString();
    const formattedTime = `${hours}:${minutesStr} ${ampm}`;

    return formattedTime;
  };

  return (
    showChat && (
      <main className="w-[28vw] h-[85vh] fixed top-[12vh] right-[1vw] z-20 bg-white rounded-lg overflow-y-scroll scrollbar-hidden">
        <div className="relative mx-3">
          <div className="my-5 text-center relative">
            <div className="text-[#242222] text-2xl font-bold leading-7">
              Mohammed Ali
            </div>
            <Image
              src={leftArrow}
              alt="<"
              onClick={() => setShowChat(false)}
              className="w-4 h-4 mt-2 ml-2 pl-[6px] absolute left-0 top-0"
            />
          </div>

          <div className="mt-20">
            {messages?.map((msg: any, index) => {
              return (
                <div key={index} className="m-2 bg-[#F7F8F7] rounded relative">
                  <div className="text-base text-[#101010] px-3 py-2 pb-8">
                    {msg?.message}
                  </div>
                  <div className="text-[#5d6561] text-sm absolute bottom-2 right-3">
                    {formatTimeDifference(msg?.createdAt)}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    )
  );
};

export default SingleChat;
