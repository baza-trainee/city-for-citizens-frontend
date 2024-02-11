'use client';

import { v4 as uuidv4 } from 'uuid';

import IconTrash from '@/assets/icons/common/trash-icon.svg';
import IconPencil from '@/assets/icons/common/pencil-icon.svg';
import { useRouter } from '@/navigation';
import clsx from 'clsx';

function getEventDate(eventDate) {
  const date = new Date(eventDate);
  let hours = date.getHours();
  switch (hours) {
    case 0:
      hours = 22;
      break;
    case 1:
      hours = 23;
      break;
    default:
      hours = hours - 2;
  }
  return `${formatDate(date.getDate())}.${formatDate(date.getMonth() + 1)}.${date.getFullYear()} \u00A0\u00A0\u00A0 ${formatDate(null, hours)}:${formatDate(null, date.getMinutes())}`;
}

function formatDate(dateElStartZero, dateElEndZero) {
  if (dateElStartZero) return String(dateElStartZero).padStart(2, '0');
  return String(dateElEndZero).padStart(2, '0');
}

export default function DisplayEventList({
  eventsData,
  showConfirmationModal,
}) {
  const router = useRouter();
  return (
    <>
      <table className=" -mt-[17px] w-full border-separate border-spacing-x-0 border-spacing-y-[17px]">
        <thead>
          <tr
            className="mb-[17px] bg-admin-menu
           font-source_sans_3 text-lg text-admin-dark"
          >
            <td
              className={`border border-admin-menu py-3 pl-[10px] ${clsx(eventsData && eventsData.length === 0 && 'w-[31%]')}`}
            >
              Назва
            </td>
            <td className="border border-admin-menu">Місто</td>
            <td className="border border-admin-menu">Тип події</td>
            <td className="border border-admin-menu">Дата та час</td>
            <td className="border border-admin-menu"></td>
          </tr>
        </thead>
        <tbody>
          {eventsData && eventsData.length === 0 && (
            <tr className="mx-auto mt-8 text-center">
              <td colSpan={5}>Тут нічого немає</td>
            </tr>
          )}
          {eventsData &&
            eventsData.length > 0 &&
            eventsData.map(event => (
              <tr
                key={uuidv4()}
                className={`h-max w-full justify-items-start break-words  bg-admin-light_3 
            font-exo_2 text-admin-dark transition duration-200 hover:bg-admin-menu`}
              >
                <td className="w-[31%] py-3 pl-[5px] pr-[5px]">
                  {event.eventTitle}
                </td>
                <td className="pr-[5px]">{event.eventAddress.city}</td>
                <td className="pr-[5px]">
                  {event.eventTypes
                    .map(({ eventType }) => eventType)
                    .join(', ')}
                </td>
                <td className="">{getEventDate(event.dateTime)}</td>
                <td className="flex w-full items-center gap-x-9 py-3 pl-8 pr-2 tablet:flex-col laptop:flex-row ">
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
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
}
