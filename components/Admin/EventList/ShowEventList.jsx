'use client';

import { Link } from '@/navigation';
import { deleteEvent } from '@/services/eventAPI';
import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';
import IconTrash from '../../UI/icons/IconTrash';
import IconPencil from '../../UI/icons/IconPencil';
import ShowModal from '../ModalWindow/ShowModal';
import ShowMessage from '../Message/ShowMessage';

import ModalPortal from '../ModalWindow/ModalPortal';
import MessagePortal from '../Message/MessagePortal';

const ShowEventList = ({ eventsData, needDeleteEvent }) => {
  const { resolvedTheme } = useTheme();
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);
  const [isShowMessage, setIsShowMessage] = useState(false);
  const initialDataEvent = { id: '', title: '' };
  const [dataDeleteEvent, setDataDeleteEvent] = useState(initialDataEvent);

  useEffect(() => {
    if (!isShowMessage) {
      needDeleteEvent(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isShowMessage]);

  const handleDeleteEvent = (eventId, eventTitle) => {
    setDataDeleteEvent({ id: eventId, title: eventTitle });
    setIsShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteEvent(dataDeleteEvent.id);

      setIsShowDeleteModal(false);
      setDataDeleteEvent(initialDataEvent);
      setIsShowMessage(true);
    } catch (error) {
      console.error('Помилка видалення події:', error);
    }
  };

  const handleModalClose = () => {
    setIsShowDeleteModal(false);
    setDataDeleteEvent(initialDataEvent);
  };

  const ShowDeleteModal = () => (
    <ModalPortal handleModalClose={handleModalClose}>
      <ShowModal
        bgColor="#d43c3c"
        onClose={handleModalClose}
        onOk={handleConfirmDelete}
        confirmButton="Видалити"
      >
        Ви дійсно хочете видалити подію{' '}
        <span className="text-[#d43c3c]">{dataDeleteEvent.title}</span>?
      </ShowModal>
    </ModalPortal>
  );

  const ShowSuccessDeleteMessage = () => (
    <MessagePortal setIsShowMessage={setIsShowMessage}>
      <ShowMessage>Подія успішно видалена</ShowMessage>
    </MessagePortal>
  );

  return (
    <>
      {isShowDeleteModal && <ShowDeleteModal />}
      {isShowMessage && <ShowSuccessDeleteMessage />}
      {eventsData.map((event, ind) => (
        <li
          key={event.id + event.idIdentifier}
          className={`grid grid-cols-[10px_4fr_2fr_2fr_1fr] gap-x-3 px-3 transition duration-200 [&:nth-child(even)]:rounded [&:nth-child(even)]:bg-gray/10 ${
            resolvedTheme === 'dark'
              ? ' hover:bg-gray/50 [&:nth-child(even)]:bg-gray/80 [&:nth-child(even)]:hover:bg-gray/50'
              : ' hover:bg-gray/20 [&:nth-child(even)]:bg-gray/10 [&:nth-child(even)]:hover:bg-gray/20'
          }`}
        >
          <span>{ind + 1}</span>
          <span>{event.eventTitle}</span>
          <span>{event.eventAddress.city}</span>
          <span>
            {new Date(event.dateTime).toLocaleDateString('uk', {
              year: 'numeric',
              month: 'long',
              day: '2-digit',
            })}
          </span>
          <div
            className="inline-flex items-center justify-center gap-2 pr-2"
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
              onClick={() => handleDeleteEvent(event.id, event.eventTitle)}
              title="delete event"
            >
              <IconTrash
                width="16"
                height="16"
                className={`${
                  resolvedTheme === 'dark' ? 'fill-gray/20' : 'fill-[#121923]'
                } inline transition duration-200 hover:fill-[red]`}
              />
            </button>
          </div>
        </li>
      ))}
    </>
  );
};
export default ShowEventList;