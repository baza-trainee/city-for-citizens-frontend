import React, { useRef, useEffect, useState } from 'react';
import * as maptilersdk from '@maptiler/sdk';
import '@maptiler/sdk/dist/maptiler-sdk.css';

import { useTheme } from 'next-themes';
import { useLocale } from 'next-intl';
import MapMarkerList from './MapMarkerList';

const THEMES = {
  dark: 'basic-v2-dark',
  light: 'streets-v2',
};

const CENTER = {
  lat: 49.04761451133044,
  lng: 31.387372519412626,
};

export default function InteractiveMap() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const locale = useLocale();
  const { theme } = useTheme();

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
      minZoom: 5,
      cooperativeGestures: true,
    });
  }, [locale, theme, zoom]);

  useEffect(() => {
    if (!map.current) return;
    let lastRightClickTime = 0;
    const DOUBLE_CLICK_INTERVAL = 300;

    function dblClickContextMenuMouseBtn() {
      const currentTime = new Date().getTime();
      const timeDiff = currentTime - lastRightClickTime;

      if (timeDiff < DOUBLE_CLICK_INTERVAL) {
        const zoom = map.current.getZoom();
        map.current.flyTo({ zoom: zoom - 1 });
      }

      lastRightClickTime = currentTime;
    }

    map.current.on('contextmenu', dblClickContextMenuMouseBtn);

    return () => {
      map.current.off('contextmenu', dblClickContextMenuMouseBtn);
    };
  }, []);

  return (
    <div className="relative mx-auto h-[865px] overflow-hidden">
      {<MapMarkerList map={map} />}

      <div ref={mapContainer} className=" h-full w-full" />
    </div>
  );
}
