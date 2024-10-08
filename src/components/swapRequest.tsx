import React, { useState } from "react";
import Image from "next/image";
import fetchWithToken from "@/utils/api";
import calender from "@/assets/calender.png";
import request from "@/assets/request.png";
import editIcon from "@/assets/editIcon.png";
import moment from "moment";
import AnimatedBtn from "./animatedBtn";
import clock from "@/assets/time-line.svg";

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
  setModalVisible,
}: {
  each: SwapRequest;
  fetchSwapRequests: any;
  setModalVisible?: any;
}) => {
  const [statusDecline, setStatusDecline] = useState<string>("");
  const [statusAccept, setStatusAccept] = useState<string>("");
  console.log(each);
  const handleStatus = async (statusType: string, values: any) => {
    console.log(values, "valuesssssssss");
    try {
      const response = await fetchWithToken(`/swaprequest/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: values.id,
          requested_by: values?.requested_by,
          original_schedule_id: values?.original_schedule_id,
          requested_to: values?.requested_to,
          requested_schedule_id: values?.requested_schedule_id,
          message: values?.message,
          status: statusType,
        }),
      });
      console?.log("response", response);
      fetchSwapRequests();
      if (statusType === "APPROVED") {
        setStatusAccept("success");
      } else {
        setStatusDecline("success");
      }
    } catch (error) {
      console.error("Error creating swap request:", error);
      setStatusDecline("fail");
    }
  };
  return (
    <div
      className="bg-[#f7f8f7] rounded-[8px] w-[410px] max-h-[250px] flex flex-col justify-between m-2 p-3 py-4"
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
      <div className="w-full flex items-center justify-between mt-1 gap-3">
        {each.status.toLowerCase() != "pending" && (
          <div
            className={`rounded-md bg-[rgb(5_165_251)] text-white w-full text-center py-2 font-semibold`}
          >
            {each.status}
          </div>
        )}
        {each.status.toLowerCase() == "pending" && (
          <>
            <AnimatedBtn
              secondary={true}
              txt="Decline"
              status={statusDecline}
              setStatus={setStatusDecline}
              className="w-[150px] text-[16px] font-[700]"
              onClick={async () => {
                setStatusDecline("onclic");
                handleStatus("REJECTED", each);
              }}
            />
            <AnimatedBtn
              txt="Accept"
              className="w-[150px] text-[16px] font-[700]"
              setStatus={setStatusAccept}
              status={statusAccept}
              onClick={async () => {
                setStatusAccept("onclic");
                handleStatus("APPROVED", each);
              }}
            />
          </>
        )}
        <div className="w-[60px] h-[40px] rounded-[8px] border border-1 border-[#05A5FB] text-[#05A5FB] text-[16px] font-[700] flex items-center justify-center cursor-pointer">
          <Image
            alt="requestBtn"
            src={editIcon}
            className="w-[30px]"
            onClick={() => {
              setModalVisible(each);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Request;
