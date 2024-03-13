import CloseIcon from '@/assets/icons/common/close-icon.svg';
import clsx from 'clsx';

export function ProposeEventModal({ onClose, message, children, title, type }) {
  return (
    <>
      <button
        type="button"
        onClick={onClose}
        className="fixed left-0 top-0 z-50  h-full  w-full bg-admin-backdrop"
      ></button>
      <div
        className={`fixed left-1/2 top-1/2 z-50  inline-flex w-5/6 max-w-[600px]
        -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded bg-white p-6 dark:bg-dark-primary`}
      >
        <button
          className={'absolute right-0 top-0 hidden p-4'}
          type="button"
          onClick={onClose}
        >
          <CloseIcon className={'h-4 w-4'} />
        </button>
        {title && (
          <p
            className={`mb-[12px] text-center font-ubuntu text-[30px] font-bold leading-[1.33] text-black  
            dark:text-yellow tablet:text-[43px] `}
          >
            {title}
          </p>
        )}
        {message && (
          <p
            className="text-center font-roboto text-[16px] leading-[1.35] text-light-head dark:text-dark-main 
          tablet:w-[552px]"
          >
            {message}
          </p>
        )}
        {children}
      </div>
    </>
  );
}
