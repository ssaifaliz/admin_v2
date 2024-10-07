import React, { useState, useEffect, useRef, ChangeEvent } from "react";
import downArrow from "@/assets/downArrow.png";
import "./style.css";
import Image from "next/image";
import fetchWithToken from "@/utils/api";

const MultiSelect = ({
  options,
  selectedOptions,
  setSelectedOptions,
}: {
  options: any[];
  selectedOptions: any[];
  setSelectedOptions: any;
}) => {
  const [dropdownActive, setDropdownActive] = useState(false);
  const [cursor, setCursor] = useState(0);

  const multiSelectRef = useRef<HTMLDivElement | null>(null);

  const handleDropdownClick = () => {
    setCursor(0);
    setDropdownActive(!dropdownActive);
  };

  const handleOptionChange = (e: ChangeEvent<HTMLInputElement>) => {
    let newSelectedOptions: any[] = [];

    if (e.target.checked) {
      const selectedItem = options?.find(
        (opt: any) => opt.value?.toString() === e.target.value?.toString()
      );
      if (selectedItem) {
        newSelectedOptions = [...selectedOptions, selectedItem];
      }
    } else {
      newSelectedOptions = selectedOptions.filter(
        (opt) => opt.value?.toString() !== e.target.value?.toString()
      );
    }
    setSelectedOptions(newSelectedOptions);
  };

  const isChecked = (value: string) => {
    return selectedOptions?.some((item) => item.value === value);
  };

  // useEffect(() => {
  //   fetchDepartments(setDepartments);
  // }, []);

  useEffect(() => {
    const handleMousedown = (e: MouseEvent) => {
      if (
        multiSelectRef.current &&
        !multiSelectRef.current.contains(e.target as Node)
      ) {
        if (dropdownActive) {
          setDropdownActive(false);
        }
      }
    };

    document.addEventListener("mousedown", handleMousedown as EventListener);
    return () => {
      document.removeEventListener(
        "mousedown",
        handleMousedown as EventListener
      );
    };
  }, [dropdownActive]);

  return (
    <div
      className={`multiselect-wrapper rounded-[8px] mx-[10px] z-[1]`}
      ref={multiSelectRef}
    >
      <div
        className="multiselect__control relative w-[200px] h-[40px] flex items-center justify-between bg-[#f7f8f7] px-2 text-[16px] font-[600] cursor-pointer"
        onClick={handleDropdownClick}
      >
        <div className="w-[180px] flex h-[40px] overflow-x-auto scrollbar-hidden items-center">
          <span
            className={`multiselect__placeholder ${
              selectedOptions?.length ? "is-hidden" : ""
            }`}
          >
            Choose Department...
          </span>

          {selectedOptions?.map((option) => (
            <div key={option.value} className="multiselect-choices__item">
              {option.name}
            </div>
          ))}
        </div>
        <Image alt="downArrow" src={downArrow} className="w-[13px] ml-1" />
      </div>
      <div
        className={`multiselect__result-area absolute  w-[200px] ${
          dropdownActive ? "is-active" : ""
        }`}
      >
        <ul className="multiselect-results">
          {options?.map((option, index) => (
            <li
              key={option.value}
              className={`multiselect-results__item 
           
              ${index === cursor ? "is-highlighted" : ""}`}
            >
              <input
                type="checkbox"
                onChange={handleOptionChange}
                className="custom-checkbox"
                id={`opt-${option.value}`}
                value={option.value}
                checked={isChecked(option.value)}
              />
              <label
                htmlFor={`opt-${option.value}`}
                className="custom-checkbox-label"
              >
                {option.name}
              </label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MultiSelect;
