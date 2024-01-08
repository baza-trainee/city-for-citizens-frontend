import { useTranslations } from 'next-intl';
import { PulseLoader } from 'react-spinners';

export const LoadingButton = () => {
  const t = useTranslations('Common.buttons');
  return (
    <span className="flex items-end justify-center gap-[1px] text-[16px]">
      <span>{t('loading')}</span>

      <PulseLoader
        className="-translate-y-[3.5px]"
        color="currentColor"
        speedMultiplier={0.7}
        margin={5}
        size={4}
      />
    </span>
  );
};
