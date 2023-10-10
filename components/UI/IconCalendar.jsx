const IconCalendar = props => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="17"
      viewBox="0 0 16 17"
      fill="none"
    >
      <g clipPath="url(#a)">
        <path
          {...props}
          d="M14 3.167H2a.667.667 0 0 0-.667.666V14.5c0 .368.298.667.667.667h12a.667.667 0 0 0 .666-.667V3.833A.667.667 0 0 0 14 3.167ZM1.333 7.167h13.333M1.333 11.167h13.333M5.667 1.833V4.5M10.333 1.833V4.5M5.667 7.167v8M10.333 7.167v8M14.667 4.833V13.5M1.333 4.833V13.5M4.667 15.167h6.667"
        />
      </g>
      <defs>
        <clipPath id="a">
          <path fill="#fff" d="M0 .5h16v16H0z" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default IconCalendar;
