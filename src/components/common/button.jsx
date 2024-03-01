import clsx from 'clsx';

export default function Button({
  children,
  className,
  variant = 'filled',
  ...props
}) {
  return (
    <button
      className={clsx(
        'inline-flex min-h-[49px] min-w-[182px] cursor-pointer items-center justify-center rounded-md border border-admin-button-border text-[20px]/[32px] font-bold transition-all disabled:cursor-not-allowed',
        className,
        variant === 'outlined' &&
          'bg-admin-light_3 text-admin-dark hover:bg-admin-button-hover_outlined active:bg-admin-button-active_outlined disabled:border-admin-button-disabled disabled:bg-admin-button-hover_outlined disabled:text-admin-button-disabled',
        variant === 'filled' &&
          'bg-admin-dark text-white hover:bg-admin-button-hover active:bg-admin-button-active disabled:border-admin-button-disabled disabled:bg-admin-button-disabled'
      )}
      {...props}
    >
      {children}
    </button>
  );
}
