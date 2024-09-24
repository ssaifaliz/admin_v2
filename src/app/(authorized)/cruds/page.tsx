"use client";
import React, { useState } from "react";
import Image from "next/image";
import Departments from "@/components/tabs/departments";
import Positions from "@/components/tabs/positions";
import Permission from "@/components/tabs/permission";
import Roles from "@/components/tabs/roles";
import Shift from "@/components/tabs/shift"
import Users from "@/components/tabs/users";
import Locations from "@/components/tabs/locations";
import whitePlus from "@/assets/whitePlus.png";
import downArrow from "@/assets/downArrow.png";
import search from "@/assets/search.png";
import schedules from "@/assets/cruds/schedule.png";
import department from "@/assets/cruds/department.png";
import location from "@/assets/cruds/location.png";
import position from "@/assets/cruds/position.png";
import arrowIcon from "@/assets/Arrows.svg";
import profile from "@/assets/cruds/profile.png";
import role from "@/assets/cruds/role.png";
import shift from "@/assets/cruds/shift.png";
import swap from "@/assets/cruds/swap.png";
import users from "@/assets/cruds/users.png";
import activeSchedule from "@/assets/cruds/activeSchedule.png";
import activeDepartment from "@/assets/cruds/activeDepartment.png";
import activeLocation from "@/assets/cruds/activeLocation.png";
import activePosition from "@/assets/cruds/activePosition.png";
import activeProfile from "@/assets/cruds/activeProfile.png";
import activeRole from "@/assets/cruds/activeRole.png";
import activeShift from "@/assets/cruds/activeShift.png";
import activeSwap from "@/assets/cruds/activeSwap.png";
import activeUsers from "@/assets/cruds/activeUsers.png";
import {
  Dropdown,
  DropdownButton,
  DropdownItem,
  DropdownMenu,
} from "@/components/catalyst/dropdown";
import Schedule from "@/components/tabs/schedule";

const tabs = [
  {
    name: "Departments",
    img: department,
    active: activeDepartment,
    component: (props: any) => <Departments {...props} />,
  },
  {
    name: "Schedules",
    img: schedules,
    active: activeSchedule,
    component: (props: any) => <Schedule {...props} />,
  },
  {
    name: "Positions",
    img: position,
    active: activePosition,
    component: (props: any) => <Positions {...props} />,
  },
  {
    name: "Permissions",
    img: position,
    active: activePosition,
    component: (props: any) => <Permission {...props} />,
  },
  {
    name: "Roles",
    img: role,
    active: activeRole,
    component: (props: any) => <Roles {...props} />,
  },
  {
    name: "Shift",
    img: shift,
    active: activeShift,
    component: (props: any) => <Shift {...props} />,
  },
  {
    name: "Locations",
    img: location,
    active: activeLocation,
    component: (props: any) => <Locations {...props} />,
  },
  {
    name: "Users",
    img: users,
    active: activeUsers,
    component: (props: any) => <Users {...props} />,
  },
];

const Page = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedTab, setSelectedTab] = useState(tabs[4]);

  return (
    <div className="flex flex-1 w-full h-full flex-col relative">
      <div className="w-full flex items-center justify-between">
        <div className="h-[40px] flex">
          <Dropdown>
            <DropdownButton
              style={{
                border: 0,
                padding: 0,
                width: "200px",
              }}
            >
              <div className="h-full w-full rounded-lg relative py-2 px-4 bg-[#F7F8F7] flex hover:bg-[#E8EBE9]">
                <Image
                  src={selectedTab.active}
                  alt=""
                  className="w-4 h-4 mr-2 absolute top-3"
                />
                <div className="text-base font-semibold text-[#101010] absolute left-10">
                  {selectedTab.name}
                </div>
                <Image
                  src={downArrow}
                  alt=""
                  className="w-3 h-2 absolute right-4 top-4"
                />
              </div>
            </DropdownButton>
            <DropdownMenu
              className="bg-[white] cursor-pointer"
              style={{
                backgroundColor: "white",
              }}
            >
              {tabs.map((tab, index) => {
                return (
                  <DropdownItem
                    className="cursor-pointer"
                    key={index}
                    onClick={() => {
                      setSelectedTab(tab);
                    }}
                  >
                    <Image
                      src={selectedTab.name === tab.name ? tab.active : tab.img}
                      alt=""
                      className={`w-4 h-4 mr-2 my-auto`}
                    />
                    <div className="text-base font-semibold text-[#101010] left-10">
                      {tab.name}
                    </div>
                  </DropdownItem>
                );
              })}
            </DropdownMenu>
          </Dropdown>
          <div className="h-full w-[320px] bg-[#FDFDFF] rounded-lg border border-[#7E8581] ml-4 px-4 py-2 flex justify-between">
            <input
              type="text"
              placeholder="Search"
              className="outline-none w-[250px] text-sm font-normal leading-[22px] bg-[#FDFDFF]"
            />
            <Image src={search} alt="search" className="w-5 h-5" />
          </div>
        </div>
        <button
          type="button"
          onClick={() => setModalVisible(!isModalVisible)}
          className="bg-[#05A5FB] hover:bg-[#50C2FF] w-[180px] h-[40px] rounded-[8px] text-[16px] font-[700] flex items-center justify-center text-[#fff]"
        >
          {`Add ${selectedTab?.name?.slice(0, -1)}`}
          <Image src={whitePlus} alt="+" className="w-3 h-3 ml-3" />
        </button>
      </div>
      <div className="flex-1 overflow-y-auto scrollbar-hidden mt-1">
        {selectedTab?.component({ isModalVisible, setModalVisible })}
      </div>
      <div className="absolute bottom-[2%] w-full h-[60px]">
        <div className="flex items-center justify-between bg-[#F7F8F7] rounded-lg shadow-md px-6 py-2 w-full h-full">
          <div className="flex items-center">
            <span className="text-[14px] text-[#101010] font-semibold">
              Rows
            </span>
            <Dropdown>
              <div className="ml-2 flex items-center border border-gray-300 bg-white rounded">
                <DropdownButton
                  className="cursor-pointer"
                  style={{ background: "white" }}
                >
                  <span className=" text-[#101010] text-[14px] font-semibold">
                    12
                  </span>
                  <Image
                    src={arrowIcon}
                    alt="arrow icon"
                    className="ml-1 w-4 h-4 rotate-90"
                  />
                </DropdownButton>
                <DropdownMenu
                  className="bg-[white] cursor-pointer gap-2"
                  style={{
                    backgroundColor: "white",
                  }}
                >
                  <DropdownItem className="cursor-pointer">
                    <p>1</p>
                  </DropdownItem>
                  <DropdownItem className="cursor-pointer">
                    <p>2</p>
                  </DropdownItem>
                  <DropdownItem className="cursor-pointer">
                    <p>3</p>
                  </DropdownItem>
                  <DropdownItem className="cursor-pointer">
                    <p>4</p>
                  </DropdownItem>
                  <DropdownItem className="cursor-pointer">
                    <p>5</p>
                  </DropdownItem>
                  <DropdownItem className="cursor-pointer">
                    <p>6</p>
                  </DropdownItem>
                  <DropdownItem className="cursor-pointer">
                    <p>7</p>
                  </DropdownItem>
                  <DropdownItem className="cursor-pointer">
                    <p>8</p>
                  </DropdownItem>
                  <DropdownItem className="cursor-pointer">
                    <p>9</p>
                  </DropdownItem>
                  <DropdownItem className="cursor-pointer">
                    <p>10</p>
                  </DropdownItem>
                  <DropdownItem className="cursor-pointer">
                    <p>11</p>
                  </DropdownItem>
                  <DropdownItem className="cursor-pointer">
                    <p>12</p>
                  </DropdownItem>
                </DropdownMenu>
              </div>
            </Dropdown>
          </div>

          <div className="text-[14px] font-semibold text-center text-[#101010]">
            Items 1-4 of 4
          </div>

          <div className="flex items-center">
            <button className="ml-2 text-gray-500">
              <Image src={arrowIcon} alt="arrow icon" className="w-4 h-4" />
            </button>
            <button className="text-gray-500">
              <Image
                src={arrowIcon}
                alt="arrow icon"
                className="rotate-180 w-4 h-4"
              />
            </button>

            <span className="text-[14px] font-semibold mr-2 text-[#101010]">
              Page 1 of 1
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
