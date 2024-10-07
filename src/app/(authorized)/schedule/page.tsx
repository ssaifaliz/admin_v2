"use client";
import React from "react";
import Requests from "@/components/requests";
import ScheduleTable from "@/components/scheduleTable";

const Page = () => (
  <div className="w-full flex flex-1 h-[90%] overflow-hidden">
    <div className="flex flex-col min-w-[50%] max-w-full w-full">
      <ScheduleTable />
    </div>
  </div>
);

export default Page;
