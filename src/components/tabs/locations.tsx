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
import DeleteModal from "../modals/deleteModal";
import fetchWithToken from "@/utils/api";
import Location from "../modals/location";
import editIcon from "@/assets/editIcon.png";
import deleteIcon from "@/assets/deleteIcon.png";
import grayArrowDown from "@/assets/grayArrowDown.png";
import { useRouter, useSearchParams } from "next/navigation";
import { updateQueryParams } from "@/lib";

interface LocationsProps {
  isModalVisible: boolean | Locations;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean | Locations>>;
}

const Locations: React.FC<LocationsProps> = ({
  isModalVisible,
  setModalVisible,
}) => {
  const [content, setContent] = useState<string>("");
  const [locations, setLocations] = useState<Locations[]>([]);
  const [deleteRequestModal, setDeleteRequestModal] = useState<
    boolean | string | number
  >(false);

  const { replace } = useRouter();
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "10");

  const fetchLocations = async () => {
    try {
      const data = await fetchWithToken(
        `/location/list?page=${page}&limit=${limit}`,
        {
          method: "GET",
        }
      );
      setLocations(data?.content?.location);
      updateQueryParams(
        {
          totalPages: data?.content?.totalPages?.toString(),
        },
        replace
      );
    } catch (error) {
      console.error("Failed to fetch locations:", error);
    }
  };

  useEffect(() => {
    fetchLocations();
  }, [page, limit]);

  return (
    <>
      <Location
        isModalVisible={isModalVisible}
        setModalVisible={setModalVisible}
        fetchLocations={fetchLocations}
      />
      <DeleteModal
        route="location"
        content={content}
        visibilityState={deleteRequestModal}
        setState={setDeleteRequestModal}
        fetchAllCall={fetchLocations}
      />
      <Table className={"relative mt-5"}>
        <TableHead>
          <TableRow className="bg-[#F7F8F7]">
            <TableHeader className="!outline-none !border-b-0">
              <div className="flex items-center">
                Address 1
                <Image src={grayArrowDown} alt="" className="w-5 h-5 ml-2" />
              </div>
            </TableHeader>
            <TableHeader className="!outline-none !border-b-0">
              <div className="flex items-center">
                Address 2
                <Image src={grayArrowDown} alt="" className="w-5 h-5 ml-2" />
              </div>
            </TableHeader>
            <TableHeader className="!outline-none !border-b-0">
              <div className="flex items-center">
                City
                <Image src={grayArrowDown} alt="" className="w-5 h-5 ml-2" />
              </div>
            </TableHeader>
            <TableHeader className="!outline-none !border-b-0">
              <div className="flex items-center">
                State
                <Image src={grayArrowDown} alt="" className="w-5 h-5 ml-2" />
              </div>
            </TableHeader>
            <TableHeader className="!outline-none !border-b-0">
              <div className="flex items-center">
                Country
                <Image src={grayArrowDown} alt="" className="w-5 h-5 ml-2" />
              </div>
            </TableHeader>
            <TableHeader className="!outline-none !border-b-0">
              <div className="flex items-center">
                Postal Code
                <Image src={grayArrowDown} alt="" className="w-5 h-5 ml-2" />
              </div>
            </TableHeader>
            <TableHeader className="!outline-none !border-b-0"></TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {locations?.map((each) => (
            <TableRow key={each?.id}>
              <TableCell className="!outline-none !border-b-0">
                <div className="flex items-center max-w-min">
                  <div className="flex flex-col justify-center">
                    <div className="text-[16px] font-[600] mt-0">
                      {each?.address_1}
                    </div>
                  </div>
                </div>
              </TableCell>
              <TableCell className="!outline-none !border-b-0">
                <div className="flex items-center max-w-min">
                  <div className="flex flex-col justify-center">
                    <div className="text-[16px] font-normal mt-0">
                      {each?.address_2}
                    </div>
                  </div>
                </div>
              </TableCell>
              <TableCell className="!outline-none !border-b-0">
                <div className="flex items-center max-w-min">
                  <div className="flex flex-col justify-center">
                    <div className="text-[16px] font-[600] mt-0">
                      {each?.city}
                    </div>
                  </div>
                </div>
              </TableCell>
              <TableCell className="!outline-none !border-b-0">
                <div className="flex items-center max-w-min">
                  <div className="flex flex-col justify-center">
                    <div className="text-[16px] font-[600] mt-0">
                      {each?.state}
                    </div>
                  </div>
                </div>
              </TableCell>
              <TableCell className="!outline-none !border-b-0">
                <div className="flex items-center max-w-min">
                  <div className="flex flex-col justify-center">
                    <div className="text-[16px] font-[600] mt-0">
                      {each?.country}
                    </div>
                  </div>
                </div>
              </TableCell>
              <TableCell className="!outline-none !border-b-0">
                <div className="flex items-center max-w-min">
                  <div className="flex flex-col justify-center">
                    <div className="text-[16px] font-[600] mt-0">
                      {each?.postal_code}
                    </div>
                  </div>
                </div>
              </TableCell>
              <TableCell className="!outline-none !border-b-0 w-[120px] flex float-right h-16 items-center">
              <div
                    onClick={() => setModalVisible(each)}
                    className="w-[60px] h-full flex justify-center items-center cursor-pointer"
                  >
                    <Image alt="editIcon" src={editIcon} className="w-6 h-6" />
                  </div>
                <div
                  onClick={() => {
                    setDeleteRequestModal(each.id);
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

export default Locations;
