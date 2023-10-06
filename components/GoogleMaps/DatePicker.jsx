"use client";

import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import { useState } from "react";
import { uk } from "date-fns/locale";

const activeDates = ["2023-10-10", "2023-10-15", "2023-10-20"];

// const eng = {
//   label: "",
//   InputText: "",
// };

const ukr = {
  label: "Оберіть час",
  InputText: "Час",
};

const isDateActive = (date) => activeDates.includes(format(date, "yyyy-MM-dd"));

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
            >
              <use href="icons/sprite.svg#icon-select-toggle"></use>
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

              day_disabled: "text-gray/20 pointer-events-none",
            }}
            disabled={(date) => !isDateActive(date)}
            selected={selectedDay}
            onSelect={handleDateChange}
          />
        </div>
      </div>
    </>
  );
};
export default DatePicker;
