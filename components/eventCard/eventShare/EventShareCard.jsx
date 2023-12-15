import IconCopy from '@/components/UI/buttons/IconCopy';
import IconTriangle from '@/components/UI/IconTriangle';
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard';
import { useEffect } from 'react';

const EventShareComp = ({ eventUrl, setShowEventLink, eventShareCompRef }) => {
  const [copyResult, copyToClipboard] = useCopyToClipboard();

  const handleClickCopy = () => {
    copyToClipboard(eventUrl);
  };

  useEffect(() => {
    const clickOutside = e => {
      if (
        eventShareCompRef.current &&
        !eventShareCompRef.current.contains(e.target)
      ) {
        setShowEventLink(false);
      }
    };

    document.addEventListener('click', clickOutside);
    return () => {
      document.removeEventListener('click', clickOutside);
    };
  }, [eventShareCompRef, setShowEventLink]);

  return (
    <div className="absolute right-[-40px] top-[36px] flex h-[65px] w-[300px] items-center justify-between rounded-lg border border-solid bg-gray/5 p-4  dark:bg-gray/80 mobile:w-[380px] tablet:w-[415px]">
      <a
        target="_blank"
        rel="noreferrer noopener"
        href={eventUrl}
        className="block truncate text-[20px] leading-[30px]"
      >
        {eventUrl}
      </a>
      <div className="relative cursor-pointer">
        <IconCopy
          onClick={handleClickCopy}
          className="stroke-primary/100 dark:stroke-gray/5"
        />
        <p className="absolute right-0   top-[30px] text-[#009688]">
          {copyResult?.state === 'success' && 'Copied!'}
        </p>
        <p className="absolute right-0 top-[30px] w-[150px]   truncate text-[#F44336]">
          {copyResult?.state === 'error' && `Error: ${copyResult.message}`}
        </p>
      </div>
      <IconTriangle className="absolute right-[40px] top-[-9px] h-[9px] w-[18px] stroke-gray/100 dark:stroke-gray/5" />
    </div>
  );
};

export default EventShareComp;
