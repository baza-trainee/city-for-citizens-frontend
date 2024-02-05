'use client';

import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Link } from '@/navigation';

import { useCurrentLocale } from '@/hooks';
import { useDeleteEventMutation } from '@/redux/api/eventsApi';
import IconTrash from '@/assets/icons/admin-sidebar/trash-icon.svg';
import IconPencil from '@/assets/icons/admin-sidebar/pencil-icon.svg';
import ShowModal from '@/components/admin-panel/common/modal-window/show-modal';
import ShowMessage from '@/components/admin-panel/common/modal-window/show-message';
import AddEventButton from './add-event-button';

export default function DisplayEventList({ eventsData }) {
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);
  const [isShowSuccessMessage, setIsShowSuccessMessage] = useState(false);
  const [isShowErrorMessage, setIsShowErrorsMessage] = useState(false);
  const initialDataEvent = { id: '', title: '' };
  const [dataDeleteEvent, setDataDeleteEvent] = useState(initialDataEvent);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const { localeForIntl } = useCurrentLocale();
  const [deleteEvent] = useDeleteEventMutation();

  function handleDeleteEvent(eventId, eventTitle) {
    setDataDeleteEvent({ id: eventId, title: eventTitle });
    setIsShowDeleteModal(true);
  }

  useEffect(() => {
    confirmDelete &&
      setIsShowDeleteModal(false) &&
      deleteEvent(dataDeleteEvent.id)
        .unwrap()
        .then(() => {
          setIsShowSuccessMessage(true);
        })
        .catch(() => setIsShowErrorsMessage(true))
        .finally(() => {
          setDataDeleteEvent(initialDataEvent);
          setConfirmDelete(false);
        });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [confirmDelete]);

  function handleModalClose() {
    setIsShowDeleteModal(false);
    setDataDeleteEvent(initialDataEvent);
  }

  function handleMessageClose() {
    setIsShowSuccessMessage(false);
    setIsShowErrorsMessage(false);
  }

  function ShowDeleteModal() {
    return (
      <ShowModal
        title="Видалити подію"
        onClose={handleModalClose}
        onOk={setConfirmDelete}
      >
        Ви точно хочете видалити подію?
      </ShowModal>
    );
  }

  function ShowSuccessDeleteMessage() {
    return (
      <ShowMessage title="Успіх" type="success" onClose={handleMessageClose}>
        Подію видалено
      </ShowMessage>
    );
  }

  function ShowErrorDeleteMessage() {
    return (
      <ShowMessage title="Помилка" type="error" onClose={handleMessageClose}>
        Сталася помилка. Спробуйте ще раз або зверніться до розробника
      </ShowMessage>
    );
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
                onClick={() => handleDeleteEvent(event.id, event.eventTitle)}
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
      {isShowDeleteModal && <ShowDeleteModal />}
      {isShowSuccessMessage && <ShowSuccessDeleteMessage />}
      {isShowErrorMessage && <ShowErrorDeleteMessage />}
    </>
  );
}
