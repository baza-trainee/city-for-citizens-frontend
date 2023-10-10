const CloseButton = props => {
  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15.0003 28.3332C22.3641 28.3332 28.3337 22.3636 28.3337 14.9998C28.3337 7.63604 22.3641 1.6665 15.0003 1.6665C7.63653 1.6665 1.66699 7.63604 1.66699 14.9998C1.66699 22.3636 7.63653 28.3332 15.0003 28.3332Z"
        {...props}
        stroke-width="2"
        stroke-linejoin="round"
      />
      <path
        d="M18.771 11.2285L11.2285 18.771"
        {...props}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M11.2285 11.2285L18.771 18.771"
        {...props}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default CloseButton;
