import clsx from 'clsx';

export default function ButtonMainPage({
  children,
  className,
  variant = 'accent',
  ...props
}) {
  return (
    <button
      className={clsx(
        'inline-flex min-h-[43px] min-w-[240px] cursor-pointer items-center justify-center rounded-md font-roboto text-base font-medium leading-[1.2]  transition-all disabled:cursor-not-allowed ',
        className,
        variant === 'accent' &&
          'bg-dark-button-default text-dark-button-text hover:bg-dark-button-hover active:bg-dark-button-pressed',
        variant === 'main' &&
          'bg-light-button-default  text-light-button-text hover:bg-light-button-hover active:bg-light-button-pressed  dark:bg-dark-button-default dark:text-dark-button-text dark:hover:bg-dark-button-hover dark:active:bg-dark-button-pressed'
      )}
      {...props}
    >
      {children}
    </button>
  );
}
