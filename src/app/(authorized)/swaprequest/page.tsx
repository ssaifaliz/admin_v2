"use client";
import React from "react";
import Requests from "@/components/requestsPage";
import ScheduleTable from "@/components/scheduleTable";

const Page = () => (
  <div
    className="w-full flex flex-1 h-[90%] overflow-hidden"
    style={{ border: "10px solid red" }}
  >
    <Requests />
  </div>
);

export default Page;
