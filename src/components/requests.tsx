import React, { useEffect, useState } from "react";
import Image from "next/image";
import warn from "@/assets/Warning3.png";
import MultiSelect from "./multiSelect";
import search from "@/assets/search.png";
import fetchWithToken from "@/utils/api";
import calender from "@/assets/calender.png";
import request from "@/assets/request.png";
import requestBtn from "@/assets/requestBtn.png";
import moment from "moment";
import Tooltip from "./tooltip";
import AnimatedBtn from "./animatedBtn";
import clock from "@/assets/time-line.svg";

interface Option {
  name: string;
  value: string;
}

const formatTimeDifference = (createdDateTime: string) => {
  const createdMoment = moment(createdDateTime);
  const now = moment();
  let minutes = now.diff(createdMoment, "minutes");
  let hours = Math.floor(minutes / 60);
  let days = Math.floor(hours / 24);

  return days >= 1
    ? `${days} days ago`
    : hours >= 1
    ? `${hours} hours ago`
    : minutes > 0
    ? `${minutes} minutes ago`
    : "now";
};

const Request = ({
  each,
  fetchSwapRequests,
}: {
  each: SwapRequest;
  fetchSwapRequests: any;
}) => {
  const [statusDecline, setStatusDecline] = useState<string>("");
  const [statusAccept, setStatusAccept] = useState<string>("");
  return (
    <div
      className="bg-[#f7f8f7] rounded-[8px] w-full max-h-[250px] flex flex-col justify-between my-2 p-3 py-4"
      key={each?.id}
    >
      <div className="w-full flex items-center justify-between mb-4">
        <div className="flex items-center">
          {/* <Tooltip
            text={`${each?.first_name_from} ${
              each?.last_name_from
            } had a shift ${formatTimeDifference(each?.created_datetime)}`}
          >
            <div className="mr-2">
              <Image alt="warn" src={warn} className="w-[23px]" />
            </div>
          </Tooltip> */}

          <div className="text-[18px] font-[700]">{`${each?.ByProfile?.name}`}</div>
          <div className="text-[14px] font-[400] ml-2 text-[#5d6561]">
            {/* {index % 2 === 0 ? "requested a day off" : "Requested a Shift Swap"} */}
            {"add proper text here"}
          </div>
        </div>
        <div className="text-[14px] font-[600]">
          {formatTimeDifference(each?.created_at)}
        </div>
      </div>
      <div className="flex justify-between mb-3">
        <div className="h-[50px] w-[160px] flex flex-col justify-between">
          <div className="text-[12px] text-[#5d6561]">from</div>
          <div className="text-[12px] flex items-center w-full">
            <Image alt="calender" src={calender} className="w-[13px]" />
            <div className="text-[16px] ml-3">
              {moment(each?.OriginalSchedule?.StartDate?.full_date).format(
                "ddd, DD MMM YYYY"
              )}
            </div>
          </div>
          <div className="text-[12px] flex items-center w-full">
            <Image alt="clock" src={clock} className="w-[14px]" />
            <div className="text-[16px] ml-3">
              {moment(new Date(), "HH:mm:ss")?.format("h:mm A")}
            </div>
          </div>
        </div>
        <div className="h-[50px] w-[160px] flex flex-col justify-between">
          <div className="text-[12px] text-[#5d6561]">to</div>
          <div className="text-[12px] flex items-center w-full">
            <Image alt="calender" src={calender} className="w-[13px]" />
            <div className="text-[16px] ml-3">
              {moment(each?.RequestedSchedule?.StartDate?.full_date).format(
                "ddd, DD MMM YYYY"
              )}
            </div>
          </div>
          <div className="text-[12px] flex items-center w-full">
            <Image alt="clock" src={clock} className="w-[14px]" />
            <div className="text-[16px] ml-3">
              {moment(new Date(), "HH:mm:ss")?.format("h:mm A")}
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center mb-3">
        <Image alt="request" src={request} className="w-[14px]" />
        <div className="text-[16px] ml-2 text-[#5d6561]">
          {each?.message || "No Message"}
        </div>
      </div>
      <div className="w-full flex items-center justify-between mt-1">
        <AnimatedBtn
          secondary={true}
          txt="Decline"
          status={statusDecline}
          setStatus={setStatusDecline}
          className="w-[150px] text-[16px] font-[700]"
          onClick={async () => {
            setStatusDecline("onclic");
            try {
              const data = await fetchWithToken(
                `/swapRequests/rejectswap/${each?.id}`,
                {
                  method: "POST",
                }
              );
              fetchSwapRequests();
              setStatusDecline("success");
            } catch (error) {
              console.error("Failed to fetch swap requests:", error);
              setStatusDecline("fail");
            }
          }}
        />
        <AnimatedBtn
          txt="Accept"
          className="w-[150px] text-[16px] font-[700]"
          setStatus={setStatusAccept}
          status={statusAccept}
          onClick={async () => {
            setStatusAccept("onclic");
            try {
              const data = await fetchWithToken(
                `/swapRequests/acceptswap/${each?.id}`,
                {
                  method: "POST",
                }
              );
              fetchSwapRequests();
              setStatusAccept("success");
            } catch (error) {
              console.error("Failed to fetch swap requests:", error);
              setStatusAccept("fail");
            }
          }}
        />
        <div className="w-[60px] h-[40px] rounded-[8px] border border-1 border-[#05A5FB] text-[#05A5FB] text-[16px] font-[700] flex items-center justify-center cursor-pointer">
          <Image alt="requestBtn" src={requestBtn} className="w-[16px]" />
        </div>
      </div>
    </div>
  );
};

const Requests = () => {
  const [swapRequests, setSwapRequests] = useState<SwapRequest[]>([]);
  const [selectedDepartments, setSelectedDepartments] = useState<Option[]>([]);
  const [filterText, setFilterText] = useState("");

  const fetchSwapRequests = async () => {
    try {
      const data = await fetchWithToken("/swaprequest/list", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("data", data);
      setSwapRequests(data?.content?.swapRequest);
    } catch (error) {
      console.error("Failed to fetch swap requests:", error);
    }
  };
  // const swapRequestsFilter = (data: any) => {
  //   let arr = data;
  //   if (selectedDepartments?.length) {
  //     arr = arr?.filter((item: any) =>
  //       selectedDepartments?.some(
  //         (dept) =>
  //           item?.scheduleFrom?.deptId?.toString() ===
  //             dept?.value?.toString() ||
  //           item?.scheduleFrom?.deptId?.toString() === dept?.value?.toString()
  //       )
  //     );
  //   }

  //   setSwapRequests(arr);
  // };

  useEffect(() => {
    console.log(selectedDepartments);
    fetchSwapRequests();
  }, [selectedDepartments]);

  return (
    <div
      className="max-w-[410px] min-w-[410px] max-h-full"
      // style={{ border: "10px solid red" }}
    >
      <div
        className="flex items-center justify-between my-2"
        // style={{ border: "10px solid green" }}
      >
        <div className="h-[40px] w-[196px] flex items-center justify-center rounded-[8px] border border-1 border-[#7e8581]">
          <input
            type="text"
            placeholder="Search"
            className="w-[70%] text-[14px] outline-none"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setFilterText(event.target.value);
            }}
            value={filterText}
          />
          <Image alt="search" src={search} className="w-[17px]" />
        </div>
        <MultiSelect
          selectedOptions={selectedDepartments}
          setSelectedOptions={setSelectedDepartments}
        />
      </div>
      <div className="text-[24px] font-[700]">Requests</div>
      <div className="overflow-y-scroll scrollbar-hidden max-h-[85%]">
        {swapRequests?.map((each, index) => (
          <Request
            each={each}
            key={each?.id}
            fetchSwapRequests={fetchSwapRequests}
          />
        ))}
      </div>
    </div>
  );
};

export default Requests;
