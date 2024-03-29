import { useDropzone } from 'react-dropzone';
import { Previews } from './previews-photos';
import { RejectionFileItems } from './rejection-files-items';

import pictureIcon from '@/assets/icons/common/picture-icon.svg?url';
import uploadIcon from '@/assets/icons/common/upload-icon.svg?url';
import BorderDashed from '@/assets/icons/common/border-dashed.svg';
import CloseIcon from '@/assets/icons/common/close-icon.svg';

import { useCallback, useEffect, useState } from 'react';
import clsx from 'clsx';

import Image from 'next/image';
import { MAX_FILE_SIZE, validFileExtensions } from '../helpers';
import { formatFileSize } from '../helpers/format-file-size';

function fileValidator(file) {
  const errors = [];
  if (file.size > MAX_FILE_SIZE) {
    errors.push({
      code: 'max-size',
      message: `перевищує максимальний ліміт розміру файлу для цього сайту. Розмір - ${formatFileSize(file.size)} `,
      validMessage: 'Максимальний розмір: 400 KB',
    });
  }

  const isInvalidFormat =
    file?.name && !validFileExtensions.includes(file.name.split('.').pop());

  if (isInvalidFormat) {
    errors.push({
      code: 'invalid-format',
      message: `має неправильний формат файлу для цього сайту.`,
      validMessage: 'Допустимі формати: PNG, JPEG',
    });
  }

  return errors.length ? errors : null;
}

export function FileDropzone({
  onChange,
  photo,
  errorMessage,
  locale,
  isResetForm,
  isPartners = false,
}) {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [fileRejections, setFileRejections] = useState([]);

  const onDrop = useCallback(
    (acceptedFiles, fileRejections) => {
      const newFiles = [...acceptedFiles, ...uploadedFiles];
      const lastTwoFiles = newFiles.slice(0, 1);

      setUploadedFiles(lastTwoFiles);
      onChange(lastTwoFiles);

      setFileRejections(fileRejections);
    },
    [onChange, uploadedFiles]
  );

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    validator: fileValidator,
    onDrop,
    accept: {
      'image/png': [],
      'image/jpeg': [],
      'image/webp': [],
    },
  });

  useEffect(() => {
    if (uploadedFiles.length) {
      setUploadedFiles([]);
    }

    if (fileRejections.length) {
      setFileRejections([]);
    }

    // this effect will work only when the form reset button is pressed
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isResetForm]);

  function removeImage() {
    setFileRejections([]);
    setUploadedFiles([]);
    onChange(photo || '');
  }

  const showPreviousText =
    !uploadedFiles.length && !isDragActive && !photo && !fileRejections.length;

  return (
    <div className="relative cursor-copy">
      <div {...getRootProps()}>
        <input {...getInputProps()} />

        <div
          className={`relative flex h-[216px] w-[305px] flex-col items-center justify-center `}
        >
          <BorderDashed
            className={`absolute left-0 top-0 h-[216px] w-[305px] text-admin-darkgray transition-all 
          ${clsx(
            isDragAccept &&
              'text-state-success shadow-main shadow-state-success/30',
            isDragReject &&
              'text-state-error_main shadow-main shadow-state-error_main/30'
          )}`}
          />
          {showPreviousText ? (
            <>
              <Image
                src={pictureIcon}
                width={56}
                height={56}
                alt="picture-icon"
                className="h-[58px] w-[58px]"
              />
              <p className="mb-[18px] w-[230px]  text-center text-xl font-bold leading-[1] text-admin-side_bar">
                Завантажте зображення {locale}
              </p>
              <p className="h-[52px] w-[215px] text-center text-sm leading-[1.35] text-admin-placeholder">
                Формат зображення: JPG, PNG Максимальний розмір: 400 KB
              </p>
              <Image
                src={uploadIcon}
                width={18}
                height={18}
                alt="upload-file-icon"
                className=" h-[18px]"
              />
            </>
          ) : (
            <>
              {!fileRejections.length && (
                <Previews
                  photo={photo}
                  acceptedFiles={uploadedFiles}
                  isResetForm={isResetForm}
                  isPartners={isPartners}
                />
              )}
            </>
          )}

          {isDragActive && isDragAccept && (
            <p
              className={`absolute left-1/2 top-1/2 w-max -translate-x-1/2 -translate-y-1/2 rounded-md p-2 text-2xl tracking-[2px]  backdrop-blur 
              ${
                uploadedFiles.length || photo
                  ? 'text-admin-light_1'
                  : 'text-admin-placeholder'
              }`}
            >
              Відпустіть тут ...
            </p>
          )}
        </div>
      </div>
      {errorMessage && !uploadedFiles.length && (
        <div
          className="absolute -bottom-[2px] left-0 translate-y-full font-source_sans_3 text-sm leading-[16.80px] text-state-error_main"
          role="alert"
        >
          {errorMessage}
        </div>
      )}
      <RejectionFileItems fileRejections={fileRejections} />
      {uploadedFiles.length || fileRejections.length ? (
        <button
          className="absolute right-4 top-4 inline-flex items-center justify-center rounded bg-white p-[13px]"
          onClick={removeImage}
          type="button"
        >
          <CloseIcon className={'w-[15px] text-admin-dark'} />
        </button>
      ) : null}
    </div>
  );
}
