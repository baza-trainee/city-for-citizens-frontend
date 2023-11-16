'use client';

import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import { useState } from 'react';
import EventList from './MarkerList';

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

  const [activeMarker, setActiveMarker] = useState(null);

  return isLoaded ? (
    <div className="custom-info-window">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={6.5}
        onClick={() => setActiveMarker(null)}
      >
        <EventList
          activeMarker={activeMarker}
          setActiveMarker={setActiveMarker}
          filteredEvents={filteredEvents}
        />
      </GoogleMap>
    </div>
  ) : (
    <></>
  );
};

export default Map;
