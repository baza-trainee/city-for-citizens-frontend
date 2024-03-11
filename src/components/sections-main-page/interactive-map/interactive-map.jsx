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
import { useTheme } from 'next-themes';

const mapThemes = {
  default: {
    url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',

    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  },
  dark: {
    url: 'https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.{ext}',

    attribution:
      '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    ext: 'png',
  },

  light: {
    attribution:
      '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    url: 'https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.{ext}',
    ext: 'png',
  },
};

export default function InteractiveMap() {
  const { localeForRequest } = useCurrentLocale();
  // const { theme } = useTheme();

  const filters = useSelector(selectFilters);

  const { data: markers } = useGetEventsBySearchParamsQuery({
    locale: localeForRequest,
    queryParams: filters,
  });

  if (!markers) return null;

  return (
    <section
      className="interactive-map-markerrelative z-0 mb-20 h-[630px] w-full tablet:mb-[160px] tablet:h-[745px]"
      id="map"
    >
      <MapContainer
        inertia
        style={{
          height: '100%',
          width: '100%',
        }}
        center={[49.04761451133044, 31.387372519412626]}
        zoom={6}
        minZoom={3}
        maxZoom={18}
        scrollWheelZoom={false}
        touchZoom={true}
        tapHold={true}
      >
        <TileLayer {...mapThemes.default} />
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

    function handleTouchend() {
      map_leaflet.dragging.disable();
    }

    document.addEventListener('touchend', handleTouchend);
    document.addEventListener('keydown', handleKeydown);
    document.addEventListener('keyup', handleKeyup);
    return () => {
      document.removeEventListener('keydown', handleKeydown);
      document.removeEventListener('keyup', handleKeydown);
      document.removeEventListener('touchend', handleTouchend);
    };
  }, [map_leaflet.dragging, map_leaflet.scrollWheelZoom]);
  return <React.Fragment />;
}
