"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const LanguageSwitcher = () => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };
  return (
    <div
      className=" dropdown-block relative w-[89px] px-4 pb-1"
      onClick={toggleDropdown}
    >
      <span className="title-switcher relative cursor-pointer">Мова</span>
      <Image
        src="/icons/arrow.svg"
        width="20"
        height="20"
        className={`inline-block ml-1 transition-transform duration-300 ${
          isDropdownVisible ? "transform rotate-180" : ""
        }`}
      />
      <ul
        className={`dropdown w-full absolute top-7 left-0 flex flex-col gap-[10px] border rounded border-solid border-gray p-4 transition-opacity duration-300 
       ${isDropdownVisible ? "visible opacity-100" : "invisible opacity-0"} `}
      >
        <li className="text-center h-5">
          <Link href="/" style={{ height: "100%" }}>
            Укр
          </Link>
        </li>
        <li className="text-center h-5">
          <Link href="/En" style={{ height: "100%" }}>
            Eng
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default LanguageSwitcher;
