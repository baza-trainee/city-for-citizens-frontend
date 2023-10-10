const CloseButton = props => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 30 30">
      <path
        {...props}
        d="M15 28.333c7.364 0 13.334-5.97 13.334-13.333 0-7.364-5.97-13.334-13.334-13.334C7.637 1.666 1.667 7.636 1.667 15S7.637 28.333 15 28.333Zm3.771-17.104-7.543 7.542m.001-7.542 7.542 7.542"
      />
    </svg>
  );
};

export default CloseButton;
