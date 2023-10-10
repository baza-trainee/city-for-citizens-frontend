const IconClock = (props) => {
  return (
    <svg
      width="16"
      height="15"
      viewBox="0 0 16 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.99967 14.1666C11.6816 14.1666 14.6663 11.1818 14.6663 7.49992C14.6663 3.81802 11.6816 0.833252 7.99967 0.833252C4.31777 0.833252 1.33301 3.81802 1.33301 7.49992C1.33301 11.1818 4.31777 14.1666 7.99967 14.1666Z"
        {...props}
        stroke-linejoin="round"
      />
      <path
        d="M8.00235 3.5L8.00195 7.50293L10.8284 10.3294"
        {...props}
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default IconClock;
