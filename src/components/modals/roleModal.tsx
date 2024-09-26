"use client";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import "react-dropdown/style.css";
import fetchWithToken from "@/utils/api";
import AnimatedBtn from "../animatedBtn";
import Select, { SingleValue } from "react-select";

interface roleProps {
  isModalVisible: boolean | Role;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean | Role>>;
  fetchRoles: () => void;
}

const RoleModal: React.FC<roleProps> = ({
  isModalVisible,
  setModalVisible,
  fetchRoles,
}) => {
  const isEdit = typeof isModalVisible !== "boolean";
  const [status, setStatus] = useState<string>("");
  const [isDecline, setIsDecline] = useState<boolean>(false);
  const [permissions, setPermissions] = useState<Permission[]>([]);

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
        await fetchWithToken(!isEdit ? "/role/create" : `/role/update`, {
          method: !isEdit ? "POST" : "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...(isEdit && { id: isModalVisible?.id }),
            code_name: values?.code_name,
            permission: values?.permission,
            title: values?.title,
          }),
        });
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

  // const getRoleDetails = async (id: string | number) => {
  //   try {
  //     const data = await fetchWithToken(`/role/${id}`, {
  //       method: "GET",
  //     });
  //     formik?.setFieldValue("code_name", data?.code_name);
  //     formik?.setFieldValue("permission", data?.permision);
  //     formik?.setFieldValue("title", data?.title);
  //   } catch (error) {
  //     console.error("Failed to fetch role:", error);
  //   }
  // };

  const fetchPermissions = async () => {
    try {
      const data = await fetchWithToken(`/permission/list`, {
        method: "GET",
      });
      setPermissions(
        data?.content?.permission?.map((each: Permission) => ({
          ...each,
          value: each?.id,
          label: each?.title,
        }))
      );
    } catch (error) {
      console.error("Failed to fetch permission:", error);
    }
  };

  useEffect(() => {
    formik?.resetForm();
    if (isEdit) {
      formik?.setFieldValue("code_name", isModalVisible?.code_name);
      formik?.setFieldValue("permission", isModalVisible?.permission);
      formik?.setFieldValue("title", isModalVisible?.title);
    }
    fetchPermissions();
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
              <div className="text-[12px] text-[#E23121] flex items-center h-[25px]">
                {formik?.touched?.code_name && formik?.errors?.code_name && (
                  <div>{formik?.errors?.code_name}</div>
                )}
              </div>
              <div className="font-bold">Permission</div>
              <Select
                options={permissions}
                value={
                  permissions?.filter(
                    (each) => each?.id === formik?.values?.permission
                  )[0]
                }
                name="permission"
                onChange={(option) =>
                  formik.setFieldValue("permission", option?.id)
                }
                onBlur={formik.handleBlur}
                className="w-[350px] h-[40px] my-2"
              />
              <div className="text-[12px] text-[#E23121] flex items-center h-[25px]">
                {formik?.touched?.permission && formik?.errors?.permission && (
                  <div>{formik?.errors?.permission}</div>
                )}
              </div>
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
              <div className="text-[12px] text-[#E23121] flex items-center h-[25px]">
                {formik?.touched?.title && formik?.errors?.title && (
                  <div>{formik?.errors?.title}</div>
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

export default RoleModal;
