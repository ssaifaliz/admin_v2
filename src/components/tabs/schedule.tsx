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
import editIcon from "@/assets/editIcon.png";
import DeleteModal from "../modals/deleteModal";
import ScheduleModal from "../modals/schedule";
import moment from "moment";
import { useRouter, useSearchParams } from "next/navigation";
import { updateQueryParams } from "@/lib";

interface ScheduleProps {
  isModalVisible: boolean | Schedule;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean | Schedule>>;
}

const Schedule: React.FC<ScheduleProps> = ({
  isModalVisible,
  setModalVisible,
}) => {
  const { replace } = useRouter();
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1");
  const pageSize = parseInt(searchParams.get("pageSize") || "10");
  const search = searchParams.get("search") || "";
  const [content, setContent] = useState<string>("");
  const [schedule, setSchedule] = useState<Schedule[]>([]);
  const [deleteModal, setDeleteModal] = useState<boolean | number | string>(
    false
  );

  const fetchSchedule = async () => {
    try {
      const data = await fetchWithToken(
        `/schedule/list?page=${page}&pageSize=${pageSize}&search=${search}`,
        {
          method: "GET",
        }
      );
      setSchedule(data?.content?.schedule);
      updateQueryParams(
        {
          totalPages: data?.content?.totalPages?.toString(),
          totalCount: data?.content?.totalCount?.toString(),
        },
        replace
      );
    } catch (error) {
      console.error("Failed to fetch shift:", error);
    }
  };

  useEffect(() => {
    fetchSchedule();
  }, [page, pageSize, search]);

  return (
    <>
      <Table className={"relative mt-5"}>
        <TableHead>
          <TableRow className="bg-[#F7F8F7]">
            <TableHeader className="!outline-none !border-b-0">
              <div className="flex items-center">
                Profile
                <Image src={grayArrowDown} alt="" className="w-5 h-5 ml-2" />
              </div>
            </TableHeader>
            <TableHeader className="!outline-none !border-b-0">
              <div className="flex items-center">
                Schedule
                <Image src={grayArrowDown} alt="" className="w-5 h-5 ml-2" />
              </div>
            </TableHeader>
            <TableHeader className="!outline-none !border-b-0">
              <div className="flex items-center">
                Shift
                <Image src={grayArrowDown} alt="" className="w-5 h-5 ml-2" />
              </div>
            </TableHeader>
            <TableHeader className="!outline-none !border-b-0">
              <div className="flex items-center">
                Work Hours
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
                      {schedule?.Profile?.name}
                    </div>
                  </div>
                </div>
              </TableCell>
              <TableCell className="!outline-none !border-b-0">
                <div className="flex items-center max-w-min">
                  <div className="flex flex-col justify-center">
                    <div className="text-[16px] font-[600] mt-0">
                      {moment(schedule?.StartDate?.full_date)?.format("ll")}
                      {" - "}
                      {moment(schedule?.EndDate?.full_date)?.format("ll")}
                    </div>
                  </div>
                </div>
              </TableCell>
              <TableCell className="!outline-none !border-b-0">
                <div className="flex items-center max-w-min">
                  <div className="flex flex-col justify-center">
                    <div className="text-[16px] font-[600] mt-0">
                      {`${moment(
                        schedule?.Shift?.start_time,
                        "HH:mm:ss"
                      ).format("LT")} - ${moment(
                        schedule?.Shift?.end_time,
                        "HH:mm:ss"
                      ).format("LT")}`}
                    </div>
                  </div>
                </div>
              </TableCell>
              <TableCell className="!outline-none !border-b-0">
                <div className="flex items-center max-w-min">
                  <div className="flex flex-col justify-center">
                    <div className="text-[16px] font-[600] mt-0">
                      {schedule?.hours_worked}
                    </div>
                  </div>
                </div>
              </TableCell>
              <TableCell className="!outline-none !border-b-0 w-[120px] flex float-right">
                <div
                  onClick={() => {
                    setModalVisible(schedule);
                  }}
                  className="w-[60px] h-full flex justify-center items-center cursor-pointer"
                >
                  <Image alt="editIcon" src={editIcon} className="w-6 h-6" />
                </div>
                <div
                  onClick={() => {
                    setDeleteModal(schedule?.id);
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
      <ScheduleModal
        isModalVisible={isModalVisible}
        setModalVisible={setModalVisible}
        fetchSchedules={fetchSchedule}
      />
      <DeleteModal
        route="schedule"
        content={content}
        visibilityState={deleteModal}
        setState={setDeleteModal}
        fetchAllCall={fetchSchedule}
      />
    </>
  );
};

export default Schedule;
