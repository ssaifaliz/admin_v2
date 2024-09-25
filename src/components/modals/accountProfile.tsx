"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import * as Yup from "yup";
import { useFormik } from "formik";
import fetchWithToken from "@/utils/api";
import Select, { SingleValue } from "react-select";
import dp from "@/assets/noProfile.svg";
import editProfile from "@/assets/editProfile.png";
import moment from "moment";
import AnimatedBtn from "../animatedBtn";
import close from "@/assets/close.png";
import { updateUserProfile } from "@/utils/token";

interface ProfileProps {
  isModalVisible: boolean | string | number;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const AccountProfile: React.FC<ProfileProps> = ({
  isModalVisible,
  setModalVisible,
}) => {
  const fileInputRef = useRef(null);
  const [userdata, setUserdata] = useState<Profile | null | undefined>(null);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [positions, setPositions] = useState<Position[]>([]);
  const [status, setStatus] = useState("");
  const [isDecline, setIsDecline] = useState<boolean>(false);

  const formik = useFormik<{
    first_name: string | undefined;
    last_name: string | undefined;
    birthdate: string;
    emp_id: number | undefined;
    contact: string | undefined;
    email: string;
    // deptId: SingleValue<{ value: number; label: string }> | null;
    positionId: SingleValue<{ value: number; label: string }> | null;
    roleId: SingleValue<{ value: number; label: string }> | null;
  }>({
    initialValues: {
      first_name: userdata?.first_name,
      last_name: userdata?.last_name,
      birthdate: userdata?.birthdate
        ? moment(userdata?.birthdate).format("YYYY-MM-DD")
        : "",
      email: userdata?.email ?? "",
      emp_id: userdata?.emp_id,
      // deptId: departments?.filter((each) => each?.id === userdata?.deptId)[0],
      positionId: positions?.filter(
        (each) => each?.id === userdata?.positionId
      )[0],
      contact: userdata?.contact,
      roleId: roles?.filter((each) => each?.id === userdata?.roleId)[0],
    },
    enableReinitialize: true,
    validationSchema: Yup?.object({
      first_name: Yup?.string()?.required("Required"),
      last_name: Yup?.string()?.required("Required"),
      contact: Yup?.string()?.required("Required"),
      birthdate: Yup?.string()?.required("Required"),
      email: Yup?.string()
        ?.email("Invalid email address")
        ?.required("Required"),
      emp_id: Yup?.string()?.required("Required"),
      deptId: Yup.object({
        value: Yup.string().required("Value is required"),
      }),
      positionId: Yup.object({
        value: Yup.string().required("Value is required"),
      }),
      roleId: Yup.object({
        value: Yup.string().required("Value is required"),
      }),
    }),
    onSubmit: async (values) => {
      setStatus("onclic");
      try {
        const response = await fetchWithToken(
          userdata?.id ? `/profiles/editprofile` : "/profiles/createprofile",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              ...values,
              // dept: values?.deptId?.value,
              position: values?.positionId?.value,
              role: values?.roleId?.value,
              birthdate: moment(values?.birthdate).format("DD-MM-YYYY"),
            }),
          }
        );
        setStatus("success");
        setTimeout(() => {
          setModalVisible(!isModalVisible);
        }, 1250);
        updateUserProfile(response);
      } catch (error) {
        setStatus("fail");
        console.error("Error updating profile", error);
      }
    },
  });

  const fetchDepartments = async () => {
    try {
      const data = await fetchWithToken("/departments", {
        method: "GET",
      });

      setDepartments(
        data?.map((each: Department) => ({
          ...each,
          value: each?.id,
          // label: each?.dept_name,
        }))
      );
    } catch (error) {
      console.error("Failed to fetch departments:", error);
    }
  };
  const fetchPositions = async () => {
    try {
      const data = await fetchWithToken("/positions", {
        method: "GET",
      });

      setPositions(
        data?.map((each: Position) => ({
          ...each,
          value: each?.id,
          label: each?.position_name,
        }))
      );
    } catch (error) {
      console.error("Failed to fetch positions:", error);
    }
  };
  // const fetchRoles = async () => {
  //   try {
  //     const data = await fetchWithToken("/roles", {
  //       method: "GET",
  //     });

  //     setRoles(
  //       data?.map((each: Role) => ({
  //         ...each,
  //         value: each?.id,
  //         label: each?.role,
  //       }))
  //     );
  //   } catch (error) {
  //     console.error("Failed to fetch swap requests:", error);
  //   }
  // };

  const fetchuserdata = async () => {
    try {
      const data = await fetchWithToken("/users/user", {
        method: "GET",
      });

      setUserdata(data);
    } catch (error) {
      console.error("Failed to fetch next shift:", error);
    }
  };

  useEffect(() => {
    if (isModalVisible) {
      // fetchuserdata();
      fetchDepartments();
      fetchPositions();
      // fetchRoles();
    }
  }, [isModalVisible]);

  return (
    isModalVisible && (
      <main
        className="fixed top-0 bottom-0 left-0 right-0 bg-black bg-opacity-30 flex justify-center align-middle z-[1]"
        onClick={() => setModalVisible(!isModalVisible)}
      >
        <div
          className="py-5 max-w-[30%] h-[80%] overflow-auto m-auto capitalize bg-[#FFF] rounded-[8px] flex flex-col items-center scrollbar-hidden"
          onClick={(e) => e?.stopPropagation()}
        >
          <div className="relative w-full mb-5">
            <div className="text-center text-lg font-bold">
              profile settings
            </div>
            <Image
              alt="close"
              src={close}
              onClick={() => setModalVisible(!isModalVisible)}
              className="absolute right-4 top-1 w-[20px] cursor-pointer"
            />
          </div>
          {userdata?.id && (
            <div className="relative flex items-center justify-center">
              <Image
                src={userdata?.profilePicture ?? dp}
                // src={userdata?.profilePicture}
                alt="ptofile"
                className="w-[87px] h-[87px] rounded-full"
                width={90}
                height={90}
              />
              <div
                className="w-[40px] h-[40px] absolute bg-[#F8FAF8] rounded-[4px] -bottom-2 -right-2"
                // @ts-ignore
                onClick={() => fileInputRef?.current?.click()}
              >
                <Image src={editProfile} alt="edit" className="p-2" />
                <input
                  ref={fileInputRef}
                  className="hidden"
                  type="file"
                  onChange={async (e: any) => {
                    console?.log(e?.target?.files[0]);
                    try {
                      const formData = new FormData();
                      formData.append("profilePicture", e?.target?.files[0]);
                      const data = await fetchWithToken(
                        "/uploads/uploadProfilePicture",
                        {
                          method: "POST",
                          body: formData,
                        }
                      );
                      fetchuserdata();
                    } catch (error) {
                      console.error("Failed to Schedule:", error);
                    }
                  }}
                />
              </div>
            </div>
          )}
          <div className="text-sm text-[#101010] w-full px-5">
            <div className="font-bold">First Name</div>
            <input
              type="text"
              placeholder="Enter First Name"
              name="first_name"
              required
              className="w-[350px] h-[40px] border placeholder-[#5D6561] rounded-[8px] p-2 mt-[8px] mb-[2px] outline-none"
              id="first_name"
              onChange={formik?.handleChange}
              onBlur={formik?.handleBlur}
              value={formik?.values?.first_name}
              style={{
                borderColor:
                  formik?.touched?.first_name && formik?.errors?.first_name
                    ? "#E23121"
                    : "#5D6561",
              }}
            />
            <div className="text-[12px] text-[#E23121] flex items-center h-[14px]">
              {formik?.touched?.first_name && formik?.errors?.first_name && (
                <div>{formik?.errors?.first_name}</div>
              )}
            </div>
            <div className="font-bold">Last Name</div>
            <input
              type="text"
              placeholder="Enter Last Name"
              name="last_name"
              required
              className="w-[350px] h-[40px] border placeholder-[#5D6561] rounded-[8px] p-2 mt-[8px] mb-[2px] outline-none"
              id="last_name"
              onChange={formik?.handleChange}
              onBlur={formik?.handleBlur}
              value={formik?.values?.last_name}
              style={{
                borderColor:
                  formik?.touched?.last_name && formik?.errors?.last_name
                    ? "#E23121"
                    : "#5D6561",
              }}
            />
            <div className="text-[12px] text-[#E23121] flex items-center h-[14px]">
              {formik?.touched?.last_name && formik?.errors?.last_name && (
                <div>{formik?.errors?.last_name}</div>
              )}
            </div>
            <div className="font-bold">Contact</div>
            <input
              type="text"
              placeholder="Enter Contact"
              name="contact"
              required
              className="w-[350px] h-[40px] border placeholder-[#5D6561] rounded-[8px] p-2 my-2 outline-none"
              id="contact"
              onChange={formik?.handleChange}
              onBlur={formik?.handleBlur}
              value={formik?.values?.contact}
              style={{
                borderColor:
                  formik?.touched?.contact && formik?.errors?.contact
                    ? "#E23121"
                    : "#5D6561",
              }}
            />
            <div className="text-[12px] text-[#E23121] flex items-center h-[25px]">
              {formik?.touched?.contact && formik?.errors?.contact && (
                <div>{formik?.errors?.contact}</div>
              )}
            </div>
            <div className="font-bold">birth date</div>
            <input
              type="date"
              placeholder="Enter birth date"
              name="birthdate"
              required
              className="w-[350px] h-[40px] border placeholder-[#5D6561] rounded-[8px] p-2 mt-[8px] mb-[2px] outline-none"
              id="birthdate"
              onChange={formik?.handleChange}
              onBlur={formik?.handleBlur}
              value={formik?.values?.birthdate}
              style={{
                borderColor:
                  formik?.touched?.birthdate && formik?.errors?.birthdate
                    ? "#E23121"
                    : "#5D6561",
              }}
            />
            <div className="text-[12px] text-[#E23121] flex items-center h-[14px]">
              {formik?.touched?.birthdate && formik?.errors?.birthdate && (
                <div>{formik?.errors?.birthdate}</div>
              )}
            </div>
            <div className="font-bold">Employee Id</div>
            <input
              type="text"
              placeholder="Enter employee id"
              name="emp_id"
              required
              className="w-[350px] h-[40px] border placeholder-[#5D6561] rounded-[8px] p-2 mt-[8px] mb-[2px] outline-none"
              id="emp_id"
              onChange={formik?.handleChange}
              onBlur={formik?.handleBlur}
              value={formik?.values?.emp_id}
              style={{
                borderColor:
                  formik?.touched?.emp_id && formik?.errors?.emp_id
                    ? "#E23121"
                    : "#5D6561",
              }}
            />
            <div className="text-[12px] text-[#E23121] flex items-center h-[14px]">
              {formik?.touched?.emp_id && formik?.errors?.emp_id && (
                <div>{formik?.errors?.emp_id}</div>
              )}
            </div>
            <div className="font-bold">email</div>
            <input
              type="email"
              placeholder="Enter email"
              name="email"
              required
              className="w-[350px] h-[40px] border placeholder-[#5D6561] rounded-[8px] p-2 mt-[8px] mb-[2px] outline-none"
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
            <div className="text-[12px] text-[#E23121] flex items-center h-[14px]">
              {formik?.touched?.email && formik?.errors?.email && (
                <div>{formik?.errors?.email}</div>
              )}
            </div>
            {/* <div className="font-bold mb-[8px]">department</div>
            <Select
              options={departments}
              value={formik.values.deptId}
              name="deptId"
              onChange={(option) => formik.setFieldValue("deptId", option)}
              onBlur={formik.handleBlur}
            />
            <div className="text-[12px] text-[#E23121] flex items-center h-[14px]">
              {formik?.touched?.deptId && formik?.errors?.deptId && (
                <div>{formik?.errors?.deptId}</div>
              )}
            </div> */}
            <div className="font-bold mb-[8px]">position</div>
            <Select
              options={positions}
              value={formik.values.positionId}
              name="positionId"
              onChange={(option) => formik.setFieldValue("positionId", option)}
              onBlur={formik.handleBlur}
            />
            <div className="text-[12px] text-[#E23121] flex items-center h-[14px]">
              {formik?.touched?.positionId && formik?.errors?.positionId && (
                <div>{formik?.errors?.positionId}</div>
              )}
            </div>
            <div className="font-bold">role</div>
            <Select
              options={roles}
              value={formik.values.roleId}
              name="roleId"
              onChange={(option) => formik.setFieldValue("roleId", option)}
              onBlur={formik.handleBlur}
            />
            <div className="text-[12px] text-[#E23121] flex items-center h-[25px]">
              {formik?.touched?.roleId && formik?.errors?.roleId && (
                <div>{formik?.errors?.roleId}</div>
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

export default AccountProfile;
