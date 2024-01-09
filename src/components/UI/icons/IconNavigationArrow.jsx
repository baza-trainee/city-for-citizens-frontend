const IconNavigationArrow = props => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 7 12"
      {...props}
      width={24}
      height={24}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="m1 1 5 5-5 5"
      />
      <path
        strokeWidth="1.7"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m1 1 5 5-5 5"
      />
    </svg>
  );
};

export default IconNavigationArrow;
