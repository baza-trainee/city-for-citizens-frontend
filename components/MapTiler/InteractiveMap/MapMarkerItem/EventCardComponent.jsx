import EventCard from '../../../eventCard/EventCard';

export const EventCardComponent = ({
  eventCardRef,
  styleObject,
  event,
  onClose,
}) => (
  <div
    ref={eventCardRef}
    style={{
      transform:
        styleObject.transform + 'translateY(-50%)' + 'translateY(-30px)',
    }}
    className="absolute z-10"
  >
    <EventCard event={event} onClose={onClose} />
  </div>
);
