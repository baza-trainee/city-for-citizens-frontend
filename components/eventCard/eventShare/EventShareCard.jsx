import Link from 'next/link';
import IconCopy from '@/components/UI/buttons/IconCopy';
import IconTriangle from '@/components/UI/IconTriangle';

const EventShareComp = () => {
  return (
    <div className="relative flex justify-between items-center w-[415px] h-[65px] p-4 border border-solid rounded-lg">
      <Link
        href={'https://harmonyfest/en/events'}
        className="block text-[20px] leading-[30px]"
      >
        https://harmonyfest/en/events
      </Link>
      <div className="cursor-pointer">
        <IconCopy className="stroke-primary/100 dark:stroke-gray/5" />
      </div>
      <IconTriangle className="absolute top-[-9px] right-[40px] w-[18px] h-[9px] stroke-gray/100 dark:stroke-gray/5" />
    </div>
  );
};

export default EventShareComp;
