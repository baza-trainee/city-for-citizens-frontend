import Link from "next/link";

const LanguageSwitcher = () => {
  return (
    <>
      <Link href="/" className="text-center h-5">
        Укр
      </Link>

      <Link href="/En" className="text-center h-5">
        Eng
      </Link>
    </>
  );
};

export default LanguageSwitcher;
