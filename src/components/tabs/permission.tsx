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
import PermissionModal from "../modals/permissionModal";
import deleteIcon from "@/assets/deleteIcon.png";
import grayArrowDown from "@/assets/grayArrowDown.png";
import { useRouter, useSearchParams } from "next/navigation";
import { updateQueryParams } from "@/lib";

interface permissionProps {
  isModalVisible: boolean | string | number;
  setModalVisible: React.Dispatch<
    React.SetStateAction<boolean | string | number>
  >;
}

const Permission: React.FC<permissionProps> = ({
  isModalVisible,
  setModalVisible,
}) => {
  const { replace } = useRouter();
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "10");
  const [permission, setpermission] = useState<Permission[]>([]);

  const fetchPermissions = async () => {
    try {
      const data = await fetchWithToken(
        `/permission/list?page=${page}&limit=${limit}`,
        // `/permission/list`,
        {
          method: "GET",
        }
      );
      setpermission(data?.content?.permission);
      updateQueryParams(
        {
          totalPages: data?.content?.totalPages?.toString(),
        },
        replace
      );
    } catch (error) {
      console.error("Failed to fetch permission:", error);
    }
  };

  useEffect(() => {
    fetchPermissions();
  }, [page, limit]);

  return (
    <>
      <Table className={"relative mt-5"}>
        <TableHead>
          <TableRow className="bg-[#F7F8F7]">
            <TableHeader className="!outline-none !border-b-0">
              <div className="flex items-center">
                Title
                <Image src={grayArrowDown} alt="" className="w-5 h-5 ml-2" />
              </div>
            </TableHeader>
            <TableHeader className="!outline-none !border-b-0"></TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {permission?.map((permission) => (
            <TableRow key={permission?.id}>
              <TableCell className="!outline-none !border-b-0">
                <div className="flex items-center max-w-min">
                  <div className="flex flex-col justify-center">
                    <div className="text-[16px] font-[600] mt-0">
                      {permission?.title}
                    </div>
                  </div>
                </div>
              </TableCell>
              {/* <TableCell className="!outline-none !border-b-0">
                <div className="flex items-center max-w-min">
                  <div className="flex flex-col justify-center">
                    <div className="text-[16px] font-[600] mt-0">
                      {permission?.description}
                    </div>
                  </div>
                </div>
              </TableCell> */}

              {/* <TableCell className="!outline-none !border-b-0 w-[120px] flex float-right">
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
              </TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <PermissionModal
        isModalVisible={isModalVisible}
        setModalVisible={setModalVisible}
        fetchPermissions={fetchPermissions}
      />
      {/* <DeleteModal
        route="department"
        content={content}
        visibilityState={deleteDepartmentModal}
        setState={setDeleteDepartmentModal}
        fetchAllCall={fetchDepartments}
      /> */}
    </>
  );
};

export default Permission;
