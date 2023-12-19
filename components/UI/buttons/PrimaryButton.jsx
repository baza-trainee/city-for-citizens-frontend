const PrimaryButton = ({ message }) => {
  return (
    <button className="flex h-12 w-[100%] items-center justify-center rounded-lg border border-primary/100 bg-primary/100 px-8 py-2.5 text-[16px] text-gray/0 hover:border-primary/80 hover:bg-primary/80 focus:border-primary/80 focus:underline disabled:bg-gray/50 disabled:text-gray/5 dark:border-gray/5 dark:bg-gray/5 dark:text-gray/100  dark:hover:bg-gray/10 dark:focus:border-primary/80 dark:disabled:bg-gray/20 dark:disabled:text-gray/5">
      {message}
    </button>
  );
};

export default PrimaryButton;
