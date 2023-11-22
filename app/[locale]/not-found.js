import ToMain from '@/components/UI/buttons/ToMain';
import { Link } from '@/navigation';
import { useTranslations } from 'next-intl';
export default function NotFoundPage() {
  const t = useTranslations('ErrorPage');
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="container">
        <h2 className="mb-[12px] text-center font-heading text-[48px] font-light leading-[1.2] -tracking-[0.528px]">
          {t('title')}
        </h2>
        <p className="mb-[32px] text-center text-[24px]  leading-[1.5] -tracking-[0.264px]">
          {t('text')}
        </p>
        <div className="flex items-center justify-center">
          <Link href="/">
            <ToMain message={t('buttonName')} />
          </Link>
        </div>
      </div>
    </div>
  );
}
