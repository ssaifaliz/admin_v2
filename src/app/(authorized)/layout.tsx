"use client";
import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SubLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="flex w-full h-[100vh] justify-around overflow-hidden py-2">
      <Sidebar />
      <div className="bg-[#fdfdff] rounded-[16px] min-w-[90%] max-w-[93%] flex flex-col justify-between py-1 flex-1">
        <Header />
        <div className="flex flex-1 w-full h-full px-2 overflow-hidden border-t border-t-[#e8ebe9] pt-2 mt-2">
          {children}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SubLayout;
