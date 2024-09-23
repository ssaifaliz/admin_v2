import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../catalyst/table";
import fetchWithToken from "@/utils/api";
import Leave from "../modals/leave";
import DeleteModal from "../modals/deleteModal";
import editIcon from "@/assets/editIcon.png";
import deleteIcon from "@/assets/deleteIcon.png";
import grayArrowDown from "@/assets/grayArrowDown.png";

interface LeaveProps {
  isModalVisible: boolean | string | number;
  setModalVisible: React.Dispatch<
    React.SetStateAction<boolean | string | number>
  >;
}

const Leaves: React.FC<LeaveProps> = ({ isModalVisible, setModalVisible }) => {
  // const [content, setContent] = useState<string>("");
  const [leaves, setLeaves] = useState<any[]>([]);
  const [deleteRequestModal, setDeleteRequestModal] = useState<
    boolean | string | number
  >(false);

  const fetchLeaves = async () => {
    try {
      const data = await fetchWithToken("/leave", {
        method: "GET",
      });
      setLeaves(data);
      console.log("data", data);
    } catch (error) {
      console.error("Failed to fetch shifts:", error);
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);
  return (
    <>
      <Leave
        isModalVisible={isModalVisible}
        setModalVisible={setModalVisible}
        fetchLeaves={fetchLeaves}
      />
      <DeleteModal
        route="leave"
        visibilityState={deleteRequestModal}
        setState={setDeleteRequestModal}
        fetchAllCall={fetchLeaves}
      />
      <Table className={"relative mt-5"}>
        <TableHead>
          <TableRow className="bg-[#F7F8F7]">
            <TableHeader className="!outline-none !border-b-0">
              <div className="flex items-center">
                Start Date
                {<Image src={grayArrowDown} alt="" className="w-5 h-5 ml-2" />}
              </div>
            </TableHeader>
            <TableHeader className="!outline-none !border-b-0">
              <div className="flex items-center">
                End Date
                {<Image src={grayArrowDown} alt="" className="w-5 h-5 ml-2" />}
              </div>
            </TableHeader>
            <TableHeader className="!outline-none !border-b-0">
              <div className="flex items-center">
                Profile
                {<Image src={grayArrowDown} alt="" className="w-5 h-5 ml-2" />}
              </div>
            </TableHeader>
            <TableHeader className="!outline-none !border-b-0">
              <div className="flex items-center">
                Type
                {<Image src={grayArrowDown} alt="" className="w-5 h-5 ml-2" />}
              </div>
            </TableHeader>
            <TableHeader className="!outline-none !border-b-0">
              <div className="flex items-center">
                Status
                {<Image src={grayArrowDown} alt="" className="w-5 h-5 ml-2" />}
              </div>
            </TableHeader>
            <TableHeader className="!outline-none !border-b-0"></TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {leaves?.map((each, index) => (
            <TableRow key={index}>
              <TableCell className="!outline-none !border-b-0">
                <div className="flex items-center max-w-min">
                  <div className="flex flex-col justify-center">
                    <div className="text-[16px] font-[600] mt-0">
                      {each?.start_date}
                    </div>
                  </div>
                </div>
              </TableCell>
              <TableCell className="!outline-none !border-b-0">
                <div className="flex items-center max-w-min">
                  <div className="flex flex-col justify-center">
                    <div className="text-[16px] font-[600] mt-0">
                      {each?.end_date}
                    </div>
                  </div>
                </div>
              </TableCell>
              <TableCell className="!outline-none !border-b-0">
                <div className="flex items-center max-w-min">
                  <div className="flex flex-col justify-center">
                    <div className="text-[16px] font-[600] mt-0">
                      {`${each?.profile?.first_name} ${each?.profile?.last_name}`}
                    </div>
                  </div>
                </div>
              </TableCell>
              <TableCell className="!outline-none !border-b-0">
                <div className="flex items-center max-w-min">
                  <div className="flex flex-col justify-center">
                    <div className="text-[16px] font-[600] mt-0">
                      {each?.leave_type}
                    </div>
                  </div>
                </div>
              </TableCell>
              <TableCell className="!outline-none !border-b-0">
                <div className="flex items-center max-w-min">
                  <div className="flex flex-col justify-center">
                    <div className="text-[16px] font-[600] mt-0">
                      {each?.approved}
                    </div>
                  </div>
                </div>
              </TableCell>
              <TableCell className="!outline-none !border-b-0 w-[120px] flex float-right">
                <div
                  onClick={() => {
                    setModalVisible(each?.id);
                  }}
                  className="w-[60px] h-full flex justify-center items-center cursor-pointer"
                >
                  <Image alt="editIcon" src={editIcon} className="w-6 h-6" />
                </div>
                <div
                  onClick={() => setDeleteRequestModal(each?.id)}
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

export default Leaves;
