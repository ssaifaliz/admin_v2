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

interface Location {
  id: number;
  hospital_name: string;
  addr_one: string;
  addr_two: string;
  city: string;
  state: string;
  country: string;
  postal_code: string;
}

interface LocationsProps {
  isModalVisible: boolean | string | number;
  setModalVisible: React.Dispatch<
    React.SetStateAction<boolean | string | number>
  >;
}

const Locations: React.FC<LocationsProps> = ({
  isModalVisible,
  setModalVisible,
}) => {
  const [content, setContent] = useState<string>("");
  const [locations, setLocations] = useState<Location[]>([]);
  const [deleteRequestModal, setDeleteRequestModal] = useState<
    boolean | string | number
  >(false);

  const fetchLocations = async () => {
    try {
      const data: Location[] = await fetchWithToken("/locations", {
        method: "GET",
      });
      setLocations(data);
      console.log("data", data);
    } catch (error) {
      console.error("Failed to fetch locations:", error);
    }
  };

  useEffect(() => {
    fetchLocations();
  }, []);

  return (
    <>
      <Location
        isModalVisible={isModalVisible}
        setModalVisible={setModalVisible}
        fetchLocations={fetchLocations}
      />
      <DeleteModal
        route="locations"
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
                Hospital
                <Image src={grayArrowDown} alt="" className="w-5 h-5 ml-2" />
              </div>
            </TableHeader>
            <TableHeader className="!outline-none !border-b-0">
              <div className="flex items-center">
                Address
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
          {locations?.map((each, index) => (
            <TableRow key={each?.id}>
              <TableCell className="!outline-none !border-b-0">
                <div className="flex items-center max-w-min">
                  <div className="flex flex-col justify-center">
                    <div className="text-[16px] font-[600] mt-0">
                      {each?.hospital_name}
                    </div>
                  </div>
                </div>
              </TableCell>
              <TableCell className="!outline-none !border-b-0">
                <div className="flex items-center max-w-min">
                  <div className="flex flex-col justify-center">
                    <div className="text-[16px] font-normal mt-0">
                      {each?.addr_one}
                    </div>
                    <div className="text-[16px] font-normal mt-0 text-[#5D6561]">
                      {each?.addr_two}
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
                  onClick={() => {
                    setModalVisible(each.id);
                  }}
                  className="w-[60px] h-full flex justify-center items-center cursor-pointer"
                >
                  <Image alt="editIcon" src={editIcon} className="w-6 h-6" />
                </div>
                <div
                  onClick={() => {
                    setDeleteRequestModal(each.id);
                    setContent(`schedule of ${each?.hospital_name}`);
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
