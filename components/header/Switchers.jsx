"use client";
import { useState } from "react";
import { useTheme } from "next-themes";
import ThemeSwitcher from "./ThemeSwitcher";
import LanguageSwitcher from "./LanguageSwitcher";
import ArrowIcon from "../ArrowIcon";

const DropdownSwitcher = ({ content, options }) => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const { resolvedTheme } = useTheme();

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  return (
    <div
      className="dropdown-block relative w-[89px] px-4 pb-1"
      onClick={toggleDropdown}
    >
      <span className="title-switcher relative cursor-pointer">{content}</span>
      <ArrowIcon
        width="20"
        height="20"
        color={resolvedTheme === "dark" ? "gray/5" : "gray/100"}
        className={`inline-block ml-1 transition-transform duration-300 ${
          isDropdownVisible ? "transform rotate-180" : ""
        }`}
      />
      <div
        className={`dropdown w-full absolute top-7 left-0 flex flex-col items-center gap-[10px] border rounded border-solid border-gray p-4 transition-opacity duration-300 
         ${isDropdownVisible ? "visible opacity-100" : "invisible opacity-0"} `}
      >
        {options}
      </div>
    </div>
  );
};

const Switchers = () => {
  return (
    <div className="flex">
      <DropdownSwitcher content="Тема" options={<ThemeSwitcher />} />
      <DropdownSwitcher content="Мова" options={<LanguageSwitcher />} />
    </div>
  );
};

export default Switchers;
