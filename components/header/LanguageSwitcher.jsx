import Link from 'next/link';

const LanguageSwitcher = () => {
  return (
    <>
      <Link href="/" className="text-center h-5 leading-normal">
        Укр
      </Link>

      <Link href="/En" className="text-center h-5 leading-normal">
        Eng
      </Link>
    </>
  );
};

export default LanguageSwitcher;
