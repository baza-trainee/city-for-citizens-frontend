const IconMarkerPlace = props => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="15" fill="none">
      <path
        {...props}
        d="M6 14.167s5-4 5-8.334a5 5 0 1 0-10 0c0 4.334 5 8.334 5 8.334Z"
      />
      <path {...props} d="M6 7.833a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
    </svg>
  );
};

export default IconMarkerPlace;
