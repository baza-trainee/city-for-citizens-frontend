import React, { useState } from 'react';
import Button from '@/components/common/button';
import Loader from '@/components-old/UI/Loader';
import { BasicModalWindows } from '@/components/common';
import { useUpdateDocumentsMutation } from '@/redux/api/documentsApi';
import ListItem from './list-item';

function Header(props) {
  return (
    <div className="text-neutral-900 w-full bg-admin-side_bar bg-opacity-50 py-[15px] text-center text-lg font-normal text-admin-dark">
      {props.text}
    </div>
  );
}

export default function Documents({ fetchedDocuments, onDocumentsUpdate }) {
  const [updateDocuments, { isLoading }] = useUpdateDocumentsMutation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
  const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [selectedFiles, setSelectedFiles] = useState({});
  const [errors, setErrors] = useState({});

  const handleOpenModal = () => {
    if (Object.keys(selectedFiles).length > 0) {
      setIsModalVisible(true);
    }
  };

  const onCancel = () => {
    setSelectedFiles({});
    setErrors({});
  };

  const onSubmit = async () => {
    try {
      for (const document of fetchedDocuments) {
        const formData = new FormData();
        const file = selectedFiles[document.id];
        formData.append('file', file);
        const response = await updateDocuments({
          body: formData,
          documentId: document.id,
        });
        if (response.data.status !== 'success') {
          setIsErrorModalVisible(true);
          setErrorMessage(
            response.error?.data?.message ||
              'Сталася помилка при завантаженні документа'
          );
          return;
        }
        onDocumentsUpdate(response.data);
      }
      setIsModalVisible(false);
      setIsSuccessModalVisible(true);
    } catch (error) {
      console.error(error);
      setIsErrorModalVisible(true);
      setErrorMessage('Сталася помилка при завантаженні документа');
    }
  };

  const isButtonDisabled = Object.values(errors).some(error => !!error);

  return (
    <>
      <form className="mx-[20px] grid max-w-[1042px] grid-cols-3 gap-y-[14px]">
        <Header text={'Назва документу'} />
        <Header text={'Дата оновлення'} />
        <Header text={'Редагування'} />

        {fetchedDocuments?.map(document => (
          <ListItem
            key={document.id}
            document={document}
            onUpdate={(file, id) => {
              setSelectedFiles(prevState => ({
                ...prevState,
                [id]: file,
              }));
            }}
            selectedFiles={selectedFiles}
            errors={errors}
            setErrors={setErrors}
          />
        ))}
        {Object.keys(selectedFiles).length > 0 && (
          <div className="col-span-3 mt-[66px] flex gap-4 ">
            <Button
              type="button"
              variant="outlined"
              className="w-[182px]"
              onClick={onCancel}
            >
              Скасувати
            </Button>
            <Button
              type="button"
              className="w-[182px]"
              disabled={!Object.keys(selectedFiles).length || isButtonDisabled}
              onClick={handleOpenModal}
            >
              Оновити
            </Button>
          </div>
        )}
      </form>
      {isModalVisible && (
        <BasicModalWindows
          onClose={() => setIsModalVisible(false)}
          title={'Оновити документи'}
          message={'Впевнені, що хочете продовжити?'}
        >
          <div className=" flex gap-4">
            <Button
              type="button"
              variant="outlined"
              className="max-w-[182px]"
              onClick={() => setIsModalVisible(false)}
            >
              Скасувати
            </Button>
            <Button
              type="button"
              className="max-w-[181px] text-nowrap"
              disabled={isLoading}
              onClick={onSubmit}
            >
              Підтвердити
            </Button>
          </div>
        </BasicModalWindows>
      )}

      {isSuccessModalVisible && (
        <BasicModalWindows
          onClose={() => {
            setIsSuccessModalVisible(false);
            onCancel();
          }}
          title={'Успіх!'}
          type="success"
          message={'Ваші зміни успішно збережено!'}
        ></BasicModalWindows>
      )}

      {isErrorModalVisible && (
        <BasicModalWindows
          onClose={() => setIsErrorModalVisible(false)}
          title={'Помилка'}
          type="error"
          message={errorMessage}
        ></BasicModalWindows>
      )}

      {isLoading && (
        <div className="bg-primary/0/20 fixed flex h-full w-full items-center justify-center backdrop-blur-[1px]">
          <Loader />
        </div>
      )}
    </>
  );
}
