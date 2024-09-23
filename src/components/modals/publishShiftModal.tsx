"use client";
import React from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

export default function PublishShiftModal(props: {
  publishShiftModal: Boolean;
  closePublishShiftModal: () => void;
}) {
  const { publishShiftModal, closePublishShiftModal } = props;

  const formik = useFormik({
    initialValues: {
      date: "",
    },
    validationSchema: Yup?.object({
      date: Yup?.string()?.required("Required"),
    }),
    onSubmit: (values) => {
      // alert(JSON.stringify(values, null, 2));
      //push("/dashboard");
    },
  });

  const shifts = [
    "Morning Shift",
    "Day Shift",
    "Afternoon Shift",
    "Night Shift",
    "24h Shift",
  ];
  const defaultShift = "please select";
  const departments = [
    "Surgery",
    "Orthopedics",
    "Neonatal",
    "Cardiology",
    "Oncology",
    "ER",
  ];
  const defaultDepartment = departments[0];
  const positions = [
    "Surger",
    "Surgeon",
    "Orthopedist",
    "Neonatalolgist",
    "Cardiologist",
    "Oncologest",
    "ER physician",
  ];
  const defaultPosition = positions[0];
  const locations = [
    "Location 1",
    "Location 2",
    "Location 3",
    "Location 4",
    "Location 5",
  ];
  const defaultLocation = "please select";

  if (publishShiftModal)
    return (
      <main className="fixed top-0 bottom-0 left-0 right-0 bg-black bg-opacity-30 flex justify-center align-middle">
        <div className="container my-auto">
          <div className="m-auto w-[385px] h-p[525px] capitalize p-5 bg-[#FFF] rounded-[8px]">
            <div className="text-center text-lg font-bold">publish shift</div>
            <div className="text-sm text-[#101010]">
              <div className="font-bold">shift type</div>
              <Dropdown
                options={shifts}
                value={defaultShift}
                className="w-[350px] h-[40px] my-2"
              />
              <div className="font-bold">date</div>
              <input
                type="date"
                placeholder="Select date"
                name="date"
                required
                className="w-[350px] h-[40px] border placeholder-[#5D6561] rounded-[8px] p-2 my-2 outline-none"
                id="date"
                onChange={formik?.handleChange}
                onBlur={formik?.handleBlur}
                value={formik?.values?.date}
                style={{
                  borderColor:
                    formik?.touched?.date && formik?.errors?.date
                      ? "#E23121"
                      : "#5D6561",
                }}
              />
              <div className="font-bold">location</div>
              <Dropdown
                options={locations}
                value={defaultLocation}
                className="w-[350px] h-[40px] my-2"
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
                className="w-[350px] h-[40px] rounded-[8px] my-2"
              />
            </div>
            <div className="w-[350px]">
              <button
                type="button"
                onClick={closePublishShiftModal}
                className="w-[168px] h-[40px] rounded-[8px] border border-[#00a843] text-[#00a843] hover:border-[#E23121] hover:text-[#E23121] text-[16px] font-[700] px-[24px] py-[8px]"
              >
                Cancel
              </button>
              <button
                type="submit"
                onClick={closePublishShiftModal}
                className="w-[168px] rounded-[8px] bg-[#56b77b] hover:bg-[#00A843] text-[#F8FAF8] p-2 text-[16px] mt-5 px-[24px] py-[8px] ml-[13px]"
              >
                Publish Shift
              </button>
            </div>
          </div>
        </div>
      </main>
    );
}
