"use client";
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
import editIcon from "@/assets/editIcon.png";
import deleteIcon from "@/assets/deleteIcon.png";
import DeleteModal from "../modals/deleteModal";
import grayArrowDown from "@/assets/grayArrowDown.png";
import { useRouter, useSearchParams } from "next/navigation";
import { updateQueryParams } from "@/lib";

interface permissionProps {
  isModalVisible: boolean | Permission;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean | Permission>>;
}

const Permission: React.FC<permissionProps> = ({
  isModalVisible,
  setModalVisible,
}) => {
  const [content, setContent] = useState<string>("");
  const [deletePermissionModal, setDeletePermissiontModal] = useState<
    boolean | number | string
  >(false);
  const { replace } = useRouter();
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1");
  const pageSize = parseInt(searchParams.get("pageSize") || "10");
  const [permissions, setPermissions] = useState<Permission[]>([]);

  const fetchPermissions = async () => {
    try {
      const data = await fetchWithToken(
        `/permission/list?page=${page}&pageSize=${pageSize}`,
        {
          method: "GET",
        }
      );
      setPermissions(data?.content?.permission);
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
  }, [page, pageSize]);

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
          {permissions?.map((permission) => (
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

              <TableCell className="!outline-none !border-b-0 w-[120px] flex float-right">
                <div
                  onClick={() => setModalVisible(permission)}
                  className="w-[60px] h-full flex justify-center items-center cursor-pointer"
                >
                  <Image alt="editIcon" src={editIcon} className="w-6 h-6" />
                </div>
                <div
                  onClick={() => {
                    setDeletePermissiontModal(permission?.id);
                    setContent(permission?.title);
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
      <PermissionModal
        isModalVisible={isModalVisible}
        setModalVisible={setModalVisible}
        fetchPermissions={fetchPermissions}
      />
      <DeleteModal
        route="permission"
        content={content}
        visibilityState={deletePermissionModal}
        setState={setDeletePermissiontModal}
        fetchAllCall={fetchPermissions}
      />
    </>
  );
};

export default Permission;
