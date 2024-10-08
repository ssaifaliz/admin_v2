"use client";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import fetchWithToken from "@/utils/api";
import moment from "moment";
import AnimatedBtn from "../animatedBtn";

interface ShiftProps {
  isModalVisible: boolean | Shift;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean | Shift>>;
  fetchShifts: () => void;
}

const Shift: React.FC<ShiftProps> = ({
  isModalVisible,
  setModalVisible,
  fetchShifts,
}) => {
  const [isDecline, setIsDecline] = useState<boolean>(false);
  const [status, setStatus] = useState<string>("");

  const isEdit = typeof isModalVisible !== "boolean";

  const formik = useFormik({
    initialValues: {
      end_time: "",
      start_time: "",
      shift_name: "",
      shift_type: "",
    },
    validationSchema: Yup?.object({
      start_time: Yup?.string()?.required("Required"),
      end_time: Yup?.string()?.required("Required"),
      shift_name: Yup?.string()?.required("Required"),
      shift_type: Yup?.string()?.required("Required"),
    }),
    onSubmit: async (values) => {
      setStatus("onclic");
      try {
        await fetchWithToken(!isEdit ? "/shift/create" : `/shift/update`, {
          method: !isEdit ? "POST" : "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...(isEdit && { id: isModalVisible?.id }),
            start_time: moment(values?.start_time, "HH:mm")?.format("HH:mm:ss"),
            end_time: moment(values?.end_time, "HH:mm")?.format("HH:mm:ss"),
            shift_type: values?.shift_type,
            shift_name: values?.shift_name,
          }),
        });
        setStatus("success");
        setTimeout(() => {
          setModalVisible(!isModalVisible);
        }, 1250);
        fetchShifts();
      } catch (error) {
        setStatus("fail");
        console.error("Error creating shift:", error);
      }
    },
  });

  useEffect(() => {
    formik?.resetForm();
    if (isEdit) {
      formik?.setFieldValue("start_time", isModalVisible?.start_time);
      formik?.setFieldValue("end_time", isModalVisible?.end_time);
      formik?.setFieldValue("shift_type", isModalVisible?.shift_type);
      formik?.setFieldValue("shift_name", isModalVisible?.shift_name);
    }
  }, [isModalVisible]);

  return (
    isModalVisible && (
      <main
        className="fixed top-0 bottom-0 left-0 right-0 bg-black bg-opacity-30 flex justify-center align-middle z-[1]"
        onClick={() => setModalVisible(!isModalVisible)}
      >
        <div
          className="py-5 max-w-[40%] h-[50%] overflow-auto m-auto w-[385px] capitalize bg-[#FFF] rounded-[8px] flex flex-col items-center scrollbar-hidden"
          onClick={(e) => e?.stopPropagation()}
        >
          <div className="text-center text-lg font-bold">Shift</div>

          <div className="text-sm text-[#101010] w-full px-5">
            <div className="font-bold">Start Time</div>
            <input
              type="time"
              placeholder="Select Start Time"
              name="start_time"
              className="w-[350px] h-[40px] border placeholder-[#5D6561] rounded-[8px] p-2 my-2 outline-none"
              id="start_time"
              onChange={formik?.handleChange}
              onBlur={formik?.handleBlur}
              value={formik?.values?.start_time}
              style={{
                borderColor:
                  formik?.touched?.start_time && formik?.errors?.start_time
                    ? "#E23121"
                    : "#5D6561",
              }}
            />
            <div className="text-[12px] text-[#E23121] flex items-center h-[25px]">
              {formik?.touched?.start_time && formik?.errors?.start_time && (
                <div>{formik?.errors?.start_time}</div>
              )}
            </div>
            <div className="font-bold">End Time</div>
            <input
              type="time"
              placeholder="Select End Time"
              name="end_time"
              className="w-[350px] h-[40px] border placeholder-[#5D6561] rounded-[8px] p-2 my-2 outline-none"
              id="end_time"
              onChange={formik?.handleChange}
              onBlur={formik?.handleBlur}
              value={formik?.values?.end_time}
              style={{
                borderColor:
                  formik?.touched?.end_time && formik?.errors?.end_time
                    ? "#E23121"
                    : "#5D6561",
              }}
            />
            <div className="text-[12px] text-[#E23121] flex items-center h-[25px]">
              {formik?.touched?.end_time && formik?.errors?.end_time && (
                <div>{formik?.errors?.end_time}</div>
              )}
            </div>
            <div className="font-bold">Shift Type</div>
            <input
              type="text"
              placeholder="Enter Shift Type"
              name="shift_type"
              className="w-[350px] h-[40px] border placeholder-[#5D6561] rounded-[8px] p-2 my-2 outline-none"
              id="shift_type"
              onChange={formik?.handleChange}
              onBlur={formik?.handleBlur}
              value={formik?.values?.shift_type}
              style={{
                borderColor:
                  formik?.touched?.shift_type && formik?.errors?.shift_type
                    ? "#E23121"
                    : "#5D6561",
              }}
            />
            <div className="text-[12px] text-[#E23121] flex items-center h-[25px]">
              {formik?.touched?.shift_type && formik?.errors?.shift_type && (
                <div>{formik?.errors?.shift_type}</div>
              )}
            </div>
            <div className="font-bold">Shift Name</div>
            <input
              type="text"
              placeholder="Enter Shift Type"
              name="shift_name"
              className="w-[350px] h-[40px] border placeholder-[#5D6561] rounded-[8px] p-2 my-2 outline-none"
              id="shift_name"
              onChange={formik?.handleChange}
              onBlur={formik?.handleBlur}
              value={formik?.values?.shift_name}
              style={{
                borderColor:
                  formik?.touched?.shift_name && formik?.errors?.shift_name
                    ? "#E23121"
                    : "#5D6561",
              }}
            />
            <div className="text-[12px] text-[#E23121] flex items-center h-[25px]">
              {formik?.touched?.shift_name && formik?.errors?.shift_name && (
                <div>{formik?.errors?.shift_name}</div>
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

export default Shift;
