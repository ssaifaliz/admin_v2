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
import editIcon from "@/assets/editIcon.png";
import deleteIcon from "@/assets/deleteIcon.png";
import DeleteModal from "../modals/deleteModal";
import Shift from "../modals/shift";
import fetchWithToken from "@/utils/api";
import moment from "moment";
import grayArrowDown from "@/assets/grayArrowDown.png";

interface Shifts {
  id: number;
  start_time: string;
  end_time: string;
  shift_type: string;
}

interface ShiftProps {
  isModalVisible: boolean | string | number;
  setModalVisible: React.Dispatch<
    React.SetStateAction<boolean | string | number>
  >;
}

const Shifts: React.FC<ShiftProps> = ({ isModalVisible, setModalVisible }) => {
  const [content, setContent] = useState<string>("");
  const [shifts, setShifts] = useState<Shifts[]>([]);
  const [deleteRequestModal, setDeleteRequestModal] = useState<
    boolean | string | number
  >(false);

  const fetchShifts = async () => {
    try {
      const data = await fetchWithToken("/shifts", {
        method: "GET",
      });
      setShifts(data);
      console.log("data", data);
    } catch (error) {
      console.error("Failed to fetch shifts:", error);
    }
  };

  useEffect(() => {
    fetchShifts();
  }, []);

  return (
    <>
      <Shift
        isModalVisible={isModalVisible}
        setModalVisible={setModalVisible}
        fetchShifts={fetchShifts}
      />
      <DeleteModal
        route="shifts"
        content={content}
        visibilityState={deleteRequestModal}
        setState={setDeleteRequestModal}
        fetchAllCall={fetchShifts}
      />
      <Table className={"relative mt-5"}>
        <TableHead>
          <TableRow className="bg-[#F7F8F7]">
            <TableHeader className="!outline-none !border-b-0">
              <div className="flex items-center">
                Start Time
                {<Image src={grayArrowDown} alt="" className="w-5 h-5 ml-2" />}
              </div>
            </TableHeader>
            <TableHeader className="!outline-none !border-b-0">
              <div className="flex items-center">
                End Time
                {<Image src={grayArrowDown} alt="" className="w-5 h-5 ml-2" />}
              </div>
            </TableHeader>
            <TableHeader className="!outline-none !border-b-0">
              <div className="flex items-center">
                Shift Type
                {<Image src={grayArrowDown} alt="" className="w-5 h-5 ml-2" />}
              </div>
            </TableHeader>
            <TableHeader className="!outline-none !border-b-0"></TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {shifts?.map((shift) => {
            const { id, start_time, end_time } = shift;
            return (
              <TableRow key={id}>
                <TableCell className="!outline-none !border-b-0">
                  <div className="flex items-center max-w-min">
                    <div className="flex flex-col justify-center">
                      <div className="text-[16px] font-[600] mt-0">
                        {moment(start_time, "HH:mm:ss.SSS").format("h:mm:ss A")}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="!outline-none !border-b-0">
                  <div className="flex items-center max-w-min">
                    <div className="flex flex-col justify-center">
                      <div className="text-[16px] font-[600] mt-0">
                        {moment(end_time, "HH:mm:ss.SSS").format("h:mm:ss A")}
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
                      setModalVisible(id);
                    }}
                    className="w-[60px] h-full flex justify-center items-center cursor-pointer"
                  >
                    <Image alt="editIcon" src={editIcon} className="w-6 h-6" />
                  </div>
                  <div
                    onClick={() => setDeleteRequestModal(id)}
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
            );
          })}
        </TableBody>
      </Table>
    </>
  );
};

export default Shifts;
