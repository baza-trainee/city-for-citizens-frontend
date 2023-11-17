import MarkerItem from './MarkerItem/MarkerItem';

const EventList = ({ filteredEvents, activeMarker, setActiveMarker }) => {
  return (
    <>
      {filteredEvents.map(event => {
        return (
          <MarkerItem
            activeMarker={activeMarker}
            setActiveMarker={setActiveMarker}
            event={event}
            key={event.idIdentifier}
          />
        );
      })}
    </>
  );
};
export default EventList;
