import CloseIcon from '@/assets/icons/common/close-icon.svg';
import Link from 'next/link';

export default function SucceessMessage({ message }) {
  return (
    <div className="text-state-dark relative mx-auto flex w-[446px] gap-5 rounded bg-white px-[75px] py-7 text-lg leading-[1.35]">
      <Link className="absolute right-6" href="/login">
        <CloseIcon className={' h-4 w-4'} />
      </Link>
      <p className="flex h-[202px]  items-center justify-center text-center">
        {message}
      </p>
    </div>
  );
}
