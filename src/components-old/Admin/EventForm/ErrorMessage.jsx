import { useEffect, useRef } from 'react';

const ErrorMessage = ({ errorMessage }) => {
  const errorMessageRef = useRef(null);
  useEffect(() => {
    const errorMessageEl = errorMessageRef.current;
    const errorMessageElRect = errorMessageEl.getBoundingClientRect();
    const isVisible =
      errorMessageElRect.top >= 0 &&
      errorMessageElRect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight);

    if (isVisible) {
      return;
    }

    if (errorMessageEl && errorMessage) {
      errorMessageEl.scrollIntoView({
        block: 'start',
        behavior: 'auto',
      });
      window.scrollBy({
        top: -150,
        behavior: 'smooth',
      });
    }
  }, [errorMessage]);
  return (
    <p
      className="absolute right-1/2 top-[calc(100%+10px)] flex translate-x-1/2 items-end gap-[10px] whitespace-nowrap rounded-[4px] border-[1px] border-[#858585] bg-[#ffffff] p-[8px]  text-[14px]  dark:bg-[#3b3b3b]"
      ref={errorMessageRef}
    >
      <svg
        className="absolute top-[0] -translate-y-[100%]"
        width="20"
        height="11"
        viewBox="0 0 20 11"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          className="fill-[#ffffff]   dark:fill-[#3b3b3b]"
          d="M10.2571 1L1 11H19L10.2571 1Z"
          fill="#3b3b3b"
        />
        <path d="M19 10.5L10 1L1 10.5" stroke="#858585" strokeLinecap="round" />
      </svg>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={23}
        height={23}
        viewBox="0 0 23 23"
      >
        <rect width="23" height="23" fill="#FD7806" rx="2" />
        <rect
          width="3.7"
          height="7.5"
          x="9.65"
          y="4.75"
          fill="#ffffff"
          stroke="#FED18C"
          strokeWidth=".5"
          rx=".25"
        />
        <circle
          cx="11.5"
          cy="16"
          r="1.75"
          fill="#ffffff"
          stroke="#FED18C"
          strokeWidth=".5"
        />
      </svg>
      {errorMessage}
    </p>
  );
};

export default ErrorMessage;
