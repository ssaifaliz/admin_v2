import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../catalyst/table";
import fetchWithToken from "@/utils/api";
import DeleteModal from "../modals/deleteModal";
import DepartmentModal from "../modals/department";
import editIcon from "@/assets/editIcon.png";
import deleteIcon from "@/assets/deleteIcon.png";
import grayArrowDown from "@/assets/grayArrowDown.png";

interface departmentsProps {
  isModalVisible: boolean | string | number;
  setModalVisible: React.Dispatch<
    React.SetStateAction<boolean | string | number>
  >;
}

const Departments: React.FC<departmentsProps> = ({
  isModalVisible,
  setModalVisible,
}) => {
  const [content, setContent] = useState<string>("");
  const [departments, setDepartments] = useState<Department[]>([]);
  const [deleteDepartmentModal, setDeleteDepartmentModal] = useState<
    boolean | number | string
  >(false);

  const fetchDepartments = async () => {
    try {
      const data = await fetchWithToken("/department/list", {
        method: "GET",
      });
      setDepartments(data?.content?.department);
    } catch (error) {
      console.error("Failed to fetch departments:", error);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  return (
    <>
      <Table className={"relative mt-5"}>
        <TableHead>
          <TableRow className="bg-[#F7F8F7]">
            <TableHeader className="!outline-none !border-b-0">
              <div className="flex items-center">
                Department
                <Image src={grayArrowDown} alt="" className="w-5 h-5 ml-2" />
              </div>
            </TableHeader>
            <TableHeader className="!outline-none !border-b-0">
              <div className="flex items-center">
                Description
                <Image src={grayArrowDown} alt="" className="w-5 h-5 ml-2" />
              </div>
            </TableHeader>
            <TableHeader className="!outline-none !border-b-0"></TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {departments?.map((department) => (
            <TableRow key={department?.id}>
              <TableCell className="!outline-none !border-b-0">
                <div className="flex items-center max-w-min">
                  <div className="flex flex-col justify-center">
                    <div className="text-[16px] font-[600] mt-0">
                      {department?.name}
                    </div>
                  </div>
                </div>
              </TableCell>
              <TableCell className="!outline-none !border-b-0">
                <div className="flex items-center max-w-min">
                  <div className="flex flex-col justify-center">
                    <div className="text-[16px] font-[600] mt-0">
                      {department?.description}
                    </div>
                  </div>
                </div>
              </TableCell>

              <TableCell className="!outline-none !border-b-0 w-[120px] flex float-right">
             <div
                    onClick={() => setModalVisible(department?.id)}
                    className="w-[60px] h-full flex justify-center items-center cursor-pointer"
                  >
                    <Image alt="editIcon" src={editIcon} className="w-6 h-6" />
                  </div>
                <div
                  onClick={() => {
                    setDeleteDepartmentModal(department?.id);
                    setContent(department?.name);
                  }}
                  className="w-[60px] h-full flex justify-center items-center cursor-pointer"
                >
                  <Image
                    alt="deleteIcon"
                    src={deleteIcon}
                    className="w-6 h-6"
                  />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <DepartmentModal
        isModalVisible={isModalVisible}
        setModalVisible={setModalVisible}
        fetchDepartments={fetchDepartments}
      />
      <DeleteModal
        route="department"
        content={content}
        visibilityState={deleteDepartmentModal}
        setState={setDeleteDepartmentModal}
        fetchAllCall={fetchDepartments}
      />
    </>
  );
};

export default Departments;
