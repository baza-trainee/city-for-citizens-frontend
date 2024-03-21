import EventCard from '../../../eventCard/EventCard';

export const EventCardComponentForGetDimensions = ({ eventCardRef, event }) => (
  <div ref={eventCardRef} className="absolute z-10 opacity-0">
    <EventCard event={event} />
  </div>
);
