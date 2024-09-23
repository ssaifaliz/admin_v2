import Image from "next/image";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/catalyst/table";
import { useEffect, useState } from "react";
import fetchWithToken from "@/utils/api";
import DeleteModal from "../modals/deleteModal";
import Profile from "../modals/profile";
import dp from "@/assets/dp.png";
import deleteIcon from "@/assets/deleteIcon.png";
import editIcon from "@/assets/editIcon.png";
import grayArrowDown from "@/assets/grayArrowDown.png";

interface ProfilesProps {
  isModalVisible: boolean | string | number;
  setModalVisible: React.Dispatch<
    React.SetStateAction<boolean | string | number>
  >;
}

interface User {
  id: number;
  username: string;
  password: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

interface Department {
  id: number;
  dept_name: string;
  locationId: number;
  createdAt: string;
  updatedAt: string;
}

interface Position {
  id: number;
  position_name: string;
  createdAt: string;
  updatedAt: string;
}

interface Role {
  id: number;
  role: string;
  code_name: string;
  createdAt: string;
  updatedAt: string;
}

interface Profile {
  id: number;
  emp_id: string;
  first_name: string;
  last_name: string;
  email: string;
  contact: string;
  profilePicture: string | null;
  userId: number;
  deptId: number;
  positionId: number;
  roleId: number;
  createdAt: string;
  updatedAt: string;
  User: User;
  department: Department;
  position: Position;
  role: Role;
}

const Profiles: React.FC<ProfilesProps> = ({
  isModalVisible,
  setModalVisible,
}) => {
  const [content, setContent] = useState<string>("");
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [deleteRequestModal, setDeleteRequestModal] = useState<
    boolean | string | number
  >(false);

  const fetchProfiles = async () => {
    try {
      const data = await fetchWithToken("/profiles", {
        method: "GET",
      });
      setProfiles(data);
      console.log("data", data);
    } catch (error) {
      console.error("Failed to fetch swap requests:", error);
    }
  };

  useEffect(() => {
    fetchProfiles();
  }, []);
  return (
    <>
      <DeleteModal
        route="profiles"
        content={content}
        visibilityState={deleteRequestModal}
        setState={setDeleteRequestModal}
        fetchAllCall={fetchProfiles}
      />
      <Profile
        isModalVisible={isModalVisible}
        setModalVisible={setModalVisible}
        fetchProfiles={fetchProfiles}
      />
      <Table className={"w-full mt-5"}>
        <TableHead>
          <TableRow className="bg-[#F7F8F7]">
            <TableHeader className="!outline-none !border-b-0">
              <div className="flex items-center">
                Employee ID
                {<Image src={grayArrowDown} alt="" className="w-5 h-5 ml-2" />}
              </div>
            </TableHeader>
            <TableHeader className="!outline-none !border-b-0">
              <div className="flex items-center">
                Profiles
                {<Image src={grayArrowDown} alt="" className="w-5 h-5 ml-2" />}
              </div>
            </TableHeader>
            <TableHeader className="!outline-none !border-b-0">
              <div className="flex items-center">
                Contact
                {<Image src={grayArrowDown} alt="" className="w-5 h-5 ml-2" />}
              </div>
            </TableHeader>
            <TableHeader className="!outline-none !border-b-0">
              <div className="flex items-center">
                User Name
                {<Image src={grayArrowDown} alt="" className="w-5 h-5 ml-2" />}
              </div>
            </TableHeader>
            <TableHeader className="!outline-none !border-b-0">
              <div className="flex items-center">
                Department
                {<Image src={grayArrowDown} alt="" className="w-5 h-5 ml-2" />}
              </div>
            </TableHeader>
            <TableHeader className="!outline-none !border-b-0">
              <div className="flex items-center">
                Position
                {<Image src={grayArrowDown} alt="" className="w-5 h-5 ml-2" />}
              </div>
            </TableHeader>
            <TableHeader className="!outline-none !border-b-0">
              <div className="flex items-center">
                Role
                {<Image src={grayArrowDown} alt="" className="w-5 h-5 ml-2" />}
              </div>
            </TableHeader>
            <TableHeader className="!outline-none !border-b-0"></TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {profiles?.map((each) => (
            <TableRow key={each?.id}>
              <TableCell className="!outline-none !border-b-0">
                {each?.emp_id}
              </TableCell>
              <TableCell className="!outline-none !border-b-0">
                <div className="flex items-center">
                  <Image alt="profile" src={dp} className="w-[36px]" />
                  <div className="flex flex-col justify-center ml-1">
                    <div className="text-[16px] font-[600] mt-0">
                      {`${each?.first_name} ${each?.last_name}`}
                    </div>
                    <div className="text-[12px] -mt-2">{each?.email}</div>
                  </div>
                </div>
              </TableCell>
              <TableCell className="!outline-none !border-b-0">
                {each?.contact}
              </TableCell>
              <TableCell className="!outline-none !border-b-0">
                {each?.User?.username}
              </TableCell>
              <TableCell className="!outline-none !border-b-0">
                {each?.department?.dept_name}
              </TableCell>
              <TableCell className="!outline-none !border-b-0">
                {each?.position?.position_name}
              </TableCell>
              <TableCell className="!outline-none !border-b-0">
                {each?.role?.role}
              </TableCell>
              <TableCell className="!outline-none !border-b-0 w-[120px] flex float-right">
                <div
                  onClick={() => {
                    setModalVisible(each?.id);
                  }}
                  className="w-[60px] h-full flex justify-center items-center cursor-pointer"
                >
                  <Image alt="editIcon" src={editIcon} className="w-6 h-6" />
                </div>
                <div
                  onClick={() => {
                    setDeleteRequestModal(each?.id);
                    setContent(`${each?.first_name} ${each?.last_name}`);
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
    </>
  );
};

export default Profiles;
