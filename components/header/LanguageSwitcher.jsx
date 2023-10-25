import Link from 'next/link';

const LanguageSwitcher = ({ buttonStyle, icon }) => {
  const langs = [
    { name: 'Укр', value: 'uk-UA' },
    { name: 'Eng', value: 'en-US' },
  ];
  return (
    <>
      {langs.map(langItem => (
        <Link
          href="/"
          locale={langs.value}
          type="button"
          key={langItem.value}
          className={`${buttonStyle} 
            `}
        >
          {langItem.name}
          <div className="rounded-[4px] border-[1px] border-gray/50 dark:border-gray/20 flex justify-center items-center w-[24px] h-[24px] desktop:hidden">
            {icon}
          </div>
        </Link>
      ))}
    </>
  );
};

export default LanguageSwitcher;
