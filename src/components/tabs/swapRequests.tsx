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
import SwapRequestAdd from "../modals/swapRequestAdd";
import SwapMessage from "../modals/swapMessage";
import fetchWithToken from "@/utils/api";
import moment from "moment";
import DeleteModal from "../modals/deleteModal";
import grayArrowDown from "@/assets/grayArrowDown.png";
import { useRouter, useSearchParams } from "next/navigation";
import { updateQueryParams } from "@/lib";

interface SwapRequestsProps {
  isModalVisible: boolean | SwapRequest;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean | SwapRequest>>;
}

const badgeColors: Array<
  | "blue"
  | "cyan"
  | "fuchsia"
  | "green"
  | "indigo"
  | "lime"
  | "orange"
  | "pink"
  | "purple"
  | "red"
  | "teal"
  | "violet"
  | "yellow"
  | "amber"
  | "emerald"
  | "sky"
  | "rose"
  | "zinc"
> = [
  "red",
  "orange",
  "amber",
  "yellow",
  "lime",
  "green",
  "emerald",
  "teal",
  "cyan",
  "sky",
  "blue",
  "indigo",
  "violet",
  "purple",
  "fuchsia",
  "pink",
  "rose",
  "zinc",
];

const SwapRequests: React.FC<SwapRequestsProps> = ({
  isModalVisible,
  setModalVisible,
}) => {
  const { replace } = useRouter();
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1");
  const pageSize = parseInt(searchParams.get("pageSize") || "10");
  const search = searchParams.get("search") || "";
  const [swapRequests, setSwapRequests] = useState<SwapRequest[]>([]);
  const [deleteRequestModal, setDeleteRequestModal] = useState<
    boolean | string | number
  >(false);
  const [isMsgTxt, setMsgTxt] = useState<string>("");
  const [content, setContent] = useState<string>("");

  const fetchSwapRequests = async () => {
    try {
      const data = await fetchWithToken(
        `/swaprequest/list?page=${page}&pageSize=${pageSize}&search=${search}`,
        {
          method: "GET",
        }
      );
      setSwapRequests(data?.content?.swapRequest);
      updateQueryParams(
        {
          totalPages: data?.content?.totalPages?.toString(),
          totalCount: data?.content?.totalCount?.toString(),
        },
        replace
      );
      console.log("data", data);
    } catch (error) {
      console.error("Failed to fetch swap requests:", error);
    }
  };

  useEffect(() => {
    fetchSwapRequests();
  }, [page, pageSize, search]);

  return (
    <>
      <SwapRequestAdd
        isModalVisible={isModalVisible}
        setModalVisible={setModalVisible}
        fetchSwapRequests={fetchSwapRequests}
      />
      <SwapMessage isMsgTxt={isMsgTxt} setMsgTxt={setMsgTxt} />
      <DeleteModal
        route="swaprequest"
        content={content}
        visibilityState={deleteRequestModal}
        setState={setDeleteRequestModal}
        fetchAllCall={fetchSwapRequests}
      />
      <Table className={"relative mt-5"}>
        <TableHead>
          <TableRow className="bg-[#F7F8F7]">
            <TableHeader className="!outline-none !border-b-0">
              <div className="flex items-center">
                User From
                <Image src={grayArrowDown} alt="" className="w-5 h-5 ml-2" />
              </div>
            </TableHeader>
            <TableHeader className="!outline-none !border-b-0">
              <div className="flex items-center">
                User To
                <Image src={grayArrowDown} alt="" className="w-5 h-5 ml-2" />
              </div>
            </TableHeader>
            <TableHeader className="!outline-none !border-b-0">
              <div className="flex items-center">
                Schedule From
                <Image src={grayArrowDown} alt="" className="w-5 h-5 ml-2" />
              </div>
            </TableHeader>
            <TableHeader className="!outline-none !border-b-0">
              <div className="flex items-center">
                Schedule To
                <Image src={grayArrowDown} alt="" className="w-5 h-5 ml-2" />
              </div>
            </TableHeader>
            <TableHeader className="!outline-none !border-b-0">
              <div className="flex items-center">
                Status
                <Image src={grayArrowDown} alt="" className="w-5 h-5 ml-2" />
              </div>
            </TableHeader>
            <TableHeader className="!outline-none !border-b-0">
              <div className="flex items-center">
                Message
                <Image src={grayArrowDown} alt="" className="w-5 h-5 ml-2" />
              </div>
            </TableHeader>
            <TableHeader className="!outline-none !border-b-0"></TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {swapRequests?.map((swapRequest) => (
            <TableRow key={swapRequest?.id}>
              <TableCell className="!outline-none !border-b-0">
                <div className="flex items-center max-w-min">
                  <Image
                    alt="profile"
                    src={swapRequest?.ByProfile?.image || dp}
                    className="w-[36px]"
                    width={40}
                    height={40}
                  />
                  <div className="flex flex-col justify-center ml-3">
                    <div className="text-[16px] font-[600] mt-0">
                      {swapRequest?.ByProfile?.name}
                    </div>
                  </div>
                </div>
              </TableCell>
              <TableCell className="!outline-none !border-b-0">
                <div className="flex items-center">
                  <Image
                    alt="profile"
                    src={swapRequest?.ToProfile?.image || dp}
                    className="w-[36px]"
                    width={40}
                    height={40}
                  />
                  <div className="flex flex-col justify-center ml-3">
                    <div className="text-[16px] font-[600] mt-0">
                      {swapRequest?.ToProfile?.name}
                    </div>
                  </div>
                </div>
              </TableCell>
              <TableCell className="!outline-none !border-b-0">
                <div>
                  {moment(
                    swapRequest?.OriginalSchedule?.StartDate?.full_date
                  ).format("MMMM Do YYYY")}
                </div>
                <div>
                  {moment(
                    swapRequest?.OriginalSchedule?.EndDate?.full_date
                  ).format("MMMM Do YYYY")}
                </div>
              </TableCell>
              <TableCell className="!outline-none !border-b-0">
                <div>
                  {moment(
                    swapRequest?.RequestedSchedule?.StartDate?.full_date
                  ).format("MMMM Do YYYY")}
                </div>
                <div>
                  {moment(
                    swapRequest?.RequestedSchedule?.EndDate?.full_date
                  ).format("MMMM Do YYYY")}
                </div>
              </TableCell>
              <TableCell className="!outline-none !border-b-0">
                <div>{swapRequest?.status}</div>
              </TableCell>
              <TableCell className="!outline-none !border-b-0">
                <div
                  onClick={() => setMsgTxt(swapRequest?.message || "")}
                  className="cursor-pointer relative flex items-center justify-center max-w-[20px] ml-4"
                >
                  <Image
                    src={message}
                    alt="message"
                    className="w-[20px] absolute"
                  />
                  {!swapRequest?.message && (
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
                    setModalVisible(swapRequest);
                  }}
                  className="w-[60px] h-full flex justify-center items-center cursor-pointer"
                >
                  <Image alt="editIcon" src={editIcon} className="w-6 h-6" />
                </div>
                <div
                  onClick={() => {
                    setDeleteRequestModal(swapRequest?.id);
                    setContent(`request from ${swapRequest?.ByProfile?.name}`);
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
