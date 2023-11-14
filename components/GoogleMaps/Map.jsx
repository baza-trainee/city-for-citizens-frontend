'use client';

import { GoogleMap, MarkerF, useJsApiLoader } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '865px',
};

const center = {
  lat: 49.04761451133044,
  lng: 31.387372519412626,
};

const Map = ({ filteredEvents }) => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: '',
  });

  return isLoaded ? (
    <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={6.5}>
      {filteredEvents.map(event => {
        const { idIdentifier, eventAddress } = event;
        const [lat, lng] = eventAddress.coordinates.split(',');

        return (
          <MarkerF
            key={idIdentifier}
            position={{ lat: Number(lat), lng: Number(lng) }}
          />
        );
      })}
    </GoogleMap>
  ) : (
    <></>
  );
};

export default Map;
