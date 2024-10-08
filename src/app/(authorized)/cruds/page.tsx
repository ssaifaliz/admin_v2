"use client";
import React, { Suspense, useState } from "react";
import Image from "next/image";
import Departments from "@/components/tabs/departments";
import Positions from "@/components/tabs/positions";
import Permission from "@/components/tabs/permission";
import Roles from "@/components/tabs/roles";
import Shifts from "@/components/tabs/shifts";
import Users from "@/components/tabs/users";
import Locations from "@/components/tabs/locations";
import whitePlus from "@/assets/whitePlus.png";
import downArrow from "@/assets/downArrow.png";
import schedules from "@/assets/cruds/schedule.png";
import department from "@/assets/cruds/department.png";
import location from "@/assets/cruds/location.png";
import position from "@/assets/cruds/position.png";
import role from "@/assets/cruds/role.png";
import shift from "@/assets/cruds/shift.png";
import users from "@/assets/cruds/users.png";
import activeSchedule from "@/assets/cruds/activeSchedule.png";
import activeDepartment from "@/assets/cruds/activeDepartment.png";
import activeLocation from "@/assets/cruds/activeLocation.png";
import activePosition from "@/assets/cruds/activePosition.png";
import activeRole from "@/assets/cruds/activeRole.png";
import activeShift from "@/assets/cruds/activeShift.png";
import activeUsers from "@/assets/cruds/activeUsers.png";
import {
  Dropdown,
  DropdownButton,
  DropdownItem,
  DropdownMenu,
} from "@/components/catalyst/dropdown";
import Schedule from "@/components/tabs/schedule";
import TableFooter from "@/components/tableFooter";
import Search from "@/components/search";
import Leaves from "@/components/tabs/leaves";
import swap from "@/assets/cruds/swap.png";
import activeSwap from "@/assets/cruds/activeSwap.png";
import SwapRequests from "@/components/tabs/swapRequests";

const tabs = [
  {
    name: "Swap Requests",
    img: swap,
    active: activeSwap,
    component: (props: any) => <SwapRequests {...props} />,
  },
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
    component: (props: any) => <Shifts {...props} />,
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
  {
    name: "Leaves",
    img: users,
    active: activeUsers,
    component: (props: any) => <Leaves {...props} />,
  },
];

const Page = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedTab, setSelectedTab] = useState(tabs[9]);

  return (
    <Suspense fallback={<div>Loading...</div>}>
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
                <div className="h-full w-full rounded-[5px] relative py-2 px-4 bg-[#F7F8F7] flex hover:bg-[#E8EBE9]">
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
                        src={
                          selectedTab.name === tab.name ? tab.active : tab.img
                        }
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
            <Search />
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
        <TableFooter />
      </div>
    </Suspense>
  );
};

export default Page;
