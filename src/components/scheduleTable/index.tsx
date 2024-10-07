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
import twoUsers from "@/assets/twoUsers.png";
import flight from "@/assets/flight.png";
import hospital from "@/assets/hospital.png";
import "./style.css";
import { WeekPicker } from "../weekpicker";
import moment from "moment";
import fetchWithToken from "@/utils/api";
import MultiSelect from "../multiSelect";

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
  const fetchSchedule = async (dateFrom: string, dateTo: string) => {
    try {
      const data = await fetchWithToken(
        `/user/schedule/list?start_date=${dateFrom}&end_date=${dateTo}`,
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
    console.log("week", week);
    if (!week?.firstDay || !week?.lastDay) return;
    fetchSchedule(
      moment(new Date(week?.firstDay)).utc().startOf("day").toISOString(),
      moment(new Date(week?.lastDay)).utc().startOf("day").toISOString()
    );
  }, [week]);
  return (
    <div className="h-full">
      <div className="flex items-center my-2 h-[40px]">
        <div className="text-[24px] font-[700] mr-[10%]">{displayMonth}</div>
        <WeekPicker onChange={(e: any) => setWeek(e)} />
        <MultiSelect
        // selectedOptions={selectedDepartments}
        // setSelectedOptions={setSelectedDepartments}
        />
      </div>
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
                  <div className="w-full h-[22px] mt-[5px] flex items-center justify-between">
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
                  </div>
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
