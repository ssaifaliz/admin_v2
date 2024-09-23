import React, { useState, useEffect, FC } from "react";
import "./style.css";
import { v4 as uuidv4 } from "uuid";
import {
  addMonths,
  endOfWeek,
  startOfWeek,
  subMonths,
  getDaysInMonth,
  format,
  addWeeks,
  subWeeks,
} from "date-fns";
import leftArrow from "@/assets/leftArrow.png";
import rightArrow from "@/assets/rightArrow.png";
import Image from "next/image";

interface Week {
  firstDay: Date;
  lastDay: Date;
}

interface WeekPickerProps {
  onChange?: (week: Week) => void;
}

export const WeekPicker: FC<WeekPickerProps> = ({ onChange }) => {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(new Date());
  const [week, setWeek] = useState<Week>({
    firstDay: startOfWeek(new Date(), { weekStartsOn: 1 }),
    lastDay: endOfWeek(new Date(), { weekStartsOn: 1 }),
  });

  useEffect(() => {
    if (onChange) {
      onChange(week);
    }
  }, [week, onChange]);

  const isLeapYear = (): boolean => {
    const leapYear = new Date(new Date().getFullYear(), 1, 29);
    return leapYear.getDate() === 29;
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    let localDate: Date;

    if (target.id.includes("prev")) {
      localDate = new Date(date.setDate(1));
      setDate(new Date(date.setDate(1)));
    } else if (target.id.includes("next")) {
      localDate = new Date(date.setDate(getDaysInMonth(date)));
      setDate(new Date(date.setDate(getDaysInMonth(date))));
    } else {
      localDate = new Date(date.setDate(parseInt(target.id)));
      setDate(new Date(date.setDate(parseInt(target.id))));
    }

    const firstDay = startOfWeek(localDate, { weekStartsOn: 1 });
    const lastDay = endOfWeek(localDate, { weekStartsOn: 1 });
    setWeek({ firstDay, lastDay });
  };

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const days: any = {
    1: 31,
    2: isLeapYear() ? 29 : 28,
    3: 31,
    4: 30,
    5: 31,
    6: 30,
    7: 31,
    8: 31,
    9: 30,
    10: 31,
    11: 30,
    12: 31,
  };

  const renderDays = () => {
    const month = date.getMonth() + 1;
    const ar = [];

    for (let i = 1; i <= days[month]; i++) {
      const currentDate = new Date(date).setDate(i);
      let cName = "single-number ";

      if (
        new Date(week.firstDay).getTime() <= new Date(currentDate).getTime() &&
        new Date(currentDate).getTime() <= new Date(week.lastDay).getTime()
      ) {
        cName += "selected-week";
      }

      ar.push(
        <div
          key={uuidv4()}
          id={i.toString()}
          className={cName}
          onClick={handleClick}
        >
          {i}
        </div>
      );
    }

    const displayDate = new Date(date).setDate(1);
    let dayInTheWeek = new Date(displayDate).getDay();
    if (dayInTheWeek < 1) {
      dayInTheWeek = 7;
    }
    const prevMonth = [];
    let prevMonthDays = new Date(date).getMonth();
    if (prevMonthDays === 0) {
      prevMonthDays = 12;
    }
    for (let i = dayInTheWeek; i > 1; i--) {
      const previousMonth = new Date(date).setMonth(
        new Date(date).getMonth() - 1
      );
      const currentDate = new Date(previousMonth).setDate(
        days[prevMonthDays] - i + 2
      );
      let cName = "single-number other-month";
      const currentTime = new Date(currentDate).getTime();
      const firstTime = new Date(week.firstDay).getTime();
      const endTime = new Date(week.lastDay).getTime();
      if (currentTime >= firstTime && currentTime <= endTime) {
        cName = "single-number selected-week";
      }

      prevMonth.push(
        <div
          onClick={handleClick}
          key={uuidv4()}
          id={"prev-" + i}
          className={cName}
        >
          {days[prevMonthDays] - i + 2}
        </div>
      );
    }

    const nextMonth = [];
    let fullDays = 35;
    if ([...prevMonth, ...ar].length > 35) {
      fullDays = 42;
    }

    for (let i = 1; i <= fullDays - [...prevMonth, ...ar].length; i++) {
      let cName = "single-number other-month";
      const lastDay = week.lastDay.getTime();
      const lastDayOfMonth = new Date(
        new Date(date).setDate(getDaysInMonth(date))
      );

      if (
        lastDayOfMonth.getTime() <= lastDay &&
        week.firstDay.getMonth() === lastDayOfMonth.getMonth()
      ) {
        cName = "single-number selected-week";
      }

      nextMonth.push(
        <div
          onClick={handleClick}
          key={uuidv4()}
          id={"next-" + i}
          className={cName}
        >
          {i}
        </div>
      );
    }
    return [...prevMonth, ...ar, ...nextMonth];
  };

  const handleDate = (next: boolean) => {
    let localDate = new Date(date);
    if (next) {
      localDate = addMonths(localDate, 1);
    } else {
      localDate = subMonths(localDate, 1);
    }
    setDate(new Date(localDate));
  };

  const handleWeekChange = (next: boolean) => {
    let firstDay, lastDay;
    if (next) {
      firstDay = addWeeks(week.firstDay, 1);
      lastDay = addWeeks(week.lastDay, 1);
    } else {
      firstDay = subWeeks(week.firstDay, 1);
      lastDay = subWeeks(week.lastDay, 1);
    }
    setWeek({ firstDay, lastDay });
  };

  return (
    <div className="flex items-center">
      <div
        className="flex items-center justify-center w-[40px] h-[40px] rounded-[4px] bg-[#f7f8f7] cursor-pointer"
        onClick={() => handleWeekChange(false)}
      >
        <Image alt="leftArrow" src={leftArrow} className="w-[8px]" />
      </div>
      <div className="flex items-center justify-center w-[160px] h-[40px] rounded-[4px] bg-[#f7f8f7] mx-2 text-[16px] font-[600]">
        <div
          className="week-picker-display"
          onBlur={() => setOpen(false)}
          onClick={() => setOpen(true)}
          tabIndex={0}
        >
          <p>
            {format(new Date(week.firstDay), "d")} -{" "}
            {format(new Date(week.lastDay), "d MMM, yyyy")}
          </p>
          {open && (
            <div className="week-picker-options">
              <div className="title-week">
                <div
                  onClick={() => handleDate(false)}
                  className="arrow-container"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12.9419 3.30806C13.186 3.55214 13.186 3.94786 12.9419 4.19194L7.13388 10L12.9419 15.8081C13.186 16.0521 13.186 16.4479 12.9419 16.6919C12.6979 16.936 12.3021 16.936 12.0581 16.6919L5.80806 10.4419C5.56398 10.1979 5.56398 9.80214 5.80806 9.55806L12.0581 3.30806C12.3021 3.06398 12.6979 3.06398 12.9419 3.30806Z"
                    />
                  </svg>
                </div>
                {`${months[date.getMonth()]} ${date.getFullYear()}.`}
                <div
                  onClick={() => handleDate(true)}
                  className="arrow-container"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M7.05806 3.30806C7.30214 3.06398 7.69786 3.06398 7.94194 3.30806L14.1919 9.55806C14.436 9.80214 14.436 10.1979 14.1919 10.4419L7.94194 16.6919C7.69786 16.936 7.30214 16.936 7.05806 16.6919C6.81398 16.4479 6.81398 16.0521 7.05806 15.8081L12.8661 10L7.05806 4.19194C6.81398 3.94786 6.81398 3.55214 7.05806 3.30806Z"
                    />
                  </svg>
                </div>
              </div>
              <div className="numbers-container">
                <div className="single-number day">Mon</div>
                <div className="single-number day">Tue</div>
                <div className="single-number day">Wed</div>
                <div className="single-number day">Thu</div>
                <div className="single-number day">Fri</div>
                <div className="single-number day">Sat</div>
                <div className="single-number day">Sun</div>
              </div>
              <div className="numbers-container">{renderDays()}</div>
            </div>
          )}
        </div>
      </div>
      <div
        className="flex items-center justify-center w-[40px] h-[40px] rounded-[4px] bg-[#f7f8f7] cursor-pointer"
        onClick={() => handleWeekChange(true)}
      >
        <Image alt="rightArrow" src={rightArrow} className="w-[8px]" />
      </div>
    </div>
  );
};
