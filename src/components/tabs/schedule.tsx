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
import PermissionModal from "../modals/permissionModal";
import deleteIcon from "@/assets/deleteIcon.png";
import grayArrowDown from "@/assets/grayArrowDown.png";

interface ScheduleProps {
  isModalVisible: boolean | string | number;
  setModalVisible: React.Dispatch<
    React.SetStateAction<boolean | string | number>
  >;
}

const Schedule: React.FC<ScheduleProps> = ({
  isModalVisible,
  setModalVisible,
}) => {
  const [content, setContent] = useState<string>("");
  const [schedule, setSchedule] = useState<Schedule[]>([]);
  //   const [deleteDepartmentModal, setDeleteDepartmentModal] = useState<
  //     boolean | number | string
  //   >(false);

  const fetchSchedule = async () => {
    try {
      const data = await fetchWithToken("/schedule/list", {
        method: "GET",
      });
      setSchedule(data?.content?.shift);
    } catch (error) {
      console.error("Failed to fetch shift:", error);
    }
  };

  useEffect(() => {
    fetchSchedule();
  }, []);

  return (
    <>
      <Table className={"relative mt-5"}>
        <TableHead>
          <TableRow className="bg-[#F7F8F7]">
            <TableHeader className="!outline-none !border-b-0">
              <div className="flex items-center">
                Shift ID
                <Image src={grayArrowDown} alt="" className="w-5 h-5 ml-2" />
              </div>
            </TableHeader>
            <TableHeader className="!outline-none !border-b-0">
            <div className="flex items-center">
                User ID
                <Image src={grayArrowDown} alt="" className="w-5 h-5 ml-2" />
              </div>
            </TableHeader>
            <TableHeader className="!outline-none !border-b-0">
            <div className="flex items-center">
                Worked Hours
                <Image src={grayArrowDown} alt="" className="w-5 h-5 ml-2" />
              </div>
            </TableHeader>
            <TableHeader className="!outline-none !border-b-0">
            <div className="flex items-center">
                Over Time Hours
                <Image src={grayArrowDown} alt="" className="w-5 h-5 ml-2" />
              </div>
            </TableHeader>
            <TableHeader></TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {schedule?.map((schedule) => (
            <TableRow key={schedule?.id}>
              <TableCell className="!outline-none !border-b-0">
                <div className="flex items-center max-w-min">
                  <div className="flex flex-col justify-center">
                    <div className="text-[16px] font-[600] mt-0">
                      {/* {schedule?.name} */}
                      <h1>schedule name</h1>
                    </div>
                  </div>
                </div>
              </TableCell>
              <TableCell className="!outline-none !border-b-0">
                <div className="flex items-center max-w-min">
                  <div className="flex flex-col justify-center">
                    <div className="text-[16px] font-[600] mt-0">
                      {/* {schedule?.description} */}
                      <h1>jdsh</h1>
                    </div>
                  </div>
                </div>
              </TableCell>

              {/* <TableCell className="!outline-none !border-b-0 w-[120px] flex float-right">
                <div
                //   onClick={() => {
                //     setDeleteDepartmentModal(department?.id);
                //     setContent(department?.name);
                //   }}
                  className="w-[60px] h-full flex justify-center items-center cursor-pointer"
                >
                  <Image
                    alt="deleteIcon"
                    src={deleteIcon}
                    className="w-6 h-6"
                  />
                </div>
              </TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/* <PermissionModal
        isModalVisible={isModalVisible}
        setModalVisible={setModalVisible}
        fetchPermissions={fetchPermissions}
      /> */}
      {/* <DeleteModal
        route="department"
        content={content}
        visibilityState={deleteDepartmentModal}
        setState={setDeleteDepartmentModal}
        fetchAllCall={fetchDepartments}
      /> */}
    </>
  );
};

export default Schedule;
