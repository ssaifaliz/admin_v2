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
  const currentPage = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "10");
  const totalPages = parseInt(searchParams.get("totalPages") || "1");
  const [pages, setPages] = useState<number[]>([]);
  const [page, setPage] = useState<number>(currentPage);
  useEffect(() => {
    const tempTotal = totalPages;
    const tempArr = [];
    for (let i = 1; i <= tempTotal; i++) tempArr.push(i);
    setPages(tempArr);
  }, [totalPages]);
  useEffect(() => {
    updateQueryParams(
      {
        page: page?.toString(),
        totalPages: totalPages?.toString(),
        limit: limit?.toString(),
      },
      replace
    );
  }, [page, totalPages, limit]);
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
                  {totalPages}
                </span>
                <Image
                  src={arrowIcon}
                  alt="arrow icon"
                  className="ml-1 w-4 h-4 rotate-90"
                />
              </DropdownButton>
              <DropdownMenu
                className="bg-[white] cursor-pointer  overflow-hidden"
                style={{
                  backgroundColor: "white",
                }}
              >
                {pages?.map((each) => (
                  <DropdownItem key={each} className="cursor-pointer ">
                    {each}
                  </DropdownItem>
                ))}
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
  );
};

export default TableFooter;
