import { useEffect, useState } from "react";
import Image from "next/image";
import moment from "moment";
import fetchWithToken from "@/utils/api";
import Notifications from "./modals/notifications";
import Chats from "./modals/chats";
import AccountProfile from "./modals/accountProfile";
import Logout from "./modals/logout";
import message from "@/assets/message.png";
import notification from "@/assets/notification.png";
import dp from "@/assets/noProfile.svg";
import settings from "@/assets/settings.png";
import logout from "@/assets/logout.png";
import whiteChat from "@/assets/whiteChat.png";
import whiteNotification from "@/assets/whiteNotification.png";
import {
  Dropdown,
  DropdownButton,
  DropdownItem,
  DropdownMenu,
} from "./catalyst/dropdown";

const getGreeting = () => {
  const currentHour = moment().hour();
  if (currentHour < 12) return "Good Morning";
  else if (currentHour < 18) return "Good Afternoon";
  else return "Good Evening";
};

const Header = () => {
  const [showNotification, setShowNotification] = useState<boolean>(false);
  const [showChats, setShowChats] = useState<boolean>(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [userName, setUserName] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [isLogout, setIsLogout] = useState<boolean>(false);

  const userdata = async () => {
    try {
      const data = await fetchWithToken("/users/user", {
        method: "GET",
      });

      setUserName(data?.first_name);
      setProfileImage(data?.profilePicture);
    } catch (error) {
      console.error("Failed to fetch next shift:", error);
    }
  };

  useEffect(() => {
    userdata();
  }, []);

  return (
    <div className="flex items-center justify-between px-2">
      <AccountProfile
        isModalVisible={isModalVisible}
        setModalVisible={setModalVisible}
      />
      <div>
        <div className="text-[24px] font-[500]">{`${getGreeting()}, ${
          userName || "Administrator"
        }`}</div>
        <div className="text-[16px] text-[#5d6561]">
          {moment(new Date()).format("ddd, DD MMM YYYY")}
        </div>
      </div>
      <div className="flex items-center">
        <Image
          alt="message"
          src={showChats ? whiteChat : message}
          onClick={() => {
            if (!showChats) setShowNotification(false);
            setShowChats(!showChats);
          }}
          className={`cursor-pointer w-[40px] p-[10px] rounded-[4px] ${
            showChats ? "bg-[#05A5FB]" : ""
          }`}
        />
        <Image
          alt="notification"
          src={showNotification ? whiteNotification : notification}
          onClick={() => {
            if (!showNotification) setShowChats(false);
            setShowNotification(!showNotification);
          }}
          className={`cursor-pointer w-[40px] p-[10px] mx-5 rounded-[4px] ${
            showNotification ? "bg-[#05A5FB]" : ""
          }`}
        />
        <Dropdown>
          <DropdownButton
            style={{
              backgroundColor: "white",
              border: 0,
              padding: 0,
              borderRadius: "100%",
              cursor: "pointer",
            }}
          >
            <Image
              alt="dp"
              src={profileImage || dp}
              onClick={() => {
                setShowChats(false);
                setShowNotification(false);
              }}
              width={40}
              height={40}
              className="w-[30px] sm:w-[35px] md:w-[40px] h-[30px] sm:h-[35px] md:h-[40px] cursor-pointer rounded-full"
            />
          </DropdownButton>
          <DropdownMenu
            className="bg-[white]"
            style={{
              backgroundColor: "white",
            }}
          >
            <DropdownItem onClick={() => setModalVisible(!isModalVisible)}>
              <Image
                src={settings}
                alt="settings"
                className="w-[16px] sm:w-[18px] h-[16px] sm:h-[18px] mr-2"
              />
              <div className="text-xs sm:text-sm md:text-base font-normal text-[#101010]">
                Profile Settings
              </div>
            </DropdownItem>
            <DropdownItem onClick={() => setIsLogout(true)}>
              <Image
                src={logout}
                alt="logout"
                className="w-[16px] sm:w-[18px] h-[16px] sm:h-[18px] mr-2"
              />
              <div className="text-xs sm:text-sm md:text-base font-normal text-[#101010]">
                Log Out
              </div>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
      <Notifications
        showNotification={showNotification}
        setShowNotification={setShowNotification}
      />
      <Chats showChats={showChats} setShowChats={setShowChats} />
      <Logout isLogout={isLogout} setIsLogout={setIsLogout} />
    </div>
  );
};

export default Header;
