import React, { useEffect, useState } from "react";
import MultiSelect from "../multiSelect";
import fetchWithToken from "@/utils/api";

const SearchFilters = () => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [shifts, setShifts] = useState<Shift[]>([]);

  const fetchProfiles = async () => {
    try {
      const data = await fetchWithToken(`/user/list`, {
        method: "GET",
      });

      setProfiles(
        data?.content?.user?.map((each: Profile) => ({
          ...each,
          // name: each?.name,
          value: each?.id,
        }))
      );
      console.log("data", data);
    } catch (error) {
      console.error("Failed to fetch swap requests:", error);
    }
  };

  const fetchShifts = async () => {
    try {
      const data = await fetchWithToken(`/shift/list`, {
        method: "GET",
      });

      setShifts(
        data?.content?.shift?.map((each: Shift) => ({
          ...each,
          name: each?.shift_name,
          value: each?.id,
        }))
      );
      console.log("data", data);
    } catch (error) {
      console.error("Failed to fetch swap requests:", error);
    }
  };
  const fetchDepartments = async () => {
    try {
      const data = await fetchWithToken(`/department/list`, {
        method: "GET",
      });

      setDepartments(
        data?.content?.department?.map((each: Department) => ({
          ...each,
          // name: each?.name,
          value: each?.id,
        }))
      );
      console.log("data", data);
    } catch (error) {
      console.error("Failed to fetch swap requests:", error);
    }
  };

  useEffect(() => {
    fetchDepartments();
    fetchProfiles();
    fetchShifts();
  }, []);

  return (
    <div className="flex items-center my-8 w-full">
      <div className="text-[24px] font-[700] mr-[10%]">Search Filters</div>
      <MultiSelect options={departments} placeHolder={"Departments"} />
      <MultiSelect options={profiles} placeHolder={"Profiles"} />
      <MultiSelect options={shifts} placeHolder={"Shifts"} />
    </div>
  );
};

export default SearchFilters;
