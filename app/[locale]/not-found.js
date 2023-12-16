import ToMain from '@/components/UI/buttons/ToMain';
import { Link } from '@/navigation';
import { useTranslations } from 'next-intl';
export default function NotFoundPage() {
  const t = useTranslations('ErrorPage');
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="container mx-auto flex max-w-[760px] flex-col items-center ">
        <h2 className="mb-[12px]  font-heading text-[48px] font-light leading-[1.2] -tracking-[0.528px] tablet:text-[64px]">
          {t('title')}
        </h2>
        <p className="mb-[32px]  text-center text-[16px] leading-[1.5] -tracking-[0.264px] tablet:text-[24px]">
          {t('text')}
        </p>
        <div className=" flex w-full max-w-[394px] items-center justify-center">
          <Link href="/" className="w-full">
            <ToMain message={t('buttonName')} />
          </Link>
        </div>
      </div>
    </div>
  );
}
