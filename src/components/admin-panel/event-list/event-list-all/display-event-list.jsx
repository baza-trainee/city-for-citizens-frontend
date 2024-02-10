'use client';

import { v4 as uuidv4 } from 'uuid';
import { useCurrentLocale } from '@/hooks';

import IconTrash from '@/assets/icons/admin-sidebar/trash-icon.svg';
import IconPencil from '@/assets/icons/common/pencil-icon.svg';
import { useRouter } from '@/navigation';

export default function DisplayEventList({
  eventsData,
  showConfirmationModal,
}) {
  const { localeForIntl } = useCurrentLocale();
  const router = useRouter();
  return (
    <>
      {eventsData && eventsData.length === 0 && (
        <div className="mx-auto mt-8 flex flex-col gap-y-3 text-center">
          <p>Тут нічого немає</p>
        </div>
      )}
      <ul className="flex flex-col gap-y-4">
        {eventsData &&
          eventsData.length > 0 &&
          eventsData.map(event => (
            <li
              key={uuidv4()}
              className={`grid grid-cols-[4fr_1.5fr_2fr_2fr_2fr] justify-items-start gap-x-3  bg-admin-light_3  py-3 font-exo_2 text-admin-dark
            transition duration-200 hover:bg-admin-menu`}
            >
              <span className="pl-[5px]">{event.eventTitle}</span>
              <span>{event.eventAddress.city}</span>
              <span>
                {event.eventTypes.map(({ eventType }) => eventType).join(', ')}
              </span>
              <span>
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
              <div className="flex w-full items-center gap-x-9 pl-8 pr-2 ">
                <button
                  onClick={() => router.push(`/admin/event/${event.id}`)}
                  type="button"
                  title="Редагувати подію"
                  className=" text-admin-dark hover:text-admin-green"
                >
                  <IconPencil
                    width="22"
                    height="20"
                    className="w-[22px] transition duration-200"
                  />
                </button>
                <button
                  onClick={() => showConfirmationModal(event.id)}
                  title="Видалити подію"
                  type="button"
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
      </ul>
    </>
  );
}
