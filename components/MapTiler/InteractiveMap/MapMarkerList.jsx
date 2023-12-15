import { useEffect, useState } from 'react';

import EventCard from '@/components/eventCard/EventCard';
import ModalOnHover from '@/components/eventCard/ModalOnHover';

import { useTheme } from 'next-themes';

import * as maptilersdk from '@maptiler/sdk';
export default function MapMarkerList({ filteredEvents, map }) {
  const [activeMarker, setActiveMarker] = useState(null);

  // const { theme } = useTheme();

  // useEffect(() => {
  //   function updateMarkers() {
  //     map.current.getSource('markers').setData({
  //       type: 'FeatureCollection',
  //       features: filteredEvents.map(event => {
  //         const coordinates = event.eventAddress.coordinates
  //           .split(',')
  //           .reverse();
  //         return {
  //           type: 'Feature',
  //           properties: {
  //             id: event.idIdentifier,
  //           },
  //           geometry: {
  //             type: 'Point',
  //             coordinates,
  //           },
  //         };
  //       }),
  //     });
  //   }

  //   map.current.on('load', updateMarkers);

  //   if (!map.current.getSource('markers')) {
  //     return;
  //   }

  //   updateMarkers();
  // }, [filteredEvents, map, theme]);

  return (
    <>
      {filteredEvents.map(event => {
        return (
          <div key={event.idIdentifier}>
            <MapMarkerItem
              activeMarker={activeMarker}
              setActiveMarker={setActiveMarker}
              event={event}
              map={map}
            />
          </div>
        );
      })}
    </>
  );
}

function MapMarkerItem({ event, map, setActiveMarker, activeMarker }) {
  const [showOnClick, setShowOnClick] = useState(false);
  const [showOnHover, setShowOnHover] = useState(false);

  useEffect(() => {
    if (!showOnClick) return;

    const mapRef = map.current;

    function onMapClick(e) {
      if (e.originalEvent.target.nodeName !== 'path') {
        setActiveMarker(null);
        setShowOnClick(false);
      }
    }

    mapRef.on('click', onMapClick);

    return () => {
      mapRef.off('click', onMapClick);
    };
  }, [map, setActiveMarker, showOnClick]);

  useEffect(() => {
    const coordinates = event.eventAddress.coordinates.split(',').reverse();

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    svg.setAttribute('width', '25');
    svg.setAttribute('height', '24');
    svg.setAttribute('viewBox', '0 0 25 24');
    svg.setAttribute('fill', 'none');
    svg.innerHTML = `
  <g clip-path="url(#clip0_270_3890)">
    <path d="M12.25 22C12.25 22 19.75 16 19.75 9.5C19.75 5.35785 16.3921 2 12.25 2C8.10785 2 4.75 5.35785 4.75 9.5C4.75 16 12.25 22 12.25 22Z" stroke=${
      !showOnHover ? '#F6F6F6' : '#6589E3'
    } stroke-width="2" stroke-linejoin="round"/>
    <path d="M12.25 12.5C13.9068 12.5 15.25 11.1568 15.25 9.5C15.25 7.84315 13.9068 6.5 12.25 6.5C10.5932 6.5 9.25 7.84315 9.25 9.5C9.25 11.1568 10.5932 12.5 12.25 12.5Z" stroke=${
      !showOnHover ? '#F6F6F6' : '#6589E3'
    } stroke-width="2" stroke-linejoin="round"/>
  </g>
  <defs>
    <clipPath id="clip0_270_3890">
      <rect width="24" height="24" fill="white" transform="translate(0.25)"/>
    </clipPath>
  </defs>
</svg>`;

    // const markerDiv = document.createElement('div');
    // const markerSvg = document.createElement('svg');
    // markerSvg.setAttribute('viewBox', '0 0 32 32');
    // markerSvg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    // markerSvg.setAttribute('height', '22');
    // markerSvg.setAttribute('width', '22');
    // const markerPath = document.createElement('path');
    // markerPath.setAttribute('fill', '#485058');
    // markerPath.setAttribute('stroke', '#485058');
    // markerPath.setAttribute('stroke-linecap', 'round');
    // markerPath.setAttribute('stroke-linejoin', 'round');
    // markerPath.setAttribute('stroke-width', '2');
    // markerPath.setAttribute('d', 'm24.667 12-8 8-8-8');

    // markerSvg.append(markerPath);
    // markerDiv.append(markerSvg);

    const marker = new maptilersdk.Marker({
      element: svg,
      // color: '#ffffff',
    })
      .setLngLat(coordinates)
      .addTo(map.current);

    function onMarkerClick() {
      setActiveMarker(event.idIdentifier);
      setShowOnClick(p => !p);
    }

    function onMarkerHoverOn() {
      setActiveMarker(event.idIdentifier);
      setShowOnHover(true);
    }

    function onMarkerHoverOff() {
      setShowOnHover(false);
    }

    marker.getElement().addEventListener('click', onMarkerClick);

    marker.getElement().addEventListener('mouseenter', onMarkerHoverOn);

    marker.getElement().addEventListener('mouseleave', onMarkerHoverOff);

    return () => {
      marker.remove();
      marker.getElement().removeEventListener('click', onMarkerClick);
      marker.getElement().removeEventListener('mouseenter', onMarkerHoverOn);

      marker.getElement().removeEventListener('mouseleave', onMarkerHoverOff);
    };
  }, [event, map, setActiveMarker, showOnHover]);

  return (
    <>
      {activeMarker === event.idIdentifier && showOnHover && !showOnClick ? (
        <div className="absolute right-0 top-0 z-10 ">
          <ModalOnHover event={event} />
        </div>
      ) : null}
      {event.idIdentifier === activeMarker && showOnClick ? (
        <div className="absolute left-0 top-0 z-10 ">
          <EventCard event={event} setOnShow={setActiveMarker} />
        </div>
      ) : null}
    </>
  );
}
