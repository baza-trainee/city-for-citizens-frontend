'use client';

import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import React, { useEffect } from 'react';

import { useGetEventsBySearchParamsQuery } from '@/redux/api/eventsApi';

import 'leaflet/dist/leaflet.css';
import './reset-leaflet.css';
import { MapMarker } from './components/map-marker';
import { useCurrentLocale } from '@/hooks';
import { useSelector } from 'react-redux';
import { selectFilters } from '@/redux/slice/filters';

export default function InteractiveMap() {
  const { localeForRequest } = useCurrentLocale();

  const filters = useSelector(selectFilters);

  const { data: markers } = useGetEventsBySearchParamsQuery({
    locale: localeForRequest,
    queryParams: filters,
  });

  if (!markers) return null;

  return (
    <section
      className="interactive-map-marker  mb-20 h-[630px]  w-screen  tablet:mb-[160px] tablet:h-[657px] laptop:h-[745px]"
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
  const map_leaflet = useMap();

  useEffect(() => {
    function handleKeydown(e) {
      if (e.key === 'Control' || e.key === 'Meta') {
        map_leaflet.scrollWheelZoom.enable();
      }
    }
    function handleKeyup() {
      map_leaflet.scrollWheelZoom.disable();
    }
    document.addEventListener('keydown', handleKeydown);
    document.addEventListener('keyup', handleKeyup);
    return () => {
      document.removeEventListener('keydown', handleKeydown);
      document.removeEventListener('keyup', handleKeydown);
    };
  }, [map_leaflet.scrollWheelZoom]);
  return <React.Fragment />;
}
