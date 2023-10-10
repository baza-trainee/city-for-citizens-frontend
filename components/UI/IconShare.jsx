const ShareIcon = props => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none">
      <path
        stroke="#0D3BDD"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        {...props}
        d="M14 3h7v7M21 14.737V19.5a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 19.5v-15A1.5 1.5 0 0 1 4.5 3H9M12.9 11.1l7.65-7.65"
      />
    </svg>
  );
};

export default ShareIcon;
