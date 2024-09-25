"use client";
import React, { useEffect, useState } from "react";
import moment from "moment";
import fetchWithToken from "@/utils/api";
import close from "../../assets/close.png";
import Image from "next/image";

interface notificationProps {
  showNotification: boolean;
  setShowNotification: React.Dispatch<React.SetStateAction<boolean>>;
}

const Notifications: React.FC<notificationProps> = ({
  showNotification,
  setShowNotification,
}) => {
  const [notifications, setNotifications] = useState([]);

  const fetchNotifications = async () => {
    try {
      const data = await fetchWithToken("/notifications", {
        method: "GET",
      });
      setNotifications(data);
      console.log("Notifications", data);
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
    }
  };

  useEffect(() => {
    // fetchNotifications();
  }, []);

  const clearAll = async () => {
    await fetchWithToken(`/notifications/clear`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

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
    showNotification && (
      <main className="w-[28vw] h-[85vh] fixed top-[12vh] right-[1vw] z-40 bg-white rounded-lg overflow-y-scroll scrollbar-hidden">
        <div className="relative mx-3">
          <div className="my-5 text-[#242222] text-2xl font-bold text-center relative">
            <div>Notifications</div>
            <Image
              src={close}
              alt="X"
              onClick={() => setShowNotification(false)}
              className="w-4 h-4 mt-3 absolute right-0 top-0"
            />
          </div>
          <button
            onClick={clearAll}
            className="text-[#424A46] text-sm font-normal underline underline-offset-2 absolute right-0 hover:text-[#101010]"
          >
            Clear all notifications
          </button>
          <div className="mt-20">
            {notifications?.map((notification: any, index) => {
              return (
                <div key={index} className="m-2 bg-[#F7F8F7] rounded relative">
                  <div className="text-base text-[#101010] px-3 py-2 pb-8">
                    {notification?.message}
                  </div>
                  <div className="text-[#5d6561] text-sm absolute bottom-2 right-3">
                    {formatTimeDifference(notification?.createdAt)}
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

export default Notifications;
