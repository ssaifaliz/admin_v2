"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Select from "react-select";
import * as Yup from "yup";
import { useFormik } from "formik";
import "react-dropdown/style.css";
import fetchWithToken from "@/utils/api";
import AnimatedBtn from "../animatedBtn";
import dp from "@/assets/noProfile.svg";
import moment from "moment";

interface Shift {
  id: number;
  start_time: string;
  end_time: string;
  shift_type: string;
  value: number;
  label: string;
}

interface scheduleProps {
  isModalVisible: boolean | Schedule;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean | Schedule>>;
  fetchSchedules: () => void;
}

const ScheduleModal: React.FC<scheduleProps> = ({
  isModalVisible,
  setModalVisible,
  fetchSchedules,
}) => {
  const isEdit = typeof isModalVisible !== "boolean";
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [shifts, setShifts] = useState<Shift[]>([]);
  const [prefilledDates, setPrefilledDates] = useState<PrefilledDate[]>([]);
  const [isDecline, setIsDecline] = useState<boolean>(false);
  const [status, setStatus] = useState<string>("");

  const formik = useFormik<{
    end_date_id: string;
    start_date_id: string;
    user_id: string;
    shift_id: string;
  }>({
    initialValues: {
      end_date_id: "",
      start_date_id: "",
      user_id: "",
      shift_id: "",
    },
    validationSchema: Yup.object({
      end_date_id: Yup.string().required("Required"),
      start_date_id: Yup.string().required("Required"),
      user_id: Yup.string().required("Required"),
      shift_id: Yup.string().required("Required"),
    }),
    onSubmit: async (values) => {
      setStatus("onclic");
      try {
        await fetchWithToken(
          !isEdit ? "/schedule/create" : `/schedule/update`,
          {
            method: !isEdit ? "POST" : "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              ...(isEdit && { id: isModalVisible?.id }),
              end_date_id: values?.end_date_id,
              start_date_id: values?.start_date_id,
              user_id: values?.user_id,
              shift_id: values?.shift_id,
              hours_worked: 8,
              overtime_hours: 2,
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

  const fetchProfiles = async () => {
    try {
      const data = await fetchWithToken("/user/list", {
        method: "GET",
      });

      setProfiles(
        data?.content?.user?.map((each: Profile) => ({
          ...each,
          value: each?.id,
        }))
      );
    } catch (error) {
      console.error("Failed to fetch profiles:", error);
    }
  };

  const fetchShifts = async () => {
    try {
      const data = await fetchWithToken("/shift/list", {
        method: "GET",
      });

      setShifts(
        data?.content?.shift?.map((each: Shift) => ({
          ...each,
          value: each?.id,
        }))
      );
    } catch (error) {
      console.error("Failed to fetch shifts:", error);
    }
  };

  const fetchPrefilledDates = async () => {
    try {
      const data = await fetchWithToken("/prefilleddate/list", {
        method: "GET",
      });

      setPrefilledDates(
        data?.content?.prefilledDate?.map((each: PrefilledDate) => ({
          ...each,
          value: each?.id,
          label: moment(each?.full_date)?.format("ll"),
        }))
      );
    } catch (error) {
      console.error("Failed to fetch shifts:", error);
    }
  };

  useEffect(() => {
    profiles?.map((each) => console.log(each?.id));
    console.log("isModalVisible", isModalVisible);
    formik?.resetForm();
    if (isEdit) {
      formik?.setFieldValue("end_date_id", isModalVisible?.end_date_id);
      formik?.setFieldValue("start_date_id", isModalVisible?.start_date_id);
      formik?.setFieldValue("user_id", isModalVisible?.user_id);
      formik?.setFieldValue("shift_id", isModalVisible?.shift_id);
    }
  }, [isModalVisible]);

  useEffect(() => {
    fetchPrefilledDates();
    fetchProfiles();
    fetchShifts();
  }, []);

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
  const ShiftLabel = (shift: Shift) => (
    <div className="flex items-center">
      <div className="flex text-[14px] ml-1">
        <div className="mr-1 font-medium">{shift?.shift_type}</div>
        <div className="font-light">{`${shift?.start_time} - ${shift?.end_time}`}</div>
      </div>
    </div>
  );

  return (
    isModalVisible && (
      <main
        onClick={() => setModalVisible(!isModalVisible)}
        className="fixed top-0 bottom-0 left-0 right-0 bg-black bg-opacity-30 flex justify-center align-middle z-[1]"
      >
        <div className="container my-auto">
          <div
            onClick={(e) => e?.stopPropagation()}
            className="py-5 max-w-[40%] h-[70%] m-auto w-[385px] capitalize p-5 bg-[#FFF] rounded-[8px] flex flex-col items-center overflow-y-scroll scrollbar-hidden"
          >
            <div className="text-center text-lg font-bold">edit schedule</div>
            <div className="text-sm text-[#101010]">
              <div className="font-bold">Start Date</div>
              <Select
                options={prefilledDates}
                value={prefilledDates?.find(
                  (each) =>
                    each?.id?.toString() ===
                    formik.values.start_date_id?.toString()
                )}
                name="start_date_id"
                onChange={(option) =>
                  formik.setFieldValue("start_date_id", option?.id)
                }
                onBlur={formik.handleBlur}
                className="w-[350px] h-[40px] my-2"
              />
              <div className="text-[12px] text-[#E23121] flex items-center h-[25px]">
                {formik?.touched?.start_date_id &&
                  formik?.errors?.start_date_id && (
                    <div>{formik?.errors?.start_date_id}</div>
                  )}
              </div>
              <div className="font-bold">End Date</div>
              <Select
                options={prefilledDates}
                value={prefilledDates?.find(
                  (each) =>
                    each?.id?.toString() ===
                    formik.values.end_date_id?.toString()
                )}
                name="end_date_id"
                onChange={(option) =>
                  formik.setFieldValue("end_date_id", option?.id)
                }
                onBlur={formik.handleBlur}
                className="w-[350px] h-[40px] my-2"
              />
              <div className="text-[12px] text-[#E23121] flex items-center h-[25px]">
                {formik?.touched?.end_date_id &&
                  formik?.errors?.end_date_id && (
                    <div>{formik?.errors?.end_date_id}</div>
                  )}
              </div>
              <div className="font-bold">profile</div>
              <Select
                formatOptionLabel={UserLabel}
                options={profiles}
                value={profiles?.find(
                  (each) =>
                    each?.id?.toString() === formik.values.user_id?.toString()
                )}
                name="user_id"
                onChange={(option) =>
                  formik.setFieldValue("user_id", option?.id)
                }
                onBlur={formik.handleBlur}
                className="w-[350px] h-[40px] my-2"
              />
              <div className="text-[12px] text-[#E23121] flex items-center h-[25px]">
                {formik?.touched?.user_id && formik?.errors?.user_id && (
                  <div>{formik?.errors?.user_id}</div>
                )}
              </div>
              <div className="font-bold">shift</div>
              <Select
                formatOptionLabel={ShiftLabel}
                options={shifts}
                value={shifts?.find(
                  (each) =>
                    each?.id?.toString() === formik.values.shift_id?.toString()
                )}
                name="shift_id"
                onChange={(option) =>
                  formik.setFieldValue("shift_id", option?.id)
                }
                onBlur={formik.handleBlur}
                className="w-[350px] h-[40px] my-2"
              />
              <div className="text-[12px] text-[#E23121] flex items-center h-[25px]">
                {formik?.touched?.shift_id && formik?.errors?.shift_id && (
                  <div>{formik?.errors?.shift_id}</div>
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
