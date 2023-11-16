import { InfoWindow, Marker } from '@react-google-maps/api';
import { useState } from 'react';

import EventCard from '../../eventCard/EventCard';
import IconMapMarker from '../../icons/IconMapMarker';

import { useTheme } from 'next-themes';
import '../customStyles/info-window.css';
import ModalOnHover from './ModalOnHover';

const EventItem = ({ event, activeMarker, setActiveMarker }) => {
  const { eventAddress, idIdentifier } = event;
  const [showTitleOnHover, setShowTitleOnHover] = useState(false);
  const { theme } = useTheme();

  const [isHovered, setIsHovered] = useState(false);

  const handleMarkerHover = () => {
    setIsHovered(true);
    setShowTitleOnHover(true);
  };

  const handleMarkerUnhover = () => {
    setIsHovered(false);
    setShowTitleOnHover(false);
  };

  const handleActiveMarker = marker => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };

  const [lat, lng] = eventAddress.coordinates.split(',');

  IconMapMarker;

  return (
    <>
      <Marker
        onMouseOver={handleMarkerHover}
        onMouseOut={handleMarkerUnhover}
        onClick={() => handleActiveMarker(idIdentifier)}
        position={{ lat: Number(lat), lng: Number(lng) }}
        icon={{
          anchor: new google.maps.Point(12, 24),
          ...IconMapMarker({ isHovered, theme }),
        }}
      >
        {activeMarker !== idIdentifier && showTitleOnHover ? (
          <InfoWindow>
            <ModalOnHover event={event} />
          </InfoWindow>
        ) : null}
        {activeMarker === idIdentifier ? (
          <InfoWindow onCloseClick={() => setActiveMarker(null)}>
            <EventCard event={event} setActiveMarker={setActiveMarker} />
          </InfoWindow>
        ) : null}
      </Marker>
    </>
  );
};
export default EventItem;
