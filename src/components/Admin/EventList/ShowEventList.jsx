'use client';

import { Link } from '@/navigation';
//import { useTheme } from 'next-themes';
import { useState } from 'react';
import IconTrash from '../../UI/icons/IconTrash';
import IconPencil from '../../UI/icons/IconPencil';
import ShowModal from '../ModalWindow/ShowModal';
import ShowMessage from '../Message/ShowMessage';
import { useCurrentLocale, useStyleMediaQuery } from '@/hooks';
import ModalPortal from '../ModalWindow/ModalPortal';
import MessagePortal from '../Message/MessagePortal';
import { useTranslations } from 'next-intl';
import { useDeleteEventMutation } from '@/redux/api/eventsApi';

const ShowEventList = ({ eventsData }) => {
  //const { resolvedTheme } = useTheme();
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);
  const [isShowMessage, setIsShowMessage] = useState(false);
  const initialDataEvent = { id: '', title: '' };
  const [dataDeleteEvent, setDataDeleteEvent] = useState(initialDataEvent);
  const t = useTranslations('EventList');
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
      {eventsData.map(event => (
        <li
          key={event.id + event.idIdentifier}
          className={`grid grid-cols-[4fr_2fr_3fr_2fr_1fr] justify-items-center gap-x-3 bg-admin-light_3 py-3
          transition duration-200 hover:bg-gray/20
           ${isMobile ? 'text-sm' : null}`}
        >
          {console.log('event', event)}
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
            title={t('table.editEvent')}
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
              title={t('table.deleteEvent')}
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
