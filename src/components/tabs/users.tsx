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
import DeleteModal from "../modals/deleteModal";
import UserModal from "../modals/userModal";
import grayArrowDown from "@/assets/grayArrowDown.png";
import { updateQueryParams } from "@/lib";
import { useRouter, useSearchParams } from "next/navigation";

interface usersProps {
  isModalVisible: boolean | Profile;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean | Profile>>;
}

const Users: React.FC<usersProps> = ({ isModalVisible, setModalVisible }) => {
  const { replace } = useRouter();
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1");
  const pageSize = parseInt(searchParams.get("pageSize") || "10");
  const search = searchParams.get("search") || "";
  const [content, setContent] = useState<string>("");
  const [deleteUserModal, setDeleteUserModal] = useState<
    boolean | number | string
  >(false);
  const [users, setUsers] = useState<Profile[]>([]);

  const fetchUsers = async () => {
    try {
      const data = await fetchWithToken(
        `/user/list?page=${page}&pageSize=${pageSize}&search=${search}`,
        {
          method: "GET",
        }
      );
      setUsers(data?.content?.user);
      updateQueryParams(
        {
          totalPages: data?.content?.totalPages?.toString(),
          totalCount: data?.content?.totalCount?.toString(),
        },
        replace
      );
      console.log("data", data);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page, pageSize, search]);

  return (
    <>
      <Table className={"relative mt-5"}>
        <TableHead>
          <TableRow className="bg-[#F7F8F7]">
            <TableHeader className="!outline-none !border-b-0">
              <div className="flex items-center">
                Name
                {<Image src={grayArrowDown} alt="" className="w-5 h-5 ml-2" />}
              </div>
            </TableHeader>
            <TableHeader className="!outline-none !border-b-0">
              <div className="flex items-center">
                Email
                {<Image src={grayArrowDown} alt="" className="w-5 h-5 ml-2" />}
              </div>
            </TableHeader>
            <TableHeader className="!outline-none !border-b-0">
              <div className="flex items-center">
                Role Id
                {<Image src={grayArrowDown} alt="" className="w-5 h-5 ml-2" />}
              </div>
            </TableHeader>
            <TableHeader className="!outline-none !border-b-0">
              <div className="flex items-center">
                Password
                {<Image src={grayArrowDown} alt="" className="w-5 h-5 ml-2" />}
              </div>
            </TableHeader>
            <TableHeader className="!outline-none !border-b-0"></TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {users?.map((user) => {
            return (
              <TableRow key={user?.id}>
                <TableCell className="max-w-[100px] overflow-x-auto !outline-none !border-b-0">
                  <div className="flex items-center max-w-min">
                    <div className="flex flex-col justify-center">
                      <div className="text-[16px] font-[600] mt-0">
                        {user?.name}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="max-w-1/5 overflow-x-auto !outline-none !border-b-0">
                  <div className="flex items-center max-w-min">
                    <div className="flex flex-col justify-center">
                      <div className="text-[16px] font-[600] mt-0">
                        {user?.email}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="max-w-1/5 overflow-x-auto !outline-none !border-b-0">
                  <div className="flex items-center max-w-min">
                    <div className="flex flex-col justify-center">
                      <div className="text-[16px] font-[600] mt-0">
                        {user?.Role?.title}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="max-w-1/5 overflow-x-auto !outline-none !border-b-0">
                  <div className="flex items-center max-w-min">
                    <div className="flex flex-col justify-center">
                      <div className="text-[16px] font-[600] mt-0">
                        {user?.password}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="!outline-none !border-b-0 w-[120px] flex float-right">
                  <div
                    onClick={() => setModalVisible(user)}
                    className="w-[60px] h-full flex justify-center items-center cursor-pointer"
                  >
                    <Image alt="editIcon" src={editIcon} className="w-6 h-6" />
                  </div>
                  <div
                    onClick={() => {
                      setDeleteUserModal(user?.id);
                      setContent(user?.name);
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
      <UserModal
        isModalVisible={isModalVisible}
        setModalVisible={setModalVisible}
        fetchUsers={fetchUsers}
      />
      <DeleteModal
        route="users"
        content={content}
        visibilityState={deleteUserModal}
        setState={setDeleteUserModal}
        fetchAllCall={fetchUsers}
      />
    </>
  );
};

export default Users;
