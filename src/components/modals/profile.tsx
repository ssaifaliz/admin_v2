"use client";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import "react-dropdown/style.css";
import fetchWithToken from "@/utils/api";
import Select, { SingleValue } from "react-select";
import moment from "moment";
import AnimatedBtn from "../animatedBtn";

interface Location {
  id: number;
  hospital_name: string;
  addr_one: string;
  addr_two: string;
  city: string;
  state: string;
  country: string;
  postal_code: number;
  createdAt: string;
  updatedAt: string;
  value: number;
  label: string;
}

interface User {
  id: number;
  username: string;
  password: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  value: number;
  label: string;
}

interface Department {
  id: number;
  dept_name: string;
  locationId: number;
  createdAt: string;
  updatedAt: string;
  location: Location;
  value: number;
  label: string;
}

interface ProfileProps {
  isModalVisible: boolean | string | number;
  setModalVisible: React.Dispatch<
    React.SetStateAction<boolean | string | number>
  >;
  fetchProfiles: () => void;
}

const Profile: React.FC<ProfileProps> = ({
  isModalVisible,
  setModalVisible,
  fetchProfiles,
}) => {
  const isAdd = isModalVisible === true;
  const [status, setStatus] = useState<string>("");
  const [isDecline, setIsDecline] = useState<boolean>(false);

  const formik = useFormik<{
    emp_id: string;
    first_name: string;
    last_name: string;
    email: string;
    contact: string;
    birthdate: string;
    userId: SingleValue<{ value: number; label: string }> | null;
    deptId: SingleValue<{ value: number; label: string }> | null;
    positionId: SingleValue<{ value: number; label: string }> | null;
    roleId: SingleValue<{ value: number; label: string }> | null;
  }>({
    initialValues: {
      emp_id: "",
      first_name: "",
      last_name: "",
      email: "",
      birthdate: "",
      contact: "",
      userId: null,
      deptId: null,
      positionId: null,
      roleId: null,
    },
    validationSchema: Yup?.object({
      emp_id: Yup?.string()?.required("Required"),
      first_name: Yup?.string()?.required("Required"),
      last_name: Yup?.string()?.required("Required"),
      email: Yup?.string()
        ?.email("Invalid email address")
        ?.required("Required"),
      contact: Yup?.string()?.required("Required"),
      birthdate: Yup?.string()?.required("Required"),
      userId: Yup.object({
        value: Yup.string().required("Value is required"),
      }),
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
        await fetchWithToken(
          isAdd ? "/profiles" : `/profiles/${isModalVisible}`,
          {
            method: isAdd ? "POST" : "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              ...values,
              userId: values?.userId?.value,
              deptId: values?.deptId?.value,
              positionId: values?.positionId?.value,
              roleId: values?.roleId?.value,
              birthdate: moment(values?.birthdate).format("DD-MM-YYYY"),
            }),
          }
        );
        setStatus("success");
        setTimeout(() => {
          setModalVisible(!isModalVisible);
        }, 1250);
        fetchProfiles();
      } catch (error) {
        setStatus("fail");
        console.error("Error creating swap request:", error);
      }
    },
  });

  const [users, setUsers] = useState<User[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [positions, setPositions] = useState<Position[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);

  const getProfileDetails = async (id: string | number) => {
    try {
      const data = await fetchWithToken(`/profiles/${id}`, {
        method: "GET",
      });
      formik?.setFieldValue("emp_id", data?.emp_id);
      formik?.setFieldValue("first_name", data?.first_name);
      formik?.setFieldValue("last_name", data?.last_name);
      formik?.setFieldValue("email", data?.email);
      formik?.setFieldValue("contact", data?.contact);
      formik?.setFieldValue(
        "userId",
        users?.filter((each) => each?.id === data?.userId)[0]
      );
      formik?.setFieldValue(
        "deptId",
        departments?.filter((each) => each?.id === data?.deptId)[0]
      );
      formik?.setFieldValue(
        "positionId",
        positions?.filter((each) => each?.id === data?.positionId)[0]
      );
      formik?.setFieldValue(
        "roleId",
        roles?.filter((each) => each?.id === data?.roleId)[0]
      );
    } catch (error) {
      console.error("Failed to fetch swap requests:", error);
    }
  };

  const fetchDepartments = async () => {
    try {
      const data = await fetchWithToken("/departments", {
        method: "GET",
      });

      setDepartments(
        data?.map((each: Department) => ({
          ...each,
          value: each?.id,
          label: each?.dept_name,
        }))
      );
    } catch (error) {
      console.error("Failed to fetch swap requests:", error);
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
      console.error("Failed to fetch swap requests:", error);
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
  const fetchUsers = async () => {
    try {
      const data = await fetchWithToken("/users", {
        method: "GET",
      });

      setUsers(
        data?.map((each: User) => ({
          ...each,
          value: each?.id,
          label: each?.username,
        }))
      );
    } catch (error) {
      console.error("Failed to fetch swap requests:", error);
    }
  };

  useEffect(() => {
    formik?.resetForm();
    if (
      typeof isModalVisible === "number" ||
      typeof isModalVisible === "string"
    )
      getProfileDetails(isModalVisible);
  }, [isModalVisible]);

  useEffect(() => {
    fetchDepartments();
    fetchPositions();
    // fetchRoles();
    fetchUsers();
  }, []);

  return (
    isModalVisible && (
      <main
        className="fixed top-0 bottom-0 left-0 right-0 bg-black bg-opacity-30 flex justify-center align-middle z-[1]"
        onClick={() => setModalVisible(!isModalVisible)}
      >
        <div
          className="py-5 max-w-[40%] h-[70%] overflow-auto m-auto capitalize bg-[#FFF] rounded-[8px] flex flex-col items-center scrollbar-hidden"
          onClick={(e) => e?.stopPropagation()}
        >
          <div className="text-center text-lg font-bold">
            {!isAdd ? "Edit" : "Add"}
          </div>
          <div className="text-sm text-[#101010] w-full px-5">
            <div className="font-bold">Employee ID</div>
            <input
              type="text"
              placeholder="Enter Employee ID"
              name="emp_id"
              required
              className="w-[350px] h-[40px] border placeholder-[#5D6561] rounded-[8px] p-2 my-2 outline-none"
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
            <div className="text-[12px] text-[#E23121] flex items-center h-[25px]">
              {formik?.touched?.first_name && formik?.errors?.first_name && (
                <div>{formik?.errors?.first_name}</div>
              )}
            </div>
            <div className="font-bold">First Name</div>
            <input
              type="text"
              placeholder="Enter First Name"
              name="first_name"
              required
              className="w-[350px] h-[40px] border placeholder-[#5D6561] rounded-[8px] p-2 my-2 outline-none"
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
            <div className="text-[12px] text-[#E23121] flex items-center h-[25px]">
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
              className="w-[350px] h-[40px] border placeholder-[#5D6561] rounded-[8px] p-2 my-2 outline-none"
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
            <div className="text-[12px] text-[#E23121] flex items-center h-[25px]">
              {formik?.touched?.last_name && formik?.errors?.last_name && (
                <div>{formik?.errors?.last_name}</div>
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
            <div className="font-bold">Birth Date</div>
            <input
              type="date"
              placeholder="Select date"
              name="birthdate"
              required
              className="w-[350px] h-[40px] border placeholder-[#5D6561] rounded-[8px] p-2 my-2 outline-none"
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
            <div className="text-[12px] text-[#E23121] flex items-center h-[25px]">
              {formik?.touched?.birthdate && formik?.errors?.birthdate && (
                <div>{formik?.errors?.birthdate}</div>
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
            <div className="font-bold">user</div>
            <Select
              options={users}
              value={formik.values.userId}
              name="userId"
              onChange={(option) => formik.setFieldValue("userId", option)}
              onBlur={formik.handleBlur}
            />
            <div className="text-[12px] text-[#E23121] flex items-center h-[25px]">
              {formik?.touched?.userId && formik?.errors?.userId && (
                <div>{formik?.errors?.userId}</div>
              )}
            </div>
            <div className="font-bold">department</div>
            <Select
              options={departments}
              value={formik.values.deptId}
              name="deptId"
              onChange={(option) => formik.setFieldValue("deptId", option)}
              onBlur={formik.handleBlur}
            />
            <div className="text-[12px] text-[#E23121] flex items-center h-[25px]">
              {formik?.touched?.deptId && formik?.errors?.deptId && (
                <div>{formik?.errors?.deptId}</div>
              )}
            </div>
            <div className="font-bold">position</div>
            <Select
              options={positions}
              value={formik.values.positionId}
              name="positionId"
              onChange={(option) => formik.setFieldValue("positionId", option)}
              onBlur={formik.handleBlur}
            />
            <div className="text-[12px] text-[#E23121] flex items-center h-[25px]">
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

export default Profile;
