import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import "./style.css";

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
          <FontAwesomeIcon icon={faTimes} />
        ) : status === "success" ? (
          <FontAwesomeIcon icon={faCheck} />
        ) : (
          txt
        )}
      </button>
    </div>
  );
};

export default AnimatedBtn;
