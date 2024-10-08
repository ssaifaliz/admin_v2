import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../catalyst/table";
import Image from "next/image";
import editIcon from "@/assets/editIcon.png";
import deleteIcon from "@/assets/deleteIcon.png";
import fetchWithToken from "@/utils/api";
import RoleModal from "../modals/roleModal";
import DeleteModal from "../modals/deleteModal";
import grayArrowDown from "@/assets/grayArrowDown.png";
import { updateQueryParams } from "@/lib";
import { useRouter, useSearchParams } from "next/navigation";

interface rolesProps {
  isModalVisible: boolean | Role;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean | Role>>;
}

const Roles: React.FC<rolesProps> = ({ isModalVisible, setModalVisible }) => {
  const { replace } = useRouter();
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1");
  const pageSize = parseInt(searchParams.get("pageSize") || "10");
  const search = searchParams.get("search") || "";
  const [content, setContent] = useState<string>("");
  const [deleteRoleModal, setDeleteRoleModal] = useState<
    boolean | number | string
  >(false);
  const [roles, setRoles] = useState([]);

  const fetchRoles = async () => {
    try {
      const data = await fetchWithToken(
        `/role/list?page=${page}&pageSize=${pageSize}&search=${search}`,
        {
          method: "GET",
        }
      );
      setRoles(data?.content?.role);
      updateQueryParams(
        {
          totalPages: data?.content?.totalPages?.toString(),
          totalCount: data?.content?.totalCount?.toString(),
        },
        replace
      );
      console.log("data", data);
    } catch (error) {
      console.error("Failed to fetch roles:", error);
    }
  };

  useEffect(() => {
    fetchRoles();
  }, [page, pageSize, search]);

  return (
    <>
      <Table className={"relative mt-5"}>
        <TableHead>
          <TableRow className="bg-[#F7F8F7]">
            <TableHeader className="!outline-none !border-b-0">
              <div className="flex items-center">
                Code Name
                {<Image src={grayArrowDown} alt="" className="w-5 h-5 ml-2" />}
              </div>
            </TableHeader>
            <TableHeader className="!outline-none !border-b-0">
              <div className="flex items-center">
                Permission
                {<Image src={grayArrowDown} alt="" className="w-5 h-5 ml-2" />}
              </div>
            </TableHeader>
            <TableHeader className="!outline-none !border-b-0">
              <div className="flex items-center">
                Title
                {<Image src={grayArrowDown} alt="" className="w-5 h-5 ml-2" />}
              </div>
            </TableHeader>
            <TableHeader className="!outline-none !border-b-0"></TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {roles?.map((each) => {
            const { id, code_name, permission, title }: any = each;
            return (
              <TableRow key={id}>
                <TableCell className="!outline-none !border-b-0">
                  <div className="flex items-center max-w-min">
                    <div className="flex flex-col justify-center">
                      <div className="text-[16px] font-[600] mt-0">
                        {code_name}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="!outline-none !border-b-0">
                  <div className="flex items-center max-w-min">
                    <div className="flex flex-col justify-center">
                      <div className="text-[16px] font-[600] mt-0">
                        <ul className="list-disc">
                          {permission.map((item: any, index: number) => (
                            <li key={index}>{item.title}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="!outline-none !border-b-0">
                  <div className="flex items-center max-w-min">
                    <div className="flex flex-col justify-center">
                      <div className="text-[16px] font-[600] mt-0">{title}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="!outline-none !border-b-0 w-[120px] flex float-right">
                  <div
                    onClick={() => {
                      setModalVisible(id);
                    }}
                    className="w-[60px] h-full flex justify-center items-center cursor-pointer"
                  >
                    <Image alt="editIcon" src={editIcon} className="w-6 h-6" />
                  </div>
                  <div
                    onClick={() => {
                      setDeleteRoleModal(id);
                      setContent(code_name);
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
            );
          })}
        </TableBody>
      </Table>
      <RoleModal
        isModalVisible={isModalVisible}
        setModalVisible={setModalVisible}
        fetchRoles={fetchRoles}
      />
      <DeleteModal
        route="role"
        content={content}
        visibilityState={deleteRoleModal}
        setState={setDeleteRoleModal}
        fetchAllCall={fetchRoles}
      />
    </>
  );
};

export default Roles;
