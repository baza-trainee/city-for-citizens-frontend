const PrimaryButton = ({
  children,
  className,
  variant = 'filled',
  ...props
}) => {
  return (
    <button
      {...props}
      className={`${className} 
      ${variant === 'filled' ? 'bg-auth-dark text-white disabled:border-auth-dark_10 ' : 'bg-white text-auth-dark'} 
      flex h-12 items-center justify-center rounded-[6px] border 
      border-auth-dark  px-8 py-2.5 text-[20px] font-bold leading-none 
      disabled:bg-auth-dark_10 `}
    >
      {children}
    </button>
  );
};

export default PrimaryButton;
