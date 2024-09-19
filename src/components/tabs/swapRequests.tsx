import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../catalyst/table";
import Image from "next/image";
import dp from "@/assets/noProfile.svg";
import editIcon from "@/assets/editIcon.png";
import deleteIcon from "@/assets/deleteIcon.png";
import message from "@/assets/message.png";
import close from "@/assets/close.png";
// import SwapRequest from "../modals/swapRequest";
// import SwapMessage from "../modals/swapMessage";
import fetchWithToken from "@/utils/api";
import moment from "moment";
// import DeleteModal from "../modals/deleteModal";
import grayArrowDown from "@/assets/grayArrowDown.png";

interface Profile {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  contact: string;
  birthdate: string | null;
  profilePicture: string | null;
  emp_id: number;
  userId: number;
  deptId: number;
  positionId: number;
  roleId: number;
  createdAt: string;
  updatedAt: string;
}

interface Schedule {
  id: number;
  date: string;
  profileId: number;
  shiftId: number;
  deptId: number;
  createdAt: string;
  updatedAt: string;
  profile: Profile | null;
}

interface SwapRequest {
  id: number;
  schedule_from: number;
  schedule_to: number;
  req_message: string;
  accepted: boolean;
  priority: number | null;
  notes: string | null;
  createdswap: boolean;
  status: string;
  createdAt: string;
  updatedAt: string;
  scheduleFrom: Schedule;
  scheduleTo: Schedule;
}

interface SwapRequestsProps {
  isModalVisible: boolean | string | number;
  setModalVisible: React.Dispatch<
    React.SetStateAction<boolean | string | number>
  >;
}

const SwapRequests: React.FC<SwapRequestsProps> = ({
  isModalVisible,
  setModalVisible,
}) => {
  const [swapRequests, setSwapRequests] = useState<SwapRequest[]>([]);
  const [deleteRequestModal, setDeleteRequestModal] = useState<
    boolean | string | number
  >(false);
  const [isMsgTxt, setMsgTxt] = useState<string>("");
  const [content, setContent] = useState<string>("");

  const fetchSwapRequests = async () => {
    try {
      const data = await fetchWithToken("/swaprequests", {
        method: "GET",
      });
      setSwapRequests(data?.length ? data : []);
      console.log("data", data);
    } catch (error) {
      console.error("Failed to fetch swap requests:", error);
    }
  };

  useEffect(() => {
    fetchSwapRequests();
  }, []);

  return (
    <>
      {/* <SwapRequest
        isModalVisible={isModalVisible}
        setModalVisible={setModalVisible}
        fetchSwapRequests={fetchSwapRequests}
      />
      <SwapMessage isMsgTxt={isMsgTxt} setMsgTxt={setMsgTxt} />
      <DeleteModal
        route="swaprequests"
        content={content}
        visibilityState={deleteRequestModal}
        setState={setDeleteRequestModal}
        fetchAllCall={fetchSwapRequests}
      /> */}
      <Table className={"relative mt-5"}>
        <TableHead>
          <TableRow className="bg-[#F7F8F7]">
            <TableHeader className="!outline-none !border-b-0">
              <div className="flex items-center">
                From
                {<Image src={grayArrowDown} alt="" className="w-5 h-5 ml-2" />}
              </div>
            </TableHeader>
            <TableHeader className="!outline-none !border-b-0">
              <div className="flex items-center">
                To
                {<Image src={grayArrowDown} alt="" className="w-5 h-5 ml-2" />}
              </div>
            </TableHeader>
            <TableHeader className="!outline-none !border-b-0">
              <div className="flex items-center">
                From
                {<Image src={grayArrowDown} alt="" className="w-5 h-5 ml-2" />}
              </div>
            </TableHeader>
            <TableHeader className="!outline-none !border-b-0">
              <div className="flex items-center">
                To
                {<Image src={grayArrowDown} alt="" className="w-5 h-5 ml-2" />}
              </div>
            </TableHeader>
            <TableHeader className="!outline-none !border-b-0">
              <div className="flex items-center">
                Status
                {<Image src={grayArrowDown} alt="" className="w-5 h-5 ml-2" />}
              </div>
            </TableHeader>
            <TableHeader className="!outline-none !border-b-0">
              <div className="flex items-center">
                Message
                {<Image src={grayArrowDown} alt="" className="w-5 h-5 ml-2" />}
              </div>
            </TableHeader>
            <TableHeader className="!outline-none !border-b-0"></TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {swapRequests?.map((swapRequest, index) => (
            <TableRow key={swapRequest?.id}>
              <TableCell className="!outline-none !border-b-0">
                {swapRequest?.scheduleFrom?.profile ? (
                  <div className="flex items-center max-w-min">
                    <Image
                      alt="profile"
                      src={
                        swapRequest?.scheduleFrom?.profile?.profilePicture || dp
                      }
                      className="w-[36px]"
                      width={40}
                      height={40}
                    />
                    <div className="flex flex-col justify-center ml-3">
                      <div className="text-[16px] font-[600] mt-0">
                        {`${swapRequest?.scheduleFrom?.profile?.first_name} ${swapRequest?.scheduleFrom?.profile?.last_name}`}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div>no profile</div>
                )}
              </TableCell>
              <TableCell className="!outline-none !border-b-0">
                {swapRequest?.scheduleTo?.profile ? (
                  <div className="flex items-center">
                    <Image
                      alt="profile"
                      src={
                        swapRequest?.scheduleTo?.profile?.profilePicture || dp
                      }
                      className="w-[36px]"
                      width={40}
                      height={40}
                    />
                    <div className="flex flex-col justify-center ml-3">
                      <div className="text-[16px] font-[600] mt-0">
                        {`${swapRequest?.scheduleTo?.profile?.first_name} ${swapRequest?.scheduleTo?.profile?.last_name}`}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div>no profile</div>
                )}
              </TableCell>
              <TableCell className="!outline-none !border-b-0">
                <div>
                  {moment(swapRequest?.scheduleFrom?.date).format(
                    "MMMM Do YYYY"
                  )}
                </div>
                <div>
                  {moment(swapRequest?.scheduleFrom?.date, "HH:mm:ss").format(
                    "hh:mm A"
                  )}
                </div>
              </TableCell>
              <TableCell className="!outline-none !border-b-0">
                <div>
                  {moment(swapRequest?.scheduleTo?.date).format("MMMM Do YYYY")}
                </div>
                <div>
                  {moment(swapRequest?.scheduleTo?.date, "HH:mm:ss").format(
                    "hh:mm A"
                  )}
                </div>
              </TableCell>
              <TableCell className="!outline-none !border-b-0">
                <div>{swapRequest?.status}</div>
              </TableCell>
              <TableCell className="!outline-none !border-b-0">
                <div
                  onClick={() => setMsgTxt(swapRequest?.req_message || "")}
                  className="cursor-pointer relative flex items-center justify-center max-w-[20px] ml-4"
                >
                  <Image
                    src={message}
                    alt="message"
                    className="w-[20px] absolute"
                  />
                  {!swapRequest?.req_message && (
                    <Image
                      src={close}
                      alt="message"
                      className="w-[10px] absolute"
                    />
                  )}
                </div>
              </TableCell>
              <TableCell className="!outline-none !border-b-0 w-[120px] flex float-right">
                <div
                  onClick={() => {
                    setModalVisible(swapRequest?.id);
                  }}
                  className="w-[60px] h-full flex justify-center items-center cursor-pointer"
                >
                  <Image alt="editIcon" src={editIcon} className="w-6 h-6" />
                </div>
                <div
                  onClick={() => {
                    setDeleteRequestModal(swapRequest?.id);
                    setContent(
                      `request from ${swapRequest?.scheduleFrom?.profile?.first_name} ${swapRequest?.scheduleFrom?.profile?.last_name}`
                    );
                  }}
                  className="w-[60px] h-full flex justify-center items-center cursor-pointer"
                >
                  <Image
                    alt="deleteIcon"
                    src={deleteIcon}
                    className="w-6 h-6"
                  />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default SwapRequests;
