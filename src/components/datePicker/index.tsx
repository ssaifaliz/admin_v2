import Image from "next/image";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import calenderIcon from "../../assets/calender.png";

export default function DatePickerCalender({
  prefilledDates,
  name,
  placeholder,
  handleDateChange,
  selectedDateValue,
}: {
  prefilledDates: PrefilledDate[];
  name: string;
  placeholder: string;
  handleDateChange: any;
  selectedDateValue: any;
}) {
  console.log(selectedDateValue, "selectedDateValue");
  const [selectedDate, setSelectedDate] = useState<any>(
    selectedDateValue ? new Date(selectedDateValue) : null
  );

  useEffect(() => {
    if (selectedDateValue) {
      setSelectedDate(new Date(selectedDateValue));
    } else {
      setSelectedDate(null);
    }
  }, [selectedDateValue]);

  const isDateAvailable = (date: any) => {
    return prefilledDates.some(
      (availableDate: any) =>
        availableDate.full_date.toDateString() === date.toDateString()
    );
  };

  const onDateChange = (date: Date | null) => {
    setSelectedDate(date);
    if (date) {
      const selected = prefilledDates.find(
        (availableDate: any) =>
          new Date(availableDate.full_date).toDateString() ===
          date.toDateString()
      );
      const dateId = selected ? selected.id : null;
      handleDateChange(dateId);
    } else {
      handleDateChange(null);
    }
  };
  return (
    <div>
      <DatePicker
        selected={selectedDate}
        onChange={onDateChange}
        showIcon
        filterDate={isDateAvailable}
        placeholderText={placeholder}
        name={name}
        className="w-full border border-[hsl(0,_0%,_80%)] !p-[4px_10px_7px_25px] focus:outline-none rounded-md text-black text-[15px]"
        wrapperClassName="w-full"
        icon={
          <Image
            src={calenderIcon}
            alt="calender Icon"
            className="!p-[8px_12px_6px_5px]"
          />
        }
      />
    </div>
  );
}
