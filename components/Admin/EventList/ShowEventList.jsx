'use client';

import { Link } from '@/navigation';
import { deleteEvent } from '@/services/eventAPI';
import { useTheme } from 'next-themes';
import IconTrash from '../../UI/icons/IconTrash';
import IconPencil from '../../UI/icons/IconPencil';

const ShowEventList = eventsData => {
  const { resolvedTheme } = useTheme();
  const handleDeleteEvent = async eventId => {
    try {
      await deleteEvent(eventId);

      const updatedEventList = await getAllEvents(
        new URLSearchParams({ locale: localeForRequest })
      );
      setEventList(updatedEventList);
    } catch (error) {
      console.error('Помилка видалення події:', error);
    }
  };

  return eventsData.map(event => (
    <li
      key={event.id + event.idIdentifier}
      className={`grid grid-cols-[4fr_2fr_1fr] gap-x-3 px-3 transition duration-200 [&:nth-child(even)]:rounded [&:nth-child(even)]:bg-gray/10 ${
        resolvedTheme === 'dark'
          ? ' hover:bg-gray/50 [&:nth-child(even)]:bg-gray/80 [&:nth-child(even)]:hover:bg-gray/50'
          : ' hover:bg-gray/20 [&:nth-child(even)]:bg-gray/10 [&:nth-child(even)]:hover:bg-gray/20'
      }`}
    >
      <span className="col-start-1">{event.eventTitle}</span>
      <span className="col-start-2">
        {new Date(event.dateTime).toLocaleDateString('uk', {
          year: 'numeric',
          month: 'long',
          day: '2-digit',
        })}
      </span>
      <div
        className="col-start-3 inline-flex items-center justify-center gap-2 pr-2"
        title="edit event"
      >
        <Link href={`/admin/events/${event.id}`}>
          <IconPencil
            width="16"
            height="16"
            className={`${
              resolvedTheme === 'dark' ? 'fill-gray/20' : 'fill-[#121923]'
            } inline transition duration-200 hover:fill-primary/100`}
          />
        </Link>
        <button
          onClick={() => handleDeleteEvent(event.id)}
          title="delete event"
        >
          <IconTrash
            width="16"
            height="16"
            className={`${
              resolvedTheme === 'dark' ? 'fill-gray/20' : 'fill-[#121923]'
            } inline transition duration-200 hover:fill-primary/100`}
          />
        </button>
      </div>
    </li>
  ));
};
export default ShowEventList;
