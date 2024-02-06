'use client';

import { v4 as uuidv4 } from 'uuid';
import { useDispatch } from 'react-redux';
import { Link } from '@/navigation';

import { useCurrentLocale } from '@/hooks';

import { startDeleteEvent } from '@/redux/slice/modalEventSlice';
import IconTrash from '@/assets/icons/admin-sidebar/trash-icon.svg';
import IconPencil from '@/assets/icons/admin-sidebar/pencil-icon.svg';

import AddEventButton from './add-event-button';

export default function DisplayEventList({ eventsData }) {
  const { localeForIntl } = useCurrentLocale();

  const dispatch = useDispatch();

  function handleDeleteEvent(eventId) {
    console.log('need delete', eventId);
    dispatch(startDeleteEvent(eventId));
  }

  return (
    <>
      {eventsData.length === 0 && (
        <div className="mx-auto mt-8 flex flex-col gap-y-3 text-center">
          <p>Тут нічого немає</p>
          <AddEventButton />
        </div>
      )}
      {eventsData.length &&
        eventsData.map(event => (
          <li
            key={uuidv4()}
            className={`grid grid-cols-[4fr_2fr_3fr_2fr_1fr] gap-x-3 bg-admin-light_3 py-3 transition duration-200
          hover:bg-admin-menu tablet:justify-items-start desktop:justify-items-center`}
          >
            {console.log('event.id = ', event.id)}
            <span>{event.eventTitle}</span>
            <span>{event.eventAddress.city}</span>
            <span>
              {event.eventTypes.map(({ eventType }) => eventType).join(', ')}
            </span>
            <span className="">
              {new Date(event.dateTime)
                .toLocaleDateString(`${localeForIntl}`, {
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit',
                  hour: '2-digit',
                  minute: '2-digit',
                })
                .replace(',', '\u00A0\u00A0\u00A0')}
            </span>
            <div
              className="inline-flex items-center justify-center gap-x-10 pr-2"
              title="Відредагувати подію"
            >
              <Link href={`/admin/event/${event.id}`}>
                <IconPencil
                  width="22"
                  height="20"
                  className="inline fill-admin-dark transition duration-200 hover:fill-admin-green"
                />
              </Link>
              <button
                onClick={() => handleDeleteEvent(event.id)}
                title="Видалити подію"
              >
                <IconTrash
                  width="17"
                  height="24"
                  className="inline fill-admin-dark transition duration-200 hover:fill-[red]"
                />
              </button>
            </div>
          </li>
        ))}
    </>
  );
}
