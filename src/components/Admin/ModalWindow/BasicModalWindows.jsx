import CloseButton from '@/components/UI/icons/IconClose';
import { useTranslations } from 'next-intl';

const BasicModalWindows = ({ onClose, message, children, detailsMessage }) => {
  const t = useTranslations('Admin.updateEvent');
  return (
    <>
      <div
        onClick={onClose}
        className="fixed left-0 top-0 h-full w-full bg-primary/0/20"
      ></div>
      <div className="fixed left-1/2 top-1/2 min-w-[200px] max-w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-[10px] bg-gray/5 px-[50px] py-[30px] dark:bg-gray/80">
        <button
          onClick={onClose}
          type="button"
          className="absolute right-[10px] top-[10px]"
        >
          <CloseButton className="h-[24px] w-[24px] stroke-gray/100 dark:stroke-gray/0" />
        </button>
        <p className="text-justify">{message}</p>
        {detailsMessage && (
          <div className="relative">
            <p className="peer">{t('message.errorImageDetail')}</p>
            <p className="absolute left-1/2 top-full grid w-[100%] min-w-[200px] max-w-[300px] -translate-x-1/2 grid-rows-[0px] overflow-hidden rounded-[10px] bg-gray/5 p-[3px] px-[25px] pb-[25px] text-justify leading-[1] opacity-0 transition-all peer-hover:grid-rows-[1fr] peer-hover:opacity-[1] dark:bg-gray/80">
              {detailsMessage}
            </p>
          </div>
        )}
        <p>{children}</p>
      </div>
    </>
  );
};

export default BasicModalWindows;
