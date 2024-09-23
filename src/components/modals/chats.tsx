"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import moment from "moment";
import fetchWithToken from "@/utils/api";
import close from "../../assets/close.png";
import add from "../../assets/add.png";
import noProfile from "../../assets/noProfile.svg";
import SingleChat from "./singleChat";

interface chatProps {
  showChats: boolean;
  setShowChats: React.Dispatch<React.SetStateAction<boolean>>;
}

const Chats: React.FC<chatProps> = ({ showChats, setShowChats }) => {
  const [openChat, setOpenChat] = useState<boolean>(false);
  const [chats, setChats] = useState([]);

  const fetchChats = async () => {
    try {
      const data = await fetchWithToken("/notifications", {
        method: "GET",
      });
      setChats(data);
      console.log("Chats", data);
    } catch (error) {
      console.error("Failed to fetch chats:", error);
    }
  };

  useEffect(() => {
    fetchChats();
  }, []);

  const formatTimeDifference = (createdDateTime: string) => {
    const createdMoment = moment(createdDateTime);
    const now = moment();
    let minutes = now.diff(createdMoment, "minutes");
    let hours = Math.floor(minutes / 60);
    let days = Math.floor(hours / 24);

    return days >= 1
      ? `${days} days ago`
      : hours >= 1
      ? `${hours} hours ago`
      : minutes > 0
      ? `${minutes} minutes ago`
      : "now";
  };

  return (
    showChats && (
      <main className="w-[28vw] h-[85vh] fixed top-[12vh] right-[1vw] z-40 bg-white rounded-lg overflow-y-scroll scrollbar-hidden">
        <SingleChat showChat={openChat} setShowChat={setOpenChat} />
        <div className="relative mx-3">
          <div className="my-5 text-[#242222] text-2xl font-bold text-center relative">
            <div>Chat</div>
            <Image
              src={close}
              alt="X"
              onClick={() => setShowChats(false)}
              className="w-4 h-4 mt-3 absolute right-0 top-0"
            />
          </div>
          <div className="w-[35%] h-[10vh] mx-auto my-7 flex justify-between">
            <div className="w-[60px] h-full">
              <Image
                src={add}
                alt="new chat"
                className="w-[40px] h-[40px] rounded mx-auto bg-[#F8FAF8]"
              />
              <div className="text-xs font-semibold leading-[18px] my-1">
                New Chat
              </div>
            </div>
            <div className="w-[60px] h-full">
              <Image
                src={add}
                alt="new group"
                className="w-[40px] h-[40px] rounded mx-auto bg-[#F8FAF8]"
              />
              <div className="text-xs font-semibold leading-[18px] my-1">
                New Group
              </div>
            </div>
          </div>
          <div className="my-7">
            <div
              onClick={() => {
                setOpenChat(true);
              }}
              className="w-full h-[50px] mb-4 relative inline-flex"
            >
              <Image
                src={noProfile}
                alt=""
                className="h-[50px] w-[50px] rounded-full"
              />
              <div className="w-full flex justify-between ml-3">
                <div className="text-base font-semibold leading-6 text-[#101010]">
                  Mohammed Ali
                </div>
                <div className="text-sm text-[#5d6561]">few mints ago</div>
              </div>
              <div className="text-base font-normal absolute left-[62px] top-7 text-[#5D6561] leading-6">
                Hey, Sara! Could we swap for tomorrow?
              </div>
            </div>
            <div
              onClick={() => {
                setOpenChat(true);
              }}
              className="w-full h-[50px] mb-4 relative inline-flex"
            >
              <Image
                src={noProfile}
                alt=""
                className="h-[50px] w-[50px] rounded-full"
              />
              <div className="w-full flex justify-between ml-3">
                <div className="text-base font-semibold leading-6 text-[#101010]">
                  Mohammed Ali
                </div>
                <div className="text-sm text-[#5d6561]">few mints ago</div>
              </div>
              <div className="text-base font-normal absolute left-[62px] top-7 text-[#5D6561] leading-6">
                Hey, Sara! Could we swap for tomorrow?
              </div>
            </div>
            <div
              onClick={() => {
                setOpenChat(true);
              }}
              className="w-full h-[50px] mb-4 relative inline-flex"
            >
              <Image
                src={noProfile}
                alt=""
                className="h-[50px] w-[50px] rounded-full"
              />
              <div className="w-full flex justify-between ml-3">
                <div className="text-base font-semibold leading-6 text-[#101010]">
                  Mohammed Ali
                </div>
                <div className="text-sm text-[#5d6561]">few mints ago</div>
              </div>
              <div className="text-base font-normal absolute left-[62px] top-7 text-[#5D6561] leading-6">
                Hey, Sara! Could we swap for tomorrow?
              </div>
            </div>
            <div
              onClick={() => {
                setOpenChat(true);
              }}
              className="w-full h-[50px] mb-4 relative inline-flex"
            >
              <Image
                src={noProfile}
                alt=""
                className="h-[50px] w-[50px] rounded-full"
              />
              <div className="w-full flex justify-between ml-3">
                <div className="text-base font-semibold leading-6 text-[#101010]">
                  Mohammed Ali
                </div>
                <div className="text-sm text-[#5d6561]">few mints ago</div>
              </div>
              <div className="text-base font-normal absolute left-[62px] top-7 text-[#5D6561] leading-6">
                Hey, Sara! Could we swap for tomorrow?
              </div>
            </div>
            <div
              onClick={() => {
                setOpenChat(true);
              }}
              className="w-full h-[50px] mb-4 relative inline-flex"
            >
              <Image
                src={noProfile}
                alt=""
                className="h-[50px] w-[50px] rounded-full"
              />
              <div className="w-full flex justify-between ml-3">
                <div className="text-base font-semibold leading-6 text-[#101010]">
                  Mohammed Ali
                </div>
                <div className="text-sm text-[#5d6561]">few mints ago</div>
              </div>
              <div className="text-base font-normal absolute left-[62px] top-7 text-[#5D6561] leading-6">
                Hey, Sara! Could we swap for tomorrow?
              </div>
            </div>
            <div
              onClick={() => {
                setOpenChat(true);
              }}
              className="w-full h-[50px] mb-4 relative inline-flex"
            >
              <Image
                src={noProfile}
                alt=""
                className="h-[50px] w-[50px] rounded-full"
              />
              <div className="w-full flex justify-between ml-3">
                <div className="text-base font-semibold leading-6 text-[#101010]">
                  Mohammed Ali
                </div>
                <div className="text-sm text-[#5d6561]">few mints ago</div>
              </div>
              <div className="text-base font-normal absolute left-[62px] top-7 text-[#5D6561] leading-6">
                Hey, Sara! Could we swap for tomorrow?
              </div>
            </div>
            <div
              onClick={() => {
                setOpenChat(true);
              }}
              className="w-full h-[50px] mb-4 relative inline-flex"
            >
              <Image
                src={noProfile}
                alt=""
                className="h-[50px] w-[50px] rounded-full"
              />
              <div className="w-full flex justify-between ml-3">
                <div className="text-base font-semibold leading-6 text-[#101010]">
                  Mohammed Ali
                </div>
                <div className="text-sm text-[#5d6561]">few mints ago</div>
              </div>
              <div className="text-base font-normal absolute left-[62px] top-7 text-[#5D6561] leading-6">
                Hey, Sara! Could we swap for tomorrow?
              </div>
            </div>
            <div
              onClick={() => {
                setOpenChat(true);
              }}
              className="w-full h-[50px] mb-4 relative inline-flex"
            >
              <Image
                src={noProfile}
                alt=""
                className="h-[50px] w-[50px] rounded-full"
              />
              <div className="w-full flex justify-between ml-3">
                <div className="text-base font-semibold leading-6 text-[#101010]">
                  Mohammed Ali
                </div>
                <div className="text-sm text-[#5d6561]">few mints ago</div>
              </div>
              <div className="text-base font-normal absolute left-[62px] top-7 text-[#5D6561] leading-6">
                Hey, Sara! Could we swap for tomorrow?
              </div>
            </div>
            <div className="w-full h-[50px] mb-4 relative inline-flex">
              <Image
                src={noProfile}
                alt=""
                className="h-[50px] w-[50px] rounded-full"
              />
              <div className="w-full flex justify-between ml-3">
                <div className="text-base font-semibold leading-6 text-[#101010]">
                  Mohammed Ali
                </div>
                <div className="text-sm text-[#5d6561]">few mints ago</div>
              </div>
              <div className="text-base font-normal absolute left-[62px] top-7 text-[#5D6561] leading-6">
                Hey, Sara! Could we swap for tomorrow?
              </div>
            </div>
            <div className="w-full h-[50px] mb-4 relative inline-flex">
              <Image
                src={noProfile}
                alt=""
                className="h-[50px] w-[50px] rounded-full"
              />
              <div className="w-full flex justify-between ml-3">
                <div className="text-base font-semibold leading-6 text-[#101010]">
                  Mohammed Ali
                </div>
                <div className="text-sm text-[#5d6561]">few mints ago</div>
              </div>
              <div className="text-base font-normal absolute left-[62px] top-7 text-[#5D6561] leading-6">
                Hey, Sara! Could we swap for tomorrow?
              </div>
            </div>
            <div className="w-full h-[50px] mb-4 relative inline-flex">
              <Image
                src={noProfile}
                alt=""
                className="h-[50px] w-[50px] rounded-full"
              />
              <div className="w-full flex justify-between ml-3">
                <div className="text-base font-semibold leading-6 text-[#101010]">
                  Mohammed Ali
                </div>
                <div className="text-sm text-[#5d6561]">few mints ago</div>
              </div>
              <div className="text-base font-normal absolute left-[62px] top-7 text-[#5D6561] leading-6">
                Hey, Sara! Could we swap for tomorrow?
              </div>
            </div>
          </div>
        </div>
      </main>
    )
  );
};

export default Chats;
