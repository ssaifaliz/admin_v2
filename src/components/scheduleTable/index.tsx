import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/catalyst/table";
import calenderDark from "@/assets/calenderDark.png";
import Image from "next/image";
// import twoUsers from "@/assets/twoUsers.png";
// import flight from "@/assets/flight.png";
// import hospital from "@/assets/hospital.png";
import "./style.css";
import { WeekPicker } from "../weekpicker";
import moment from "moment";
import fetchWithToken from "@/utils/api";
import whitePlus from "@/assets/whitePlus.png";
import Leave from "../modals/leave";
import ScheduleModal from "../modals/schedule";
import { useSearchParams } from "next/navigation";
import SearchFilters from "../searchFIlters";

const colors = [
  "#c0b0ff",
  "#a5eebe",
  "#fcee71",
  "#f6abd8",
  "#f28585",
  "#fdd484",
  "#b8d9ff",
];

const ScheduleTable = () => {
  const searchParams = useSearchParams();
  const shift_id = searchParams.get("Shifts");
  const user_id = searchParams.get("Profiles");
  const department_id = searchParams.get("Departments");

  const [isScheduleModalVisible, setScheduleModalVisible] =
    useState<any>(false);
  const [isLeaveModalVisible, setLeaveModalVisible] = useState<any>(false);
  const [week, setWeek] = useState<any>();
  const [schedule, setSchedule] = useState<ScheduleInterface[]>();

  const firstDay = moment(week?.firstDay);
  const lastDay = moment(week?.lastDay);
  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const weekDates = daysOfWeek.map((_, index) =>
    firstDay.clone().add(index, "days")
  );

  let displayMonth;
  if (firstDay.isSame(lastDay, "month")) {
    // Same month
    displayMonth = firstDay.format("MMMM YYYY");
  } else if (firstDay.isSame(lastDay, "year")) {
    // Different months, same year
    displayMonth = `${firstDay.format("MMMM")} - ${lastDay.format(
      "MMMM YYYY"
    )}`;
  } else {
    // Different months and different years
    displayMonth = `${firstDay.format("MMMM YYYY")} - ${lastDay.format(
      "MMMM YYYY"
    )}`;
  }
  const fetchSchedule = async () => {
    try {
      const data = await fetchWithToken(
        `/user/schedule/list?start_date=${moment(new Date(week?.firstDay))
          ?.utc()
          ?.startOf("day")
          ?.toISOString()}&end_date=${moment(new Date(week?.lastDay))
          ?.utc()
          ?.startOf("day")
          ?.toISOString()}&user_id=[${user_id || []}]&shift_id=[${
          shift_id || []
        }]&department_id=[${department_id || []}]`,
        {
          method: "GET",
        }
      );
      setSchedule(data?.content?.user);
    } catch (error) {
      console.error("Failed to fetch locations:", error);
    }
  };

  useEffect(() => {
    if (!week?.firstDay || !week?.lastDay) return;
    fetchSchedule();
  }, [week, user_id, department_id, shift_id]);
  return (
    <div className="h-full">
      <Leave
        isModalVisible={isLeaveModalVisible}
        setModalVisible={setLeaveModalVisible}
        fetchLeaves={() => fetchSchedule()}
      />
      <ScheduleModal
        isModalVisible={isScheduleModalVisible}
        setModalVisible={setScheduleModalVisible}
        fetchSchedules={() => fetchSchedule()}
      />
      <div className="flex items-center my-2 h-[40px]">
        <div className="text-[24px] w-[335px] font-[700] mr-[10px]">
          {displayMonth}
        </div>
        <WeekPicker onChange={(e: any) => setWeek(e)} />
        <button
          type="button"
          onClick={() => setScheduleModalVisible(!isScheduleModalVisible)}
          className="bg-[#05A5FB] hover:bg-[#50C2FF] w-[180px] h-[40px] rounded-[8px] text-[16px] font-[700] flex items-center justify-center text-[#fff] mx-[10px]"
        >
          Schedule
          <Image src={whitePlus} alt="+" className="w-3 h-3 ml-3" />
        </button>
        <button
          type="button"
          onClick={() => setLeaveModalVisible(!isLeaveModalVisible)}
          className="bg-[#05A5FB] hover:bg-[#50C2FF] w-[180px] h-[40px] rounded-[8px] text-[16px] font-[700] flex items-center justify-center text-[#fff] mx-[10px]"
        >
          Leave
          <Image src={whitePlus} alt="+" className="w-3 h-3 ml-3" />
        </button>
      </div>
      <SearchFilters />
      <div className="overflow-y-scroll scrollbar-hidden h-[90%]">
        <Table className={""}>
          <TableHead>
            <TableRow className={""}>
              <TableHeader
                style={{
                  border: 0,
                  padding: 0,
                }}
                className={"w-[100px]"}
              >
                <div className="flex justify-center">
                  <Image
                    alt="calenderDark"
                    src={calenderDark}
                    className="w-[20px]"
                  />
                </div>
              </TableHeader>
              {weekDates.map((date, index) => (
                <TableHeader
                  key={daysOfWeek[index] + index}
                  className="w-[120px]"
                  style={{
                    border: 0,
                    padding: 5,
                  }}
                >
                  <div className="w-full text-[black] h-[76px] flex flex-col items-center justify-center rounded-4px bg-[#f7f8f7]">
                    <div className="text-[16px] font-[600]">
                      {daysOfWeek[index]}
                    </div>
                    <div className="text-[24px] font-[500] mt-1">
                      {date.format("DD")}
                    </div>
                  </div>
                  {/* keep this for future */}
                  {/* <div className="w-full h-[22px] mt-[5px] flex items-center justify-between">
                    <div className="bg-[#f7f8f7] h-full w-[32px] flex items-center justify-around rounded-[2px]">
                      <Image
                        alt="twoUsers"
                        src={twoUsers}
                        className="w-[9px]"
                      />
                      <div className="text-[12px]">14</div>
                    </div>
                    <div className="bg-[#f7f8f7] h-full w-[32px] flex items-center justify-around rounded-[2px]">
                      <Image alt="flight" src={flight} className="w-[9px]" />
                      <div className="text-[12px]">2</div>
                    </div>
                    <div className="bg-[#f7f8f7] h-full w-[32px] flex items-center justify-around rounded-[2px]">
                      <Image
                        alt="hospital"
                        src={hospital}
                        className="w-[9px]"
                      />
                      <div className="text-[12px]">1</div>
                    </div>
                  </div> */}
                </TableHeader>
              ))}
            </TableRow>
          </TableHead>
          <TableBody className="cursor-pointer">
            {schedule?.map((each: any, index) => (
              <TableRow key={index}>
                <TableCell
                  style={{ border: 0, padding: 0 }}
                  className={"bg-[#f7f8f7] font-[600] text-[12px]"}
                >
                  <div className="h-[50px] pl-3 w-[100px] flex flex-wrap items-center">
                    <div className="mr-1">{each?.name}</div>
                  </div>
                </TableCell>
                {weekDates?.map((val, index) => (
                  <TableCell
                    key={index}
                    style={{
                      border: 0,
                      padding: 0,
                    }}
                  >
                    {each?.Schedules?.filter(
                      (schdl: any) =>
                        moment(schdl?.StartDate?.full_date)?.format("DD") ===
                        val?.format("DD")
                    )?.length ? (
                      each?.Schedules?.filter(
                        (schdl: any) =>
                          moment(schdl?.StartDate?.full_date)?.format("DD") ===
                          val?.format("DD")
                      )?.map((schdl: any) => (
                        <div
                          key={schdl?.id}
                          className="flex items-center justify-center"
                        >
                          <div
                            style={{
                              background: colors[index],
                              opacity: val?.diff(moment(), "d") < 0 ? 0.3 : 0.9,
                            }}
                            className={`rounded-[3px] w-full h-[60px] italic flex flex-col justify-center pl-3 m-1 relative`}
                          >
                            <div className="font-[600] text-[14px]">
                              {each?.Department?.name}
                            </div>
                            <div className="text-[12px]">{`${moment(
                              schdl?.StartDate?.full_date,
                              "HH:mm:ss"
                            ).format("ha")} - ${moment(
                              schdl?.EndDate?.full_date,
                              "HH:mm:ss"
                            ).format("ha")}`}</div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="flex items-center justify-center">
                        <div
                          className={`bg-[#f7f8f7] rounded-[3px] w-full h-[60px] italic flex flex-col justify-center pl-3 m-1 relative`}
                        />
                      </div>
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ScheduleTable;
