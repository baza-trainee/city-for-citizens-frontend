import { BASE_URL } from '@/helpers/constants';
import { useTranslations } from 'next-intl';

async function getDocuments() {
  const res = await fetch(`${BASE_URL}/documents`);
  if (!res.ok) {
    // throw new Error('Failed to fetch data');
    return;
  }
  return res.json();
}

export default async function Documents() {
  const t = useTranslations('DocumentsFooter');

  const DocumentsFooter = [
    { id: 'policy', label: t('policy') },
    { id: 'rules', label: t('rules') },
    { id: 'developed', label: t('developed') },
  ];

  const documentsData = await getDocuments();

  if (!documentsData) {
    return null;
  }
  return (
    <div className="flex w-full flex-col items-center gap-3 text-center font-roboto text-sm font-normal leading-tight text-light-main dark:text-dark-main desktop:mt-[32px] desktop:inline-flex desktop:flex-row desktop:content-between desktop:justify-between">
      {documentsData?.map((document, index) => (
        <a
          key={document.id}
          href={document.file}
          className={`flex cursor-pointer hover:text-light-accent hover:transition-all dark:hover:text-dark-accent   ${index === 0 ? 'desktop:ml-[290px] desktop:mr-auto' : ''}`}
        >
          {DocumentsFooter[index].label}
        </a>
      ))}
      <span
        href="https://baza-trainee.tech"
        className="flex  desktop:order-[-1]"
      >
        {DocumentsFooter[DocumentsFooter.length - 1].label}
      </span>
    </div>
  );
}
