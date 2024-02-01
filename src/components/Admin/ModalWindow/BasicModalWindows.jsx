import CloseIcon from '/public/icons/close-icon.svg';

const BasicModalWindows = ({ onClose, message, children, title }) => {
  return (
    <>
      <button
        type="button"
        onClick={onClose}
        className="bg-admin-backdrop fixed left-0  top-0  h-full w-full"
      ></button>
      <div className="fixed left-1/2 top-1/2 inline-flex w-[427px] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-6 rounded bg-white px-6 py-8">
        <button
          className={'absolute right-0 top-0 p-4'}
          type="button"
          onClick={onClose}
        >
          <CloseIcon className={'h-4 w-4'} />
        </button>
        {title && (
          <p className="text-center font-exo_2 text-2xl font-bold leading-8 text-admin-dark">
            {title}
          </p>
        )}
        {message && (
          <p className="w-[285px] text-center font-source_sans_3 text-lg text-admin-dark">
            {message}
          </p>
        )}
        {children}
      </div>
    </>
  );
};

export default BasicModalWindows;
