import { BASE_URL } from '@/helpers/constants';
import { useTranslations } from 'next-intl';

async function getDocuments() {
  const res = await fetch(`${BASE_URL}/documents`);
  try {
    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }
  } catch (error) {
    console.error(error);
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
    <div
      className=" flex flex-col gap-3 font-roboto text-sm font-normal 
    leading-tight text-light-main dark:text-dark-main "
    >
      {documentsData?.map((document, index) => (
        <a
          key={document.id}
          href={document.file}
          className={`block w-full cursor-pointer text-center hover:text-light-accent  hover:transition-all dark:hover:text-dark-accent tablet:text-right   `}
        >
          {DocumentsFooter[index].label}
        </a>
      ))}
    </div>
  );
}
