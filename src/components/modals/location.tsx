"use client";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import "react-dropdown/style.css";
import Select from "react-select";
import {
  City,
  Country,
  ICity,
  ICountry,
  IState,
  State,
} from "country-state-city";
import fetchWithToken from "@/utils/api";
import AnimatedBtn from "../animatedBtn";

interface LocationProps {
  isModalVisible: boolean | string | number;
  setModalVisible: React.Dispatch<
    React.SetStateAction<boolean | string | number>
  >;
  fetchLocations: () => void;
}

interface FormValues {
  hospital_name: string;
  addr_one: string;
  addr_two: string;
  country: SelectOption | ICountry | null;
  city: SelectOption | ICity | null;
  state: SelectOption | IState | null;
  postal_code: string;
}

interface SelectOption {
  value: string;
  label: string;
  name: string | null;
  isoCode: string | any;
}

const Location: React.FC<LocationProps> = ({
  isModalVisible,
  setModalVisible,
  fetchLocations,
}) => {
  const isAdd = isModalVisible === true;
  const [stateList, setStateList] = useState<SelectOption[]>();
  const [citiesList, setCitiesList] = useState<SelectOption[]>();
  const [status, setStatus] = useState<string>("");
  const [isDecline, setIsDecline] = useState<boolean>(false);

  const countries = Country.getAllCountries()?.map((each: ICountry) => ({
    ...each,
    value: each?.isoCode,
    label: each?.name,
  }));

  const formik = useFormik<FormValues>({
    initialValues: {
      hospital_name: "",
      addr_one: "",
      addr_two: "",
      country: null,
      city: null,
      state: null,
      postal_code: "",
    },
    validationSchema: Yup?.object({
      hospital_name: Yup?.string()?.required("Required"),
      addr_one: Yup?.string()?.required("Required"),
      addr_two: Yup?.string()?.required("Required"),
      country: Yup.object({
        value: Yup.string().required("Value is required"),
      }).required("This is required"),
      state: Yup.object({
        value: Yup.string().required("Value is required"),
      }).required("This is required"),
      city: Yup.object({
        value: Yup.string().required("Value is required"),
      }).required("This is required"),
      postal_code: Yup?.string()?.required("Required"),
    }),
    onSubmit: async (values) => {
      setStatus("onclic");
      try {
        await fetchWithToken(
          isAdd ? "/locations" : `/locations/${isModalVisible}`,
          {
            method: isAdd ? "POST" : "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              hospital_name: values?.hospital_name,
              addr_one: values?.addr_one,
              addr_two: values?.addr_two,
              country: values?.country?.name,
              state: values?.state?.name,
              city: values?.city?.name,
              postal_code: values?.postal_code,
            }),
          }
        );
        setStatus("success");
        setTimeout(() => {
          setModalVisible(!isModalVisible);
        }, 1250);
        fetchLocations();
      } catch (error) {
        setStatus("fail");
        console.error("Error creating locations:", error);
      }
    },
  });

  const getLocationDetails = async (id: string | number) => {
    try {
      const data = await fetchWithToken(`/locations/${id}`, {
        method: "GET",
      });
      formik?.setFieldValue("hospital_name", data?.hospital_name);
      formik?.setFieldValue("addr_one", data?.addr_one);
      formik?.setFieldValue("addr_two", data?.addr_two);
      formik?.setFieldValue(
        "country",
        countries?.filter((each) => each?.name === data?.country)[0]
      );
      formik?.setFieldValue("state", data?.state);
      formik?.setFieldValue("city", data?.city);
      formik?.setFieldValue("postal_code", data?.postal_code);
    } catch (error) {
      console.error("Failed to fetch swap requests:", error);
    }
  };

  useEffect(() => {
    console?.log("formik?.values?.country", formik?.values?.country);
    if (formik?.values?.country?.isoCode) {
      setStateList(
        State.getStatesOfCountry(formik?.values?.country?.isoCode)?.map(
          (each: IState) => ({
            ...each,
            value: each?.isoCode,
            label: each?.name,
          })
        )
      );
    }
  }, [formik?.values?.country]);

  useEffect(() => {
    if (typeof formik?.values?.state === typeof "") {
      const state = formik?.values?.state;
      formik?.setFieldValue(
        "state",
        stateList?.filter((each) => {
          // console.log("qwerty", each?.name, state, each?.name === state);
          return each?.name === state;
        })[0]
      );
    }
  }, [stateList]);

  useEffect(() => {
    if (typeof formik?.values?.city === typeof "") {
      const city = formik?.values?.city;
      formik?.setFieldValue(
        "city",
        citiesList?.filter((each) => {
          // console.log("qwerty", each?.name, state, each?.name === state);
          return each?.name === city;
        })[0]
      );
    }
  }, [citiesList]);

  useEffect(() => {
    if (formik?.values?.state?.isoCode && formik?.values?.state?.isoCode)
      setCitiesList(
        City.getCitiesOfState(
          formik?.values?.country?.isoCode,
          formik?.values?.state?.isoCode
        )?.map((each: any) => ({
          ...each,
          value: each?.name,
          label: each?.name,
        }))
      );
  }, [formik?.values?.state]);

  useEffect(() => {
    formik?.resetForm();
    if (
      typeof isModalVisible === "number" ||
      typeof isModalVisible === "string"
    )
      getLocationDetails(isModalVisible);
  }, [isModalVisible]);

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
            <div className="font-bold">Hospital Name</div>
            <input
              type="text"
              placeholder="Enter Hospital Name"
              name="hospital_name"
              className="w-[350px] h-[40px] border placeholder-[#5D6561] rounded-[8px] p-2 my-2 outline-none"
              id="hospital_name"
              onChange={formik?.handleChange}
              onBlur={formik?.handleBlur}
              value={formik?.values?.hospital_name}
              style={{
                borderColor:
                  formik?.touched?.hospital_name &&
                  formik?.errors?.hospital_name
                    ? "#E23121"
                    : "#5D6561",
              }}
            />
            <div className="font-bold">address line 1</div>
            <input
              type="text"
              placeholder="Enter address line 1"
              name="addr_one"
              required
              className="w-[350px] h-[40px] border placeholder-[#5D6561] rounded-[8px] p-2 my-2 outline-none"
              id="addr_one"
              onChange={formik?.handleChange}
              onBlur={formik?.handleBlur}
              value={formik?.values?.addr_one}
              style={{
                borderColor:
                  formik?.touched?.addr_one && formik?.errors?.addr_one
                    ? "#E23121"
                    : "#5D6561",
              }}
            />
            <div className="font-bold">address line 2</div>
            <input
              type="text"
              placeholder="Enter address line 2"
              name="addr_two"
              required
              className="w-[350px] h-[40px] border placeholder-[#5D6561] rounded-[8px] p-2 my-2 outline-none"
              id="addr_two"
              onChange={formik?.handleChange}
              onBlur={formik?.handleBlur}
              value={formik?.values?.addr_two}
              style={{
                borderColor:
                  formik?.touched?.addr_two && formik?.errors?.addr_two
                    ? "#E23121"
                    : "#5D6561",
              }}
            />
            <div className="font-bold">Country</div>
            <Select
              options={countries}
              value={formik.values.country}
              name="country"
              onChange={(option) => formik.setFieldValue("country", option)}
              onBlur={formik.handleBlur}
            />
            <div className="font-bold">State</div>
            <Select
              options={stateList}
              value={formik.values.state}
              name="state"
              onChange={(option) => formik.setFieldValue("state", option)}
              onBlur={formik.handleBlur}
            />
            <div className="font-bold">City</div>
            <Select
              options={citiesList}
              value={formik.values.city}
              name="city"
              onBlur={formik?.handleBlur}
              onChange={(option) => formik.setFieldValue("city", option)}
            />
            <div className="font-bold">postal code</div>
            <input
              type="text"
              placeholder="Enter postal code"
              name="postal_code"
              required
              className="w-[350px] h-[40px] border placeholder-[#5D6561] rounded-[8px] p-2 my-2 outline-none"
              id="postal_code"
              onChange={formik?.handleChange}
              onBlur={formik?.handleBlur}
              value={formik?.values?.postal_code}
              style={{
                borderColor:
                  formik?.touched?.postal_code && formik?.errors?.postal_code
                    ? "#E23121"
                    : "#5D6561",
              }}
            />
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

export default Location;
