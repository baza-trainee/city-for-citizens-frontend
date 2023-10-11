const SecondaryButton = ({ message }) => {
  return (
    <button
      type="button"
      className="block w-[394px] h-12 px-8 py-2.5 text-primary/100 border border-primary/100 rounded-lg hover:text-primary/80 hover:border-primary/80 focus:underline focus:text-primary/100 focus:border-primary/80 disabled:text-gray/50 disabled:border-gray/50 dark:text-gray/5 dark:border-gray/5 dark:hover:text-gray/10 dark:hover:border-gray/10 dark:focus:text-gray/5 dark:focus:border-primary/80 dark:disabled:text-gray/20 dark:disabled:border-gray/20"
    >
      {message}
    </button>
  );
};

export default SecondaryButton;
