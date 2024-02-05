import { useEffect, useState } from 'react';

import MapMarkerItem from './MapMarkerItem/MapMarkerItem';
import { useSearchParams } from 'next/navigation';
import { useCurrentLocale } from '../../../hooks';
import { useGetEventsBySearchParamsQuery } from '@/redux/api/eventsApi';
export default function MapMarkerList({ map }) {
  const [activeMarker, setActiveMarker] = useState(null);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const { localeForRequest } = useCurrentLocale();

  const searchParams = useSearchParams();
  const queryParams = {};

  searchParams.forEach((value, key) => {
    queryParams[key] = value;
  });

  const { data } = useGetEventsBySearchParamsQuery(
    {
      queryParams,
      locale: localeForRequest,
    },
    { skip: searchParams.size === 0 }
  );

  useEffect(() => {
    if (data) {
      if (searchParams.size !== 0) {
        setFilteredEvents(data);
      } else {
        setFilteredEvents([]);
      }
    }
  }, [data, searchParams.size]);

  return (
    <>
      {filteredEvents.length !== 0 &&
        filteredEvents.map(event => {
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
