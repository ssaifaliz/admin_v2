"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import {
  Dropdown,
  DropdownButton,
  DropdownItem,
  DropdownMenu,
} from "./catalyst/dropdown";
import arrowIcon from "@/assets/Arrows.svg";
import { useRouter, useSearchParams } from "next/navigation";
import { updateQueryParams } from "@/lib";

const TableFooter = () => {
  const { replace } = useRouter();
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1");
  const pageSize = parseInt(searchParams.get("pageSize") || "10");
  const totalPages = parseInt(searchParams.get("totalPages") || "1");
  const totalCount = parseInt(searchParams.get("totalCount") || "1");
  useEffect(() => {
    updateQueryParams(
      {
        page: page?.toString(),
        totalPages: totalPages?.toString(),
        pageSize: pageSize?.toString(),
      },
      replace
    );
  }, [page, totalPages, pageSize]);
  return (
    <div className="w-full h-[60px]">
      <div className="flex items-center justify-between bg-[#F7F8F7] rounded-lg shadow-md px-6 py-2 w-full h-full">
        <div className="flex items-center">
          <span className="text-[14px] text-[#101010] font-semibold">Rows</span>
          <Dropdown>
            <div className="ml-2 flex items-center border border-gray-300 bg-white rounded">
              <DropdownButton
                className="cursor-pointer w-[54px] h-[30px]"
                style={{ background: "white" }}
              >
                <span className=" text-[#101010] text-[14px] font-semibold">
                  {pageSize}
                </span>
                <Image
                  src={arrowIcon}
                  alt="arrow icon"
                  className="ml-1 w-4 h-4 rotate-90"
                />
              </DropdownButton>
              <DropdownMenu
                className="bg-[white] cursor-pointer"
                style={{
                  backgroundColor: "white",
                }}
              >
                {[5, 10, 15, 20]?.map((each) => (
                  <DropdownItem
                    key={each}
                    className="cursor-pointer "
                    onClick={() =>
                      updateQueryParams({ pageSize: each.toString() }, replace)
                    }
                  >
                    {each}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </div>
          </Dropdown>
        </div>

        <div className="text-[14px] font-semibold text-center text-[#101010]">
          {`Items ${(page - 1) * pageSize + 1} - ${Math.min(
            page * pageSize,
            totalCount
          )} of ${totalCount}`}
        </div>

        <div className="flex items-center">
          <button
            className="ml-2 text-gray-500"
            onClick={() => {
              if (page > 1)
                updateQueryParams({ page: (page - 1)?.toString() }, replace);
            }}
          >
            <Image src={arrowIcon} alt="arrow icon" className="w-4 h-4" />
          </button>
          <button
            className="text-gray-500"
            onClick={() => {
              if (page < totalPages)
                updateQueryParams({ page: (page + 1)?.toString() }, replace);
            }}
          >
            <Image
              src={arrowIcon}
              alt="arrow icon"
              className="rotate-180 w-4 h-4"
            />
          </button>

          <span className="text-[14px] font-semibold mr-2 text-[#101010]">
            {`Page ${page} of ${totalPages}`}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TableFooter;
