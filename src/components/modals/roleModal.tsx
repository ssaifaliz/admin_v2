"use client";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import "react-dropdown/style.css";
import fetchWithToken from "@/utils/api";
import AnimatedBtn from "../animatedBtn";

interface roleProps {
  isModalVisible: boolean | string | number;
  setModalVisible: React.Dispatch<
    React.SetStateAction<boolean | string | number>
  >;
  fetchRoles: () => void;
}

const RoleModal: React.FC<roleProps> = ({
  isModalVisible,
  setModalVisible,
  fetchRoles,
}) => {
  const isAdd = isModalVisible === true;
  const [status, setStatus] = useState<string>("");
  const [isDecline, setIsDecline] = useState<boolean>(false);

  const formik = useFormik({
    initialValues: {
      code_name: "",
      permission: "",
      title: "",
    },
    validationSchema: Yup?.object({
      code_name: Yup?.string()?.required("Required"),
      permission: Yup?.string()?.required("Required"),
      title: Yup?.string()?.required("Required"),
    }),
    onSubmit: async (values) => {
      setStatus("onclic");
      try {
        await fetchWithToken(
          isAdd ? "/role/create" : `/role/${isModalVisible}`,
          {
            method: isAdd ? "POST" : "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              code_name: values?.code_name,
              permission: values?.permission,
              title: values?.title,
            }),
          }
        );
        setStatus("success");
        setTimeout(() => {
          setModalVisible(!isModalVisible);
        }, 1250);
        fetchRoles();
      } catch (error) {
        setStatus("fail");
        console.error("Error creating role:", error);
      }
    },
  });

  const getRoleDetails = async (id: string | number) => {
    try {
      const data = await fetchWithToken(`/role/${id}`, {
        method: "GET",
      });
      formik?.setFieldValue("code_name", data?.code_name);
      formik?.setFieldValue("permission", data?.permision);
      formik?.setFieldValue("title", data?.title);
    } catch (error) {
      console.error("Failed to fetch role:", error);
    }
  };

  useEffect(() => {
    formik?.resetForm();
    if (
      typeof isModalVisible === "number" ||
      typeof isModalVisible === "string"
    )
      getRoleDetails(isModalVisible);
  }, [isModalVisible]);

  return (
    isModalVisible && (
      <main
        onClick={() => setModalVisible(!isModalVisible)}
        className="fixed top-0 bottom-0 left-0 right-0 bg-black bg-opacity-30 flex justify-center align-middle z-10"
      >
        <div className="container my-auto">
          <div
            onClick={(e) => e?.stopPropagation()}
            className="py-5 max-w-[40%] h-[70%] overflow-auto m-auto w-[385px] capitalize p-5 bg-[#FFF] rounded-[8px] scrollbar-hidden"
          >
            <div className="text-center text-lg font-bold">role</div>
            <div className="text-sm text-[#101010]">
              <div className="font-bold">code name</div>
              <input
                type="text"
                placeholder="Enter code name"
                name="code_name"
                required
                className="w-[350px] h-[40px] border placeholder-[#5D6561] rounded-[8px] p-2 my-2 outline-none"
                id="code_name"
                onChange={formik?.handleChange}
                onBlur={formik?.handleBlur}
                value={formik?.values?.code_name}
                style={{
                  borderColor:
                    formik?.touched?.code_name && formik?.errors?.code_name
                      ? "#E23121"
                      : "#5D6561",
                }}
              />
              <div className="font-bold">Permission</div>
              <input
                type="text"
                placeholder="Enter permission"
                name="permission"
                required
                className="w-[350px] h-[40px] border placeholder-[#5D6561] rounded-[8px] p-2 my-2 outline-none"
                id="role"
                onChange={formik?.handleChange}
                onBlur={formik?.handleBlur}
                value={formik?.values?.permission}
                style={{
                  borderColor:
                    formik?.touched?.permission && formik?.errors?.permission
                      ? "#E23121"
                      : "#5D6561",
                }}
              />
              <div className="font-bold">Title</div>
              <input
                type="text"
                placeholder="Enter title"
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

export default RoleModal;
