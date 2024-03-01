import { BASE_URL } from '@/helpers/constants';

async function getDocuments() {
  const res = await fetch(`${BASE_URL}/documents`);
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
}

export default async function Documents() {
  const documentsData = await getDocuments();

  if (!documentsData) {
    return null;
  }
  return (
    <div className="flex w-full flex-col  items-center gap-3 text-center text-[15px] font-normal leading-tight text-light-main dark:text-dark-main desktop:mt-[32px] desktop:inline-flex desktop:flex-row desktop:content-between desktop:justify-between">
      {documentsData.map((document, index) => (
        <a
          key={document.id}
          href={document.file}
          className={`flex cursor-pointer hover:text-light-accent hover:transition-all dark:hover:text-dark-accent   ${index === 0 ? 'desktop:ml-[294px] desktop:mr-auto' : ''}`}
        >
          {document.name}
        </a>
      ))}
      <a
        href="https://baza-trainee.tech"
        className="cursor-pointer hover:text-light-accent hover:transition-all dark:hover:text-dark-accent desktop:order-[-1]"
      >
        Розробка Baza Trainee Ukraine 2024 © Усі права захищені
      </a>
    </div>
  );
}
