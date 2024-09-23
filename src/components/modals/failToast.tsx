import { ToastOptions, toast } from "react-toastify";
import Image from "next/image";
import failToast from "@/assets/RedClose.png";

const FailToast = (message: string | undefined) => {
  const toastProps: ToastOptions = {
    position: "bottom-right",
    className: "foo-bar",
    icon: (
      <Image
        alt="successToast"
        src={failToast}
        className="w-[40px] min-w-[40px] max-w-[40px]"
      />
    ),
  };

  toast.error(
    <div className="msg-container ml-5">
      <p className="msg-title font-[700] text-[18px] text-[black]">Failed</p>
      <p className="msg-description text-[12px] text-[#5d6561]">{message}</p>
    </div>,
    toastProps
  );
};

export default FailToast;
