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
import editIcon from "@/assets/editIcon.png"
import deleteIcon from "@/assets/deleteIcon.png";
import DeleteModal from "../modals/deleteModal";
import grayArrowDown from "@/assets/grayArrowDown.png";

interface ShiftProps {
  isModalVisible: boolean | string | number;
  setModalVisible: React.Dispatch<
    React.SetStateAction<boolean | string | number>
  >;
}

const Shift: React.FC<ShiftProps> = ({ isModalVisible, setModalVisible }) => {
  const [content, setContent] = useState<string>("");
  const [shift, setShift] = useState<Shift[]>([]);
  const [deleteShiftModal, setDeleteShifttModal] = useState<
    boolean | number | string
  >(false);

  const fetchShift = async () => {
    try {
      const data = await fetchWithToken("/shift/list", {
        method: "GET",
      });
      setShift(data?.content?.shift);
    } catch (error) {
      console.error("Failed to fetch shift:", error);
    }
  };

  useEffect(() => {
    fetchShift();
  }, []);

  return (
    <>
      <Table className={"relative mt-5"}>
        <TableHead>
          <TableRow className="bg-[#F7F8F7]">
            <TableHeader className="!outline-none !border-b-0">
              <div className="flex items-center">
                Shift Name
                <Image src={grayArrowDown} alt="" className="w-5 h-5 ml-2" />
              </div>
            </TableHeader>
            <TableHeader className="!outline-none !border-b-0">
              <div className="flex items-center">
                Shift Type
                <Image src={grayArrowDown} alt="" className="w-5 h-5 ml-2" />
              </div>
            </TableHeader>
            <TableHeader></TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {shift?.map((shift) => (
            <TableRow key={shift?.id}>
              <TableCell className="!outline-none !border-b-0">
                <div className="flex items-center max-w-min">
                  <div className="flex flex-col justify-center">
                    <div className="text-[16px] font-[600] mt-0">
                      {shift?.shift_name}
                    </div>
                  </div>
                </div>
              </TableCell>
              <TableCell className="!outline-none !border-b-0">
                <div className="flex items-center max-w-min">
                  <div className="flex flex-col justify-center">
                    <div className="text-[16px] font-[600] mt-0">
                      {shift?.shift_type}
                    </div>
                  </div>
                </div>
              </TableCell>

              <TableCell className="!outline-none !border-b-0 w-[120px] flex float-right">
              <div
                    onClick={() => {
                      setModalVisible(shift?.id);
                    }}
                    className="w-[60px] h-full flex justify-center items-center cursor-pointer"
                  >
                    <Image alt="editIcon" src={editIcon} className="w-6 h-6" />
                  </div>
                <div
                  onClick={() => {
                    setDeleteShifttModal(shift?.id);
                    setContent(shift?.shift_name);
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
      <Shift
        isModalVisible={isModalVisible}
        setModalVisible={setModalVisible}
        // fetchShift={fetchShift}
      />
      <DeleteModal
        route="shift"
        content={content}
        visibilityState={deleteShiftModal}
        setState={setDeleteShifttModal}
        fetchAllCall={fetchShift}
      />
    </>
  );
};

export default Shift;
