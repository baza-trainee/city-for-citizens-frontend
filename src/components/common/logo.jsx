'use client';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import Link from 'next/link';
import logotypeLight from '@/assets/icons/common/logotype.svg?url';
import logotypeDark from '@/assets/icons/common/logotype-dark.svg?url';

export default function Logo() {
  const { theme } = useTheme();
  const logoSrc = theme === 'dark' ? logotypeDark : logotypeLight;

  return (
    <Link
      href="/"
      className="flex items-center justify-center gap-2 rounded py-11 font-roboto text-lg font-black uppercase leading-6 text-black"
    >
      <Image alt="Logo MistoFest" width="40" height="40" src={logoSrc} />
      <p className="text-light-accent dark:text-white">
        Misto<span className="dark:text-dark-accent">Fest</span>
      </p>
    </Link>
  );
}
