import React, { useEffect, useState } from "react";
import Select from "react-select";
import moment from "moment";
import { useFormik } from "formik";
import * as Yup from "yup";
import fetchWithToken from "@/utils/api";
import AnimatedBtn from "../animatedBtn";
import Image from "next/image";
import dp from "@/assets/noProfile.svg";

interface LeaveProps {
  isModalVisible: boolean | any;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean | any>>;
  fetchLeaves: () => void;
}

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

const Leave: React.FC<LeaveProps> = ({
  isModalVisible,
  setModalVisible,
  fetchLeaves,
}) => {
  const isEdit = typeof isModalVisible !== "boolean";
  const [isDecline, setIsDecline] = useState<boolean>(false);
  const [prefilledDates, setPrefilledDates] = useState<PrefilledDate[]>([]);
  const [profiles, setProfiles] = useState<Profile[]>([]);

  const [status, setStatus] = useState<string>("");

  const formik = useFormik<{
    end_date_id: string;
    start_date_id: string;
    total_days: string;
    total_holidays: string;
    leave_type: string;
    user_id: string;
  }>({
    initialValues: {
      end_date_id: "",
      start_date_id: "",
      total_days: "",
      total_holidays: "",
      leave_type: "",
      user_id: "",
    },
    validationSchema: Yup.object({
      end_date_id: Yup.string().required("Required"),
      start_date_id: Yup.string().required("Required"),
      total_days: Yup.string().required("Required"),
      total_holidays: Yup.string().required("Required"),
      leave_type: Yup.string().required("Required"),
      user_id: Yup.string().required("Required"),
    }),
    onSubmit: async (values) => {
      setStatus("onclic");
      try {
        await fetchWithToken(!isEdit ? "/leave/create" : `/leave/update`, {
          method: !isEdit ? "POST" : "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...(isEdit && { id: isModalVisible?.id }),
            ...(isEdit && { requested_by: isModalVisible?.id }),
            end_date_id: values?.end_date_id,
            start_date_id: values?.start_date_id,
            total_days: values?.total_days,
            total_holidays: values?.total_holidays,
            leave_type: values?.leave_type,
            user_id: values?.user_id,
          }),
        });
        setStatus("success");
        setTimeout(() => {
          setModalVisible(!isModalVisible);
        }, 1250);
        fetchLeaves();
      } catch (error) {
        setStatus("fail");
        console.error("Error creating schedule:", error);
      }
    },
  });

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

  useEffect(() => {
    formik?.resetForm();
    if (isEdit) {
      formik?.setFieldValue("end_date_id", isModalVisible?.end_date_id);
      formik?.setFieldValue("start_date_id", isModalVisible?.start_date_id);
      formik?.setFieldValue("user_id", isModalVisible?.user_id);
      formik?.setFieldValue("total_days", isModalVisible?.total_days);
      formik?.setFieldValue("leave_type", isModalVisible?.leave_type);
      formik?.setFieldValue("total_holidays ", isModalVisible?.total_holidays  );

    }
    // if (
    //   typeof isModalVisible === "number" ||
    //   typeof isModalVisible === "string"
    // ) {
    //   // @ts-ignore
    //   formik?.setFieldValue("user_id", isModalVisible?.user_id);
    // }
  }, [isModalVisible]);

  useEffect(() => {
    fetchPrefilledDates();
    fetchProfiles();
  }, []);

  return (
    isModalVisible && (
      <main
        onClick={() => {
          setModalVisible(false);
        }}
        className="fixed top-0 bottom-0 left-0 right-0 bg-black bg-opacity-30 flex justify-center align-middle z-[2]"
      >
        <div
          className="py-5 max-w-[40%] h-[70%] overflow-auto m-auto w-[385px] capitalize bg-[#FFF] rounded-[8px] flex flex-col items-center scrollbar-hidden"
          onClick={(e) => e?.stopPropagation()}
        >
          <div className="text-center text-lg font-bold">
            {isEdit ? "Edit" : "Add"}
          </div>
          <div className="text-sm text-[#101010] w-full px-5">
            <div className="font-bold">profile</div>
            <Select
              formatOptionLabel={UserLabel}
              options={profiles}
              value={profiles?.find(
                (each) =>
                  each?.id?.toString() === formik.values.user_id?.toString()
              )}
              name="user_id"
              onChange={(option) => formik.setFieldValue("user_id", option?.id)}
              onBlur={formik.handleBlur}
              className="w-[350px] h-[40px] my-2"
            />
            <div className="text-[12px] text-[#E23121] flex items-center h-[25px]">
              {formik?.touched?.user_id && formik?.errors?.user_id && (
                <div>{formik?.errors?.user_id}</div>
              )}
            </div>
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
                  each?.id?.toString() === formik.values.end_date_id?.toString()
              )}
              name="end_date_id"
              onChange={(option) =>
                formik.setFieldValue("end_date_id", option?.id)
              }
              onBlur={formik.handleBlur}
              className="w-[350px] h-[40px] my-2"
            />
            <div className="text-[12px] text-[#E23121] flex items-center h-[25px]">
              {formik?.touched?.end_date_id && formik?.errors?.end_date_id && (
                <div>{formik?.errors?.end_date_id}</div>
              )}
            </div>
            <div className="font-bold">Leave type</div>
            <input
              type="text"
              placeholder="Enter leave type"
              name="leave_type"
              required
              className="w-[350px] h-[40px] border placeholder-[#5D6561] rounded-[8px] p-2 my-2 outline-none"
              id="leave_type"
              onChange={formik?.handleChange}
              onBlur={formik?.handleBlur}
              value={formik?.values?.leave_type}
              style={{
                borderColor:
                  formik?.touched?.leave_type && formik?.errors?.leave_type
                    ? "#E23121"
                    : "#5D6561",
              }}
            />
            <div className="text-[12px] text-[#E23121] flex items-center h-[25px]">
              {formik?.touched?.leave_type && formik?.errors?.leave_type && (
                <div>{formik?.errors?.leave_type}</div>
              )}
            </div>
            <div className="font-bold">Total Days</div>
            <input
              type="number"
              placeholder="Enter leave type"
              name="total_days"
              required
              className="w-[350px] h-[40px] border placeholder-[#5D6561] rounded-[8px] p-2 my-2 outline-none"
              id="total_days"
              onChange={formik?.handleChange}
              onBlur={formik?.handleBlur}
              value={formik?.values?.total_days}
              style={{
                borderColor:
                  formik?.touched?.total_days && formik?.errors?.total_days
                    ? "#E23121"
                    : "#5D6561",
              }}
            />
            <div className="text-[12px] text-[#E23121] flex items-center h-[25px]">
              {formik?.touched?.total_days && formik?.errors?.total_days && (
                <div>{formik?.errors?.total_days}</div>
              )}
            </div>
            <div className="font-bold">Total Holidays</div>
            <input
              type="number"
              placeholder="Enter leave type"
              name="total_holidays"
              required
              className="w-[350px] h-[40px] border placeholder-[#5D6561] rounded-[8px] p-2 my-2 outline-none"
              id="total_holidays"
              onChange={formik?.handleChange}
              onBlur={formik?.handleBlur}
              value={formik?.values?.total_holidays}
              style={{
                borderColor:
                  formik?.touched?.total_holidays &&
                  formik?.errors?.total_holidays
                    ? "#E23121"
                    : "#5D6561",
              }}
            />
            <div className="text-[12px] text-[#E23121] flex items-center h-[25px]">
              {formik?.touched?.total_holidays &&
                formik?.errors?.total_holidays && (
                  <div>{formik?.errors?.total_holidays}</div>
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
                  console.log(formik.errors);
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

export default Leave;
