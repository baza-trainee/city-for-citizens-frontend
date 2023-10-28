import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-gray/100 py-[20px] text-gray/5 dark:bg-gray/100 dark:text-gray/5 tablet:py-[72px]">
      <div
        className="container flex flex-wrap items-center justify-center gap-[8px] 
      tracking-[-0.176px] tablet:gap-[49px]"
      >
        <Link href={'/'}>Місто для містян</Link>
        <p className="text-sm tablet:text-base">
          Baza Trainee Ukraine 2023&copy; Всі права захищені
        </p>
      </div>
    </footer>
  );
};
export default Footer;
