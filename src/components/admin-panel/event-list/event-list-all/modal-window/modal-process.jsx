import { useDispatch, useSelector } from 'react-redux';
import {
  selectIsShowModal,
  selectDeleteEventData,
  selectIsShowSuccessMessage,
  selectIsShowErrorMessage,
} from '@/redux/slice/selectors';
import ShowModal from '@/components/admin-panel/event-list/event-list-all/modal-window/show-modal';
import ShowMessage from '@/components/admin-panel/event-list/event-list-all/modal-window/show-message';
import { resetState } from '@/redux/slice/modalEventSlice';
import {
  showSuccessMessage,
  showErrorMessage,
  closeModal,
} from '@/redux/slice/modalEventSlice';
import { useDeleteEventMutation } from '@/redux/api/eventsApi';

export default function ModalProcess() {
  const isShowDeleteModal = useSelector(selectIsShowModal);
  const isShowSuccessMessage = useSelector(selectIsShowSuccessMessage);
  const isShowErrorMessage = useSelector(selectIsShowErrorMessage);
  const dataDeleteEvent = useSelector(selectDeleteEventData);
  const [deleteEvent] = useDeleteEventMutation();
  const dispatch = useDispatch();

  async function handleConfirmDelete() {
    try {
      dispatch(closeModal());
      console.log('now I am about to delete event');
      await deleteEvent(dataDeleteEvent.id).unwrap();
      console.log('I deleted event');
      dispatch(showSuccessMessage());
      console.log('now I about to show successful message after delete');
    } catch {
      dispatch(showErrorMessage());
    } finally {
      dispatch(resetState());
    }
  }

  function handleModalClose() {
    dispatch(resetState());
  }

  function ShowDeleteModal() {
    return (
      <ShowModal
        title="Видалити подію"
        onClose={handleModalClose}
        onOk={handleConfirmDelete}
      >
        Ви точно хочете видалити подію?
      </ShowModal>
    );
  }

  function ShowSuccessDeleteMessage() {
    return (
      <ShowMessage title="Успіх" type="success" onClose={handleModalClose}>
        Подію видалено
      </ShowMessage>
    );
  }

  function ShowErrorDeleteMessage() {
    return (
      <ShowMessage title="Помилка" type="error" onClose={handleModalClose}>
        Сталася помилка. Спробуйте ще раз або зверніться до розробника
      </ShowMessage>
    );
  }

  return (
    <>
      {isShowDeleteModal && <ShowDeleteModal />}
      {isShowSuccessMessage && <ShowSuccessDeleteMessage />}
      {isShowErrorMessage && <ShowErrorDeleteMessage />}
    </>
  );
}
