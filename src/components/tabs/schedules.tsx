import React, { useEffect, useState } from "react";
import Image from "next/image";
import moment from "moment";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../catalyst/table";
import fetchWithToken from "@/utils/api";
import DeleteModal from "../modals/deleteModal";
import ScheduleModal from "../modals/schedule";
import editIcon from "@/assets/editIcon.png";
import deleteIcon from "@/assets/deleteIcon.png";
import grayArrowDown from "@/assets/grayArrowDown.png";

interface Location {
  id: number;
  hospital_name: string;
  addr_one: string;
  addr_two: string;
  city: string;
  state: string;
  country: string;
  postal_code: number;
  createdAt: string;
  updatedAt: string;
}

interface Department {
  id: number;
  dept_name: string;
  locationId: number;
  createdAt: string;
  updatedAt: string;
  location: Location;
}

interface Position {
  id: number;
  position_name: string;
  createdAt: string;
  updatedAt: string;
}

interface Role {
  id: number;
  role: string;
  code_name: string;
  createdAt: string;
  updatedAt: string;
}

interface Shift {
  id: number;
  start_time: string;
  end_time: string;
  shift_type: string;
}

interface Schedule_dept {
  city: string;
  dept_name: string;
  deptid: number;
  hospitalname: string;
  state: string;
}

interface Schedule {
  id: number;
  date: string;
  deptId: number;
  shift: Shift;
  schedule_dept: Schedule_dept;
}

interface Schedule {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  contact: string;
  birthdate: string | null;
  profilePicture: string | null;
  userId: number;
  deptId: number;
  positionId: number;
  roleId: number;
  createdAt: string;
  updatedAt: string;
  department: Department;
  position: Position;
  role: Role;
  schedules: Schedule[];
}

interface scheduleProps {
  isModalVisible: boolean | string | number;
  setModalVisible: React.Dispatch<
    React.SetStateAction<boolean | string | number>
  >;
}

const Schedules: React.FC<scheduleProps> = ({
  isModalVisible,
  setModalVisible,
}) => {
  const [content, setContent] = useState<string>("");
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [deleteScheduleModal, setDeleteScheduleModal] = useState<
    boolean | number | string
  >(false);

  const fetchSchedules = async () => {
    try {
      const data = await fetchWithToken("/dashboard/allschedule", {
        method: "POST",
      });
      setSchedules(data);
      console.log("data", data);
    } catch (error) {
      console.error("Failed to fetch schedules:", error);
    }
  };

  useEffect(() => {
    fetchSchedules();
  }, []);

  return (
    <>
      <Table className={"relative mt-5"}>
        <TableHead>
          <TableRow className="bg-[#F7F8F7]">
            <TableHeader className="!outline-none !border-b-0">
              <div className="flex items-center">
                Doctor
                {<Image src={grayArrowDown} alt="" className="w-5 h-5 ml-2" />}
              </div>
            </TableHeader>
            <TableHeader className="!outline-none !border-b-0">
              <div className="flex items-center">
                Date
                {<Image src={grayArrowDown} alt="" className="w-5 h-5 ml-2" />}
              </div>
            </TableHeader>
            <TableHeader className="!outline-none !border-b-0">
              <div className="flex items-center">
                Shift
                {<Image src={grayArrowDown} alt="" className="w-5 h-5 ml-2" />}
              </div>
            </TableHeader>
            <TableHeader className="!outline-none !border-b-0">
              <div className="flex items-center">
                Department
                {<Image src={grayArrowDown} alt="" className="w-5 h-5 ml-2" />}
              </div>
            </TableHeader>
            <TableHeader className="!outline-none !border-b-0"></TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {schedules?.length &&
            schedules?.map((each) =>
              each?.schedules?.map((each2) => {
                return (
                  <TableRow key={each2?.id}>
                    <TableCell className="!outline-none !border-b-0">
                      <div className="flex items-center max-w-min">
                        <div className="flex flex-col justify-center">
                          <div className="text-[16px] font-[600] mt-0">
                            {`${each?.first_name} ${each?.last_name}`}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="!outline-none !border-b-0">
                      <div className="flex items-center max-w-min">
                        <div className="flex flex-col justify-center">
                          <div className="text-[16px] font-[600] mt-0">
                            {each2?.date}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="!outline-none !border-b-0">
                      <div className="flex items-center max-w-min">
                        <div className="flex flex-col justify-center">
                          <div className="text-[16px] font-[600] mt-0">
                            {`${moment(
                              each2?.shift?.start_time,
                              "HH:mm:ss.SSS"
                            )?.format("hh:mm:ss A")}
                         - 
                         ${moment(
                           each2?.shift?.end_time,
                           "HH:mm:ss.SSS"
                         )?.format("hh:mm:ss A")}`}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="!outline-none !border-b-0">
                      <div className="flex items-center max-w-min">
                        <div className="flex flex-col justify-center">
                          <div className="text-[16px] font-[600] mt-0">
                            {each2?.schedule_dept?.dept_name}
                          </div>
                        </div>
                      </div>
                    </TableCell>

                    <TableCell className="!outline-none !border-b-0 w-[120px] flex float-right">
                      <div
                        onClick={() => {
                          setModalVisible(each2?.id);
                        }}
                        className="w-[60px] h-full flex justify-center items-center cursor-pointer"
                      >
                        <Image
                          alt="editIcon"
                          src={editIcon}
                          className="w-6 h-6"
                        />
                      </div>
                      <div
                        onClick={() => {
                          setDeleteScheduleModal(each2?.id);
                          setContent(each2?.date);
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
                );
              })
            )}
        </TableBody>
      </Table>
      <ScheduleModal
        isModalVisible={isModalVisible}
        setModalVisible={setModalVisible}
        fetchSchedules={fetchSchedules}
      />
      <DeleteModal
        route="schedules"
        content={content}
        visibilityState={deleteScheduleModal}
        setState={setDeleteScheduleModal}
        fetchAllCall={fetchSchedules}
      />
    </>
  );
};

export default Schedules;
