"use client";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import Select from "react-select";
import fetchWithToken from "@/utils/api";
import Image from "next/image";
import dp from "@/assets/noProfile.svg";
import AnimatedBtn from "../animatedBtn";

interface SelectOption {
  value: string;
  label: string;
  id?: string | number | undefined;
}

interface SwapRequestFormValues {
  // profile_from: SelectOption | null;
  profile_to: Profile | null;
  schedule_to: SelectOption | null;
  schedule_from: SelectOption | null;
  req_message: string;
  status: SelectOption | null;
}

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

interface SwapRequestProps {
  isModalVisible: boolean | string | number;
  setModalVisible: React.Dispatch<
    React.SetStateAction<boolean | string | number>
  >;
  fetchSwapRequests: () => void;
}

const statusOptions = [
  { value: "pending", label: "Pending" },
  { value: "accepted", label: "Accepted" },
  { value: "rejected", label: "Rejected" },
];

const SwapRequest: React.FC<SwapRequestProps> = ({
  isModalVisible,
  setModalVisible,
  fetchSwapRequests,
}) => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [isDecline, setIsDecline] = useState<boolean>(false);
  const [status, setStatus] = useState<string>("");

  const isAdd = isModalVisible === true;

  const formik = useFormik<SwapRequestFormValues>({
    initialValues: {
      // profile_from: null,
      schedule_from: null,
      schedule_to: null,
      profile_to: null,
      req_message: "",
      status: null,
    },
    validationSchema: Yup?.object({
      schedule_to: Yup.object({
        value: Yup.string().required("Value is required"),
      }).required("This is required"),
      schedule_from: Yup.object({
        value: Yup.string().required("Value is required"),
      }).required("This is required"),
      req_message: Yup?.string(),
      status: Yup.object({
        value: Yup.string().required("Value is required"),
      }).required("This is required"),
    }),
    onSubmit: async (values) => {
      setStatus("onclic");
      try {
        const response = await fetchWithToken(
          isAdd ? "/swaprequests" : `/swaprequests/${isModalVisible}`,
          {
            method: isAdd ? "POST" : "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              schedule_from: values?.schedule_from?.value,
              schedule_to: values?.schedule_to?.value,
              req_message: values?.req_message,
              status: values?.status?.value,
            }),
          }
        );
        setStatus("success");
        setTimeout(() => {
          setModalVisible(!isModalVisible);
        }, 1250);
        console?.log("response", response);
        fetchSwapRequests();
      } catch (error) {
        setStatus("fail");
        console.error("Error creating swap request:", error);
      }
    },
  });

  const getSwapDetails = async (id: string | number) => {
    try {
      const data = await fetchWithToken(`/swaprequests/${id}`, {
        method: "GET",
      });
      formik?.setFieldValue(
        "schedule_from",
        schedules?.filter((each) => each?.id === data?.schedule_from)[0]
      );
      formik?.setFieldValue(
        "schedule_to",
        schedules?.filter((each) => each?.id === data?.schedule_to)[0]
      );
      formik?.setFieldValue("req_message", data?.req_message);
      formik?.setFieldValue(
        "status",
        statusOptions?.filter((each) => !!each?.value === data?.accepted)[0]
      );
      formik?.setFieldValue(
        "status",
        statusOptions?.filter((each) => each?.value === data?.status)[0]
      );
    } catch (error) {
      console.error("Failed to fetch swap requests:", error);
    }
  };
  const fetchSchedules = async () => {
    try {
      const data = await fetchWithToken("/schedules", {
        method: "GET",
      });

      setSchedules(
        data?.map((each: { id: number; date: string }) => ({
          ...each,
          value: each?.id,
          label: each?.date,
        }))
      );
    } catch (error) {
      console.error("Failed to fetch swap requests:", error);
    }
  };

  useEffect(() => {
    formik?.resetForm();
    if (
      typeof isModalVisible === "number" ||
      typeof isModalVisible === "string"
    )
      getSwapDetails(isModalVisible);
  }, [isModalVisible]);

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

  useEffect(() => {
    fetchSchedules();
    fetchProfiles();
  }, []);

  const formatOptionLabel = (schedule: Schedule) => (
    <div className="flex items-center">
      <Image
        alt="profile"
        src={schedule?.profile?.profilePicture || dp}
        className="w-[40px] rounded-full"
        width={10}
        height={10}
      />
      <div className="ml-1">
        <div className="font-[700]">{schedule?.label}</div>
        <div className="flex text-[14px]">
          <div>{`${schedule?.shift?.start_time} - ${schedule?.shift?.end_time}`}</div>
        </div>
        <div className="flex text-[14px]">
          <div className="mr-1">{schedule?.profile?.first_name}</div>
          <div>{schedule?.profile?.last_name}</div>
        </div>
      </div>
    </div>
  );

  return (
    isModalVisible && (
      <main
        className="fixed top-0 bottom-0 left-0 right-0 bg-black bg-opacity-30 flex justify-center align-middle z-[1]"
        onClick={() => setModalVisible(!isModalVisible)}
      >
        <div
          className="py-5 max-w-[40%] h-[70%] overflow-auto m-auto capitalize bg-[#FFF] rounded-[8px] flex flex-col items-center scrollbar-hidden"
          onClick={(e) => e?.stopPropagation()}
        >
          <div className="text-center text-lg font-bold">
            {!isAdd ? "Edit" : "Add"}
          </div>
          <div className="text-sm text-[#101010] w-full px-5">
            <div>
              {/* <div className="font-bold">Profile From</div>
            <Select
              options={profiles?.filter(
                (each) => each.id !== formik?.values?.profile_to?.id
              )}
              value={formik.values.profile_from}
              onChange={(option) => {
                console.log(option);
                formik.setFieldValue("profile_from", option);
                formik.setFieldValue("schedule_from", null);
              }}
              onBlur={() => formik.setFieldTouched("profile_from", true)}
              name="profile_from"
            />
            <div className="text-[12px] text-[#E23121] flex items-center h-[25px]">
              {formik?.touched?.profile_from &&
                formik?.errors?.profile_from && (
                  <div>{formik?.errors?.profile_from}</div>
                )}
            </div> */}
            </div>
            <div className="font-bold">Schedule From</div>
            <Select
              formatOptionLabel={formatOptionLabel}
              // components={{ Option: CustomOption }}
              options={schedules?.filter(
                (each) => each.id !== formik?.values?.schedule_to?.id
              )}
              // @ts-ignore
              value={formik.values.schedule_from}
              onChange={(option) =>
                formik.setFieldValue("schedule_from", option)
              }
              onBlur={() => formik.setFieldTouched("schedule_from", true)}
              name="schedule_from"
            />
            <div className="text-[12px] text-[#E23121] flex items-center h-[25px]">
              {formik?.touched?.schedule_from &&
                formik?.errors?.schedule_from && (
                  <div>{formik?.errors?.schedule_from}</div>
                )}
            </div>
            <div className="font-bold">Schedule To</div>
            <Select
              formatOptionLabel={formatOptionLabel}
              options={schedules?.filter(
                (each) => each.id !== formik?.values?.schedule_from?.id
              )}
              // @ts-ignore
              value={formik?.values?.schedule_to}
              onChange={(option) => formik.setFieldValue("schedule_to", option)}
              onBlur={() => formik.setFieldTouched("schedule_to", true)}
              name="schedule_to"
            />
            <div className="text-[12px] text-[#E23121] flex items-center h-[25px]">
              {formik?.touched?.schedule_to && formik?.errors?.schedule_to && (
                <div>{formik?.errors?.schedule_to}</div>
              )}
            </div>

            <div className="font-bold">Message</div>
            <textarea
              placeholder="Type Message"
              name="req_message"
              className="w-[350px] border placeholder-[#5D6561] rounded-[8px] p-2 my-2 outline-none"
              id="req_message"
              value={formik?.values?.req_message}
              onChange={formik?.handleChange}
              onBlur={formik?.handleBlur}
            />
            <div className="font-bold">Status</div>
            <Select
              options={statusOptions}
              value={formik.values.status}
              onChange={(option) => formik.setFieldValue("status", option)}
              onBlur={() => formik.setFieldTouched("status", true)}
              name="status"
            />
            <div className="text-[12px] text-[#E23121] flex items-center h-[25px]">
              {formik?.touched?.status && formik?.errors?.status && (
                <div>{formik?.errors?.status}</div>
              )}
            </div>
          </div>
          <div className="w-[350px] flex justify-between">
            <button
              type="button"
              onClick={() => {
                setModalVisible(false);
                setIsDecline(true);
              }}
              className={`w-[168px] h-[40px] rounded-[8px] border border-[#05A5FB] text-[#05A5FB] hover:border-[#50C2FF] hover:text-[#50C2FF] ${
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
      </main>
    )
  );
};

export default SwapRequest;
