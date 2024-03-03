import { useEffect, useState } from 'react';
import { Marker, useMap } from 'react-leaflet';
import { createSvgMarker } from './create-svg-marker';
import { EventCard } from './event-card';
import { TooltipEventCard } from './tooltip-event-card';
import Leaflet from 'leaflet';

export function MapMarker({ event }) {
  const [isClicked, setIsClicked] = useState(false);
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);

  const map = useMap();

  useEffect(() => {
    function handlePopupclose() {
      setIsClicked(false);
    }

    function handleTooltipopen() {
      setIsTooltipOpen(true);
    }

    function handleTooltipClose() {
      setIsTooltipOpen(false);
    }
    map.on('popupclose', handlePopupclose);
    map.on('tooltipopen', handleTooltipopen);
    map.on('tooltipclose', handleTooltipClose);
    return () => {
      map.off('popupclose', handlePopupclose);
      map.off('tooltipopen', handleTooltipopen);
      map.off('tooltipclose', handleTooltipClose);
    };
  }, [map]);

  const customIconDiv = Leaflet.divIcon({
    html: createSvgMarker(isClicked),
    className: '',
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -16],
    tooltipAnchor: [0, -16],
  });

  return (
    <div>
      <Marker
        eventHandlers={{
          click: () => {
            setIsClicked(true);
          },
        }}
        icon={customIconDiv}
        position={event.eventAddress.coordinates.split(', ')}
      >
        <div className={`transition-opacity ${isTooltipOpen && 'opacity-80'}`}>
          <EventCard event={event} isClicked={isClicked} />
        </div>

        {!isClicked && <TooltipEventCard event={event} />}
      </Marker>
    </div>
  );
}

