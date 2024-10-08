import React, { useEffect, useState } from "react";
import SearchFilters from "@/components/searchFIlters";
import fetchWithToken from "@/utils/api";
import Request from "@/components/swapRequest";
import TableFooter from "@/components/tableFooter";
import { useSearchParams } from "next/navigation";
import whitePlus from "@/assets/whitePlus.png";
import Image from "next/image";
import SwapRequestAdd from "@/components/modals/swapRequestAdd";

const RequestsWrapper = () => {
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1");
  const pageSize = parseInt(searchParams.get("pageSize") || "10");
  const shift_id = searchParams.get("Shifts");
  const user_id = searchParams.get("Profiles");
  const department_id = searchParams.get("Departments");
  const [isModalVisible, setModalVisible] = useState<boolean | SwapRequest>(
    false
  );
  const [swapRequests, setSwapRequests] = useState<SwapRequest[]>([]);
  const fetchSwapRequests = async () => {
    try {
      const data = await fetchWithToken(
        `/swaprequest/list?page=${page}&pageSize=${pageSize}&user_id=[${
          user_id || []
        }]&shift_id=[${shift_id || []}]&department_id=[${department_id || []}]`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setSwapRequests(data?.content?.swapRequest);
    } catch (error) {
      console.error("Failed to fetch swap requests:", error);
    }
  };
  useEffect(() => {
    fetchSwapRequests();
  }, [page, pageSize, user_id, shift_id, department_id]);
  return (
    <div className="w-full flex flex-1 flex-col h-full justify-between overflow-hidden">
      <SwapRequestAdd
        isModalVisible={isModalVisible}
        setModalVisible={setModalVisible}
        fetchSwapRequests={fetchSwapRequests}
      />
      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => setModalVisible(!isModalVisible)}
          className="bg-[#05A5FB] hover:bg-[#50C2FF] w-[180px] h-[40px] rounded-[8px] text-[16px] font-[700] flex items-center justify-center text-[#fff] mx-[10px]"
        >
          Swap Request
          <Image src={whitePlus} alt="+" className="w-3 h-3 ml-3" />
        </button>
      </div>
      <SearchFilters />

      <div
        className="overflow-y-scroll scrollbar-hidden max-h-[85%] w-full h-full flex flex-wrap"
        // style={{ border: "10px solid green" }}
      >
        {swapRequests?.map((each, index) => (
          <Request
            each={each}
            key={each?.id}
            fetchSwapRequests={fetchSwapRequests}
            setModalVisible={setModalVisible}
          />
        ))}
      </div>

      <TableFooter />
    </div>
  );
};

export default RequestsWrapper;
