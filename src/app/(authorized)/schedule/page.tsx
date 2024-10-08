"use client";
import React, { Suspense } from "react";
import ScheduleTable from "@/components/scheduleTable";

const Page = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <div className="w-full flex flex-1 h-[90%] overflow-hidden">
      <div className="flex flex-col min-w-[50%] max-w-full w-full">
        <ScheduleTable />
      </div>
    </div>
  </Suspense>
);

export default Page;
