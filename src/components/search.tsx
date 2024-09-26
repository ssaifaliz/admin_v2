import Image from "next/image";
import React, { useEffect, useState } from "react";
import searchImg from "@/assets/search.png";
import { useRouter, useSearchParams } from "next/navigation";
import { updateQueryParams } from "@/lib";

const Search = () => {
  const { replace } = useRouter();
  const searchParams = useSearchParams();
  const search = searchParams.get("search") || "";
  const [typedText, setTypedText] = useState(search);
  useEffect(
    () => updateQueryParams({ search: typedText }, replace),
    [typedText]
  );
  return (
    <div className="h-full w-[320px] bg-[#FDFDFF] rounded-lg border border-[#7E8581] ml-4 px-4 py-2 flex justify-between">
      <input
        type="text"
        placeholder="Search"
        className="outline-none w-[250px] text-sm font-normal leading-[22px] bg-[#FDFDFF]"
        onChange={(e) => setTypedText((e.target as HTMLInputElement).value)}
        value={typedText}
      />
      <Image src={searchImg} alt="search" className="w-5 h-5" />
    </div>
  );
};

export default Search;
