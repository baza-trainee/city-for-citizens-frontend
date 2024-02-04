import clsx from 'clsx';

export function FormElement({
  errorMessage,
  register,
  placeholder,
  tag,
  customIcon: Icon,
  type,
  ...attr
}) {
  const Tag = tag === 'input' ? 'input' : 'textarea';
  const isErrorMessageLarge = errorMessage && errorMessage.length < 30;

  return (
    <label className="relative w-full">
      <Tag
        type={type}
        {...attr}
        autoComplete="off"
        placeholder={placeholder}
        className={`border-admin-placeholder  placeholder:text-admin-placeholder block w-full rounded border bg-white px-[9px] py-3 font-source_sans_3 leading-snug text-admin-dark 
          ${clsx(
            tag === 'textarea' && 'max-h-[196px] resize-none',
            tag === 'input' && 'max-h-[48px]',
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
            errorMessage
          ) : (
            <details>
              <summary>Натисніть щоб відкрити деталі.</summary>
              <span className=" block h-20 overflow-auto rounded bg-admin-light_3 p-2 text-admin-dark shadow-sm">
                {errorMessage}
              </span>
            </details>
          )}
        </div>
      )}
    </label>
  );
}
