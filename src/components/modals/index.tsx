import React from "react";

const ModalLayour = ({
  children,
  isModalVisible,
  setModalVisible,
}: {
  isModalVisible: boolean | string | number;
  children: React.ReactNode;
  setModalVisible: React.Dispatch<
    React.SetStateAction<boolean | string | number>
  >;
}) => {
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
          {children}
          <div className="w-[350px]">
            <button
              type="button"
              onClick={() => setModalVisible(false)}
              className="w-[168px] h-[40px] rounded-[8px] border border-[#00a843] text-[#00a843] hover:border-[#E23121] hover:text-[#E23121] text-[16px] font-[700] px-[24px] py-[8px]"
            >
              Cancel
            </button>
            <button
              onClick={(e: any) => {
                //   formik.handleSubmit();
              }}
              type="submit"
              className="w-[168px] rounded-[8px] bg-[#56b77b] hover:bg-[#00A843] text-[#F8FAF8] p-2 text-[16px] mt-5 px-[24px] py-[8px] ml-[13px]"
            >
              Submit
            </button>
          </div>
        </div>
      </main>
    )
  );
};

export default ModalLayour;
