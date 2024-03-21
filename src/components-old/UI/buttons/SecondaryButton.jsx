const SecondaryButton = ({ message }) => {
  return (
    <button
      type="button"
      className="block h-12 w-[394px] rounded-lg border border-primary/100 px-8 py-2.5 text-primary/100 hover:border-primary/80 hover:text-primary/80 focus:border-primary/80 focus:text-primary/100 focus:underline disabled:border-gray/50 disabled:text-gray/50 dark:border-gray/5 dark:text-gray/5 dark:hover:border-gray/10 dark:hover:text-gray/10 dark:focus:border-primary/80 dark:focus:text-gray/5 dark:disabled:border-gray/20 dark:disabled:text-gray/20"
    >
      {message}
    </button>
  );
};

export default SecondaryButton;
