import Link from 'next/link';

const PrimaryButton = ({ message }) => {
  return (
    <Link
      href={'#'}
      className="flex justify-center items-center max-w-[394px] h-12 px-8 py-2.5 text-gray/0 bg-primary/100 rounded-lg border border-primary/100 hover:border-primary/80 hover:bg-primary/80 focus:border-primary/80 focus:underline disabled:bg-gray/50 disabled:text-gray/5 dark:text-primary/0 dark:bg-gray/5 dark:hover:bg-gray/10 dark:border-gray/5 dark:focus:border-primary/80 dark:disabled:text-gray/5 dark:disabled:bg-gray/20"
    >
      <span>{message}</span>
    </Link>
  );
};

export default PrimaryButton;
