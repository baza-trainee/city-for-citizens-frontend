import CloseIcon from '@/assets/icons/common/close-icon.svg';
import clsx from 'clsx';

export function BasicModalWindows({ onClose, message, children, title, type }) {
  return (
    <>
      <button
        type="button"
        onClick={onClose}
        className="fixed left-0 top-0 z-50  h-full  w-full bg-admin-backdrop"
      ></button>
      <div
        className={`fixed left-1/2 top-1/2 z-50 inline-flex -translate-x-1/2 -translate-y-1/2 
        flex-col items-center justify-center rounded bg-white px-6 py-8 ${clsx(
          type === 'success' &&
            'min-w-[322px] gap-3 border-[3px] border-state-success py-[44px]',
          type === 'warn' &&
            'min-w-[322px] gap-3 border-[3px] border-state-warn_main pb-[34px] pt-[30px]',
          type === 'error' &&
            'min-w-[322px] gap-3 border-[3px] border-state-error_main pb-[34px] pt-[30px]',
          type === 'add-new-type' && 'px-10 pb-14 pt-11',
          type !== 'success' && type !== 'error' && 'min-w-[427px] gap-6',
          type === 'form' && 'pt-[45px]'
        )}`}
      >
        <button
          className={'absolute right-0 top-0 p-4'}
          type="button"
          onClick={onClose}
        >
          <CloseIcon className={'h-4 w-4'} />
        </button>
        {title && (
          <p
            className={`text-center font-exo_2 text-2xl font-bold leading-[1.33]  text-admin-dark  ${clsx(
              type === 'success' && 'text-state-success',
              type === 'warn' && 'text-state-warn_main',
              type === 'error' && 'text-state-error_main'
            )} `}
          >
            {title}
          </p>
        )}
        {message && (
          <p className="max-w-[323px] text-center font-source_sans_3 text-lg leading-[1.35] text-admin-dark">
            {message}
          </p>
        )}
        {children}
      </div>
    </>
  );
}
