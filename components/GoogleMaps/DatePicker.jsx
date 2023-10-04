"use client";

import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import { useState } from "react";
import { uk } from "date-fns/locale";

// const eng = {
//   label: "",
//   InputText: "",
// };

const ukr = {
  label: "Оберіть час",
  InputText: "Час",
};

const DatePicker = () => {
  const [selectedDay, setSelectedDay] = useState();
  const [isDateVisible, setIsDateVisible] = useState(false);

  const selectedDateInputText = selectedDay ? (
    <span className={`${isDateVisible ? "text-gray/100 " : "text-gray/50"}`}>
      {format(selectedDay, "dd/MM/yy")}
    </span>
  ) : (
    <span className={`${!isDateVisible && "text-gray/30"}`}>
      {ukr.InputText}
    </span>
  );

  const setColorToggleIcon = selectedDay
    ? isDateVisible
      ? "stroke-gray/100"
      : "stroke-gray/50"
    : isDateVisible
    ? "stroke-gray/100"
    : "stroke-gray/30";

  const handleDateChange = (date) => {
    setSelectedDay(date);
    setIsDateVisible(!isDateVisible);
    console.log(date);
  };

  const handleDataInputClick = () => {
    setIsDateVisible(!isDateVisible);
  };

  return (
    <>
      <div className="relative w-[164px] ">
        <div>
          <p className="text-dark-blue text-[14px] leading-[1.5] -tracking-[0.154px] mb-[8px]">
            {ukr.label}
          </p>
          <div
            onClick={handleDataInputClick}
            className={`border-gray/20 transition-all flex items-center gap-[5px] p-[10px] rounded-[8px] border-black border-[1px]  
              ${
                isDateVisible
                  ? "rounded-bl-none rounded-br-none border-gray/100"
                  : ""
              } `}
          >
            <p className="text-[16px] leading-[1.5] -tracking-[0.176px]">
              {selectedDateInputText}
            </p>
            <svg
              className={`transition-all  ${setColorToggleIcon} ${
                isDateVisible && "-rotate-180 "
              }`}
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_255_3197)">
                <path
                  d="M18.5 9L12.5 15L6.5 9"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_255_3197">
                  <rect width="24" height="24" />
                </clipPath>
              </defs>
            </svg>
          </div>
        </div>

        <div
          className={`p-[10px] border-[1px] rounded-bl-[8px] rounded-br-[8px] border-t-0 bg-gray/5 border-gray/100  transition-all w-full absolute z-10 ${
            isDateVisible ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        >
          <DayPicker
            locale={uk}
            mode="single"
            showOutsideDays
            classNames={{
              root: "text-gray/80 w-full",
              caption: "hidden",
              table: "w-full",
              head_cell: "text-[12px] font-normal select-none capitalize",
              cell: "p-0 text-center hover:text-primary/100",
              day: "text-[12px] select-none",
              day_selected: "text-primary/100",
              day_outside: "text-gray/20 pointer-events-none",
            }}
            selected={selectedDay}
            onSelect={handleDateChange}
          />
        </div>
      </div>
    </>
  );
};
export default DatePicker;
