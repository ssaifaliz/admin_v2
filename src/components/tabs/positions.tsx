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
import PositionModal from "../modals/positionModal";
import DeleteModal from "../modals/deleteModal";
import grayArrowDown from "@/assets/grayArrowDown.png";
import { useSearchParams, useRouter } from "next/navigation";
import { updateQueryParams } from "@/lib";

interface positionProps {
  isModalVisible: boolean | Position;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean | Position>>;
}

const Positions: React.FC<positionProps> = ({
  isModalVisible,
  setModalVisible,
}) => {
  const { replace } = useRouter();
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1");
  const pageSize = parseInt(searchParams.get("pageSize") || "10");
  const search = searchParams.get("search") || "";
  const [positions, setPositions] = useState<Position[]>([]);
  const [content, setContent] = useState<string>("");
  const [deletePositionModal, setDeletePositionModal] = useState<
    boolean | number | string
  >(false);

  const fetchPositons = async () => {
    try {
      const data = await fetchWithToken(
        `/position/list?page=${page}&pageSize=${pageSize}&search=${search}`,
        {
          method: "GET",
        }
      );
      setPositions(data?.content?.position);
      updateQueryParams(
        {
          totalPages: data?.content?.totalPages?.toString(),
          totalCount: data?.content?.totalCount?.toString(),
        },
        replace
      );
    } catch (error) {
      console.error("Failed to fetch positions:", error);
    }
  };

  useEffect(() => {
    fetchPositons();
  }, [page, pageSize, search]);

  return (
    <>
      <Table className={"relative mt-5"}>
        <TableHead>
          <TableRow className="bg-[#F7F8F7]">
            <TableHeader className="!outline-none !border-b-0">
              <div className="flex items-center">
                Position
                <Image src={grayArrowDown} alt="" className="w-5 h-5 ml-2" />
              </div>
            </TableHeader>
            <TableHeader className="!outline-none !border-b-0"></TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {positions?.map((position) => {
            return (
              <TableRow key={position?.id}>
                <TableCell className="!outline-none !border-b-0">
                  <div className="flex items-center max-w-min">
                    <div className="flex flex-col justify-center">
                      <div className="text-[16px] font-[600] mt-0">
                        {position?.title}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="!outline-none !border-b-0 w-[120px] flex float-right">
                  <div
                    onClick={() => setModalVisible(position)}
                    className="w-[60px] h-full flex justify-center items-center cursor-pointer"
                  >
                    <Image alt="editIcon" src={editIcon} className="w-6 h-6" />
                  </div>
                  <div
                    onClick={() => {
                      setDeletePositionModal(position?.id);
                      setContent(position?.title);
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
      <PositionModal
        isModalVisible={isModalVisible}
        setModalVisible={setModalVisible}
        fetchPositions={fetchPositons}
      />
      <DeleteModal
        route="positions"
        content={content}
        visibilityState={deletePositionModal}
        setState={setDeletePositionModal}
        fetchAllCall={fetchPositons}
      />
    </>
  );
};

export default Positions;
