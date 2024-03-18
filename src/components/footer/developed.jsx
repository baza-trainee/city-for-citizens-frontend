import { useTranslations } from 'next-intl';

export default async function Developed() {
  const t = useTranslations('DocumentsFooter');
  return (
    <p
      className="text-center font-roboto text-[14px] 
    font-normal leading-tight text-light-main dark:text-dark-main tablet:text-left"
      href="https://baza-trainee.tech"
    >
      {t('developed')}
    </p>
  );
}
