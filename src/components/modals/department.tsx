"use client";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import "react-dropdown/style.css";
import fetchWithToken from "@/utils/api";
import AnimatedBtn from "../animatedBtn";

interface departmentProps {
  isModalVisible: boolean | Department;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean | Department>>;

  fetchDepartments: () => void;
}

const DepartmentModal: React.FC<departmentProps> = ({
  isModalVisible,
  setModalVisible,
  fetchDepartments,
}) => {
  const isEdit = typeof isModalVisible !== "boolean";
  const [status, setStatus] = useState<string>("");
  const [isDecline, setIsDecline] = useState<boolean>(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      description: ""
    },
    validationSchema: Yup?.object({
      name: Yup.string()?.required("name is required"),
      description: Yup.string()?.required("description is required"),
    }),
    onSubmit: async (values) => {
      setStatus("onclic");
      try {
        await fetchWithToken(
          !isEdit ? "/department/create" : `/department/update`,

          {
            method: !isEdit ? "POST" : "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              ...(isEdit && { id: isModalVisible?.id }),
              name: values?.name,
              description: values?.description,
            }),
          }
        );
        setStatus("success");
        setTimeout(() => {
          setModalVisible(!isModalVisible);
        }, 1250);
        fetchDepartments();
      } catch (error) {
        setStatus("fail");
        console.error("Error creating department:", error);
      }
    },
  });
  useEffect(() => {
    formik?.resetForm();
    if (isEdit) {
      formik?.setFieldValue("name", isModalVisible?.name);
      formik?.setFieldValue("description", isModalVisible?.description);
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
            className="py-5 max-w-[40%] h-[70%] m-auto w-[385px] capitalize p-5 bg-[#FFF] rounded-[8px] flex flex-col items-center overflow-y-scroll scrollbar-hidden"
          >
            <div className="text-center text-lg font-bold"> Department</div>
            <div className="text-sm text-[#101010]">
              <div className="font-bold">department</div>
              <input
                type="text"
                placeholder="Enter departement name"
                name="name"
                className="w-[350px] h-[40px] border placeholder-[#5D6561] rounded-[8px] p-2 my-2 outline-none"
                onChange={formik?.handleChange}
                onBlur={formik?.handleBlur}
                value={formik?.values?.name}
                style={{
                  borderColor:
                    formik?.touched?.name && formik?.errors?.name
                      ? "#E23121"
                      : "#5D6561",
                }}
              />
              <div className="text-[12px] text-[#E23121] flex items-center h-[25px]">
                {formik?.touched?.name && formik?.errors?.name && (
                  <div>{formik?.errors?.name}</div>
                )}
              </div>
              <div className="font-bold">description</div>
              <input
                type="text"
                placeholder="Enter departement name"
                name="description"
                className="w-[350px] h-[40px] border placeholder-[#5D6561] rounded-[8px] p-2 my-2 outline-none"
                onChange={formik?.handleChange}
                onBlur={formik?.handleBlur}
                value={formik?.values?.description}
                style={{
                  borderColor:
                    formik?.touched?.description && formik?.errors?.description
                      ? "#E23121"
                      : "#5D6561",
                }}
              />
              <div className="text-[12px] text-[#E23121] flex items-center h-[25px]">
                {formik?.touched?.description &&
                  formik?.errors?.description && (
                    <div>{formik?.errors?.description}</div>
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

export default DepartmentModal;
