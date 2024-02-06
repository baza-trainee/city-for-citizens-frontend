import { useDispatch, useSelector } from 'react-redux';
import {
  selectIsShowModal,
  selectIdEvent,
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
import { useEffect } from 'react';

export default function ModalProcess() {
  const isShowDeleteModal = useSelector(selectIsShowModal);
  const isShowSuccessMessage = useSelector(selectIsShowSuccessMessage);
  const isShowErrorMessage = useSelector(selectIsShowErrorMessage);
  const idDeleteEvent = useSelector(selectIdEvent);
  const [deleteEvent] = useDeleteEventMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('modal-process in act');
    console.log('state modal window: ', isShowDeleteModal);
    console.log('state success message: ', isShowSuccessMessage);
    console.log('state error message: ', isShowErrorMessage);
    console.log('state data delete event: ', idDeleteEvent);
  }, [isShowDeleteModal]);
  async function handleConfirmDelete() {
    try {
      //dispatch(closeModal());
      console.log('now I am about to delete event');
      await deleteEvent(idDeleteEvent).unwrap();
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
