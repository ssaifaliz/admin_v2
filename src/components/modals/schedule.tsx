"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Select, { SingleValue } from "react-select";
import * as Yup from "yup";
import { useFormik } from "formik";
import moment from "moment";
import "react-dropdown/style.css";
import fetchWithToken from "@/utils/api";
import AnimatedBtn from "../animatedBtn";
import dp from "@/assets/noProfile.svg";

interface User {
  id: number;
  username: string;
  password: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

interface Profile {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  contact: string;
  profilePicture: string | null;
  userId: number;
  deptId: number;
  positionId: number;
  roleId: number;
  createdAt: string;
  updatedAt: string;
  User: User;
  department: Department;
  position: Position;
  role: Role;
  value: number;
  label: string;
}

interface Shift {
  id: number;
  start_time: string;
  end_time: string;
  shift_type: string;
  value: number;
  label: string;
}

interface Department {
  id: number;
  dept_name: string;
  locationId: number;
  createdAt: string;
  updatedAt: string;
  location: Location;
  value: number;
  label: string;
}

interface scheduleProps {
  isModalVisible: boolean | string | number;
  setModalVisible: React.Dispatch<
    React.SetStateAction<boolean | string | number>
  >;
  fetchSchedules: () => void;
}

const ScheduleModal: React.FC<scheduleProps> = ({
  isModalVisible,
  setModalVisible,
  fetchSchedules,
}) => {
  const isAdd = isModalVisible === true;
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [shifs, setShifts] = useState<Shift[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [isDecline, setIsDecline] = useState<boolean>(false);
  const [status, setStatus] = useState<string>("");

  const formik = useFormik<{
    date: string;
    profileId: Profile | null;
    shiftId: Shift | null;
    deptId: SingleValue<{ value: number; label: string }> | null;
  }>({
    initialValues: {
      date: "",
      profileId: null,
      shiftId: null,
      deptId: null,
    },
    validationSchema: Yup.object({
      date: Yup.string().required("Required"),
      profileId: Yup.object().shape({
        value: Yup.number().required("Profile is required"),
        label: Yup.string().required("Profile is required"),
      }),
      shiftId: Yup.object().shape({
        value: Yup.number().required("Shift is required"),
        label: Yup.string().required("Shift is required"),
      }),
      deptId: Yup.object().shape({
        value: Yup.number().required("Department is required"),
        label: Yup.string().required("Department is required"),
      }),
    }),
    onSubmit: async (values) => {
      setStatus("onclic");
      try {
        await fetchWithToken(
          isAdd ? "/schedules" : `/schedules/${isModalVisible}`,
          {
            method: isAdd ? "POST" : "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              ...values,
              date: moment(values?.date).format("DD-MM-YYYY"),
              profileId: values?.profileId?.value,
              shiftId: values?.shiftId?.value,
              deptId: values?.deptId?.value,
            }),
          }
        );
        setStatus("success");
        setTimeout(() => {
          setModalVisible(!isModalVisible);
        }, 1250);
        fetchSchedules();
      } catch (error) {
        setStatus("fail");
        console.error("Error creating schedule:", error);
      }
    },
  });

  const getSceduleDetails = async (id: string | number) => {
    try {
      const data = await fetchWithToken(`/schedules/${id}`, {
        method: "GET",
      });
      formik?.setFieldValue("date", moment(data?.date).format("YYYY-MM-DD"));
      formik?.setFieldValue(
        "profileId",
        profiles?.filter((each) => each?.id === data?.profileId)[0]
      );
      formik?.setFieldValue(
        "shiftId",
        shifs?.filter((each) => each?.id === data?.shiftId)[0]
      );
      formik?.setFieldValue(
        "deptId",
        departments?.filter((each) => each?.id === data?.deptId)[0]
      );
    } catch (error) {
      console.error("Failed to fetch schedule:", error);
    }
  };

  const fetchProfiles = async () => {
    try {
      const data = await fetchWithToken("/profiles", {
        method: "GET",
      });

      setProfiles(
        data?.map((each: Profile) => ({
          ...each,
          value: each?.id,
          label: each?.email,
        }))
      );
    } catch (error) {
      console.error("Failed to fetch profiles:", error);
    }
  };

  const fetchShifts = async () => {
    try {
      const data = await fetchWithToken("/shifts", {
        method: "GET",
      });

      setShifts(
        data?.map((each: Shift) => ({
          ...each,
          value: each?.id,
          label: each?.start_time,
        }))
      );
    } catch (error) {
      console.error("Failed to fetch shifts:", error);
    }
  };

  const fetchDepartments = async () => {
    try {
      const data = await fetchWithToken("/departments", {
        method: "GET",
      });

      setDepartments(
        data?.map((each: Department) => ({
          ...each,
          value: each?.id,
          label: each?.dept_name,
        }))
      );
    } catch (error) {
      console.error("Failed to fetch departments:", error);
    }
  };

  useEffect(() => {
    formik?.resetForm();
    if (
      typeof isModalVisible === "number" ||
      typeof isModalVisible === "string"
    )
      getSceduleDetails(isModalVisible);
  }, [isModalVisible]);

  useEffect(() => {
    fetchProfiles();
    fetchShifts();
    fetchDepartments();
  }, []);

  const formatOptionLabel = (profile: Profile) => (
    <div className="flex items-center">
      <Image
        alt="profile"
        src={profile?.profilePicture || dp}
        className="w-[40px] rounded-full"
        width={6}
        height={6}
      />
      <div className="flex text-[14px] ml-1">
        <div className="mr-1">{profile?.first_name}</div>
        <div>{profile?.last_name}</div>
      </div>
    </div>
  );
  const formatShiftLabel = (shift: Shift) => (
    <div className="flex items-center">
      <div className="flex text-[14px] ml-1">
        <div className="mr-1 font-medium">{shift?.shift_type}</div>
        <div className="font-light">{`(${shift?.start_time})`}</div>
      </div>
    </div>
  );

  return (
    isModalVisible && (
      <main
        onClick={() => setModalVisible(!isModalVisible)}
        className="fixed top-0 bottom-0 left-0 right-0 bg-black bg-opacity-30 flex justify-center align-middle"
      >
        <div className="container my-auto">
          <div
            onClick={(e) => e?.stopPropagation()}
            className="py-5 max-w-[40%] h-[70%] m-auto w-[385px] capitalize p-5 bg-[#FFF] rounded-[8px] flex flex-col items-center overflow-y-scroll scrollbar-hidden"
          >
            <div className="text-center text-lg font-bold">edit schedule</div>
            <div className="text-sm text-[#101010]">
              <div className="font-bold">date</div>
              <input
                type="date"
                placeholder="Select date"
                name="date"
                required
                className="w-[350px] h-[40px] border placeholder-[#5D6561] rounded-[8px] p-2 my-2 outline-none"
                id="date"
                onChange={formik?.handleChange}
                onBlur={formik?.handleBlur}
                value={formik?.values?.date}
                style={{
                  borderColor:
                    formik?.touched?.date && formik?.errors?.date
                      ? "#E23121"
                      : "#5D6561",
                }}
              />
              <div className="text-[12px] text-[#E23121] flex items-center h-[25px]">
                {formik?.touched?.date && formik?.errors?.date && (
                  <div>{formik?.errors?.date}</div>
                )}
              </div>
              <div className="font-bold">profile</div>
              <Select
                formatOptionLabel={formatOptionLabel}
                options={profiles}
                value={formik?.values?.profileId}
                name="profileId"
                onChange={(option) => formik.setFieldValue("profileId", option)}
                onBlur={formik.handleBlur}
                className="w-[350px] h-[40px] my-2"
              />
              <div className="text-[12px] text-[#E23121] flex items-center h-[25px]">
                {formik?.touched?.profileId && formik?.errors?.profileId && (
                  <div>{formik?.errors?.profileId}</div>
                )}
              </div>
              <div className="font-bold">shift</div>
              <Select
                formatOptionLabel={formatShiftLabel}
                options={shifs}
                value={formik.values.shiftId}
                name="shiftId"
                onChange={(option) => formik.setFieldValue("shiftId", option)}
                onBlur={formik.handleBlur}
                className="w-[350px] h-[40px] my-2"
              />
              <div className="text-[12px] text-[#E23121] flex items-center h-[25px]">
                {formik?.touched?.shiftId && formik?.errors?.shiftId && (
                  <div>{formik?.errors?.shiftId}</div>
                )}
              </div>
              <div className="font-bold">departement</div>
              <Select
                options={departments}
                value={formik.values.deptId || "Select departement ..."}
                name="deptId"
                onChange={(option) => formik.setFieldValue("deptId", option)}
                onBlur={formik.handleBlur}
                className="w-[350px] h-[40px] my-2"
              />
              <div className="text-[12px] text-[#E23121] flex items-center h-[25px]">
                {formik?.touched?.deptId && formik?.errors?.deptId && (
                  <div>{formik?.errors?.deptId}</div>
                )}
              </div>
            </div>
            <div className="w-[350px] flex justify-between">
              <button
                type="button"
                onClick={() => {
                  setModalVisible(!isModalVisible);
                  setIsDecline(true);
                }}
                className={`w-[168px] h-[40px] rounded-[8px] border border-[#05A5FB] text-[#50C2FF] hover:border-[#50C2FF] hover:text-[#50C2FF] ${
                  isDecline ? "text-[#70CDFF] border-[#70CDFF]" : ""
                } text-[16px] font-[700] px-[24px] py-[8px]`}
              >
                Cancel
              </button>
              <div className="w-[168px]">
                <AnimatedBtn
                  txt="Confirm"
                  status={status}
                  setStatus={setStatus}
                  onClick={(e: any) => {
                    formik.handleSubmit();
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    )
  );
};

export default ScheduleModal;
