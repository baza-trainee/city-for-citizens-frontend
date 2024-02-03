'use client';

import { Link } from '@/navigation';
import { useEffect, useState } from 'react';
import IconTrash from '../../UI/icons/IconTrash';
import IconPencil from '../../UI/icons/IconPencil';
import ShowModal from '../ModalWindow/ShowModal';
import ShowMessage from '../Message/ShowMessage';
import { useCurrentLocale, useStyleMediaQuery } from '@/hooks';
import ModalPortal from '../ModalWindow/ModalPortal';
import { useDeleteEventMutation } from '@/redux/api/eventsApi';
import MessagePortal from '../Message/MessagePortal';

const ShowEventList = ({ eventsData }) => {
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);
  const [isShowSuccessMessage, setIsShowSuccessMessage] = useState(false);
  const [isShowErrorMessage, setIsShowErrorsMessage] = useState(false);
  const initialDataEvent = { id: '', title: '' };
  const [dataDeleteEvent, setDataDeleteEvent] = useState(initialDataEvent);

  const { matches: isMobile } = useStyleMediaQuery({
    mixOrMax: 'max',
    widthOrHeight: 'width',
    value: 767,
  });
  const { localeForIntl } = useCurrentLocale();
  const [deleteEvent] = useDeleteEventMutation();

  const handleDeleteEvent = (eventId, eventTitle) => {
    setDataDeleteEvent({ id: eventId, title: eventTitle });
    setIsShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteEvent(dataDeleteEvent.id).unwrap();

      setIsShowDeleteModal(false);
      setIsShowSuccessMessage(true);
      setDataDeleteEvent(initialDataEvent);
    } catch (error) {
      setIsShowErrorsMessage(true);
      console.error('Помилка видалення події:', error);
    }
  };

  const handleModalClose = () => {
    setIsShowDeleteModal(false);
    setDataDeleteEvent(initialDataEvent);
  };

  const handleMessageClose = () => {
    setIsShowSuccessMessage(false);
    setIsShowErrorsMessage(false);
  };

  const ShowDeleteModal = () => (
    <ModalPortal handleModalClose={handleModalClose}>
      <ShowModal
        title="Видалити подію"
        onClose={handleModalClose}
        onOk={handleConfirmDelete}
      >
        Ви точно хочете видалити подію?
      </ShowModal>
    </ModalPortal>
  );

  const ShowSuccessDeleteMessage = () => (
    <MessagePortal handleMessageClose={handleMessageClose}>
      <ShowMessage title="Успіх" type="success" onClose={handleMessageClose}>
        Подію видалено
      </ShowMessage>
    </MessagePortal>
  );
  const ShowErrorDeleteMessage = () => (
    <MessagePortal handleMessageClose={handleMessageClose}>
      <ShowMessage title="Помилка" type="error" onClose={handleMessageClose}>
        Сталася помилка. Спробуйте ще раз або зверніться до розробника
      </ShowMessage>
    </MessagePortal>
  );

  return (
    <>
      {isShowDeleteModal && <ShowDeleteModal />}
      {isShowSuccessMessage && <ShowSuccessDeleteMessage />}
      {isShowErrorMessage && <ShowErrorDeleteMessage />}
      {eventsData.map(event => (
        <li
          key={event.id + event.idIdentifier}
          className={`grid grid-cols-[4fr_2fr_3fr_2fr_1fr] gap-x-3 bg-admin-light_3 py-3 transition duration-200
          hover:bg-admin-menu tablet:justify-items-start desktop:justify-items-center
           ${isMobile ? 'text-sm' : null}`}
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
                className="inline fill-admin-dark transition duration-200 hover:fill-primary/100"
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
    </>
  );
};
export default ShowEventList;
