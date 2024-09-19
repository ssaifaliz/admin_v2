import React, { useEffect } from "react";
import "./style.css";
import Image from "next/image";
import check from "@/assets/check.png";
import close from "@/assets/close.png";

const AnimatedBtn = ({
  className,
  status,
  setStatus,
  onClick,
  txt,
  secondary,
}: {
  className?: string;
  status?: string;
  txt: string;
  setStatus?: any;
  onClick?: any;
  secondary?: boolean;
}) => {
  useEffect(() => {
    if (status === "success" || status === "fail")
      setTimeout(() => {
        setStatus("");
      }, 1250);
  }, [status]);

  return (
    <div className={`h-[40px] flex items-center justify-center ${className}`}>
      <button
        className={`btn ${secondary && "btnSec"} ${status}`}
        disabled={status !== ""}
        onClick={onClick}
      >
        {status === "fail" ? (
          <Image alt="close" src={close} className="w-5 h-5" />
        ) : status === "success" ? (
          <Image alt="check" src={check} className="w-5 h-5" />
        ) : (
          txt
        )}
      </button>
    </div>
  );
};

export default AnimatedBtn;
