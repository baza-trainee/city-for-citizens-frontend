export default function Button({
  children,
  className,
  variant = 'filled',
  ...props
}) {
  return (
    <button
      {...props}
      className={` 
      ${
        variant === 'filled'
          ? ' bg-auth-dark text-white disabled:border-auth-dark_10'
          : ' bg-white text-admin-dark'
      } 
      inline-flex h-[49px] w-[182px]  items-center justify-center rounded-[6px] 
      border  border-admin-dark  pb-[10px] pt-[7px] text-[20px] font-bold leading-none
      disabled:bg-auth-dark_10
      ${className} `}
    >
      {children}
    </button>
  );
}
