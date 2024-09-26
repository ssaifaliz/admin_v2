import React, { useEffect, useState } from "react";
import Image from "next/image";
import Select from "react-select";
import moment from "moment";
import { useFormik } from "formik";
import * as Yup from "yup";
import fetchWithToken from "@/utils/api";
import AnimatedBtn from "../animatedBtn";
import dp from "@/assets/noProfile.svg";

interface Profile {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  profilePicture?: string;
}

const statusOptions = [
  { value: "pending", label: "Pending" },
  { value: "accepted", label: "Accepted" },
  { value: "rejected", label: "Rejected" },
];

interface SelectOption {
  value: string;
  label: string;
  id?: string | number | undefined;
}

interface LeaveProps {
  isModalVisible: boolean | string | number;
  setModalVisible: React.Dispatch<
    React.SetStateAction<boolean | string | number>
  >;
  fetchLeaves: () => void;
}

const Leave: React.FC<LeaveProps> = ({
  isModalVisible,
  setModalVisible,
  fetchLeaves,
}) => {
  const isAdd = typeof isModalVisible === "boolean";
  const [isDecline, setIsDecline] = useState<boolean>(false);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [status, setStatus] = useState<string>("");

  const formik = useFormik<{
    approved_by: string;
    end_date_id: string;
    leave_type: string;
    start_date_id: string;
    total_days: string;
    total_holidays: string;
  }>({
    initialValues: {
      approved_by: "",
      end_date_id: "",
      leave_type: "",
      start_date_id: "",
      total_days: "",
      total_holidays: "",
    },
    validationSchema: Yup.object({
      approved_by: Yup.string().required("Required"),
      end_date_id: Yup.string().required("Required"),
      leave_type: Yup.string().required("Required"),
      start_date_id: Yup.string().required("Required"),
      total_days: Yup.string().required("Required"),
      total_holidays: Yup.string().required("Required"),
    }),
    onSubmit: async (values) => {
      setStatus("onclic");
      try {
        await fetchWithToken(isAdd ? "/leave" : `/leave/${isModalVisible}`, {
          method: isAdd ? "POST" : "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...values,
            // start_date: moment(values?.start_date).format("DD-MM-YYYY"),
            // end_date: moment(values?.end_date).format("DD-MM-YYYY"),
            // profile_id: values?.profile_id?.id,
            // approved: values?.approved?.value,
            // leave_type: values?.leave_type,
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

  // const fetchProfiles = async () => {
  //   try {
  //     const data = await fetchWithToken("/profiles", {
  //       method: "GET",
  //     });

  //     setProfiles(
  //       data?.map((each: Profile) => ({
  //         ...each,
  //         value: each?.id,
  //         label: each?.email,
  //       }))
  //     );
  //   } catch (error) {
  //     console.error("Failed to fetch profiles:", error);
  //   }
  // };

  // const getLeaveDetails = async (id: string | number) => {
  //   try {
  //     const data = await fetchWithToken(`/leave/${id}`, {
  //       method: "GET",
  //     });

  //     console.log("qwerty", data);

  //     formik?.setFieldValue("start_date", data?.start_date);
  //     formik?.setFieldValue("end_date", data?.end_date);
  //     formik?.setFieldValue(
  //       "profile_id",
  //       profiles?.filter((each) => each?.id === data?.profile_id)[0]
  //     );
  //     formik?.setFieldValue(
  //       "approved",
  //       statusOptions?.filter((each) => each?.value === data?.approved)[0]
  //     );
  //     formik?.setFieldValue("leave_type", data?.leave_type);
  //   } catch (error) {
  //     console.error("Failed to fetch department:", error);
  //   }
  // };

  // useEffect(() => {
  //   formik?.resetForm();
  //   if (
  //     typeof isModalVisible === "number" ||
  //     typeof isModalVisible === "string"
  //   )
  //     getLeaveDetails(isModalVisible);
  // }, [isModalVisible]);

  // useEffect(() => {
  //   fetchProfiles();
  // }, []);

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

  return (
    isModalVisible && (
      <main className="fixed top-0 bottom-0 left-0 right-0 bg-black bg-opacity-30 flex justify-center align-middle z-[1]">
        <div
          className="py-5 max-w-[40%] h-[70%] overflow-auto m-auto w-[385px] capitalize bg-[#FFF] rounded-[8px] flex flex-col items-center scrollbar-hidden"
          onClick={(e) => e?.stopPropagation()}
        >
          <div className="text-center text-lg font-bold">
            {!isAdd ? "Edit" : "Add"}
          </div>
          <div className="text-sm text-[#101010] w-full px-5">
            <div className="font-bold">Start Date</div>
            <input
              type="date"
              placeholder="Select date"
              name="start_date"
              required
              className="w-[350px] h-[40px] border placeholder-[#5D6561] rounded-[8px] p-2 my-2 outline-none"
              id="start_date"
              onChange={formik?.handleChange}
              onBlur={formik?.handleBlur}
              value={formik?.values?.start_date}
              style={{
                borderColor:
                  formik?.touched?.start_date && formik?.errors?.start_date
                    ? "#E23121"
                    : "#5D6561",
              }}
            />
            <div className="text-[12px] text-[#E23121] flex items-center h-[25px]">
              {formik?.touched?.start_date && formik?.errors?.start_date && (
                <div>{formik?.errors?.start_date}</div>
              )}
            </div>
            <div className="font-bold">End Date</div>
            <input
              type="date"
              placeholder="Select date"
              name="end_date"
              required
              className="w-[350px] h-[40px] border placeholder-[#5D6561] rounded-[8px] p-2 my-2 outline-none"
              id="end_date"
              onChange={formik?.handleChange}
              onBlur={formik?.handleBlur}
              value={formik?.values?.end_date}
              style={{
                borderColor:
                  formik?.touched?.end_date && formik?.errors?.end_date
                    ? "#E23121"
                    : "#5D6561",
              }}
            />
            <div className="text-[12px] text-[#E23121] flex items-center h-[25px]">
              {formik?.touched?.end_date && formik?.errors?.end_date && (
                <div>{formik?.errors?.end_date}</div>
              )}
            </div>
            <div className="font-bold">profile</div>
            <Select
              formatOptionLabel={formatOptionLabel}
              options={profiles}
              value={formik?.values?.profile_id}
              name="profile_id"
              onChange={(option) => formik.setFieldValue("profile_id", option)}
              onBlur={() => formik?.setFieldTouched("profile_id")}
              className="w-[350px] h-[40px] my-2"
            />
            <div className="text-[12px] text-[#E23121] flex items-center h-[25px]">
              {formik?.touched?.profile_id && formik?.errors?.profile_id && (
                <div>{formik?.errors?.profile_id}</div>
              )}
            </div>
            {(typeof isModalVisible === "number" ||
              typeof isModalVisible === "string") && (
              <>
                <div className="font-bold">Status</div>
                <Select
                  options={statusOptions}
                  value={formik.values.approved}
                  onChange={(option) =>
                    formik.setFieldValue("approved", option)
                  }
                  onBlur={() => formik.setFieldTouched("approved", true)}
                  name="approved"
                />
                <div className="text-[12px] text-[#E23121] flex items-center h-[25px]">
                  {formik?.touched?.approved && formik?.errors?.approved && (
                    <div>{formik?.errors?.approved}</div>
                  )}
                </div>
              </>
            )}
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
