const MAX_LENGTH_NAME = 21;

export function RejectionFileItems({ fileRejections }) {
  if (!fileRejections.length) return null;

  return (
    <div className="absolute left-1/2 top-1/2 z-10 h-[124px] w-[233px] -translate-x-1/2 -translate-y-1/2 overflow-auto">
      {fileRejections.map(({ file, errors }) => {
        const { name, size } = file;
        const fileLength = name.length;

        const shortFileName =
          fileLength >= MAX_LENGTH_NAME
            ? `${name.slice(0, 13)}...${name.slice(fileLength - 5, fileLength)}`
            : name;

        return (
          <div
            key={`${name}${size}`}
            className="flex flex-col items-center justify-center gap-2"
          >
            {errors.map(error => (
              <div key={error.code}>
                {error?.validMessage && (
                  <div className="flex flex-col gap-2 text-[14px] leading-[1.18]">
                    <p className="bg-state-error_second p-2.5 text-center  text-state-error_main ">
                      <span>{shortFileName} </span>
                      {error.message}
                    </p>
                    <p className="text-slate-500 text-center   text-admin-placeholder">
                      {error.validMessage}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
}
