"use client";
import React, { useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

export default function InviteUserModal(props: {
  inviteUserModal: Boolean;
  closeInviteUserModal: () => void;
}) {
  const { inviteUserModal, closeInviteUserModal } = props;

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
    },
    validationSchema: Yup?.object({
      email: Yup?.string()
        ?.email("Invalid email address")
        ?.required("Required"),
      name: Yup?.string()?.required("Required"),
    }),
    onSubmit: (values) => {
      // alert(JSON.stringify(values, null, 2));
      //push("/dashboard");
    },
  });

  const departments = [
    "Surgery",
    "Orthopedics",
    "Neonatal",
    "Cardiology",
    "Oncology",
    "ER",
  ];
  const [defaultDepartment, setDefaultDepartment] = useState(departments[0]);
  const positions = [
    "Surger",
    "Surgeon",
    "Orthopedist",
    "Neonatalolgist",
    "Cardiologist",
    "Oncologest",
    "ER physician",
  ];
  const [defaultPosition, setDefaultPosition] = useState(positions[0]);

  if (inviteUserModal)
    return (
      <main className="fixed top-0 bottom-0 left-0 right-0 bg-black bg-opacity-30 flex justify-center align-middle">
        <div className="container my-auto">
          <div className="m-auto w-[385px] h-p[525px] capitalize p-5 bg-[#FFF] rounded-[8px]">
            <div className="text-center text-lg font-bold">invite user</div>
            <div className="text-sm text-[#101010]">
              <div className="font-bold">name</div>
              <input
                type="text"
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
              <div className="font-bold">department</div>
              <Dropdown
                options={departments}
                value={defaultDepartment}
                className="w-[350px] h-[40px] my-2"
              />
              <div className="font-bold">position</div>
              <Dropdown
                options={positions}
                value={defaultPosition}
                onChange={(e) => {
                  setDefaultPosition(e.value);
                  console.log(defaultPosition);
                }}
                className="w-[350px] h-[40px] rounded-[8px] my-2"
              />

              <div className="font-bold">role</div>
              <Dropdown
                options={["User", "Admin"]}
                value={"User"}
                className="w-[350px] h-[40px] my-2"
              />
            </div>
            <div className="w-[350px]">
              <button
                type="button"
                onClick={closeInviteUserModal}
                className="w-[168px] h-[40px] rounded-[8px] border border-[#00a843] text-[#00a843] hover:border-[#E23121] hover:text-[#E23121] text-[16px] font-[700] px-[24px] py-[8px]"
              >
                Cancel
              </button>
              <button
                type="submit"
                onClick={closeInviteUserModal}
                className="w-[168px] rounded-[8px] bg-[#56b77b] hover:bg-[#00A843] text-[#F8FAF8] p-2 text-[16px] mt-5 px-[24px] py-[8px] ml-[13px]"
              >
                Send Invitation
              </button>
            </div>
          </div>
        </div>
      </main>
    );
}
