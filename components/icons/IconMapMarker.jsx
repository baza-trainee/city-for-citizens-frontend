const IconMapMarker = ({ isHovered, theme }) => {
  const initialSvgMarker = {
    path: 'M12 22s7.5-6 7.5-12.5a7.5 7.5 0 0 0-15 0C4.5 16 12 22 12 22Z M12 12.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z',
    fillColor: 'none',
    strokeWeight: 2,
    strokeColor:
      theme === 'dark'
        ? isHovered
          ? '#6589E3'
          : '#F6F6F6'
        : isHovered
        ? '#0D3BDD'
        : '#121923',
    scale: 1.5,
  };

  return initialSvgMarker;
};
export default IconMapMarker;
