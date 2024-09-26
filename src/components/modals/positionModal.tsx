"use client";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import "react-dropdown/style.css";
import fetchWithToken from "@/utils/api";
import AnimatedBtn from "../animatedBtn";

interface positionProps {
  isModalVisible: boolean | Position;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean | Position>>;

  fetchPositions: () => void;
}


const PositionModal: React.FC<positionProps> = ({
  isModalVisible,
  setModalVisible,
  fetchPositions,
}) => {
  const isEdit = typeof isModalVisible !== "boolean";
  const [status, setStatus] = useState<string>("");
  const [isDecline, setIsDecline] = useState<boolean>(false);

  const formik = useFormik({
    initialValues: {
      title: "",
    },
    validationSchema: Yup?.object({
      title: Yup?.string()?.required("Required"),
    }),
    onSubmit: async (values) => {
      setStatus("onclic");
      try {
        await fetchWithToken(
          !isEdit ? "/position/create" : `/position/update`,

          {
            method: !isEdit ? "POST" : "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              ...(isEdit && { id: isModalVisible?.id }),
              title: values?.title
            }),
          }
        );
        setStatus("success");
        setTimeout(() => {
          setModalVisible(!isModalVisible);
        }, 1250);
        fetchPositions();
      } catch (error) {
        setStatus("fail");
        console.error("Error creating position:", error);
      }
    },
  });

  const getPositionDetails = async (id: string | number) => {
    try {
      const data = await fetchWithToken(`/position/${id}`, {
        method: "GET",
      });
      formik?.setFieldValue("title", data?.title);
    } catch (error) {
      console.error("Failed to fetch position:", error);
    }
  };
  useEffect(() => {
    formik?.resetForm();
    if (isEdit) {
      formik?.setFieldValue("title", isModalVisible?.title);
    }
  }, [isModalVisible]);

  return (
    isModalVisible && (
      <main
        onClick={() => setModalVisible(!isModalVisible)}
        className="fixed top-0 bottom-0 left-0 right-0 bg-black bg-opacity-30 flex justify-center align-middle"
      >
        <div className="container my-auto">
          <div
            onClick={(e) => e?.stopPropagation()}
            className="py-5 max-w-[40%] h-[70%] overflow-auto m-auto w-[385px] capitalize p-5 bg-[#FFF] rounded-[8px] scrollbar-hidden"
          >
            <div className="text-center text-lg font-bold">position</div>
            <div className="text-sm text-[#101010]">
              <div className="font-bold">position</div>
              <input
                type="text"
                placeholder="Enter position"
                name="title"
                required
                className="w-[350px] h-[40px] border placeholder-[#5D6561] rounded-[8px] p-2 my-2 outline-none"
                id="title"
                onChange={formik?.handleChange}
                onBlur={formik?.handleBlur}
                value={formik?.values?.title}
                style={{
                  borderColor:
                    formik?.touched?.title && formik?.errors?.title
                      ? "#E23121"
                      : "#5D6561",
                }}
              />
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

export default PositionModal;
