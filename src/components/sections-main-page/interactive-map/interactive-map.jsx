'use client';

import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import React, { useEffect } from 'react';

import { mockEvent } from './components/mock-event';

import 'leaflet/dist/leaflet.css';
import './reset-leaflet.css';
import { MapMarker } from './components/map-marker';

export default function InteractiveMap() {
  const markers = mockEvent;

  return (
    <section
      className="interactive-map-marker  h-[630px] w-screen  pb-20  tablet:h-[657px] tablet:pb-[160px] laptop:h-[745px]"
      id="map"
    >
      <MapContainer
        inertia
        tapHold
        style={{
          height: '100%',
          width: '100%',
        }}
        center={[49.04761451133044, 31.387372519412626]}
        zoom={6}
        scrollWheelZoom={false}
        touchZoom
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <SetScrollWheelZoom />

        {markers.map(event => (
          <MapMarker key={event.id} event={event} />
        ))}
      </MapContainer>
    </section>
  );
}

function SetScrollWheelZoom() {
  const map = useMap();

  useEffect(() => {
    function handleKeydown(e) {
      if (e.key === 'Control' || e.key === 'Meta') {
        map.scrollWheelZoom.enable();
      }
    }
    function handleKeyup() {
      map.scrollWheelZoom.disable();
    }
    document.addEventListener('keydown', handleKeydown);
    document.addEventListener('keyup', handleKeyup);
    return () => {
      document.removeEventListener('keydown', handleKeydown);
      document.removeEventListener('keyup', handleKeydown);
    };
  }, [map.scrollWheelZoom]);
  return <React.Fragment />;
}
