import { useOnClickOutside } from '@/hooks/useOnClickOutside';
import clsx from 'clsx';
import { useRef, useState } from 'react';

import TriangleIcon from '@/assets/icons/common/triangle-icon.svg';

export function FormElement({
  errorMessage,
  register,
  placeholder,
  tag,
  customIcon: Icon,
  type,
  className,
  ...attr
}) {
  const Tag = tag === 'input' ? 'input' : 'textarea';
  const isErrorMessageLarge = errorMessage && errorMessage.length > 30;
  const [showErrorModal, setShowErrorModal] = useState(true);

  const wrapperRef = useRef(null);
  useOnClickOutside(showErrorModal, wrapperRef, () => setShowErrorModal(false));

  return (
    <label className="relative w-full">
      <Tag
        type={type}
        {...attr}
        onClick={() => {
          if (isErrorMessageLarge) {
            setShowErrorModal(p => !p);
          }
        }}
        autoComplete="off"
        placeholder={placeholder}
        className={`block min-h-[48px] w-full cursor-text rounded border border-admin-placeholder bg-white px-[9px] py-3 font-source_sans_3 leading-snug text-admin-dark placeholder:text-admin-placeholder 
          ${clsx(
            tag === 'textarea' && 'max-h-[196px] resize-none',
            tag === 'input' && 'max-h-[48px]',
            className,
            errorMessage && '!border-state-error_main'
          )}`}
        {...register}
      />
      {Icon && (
        <Icon
          className={'absolute right-[9px] top-1/2 w-6 -translate-y-1/2 '}
        />
      )}
      {errorMessage && (
        <div
          className="absolute -bottom-[2px] left-0 translate-y-full font-source_sans_3 text-sm leading-[16.80px] text-state-error_main"
          role="alert"
        >
          {isErrorMessageLarge ? (
            <div ref={wrapperRef}>
              <details open={showErrorModal}>
                <summary className="select-none">
                  {`Натисніть щоб ${showErrorModal ? 'приховати' : 'відкрити'} деталі.`}
                </summary>
                <span className="relative block h-20 overflow-auto rounded border border-admin-side_bar bg-admin-light_3 p-2.5 text-admin-dark shadow-sm">
                  {errorMessage}
                </span>
                <TriangleIcon
                  className={
                    'absolute right-[11.7%] top-[9.5px] z-10 w-4  fill-admin-light_3 text-admin-side_bar'
                  }
                />
              </details>
            </div>
          ) : (
            errorMessage
          )}
        </div>
      )}
    </label>
  );
}
