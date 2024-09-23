import React from "react";

interface TooltipProps {
  text: string;
  children: React.ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({ text, children }) => {
  return (
    <div className="relative flex items-center group z-30">
      {children}
      <div className="absolute hidden group-hover:block bg-[#DAEBFF] border-r-2 z-50 text-black text-xs rounded py-1 px-2 bottom-full mb-2 w-[250px]  text-left whitespace-normal overflow-hidden">
        {text}
      </div>
      <div
        className="absolute hidden group-hover:block"
        style={{
          position: "absolute",
          bottom: "0px",
          left: "5px",
          top: "-10px",
          height: 0,
          borderLeft: "7.5px solid transparent",
          borderRight: "7.5px solid transparent",
          borderTop: "10px solid #DAEBFF",
        }}
      ></div>
    </div>
  );
};

export default Tooltip;
