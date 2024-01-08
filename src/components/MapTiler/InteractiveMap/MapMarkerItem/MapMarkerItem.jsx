import { useTheme } from 'next-themes';
import { useEffect, useRef, useState } from 'react';
import { createSvgMarker } from './createSvgMarker';
import * as maptilersdk from '@maptiler/sdk';
import { EventCardComponentForGetDimensions } from './EventCardComponentForGetDimensions';
import { EventCardComponent } from './EventCardComponent';
import { ModalOnHoverComponent } from './ModalOnHoverComponent';

export default function MapMarkerItem({
  event,
  map,
  setActiveMarker,
  activeMarker,
}) {
  const { theme } = useTheme();

  const coordinates = event.eventAddress.coordinates.split(',').reverse();

  const [showOnClick, setShowOnClick] = useState(false);
  const [showOnHover, setShowOnHover] = useState(false);
  const [styleObject, setStyleObject] = useState({});
  const [elementDimensions, setElementDimensions] = useState({
    width: null,
    height: null,
  });

  const markerRef = useRef(null);
  const eventCardRef = useRef(null);

  useEffect(() => {
    map.current.panBy([1, 1]);
  }, [map]);

  useEffect(() => {
    function getElementDimensions(ref) {
      if (!ref.current) {
        return {
          width: null,
          height: null,
        };
      }
      const { offsetWidth, offsetHeight } = ref.current;
      return { width: offsetWidth, height: offsetHeight };
    }

    const handleResize = () => {
      setElementDimensions(getElementDimensions(eventCardRef));
    };
    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const mapRef = map.current;

    mapRef.on('drag', setPositionEventCard);
    mapRef.on('click', onMapClick);
    mapRef.on('move', setPositionEventCard);
    // mapRef.on('movestart', onMoveStart);
    // mapRef.on('moveend', onMoveEnd);

    // function onMoveStart() {
    //   document.body.style.pointerEvents = 'none';
    // }
    // function onMoveEnd() {
    //   document.body.style.pointerEvents = 'auto';
    // }

    function onMapClick(event) {
      const { point, originalEvent } = event;
      const clientWidth = window.screen.width;

      const isContainsClass =
        originalEvent.target.classList.contains('marker-icon');

      if (!isContainsClass) {
        setActiveMarker(null);
        setShowOnHover(false);
        setShowOnClick(false);
      } else {
        adjustMapPosition(mapRef, point, clientWidth, elementDimensions);
      }
    }

    return () => {
      // document.body.style.pointerEvents = 'auto';
      mapRef.off('click', onMapClick);
      mapRef.off('drag', setPositionEventCard);
      mapRef.off('move', setPositionEventCard);
      // mapRef.off('movestart', onMoveStart);
      // mapRef.off('moveend', onMoveEnd);
    };
  }, [elementDimensions, map, setActiveMarker, showOnClick]);

  useEffect(() => {
    const marker = new maptilersdk.Marker({
      element: createSvgMarker(showOnHover, showOnClick, theme),
    })
      .setLngLat(coordinates)
      .addTo(map.current);

    markerRef.current = marker.getElement();

    function onMarkerClick() {
      setActiveMarker(event.idIdentifier);
      setShowOnClick(prev => !prev);
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
  }, [
    coordinates,
    event.idIdentifier,
    map,
    setActiveMarker,
    showOnClick,
    showOnHover,
    theme,
  ]);

  function setPositionEventCard() {
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

  function adjustMapPosition(
    mapRef,
    currentPosition,
    screenWidth,
    elDimensions
  ) {
    const width = elDimensions.width / 2;
    const { height } = elDimensions;
    const { x: curPosX, y: curPosY } = currentPosition;
    const paddingY = 50;
    const paddingX = 20;

    let [xOffset, yOffset] = [0, 0];

    if (curPosX < width && curPosY < height) {
      xOffset = -width - paddingX + curPosX;
      yOffset = -height - paddingY + curPosY;
    } else if (screenWidth - curPosX < width && curPosY < height) {
      xOffset = width + paddingX - (screenWidth - curPosX);
      yOffset = -height - paddingY + curPosY;
    } else if (curPosY < height) {
      xOffset = 0;
      yOffset = -height - paddingY + curPosY;
    } else if (screenWidth - curPosX < width) {
      xOffset = width + paddingX - (screenWidth - curPosX);
      yOffset = 0;
    } else if (curPosX < width) {
      xOffset = -width - paddingX + curPosX;
      yOffset = 0;
    }

    mapRef.panBy([xOffset, yOffset]);
  }

  function onClickClose() {
    setActiveMarker(null);
    setShowOnClick(false);
    setShowOnHover(false);
  }

  return (
    <>
      {activeMarker === event.idIdentifier && showOnHover && !showOnClick ? (
        <ModalOnHoverComponent styleObject={styleObject} event={event} />
      ) : null}
      {event.idIdentifier === activeMarker && showOnClick ? (
        <EventCardComponent
          eventCardRef={eventCardRef}
          styleObject={styleObject}
          event={event}
          onClose={onClickClose}
        />
      ) : (
        !elementDimensions.width &&
        !elementDimensions.height && (
          <EventCardComponentForGetDimensions
            eventCardRef={eventCardRef}
            event={event}
          />
        )
      )}
    </>
  );
}
