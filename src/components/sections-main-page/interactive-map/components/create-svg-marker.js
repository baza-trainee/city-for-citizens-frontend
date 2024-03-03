export function createSvgMarker(isClicked) {
  const svg = document.createElement('div');

  svg.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 32 32" 
          class="text-light-primary dark:text-dark-primary transition-all 
          ${isClicked ? 'scale-[1.75] text-yellow ' : 'hover:text-yellow dark:hover:text-yellow scale-100'}">
            <path class="${isClicked ? 'dark:text-yellow' : ''} dark:text-light-primary text-dark-primary" fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.667" d="M26.667 13.333c0 8-10.667 16-10.667 16s-10.667-8-10.667-16a10.667 10.667 0 1 1 21.334 0Z"/>
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.667" d="M16 17.334a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"/>
        </svg>
      `;

  return svg;
}
