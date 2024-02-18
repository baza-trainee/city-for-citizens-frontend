import React, { useState, Fragment } from 'react';
import Button from '@/components/common/button';
import Loader from '@/components-old/UI/Loader';
import { BasicModalWindows } from '@/components/common';
import { useUpdateDocumentsMutation } from '@/redux/api/documentsApi';
import { formatDateToDMY } from '@/helpers/formatDate';
import { useDropzone } from 'react-dropzone';
import clsx from 'clsx';

function Header(props) {
  return (
    <div className="text-neutral-900 w-full bg-admin-side_bar bg-opacity-50 py-[15px] text-center text-lg font-normal text-admin-dark">
      {props.text}
    </div>
  );
}

function FirstColumn(props) {
  return (
    <div className="flex w-full items-center justify-self-start bg-white py-[21px] pl-[45px]">
      {props.name}
    </div>
  );
}

function SecondColumn(props) {
  return (
    <div className="flex w-full items-center justify-center bg-white py-[21px] text-admin-dark">
      {props.updatedAt}
    </div>
  );
}

function ThirdColumn(props) {
  const [fileSizeError, setFileSizeError] = useState('');

  const { onChange, documentId, selectedFiles } = props;
  const selectedFile = selectedFiles[documentId];
  const selectedFileName = selectedFile ? selectedFile.name : null;

  const onDrop = acceptedFiles => {
    const file = acceptedFiles[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setFileSizeError('Розмір файлу не повинен перевищувати 5 МБ');
      } else if (file.type !== 'application/pdf') {
        setFileSizeError('Обраний файл повинен бути PDF');
      } else {
        onChange(file, documentId);
        setFileSizeError('');
      }
    }
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div className="flex w-full flex-col items-end justify-center bg-white py-[21px] pr-[52px]">
      {selectedFileName && <span>Обраний файл:</span>}
      <div
        {...getRootProps()}
        className="inline-flex min-h-[47px] min-w-[199px] cursor-pointer items-center
        justify-center rounded-[6px] border border-admin-button-border bg-white px-[30px] py-[10px]
        text-[20px] font-bold leading-none text-admin-dark hover:bg-admin-button-hover_outlined active:bg-admin-button-active_outlined"
      >
        <input {...getInputProps()} />
        {selectedFileName ? (
          <span>{selectedFileName}</span>
        ) : (
          <span>Выбрать файл</span>
        )}
      </div>
      <div className="mt-2">
        {fileSizeError && (
          <span className="text-state-error_main">{fileSizeError}</span>
        )}
      </div>
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

  const handleOpenModal = () => {
    if (Object.keys(selectedFiles).length > 0) {
      setIsModalVisible(true);
    }
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
              'Произошла ошибка при обновлении документа'
          );
          return;
        }
        onDocumentsUpdate(response.data);
      }
      setIsSuccessModalVisible(true);
    } catch (error) {
      console.error(error);
      setIsErrorModalVisible(true);
      setErrorMessage('Произошла ошибка при обновлении документов');
    }
  };

  return (
    <>
      <form className="mx-[20px] grid max-w-[1042px] grid-cols-3 gap-y-[14px]">
        <Header text={'Название документа'} />
        <Header text={'Дата обновления'} />
        <Header text={'Редактирование'} />

        {fetchedDocuments?.map(document => (
          <div
            key={document.id}
            className={`col-span-3 flex justify-stretch ${clsx(
              selectedFiles[document.id] && 'border border-admin-button-border'
            )}`}
          >
            <FirstColumn name={document.name} />
            <SecondColumn updatedAt={formatDateToDMY(document.updatedAt)} />
            <ThirdColumn
              onChange={(file, id) => {
                setSelectedFiles(prevState => ({
                  ...prevState,
                  [id]: file,
                }));
              }}
              documentId={document.id}
              selectedFiles={selectedFiles}
            />
          </div>
        ))}
        <div className="col-span-3 mt-[66px] flex gap-4 ">
          <Button
            type="button"
            variant="outlined"
            className="w-[182px]"
            onClick={() => setSelectedFiles({})}
          >
            Отмена
          </Button>
          <Button
            type="button"
            className="w-[182px]"
            disabled={!Object.keys(selectedFiles).length}
            onClick={handleOpenModal}
          >
            Обновить
          </Button>
        </div>
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
          onClose={() => setIsSuccessModalVisible(false)}
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
