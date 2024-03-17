import { useCallback, useMemo } from 'react';
import { Marker, Popup, Tooltip } from 'react-leaflet';

import { EventCard } from './event-card';
import { TooltipEventCard } from './tooltip-event-card';
import Leaflet from 'leaflet';

import { useMedia } from 'react-use';

export function MapMarker({ event }) {
  const isTablet = useMedia('(min-width: 768px)');

  const createSvgMarker = useCallback(color => {
    const svg = document.createElement('div');

    svg.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 32 32" 
        style="color: ${color};" class="transition-all hover:!text-yellow">
          <path class="text-dark-primary" fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.667" d="M26.667 13.333c0 8-10.667 16-10.667 16s-10.667-8-10.667-16a10.667 10.667 0 1 1 21.334 0Z"/>
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.667" d="M16 17.334a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"/>
      </svg>
    `;

    return svg;
  }, []);

  const customIconDiv = Leaflet.divIcon({
    html: createSvgMarker('#FFFFFF'),
    className: '',
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -16],
    tooltipAnchor: [0, -16],
  });

  const clickedIconDiv = Leaflet.divIcon({
    html: createSvgMarker('#FFD646'),
    className: '',
    iconSize: [56, 56],
    iconAnchor: [28, 28],
    popupAnchor: [0, -28],
    tooltipAnchor: [0, -28],
  });

  const handlePopupClose = useCallback(
    ({ target }) => {
      target.setIcon(customIconDiv);
    },
    [customIconDiv]
  );

  const handleClickMarker = useCallback(
    ({ target }) => {
      target.setIcon(clickedIconDiv);
    },
    [clickedIconDiv]
  );

  const markerHandlers = useMemo(
    () => ({
      click: handleClickMarker,
      popupclose: handlePopupClose,
    }),
    [handleClickMarker, handlePopupClose]
  );

  const coordinates = event.eventAddress.coordinates.split(',');

  return (
    <Marker
      riseOnHover
      eventHandlers={markerHandlers}
      icon={customIconDiv}
      position={coordinates}
    >
      <Popup maxWidth={400} closeButton={false} pane="tooltipPane">
        <EventCard event={event} />
      </Popup>

      {isTablet && (
        <Tooltip opacity="1" direction="top" pane="popupPane">
          <TooltipEventCard event={event} />
        </Tooltip>
      )}
    </Marker>
  );
}
