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
          ? ' bg-admin-button-default disabled:bg-admin-button-disabled hover:bg-admin-button-hover active:bg-admin-button-active text-white disabled:border-auth-dark_10'
          : ' active:bg-admin-button-active_outlined hover:bg-admin-button-hover_outlined bg-white text-admin-dark'
      } 
     border-admin-button-border inline-flex  h-[49px] w-[182px] cursor-pointer 
      items-center  justify-center  rounded-[6px] border pb-[10px] pt-[7px] text-[20px]
      font-bold leading-none
      ${className} `}
    >
      {children}
    </button>
  );
}
