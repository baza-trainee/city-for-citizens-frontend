export function createSvgMarker(isHover, isShow, theme) {
  function setColor(hover, show, theme) {
    if (theme === 'dark') {
      return hover || show ? '#6589E3' : '#F6F6F6';
    }
    return hover || show ? '#0D3BDD' : '#121923';
  }

  const svg = document.createElement('div');
  svg.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" style="cursor:pointer;" class="marker-icon" fill="none" width=25 heigh=24 viewBox="0 0 25 24">
      <path
        class="marker-icon"
        stroke=${setColor(isHover, isShow, theme)}
        stroke-linejoin="round"
        stroke-width="2"
        d="M12 22s7.5-6 7.5-12.5a7.5 7.5 0 0 0-15 0C4.5 16 12 22 12 22Z M12 12.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
      />
    </svg>
    `;

  return svg;
}
