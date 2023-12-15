import React, { useRef, useEffect, useState } from 'react';
import * as maptilersdk from '@maptiler/sdk';
import '@maptiler/sdk/dist/maptiler-sdk.css';
import { useTheme } from 'next-themes';
import { useLocale } from 'next-intl';
import MapMarkerList from './MapMarkerList';

const THEMES = {
  dark: 'basic-v2-dark',
  light: 'basic-v2-light',
};

const CENTER = {
  lat: 49.04761451133044,
  lng: 31.387372519412626,
};

export default function InteractiveMap({ filteredEvents }) {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const locale = useLocale();
  const { theme } = useTheme();
  const [activeMarker, setActiveMarker] = useState(null);
  const [showOnClick, setShowOnClick] = useState(false);
  const [showOnHover, setShowOnHover] = useState(false);

  const [zoom] = useState(5.5);

  maptilersdk.config.apiKey = process.env.NEXT_PUBLIC_TILER_MAP_API_KEY;

  useEffect(() => {
    if (!map.current) return;
    map.current.setStyle(theme === 'dark' ? THEMES.dark : THEMES.light, {});
  }, [theme]);

  useEffect(() => {
    if (!map.current) return;

    map.current.setLanguage(`name:${locale}`);
  }, [locale]);

  useEffect(() => {
    if (map.current) return;

    map.current = new maptilersdk.Map({
      container: mapContainer.current,
      center: [CENTER.lng, CENTER.lat],
      style: theme === 'dark' ? THEMES.dark : THEMES.light,
      zoom,
    });

    // map.current.on('load', function () {
    //   if (!map.current.getSource('markers')) {
    //     map.current.addSource('markers', {
    //       type: 'geojson',
    //       data: {
    //         type: 'FeatureCollection',
    //         features: [],
    //       },
    //     });
    //   }

    //   map.current.loadImage(
    //     'https://docs.maptiler.com/sdk-js/assets/custom_marker.png',
    //     function (error, image) {
    //       if (error) throw error;
    //       map.current.addImage('markerImage', image);
    //     }
    //   );

    //   map.current.addLayer({
    //     id: 'markers',
    //     type: 'symbol',
    //     source: 'markers',
    //     layout: {
    //       'icon-image': 'markerImage',
    //       'icon-size': ['*', ['get', 'scalerank'], 0.01],
    //     },
    //     paint: {},
    //   });

    //   map.current.on('click', () => {
    //     console.log('map click');
    //     setActiveMarker(null);
    //     setShowOnClick(false);
    //   });

    //   map.current.on('click', 'markers', e => {
    //     setActiveMarker(e.features[0].properties.id);
    //     setShowOnClick(p => !p);
    //     map.current.flyTo({
    //       center: e.features[0].geometry.coordinates,
    //     });
    //   });

    //   map.current.on('mouseenter', 'markers', e => {
    //     setActiveMarker(e.features[0].properties.id);
    //     setShowOnHover(true);
    //     map.current.getCanvas().style.cursor = 'pointer';
    //   });

    //   map.current.on('mouseleave', 'markers', e => {
    //     map.current.getCanvas().style.cursor = '';
    //     setShowOnHover(false);
    //   });
    // });
  }, [theme, zoom]);

  // useEffect(() => {
  //   if (!map.current.getSource('markers')) {
  //     return;
  //   }
  //   if (filteredEvents.length === 0) {
  //     map.current.getSource('markers').setData({
  //       type: 'FeatureCollection',
  //       features: [],
  //     });
  //   }
  // }, [filteredEvents.length]);

  return (
    <div className="relative mx-auto h-[865px] max-w-[1440px]">
      {filteredEvents.length !== 0 && (
        <MapMarkerList
          filteredEvents={filteredEvents}
          map={map}
          activeMarker={activeMarker}
          setActiveMarker={setActiveMarker}
          showOnClick={showOnClick}
          showOnHover={showOnHover}
        />
      )}

      <div ref={mapContainer} className=" h-full w-full" />
    </div>
  );
}
