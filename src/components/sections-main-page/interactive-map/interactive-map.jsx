'use client';

import { MapContainer, TileLayer, GeoJSON, Rectangle } from 'react-leaflet';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { useGetEventsBySearchParamsQuery } from '@/redux/api/eventsApi';

import 'leaflet/dist/leaflet.css';
import './reset-leaflet.css';
import { MapMarker } from './components/map-marker';
import { useCurrentLocale } from '@/hooks';
import { useSelector } from 'react-redux';
import { selectFilters } from '@/redux/slice/filters';

import borderOfUkraine from './geoBoundaries-UKR-ADM0.json';
import bordersOfUkrainianCities from './geoBoundaries-UKR-ADM1.json';

function areAllFieldsEmpty(obj) {
  return !Object.values(obj).some(value => value.trim() !== '');
}
export default function InteractiveMap() {
  const [map, setMap] = useState(null);

  const { localeForRequest } = useCurrentLocale();
  const filters = useSelector(selectFilters);

  const {
    data: markers,
    isLoading,
    isFetching,
  } = useGetEventsBySearchParamsQuery(
    {
      locale: localeForRequest,
      queryParams: filters,
    },   {
      skip: areAllFieldsEmpty(filters),
    }
  );

  const onClickResetZoom = useMemo(
    () => () => {
      map.flyToBounds([
        [52.4, 40.2],
        [44.2, 22.1],
      ]);
    },
    [map]
  );

  const displayMap = useMemo(
    () => (
      <MapContainer
        center={[49.1, 31.4]}
        scrollWheelZoom={false}
        ref={setMap}
        style={{
          height: '100%',
          width: '100%',
        }}
        maxBounds={[
          [62, 45],
          [44, 15],
        ]}
        zoom={6}
        minZoom={5}
        maxZoom={18}
        zoomSnap={0.5}
        zoomDelta={0.5}
        touchZoom={true}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          // url="https://tile.openstreetmap.org.ua/styles/osm-bright/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />
        <GeoJSON
          data={borderOfUkraine}
          style={{
            color: 'black',
            weight: 4,
          }}
        />
        {bordersOfUkrainianCities.features.map(feature => (
          <GeoJSON
            data={feature}
            style={{
              fillColor: 'transparent',
              weight: 1,
              opacity: 0.5,
              color: 'currentColor',
            }}
            key={feature.properties.shapeID}
          />
        ))}
        <Rectangle
          bounds={[
            [180, 180],
            [-180, -180],
          ]}
          pathOptions={{ fillColor: 'black', fillOpacity: 0.5 }}
        />
        {markers &&
          markers.map(event => (
            <MapMarker map={map} key={event.id} event={event} />
          ))}
      </MapContainer>
    ),
    [map, markers]
  );

  return (
    <section
      className="interactive-map-marker relative z-0 mx-auto mb-20 h-[630px] max-h-[calc(100vh-80px)] w-full max-w-[1920px] tablet:mb-[160px] tablet:h-screen"
      id="map"
    >
      {displayMap}
      {map && <HandleKey map={map} />}

      <button
        onClick={onClickResetZoom}
        className="absolute bottom-[40px] left-[40px] z-[1000] rounded-lg bg-yellow px-6 py-3"
      >
        Показати всю карту
      </button>
    </section>
  );
}

function GeoJSONCityItem({ feature, map }) {
  const styleCity = {
    fillColor: 'transparent',

    weight: 1,
    opacity: 0.5,
    color: 'currentColor',
  };

  const zoomToFeature = useCallback(
    ({ target }) => {
      map.flyToBounds(target.getBounds());
    },
    [map]
  );

  const innerHandlers = useMemo(
    () => ({
      click: zoomToFeature,
    }),
    [zoomToFeature]
  );
  return (
    <GeoJSON
      data={feature}
      className={'geo-json-city-item'}
      style={styleCity}
      eventHandlers={innerHandlers}
    />
  );
}

function HandleKey({ map }) {
  const handleKeydown = useCallback(
    evt => {
      if (evt.key === 'Control' || evt.key === 'Meta') {
        map.scrollWheelZoom.enable();
      }
    },
    [map]
  );

  const handleKeyup = useCallback(() => {
    map.scrollWheelZoom.disable();
  }, [map]);

  const handleTouchend = useCallback(() => {
    map.dragging.disable();
  }, [map]);

  useEffect(() => {
    document.addEventListener('touchend', handleTouchend);
    document.addEventListener('keydown', handleKeydown);
    document.addEventListener('keyup', handleKeyup);

    return () => {
      document.removeEventListener('touchend', handleTouchend);
      document.removeEventListener('keydown', handleKeydown);
      document.removeEventListener('keyup', handleKeyup);
    };
  }, [handleKeydown, handleKeyup, handleTouchend]);

  return null;
}
