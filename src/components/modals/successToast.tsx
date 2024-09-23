import { ToastOptions, toast } from "react-toastify";
import Image from "next/image";
import successToast from "@/assets/successToast.svg";

const SuccessToast = (message: string, item: string | undefined) => {
  const toastProps: ToastOptions = {
    position: "bottom-right",
    className: "foo-bar",
    icon: (
      <Image
        alt="successToast"
        src={successToast}
        className="w-[40px] min-w-[40px] max-w-[40px]"
      />
    ),
  };

  toast.success(
    <div className="msg-container ml-5">
      <p className="msg-title font-[700] text-[18px] text-[black]">
        {message} successfully
      </p>
      <p className="msg-description text-[12px] text-[#5d6561]">{item}</p>
    </div>,
    toastProps
  );
};

export default SuccessToast;
