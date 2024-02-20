import { formatDateToDMY } from '@/helpers/formatDate';
import { useDropzone } from 'react-dropzone';
import clsx from 'clsx';

export default function ListItem({
  document,
  onUpdate,
  selectedFiles,
  errors,
  setErrors,
}) {
  const onDrop = acceptedFiles => {
    const file = acceptedFiles[0];
    if (file) {
      const newErrors = { ...errors };
      const documentId = document.id;

      if (
        file.type !== 'application/pdf' &&
        file.type !== 'application/msword' &&
        file.type !==
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      ) {
        newErrors[documentId] = 'Обраний файл повинен бути PDF/DOC';
      } else if (file.size > 5 * 1024 * 1024) {
        newErrors[documentId] = 'Розмір файлу не повинен перевищувати 5 МБ';
      } else {
        onUpdate(file, documentId);
        delete newErrors[documentId];
      }

      setErrors(newErrors);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div
      className={`flex justify-stretch  bg-white ${clsx(selectedFiles[document.id] && 'border border-admin-button-border')}`}
    >
      <div className="flex w-full flex-col items-start justify-center py-[24px] pl-[45px] align-top text-[16px] text-admin-dark">
        {selectedFiles[document.id]
          ? selectedFiles[document.id].name
          : document.name}
        {errors[document.id] && (
          <div className="mt-1 text-[14px] text-state-error_main">
            {errors[document.id]}
          </div>
        )}
      </div>
      <div className="flex w-full items-center justify-center py-[24px]  text-admin-dark laptop_xl:mr-[90px]">
        {formatDateToDMY(document.updatedAt)}
      </div>
      <div className="flex w-full flex-col items-end justify-center  py-[24px] pr-[52px]">
        <div
          {...getRootProps()}
          className="inline-flex  cursor-pointer items-center justify-center
            rounded-[6px] border border-admin-button-border px-[30px]  py-[12px] text-center
            text-[20px] font-bold leading-none text-admin-dark hover:bg-admin-button-hover_outlined active:bg-admin-button-active_outlined"
        >
          <input {...getInputProps()} />
          <span>Замінити файл</span>
        </div>
      </div>
    </div>
  );
}
