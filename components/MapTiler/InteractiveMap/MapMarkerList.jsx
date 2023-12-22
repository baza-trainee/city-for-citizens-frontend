import { useEffect, useState } from 'react';

import MapMarkerItem from './MapMarkerItem/MapMarkerItem';
import { useSearchParams } from 'next/navigation';
import { useCurrentLocale } from '../../../hooks';
import { getEventsBySearchParams } from '../../../services/eventAPI';
export default function MapMarkerList({ map }) {
  const [activeMarker, setActiveMarker] = useState(null);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const { localeForRequest } = useCurrentLocale();
  const searchParams = useSearchParams();

  useEffect(() => {
    const getEventsByFilter = async () => {
      const urlSearchParams = new URLSearchParams(searchParams);
      urlSearchParams.append('locale', localeForRequest);

      const events = await getEventsBySearchParams(urlSearchParams);
      setFilteredEvents(events);
    };

    if (searchParams.size !== 0) {
      getEventsByFilter();
    } else {
      setFilteredEvents([]);
    }
  }, [localeForRequest, searchParams]);

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
