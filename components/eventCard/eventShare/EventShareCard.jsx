import Link from 'next/link';
import Image from 'next/image';
import Rectangle from '../../../public/icons/Rectangle.svg';
import iconCopy from '../../../public/icons/iconCopy.svg';

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
        <Image src={iconCopy} alt="Copy icon" />
      </div>
      <Image
        src={Rectangle}
        alt="Rectangle"
        className="absolute top-[-9px] right-[40px]"
      />
    </div>
  );
};

export default EventShareComp;
