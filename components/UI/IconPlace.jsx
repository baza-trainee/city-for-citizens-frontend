const IconMarkerPlace = props => {
  return (
    <svg
      width="12"
      height="15"
      viewBox="0 0 12 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6 14.1666C6 14.1666 11 10.1666 11 5.83325C11 3.07182 8.76143 0.833252 6 0.833252C3.23857 0.833252 1 3.07182 1 5.83325C1 10.1666 6 14.1666 6 14.1666Z"
        {...props}
        stroke-linejoin="round"
      />
      <path
        d="M6 7.83325C7.10457 7.83325 8 6.93782 8 5.83325C8 4.72869 7.10457 3.83325 6 3.83325C4.89543 3.83325 4 4.72869 4 5.83325C4 6.93782 4.89543 7.83325 6 7.83325Z"
        {...props}
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default IconMarkerPlace;
