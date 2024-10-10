"use client";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import Select from "react-select";
import fetchWithToken from "@/utils/api";
import Image from "next/image";
import dp from "@/assets/noProfile.svg";
import AnimatedBtn from "../animatedBtn";
import moment from "moment";

interface SwapRequestFormValues {
  requested_by: string;
  original_schedule_id: string;
  requested_to: string;
  requested_schedule_id: string;
  message: string;
  status: string;
}

interface SwapRequestProps {
  isModalVisible: boolean | SwapRequest;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean | SwapRequest>>;
  fetchSwapRequests: () => void;
}

const statusOptions: any = [
  { value: "PENDING", label: "Pending" },
  { value: "APPROVED", label: "Accepted" },
  { value: "REJECTED", label: "Rejected" },
];

const SwapRequestAdd: React.FC<SwapRequestProps> = ({
  isModalVisible,
  setModalVisible,
  fetchSwapRequests,
}) => {
  const isEdit = typeof isModalVisible !== "boolean";
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [schedulesFrom, setSchedulesFrom] = useState<Schedule[]>([]);
  const [schedulesTo, setSchedulesTo] = useState<Schedule[]>([]);
  const [isDecline, setIsDecline] = useState<boolean>(false);
  const [status, setStatus] = useState<string>("");

  const formik = useFormik<SwapRequestFormValues>({
    initialValues: {
      requested_by: "",
      original_schedule_id: "",
      requested_to: "",
      requested_schedule_id: "",
      message: "",
      status: "",
    },
    validationSchema: Yup?.object({
      requested_by: Yup.string().required("Required"),
      original_schedule_id: Yup.string().required("Required"),
      requested_to: Yup.string().required("Required"),
      requested_schedule_id: Yup.string().required("Required"),
      message: Yup?.string(),
      status: Yup?.string(),
    }),
    onSubmit: async (values) => {
      console.log(values,"casdasdasdasddas")
      setStatus("onclic");
      try {
        const response = await fetchWithToken(
          !isEdit ? "/swaprequest/create" : `/swaprequest/update`,
          {
            method: !isEdit ? "POST" : "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              ...(isEdit && { id: isModalVisible?.id }),
              requested_by: values?.requested_by,
              original_schedule_id: values?.original_schedule_id,
              requested_to: values?.requested_to,
              requested_schedule_id: values?.requested_schedule_id,
              message: values?.message,
              status: values?.status,
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

  const fetchSchedulesFrom = async (profileId: string) => {
    try {
      const data = await fetchWithToken(`/schedule/list?user_id=${profileId}`, {
        method: "GET",
      });
      console.log(
        "formik?.values?.requested_by",
        formik?.values?.requested_by,
        data
      );

      setSchedulesFrom(
        data?.content?.schedule?.map((each: Schedule) => ({
          ...each,
          value: each?.id,
          label: each?.id,
        }))
      );
    } catch (error) {
      console.error("Failed to fetch swap requests:", error);
    }
  };

  const fetchSchedulesTo = async (profileId: string) => {
    try {
      const data = await fetchWithToken(`/schedule/list?user_id=${profileId}`, {
        method: "GET",
      });
      console.log(
        "formik?.values?.requested_by",
        formik?.values?.requested_by,
        data
      );

      setSchedulesTo(
        data?.content?.schedule?.map((each: Schedule) => ({
          ...each,
          value: each?.id,
          label: each?.id,
        }))
      );
    } catch (error) {
      console.error("Failed to fetch swap requests:", error);
    }
  };

  useEffect(() => {
    formik?.resetForm();
    if (isEdit) {
      formik?.setFieldValue("requested_by", isModalVisible?.requested_by);
      formik?.setFieldValue(
        "original_schedule_id",
        isModalVisible?.OriginalSchedule?.start_date_id
      );
      formik?.setFieldValue("requested_to", isModalVisible?.requested_to);
      formik?.setFieldValue(
        "requested_schedule_id",
        isModalVisible?.RequestedSchedule?.start_date_id
      );
      formik?.setFieldValue("message", isModalVisible?.message);
      formik?.setFieldValue("status", isModalVisible?.status);
    }
  }, [isModalVisible]);

  const fetchProfiles = async () => {
    try {
      const data = await fetchWithToken(`/user/list`, {
        method: "GET",
      });

      setProfiles(
        data?.content?.user?.map((each: Profile) => ({
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
    // fetchSchedules();
    fetchProfiles();
  }, []);

  useEffect(() => {
    // fetchSchedules();
    if (formik?.values?.requested_by)
      fetchSchedulesFrom(formik?.values?.requested_by);
  }, [formik?.values?.requested_by]);

  useEffect(() => {
    // fetchSchedules();
    if (formik?.values?.requested_to)
      fetchSchedulesTo(formik?.values?.requested_to);
  }, [formik?.values?.requested_to]);

  const ScheduleLabel = (schedule: Schedule) => (
    <div className="flex flex-col">
      <div className="font-[700]">{`${moment(
        schedule?.Shift?.start_time,
        "HH:mm:ss"
      ).format("LT")} - ${moment(schedule?.Shift?.end_time, "HH:mm:ss").format(
        "LT"
      )}`}</div>
      <div className="flex text-[14px]">
        <div>{`${moment(schedule?.StartDate?.full_date)?.format(
          "ll"
        )} - ${moment(schedule?.EndDate?.full_date)?.format("ll")}`}</div>
      </div>
    </div>
  );

  const UserLabel = (profile: Profile) => (
    <div className="flex items-center">
      <Image
        alt="profile"
        src={profile?.image || dp}
        className="w-[40px] rounded-full"
        width={6}
        height={6}
      />
      <div className="flex flex-col text-[14px] ml-1">
        <div className="font-[700]">{profile?.name}</div>
        <div>{profile?.email}</div>
      </div>
    </div>
  );

  return (
    isModalVisible && (
      <main
        className="fixed top-0 bottom-0 left-0 right-0 bg-black bg-opacity-30 flex justify-center align-middle z-[2]"
        onClick={() => setModalVisible(!isModalVisible)}
      >
        <div
          className="py-5 max-w-[40%] h-[70%] overflow-auto m-auto capitalize bg-[#FFF] rounded-[8px] flex flex-col items-center scrollbar-hidden"
          onClick={(e) => e?.stopPropagation()}
        >
          <div className="text-center text-lg font-bold">
            {isEdit ? "Edit" : "Add"}
          </div>
          <div className="text-sm text-[#101010] w-full px-5">
            <div>
              <div className="font-bold">Profile From</div>
              <Select
                formatOptionLabel={UserLabel}
                options={profiles?.filter(
                  (each) =>
                    each?.id?.toString() !==
                    formik?.values?.requested_to?.toString()
                )}
                value={profiles?.find(
                  (each) =>
                    each?.id?.toString() ===
                    formik?.values?.requested_by?.toString()
                )}
                onChange={(option) => {
                  console.log(option);
                  formik.setFieldValue("requested_by", option?.id);
                }}
                onBlur={formik.handleBlur}
                name="requested_by"
              />
              <div className="text-[12px] text-[#E23121] flex items-center h-[25px]">
                {formik?.touched?.requested_by &&
                  formik?.errors?.requested_by && (
                    <div>{formik?.errors?.requested_by}</div>
                  )}
              </div>
            </div>
            <div className="font-bold">Schedule From</div>
            <Select
              formatOptionLabel={ScheduleLabel}
              options={schedulesFrom}
              value={schedulesFrom?.find(
                (each) =>
                  each?.id?.toString() ===
                  formik?.values?.original_schedule_id?.toString()
              )}
              onChange={(option) =>
                formik.setFieldValue("original_schedule_id", option?.id)
              }
              onBlur={formik.handleBlur}
              name="original_schedule_id"
            />
            <div className="text-[12px] text-[#E23121] flex items-center h-[25px]">
              {formik?.touched?.original_schedule_id &&
                formik?.errors?.original_schedule_id && (
                  <div>{formik?.errors?.original_schedule_id}</div>
                )}
            </div>
            <div className="font-bold">Profile To</div>
            <Select
              formatOptionLabel={UserLabel}
              options={profiles?.filter(
                (each) =>
                  each?.id?.toString() !==
                  formik?.values?.requested_by?.toString()
              )}
              value={profiles?.find(
                (each) =>
                  each?.id?.toString() ===
                  formik?.values?.requested_to?.toString()
              )}
              onChange={(option) => {
                console.log(option);
                formik.setFieldValue("requested_to", option?.id);
              }}
              onBlur={formik.handleBlur}
              name="requested_to"
            />
            <div className="text-[12px] text-[#E23121] flex items-center h-[25px]">
              {formik?.touched?.requested_to &&
                formik?.errors?.requested_to && (
                  <div>{formik?.errors?.requested_to}</div>
                )}
            </div>
            <div className="font-bold">Schedule To</div>
            <Select
              formatOptionLabel={ScheduleLabel}
              options={schedulesTo}
              value={schedulesTo?.find(
                (each) =>
                  each?.id?.toString() ===
                  formik?.values?.requested_schedule_id?.toString()
              )}
              onChange={(option) =>
                formik.setFieldValue("requested_schedule_id", option?.id)
              }
              onBlur={formik.handleBlur}
              name="requested_schedule_id"
            />
            <div className="text-[12px] text-[#E23121] flex items-center h-[25px]">
              {formik?.touched?.requested_schedule_id &&
                formik?.errors?.requested_schedule_id && (
                  <div>{formik?.errors?.requested_schedule_id}</div>
                )}
            </div>
            {isEdit && (
              <>
                <div className="font-bold">Status</div>
                <Select
                  options={statusOptions}
                  value={statusOptions.find((item:any)=>item.value===formik.values.status)}
                  onChange={(option:any) => formik.setFieldValue("status", option?.value)}
                  onBlur={() => formik.setFieldTouched("status", true)}
                  name="status"
                />
                <div className="text-[12px] text-[#E23121] flex items-center h-[25px]">
                  {formik?.touched?.status && formik?.errors?.status && (
                    <div>{formik?.errors?.status}</div>
                  )}
                </div>
              </>
            )}
            <div className="font-bold">Message</div>
            <textarea
              placeholder="Type Message"
              name="message"
              className="w-[350px] border placeholder-[#5D6561] rounded-[8px] p-2 my-2 outline-none"
              id="message"
              value={formik?.values?.message}
              onChange={formik?.handleChange}
              onBlur={formik?.handleBlur}
            />
            
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

export default SwapRequestAdd;
