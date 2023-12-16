export function createSvgMarker(showOnHover, showOnClick, theme) {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  svg.setAttribute('width', '25');
  svg.setAttribute('height', '24');
  svg.setAttribute('viewBox', '0 0 25 24');
  svg.setAttribute('fill', 'none');
  svg.setAttribute('style', 'cursor:pointer;');
  svg.innerHTML = `
  <g clip-path="url(#clip0_270_3890)">
    <path d="M12.25 22C12.25 22 19.75 16 19.75 9.5C19.75 5.35785 16.3921 2 12.25 2C8.10785 2 4.75 5.35785 4.75 9.5C4.75 16 12.25 22 12.25 22Z" stroke=${
      theme === 'dark'
        ? showOnHover || showOnClick
          ? '#6589E3'
          : '#F6F6F6'
        : showOnHover || showOnClick
        ? '#0D3BDD'
        : '#121923'
    } stroke-width="2" stroke-linejoin="round"/>
    <path d="M12.25 12.5C13.9068 12.5 15.25 11.1568 15.25 9.5C15.25 7.84315 13.9068 6.5 12.25 6.5C10.5932 6.5 9.25 7.84315 9.25 9.5C9.25 11.1568 10.5932 12.5 12.25 12.5Z" stroke=${
      theme === 'dark'
        ? showOnHover || showOnClick
          ? '#6589E3'
          : '#F6F6F6'
        : showOnHover || showOnClick
        ? '#0D3BDD'
        : '#121923'
    } stroke-width="2" stroke-linejoin="round"/>
  </g>
  <defs>
    <clipPath id="clip0_270_3890">
      <rect width="24" height="24" fill="white" transform="translate(0.25)"/>
    </clipPath>
  </defs>
</svg>`;

  return svg;
}
