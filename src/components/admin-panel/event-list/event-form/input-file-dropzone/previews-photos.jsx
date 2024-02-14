import Image from 'next/image';

import { useEffect, useState } from 'react';
import { formatFileSize } from '../helpers/format-file-size';
import { IMAGE_BASE_URL } from '@/helpers/constants';

export function Previews({ acceptedFiles, photo, isResetForm }) {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    if (files.length) {
      files.forEach(file => {
        if (file?.preview) {
          URL.revokeObjectURL(file.preview);
        }
      });
      setFiles([]);
    }

    // this effect will work only when the form reset button is pressed
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isResetForm]);

  useEffect(() => {
    setFiles(
      acceptedFiles.map(file =>
        Object.assign(file, {
          preview: file ? URL.createObjectURL(file) : null,
        })
      )
    );

    // To prevent memory leaks when unmounting a component or modifying files, call URL.revokeObjectURL for each file, to let the browser know not to keep the reference to the file any longer
    return () =>
      files.forEach(file => {
        if (file?.preview) {
          URL.revokeObjectURL(file.preview);
        }
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [acceptedFiles]);

  const hasPhotoPreviewURL = !acceptedFiles.length && photo;

  return (
    <div className="group relative h-full w-full">
      {hasPhotoPreviewURL ? (
        <Image
          className="object-cover"
          fill
          alt="preview"
          src={`${IMAGE_BASE_URL}${photo}`}
        />
      ) : (
        <>
          {files[0]?.preview && (
            <>
              <Image
                className="object-cover"
                fill
                alt="preview"
                src={files[0].preview}
                onLoad={() => {
                  URL.revokeObjectURL(files[0].preview);
                }}
              />
            </>
          )}
        </>
      )}
      <p className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-1 rounded-md p-1 text-center text-white opacity-0 backdrop-blur transition-all group-hover:opacity-100">
        {photo && !files.length ? (
          <span>
            Натисніть або перетягніть сюди зображення, щоб замінити ...
          </span>
        ) : (
          <>
            {files[0] && (
              <>
                <span>{files[0].name}</span>
                <span>{formatFileSize(files[0].size)}</span>
              </>
            )}
          </>
        )}
      </p>
    </div>
  );
}
