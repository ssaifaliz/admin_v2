"use client";
import React, { Suspense } from "react";
import RequestsWrapper from "@/components/requestsWrapper";

const Page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RequestsWrapper />
    </Suspense>
  );
};

export default Page;
