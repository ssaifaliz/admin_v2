"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import * as Yup from "yup";
import { useFormik } from "formik";
import fetchWithToken from "@/utils/api";
import "react-dropdown/style.css";
import view from "@/assets/view.png";
import hide from "@/assets/hide.png";
import AnimatedBtn from "../animatedBtn";
import Select from "react-select";

interface userProps {
  isModalVisible: boolean | string | number;
  setModalVisible: React.Dispatch<
    React.SetStateAction<boolean | string | number>
  >;
  fetchUsers: () => void;
}

const UserModal: React.FC<userProps> = ({
  isModalVisible,
  setModalVisible,
  fetchUsers,
}) => {
  const isAdd = isModalVisible === true;
  const [visible, setVisible] = useState(false);
  const [roles, setRoles] = useState<Role[]>([]);
  const [isDecline, setIsDecline] = useState<boolean>(false);
  const [status, setStatus] = useState<string>("");

  const fetchRoleId = async () => {
    try {
      const data = await fetchWithToken("/role/list", {
        method: "GET",
      });
      setRoles(
        data?.content?.role?.map((each: Role) => ({
          ...each,
          value: each?.id,
          label: each?.title,
        }))
      );
      console.log("data", data);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };

  useEffect(() => {
    fetchRoleId();
  }, []);

  const formik = useFormik({
    initialValues: {
      name: "",
      password: "",
      email: "",
      role_id: "",
    },
    validationSchema: Yup?.object({
      name: Yup?.string()?.required("Required"),
      password: Yup?.string().required("Required"),
      email: Yup?.string()
        ?.email("Invalid email address")
        ?.required("Required"),
      role_id: Yup?.string()?.required("Required"),
    }),
    onSubmit: async (values) => {
      setStatus("onclic");
      try {
        await fetchWithToken(
          isAdd ? "/user/create" : `/user/${isModalVisible}`,
          {
            method: isAdd ? "POST" : "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: values?.email,
              name: values?.name,
              password: values?.password,
              role_id: values?.role_id,
            }),
          }
        );
        setStatus("success");
        setTimeout(() => {
          setModalVisible(!isModalVisible);
        }, 1250);
        fetchUsers();
      } catch (error) {
        setStatus("fail");
        console.error("Error creating user:", error);
      }
    },
  });

  const getUserDetails = async (id: string | number) => {
    try {
      const data = await fetchWithToken(`/user/${id}`, {
        method: "GET",
      });
      formik?.setFieldValue("name", data?.name);
      formik?.setFieldValue("password", data?.password);
      formik?.setFieldValue("email", data?.email);
      formik?.setFieldValue("role_id", data?.role_id);
    } catch (error) {
      console.error("Failed to fetch user:", error);
    }
  };

  useEffect(() => {
    formik?.resetForm();
    if (
      typeof isModalVisible === "number" ||
      typeof isModalVisible === "string"
    )
      getUserDetails(isModalVisible);
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
            className="py-5 max-w-[40%] h-[70%] overflow-auto m-auto w-[385px] capitalize bg-[#FFF] rounded-[8px] flex flex-col items-center scrollbar-hidden"
          >
            <div className="text-center text-lg font-bold">user</div>
            <div className="text-sm text-[#101010]">
              <div className="font-bold">Name</div>
              <input
                type="name"
                placeholder="Enter name"
                name="name"
                required
                className="w-[350px] h-[40px] border placeholder-[#5D6561] rounded-[8px] p-2 my-2 outline-none"
                id="name"
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

              <div className="font-bold">password</div>

              <div className="w-[350px] h-[40px] border rounded-[8px] border-[#101010] flex">
                <input
                  type={visible ? "text" : "password"}
                  placeholder="Enter password"
                  name="password"
                  required
                  className="w-[315px] placeholder-[#5D6561] p-2 my-2 outline-none"
                  id="password"
                  onChange={formik?.handleChange}
                  onBlur={formik?.handleBlur}
                  value={formik?.values?.password}
                  style={{
                    borderColor:
                      formik?.touched?.password && formik?.errors?.password
                        ? "#E23121"
                        : "#5D6561",
                  }}
                />
                {visible ? (
                  <Image
                    src={hide}
                    alt="hide"
                    onClick={() => setVisible(!visible)}
                    className="w-5 h-5 mt-2"
                  />
                ) : (
                  <Image
                    src={view}
                    alt="view"
                    onClick={() => setVisible(!visible)}
                    className="w-5 h-5 mt-2"
                  />
                )}
              </div>
              <div className="text-[12px] text-[#E23121] flex items-center h-[25px]">
                {formik?.touched?.password && formik?.errors?.password && (
                  <div>{formik?.errors?.password}</div>
                )}
              </div>
              <div className="font-bold">email</div>
              <input
                type="email"
                placeholder="Enter email"
                name="email"
                required
                className="w-[350px] h-[40px] border placeholder-[#5D6561] rounded-[8px] p-2 my-2 outline-none"
                id="email"
                onChange={formik?.handleChange}
                onBlur={formik?.handleBlur}
                value={formik?.values?.email}
                style={{
                  borderColor:
                    formik?.touched?.email && formik?.errors?.email
                      ? "#E23121"
                      : "#5D6561",
                }}
              />
              <div className="text-[12px] text-[#E23121] flex items-center h-[25px]">
                {formik?.touched?.email && formik?.errors?.email && (
                  <div>{formik?.errors?.email}</div>
                )}
              </div>

              <div className="font-bold">Role</div>
              <Select
                options={roles}
                value={
                  roles?.filter(
                    (role) => role.id?.toString() === formik?.values?.role_id
                  )[0]
                }
                name="role_id"
                onChange={(option: any) => {
                  console.log(option);
                  formik.setFieldValue("role_id", option?.id);
                }}
                onBlur={formik.handleBlur}
                className="w-[350px] h-[40px] my-2"
              />
              <div className="text-[12px] text-[#E23121] flex items-center h-[25px]">
                {formik?.touched?.role_id && formik?.errors?.role_id && (
                  <div>{formik?.errors?.role_id}</div>
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
                  txt="Create"
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

export default UserModal;
