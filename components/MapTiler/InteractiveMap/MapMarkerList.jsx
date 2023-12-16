import { useEffect, useRef, useState } from 'react';

import EventCard from '@/components/eventCard/EventCard';
import ModalOnHover from '@/components/eventCard/ModalOnHover';

import * as maptilersdk from '@maptiler/sdk';
import { useTheme } from 'next-themes';
import { createSvgMarker } from './createSvgMarker';
export default function MapMarkerList({ filteredEvents, map }) {
  const [activeMarker, setActiveMarker] = useState(null);

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
  const [styleObject, setStyleObject] = useState({});

  const markerRef = useRef(null);

  const { theme } = useTheme();

  function setPosition() {
    if (!markerRef.current) {
      return;
    }
    const styleString = markerRef.current.getAttribute('style');
    const styleArray = styleString.split(';');
    const styleObject = {};
    styleArray.forEach(style => {
      if (style.trim() !== '') {
        const [property, value] = style.split(':');
        styleObject[property.trim()] = value.trim();
      }
    });

    setStyleObject(styleObject);
  }

  useEffect(() => {
    const mapRef = map.current;

    mapRef.on('drag', setPosition);

    if (!showOnClick) return;

    function onMapClick(e) {
      const nodeName = e.originalEvent.target.nodeName;

      if (nodeName !== 'path' && nodeName !== 'svg') {
        setActiveMarker(null);
        setShowOnClick(false);
      }
    }

    mapRef.on('click', onMapClick);

    return () => {
      mapRef.off('click', onMapClick);
      mapRef.off('drag', setPosition);
    };
  }, [map, setActiveMarker, showOnClick]);

  useEffect(() => {
    const coordinates = event.eventAddress.coordinates.split(',').reverse();

    const marker = new maptilersdk.Marker({
      element: createSvgMarker(showOnHover, showOnClick, theme),
    })
      .setLngLat(coordinates)
      .addTo(map.current);

    markerRef.current = marker.getElement();

    function onMarkerClick() {
      setActiveMarker(event.idIdentifier);
      setShowOnClick(p => !p);
    }

    function onMarkerHoverOn() {
      setActiveMarker(event.idIdentifier);
      setShowOnHover(true);
      setPosition();
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
  }, [event, map, setActiveMarker, showOnClick, showOnHover, theme]);

  function onClickClose() {
    setActiveMarker(null);
    setShowOnClick(false);
  }

  return (
    <>
      {activeMarker === event.idIdentifier && showOnHover && !showOnClick ? (
        <div style={styleObject} className="absolute -top-[80px] z-30">
          <ModalOnHover event={event} />
        </div>
      ) : null}
      {event.idIdentifier === activeMarker && showOnClick ? (
        <div style={styleObject} className="absolute -left-[215px] z-30">
          <EventCard event={event} onClose={onClickClose} />
        </div>
      ) : null}
    </>
  );
}
