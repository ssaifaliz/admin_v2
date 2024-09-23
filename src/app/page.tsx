"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Cookies from "js-cookie";
import * as Yup from "yup";
import { useFormik } from "formik";
import { setToken } from "@/utils/token";
import fetchWithToken from "@/utils/api";
import AnimatedBtn from "@/components/animatedBtn";
import dashboard from "@/assets/dashboardScreen.svg";
import logo from "../assets/logo.svg";
import view from "@/assets/view.png";
import hide from "@/assets/hide.png";
import resLogo from "@/assets/responsive_logo.svg";

const Home = () => {
  // const urlPar
  const [visible, setVisible] = useState(false);
  const [status, setStatus] = useState<string>("");
  const { push, refresh } = useRouter();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup?.object({
      email: Yup?.string()
        ?.email("Invalid email address")
        ?.required("This filed is required"),
      password: Yup?.string()?.required("This filed is required"),
    }),
    onSubmit: async (values) => {
      setStatus("onclic");
      push("/cruds");
      return;
      try {
        const response = await fetchWithToken("/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...values }),
        });
        setStatus("success");
        const { token } = await response;
        setToken(token);
        push("/dashboard");
        refresh();
      } catch (error: any) {
        console.error("Login failed:", error);
        setStatus("fail");
        formik.setFieldError("password", error?.message);
      }
    },
  });

  useEffect(() => {
    if (Cookies.get("session")) push("/dashboard");
  }, [Cookies.get("session")]);

  useEffect(() => {
    if (window?.location?.search) {
      const urlParams = new URLSearchParams(window?.location?.search);
      // setRedirectUrl(urlParams.get("redirect") || "");
    }
  }, []);

  return (
    <main className="flex flex-1 h-[100vh] min-h-[100vh] max-h-[100vh] w-full items-center justify-around bg-[#F7F8F7]">
      <div className="w-[40%] h-full relative flex items-center justify-center">
        <Image
          src={logo}
          alt="logo"
          className="w-[75px] absolute top-[35px] left-[20px] sm:flex hidden"
        />
        <form className="w-[310px]" onSubmit={formik?.handleSubmit}>
          <div className="sm:hidden flex justify-center h-[125px]">
            <Image src={resLogo} alt="logo" className="w-[80px] " />
          </div>
          <div className="pb-7 w-full">
            <div className="text-xl pb-2 font-bold  sm:flex hidden">Log In</div>
            <div className="text-xl pb-7 font-bold sm:hidden">
              Welcome back!
            </div>
            <p className="text-[14px] text-[#424A46] sm:hidden">
              Effortlessly coordinate your shifts with colleagues!
            </p>
          </div>
          <div className="font-bold text-sm mb-2">Email</div>
          <input
            type="email"
            placeholder="Enter your email"
            name="email"
            className="w-[280px] h-[35px] text-[#101010] border placeholder-[#5D6561] rounded-lg bg-[#e8f0fe] p-2 text-xs outline-none"
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
          <div className="font-bold text-sm mb-2">Password</div>
          <div
            className="w-[280px] h-[35px] border rounded-[8px] border-[#5D6561] flex bg-[#e8f0fe]"
            style={{
              borderColor:
                formik?.touched?.password && formik?.errors?.password
                  ? "#E23121"
                  : "#5D6561",
            }}
          >
            <input
              type={visible ? "text" : "password"}
              placeholder="Enter your password"
              className="w-[245px] text-[#101010] bg-[#e8f0fe]  placeholder-[#5D6561] rounded-[8px] p-2 text-xs outline-none"
              id="password"
              name="password"
              onChange={(event) => {
                formik.handleChange(event);
              }}
              onBlur={formik?.handleBlur}
              value={formik?.values?.password}
            />
            {visible ? (
              <Image
                src={hide}
                alt="hide"
                onClick={() => setVisible(!visible)}
                className="w-5 h-5 mt-[6px]"
              />
            ) : (
              <Image
                src={view}
                alt="view"
                onClick={() => setVisible(!visible)}
                className="w-5 h-5 mt-[6px]"
              />
            )}
          </div>
          <div className="text-[12px] text-[#E23121] flex items-center h-[25px]">
            {formik?.touched?.password && formik?.errors?.password && (
              <div>{formik?.errors?.password}</div>
            )}
          </div>
          <div className="w-[280px]">
            <AnimatedBtn txt="Log In" status={status} setStatus={setStatus} />
          </div>
        </form>
      </div>
      <div className="h-full w-[60%] bg-custom-gradient relative sm:flex hidden">
        <div className="mt-[130px] ml-[15%]">
          <div className="text-[18px] font-[700]">
            Effortlessly coordinate your shifts with colleagues!
          </div>
          <div className="text-[18px] font-[500]">
            Simplify scheduling complexities and seamlessly swap shifts with
            ease, exclusively for doctors!
          </div>
        </div>
        <Image
          alt="dashboard"
          src={dashboard}
          className="absolute w-[85%] right-[0px] top-[280px]"
        />
      </div>
    </main>
  );
};
export default Home;
