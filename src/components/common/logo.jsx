import logotype from '@/assets/icons/common/logotype.svg?url';
import Image from 'next/image';
import Link from 'next/link';

export default function Logo() {
  return (
    <Link
      href="/"
      className="flex items-center justify-center gap-2 rounded  py-11 font-roboto text-lg font-black uppercase leading-6 text-black"
    >
      <Image src={logotype} alt="logotype" />
      <p className="text-light-accent ">
        Misto<span>Fest</span>
      </p>
    </Link>
  );
}
