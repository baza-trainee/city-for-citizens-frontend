import Link from 'next/link';
import Image from 'next/image';
import IconCopy from '@/components/UI/IconCopy';
import Rectangle from '../../../public/icons/Rectangle.svg';

const EventShareComp = () => {
  return (
    <div className="relative flex justify-between w-[415px] h-[65px] p-4 border border-solid rounded-lg">
      <Link
        href={'https://harmonyfest/en/events'}
        className="block text-[20px] leading-[30px]"
      >
        https://harmonyfest/en/events
      </Link>

      <div className="cursor-pointer">
        <IconCopy />
      </div>
      <Image src={Rectangle} alt="Rectangle" className='absolute top-[-10px] right-[40px]'/>
    </div>
  );
};

export default EventShareComp;
